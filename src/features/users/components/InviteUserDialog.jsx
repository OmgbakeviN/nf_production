import { useState } from "react";
import { Loader2, Plus, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { inviteUser } from "../usersApi";

const roles = [
  { value: "PRODUCER", label: "Producer" },
  { value: "DIRECTOR", label: "Director" },
  { value: "SCRIPTWRITER", label: "Scriptwriter" },
  { value: "ACTOR", label: "Actor" },
  { value: "CREW", label: "Crew" },
];

export default function InviteUserDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "ACTOR",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await inviteUser(form);
      setOpen(false);
      setForm({
        full_name: "",
        email: "",
        phone: "",
        role: "ACTOR",
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
          <span className="hidden sm:inline">Invite</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            required
          />

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <Select
            value={form.role}
            onValueChange={(value) => setForm({ ...form, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>

            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="w-full rounded-2xl gap-2" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send invitation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}