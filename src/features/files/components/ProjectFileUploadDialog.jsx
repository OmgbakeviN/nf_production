import { useState } from "react";
import { FileUp, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { uploadProjectFile } from "../filesApi";

export default function ProjectFileUploadDialog({ projectId, onCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    file_type: "SCRIPT",
    version: "v1",
    status: "DRAFT",
    file: null,
  });

  function setValue(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    setLoading(true);

    try {
      await uploadProjectFile(projectId, data);
      setOpen(false);
      setForm({
        title: "",
        description: "",
        file_type: "SCRIPT",
        version: "v1",
        status: "DRAFT",
        file: null,
      });
      onCreated?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Upload</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="File title"
            value={form.title}
            onChange={(e) => setValue("title", e.target.value)}
            required
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setValue("description", e.target.value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              value={form.file_type}
              onValueChange={(value) => setValue("file_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="File type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="SCRIPT">Script</SelectItem>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="STORYBOARD">Storyboard</SelectItem>
                <SelectItem value="PRODUCTION_NOTE">Production note</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Version"
              value={form.version}
              onChange={(e) => setValue("version", e.target.value)}
            />
          </div>

          <Select
            value={form.status}
            onValueChange={(value) => setValue("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PENDING_REVIEW">Submit for review</SelectItem>
              <SelectItem value="APPROVED">Approved, producer only</SelectItem>
            </SelectContent>
          </Select>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center">
            <FileUp className="mb-2 h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">Choose file</span>

            <Input
              type="file"
              className="mt-3"
              onChange={(e) => setValue("file", e.target.files[0])}
              required
            />
          </label>

          <Button disabled={loading} className="w-full rounded-2xl gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileUp className="h-4 w-4" />
            )}
            Upload file
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}