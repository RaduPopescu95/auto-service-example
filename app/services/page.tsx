import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Settings, Wrench, PenToolIcon as Tool, Droplet, Thermometer, Gauge, Sparkles, Zap } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Serviciile Noastre</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Oferim o gamă completă de servicii auto, de la inspecții tehnice periodice până la reparații complexe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Inspecție Tehnică Periodică (ITP)</CardTitle>
                <CardDescription>Verificări complete conform normelor RAR</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>ITP pentru autoturisme</li>
                  <li>ITP pentru autoutilitare</li>
                  <li>ITP pentru motociclete</li>
                  <li>Verificare emisii gaze</li>
                  <li>Verificare sisteme de siguranță</li>
                </ul>
                <div className="mt-4">
                  <Link href="/booking">
                    <Button>Programare ITP</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mecanică Auto</CardTitle>
                <CardDescription>Reparații și întreținere pentru toate mărcile</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Diagnosticare computerizată</li>
                  <li>Reparații motor</li>
                  <li>Sisteme de frânare</li>
                  <li>Suspensie și direcție</li>
                  <li>Schimb de ulei și filtre</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tool className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Electrică Auto</CardTitle>
                <CardDescription>Diagnosticare și reparații sisteme electrice</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Reparații instalații electrice</li>
                  <li>Sisteme de iluminat</li>
                  <li>Sisteme de pornire și încărcare</li>
                  <li>Sisteme electronice</li>
                  <li>Diagnoza computerizată</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Schimb Ulei și Filtre</CardTitle>
                <CardDescription>Întreținere periodică esențială</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Schimb ulei motor</li>
                  <li>Schimb filtru ulei</li>
                  <li>Schimb filtru aer</li>
                  <li>Schimb filtru combustibil</li>
                  <li>Schimb filtru habitaclu</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Thermometer className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Climatizare Auto</CardTitle>
                <CardDescription>Servicii complete pentru sistemul de climatizare</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Încărcare freon</li>
                  <li>Verificare și reparații sistem A/C</li>
                  <li>Curățare sistem climatizare</li>
                  <li>Înlocuire componente</li>
                  <li>Dezinfectare habitaclu</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Geometrie Roți</CardTitle>
                <CardDescription>Aliniere și echilibrare roți</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Verificare geometrie</li>
                  <li>Reglare unghiuri roți</li>
                  <li>Echilibrare roți</li>
                  <li>Montare și demontare anvelope</li>
                  <li>Verificare presiune pneuri</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detailing Auto</CardTitle>
                <CardDescription>Servicii de curățare și întreținere estetică</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Spălare și curățare interior</li>
                  <li>Polishare caroserie</li>
                  <li>Ceruire și protecție vopsea</li>
                  <li>Curățare tapițerie</li>
                  <li>Tratamente profesionale</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Diagnoză Computerizată</CardTitle>
                <CardDescription>Verificare completă a sistemelor electronice</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Citire și ștergere erori</li>
                  <li>Verificare sisteme de management motor</li>
                  <li>Testare senzori și actuatori</li>
                  <li>Programare module</li>
                  <li>Actualizare software</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pregătire RAR</CardTitle>
                <CardDescription>Pregătire pentru inspecția RAR</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Verificare completă pre-RAR</li>
                  <li>Remedierea defecțiunilor</li>
                  <li>Ajustări tehnice necesare</li>
                  <li>Verificare emisii</li>
                  <li>Pregătire documente</li>
                </ul>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button variant="outline">Solicită ofertă</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ai nevoie de un serviciu auto de încredere?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contactează-ne pentru o programare sau solicită o ofertă personalizată pentru serviciile de care ai
                nevoie.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/booking">
                <Button size="lg" className="px-8">
                  Programare ITP
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8">
                  Contactează-ne
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

