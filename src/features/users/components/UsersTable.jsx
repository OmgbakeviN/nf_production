import { Mail, Phone, UserCircle } from "lucide-react";
import RoleBadge from "@/components/shared/RoleBadge";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersTable({ users }) {
  return (
    <div className="grid gap-3">
      {users.map((user) => (
        <Card key={user.id} className="rounded-3xl">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
                <UserCircle className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">{user.full_name}</p>

                <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
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
              </div>
            </div>

            <RoleBadge role={user.role} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}