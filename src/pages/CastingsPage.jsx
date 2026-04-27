import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ClipboardList } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getCastings } from "@/features/castings/castingsApi";
import CastingCard from "@/features/castings/components/CastingCard";

export default function CastingsPage() {
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCastings() {
    setLoading(true);
    try {
      const data = await getCastings();
      setCastings(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCastings();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Castings"
        description="Create public casting forms and collect actor applications."
        action={
          <Button asChild className="rounded-2xl gap-2">
            <Link to="/castings/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </Link>
          </Button>
        }
      />

      {loading ? (
        <Card className="rounded-3xl">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading castings...
          </CardContent>
        </Card>
      ) : castings.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <ClipboardList className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No castings yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first public casting form.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {castings.map((casting) => (
            <CastingCard key={casting.id} casting={casting} />
          ))}
        </div>
      )}
    </div>
  );
}