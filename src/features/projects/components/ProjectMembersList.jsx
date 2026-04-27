import { Mail, Phone, Trash2, UserCircle } from "lucide-react";

import RoleBadge from "@/components/shared/RoleBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeProjectMember } from "../projectsApi";

export default function ProjectMembersList({ projectId, members, onUpdated }) {
  async function handleRemove(memberId) {
    const confirmed = window.confirm("Remove this member from the project?");

    if (!confirmed) return;

    await removeProjectMember(projectId, memberId);
    onUpdated?.();
  }

  return (
    <div className="grid gap-3">
      {members.map((member) => {
        const user = member.user_details;

        return (
          <Card key={member.id} className="rounded-3xl">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
                  <UserCircle className="h-6 w-6 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium">{user.full_name}</p>

                  <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-3">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>

                    {user.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </span>
                    )}
                  </div>

                  {member.character_name && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Character: {member.character_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <RoleBadge role={member.role} />

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl text-destructive"
                  onClick={() => handleRemove(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}