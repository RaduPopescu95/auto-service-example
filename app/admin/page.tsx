import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatCard from "@/components/admin/stat-card"
import { Calendar, Car, Clock, DollarSign, MessageSquare, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Adaugă rezervare
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="overview">Prezentare generală</TabsTrigger>
          <TabsTrigger value="analytics">Analiză</TabsTrigger>
          <TabsTrigger value="reports">Rapoarte</TabsTrigger>
        </TabsList> */}

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Rezervări totale"
              value="342"
              description="Luna curentă"
              icon={Calendar}
              trend={{ value: 12, isPositive: true }}
            />
            {/* <StatCard
              title="Venituri"
              value="24,500 RON"
              description="Luna curentă"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
            /> */}
            <StatCard
              title="Clienți noi"
              value="54"
              description="Luna curentă"
              icon={Users}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard title="Mesaje necitite" value="12" description="Ultimele 7 zile" icon={MessageSquare} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Rezervări recente</CardTitle>
                <CardDescription>Ultimele 5 rezervări efectuate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Car className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ITP Autoturism - Dacia Logan</p>
                          <p className="text-xs text-muted-foreground">Ion Popescu • B 123 ABC</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">01 Apr, 10:00</p>
                        <p className="text-xs text-muted-foreground">150 RON</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/admin/reservations">
                    <Button variant="outline" size="sm">
                      Vezi toate rezervările
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Programul de astăzi</CardTitle>
                <CardDescription>01 Aprilie 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "09:00", name: "Maria Ionescu", service: "ITP Autoturism" },
                    { time: "10:00", name: "Andrei Popa", service: "ITP SUV" },
                    { time: "11:00", name: "Elena Dumitrescu", service: "ITP Autoturism" },
                    { time: "14:00", name: "Mihai Georgescu", service: "ITP Autoutilitară" },
                    { time: "16:00", name: "Ana Vasilescu", service: "ITP Autoturism" },
                  ].map((appointment, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {appointment.time} - {appointment.service}
                        </p>
                        <p className="text-xs text-muted-foreground">{appointment.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Mesaje recente</CardTitle>
                <CardDescription>Ultimele 3 mesaje primite</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Alexandru Marin",
                      message: "Aș dori să știu dacă aveți disponibilitate pentru schimb de ulei săptămâna viitoare.",
                      time: "acum 2 ore",
                    },
                    {
                      name: "Elena Popescu",
                      message: "Bună ziua, ce documente trebuie să aduc pentru ITP?",
                      time: "acum 5 ore",
                    },
                    {
                      name: "Mihai Ionescu",
                      message: "Vreau să fac o programare pentru verificarea frânelor.",
                      time: "acum 1 zi",
                    },
                  ].map((message, i) => (
                    <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium">{message.name}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{message.message}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/admin/messages">
                    <Button variant="outline" size="sm">
                      Vezi toate mesajele
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Servicii populare</CardTitle>
                <CardDescription>Cele mai solicitate servicii luna aceasta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "ITP Autoturism", count: 156, percentage: 45 },
                    { name: "Schimb ulei și filtre", count: 98, percentage: 28 },
                    { name: "Geometrie roți", count: 54, percentage: 16 },
                    { name: "Diagnoză computerizată", count: 34, percentage: 10 },
                  ].map((service, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{service.name}</p>
                        <span className="text-xs text-muted-foreground">{service.count}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${service.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activitate recentă</CardTitle>
                <CardDescription>Ultimele acțiuni în sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Rezervare nouă",
                      details: "Ion Popescu a făcut o programare pentru ITP",
                      time: "acum 10 minute",
                    },
                    { action: "Mesaj nou", details: "Alexandru Marin a trimis un mesaj", time: "acum 2 ore" },
                    {
                      action: "Rezervare actualizată",
                      details: "Programarea lui Maria Ionescu a fost modificată",
                      time: "acum 3 ore",
                    },
                    { action: "Serviciu finalizat", details: "ITP pentru Dacia Logan B 123 ABC", time: "acum 5 ore" },
                    {
                      action: "Preț actualizat",
                      details: "Prețul pentru ITP Autoturism a fost actualizat",
                      time: "acum 1 zi",
                    },
                  ].map((activity, i) => (
                    <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analiză</CardTitle>
              <CardDescription>Vizualizare detaliată a datelor și statisticilor</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Grafice și statistici detaliate</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapoarte</CardTitle>
              <CardDescription>Generare și vizualizare rapoarte</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Rapoarte disponibile</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

