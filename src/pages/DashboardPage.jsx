import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/shared/PageHeader";
import { Clapperboard, FileClock, Theater, Users } from "lucide-react";

const stats = [
  {
    label: "Projects",
    value: "0",
    icon: Clapperboard,
  },
  {
    label: "Applications",
    value: "0",
    icon: Theater,
  },
  {
    label: "Members",
    value: "0",
    icon: Users,
  },
  {
    label: "Pending scripts",
    value: "0",
    icon: FileClock,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your production activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className="rounded-3xl">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-semibold">{stat.value}</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}