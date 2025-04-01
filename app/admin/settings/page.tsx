"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Auto Service & ITP Station",
    email: "contact@autoservice.ro",
    phone: "+40 123 456 789",
    address: "Strada Exemplu, Nr. 123, București, România",
  })

  const [bookingSettings, setBookingSettings] = useState({
    allowOnlineBooking: true,
    requirePayment: true,
    minAdvanceHours: 24,
    maxAdvanceDays: 30,
    slotDuration: 30,
    workingHoursStart: "08:00",
    workingHoursEnd: "18:00",
    workingDays: [1, 2, 3, 4, 5, 6], // 0 = Sunday, 1 = Monday, etc.
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    reminderHours: 24,
    adminEmailNotifications: true,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({ ...generalSettings, [name]: value })
  }

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setBookingSettings({
      ...bookingSettings,
      [name]: type === "number" ? Number(value) : value,
    })
  }

  const handleBookingSwitchChange = (name: string, checked: boolean) => {
    setBookingSettings({ ...bookingSettings, [name]: checked })
  }

  const handleNotificationSwitchChange = (name: string, checked: boolean) => {
    setNotificationSettings({ ...notificationSettings, [name]: checked })
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: Number(value),
    })
  }

  const saveGeneralSettings = () => {
    toast({
      title: "Setări salvate",
      description: "Setările generale au fost actualizate cu succes.",
    })
  }

  const saveBookingSettings = () => {
    toast({
      title: "Setări salvate",
      description: "Setările de programare au fost actualizate cu succes.",
    })
  }

  const saveNotificationSettings = () => {
    toast({
      title: "Setări salvate",
      description: "Setările de notificare au fost actualizate cu succes.",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Setări</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="booking">Programări</TabsTrigger>
          <TabsTrigger value="notifications">Notificări</TabsTrigger>
          <TabsTrigger value="users">Utilizatori</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informații companie</CardTitle>
              <CardDescription>Setările generale ale companiei</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Nume companie</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={generalSettings.companyName}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={generalSettings.email}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" name="phone" value={generalSettings.phone} onChange={handleGeneralChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Adresă</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveGeneralSettings}>Salvează setările</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setări programări</CardTitle>
              <CardDescription>Configurează modul în care funcționează sistemul de programări</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowOnlineBooking">Permite programări online</Label>
                  <p className="text-sm text-muted-foreground">
                    Activează sau dezactivează sistemul de programări online
                  </p>
                </div>
                <Switch
                  id="allowOnlineBooking"
                  checked={bookingSettings.allowOnlineBooking}
                  onCheckedChange={(checked) => handleBookingSwitchChange("allowOnlineBooking", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requirePayment">Solicită plată în avans</Label>
                  <p className="text-sm text-muted-foreground">
                    Solicită plata în avans pentru confirmarea programării
                  </p>
                </div>
                <Switch
                  id="requirePayment"
                  checked={bookingSettings.requirePayment}
                  onCheckedChange={(checked) => handleBookingSwitchChange("requirePayment", checked)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="minAdvanceHours">Timp minim în avans (ore)</Label>
                <Input
                  id="minAdvanceHours"
                  name="minAdvanceHours"
                  type="number"
                  value={bookingSettings.minAdvanceHours}
                  onChange={handleBookingChange}
                />
                <p className="text-sm text-muted-foreground">Cu câte ore înainte se poate face o programare</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxAdvanceDays">Timp maxim în avans (zile)</Label>
                <Input
                  id="maxAdvanceDays"
                  name="maxAdvanceDays"
                  type="number"
                  value={bookingSettings.maxAdvanceDays}
                  onChange={handleBookingChange}
                />
                <p className="text-sm text-muted-foreground">Cu câte zile înainte se poate face o programare</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="slotDuration">Durata unui slot (minute)</Label>
                <Input
                  id="slotDuration"
                  name="slotDuration"
                  type="number"
                  value={bookingSettings.slotDuration}
                  onChange={handleBookingChange}
                />
                <p className="text-sm text-muted-foreground">Durata standard a unui slot de programare</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workingHoursStart">Program de lucru - început</Label>
                  <Input
                    id="workingHoursStart"
                    name="workingHoursStart"
                    type="time"
                    value={bookingSettings.workingHoursStart}
                    onChange={handleBookingChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="workingHoursEnd">Program de lucru - sfârșit</Label>
                  <Input
                    id="workingHoursEnd"
                    name="workingHoursEnd"
                    type="time"
                    value={bookingSettings.workingHoursEnd}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveBookingSettings}>Salvează setările</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setări notificări</CardTitle>
              <CardDescription>Configurează notificările pentru clienți și administratori</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Notificări prin email</Label>
                  <p className="text-sm text-muted-foreground">Trimite notificări prin email clienților</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationSwitchChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">Notificări prin SMS</Label>
                  <p className="text-sm text-muted-foreground">Trimite notificări prin SMS clienților</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationSwitchChange("smsNotifications", checked)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reminderHours">Timp reminder (ore)</Label>
                <Input
                  id="reminderHours"
                  name="reminderHours"
                  type="number"
                  value={notificationSettings.reminderHours}
                  onChange={handleNotificationChange}
                />
                <p className="text-sm text-muted-foreground">
                  Cu câte ore înainte de programare se trimite un reminder
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="adminEmailNotifications">Notificări admin</Label>
                  <p className="text-sm text-muted-foreground">Trimite notificări prin email administratorilor</p>
                </div>
                <Switch
                  id="adminEmailNotifications"
                  checked={notificationSettings.adminEmailNotifications}
                  onCheckedChange={(checked) => handleNotificationSwitchChange("adminEmailNotifications", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotificationSettings}>Salvează setările</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestionare utilizatori</CardTitle>
              <CardDescription>Administrează conturile de utilizator și permisiunile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-md p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Gestionare utilizatori și roluri</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

