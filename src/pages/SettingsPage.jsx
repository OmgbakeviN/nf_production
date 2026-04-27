import { useEffect, useState } from "react";
import { Camera, KeyRound, Loader2, Save, UserCircle } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  changePassword,
  getMe,
  updateProfile,
} from "@/features/auth/authApi";

import {
  saveCurrentUser,
  getCurrentUser,
} from "@/features/auth/authStore";

export default function SettingsPage() {
  const [user, setUser] = useState(getCurrentUser());

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone: "",
    avatar: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function loadMe() {
    const data = await getMe();

    setUser(data);
    saveCurrentUser(data);

    setProfileForm({
      full_name: data.full_name || "",
      phone: data.phone || "",
      avatar: null,
    });
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function handleProfileSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append("full_name", profileForm.full_name);
    data.append("phone", profileForm.phone || "");

    if (profileForm.avatar) {
      data.append("avatar", profileForm.avatar);
    }

    setProfileLoading(true);
    setProfileMessage("");

    try {
      const updatedUser = await updateProfile(data);
      saveCurrentUser(updatedUser);
      setUser(updatedUser);
      setProfileMessage("Profile updated successfully.");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    setPasswordLoading(true);
    setPasswordMessage("");
    setPasswordError("");

    try {
      await changePassword(passwordForm);

      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      setPasswordMessage("Password changed successfully.");
    } catch (error) {
      setPasswordError("Password change failed. Check your current password.");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, avatar and password."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="relative">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted">
                  <UserCircle className="h-16 w-16 text-muted-foreground" />
                </div>
              )}

              <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Camera className="h-4 w-4" />
              </div>
            </div>

            <div>
              <p className="font-semibold">{user?.full_name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="mt-2 rounded-full bg-muted px-3 py-1 text-xs">
                {user?.role}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <Input
                placeholder="Full name"
                value={profileForm.full_name}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    full_name: e.target.value,
                  })
                }
                required
              />

              <Input
                placeholder="Phone"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    phone: e.target.value,
                  })
                }
              />

              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    avatar: e.target.files[0],
                  })
                }
              />

              {profileMessage && (
                <p className="rounded-2xl bg-primary/10 px-3 py-2 text-sm text-primary">
                  {profileMessage}
                </p>
              )}

              <Button
                disabled={profileLoading}
                className="rounded-2xl gap-2"
              >
                {profileLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="text-base">Change password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="grid gap-4">
            <Input
              type="password"
              placeholder="Current password"
              value={passwordForm.current_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  current_password: e.target.value,
                })
              }
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="password"
                placeholder="New password"
                value={passwordForm.new_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password: e.target.value,
                  })
                }
                required
              />

              <Input
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirm_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm_password: e.target.value,
                  })
                }
                required
              />
            </div>

            {passwordMessage && (
              <p className="rounded-2xl bg-primary/10 px-3 py-2 text-sm text-primary">
                {passwordMessage}
              </p>
            )}

            {passwordError && (
              <p className="rounded-2xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {passwordError}
              </p>
            )}

            <Button
              disabled={passwordLoading}
              className="w-fit rounded-2xl gap-2"
            >
              {passwordLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              Change password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}