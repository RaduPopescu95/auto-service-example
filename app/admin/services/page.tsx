"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for services
const INITIAL_SERVICES = [
  {
    id: 1,
    name: "ITP Autoturism",
    description: "Inspecție tehnică periodică pentru autoturisme",
    price: 150,
    duration: 30,
  },
  {
    id: 2,
    name: "ITP SUV/Crossover",
    description: "Inspecție tehnică periodică pentru SUV-uri și crossovere",
    price: 170,
    duration: 30,
  },
  {
    id: 3,
    name: "ITP Autoutilitară",
    description: "Inspecție tehnică periodică pentru autoutilitare",
    price: 200,
    duration: 45,
  },
  {
    id: 4,
    name: "ITP Motocicletă",
    description: "Inspecție tehnică periodică pentru motociclete",
    price: 100,
    duration: 20,
  },
  {
    id: 5,
    name: "Schimb ulei și filtre",
    description: "Schimb de ulei motor și toate filtrele (ulei, aer, combustibil, habitaclu)",
    price: 250,
    duration: 60,
  },
  {
    id: 6,
    name: "Geometrie roți",
    description: "Verificare și reglare geometrie roți",
    price: 180,
    duration: 45,
  },
  {
    id: 7,
    name: "Diagnoză computerizată",
    description: "Verificare completă a sistemelor electronice, citire și ștergere erori",
    price: 120,
    duration: 30,
  },
  {
    id: 8,
    name: "Climatizare auto",
    description: "Verificare și încărcare freon, curățare sistem climatizare",
    price: 220,
    duration: 60,
  },
  {
    id: 9,
    name: "Pregătire RAR",
    description: "Verificare completă pre-RAR și remedierea defecțiunilor",
    price: 150,
    duration: 90,
  },
]

interface ServiceFormData {
  name: string
  description: string
  price: number | string
  duration: number | string
}

export default function ServicesPage() {
  const { toast } = useToast()
  const [services, setServices] = useState(INITIAL_SERVICES)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<(typeof INITIAL_SERVICES)[0] | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    description: "",
    price: "",
    duration: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
    })
  }

  const handleAddService = () => {
    // Validate form
    if (!formData.name || !formData.price || !formData.duration) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const newService = {
      id: Math.max(...services.map((s) => s.id), 0) + 1,
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      duration: Number(formData.duration),
    }

    setServices([...services, newService])
    resetForm()
    setIsAddDialogOpen(false)

    toast({
      title: "Serviciu adăugat",
      description: `Serviciul "${formData.name}" a fost adăugat cu succes`,
    })
  }

  const handleEditService = () => {
    if (!currentService) return

    // Validate form
    if (!formData.name || !formData.price || !formData.duration) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive",
      })
      return
    }

    const updatedServices = services.map((service) =>
      service.id === currentService.id
        ? {
            ...service,
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            duration: Number(formData.duration),
          }
        : service,
    )

    setServices(updatedServices)
    setIsEditDialogOpen(false)

    toast({
      title: "Serviciu actualizat",
      description: `Serviciul "${formData.name}" a fost actualizat cu succes`,
    })
  }

  const handleDeleteService = () => {
    if (!currentService) return

    const updatedServices = services.filter((service) => service.id !== currentService.id)
    setServices(updatedServices)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Serviciu șters",
      description: `Serviciul "${currentService.name}" a fost șters cu succes`,
    })
  }

  const openEditDialog = (service: (typeof INITIAL_SERVICES)[0]) => {
    setCurrentService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (service: (typeof INITIAL_SERVICES)[0]) => {
    setCurrentService(service)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Servicii & Prețuri</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adaugă serviciu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adaugă serviciu nou</DialogTitle>
              <DialogDescription>Completează detaliile pentru noul serviciu</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nume serviciu *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Schimb plăcuțe frână"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descriere detaliată a serviciului"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Preț (RON) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Ex: 150"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Durată (minute) *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Ex: 60"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Anulează
              </Button>
              <Button onClick={handleAddService}>Adaugă serviciu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista serviciilor</CardTitle>
          <CardDescription>Gestionează serviciile oferite și prețurile acestora</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nume serviciu</TableHead>
                <TableHead>Descriere</TableHead>
                <TableHead>Preț (RON)</TableHead>
                <TableHead>Durată (min)</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.duration}</TableCell>
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
                        <DropdownMenuItem onClick={() => openEditDialog(service)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editează
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => openDeleteDialog(service)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Șterge
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editează serviciu</DialogTitle>
            <DialogDescription>Modifică detaliile serviciului</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nume serviciu *</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descriere</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Preț (RON) *</Label>
                <Input id="edit-price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Durată (minute) *</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Anulează
            </Button>
            <Button onClick={handleEditService}>Salvează modificările</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Șterge serviciu</DialogTitle>
            <DialogDescription>
              Ești sigur că vrei să ștergi acest serviciu? Această acțiune nu poate fi anulată.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentService && (
              <p className="font-medium">
                {currentService.name} - {currentService.price} RON
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Anulează
            </Button>
            <Button variant="destructive" onClick={handleDeleteService}>
              Șterge serviciu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

