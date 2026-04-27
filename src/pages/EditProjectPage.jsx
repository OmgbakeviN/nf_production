import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import ProjectForm from "@/features/projects/components/ProjectForm";

import {
  getProject,
  updateProject,
} from "@/features/projects/projectsApi";

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProject() {
    setLoading(true);

    try {
      const data = await getProject(id);
      setProject(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(formData) {
    setSaving(true);

    try {
      await updateProject(id, formData);
      navigate(`/projects/${id}`);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadProject();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading project...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Edit Project"
        description="Update project information and production details."
      />

      <Card className="rounded-3xl">
        <CardContent className="p-5 sm:p-6">
          <ProjectForm
            initialData={project}
            onSubmit={handleUpdate}
            loading={saving}
          />
        </CardContent>
      </Card>
    </div>
  );
}