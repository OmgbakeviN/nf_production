import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import UsersPage from "@/pages/UsersPage";

import CastingsPage from "@/pages/CastingsPage";
import NewCastingPage from "@/pages/NewCastingPage";
import PublicCastingApplyPage from "@/pages/PublicCastingApplyPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import ApplicationDetailsPage from "@/pages/ApplicationDetailsPage";

import ProjectsPage from "@/pages/ProjectsPage";
import NewProjectPage from "@/pages/NewProjectPage";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";
import ProjectTeamPage from "@/pages/ProjectTeamPage";
import EditProjectPage from "@/pages/EditProjectPage";
import ProjectFilesPage from "@/pages/ProjectFilesPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ProjectLocationsPage from "@/pages/ProjectLocationsPage";
import ProjectSchedulePage from "@/pages/ProjectSchedulePage";
import SettingsPage from "@/pages/SettingsPage";
import ProducerRoute from "@/features/auth/ProducerRoute";

import ProtectedRoute from "@/features/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <ProducerRoute>
                <DashboardPage />
              </ProducerRoute>
            </ProtectedLayout>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedLayout>
              <ProducerRoute>
                <UsersPage />
              </ProducerRoute>
            </ProtectedLayout>
          }
        />

        <Route path="/castings/:id/apply" element={<PublicCastingApplyPage />} />

        <Route
          path="/castings"
          element={
            <ProtectedLayout>
              <ProducerRoute>
                <CastingsPage />
              </ProducerRoute>
            </ProtectedLayout>
          }
        />

        <Route
          path="/castings/new"
          element={
            <ProtectedLayout>
              <NewCastingPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedLayout>
              <ProducerRoute>
                <ApplicationsPage />
              </ProducerRoute>
            </ProtectedLayout>
          }
        />

        <Route
          path="/applications/:id"
          element={
            <ProtectedLayout>
              <ApplicationDetailsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedLayout>
              <ProjectsPage />
            </ProtectedLayout>
          }
        />
        
        <Route
          path="/projects/new"
          element={
            <ProtectedLayout>
              <NewProjectPage />
            </ProtectedLayout>
          }
        />
        
        <Route
          path="/projects/:id"
          element={
            <ProtectedLayout>
              <ProjectDetailsPage />
            </ProtectedLayout>
          }
        />
        
        <Route
          path="/projects/:id/team"
          element={
            <ProtectedLayout>
              <ProjectTeamPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects/:id/edit"
          element={
            <ProtectedLayout>
              <EditProjectPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects/:id/files"
          element={
            <ProtectedLayout>
              <ProjectFilesPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedLayout>
              <NotificationsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects/:id/locations"
          element={
            <ProtectedLayout>
              <ProjectLocationsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/projects/:id/schedule"
          element={
            <ProtectedLayout>
              <ProjectSchedulePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedLayout>
              <SettingsPage />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}