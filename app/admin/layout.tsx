import type React from "react"
import type { Metadata } from "next"
import AdminLayoutClient from "./AdminLayoutClient"

export const metadata: Metadata = {
  title: "Admin Panel - Auto Service & ITP Station",
  description: "Panou de administrare pentru service auto și stație ITP",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}

