import {
  Check,
  Download,
  FileText,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectFileStatusBadge from "./ProjectFileStatusBadge";

import {
  approveProjectFile,
  deleteProjectFile,
  rejectProjectFile,
  submitProjectFileReview,
} from "../filesApi";

import { getCurrentUser } from "@/features/auth/authStore";

export default function ProjectFileCard({ projectId, file, onUpdated }) {
  const user = getCurrentUser();
  const isProducer = user?.role === "PRODUCER";
  const isOwner = user?.id === file.uploaded_by;

  const canSubmit = isOwner && ["DRAFT", "REJECTED"].includes(file.status);
  const canDelete = isProducer || (isOwner && ["DRAFT", "REJECTED"].includes(file.status));
  const canReview = isProducer && file.status === "PENDING_REVIEW";

  async function handleSubmitReview() {
    await submitProjectFileReview(projectId, file.id);
    onUpdated?.();
  }

  async function handleApprove() {
    await approveProjectFile(projectId, file.id);
    onUpdated?.();
  }

  async function handleReject() {
    const reason = window.prompt("Reason for rejection:");

    if (!reason) return;

    await rejectProjectFile(projectId, file.id, { reason });
    onUpdated?.();
  }

  async function handleDelete() {
    const confirmed = window.confirm("Delete this file?");

    if (!confirmed) return;

    await deleteProjectFile(projectId, file.id);
    onUpdated?.();
  }

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium">{file.title}</p>
              <p className="text-xs text-muted-foreground">
                {file.file_type} · {file.version || "v1"}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {file.description || "No description"}
              </p>
            </div>
          </div>

          <ProjectFileStatusBadge status={file.status} />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>By {file.uploaded_by_name}</span>
          <span>•</span>
          <span>{new Date(file.created_at).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {file.file_url && (
            <Button asChild variant="outline" className="rounded-2xl gap-2">
              <a href={file.file_url} target="_blank">
                <Download className="h-4 w-4" />
                Open
              </a>
            </Button>
          )}

          {canSubmit && (
            <Button
              variant="secondary"
              className="rounded-2xl gap-2"
              onClick={handleSubmitReview}
            >
              <Send className="h-4 w-4" />
              Review
            </Button>
          )}

          {canReview && (
            <>
              <Button className="rounded-2xl gap-2" onClick={handleApprove}>
                <Check className="h-4 w-4" />
                Approve
              </Button>

              <Button
                variant="destructive"
                className="rounded-2xl gap-2"
                onClick={handleReject}
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}

          {canDelete && (
            <Button
              variant="ghost"
              className="rounded-2xl gap-2 text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}