import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Access/Login";
import Register from "../pages/Access/Register";
import Dashboard from "../pages/Dashboard";
import ProjectGeneralView from "../pages/Vista-proyecto";
import ControlAvance from "../pages/Control-avance";
import { ProgressReport } from "../pages/Report/ProgressReport";
import ProjectRegister from '../pages/Crear-proyecto';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/proyecto/:id/report"
        element={
          <ProtectedRoute>
            <ProgressReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/proyecto/:id"
        element={
          <ProtectedRoute>
            <ProjectGeneralView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/control-project"
        element={
          <PublicRoute>
            <ControlAvance />
          </PublicRoute>
        }
      />

      <Route path="/register-project" element={<ProtectedRoute> <ProjectRegister /> </ProtectedRoute>} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
