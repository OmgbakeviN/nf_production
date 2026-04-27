import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Plus, Trash2 } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { getProject } from "@/features/projects/projectsApi";
import {
  createLocation,
  deleteLocation,
  getLocations,
} from "@/features/schedules/schedulesApi";

export default function ProjectLocationsPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  async function loadData() {
    setLoading(true);
    try {
      const [projectData, locationsData] = await Promise.all([
        getProject(id),
        getLocations(id),
      ]);

      setProject(projectData);
      setLocations(locationsData);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    await createLocation(id, data);

    setForm({
      name: "",
      address: "",
      city: "",
      description: "",
      latitude: "",
      longitude: "",
      image: null,
    });

    loadData();
  }

  async function handleDelete(locationId) {
    const confirmed = window.confirm("Delete this location?");
    if (!confirmed) return;

    await deleteLocation(id, locationId);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading locations...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shooting Locations"
        description={project?.title}
      />

      <Card className="rounded-3xl">
        <CardContent className="p-5">
          <form onSubmit={handleCreate} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Location name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <Input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>

            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Latitude"
                value={form.latitude}
                onChange={(e) => setForm({ ...form, latitude: e.target.value })}
              />

              <Input
                placeholder="Longitude"
                value={form.longitude}
                onChange={(e) => setForm({ ...form, longitude: e.target.value })}
              />
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />

            <Button className="rounded-2xl gap-2">
              <Plus className="h-4 w-4" />
              Add location
            </Button>
          </form>
        </CardContent>
      </Card>

      {locations.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <MapPin className="h-7 w-7 text-muted-foreground" />
            <p className="font-medium">No locations yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.id} className="overflow-hidden rounded-3xl">
              {location.image_url ? (
                <img
                  src={location.image_url}
                  alt={location.name}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center bg-muted">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
              )}

              <CardContent className="space-y-3 p-5">
                <div>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {location.address}, {location.city}
                  </p>
                </div>

                {location.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {location.description}
                  </p>
                )}

                <Button
                  variant="ghost"
                  className="rounded-2xl gap-2 text-destructive"
                  onClick={() => handleDelete(location.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}