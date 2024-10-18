import { FC, memo, ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminDashboard } from "@/pages/AdminDashboard";
import { Login } from "@/pages/Login";
import { SignUp } from "@/pages/SignUp";

import { useAuthSession } from "../AuthProvider";
import { Main } from "@/pages/Main";
import { UserChat } from "@/pages/UserChat";

const AuthRouteWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  const { user } = useAuthSession();

  if (user?.role === "admin" || user?.role === "superAdmin") {
    return <Navigate to="/admin" />;
  }

  if (user?.role === "user") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
});

const AdminRouteWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  const { user } = useAuthSession();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin" && user.role !== "superAdmin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
});

const UserRouteWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  const { user } = useAuthSession();
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "admin" || user.role === "superAdmin") {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
});

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={
            <AuthRouteWrapper>
              <Login />
            </AuthRouteWrapper>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthRouteWrapper>
              <SignUp />
            </AuthRouteWrapper>
          }
        />
        {/* ADMINS ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRouteWrapper>
              <AdminDashboard />
            </AdminRouteWrapper>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/"
          element={
            <UserRouteWrapper>
              <Main />
            </UserRouteWrapper>
          }
        />
        <Route
          path="/chat"
          element={
            <UserRouteWrapper>
              <UserChat />
            </UserRouteWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
