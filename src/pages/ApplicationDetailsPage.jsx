import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, HelpCircle, X } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ApplicationStatusBadge from "@/features/castings/components/ApplicationStatusBadge";

import {
  acceptApplication,
  getApplication,
  rejectApplication,
  requestApplicationInfo,
} from "@/features/castings/castingsApi";

export default function ApplicationDetailsPage() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadApplication() {
    setLoading(true);
    try {
      const data = await getApplication(id);
      setApplication(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplication();
  }, [id]);

  async function updateStatus(action) {
    const note = window.prompt("Add a note for the candidate:", "");

    if (action === "accept") {
      await acceptApplication(id, { note });
    }

    if (action === "reject") {
      await rejectApplication(id, { note });
    }

    if (action === "info") {
      await requestApplicationInfo(id, { note });
    }

    loadApplication();
  }

  if (loading || !application) {
    return <p className="text-sm text-muted-foreground">Loading application...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={application.full_name}
        description={application.casting_title}
        action={<ApplicationStatusBadge status={application.status} />}
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => updateStatus("accept")} className="rounded-2xl gap-2">
          <Check className="h-4 w-4" />
          Accept
        </Button>

        <Button onClick={() => updateStatus("reject")} variant="destructive" className="rounded-2xl gap-2">
          <X className="h-4 w-4" />
          Reject
        </Button>

        <Button onClick={() => updateStatus("info")} variant="outline" className="rounded-2xl gap-2">
          <HelpCircle className="h-4 w-4" />
          More info
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-3xl lg:col-span-2">
          <CardContent className="space-y-4 p-5">
            <Info label="Email" value={application.email} />
            <Info label="Phone" value={application.phone} />
            <Info label="Age" value={application.age} />
            <Info label="Gender" value={application.gender} />
            <Info label="Location" value={application.location} />
            <Info label="Preferred role" value={application.preferred_role} />
            <Info label="Languages" value={application.languages} />
            <Info label="Camera confidence" value={`${application.camera_confidence}/10`} />
            <Info label="Experience" value={application.acting_experience ? "Yes" : "No"} />
            <Info label="Experience details" value={application.experience_details || "—"} />
            <Info label="Special skills" value={application.special_skills || "—"} />
            <Info label="Motivation" value={application.motivation} />
            <Info label="Reliability" value={application.reliability_reason} />
            <Info label="Role limitations" value={application.role_limitations || "—"} />
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="space-y-4 p-5">
            {application.headshot_url && (
              <img
                src={application.headshot_url}
                alt={application.full_name}
                className="aspect-square w-full rounded-3xl object-cover"
              />
            )}

            {application.video_url && (
              <video
                src={application.video_url}
                controls
                className="w-full rounded-3xl"
              />
            )}

            {application.portfolio_link && (
              <Button asChild variant="outline" className="w-full rounded-2xl">
                <a href={application.portfolio_link} target="_blank">
                  Portfolio
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border-b pb-3 last:border-b-0">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}