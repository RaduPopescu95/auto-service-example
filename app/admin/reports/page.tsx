"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Download, FileText } from "lucide-react"
import { format } from "date-fns"
import { ro } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function ReportsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [reportType, setReportType] = useState<string>("revenue")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Rapoarte</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generare rapoarte</CardTitle>
          <CardDescription>Generează rapoarte personalizate pentru a analiza performanța afacerii</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tip raport</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Selectează tipul de raport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Venituri</SelectItem>
                  <SelectItem value="services">Servicii</SelectItem>
                  <SelectItem value="customers">Clienți</SelectItem>
                  <SelectItem value="vehicles">Vehicule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data de început</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP", { locale: ro }) : "Selectează data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Data de sfârșit</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP", { locale: ro }) : "Selectează data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => (startDate ? date < startDate : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generează raport
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Venituri</TabsTrigger>
          <TabsTrigger value="services">Servicii</TabsTrigger>
          <TabsTrigger value="customers">Clienți</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Raport venituri</CardTitle>
                <CardDescription>Analiza veniturilor pe perioada selectată</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-md p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Grafic venituri</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total venituri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,500 RON</div>
                <p className="text-xs text-muted-foreground mt-1">+12% față de perioada anterioară</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Număr servicii</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground mt-1">+8% față de perioada anterioară</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valoare medie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">170 RON</div>
                <p className="text-xs text-muted-foreground mt-1">+5% față de perioada anterioară</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clienți noi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground mt-1">+15% față de perioada anterioară</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Raport servicii</CardTitle>
                <CardDescription>Analiza serviciilor efectuate pe perioada selectată</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-md p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Grafic servicii</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Raport clienți</CardTitle>
                <CardDescription>Analiza clienților pe perioada selectată</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-md p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Grafic clienți</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

