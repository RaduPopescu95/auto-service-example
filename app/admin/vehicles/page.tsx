"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Car, Edit, MoreHorizontal, Plus, Search, User } from "lucide-react"

// Mock data for vehicles
const VEHICLES = [
  {
    id: 1,
    make: "Dacia",
    model: "Logan",
    year: 2018,
    licensePlate: "B 123 ABC",
    vin: "UU1LSDJKDJL123456",
    owner: "Ion Popescu",
    lastService: "2025-03-25",
    serviceType: "ITP Autoturism",
  },
  {
    id: 2,
    make: "Volkswagen",
    model: "Tiguan",
    year: 2020,
    licensePlate: "B 234 BCD",
    vin: "WVGZZZ5NZLW123456",
    owner: "Maria Ionescu",
    lastService: "2025-03-28",
    serviceType: "ITP SUV",
  },
  {
    id: 3,
    make: "Renault",
    model: "Clio",
    year: 2019,
    licensePlate: "B 345 CDE",
    vin: "VF15SRHA123456789",
    owner: "Alexandru Popa",
    lastService: "2025-03-15",
    serviceType: "Schimb ulei și filtre",
  },
  {
    id: 4,
    make: "Ford",
    model: "Transit",
    year: 2017,
    licensePlate: "B 456 DEF",
    vin: "WF0XXXTTGXXX12345",
    owner: "Elena Dumitrescu",
    lastService: "2025-03-30",
    serviceType: "ITP Autoutilitară",
  },
  {
    id: 5,
    make: "Skoda",
    model: "Octavia",
    year: 2021,
    licensePlate: "B 567 EFG",
    vin: "TMBEG7NE1M0123456",
    owner: "Mihai Georgescu",
    lastService: "2025-03-10",
    serviceType: "Geometrie roți",
  },
  {
    id: 6,
    make: "Honda",
    model: "CBR",
    year: 2022,
    licensePlate: "B 678 FGH",
    vin: "JH2PC35G1MM123456",
    owner: "Ana Vasilescu",
    lastService: "2025-03-20",
    serviceType: "ITP Motocicletă",
  },
  {
    id: 7,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    licensePlate: "B 789 GHI",
    vin: "SB1ZA3BE70E123456",
    owner: "Cristian Munteanu",
    lastService: "2025-03-18",
    serviceType: "Diagnoză computerizată",
  },
  {
    id: 8,
    make: "Hyundai",
    model: "Tucson",
    year: 2021,
    licensePlate: "B 890 HIJ",
    vin: "TMAJ3815BMJ123456",
    owner: "Ioana Preda",
    lastService: "2025-03-22",
    serviceType: "Climatizare auto",
  },
]

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter vehicles based on search query
  const filteredVehicles = VEHICLES.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Vehicule</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adaugă vehicul
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista vehiculelor</CardTitle>
          <CardDescription>Gestionează baza de date a vehiculelor înregistrate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută după marcă, model, număr înmatriculare..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicul</TableHead>
                <TableHead>Număr înmatriculare</TableHead>
                <TableHead>Proprietar</TableHead>
                <TableHead>Ultimul service</TableHead>
                <TableHead>Tip service</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div className="font-medium">
                        {vehicle.make} {vehicle.model}
                      </div>
                      <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{vehicle.licensePlate}</Badge>
                    </TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>{new Date(vehicle.lastService).toLocaleDateString("ro-RO")}</TableCell>
                    <TableCell>{vehicle.serviceType}</TableCell>
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
                          <DropdownMenuItem>
                            <Car className="mr-2 h-4 w-4" />
                            Vezi detalii
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editează vehicul
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Vezi proprietar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nu s-au găsit vehicule.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

