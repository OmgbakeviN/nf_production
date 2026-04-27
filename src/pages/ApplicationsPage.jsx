import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipboardList } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

import { getApplications } from "@/features/castings/castingsApi";
import ApplicationsList from "@/features/castings/components/ApplicationsList";

export default function ApplicationsPage() {
  const [searchParams] = useSearchParams();
  const castingId = searchParams.get("casting");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadApplications() {
    setLoading(true);
    try {
      const data = await getApplications(castingId ? { casting: castingId } : {});
      setApplications(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, [castingId]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description="Review actor applications and update their status."
      />

      {loading ? (
        <Card className="rounded-3xl">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading applications...
          </CardContent>
        </Card>
      ) : applications.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <ClipboardList className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No applications yet</p>
            <p className="text-sm text-muted-foreground">
              Applications submitted through public casting forms will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ApplicationsList applications={applications} />
      )}
    </div>
  );
}