import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import ProjectForm from "@/features/projects/components/ProjectForm";
import { createProject } from "@/features/projects/projectsApi";

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleCreate(formData) {
    setLoading(true);

    try {
      const project = await createProject(formData);
      navigate(`/projects/${project.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="New Project"
        description="Create a new production workspace."
      />

      <Card className="rounded-3xl">
        <CardContent className="p-5 sm:p-6">
          <ProjectForm onSubmit={handleCreate} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}