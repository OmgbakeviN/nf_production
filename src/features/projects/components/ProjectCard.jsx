import { Link } from "react-router-dom";
import { Calendar, Clapperboard, Eye, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden rounded-3xl">
      {project.cover_image_url ? (
        <img
          src={project.cover_image_url}
          alt={project.title}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="flex h-40 items-center justify-center bg-muted">
          <Clapperboard className="h-10 w-10 text-muted-foreground" />
        </div>
      )}

      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{project.title}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {project.short_description}
            </p>
          </div>

          <Badge className="rounded-full">{project.status}</Badge>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clapperboard className="h-3 w-3" />
            {project.project_type}
          </span>

          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {project.members_count || 0}
          </span>

          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(project.created_at).toLocaleDateString()}
          </span>
        </div>

        <Button asChild className="w-full rounded-2xl gap-2">
          <Link to={`/projects/${project.id}`}>
            <Eye className="h-4 w-4" />
            Open
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}