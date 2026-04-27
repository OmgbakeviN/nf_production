import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Plus } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getProjects } from "@/features/projects/projectsApi";
import ProjectCard from "@/features/projects/components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    setLoading(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage productions and project teams."
        action={
          <Button asChild className="rounded-2xl gap-2">
            <Link to="/projects/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </Link>
          </Button>
        }
      />

      {loading ? (
        <Card className="rounded-3xl">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading projects...
          </CardContent>
        </Card>
      ) : projects.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Clapperboard className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No projects yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first audiovisual project.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}