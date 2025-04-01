"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ro } from "date-fns/locale"
import { CalendarIcon, Car, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for available time slots
const AVAILABLE_SLOTS = {
  "2025-04-01": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  "2025-04-02": ["09:00", "10:00", "12:00", "13:00", "15:00", "17:00"],
  "2025-04-03": ["10:00", "11:00", "13:00", "14:00", "16:00"],
  "2025-04-04": ["09:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"],
  "2025-04-05": ["09:00", "10:00", "11:00", "12:00"],
}

// Mock service types and prices
const SERVICE_TYPES = [
  { id: "itp-auto", name: "ITP Autoturism", price: 150 },
  { id: "itp-suv", name: "ITP SUV/Crossover", price: 170 },
  { id: "itp-van", name: "ITP Autoutilitară", price: 200 },
  { id: "itp-moto", name: "ITP Motocicletă", price: 100 },
]

export default function BookingPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined)
  const [serviceType, setServiceType] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    licensePlate: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getAvailableSlots = (date: Date | undefined) => {
    if (!date) return []
    const dateStr = format(date, "yyyy-MM-dd")
    return AVAILABLE_SLOTS[dateStr as keyof typeof AVAILABLE_SLOTS] || []
  }

  const getServicePrice = () => {
    const service = SERVICE_TYPES.find((s) => s.id === serviceType)
    return service ? service.price : 0
  }

  const handleNextStep = () => {
    if (step === 1 && (!date || !timeSlot)) {
      toast({
        title: "Informații lipsă",
        description: "Te rugăm să selectezi data și ora programării.",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && !serviceType) {
      toast({
        title: "Informații lipsă",
        description: "Te rugăm să selectezi tipul de serviciu.",
        variant: "destructive",
      })
      return
    }

    if (
      step === 3 &&
      (!formData.name || !formData.email || !formData.phone || !formData.carModel || !formData.licensePlate)
    ) {
      toast({
        title: "Informații lipsă",
        description: "Te rugăm să completezi toate câmpurile obligatorii.",
        variant: "destructive",
      })
      return
    }

    if (step === 4 && !paymentMethod) {
      toast({
        title: "Informații lipsă",
        description: "Te rugăm să selectezi metoda de plată.",
        variant: "destructive",
      })
      return
    }

    if (step < 5) {
      setStep(step + 1)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate payment and booking process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Programare confirmată!",
      description: "Detaliile programării au fost trimise pe email.",
    })

    setIsSubmitting(false)
    setStep(5) // Success step
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Programare ITP</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Programează-ți inspecția tehnică periodică în câțiva pași simpli.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                        step === stepNumber
                          ? "bg-primary text-primary-foreground"
                          : step > stepNumber
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">
                      {stepNumber === 1 && "Data"}
                      {stepNumber === 2 && "Serviciu"}
                      {stepNumber === 3 && "Detalii"}
                      {stepNumber === 4 && "Plată"}
                      {stepNumber === 5 && "Confirmare"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative flex justify-between mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
                <div
                  className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                  style={{ width: `${(step - 1) * 25}%` }}
                />
              </div>
            </div>

            {/* Step 1: Select Date and Time */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Alege data și ora</CardTitle>
                  <CardDescription>Selectează data și intervalul orar pentru programarea ITP</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data programării</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: ro }) : "Selectează data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            // Disable past dates and dates without available slots
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            const dateStr = format(date, "yyyy-MM-dd")
                            return date < today || !AVAILABLE_SLOTS[dateStr as keyof typeof AVAILABLE_SLOTS]
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {date && (
                    <div className="space-y-2">
                      <Label>Ora programării</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {getAvailableSlots(date).map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={timeSlot === slot ? "default" : "outline"}
                            className="w-full"
                            onClick={() => setTimeSlot(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    Înapoi
                  </Button>
                  <Button onClick={handleNextStep}>Continuă</Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Select Service Type */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Alege tipul de serviciu</CardTitle>
                  <CardDescription>Selectează tipul de ITP de care ai nevoie</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tip serviciu</Label>
                    <RadioGroup value={serviceType} onValueChange={setServiceType}>
                      {SERVICE_TYPES.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value={service.id} id={service.id} />
                          <Label htmlFor={service.id} className="flex-1 flex justify-between cursor-pointer">
                            <span>{service.name}</span>
                            <span className="font-semibold">{service.price} RON</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Înapoi
                  </Button>
                  <Button onClick={handleNextStep}>Continuă</Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Enter Details */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Completează detaliile</CardTitle>
                  <CardDescription>Informații despre tine și autovehiculul tău</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nume și prenume *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Numele tău complet"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="exemplu@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07XX XXX XXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carModel">Marca și modelul mașinii *</Label>
                      <Input
                        id="carModel"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        placeholder="Ex: Dacia Logan"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">Număr de înmatriculare *</Label>
                      <Input
                        id="licensePlate"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        placeholder="Ex: B 123 ABC"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observații (opțional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Orice informații suplimentare despre mașină sau programare"
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Înapoi
                  </Button>
                  <Button onClick={handleNextStep}>Continuă</Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Rezumat</CardTitle>
                  <CardDescription>Detalii programare</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">Rezumatul programării</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data și ora:</span>
                        <span>
                          {date && format(date, "PPP", { locale: ro })} {timeSlot}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Serviciu:</span>
                        <span>{SERVICE_TYPES.find((s) => s.id === serviceType)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicul:</span>
                        <span>
                          {formData.carModel} ({formData.licensePlate})
                        </span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t mt-2">
                        <span>Total de plată:</span>
                        <span>{getServicePrice()} RON</span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <Label>Metodă de plată</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Plată cu cardul (Stripe)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          Plată la fața locului
                        </Label>
                      </div>
                    </RadioGroup>
                  </div> */}

                  {paymentMethod === "card" && (
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Detalii card</h3>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="cardNumber">Număr card</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="expiry">Data expirării</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Înapoi
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Se procesează..." : "Finalizează programarea"}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Programare confirmată!</CardTitle>
                  <CardDescription>Mulțumim pentru programare. Detaliile au fost trimise pe email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">Detalii programare</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data și ora:</span>
                        <span>
                          {date && format(date, "PPP", { locale: ro })} {timeSlot}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Serviciu:</span>
                        <span>{SERVICE_TYPES.find((s) => s.id === serviceType)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicul:</span>
                        <span>
                          {formData.carModel} ({formData.licensePlate})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Metodă de plată:</span>
                        <span>{paymentMethod === "card" ? "Card" : "La fața locului"}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t mt-2">
                        <span>Total:</span>
                        <span>{getServicePrice()} RON</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Car className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Ce trebuie să aduci la programare:</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                          <li>Cartea de identitate a vehiculului</li>
                          <li>Certificatul de înmatriculare</li>
                          <li>Asigurarea RCA valabilă</li>
                          <li>Dovada ultimei inspecții tehnice (dacă este cazul)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/">
                    <Button>Înapoi la pagina principală</Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

