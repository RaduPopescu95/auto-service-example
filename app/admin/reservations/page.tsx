"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronDown, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { format } from "date-fns"
import { ro } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

// Mock data for reservations
const INITIAL_RESERVATIONS = [
  {
    id: 1,
    customerName: "Ion Popescu",
    phone: "0712345678",
    email: "ion.popescu@example.com",
    service: "ITP Autoturism",
    vehicle: "Dacia Logan",
    licensePlate: "B 123 ABC",
    date: "2025-04-01",
    time: "10:00",
    status: "confirmed",
    price: 150,
    notes: "",
  },
  {
    id: 2,
    customerName: "Maria Ionescu",
    phone: "0723456789",
    email: "maria.ionescu@example.com",
    service: "ITP SUV",
    vehicle: "Volkswagen Tiguan",
    licensePlate: "B 234 BCD",
    date: "2025-04-01",
    time: "11:00",
    status: "completed",
    price: 170,
    notes: "Client fidel, a 3-a vizită",
  },
  {
    id: 3,
    customerName: "Alexandru Popa",
    phone: "0734567890",
    email: "alexandru.popa@example.com",
    service: "ITP Autoturism",
    vehicle: "Renault Clio",
    licensePlate: "B 345 CDE",
    date: "2025-04-01",
    time: "14:00",
    status: "confirmed",
    price: 150,
    notes: "",
  },
  {
    id: 4,
    customerName: "Elena Dumitrescu",
    phone: "0745678901",
    email: "elena.dumitrescu@example.com",
    service: "ITP Autoutilitară",
    vehicle: "Ford Transit",
    licensePlate: "B 456 DEF",
    date: "2025-04-02",
    time: "09:00",
    status: "pending",
    price: 200,
    notes: "Prima vizită",
  },
  {
    id: 5,
    customerName: "Mihai Georgescu",
    phone: "0756789012",
    email: "mihai.georgescu@example.com",
    service: "ITP Autoturism",
    vehicle: "Skoda Octavia",
    licensePlate: "B 567 EFG",
    date: "2025-04-02",
    time: "10:00",
    status: "cancelled",
    price: 150,
    notes: "A anulat din motive personale",
  },
  {
    id: 6,
    customerName: "Ana Vasilescu",
    phone: "0767890123",
    email: "ana.vasilescu@example.com",
    service: "ITP Motocicletă",
    vehicle: "Honda CBR",
    licensePlate: "B 678 FGH",
    date: "2025-04-02",
    time: "11:00",
    status: "confirmed",
    price: 100,
    notes: "",
  },
  {
    id: 7,
    customerName: "Cristian Munteanu",
    phone: "0778901234",
    email: "cristian.munteanu@example.com",
    service: "ITP Autoturism",
    vehicle: "Toyota Corolla",
    licensePlate: "B 789 GHI",
    date: "2025-04-03",
    time: "09:00",
    status: "confirmed",
    price: 150,
    notes: "",
  },
  {
    id: 8,
    customerName: "Ioana Preda",
    phone: "0789012345",
    email: "ioana.preda@example.com",
    service: "ITP SUV",
    vehicle: "Hyundai Tucson",
    licensePlate: "B 890 HIJ",
    date: "2025-04-03",
    time: "10:00",
    status: "confirmed",
    price: 170,
    notes: "",
  },
  {
    id: 9,
    customerName: "Bogdan Stanescu",
    phone: "0790123456",
    email: "bogdan.stanescu@example.com",
    service: "ITP Autoturism",
    vehicle: "Opel Astra",
    licensePlate: "B 901 IJK",
    date: "2025-04-03",
    time: "14:00",
    status: "pending",
    price: 150,
    notes: "A solicitat verificare suplimentară a frânelor",
  },
  {
    id: 10,
    customerName: "Andreea Diaconu",
    phone: "0701234567",
    email: "andreea.diaconu@example.com",
    service: "ITP Autoturism",
    vehicle: "Peugeot 308",
    licensePlate: "B 012 JKL",
    date: "2025-04-04",
    time: "09:00",
    status: "confirmed",
    price: 150,
    notes: "",
  },
]

// Service types
const SERVICE_TYPES = [
  { id: "itp-auto", name: "ITP Autoturism", price: 150 },
  { id: "itp-suv", name: "ITP SUV", price: 170 },
  { id: "itp-van", name: "ITP Autoutilitară", price: 200 },
  { id: "itp-moto", name: "ITP Motocicletă", price: 100 },
  { id: "oil-change", name: "Schimb ulei și filtre", price: 250 },
  { id: "wheel-alignment", name: "Geometrie roți", price: 180 },
  { id: "diagnostics", name: "Diagnoză computerizată", price: 120 },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    confirmed: { label: "Confirmat", variant: "outline" as const },
    completed: { label: "Finalizat", variant: "default" as const },
    pending: { label: "În așteptare", variant: "secondary" as const },
    cancelled: { label: "Anulat", variant: "destructive" as const },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

  return <Badge variant={config.variant}>{config.label}</Badge>
}

// Available time slots
const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function ReservationsPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS)

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)

  // Form states
  const [selectedReservation, setSelectedReservation] = useState<(typeof INITIAL_RESERVATIONS)[0] | null>(null)
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    service: "",
    vehicle: "",
    licensePlate: "",
    date: "",
    time: "",
    status: "confirmed",
    price: "",
    notes: "",
  })
  const [newStatus, setNewStatus] = useState("")

  // Filter reservations based on search query and filters
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter
    const matchesService = serviceFilter === "all" || reservation.service === serviceFilter
    const matchesDate = !date || reservation.date === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesService && matchesDate
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle service selection
  const handleServiceChange = (value: string) => {
    const selectedService = SERVICE_TYPES.find((service) => service.name === value)
    setFormData((prev) => ({
      ...prev,
      service: value,
      price: selectedService ? selectedService.price.toString() : prev.price,
    }))
  }

  // Open add dialog
  const openAddDialog = () => {
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      service: "",
      vehicle: "",
      licensePlate: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      status: "confirmed",
      price: "",
      notes: "",
    })
    setIsAddDialogOpen(true)
  }

  // Open edit dialog
  const openEditDialog = (reservation: (typeof INITIAL_RESERVATIONS)[0]) => {
    setSelectedReservation(reservation)
    setFormData({
      customerName: reservation.customerName,
      phone: reservation.phone,
      email: reservation.email,
      service: reservation.service,
      vehicle: reservation.vehicle,
      licensePlate: reservation.licensePlate,
      date: reservation.date,
      time: reservation.time,
      status: reservation.status,
      price: reservation.price.toString(),
      notes: reservation.notes,
    })
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (reservation: (typeof INITIAL_RESERVATIONS)[0]) => {
    setSelectedReservation(reservation)
    setIsDeleteDialogOpen(true)
  }

  // Open details dialog
  const openDetailsDialog = (reservation: (typeof INITIAL_RESERVATIONS)[0]) => {
    setSelectedReservation(reservation)
    setIsDetailsDialogOpen(true)
  }

  // Open status change dialog
  const openStatusDialog = (reservation: (typeof INITIAL_RESERVATIONS)[0], status: string) => {
    setSelectedReservation(reservation)
    setNewStatus(status)
    setIsStatusDialogOpen(true)
  }

  // Add new reservation
  const handleAddReservation = () => {
    // Validate form
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.email ||
      !formData.service ||
      !formData.vehicle ||
      !formData.licensePlate ||
      !formData.date ||
      !formData.time
    ) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const newReservation = {
      id: Math.max(...reservations.map((r) => r.id), 0) + 1,
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      vehicle: formData.vehicle,
      licensePlate: formData.licensePlate,
      date: formData.date,
      time: formData.time,
      status: formData.status,
      price: Number(formData.price),
      notes: formData.notes,
    }

    setReservations([...reservations, newReservation])
    setIsAddDialogOpen(false)

    toast({
      title: "Rezervare adăugată",
      description: `Rezervarea pentru ${formData.customerName} a fost adăugată cu succes`,
    })
  }

  // Update reservation
  const handleUpdateReservation = () => {
    if (!selectedReservation) return

    // Validate form
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.email ||
      !formData.service ||
      !formData.vehicle ||
      !formData.licensePlate ||
      !formData.date ||
      !formData.time
    ) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const updatedReservations = reservations.map((reservation) =>
      reservation.id === selectedReservation.id
        ? {
            ...reservation,
            customerName: formData.customerName,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            vehicle: formData.vehicle,
            licensePlate: formData.licensePlate,
            date: formData.date,
            time: formData.time,
            status: formData.status,
            price: Number(formData.price),
            notes: formData.notes,
          }
        : reservation,
    )

    setReservations(updatedReservations)
    setIsEditDialogOpen(false)

    toast({
      title: "Rezervare actualizată",
      description: `Rezervarea pentru ${formData.customerName} a fost actualizată cu succes`,
    })
  }

  // Delete reservation
  const handleDeleteReservation = () => {
    if (!selectedReservation) return

    const updatedReservations = reservations.filter((reservation) => reservation.id !== selectedReservation.id)
    setReservations(updatedReservations)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Rezervare ștearsă",
      description: `Rezervarea pentru ${selectedReservation.customerName} a fost ștearsă cu succes`,
    })
  }

  // Change reservation status
  const handleChangeStatus = () => {
    if (!selectedReservation || !newStatus) return

    const updatedReservations = reservations.map((reservation) =>
      reservation.id === selectedReservation.id ? { ...reservation, status: newStatus } : reservation,
    )

    setReservations(updatedReservations)
    setIsStatusDialogOpen(false)

    const statusLabels: Record<string, string> = {
      confirmed: "confirmată",
      completed: "finalizată",
      pending: "în așteptare",
      cancelled: "anulată",
    }

    toast({
      title: "Status actualizat",
      description: `Rezervarea a fost marcată ca ${statusLabels[newStatus] || newStatus}`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Rezervări</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă rezervare
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Listă</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Caută după nume, email, mașină..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrează după</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <Label htmlFor="status" className="text-xs">
                          Status
                        </Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger id="status" className="mt-1">
                            <SelectValue placeholder="Toate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toate</SelectItem>
                            <SelectItem value="confirmed">Confirmate</SelectItem>
                            <SelectItem value="pending">În așteptare</SelectItem>
                            <SelectItem value="completed">Finalizate</SelectItem>
                            <SelectItem value="cancelled">Anulate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-2">
                        <Label htmlFor="service" className="text-xs">
                          Serviciu
                        </Label>
                        <Select value={serviceFilter} onValueChange={setServiceFilter}>
                          <SelectTrigger id="service" className="mt-1">
                            <SelectValue placeholder="Toate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toate</SelectItem>
                            <SelectItem value="ITP Autoturism">ITP Autoturism</SelectItem>
                            <SelectItem value="ITP SUV">ITP SUV</SelectItem>
                            <SelectItem value="ITP Autoutilitară">ITP Autoutilitară</SelectItem>
                            <SelectItem value="ITP Motocicletă">ITP Motocicletă</SelectItem>
                            <SelectItem value="Schimb ulei și filtre">Schimb ulei și filtre</SelectItem>
                            <SelectItem value="Geometrie roți">Geometrie roți</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 border-dashed">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ro }) : "Alege data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>

                  {date && (
                    <Button variant="ghost" size="icon" onClick={() => setDate(undefined)}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Serviciu</TableHead>
                    <TableHead>Vehicul</TableHead>
                    <TableHead>Data & Ora</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Preț</TableHead>
                    <TableHead className="text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div className="font-medium">{reservation.customerName}</div>
                          <div className="text-sm text-muted-foreground">{reservation.email}</div>
                        </TableCell>
                        <TableCell>{reservation.service}</TableCell>
                        <TableCell>
                          <div>{reservation.vehicle}</div>
                          <div className="text-sm text-muted-foreground">{reservation.licensePlate}</div>
                        </TableCell>
                        <TableCell>
                          {new Date(reservation.date).toLocaleDateString("ro-RO")}, {reservation.time}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={reservation.status} />
                        </TableCell>
                        <TableCell>{reservation.price} RON</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Meniu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openDetailsDialog(reservation)}>
                                Vezi detalii
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditDialog(reservation)}>Editează</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openStatusDialog(reservation, "completed")}>
                                Marchează ca finalizat
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openStatusDialog(reservation, "cancelled")}>
                                Anulează
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => openDeleteDialog(reservation)}
                              >
                                Șterge
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nu s-au găsit rezervări.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Caută după nume, email, mașină..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrează după</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <Label htmlFor="status-cal" className="text-xs">
                          Status
                        </Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger id="status-cal" className="mt-1">
                            <SelectValue placeholder="Toate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toate</SelectItem>
                            <SelectItem value="confirmed">Confirmate</SelectItem>
                            <SelectItem value="pending">În așteptare</SelectItem>
                            <SelectItem value="completed">Finalizate</SelectItem>
                            <SelectItem value="cancelled">Anulate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-2">
                        <Label htmlFor="service-cal" className="text-xs">
                          Serviciu
                        </Label>
                        <Select value={serviceFilter} onValueChange={setServiceFilter}>
                          <SelectTrigger id="service-cal" className="mt-1">
                            <SelectValue placeholder="Toate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toate</SelectItem>
                            <SelectItem value="ITP Autoturism">ITP Autoturism</SelectItem>
                            <SelectItem value="ITP SUV">ITP SUV</SelectItem>
                            <SelectItem value="ITP Autoutilitară">ITP Autoutilitară</SelectItem>
                            <SelectItem value="ITP Motocicletă">ITP Motocicletă</SelectItem>
                            <SelectItem value="Schimb ulei și filtre">Schimb ulei și filtre</SelectItem>
                            <SelectItem value="Geometrie roți">Geometrie roți</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="h-[600px] border rounded-md p-4">
                <div className="text-center text-muted-foreground">Vizualizare calendar a programărilor</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Reservation Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Adaugă rezervare nouă</DialogTitle>
            <DialogDescription>Completează detaliile pentru noua rezervare</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customerName">Nume client *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Nume complet"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="07XX XXX XXX"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service">Serviciu *</Label>
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Selectează serviciul" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name} - {service.price} RON
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vehicle">Vehicul *</Label>
                <Input
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  placeholder="Marca și modelul"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="licensePlate">Număr înmatriculare *</Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  placeholder="Ex: B 123 ABC"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Data *</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Ora *</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                >
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Selectează ora" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Preț (RON) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selectează statusul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmat</SelectItem>
                    <SelectItem value="pending">În așteptare</SelectItem>
                    <SelectItem value="completed">Finalizat</SelectItem>
                    <SelectItem value="cancelled">Anulat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Observații</Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Observații suplimentare"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleAddReservation}>Adaugă rezervare</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Reservation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editează rezervare</DialogTitle>
            <DialogDescription>Modifică detaliile rezervării</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-customerName">Nume client *</Label>
                <Input
                  id="edit-customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Telefon *</Label>
                <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-service">Serviciu *</Label>
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger id="edit-service">
                    <SelectValue placeholder="Selectează serviciul" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name} - {service.price} RON
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-vehicle">Vehicul *</Label>
                <Input
                  id="edit-vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-licensePlate">Număr înmatriculare *</Label>
                <Input
                  id="edit-licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Data *</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-time">Ora *</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                >
                  <SelectTrigger id="edit-time">
                    <SelectValue placeholder="Selectează ora" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Preț (RON) *</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Selectează statusul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmat</SelectItem>
                    <SelectItem value="pending">În așteptare</SelectItem>
                    <SelectItem value="completed">Finalizat</SelectItem>
                    <SelectItem value="cancelled">Anulat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Observații</Label>
              <Input
                id="edit-notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Observații suplimentare"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleUpdateReservation}>Salvează modificările</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Reservation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Șterge rezervare</DialogTitle>
            <DialogDescription>
              Ești sigur că vrei să ștergi această rezervare? Această acțiune nu poate fi anulată.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedReservation && (
              <div className="space-y-1">
                <p className="font-medium">{selectedReservation.customerName}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedReservation.service} - {new Date(selectedReservation.date).toLocaleDateString("ro-RO")},{" "}
                  {selectedReservation.time}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedReservation.vehicle} ({selectedReservation.licensePlate})
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Anulează
            </Button>
            <Button variant="destructive" onClick={handleDeleteReservation}>
              Șterge rezervare
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reservation Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalii rezervare</DialogTitle>
            <DialogDescription>Informații complete despre rezervare</DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Informații client</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Nume:</span>
                      <span className="font-medium">{selectedReservation.customerName}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedReservation.email}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Telefon:</span>
                      <span>{selectedReservation.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Informații vehicul</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Vehicul:</span>
                      <span className="font-medium">{selectedReservation.vehicle}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Nr. înmatriculare:</span>
                      <span>{selectedReservation.licensePlate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Detalii programare</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Serviciu:</span>
                      <span className="font-medium">{selectedReservation.service}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Data:</span>
                      <span>{new Date(selectedReservation.date).toLocaleDateString("ro-RO")}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Ora:</span>
                      <span>{selectedReservation.time}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Status:</span>
                      <span>
                        <StatusBadge status={selectedReservation.status} />
                      </span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Preț:</span>
                      <span className="font-medium">{selectedReservation.price} RON</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Observații</h3>
                  <div className="border rounded-md p-3 min-h-[100px]">
                    {selectedReservation.notes || "Nicio observație"}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Închide
            </Button>
            <Button
              onClick={() => {
                setIsDetailsDialogOpen(false)
                if (selectedReservation) {
                  openEditDialog(selectedReservation)
                }
              }}
            >
              Editează
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schimbă status rezervare</DialogTitle>
            <DialogDescription>Ești sigur că vrei să schimbi statusul acestei rezervări?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedReservation && (
              <div className="space-y-1">
                <p className="font-medium">{selectedReservation.customerName}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedReservation.service} - {new Date(selectedReservation.date).toLocaleDateString("ro-RO")},{" "}
                  {selectedReservation.time}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">Status curent:</span>
                  <StatusBadge status={selectedReservation.status} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">Status nou:</span>
                  <StatusBadge status={newStatus} />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleChangeStatus}>Schimbă status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

