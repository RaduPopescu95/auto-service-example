"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Car, Eye, MoreHorizontal, Plus, Search, Trash, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for customers
const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: "Ion Popescu",
    email: "ion.popescu@example.com",
    phone: "0712345678",
    address: "Str. Exemplu, Nr. 1, București",
    vehicles: [{ id: 1, make: "Dacia", model: "Logan", year: 2018, licensePlate: "B 123 ABC" }],
    visits: 5,
    lastVisit: "2025-03-25",
  },
  {
    id: 2,
    name: "Maria Ionescu",
    email: "maria.ionescu@example.com",
    phone: "0723456789",
    address: "Str. Exemplu, Nr. 2, București",
    vehicles: [{ id: 2, make: "Volkswagen", model: "Tiguan", year: 2020, licensePlate: "B 234 BCD" }],
    visits: 3,
    lastVisit: "2025-03-28",
  },
  {
    id: 3,
    name: "Alexandru Popa",
    email: "alexandru.popa@example.com",
    phone: "0734567890",
    address: "Str. Exemplu, Nr. 3, București",
    vehicles: [{ id: 3, make: "Renault", model: "Clio", year: 2019, licensePlate: "B 345 CDE" }],
    visits: 2,
    lastVisit: "2025-03-15",
  },
  {
    id: 4,
    name: "Elena Dumitrescu",
    email: "elena.dumitrescu@example.com",
    phone: "0745678901",
    address: "Str. Exemplu, Nr. 4, București",
    vehicles: [{ id: 4, make: "Ford", model: "Transit", year: 2017, licensePlate: "B 456 DEF" }],
    visits: 7,
    lastVisit: "2025-03-30",
  },
  {
    id: 5,
    name: "Mihai Georgescu",
    email: "mihai.georgescu@example.com",
    phone: "0756789012",
    address: "Str. Exemplu, Nr. 5, București",
    vehicles: [{ id: 5, make: "Skoda", model: "Octavia", year: 2021, licensePlate: "B 567 EFG" }],
    visits: 1,
    lastVisit: "2025-03-10",
  },
  {
    id: 6,
    name: "Ana Vasilescu",
    email: "ana.vasilescu@example.com",
    phone: "0767890123",
    address: "Str. Exemplu, Nr. 6, București",
    vehicles: [
      { id: 6, make: "Honda", model: "CBR", year: 2022, licensePlate: "B 678 FGH" },
      { id: 7, make: "Toyota", model: "Corolla", year: 2019, licensePlate: "B 789 GHI" },
    ],
    visits: 4,
    lastVisit: "2025-03-20",
  },
  {
    id: 7,
    name: "Cristian Munteanu",
    email: "cristian.munteanu@example.com",
    phone: "0778901234",
    address: "Str. Exemplu, Nr. 7, București",
    vehicles: [{ id: 8, make: "Toyota", model: "Corolla", year: 2020, licensePlate: "B 789 GHI" }],
    visits: 2,
    lastVisit: "2025-03-18",
  },
  {
    id: 8,
    name: "Ioana Preda",
    email: "ioana.preda@example.com",
    phone: "0789012345",
    address: "Str. Exemplu, Nr. 8, București",
    vehicles: [{ id: 9, make: "Hyundai", model: "Tucson", year: 2021, licensePlate: "B 890 HIJ" }],
    visits: 3,
    lastVisit: "2025-03-22",
  },
]

interface CustomerFormData {
  name: string
  email: string
  phone: string
  address: string
}

interface VehicleFormData {
  make: string
  model: string
  year: string | number
  licensePlate: string
}

export default function CustomersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS)
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof INITIAL_CUSTOMERS)[0] | null>(null)

  // Dialog states
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false)
  const [isEditCustomerDialogOpen, setIsEditCustomerDialogOpen] = useState(false)
  const [isDeleteCustomerDialogOpen, setIsDeleteCustomerDialogOpen] = useState(false)
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false)

  // Form states
  const [customerFormData, setCustomerFormData] = useState<CustomerFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [vehicleFormData, setVehicleFormData] = useState<VehicleFormData>({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
  })

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.vehicles.some(
        (vehicle) =>
          vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  // Handle customer form input changes
  const handleCustomerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle vehicle form input changes
  const handleVehicleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVehicleFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Open details dialog
  const openDetailsDialog = (customer: (typeof INITIAL_CUSTOMERS)[0]) => {
    setSelectedCustomer(customer)
    setIsDetailsDialogOpen(true)
  }

  // Open add customer dialog
  const openAddCustomerDialog = () => {
    setCustomerFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    })
    setIsAddCustomerDialogOpen(true)
  }

  // Open edit customer dialog
  const openEditCustomerDialog = (customer: (typeof INITIAL_CUSTOMERS)[0]) => {
    setSelectedCustomer(customer)
    setCustomerFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    })
    setIsEditCustomerDialogOpen(true)
  }

  // Open delete customer dialog
  const openDeleteCustomerDialog = (customer: (typeof INITIAL_CUSTOMERS)[0]) => {
    setSelectedCustomer(customer)
    setIsDeleteCustomerDialogOpen(true)
  }

  // Open add vehicle dialog
  const openAddVehicleDialog = (customer: (typeof INITIAL_CUSTOMERS)[0]) => {
    setSelectedCustomer(customer)
    setVehicleFormData({
      make: "",
      model: "",
      year: "",
      licensePlate: "",
    })
    setIsAddVehicleDialogOpen(true)
  }

  // Add new customer
  const handleAddCustomer = () => {
    // Validate form
    if (!customerFormData.name || !customerFormData.email || !customerFormData.phone) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const newCustomer = {
      id: Math.max(...customers.map((c) => c.id), 0) + 1,
      name: customerFormData.name,
      email: customerFormData.email,
      phone: customerFormData.phone,
      address: customerFormData.address,
      vehicles: [],
      visits: 0,
      lastVisit: new Date().toISOString().split("T")[0],
    }

    setCustomers([...customers, newCustomer])
    setIsAddCustomerDialogOpen(false)

    toast({
      title: "Client adăugat",
      description: `Clientul ${customerFormData.name} a fost adăugat cu succes`,
    })
  }

  // Update customer
  const handleUpdateCustomer = () => {
    if (!selectedCustomer) return

    // Validate form
    if (!customerFormData.name || !customerFormData.email || !customerFormData.phone) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id
        ? {
            ...customer,
            name: customerFormData.name,
            email: customerFormData.email,
            phone: customerFormData.phone,
            address: customerFormData.address,
          }
        : customer,
    )

    setCustomers(updatedCustomers)
    setIsEditCustomerDialogOpen(false)

    // Update selected customer if details dialog is open
    if (isDetailsDialogOpen) {
      setSelectedCustomer({
        ...selectedCustomer,
        name: customerFormData.name,
        email: customerFormData.email,
        phone: customerFormData.phone,
        address: customerFormData.address,
      })
    }

    toast({
      title: "Client actualizat",
      description: `Datele clientului ${customerFormData.name} au fost actualizate cu succes`,
    })
  }

  // Delete customer
  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return

    const updatedCustomers = customers.filter((customer) => customer.id !== selectedCustomer.id)
    setCustomers(updatedCustomers)
    setIsDeleteCustomerDialogOpen(false)

    // Close details dialog if open
    if (isDetailsDialogOpen) {
      setIsDetailsDialogOpen(false)
    }

    toast({
      title: "Client șters",
      description: `Clientul ${selectedCustomer.name} a fost șters cu succes`,
    })
  }

  // Add vehicle to customer
  const handleAddVehicle = () => {
    if (!selectedCustomer) return

    // Validate form
    if (!vehicleFormData.make || !vehicleFormData.model || !vehicleFormData.year || !vehicleFormData.licensePlate) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const newVehicle = {
      id: Math.max(...selectedCustomer.vehicles.map((v) => v.id), 0) + 1,
      make: vehicleFormData.make,
      model: vehicleFormData.model,
      year: Number(vehicleFormData.year),
      licensePlate: vehicleFormData.licensePlate,
    }

    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id
        ? {
            ...customer,
            vehicles: [...customer.vehicles, newVehicle],
          }
        : customer,
    )

    setCustomers(updatedCustomers)
    setIsAddVehicleDialogOpen(false)

    // Update selected customer if details dialog is open
    if (isDetailsDialogOpen) {
      setSelectedCustomer({
        ...selectedCustomer,
        vehicles: [...selectedCustomer.vehicles, newVehicle],
      })
    }

    toast({
      title: "Vehicul adăugat",
      description: `Vehiculul ${vehicleFormData.make} ${vehicleFormData.model} a fost adăugat cu succes`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clienți</h1>
        <Button onClick={openAddCustomerDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista clienților</CardTitle>
          <CardDescription>Gestionează baza de date a clienților și vehiculele acestora</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută după nume, email, telefon, mașină..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nume client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicule</TableHead>
                <TableHead>Vizite</TableHead>
                <TableHead>Ultima vizită</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div>{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {customer.vehicles.map((vehicle) => (
                          <Badge key={vehicle.id} variant="outline" className="w-fit">
                            {vehicle.make} {vehicle.model} - {vehicle.licensePlate}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{customer.visits}</TableCell>
                    <TableCell>{new Date(customer.lastVisit).toLocaleDateString("ro-RO")}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Meniu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openDetailsDialog(customer)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Vezi detalii
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAddVehicleDialog(customer)}>
                            <Car className="mr-2 h-4 w-4" />
                            Adaugă vehicul
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditCustomerDialog(customer)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editează client
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDeleteCustomerDialog(customer)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Șterge client
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nu s-au găsit clienți.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalii client</DialogTitle>
            <DialogDescription>Informații complete despre client și vehiculele sale</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Informații personale</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Nume:</span>
                      <span className="font-medium">{selectedCustomer.name}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Telefon:</span>
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Adresă:</span>
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Statistici</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Vizite totale:</span>
                      <span className="font-medium">{selectedCustomer.visits}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Ultima vizită:</span>
                      <span>{new Date(selectedCustomer.lastVisit).toLocaleDateString("ro-RO")}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-muted-foreground">Vehicule:</span>
                      <span>{selectedCustomer.vehicles.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Vehicule</h3>
                  <Button variant="outline" size="sm" onClick={() => openAddVehicleDialog(selectedCustomer)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adaugă vehicul
                  </Button>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Marcă & Model</TableHead>
                        <TableHead>An fabricație</TableHead>
                        <TableHead>Număr înmatriculare</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedCustomer.vehicles.length > 0 ? (
                        selectedCustomer.vehicles.map((vehicle) => (
                          <TableRow key={vehicle.id}>
                            <TableCell className="font-medium">
                              {vehicle.make} {vehicle.model}
                            </TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>{vehicle.licensePlate}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="h-24 text-center">
                            Nu există vehicule înregistrate.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Istoric vizite</h3>
                <div className="border rounded-md p-4 text-center text-muted-foreground">
                  Istoric detaliat al vizitelor și serviciilor efectuate
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
                if (selectedCustomer) {
                  openEditCustomerDialog(selectedCustomer)
                }
              }}
            >
              Editează client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adaugă client nou</DialogTitle>
            <DialogDescription>Completează detaliile pentru noul client</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nume client *</Label>
              <Input
                id="name"
                name="name"
                value={customerFormData.name}
                onChange={handleCustomerInputChange}
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
                value={customerFormData.email}
                onChange={handleCustomerInputChange}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                name="phone"
                value={customerFormData.phone}
                onChange={handleCustomerInputChange}
                placeholder="07XX XXX XXX"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresă</Label>
              <Textarea
                id="address"
                name="address"
                value={customerFormData.address}
                onChange={handleCustomerInputChange}
                placeholder="Adresa completă"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCustomerDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleAddCustomer}>Adaugă client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditCustomerDialogOpen} onOpenChange={setIsEditCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editează client</DialogTitle>
            <DialogDescription>Modifică detaliile clientului</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nume client *</Label>
              <Input
                id="edit-name"
                name="name"
                value={customerFormData.name}
                onChange={handleCustomerInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={customerFormData.email}
                onChange={handleCustomerInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Telefon *</Label>
              <Input
                id="edit-phone"
                name="phone"
                value={customerFormData.phone}
                onChange={handleCustomerInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Adresă</Label>
              <Textarea
                id="edit-address"
                name="address"
                value={customerFormData.address}
                onChange={handleCustomerInputChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCustomerDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleUpdateCustomer}>Salvează modificările</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteCustomerDialogOpen} onOpenChange={setIsDeleteCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Șterge client</DialogTitle>
            <DialogDescription>
              Ești sigur că vrei să ștergi acest client? Această acțiune nu poate fi anulată.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedCustomer && (
              <div className="space-y-1">
                <p className="font-medium">{selectedCustomer.name}</p>
                <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteCustomerDialogOpen(false)}>
              Anulează
            </Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              Șterge client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Vehicle Dialog */}
      <Dialog open={isAddVehicleDialogOpen} onOpenChange={setIsAddVehicleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adaugă vehicul</DialogTitle>
            <DialogDescription>Adaugă un vehicul nou pentru {selectedCustomer?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="make">Marcă *</Label>
              <Input
                id="make"
                name="make"
                value={vehicleFormData.make}
                onChange={handleVehicleInputChange}
                placeholder="Ex: Dacia"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                value={vehicleFormData.model}
                onChange={handleVehicleInputChange}
                placeholder="Ex: Logan"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">An fabricație *</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={vehicleFormData.year}
                onChange={handleVehicleInputChange}
                placeholder="Ex: 2020"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="licensePlate">Număr înmatriculare *</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={vehicleFormData.licensePlate}
                onChange={handleVehicleInputChange}
                placeholder="Ex: B 123 ABC"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddVehicleDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleAddVehicle}>Adaugă vehicul</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

