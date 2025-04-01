import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Settings, Shield, PenToolIcon as Tool, Wrench } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Service Auto & Stație ITP Autorizată
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Servicii complete de întreținere și reparații auto, realizate de profesioniști cu experiență și
                  echipamente de ultimă generație.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/booking">
                  <Button size="lg" className="px-8">
                    Programare ITP
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="px-8">
                    Serviciile noastre
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <Image
                src="/statie-itp-service.png"
                width={800}
                height={550}
                alt="Service Auto"
                className="w-full h-auto aspect-video rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Servicii Auto Complete</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Oferim o gamă completă de servicii pentru întreținerea și repararea autovehiculului dumneavoastră
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Inspecție Tehnică Periodică</CardTitle>
                <CardDescription>ITP autorizat pentru toate tipurile de autovehicule</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Verificări complete conform normelor RAR, cu echipamente moderne și personal autorizat.</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mecanică Auto</CardTitle>
                <CardDescription>Reparații și întreținere pentru toate mărcile</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Diagnosticare computerizată, reparații motor, sisteme de frânare, suspensie și direcție.</p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tool className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Electrică Auto</CardTitle>
                <CardDescription>Diagnosticare și reparații sisteme electrice</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reparații instalații electrice, sisteme de iluminat, pornire și încărcare, sisteme electronice.</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/services">
              <Button variant="outline">Vezi toate serviciile</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">De ce să ne alegeți pe noi</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Suntem dedicați să oferim servicii de cea mai înaltă calitate pentru autovehiculul dumneavoastră
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Calitate garantată</h3>
              <p className="text-muted-foreground">
                Folosim doar piese de calitate și oferim garanție pentru toate lucrările efectuate.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Rapiditate</h3>
              <p className="text-muted-foreground">
                Respectăm timpul dumneavoastră și ne străduim să finalizăm lucrările în termenul promis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Profesionalism</h3>
              <p className="text-muted-foreground">
                Echipa noastră este formată din profesioniști cu experiență și certificări în domeniu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Programează-te acum pentru ITP</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Procesul de programare este simplu și rapid. Alege data și ora care ți se potrivesc.
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

