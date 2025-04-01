"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Mesaj trimis",
      description: "Vă mulțumim pentru mesaj. Vă vom contacta în curând.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contactează-ne</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Suntem aici pentru a răspunde întrebărilor tale și pentru a te ajuta cu orice serviciu auto de care ai
                nevoie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Informații de contact</h2>
                <p className="text-muted-foreground">
                  Ne poți contacta prin telefon, email sau ne poți vizita la adresa noastră.
                </p>
              </div>

              <div className="grid gap-4 mt-4">
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold">Adresă</h3>
                      <p className="text-muted-foreground">Strada Exemplu, Nr. 123, București, România</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold">Telefon</h3>
                      <p className="text-muted-foreground">+40 123 456 789</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground">contact@autoservice.ro</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold">Program</h3>
                      <p className="text-muted-foreground">Luni - Vineri: 08:00 - 18:00</p>
                      <p className="text-muted-foreground">Sâmbătă: 09:00 - 14:00</p>
                      <p className="text-muted-foreground">Duminică: Închis</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Link href="/booking">
                  <Button className="w-full">Programare ITP</Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Trimite-ne un mesaj</CardTitle>
                <CardDescription>
                  Completează formularul de mai jos și te vom contacta în cel mai scurt timp.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nume și prenume</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Numele tău complet"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="exemplu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="07XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subiect</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Motivul contactării"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Detaliile mesajului tău"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Locația noastră</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ne găsești ușor în centrul orașului
              </p>
            </div>
          </div>
          <div className="w-full h-[400px] rounded-xl overflow-hidden border">
            {/* Placeholder for map - in a real implementation, you would use Google Maps or another map provider */}
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Hartă Google Maps</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

