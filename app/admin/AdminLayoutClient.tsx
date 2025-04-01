"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificăm dacă utilizatorul este autentificat
    const checkAuth = () => {
      const authenticated = localStorage.getItem("adminAuthenticated") === "true"
      setIsAuthenticated(authenticated)
      setIsLoading(false)

      // Dacă nu este autentificat și nu este deja pe pagina de login, redirecționăm
      if (!authenticated && !pathname.includes("/admin/login")) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [pathname, router])

  // Afișăm doar pagina de login dacă utilizatorul nu este autentificat
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Se încarcă...</div>
  }

  if (!isAuthenticated && !pathname.includes("/admin/login")) {
    return null // Nu afișăm nimic în timp ce redirecționăm
  }

  // Dacă suntem pe pagina de login, afișăm doar conținutul fără layout-ul de admin
  if (pathname.includes("/admin/login")) {
    return <>{children}</>
  }

  // Afișăm layout-ul complet de admin pentru utilizatorii autentificați
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

