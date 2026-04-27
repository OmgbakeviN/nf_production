import { useState } from "react";
import { UploadCloud, Send } from "lucide-react";

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

export default function ApplicationForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "MALE",
    phone: "",
    email: "",
    location: "",
    acting_experience: "false",
    experience_details: "",
    portfolio_link: "",
    languages: "",
    special_skills: "",
    camera_confidence: "5",
    available_for_filming: "true",
    available_for_rehearsals: "true",
    motivation: "",
    reliability_reason: "",
    preferred_role: "SUPPORTING",
    role_limitations: "",
    commitment_confirmed: "true",
    signed_name: "",
    headshot: null,
    video: null,
  });

  function setValue(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Full name" value={form.full_name} onChange={(e) => setValue("full_name", e.target.value)} required />
        <Input type="number" placeholder="Age" value={form.age} onChange={(e) => setValue("age", e.target.value)} required />
        <Input placeholder="Phone" value={form.phone} onChange={(e) => setValue("phone", e.target.value)} required />
        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setValue("email", e.target.value)} required />
        <Input placeholder="Location" value={form.location} onChange={(e) => setValue("location", e.target.value)} required />

        <Select value={form.gender} onValueChange={(value) => setValue("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
            <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="grid gap-4">
        <Select value={form.acting_experience} onValueChange={(value) => setValue("acting_experience", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Acting experience?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Experience: Yes</SelectItem>
            <SelectItem value="false">Experience: No</SelectItem>
          </SelectContent>
        </Select>

        <Textarea placeholder="Key roles/projects" value={form.experience_details} onChange={(e) => setValue("experience_details", e.target.value)} />
        <Input placeholder="Portfolio / showreel link" value={form.portfolio_link} onChange={(e) => setValue("portfolio_link", e.target.value)} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Languages" value={form.languages} onChange={(e) => setValue("languages", e.target.value)} required />
        <Input type="number" min="1" max="10" placeholder="Camera confidence 1-10" value={form.camera_confidence} onChange={(e) => setValue("camera_confidence", e.target.value)} required />
        <Textarea className="sm:col-span-2" placeholder="Special skills" value={form.special_skills} onChange={(e) => setValue("special_skills", e.target.value)} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Select value={form.available_for_filming} onValueChange={(value) => setValue("available_for_filming", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Available for filming?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Filming: Yes</SelectItem>
            <SelectItem value="false">Filming: No</SelectItem>
          </SelectContent>
        </Select>

        <Select value={form.available_for_rehearsals} onValueChange={(value) => setValue("available_for_rehearsals", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Available for rehearsals?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Rehearsals: Yes</SelectItem>
            <SelectItem value="false">Rehearsals: No</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="grid gap-4">
        <Textarea placeholder="Why do you want this role?" value={form.motivation} onChange={(e) => setValue("motivation", e.target.value)} required />
        <Textarea placeholder="What makes you reliable?" value={form.reliability_reason} onChange={(e) => setValue("reliability_reason", e.target.value)} required />

        <Select value={form.preferred_role} onValueChange={(value) => setValue("preferred_role", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Preferred role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LEAD">Lead</SelectItem>
            <SelectItem value="SUPPORTING">Supporting</SelectItem>
            <SelectItem value="EXTRA">Extra</SelectItem>
          </SelectContent>
        </Select>

        <Textarea placeholder="Any role limitations?" value={form.role_limitations} onChange={(e) => setValue("role_limitations", e.target.value)} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center">
          <UploadCloud className="mb-2 h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium">Headshot</span>
          <Input type="file" accept="image/*" className="mt-3" onChange={(e) => setValue("headshot", e.target.files[0])} required />
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-6 text-center">
          <UploadCloud className="mb-2 h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium">1-minute video</span>
          <Input type="file" accept="video/*" className="mt-3" onChange={(e) => setValue("video", e.target.files[0])} required />
        </label>
      </section>

      <Input placeholder="Name + Date" value={form.signed_name} onChange={(e) => setValue("signed_name", e.target.value)} required />

      <Button disabled={loading} className="w-full rounded-2xl gap-2">
        <Send className="h-4 w-4" />
        Submit application
      </Button>
    </form>
  );
}