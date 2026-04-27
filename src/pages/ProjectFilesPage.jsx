import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Files } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

import { getProject } from "@/features/projects/projectsApi";
import { getProjectFiles } from "@/features/files/filesApi";
import ProjectFileCard from "@/features/files/components/ProjectFileCard";
import ProjectFileUploadDialog from "@/features/files/components/ProjectFileUploadDialog";

export default function ProjectFilesPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    try {
      const [projectData, filesData] = await Promise.all([
        getProject(id),
        getProjectFiles(id),
      ]);

      setProject(projectData);
      setFiles(filesData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading files...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Files"
        description={project?.title}
        action={<ProjectFileUploadDialog projectId={id} onCreated={loadData} />}
      />

      {files.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Files className="h-6 w-6 text-muted-foreground" />
            </div>

            <p className="font-medium">No files yet</p>

            <p className="text-sm text-muted-foreground">
              Upload scripts, images, storyboards or production notes.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {files.map((file) => (
            <ProjectFileCard
              key={file.id}
              projectId={id}
              file={file}
              onUpdated={loadData}
            />
          ))}
        </div>
      )}
    </div>
  );
}