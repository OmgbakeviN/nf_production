import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import CastingForm from "@/features/castings/components/CastingForm";
import { createCasting } from "@/features/castings/castingsApi";

export default function NewCastingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleCreate(payload) {
    setLoading(true);
    try {
      await createCasting(payload);
      navigate("/castings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="New Casting"
        description="Create a public application form for actors."
      />

      <Card className="rounded-3xl">
        <CardContent className="p-5 sm:p-6">
          <CastingForm onSubmit={handleCreate} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}