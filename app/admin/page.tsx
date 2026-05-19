"use client";

export default function AdminHome() {
  if (typeof window !== "undefined") {
    window.location.href = "/admin/kos";
  }
  return null;
}
