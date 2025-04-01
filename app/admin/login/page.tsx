"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Modificăm funcția handleSubmit pentru a simula autentificarea
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Pentru demo, acceptăm orice email și parolă care nu sunt goale
    if (formData.email && formData.password) {
      // Simulăm stocarea unui token de autentificare
      localStorage.setItem("adminAuthenticated", "true")
      localStorage.setItem("adminUser", formData.email)

      toast({
        title: "Autentificare reușită",
        description: "Bine ai venit în panoul de administrare!",
      })

      router.push("/admin")
    } else {
      toast({
        title: "Eroare de autentificare",
        description: "Adresa de email sau parola sunt incorecte.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-2">
              <Mountain className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Autentificare Admin</CardTitle>
          <CardDescription>Introduceți datele de autentificare pentru a accesa panoul de administrare</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@autoservice.ro"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Parolă</Label>
                <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline">
                  Ai uitat parola?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Se autentifică..." : "Autentificare"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

