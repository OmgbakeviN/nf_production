import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, Plus, Trash2 } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { getProject } from "@/features/projects/projectsApi";
import {
  createScheduleEvent,
  deleteScheduleEvent,
  getLocations,
  getScheduleEvents,
} from "@/features/schedules/schedulesApi";

export default function ProjectSchedulePage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    event_type: "SHOOTING",
    description: "",
    location: "",
    start_datetime: "",
    end_datetime: "",
  });

  async function loadData() {
    setLoading(true);

    try {
      const [projectData, locationsData, eventsData] = await Promise.all([
        getProject(id),
        getLocations(id),
        getScheduleEvents(id),
      ]);

      setProject(projectData);
      setLocations(locationsData);
      setEvents(eventsData);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();

    const payload = {
      ...form,
      location: form.location || null,
    };

    await createScheduleEvent(id, payload);

    setForm({
      title: "",
      event_type: "SHOOTING",
      description: "",
      location: "",
      start_datetime: "",
      end_datetime: "",
    });

    loadData();
  }

  async function handleDelete(eventId) {
    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) return;

    await deleteScheduleEvent(id, eventId);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading schedule...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        description={project?.title}
      />

      <Card className="rounded-3xl">
        <CardContent className="p-5">
          <form onSubmit={handleCreate} className="grid gap-4">
            <Input
              placeholder="Event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                value={form.event_type}
                onValueChange={(value) => setForm({ ...form, event_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Event type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="SHOOTING">Shooting</SelectItem>
                  <SelectItem value="REHEARSAL">Rehearsal</SelectItem>
                  <SelectItem value="MEETING">Meeting</SelectItem>
                  <SelectItem value="DEADLINE">Deadline</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.location}
                onValueChange={(value) => setForm({ ...form, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>

                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={String(location.id)}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="datetime-local"
                value={form.start_datetime}
                onChange={(e) => setForm({ ...form, start_datetime: e.target.value })}
                required
              />

              <Input
                type="datetime-local"
                value={form.end_datetime}
                onChange={(e) => setForm({ ...form, end_datetime: e.target.value })}
                required
              />
            </div>

            <Button className="rounded-2xl gap-2">
              <Plus className="h-4 w-4" />
              Add event
            </Button>
          </form>
        </CardContent>
      </Card>

      {events.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <CalendarDays className="h-7 w-7 text-muted-foreground" />
            <p className="font-medium">No schedule yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {events.map((event) => (
            <Card key={event.id} className="rounded-3xl">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.event_type} · {event.location_details?.name || "No location"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(event.start_datetime).toLocaleString()} →{" "}
                    {new Date(event.end_datetime).toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  className="rounded-2xl gap-2 text-destructive"
                  onClick={() => handleDelete(event.id)}
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