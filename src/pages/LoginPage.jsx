import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clapperboard, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { loginUser, getMe } from "@/features/auth/authApi";
import { saveCurrentUser, saveTokens } from "@/features/auth/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const tokens = await loginUser(form);
      saveTokens(tokens);

      const user = await getMe();
      saveCurrentUser(user);

      if (user.role === "PRODUCER") {
        navigate("/dashboard");
      } else {
        navigate("/projects");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
            <Clapperboard className="h-6 w-6" />
          </div>
          <span className="text-xl font-semibold">ProdHub</span>
        </div>

        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Your production command center.
          </h1>
          <p className="text-primary-foreground/75">
            Manage castings, projects, scripts, teams and schedules in one private workspace.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Clapperboard className="h-5 w-5" />
              </div>
              <span className="font-semibold">ProdHub</span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Login</h2>
              <p className="text-sm text-muted-foreground">
                Access your production dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-9"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-9"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              {error && (
                <p className="rounded-2xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button className="w-full rounded-2xl" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}