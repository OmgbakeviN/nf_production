import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Clapperboard, Pencil, Trash2, Users, Files, CalendarDays, MapPin } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  deleteProject,
  getProject,
} from "@/features/projects/projectsApi";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  async function loadProject() {
    setLoading(true);

    try {
      const data = await getProject(id);
      setProject(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      await deleteProject(id);
      navigate("/projects");
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    loadProject();
  }, [id]);

  if (loading || !project) {
    return <p className="text-sm text-muted-foreground">Loading project...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.title}
        description={project.short_description}
        action={
          <div className="flex gap-2">
            <Button asChild variant="secondary" className="rounded-2xl gap-2">
              <Link to={`/projects/${project.id}/files`}>
                <Files className="h-4 w-4" />
                <span className="hidden sm:inline">Files</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="rounded-2xl gap-2">
              <Link to={`/projects/${project.id}/edit`}>
                <Pencil className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </Button>

            <Button asChild className="rounded-2xl gap-2">
              <Link to={`/projects/${project.id}/team`}>
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </Link>
            </Button>

            <Button asChild variant="secondary" className="rounded-2xl gap-2">
              <Link to={`/projects/${project.id}/locations`}>
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Locations</span>
              </Link>
            </Button>

            <Button asChild variant="secondary" className="rounded-2xl gap-2">
              <Link to={`/projects/${project.id}/schedule`}>
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Schedule</span>
              </Link>
            </Button>

            <Button
              variant="destructive"
              className="rounded-2xl gap-2"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">
                {deleting ? "Deleting..." : "Delete"}
              </span>
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="overflow-hidden rounded-3xl lg:col-span-2">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={project.title}
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-72 items-center justify-center bg-muted">
              <Clapperboard className="h-14 w-14 text-muted-foreground" />
            </div>
          )}

          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full">{project.status}</Badge>

              <Badge variant="secondary" className="rounded-full">
                {project.project_type}
              </Badge>

              {project.genre && (
                <Badge variant="outline" className="rounded-full">
                  {project.genre}
                </Badge>
              )}
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Synopsis
              </p>

              <p className="mt-2 text-sm leading-6">
                {project.synopsis || "No synopsis added yet."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="space-y-4 p-5">
            <Info
              label="Created by"
              value={project.created_by_details?.full_name}
            />
            <Info label="Members" value={project.members?.length || 0} />
            <Info
              label="Created"
              value={new Date(project.created_at).toLocaleDateString()}
            />
            <Info
              label="Updated"
              value={new Date(project.updated_at).toLocaleDateString()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border-b pb-3 last:border-b-0">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value || "—"}</p>
    </div>
  );
}