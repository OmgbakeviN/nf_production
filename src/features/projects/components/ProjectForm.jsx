import { useState } from "react";
import { Save, UploadCloud } from "lucide-react";

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

export default function ProjectForm({ onSubmit, loading, initialData = null }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    project_type: initialData?.project_type || "YOUTUBE",
    genre: initialData?.genre || "",
    short_description: initialData?.short_description || "",
    synopsis: initialData?.synopsis || "",
    status: initialData?.status || "DRAFT",
    cover_image: null,
  });

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        placeholder="Project title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          value={form.project_type}
          onValueChange={(value) => setForm({ ...form, project_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Project type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="FILM">Film</SelectItem>
            <SelectItem value="SERIES">Series</SelectItem>
            <SelectItem value="YOUTUBE">YouTube</SelectItem>
            <SelectItem value="CLIP">Music Clip</SelectItem>
            <SelectItem value="SHORT_FILM">Short Film</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
      </div>

      <Textarea
        placeholder="Short description"
        className="min-h-24"
        value={form.short_description}
        onChange={(e) =>
          setForm({ ...form, short_description: e.target.value })
        }
        required
      />

      <Textarea
        placeholder="Synopsis"
        className="min-h-32"
        value={form.synopsis}
        onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
      />

      <Select
        value={form.status}
        onValueChange={(value) => setForm({ ...form, status: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="DRAFT">Draft</SelectItem>
          <SelectItem value="CASTING">Casting</SelectItem>
          <SelectItem value="PRE_PRODUCTION">Pre-production</SelectItem>
          <SelectItem value="PRODUCTION">Production</SelectItem>
          <SelectItem value="POST_PRODUCTION">Post-production</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {initialData?.cover_image_url && (
        <div className="overflow-hidden rounded-3xl border">
          <img
            src={initialData.cover_image_url}
            alt={initialData.title}
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center">
        <UploadCloud className="mb-2 h-6 w-6 text-muted-foreground" />
        <span className="text-sm font-medium">
          {initialData ? "Replace cover image" : "Cover image"}
        </span>

        <Input
          type="file"
          accept="image/*"
          className="mt-3"
          onChange={(e) =>
            setForm({ ...form, cover_image: e.target.files[0] })
          }
        />
      </label>

      <Button disabled={loading} className="rounded-2xl gap-2">
        <Save className="h-4 w-4" />
        {initialData ? "Update project" : "Save project"}
      </Button>
    </form>
  );
}