"use client"

import { useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Adăugăm funcționalitate pentru deconectare
import { useRouter } from "next/navigation"

export default function AdminHeader() {
  // Adăugăm în componenta AdminHeader
  const router = useRouter()

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Rezervare nouă",
      message: "O nouă rezervare ITP a fost efectuată",
      time: "acum 5 minute",
      read: false,
    },
    {
      id: 2,
      title: "Mesaj nou",
      message: "Aveți un mesaj nou de la Ion Popescu",
      time: "acum 30 minute",
      read: false,
    },
    {
      id: 3,
      title: "Rezervare anulată",
      message: "O rezervare a fost anulată",
      time: "acum 2 ore",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  return (
    <header className="border-b bg-background h-16 flex items-center px-4 md:px-6">
      <div className="flex-1 flex items-center">
        <form className="relative hidden md:flex items-center w-full max-w-sm">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Caută..." className="pl-8 w-full" />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-medium">Notificări</h4>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
                  Marchează toate ca citite
                </Button>
              )}
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-0 ${notification.read ? "" : "bg-muted/50"}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium">{notification.title}</h5>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">Nu aveți notificări</div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Setări</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Deconectare</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

