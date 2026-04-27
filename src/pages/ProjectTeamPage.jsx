import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Users } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

import {
  getProject,
  getProjectMembers,
} from "@/features/projects/projectsApi";

import AddProjectMemberDialog from "@/features/projects/components/AddProjectMemberDialog";
import ProjectMembersList from "@/features/projects/components/ProjectMembersList";

export default function ProjectTeamPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    try {
      const [projectData, membersData] = await Promise.all([
        getProject(id),
        getProjectMembers(id),
      ]);

      setProject(projectData);
      setMembers(membersData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading team...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Team"
        description={project?.title}
        action={<AddProjectMemberDialog projectId={id} onCreated={loadData} />}
      />

      {members.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No members yet</p>
            <p className="text-sm text-muted-foreground">
              Add actors, writers and crew members to this project.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ProjectMembersList
          projectId={id}
          members={members}
          onUpdated={loadData}
        />
      )}
    </div>
  );
}