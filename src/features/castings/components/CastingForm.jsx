import { useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CastingForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    deadline: "",
    status: "OPEN",
    is_public: true,
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        placeholder="Casting title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <Textarea
        placeholder="Description"
        className="min-h-28"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <Textarea
        placeholder="Requirements"
        className="min-h-24"
        value={form.requirements}
        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <Select
          value={form.status}
          onValueChange={(value) => setForm({ ...form, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button disabled={loading} className="rounded-2xl gap-2">
        <Save className="h-4 w-4" />
        Save casting
      </Button>
    </form>
  );
}