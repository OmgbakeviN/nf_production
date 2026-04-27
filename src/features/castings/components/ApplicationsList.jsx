import { Link } from "react-router-dom";
import { Eye, Mail, MapPin, Phone, UserCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

export default function ApplicationsList({ applications }) {
  return (
    <div className="grid gap-3">
      {applications.map((app) => (
        <Card key={app.id} className="rounded-3xl">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
                <UserCircle className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">{app.full_name}</p>

                <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-3">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {app.email}
                  </span>

                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {app.phone}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {app.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ApplicationStatusBadge status={app.status} />

              <Button asChild size="icon" variant="outline" className="rounded-2xl">
                <Link to={`/applications/${app.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}