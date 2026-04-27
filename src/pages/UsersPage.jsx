import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

import { getUsers } from "@/features/users/usersApi";
import InviteUserDialog from "@/features/users/components/InviteUserDialog";
import UsersTable from "@/features/users/components/UsersTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Invite and manage your production team."
        action={<InviteUserDialog onCreated={loadUsers} />}
      />

      {loading ? (
        <Card className="rounded-3xl">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading users...
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No users yet</p>
            <p className="text-sm text-muted-foreground">
              Invite your first actor, writer or crew member.
            </p>
          </CardContent>
        </Card>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}