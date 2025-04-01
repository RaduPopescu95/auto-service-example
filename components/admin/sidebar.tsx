"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  Car,
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Rezervări",
      href: "/admin/reservations",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Mesaje",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Clienți",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Vehicule",
      href: "/admin/vehicles",
      icon: <Car className="h-5 w-5" />,
    },
    {
      title: "Servicii & Prețuri",
      href: "/admin/services",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Rapoarte",
      href: "/admin/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Setări",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-background border-r fixed inset-y-0 z-40 flex w-72 flex-col transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b px-6 py-4 flex items-center">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            Auto<span className="text-primary">Service</span>
            <span className="text-sm font-normal text-muted-foreground ml-2">Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-2", pathname === item.href ? "bg-secondary" : "")}
                >
                  {item.icon}
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Deconectare
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

