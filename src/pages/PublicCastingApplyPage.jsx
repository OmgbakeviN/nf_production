import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Clapperboard } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import ApplicationForm from "@/features/castings/components/ApplicationForm";
import { getPublicCasting, submitApplication } from "@/features/castings/castingsApi";

export default function PublicCastingApplyPage() {
  const { id } = useParams();

  const [casting, setCasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getPublicCasting(id);
        setCasting(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(formData) {
    setSending(true);
    try {
      await submitApplication(id, formData);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Loading casting...</p>
      </main>
    );
  }

  if (!casting) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md rounded-3xl">
          <CardContent className="p-6 text-center">
            <p className="font-medium">Casting not available</p>
            <p className="text-sm text-muted-foreground">
              This casting is closed or does not exist.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md rounded-3xl">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-semibold">Application submitted</h1>
            <p className="text-sm text-muted-foreground">
              Your application has been received. The production team will contact you after review.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="rounded-3xl">
          <CardContent className="space-y-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Clapperboard className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">{casting.title}</h1>
              <p className="text-sm text-muted-foreground">{casting.description}</p>
            </div>

            {casting.requirements && (
              <p className="rounded-2xl bg-muted p-4 text-sm">
                {casting.requirements}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="p-5 sm:p-6">
            <ApplicationForm onSubmit={handleSubmit} loading={sending} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}