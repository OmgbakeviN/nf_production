import { useEffect, useState } from "react";
import { Loader2, Plus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import { getUsers } from "@/features/users/usersApi";
import { addProjectMember } from "../projectsApi";

const roles = [
  { value: "PRODUCER", label: "Producer" },
  { value: "DIRECTOR", label: "Director" },
  { value: "SCRIPTWRITER", label: "Scriptwriter" },
  { value: "ACTOR", label: "Actor" },
  { value: "CAMERAMAN", label: "Cameraman" },
  { value: "EDITOR", label: "Editor" },
  { value: "CREW", label: "Crew" },
];

export default function AddProjectMemberDialog({ projectId, onCreated }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user: "",
    role: "ACTOR",
    character_name: "",
    character_description: "",
  });

  useEffect(() => {
    if (open) {
      getUsers().then(setUsers);
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await addProjectMember(projectId, form);
      setOpen(false);
      setForm({
        user: "",
        role: "ACTOR",
        character_name: "",
        character_description: "",
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
          <span className="hidden sm:inline">Add</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add project member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            value={form.user}
            onValueChange={(value) => setForm({ ...form, user: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>

            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.full_name} — {user.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={form.role}
            onValueChange={(value) => setForm({ ...form, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Project role" />
            </SelectTrigger>

            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Character name, for actors"
            value={form.character_name}
            onChange={(e) => setForm({ ...form, character_name: e.target.value })}
          />

          <Input
            placeholder="Character description"
            value={form.character_description}
            onChange={(e) => setForm({ ...form, character_description: e.target.value })}
          />

          <Button disabled={loading || !form.user} className="w-full rounded-2xl gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            Add member
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}