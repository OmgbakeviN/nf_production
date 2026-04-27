import { Link } from "react-router-dom";
import { Calendar, ClipboardList, Eye, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CastingCard({ casting }) {
  const publicUrl = `${window.location.origin}/castings/${casting.id}/apply`;

  async function copyLink() {
    await navigator.clipboard.writeText(publicUrl);
  }

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{casting.title}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {casting.description}
            </p>
          </div>

          <Badge variant={casting.status === "OPEN" ? "default" : "secondary"} className="rounded-full">
            {casting.status}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {casting.deadline || "No deadline"}
          </span>

          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {casting.applications_count || 0}
          </span>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="secondary" className="flex-1 rounded-2xl gap-2">
            <Link to={`/applications?casting=${casting.id}`}>
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="icon" className="rounded-2xl">
            <Link to={`/castings/${casting.id}/apply`} target="_blank">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>

          <Button onClick={copyLink} size="icon" className="rounded-2xl">
            <ClipboardList className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}