import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Shield, Star, PenToolIcon as Tool, Wrench } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Despre Noi</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Cu peste 15 ani de experiență în domeniul auto, suntem dedicați să oferim servicii de cea mai înaltă
                  calitate pentru autovehiculul dumneavoastră.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/services">
                  <Button>Serviciile noastre</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contactează-ne</Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <Image
                src="/statie-itp-service.png"
                width={800}
                height={550}
                alt="Echipa noastră"
                className="w-full h-auto aspect-video rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none order-2 lg:order-1">
              <Image
                src="/statie-itp-service.png"
                width={800}
                height={550}
                alt="Service Auto"
                className="w-full h-auto aspect-video rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Povestea noastră</h2>
                <p className="text-muted-foreground">
                  Am început ca un mic atelier auto în 2008, cu o echipă de doar trei mecanici pasionați și dedicați.
                  De-a lungul anilor, ne-am dezvoltat constant, investind în echipamente moderne și în formarea
                  profesională a echipei noastre.
                </p>
                <p className="text-muted-foreground">
                  Astăzi, suntem mândri să oferim o gamă completă de servicii auto, de la inspecții tehnice periodice
                  până la reparații complexe, toate realizate la cele mai înalte standarde de calitate.
                </p>
                <p className="text-muted-foreground">
                  Misiunea noastră este să oferim clienților noștri servicii de încredere, transparente și la prețuri
                  corecte, asigurându-ne că fiecare autovehicul care intră în service-ul nostru primește atenția și
                  îngrijirea de care are nevoie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Valorile noastre</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Principiile care ne ghidează în fiecare zi și ne ajută să oferim servicii de calitate
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Calitate</h3>
                <p className="text-muted-foreground">
                  Ne angajăm să oferim servicii de cea mai înaltă calitate, folosind piese și materiale premium.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Integritate</h3>
                <p className="text-muted-foreground">
                  Suntem transparenți și onești în toate interacțiunile cu clienții noștri.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Promptitudine</h3>
                <p className="text-muted-foreground">
                  Respectăm timpul clienților noștri și ne străduim să finalizăm lucrările în termenul promis.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Excelență</h3>
                <p className="text-muted-foreground">
                  Căutăm constant să ne îmbunătățim serviciile și să depășim așteptările clienților.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Tool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Inovație</h3>
                <p className="text-muted-foreground">
                  Investim în tehnologie și echipamente moderne pentru a oferi servicii de ultimă generație.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Profesionalism</h3>
                <p className="text-muted-foreground">
                  Echipa noastră este formată din profesioniști cu experiență și certificări în domeniu.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Echipa noastră</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Profesioniștii care se ocupă de autovehiculul dumneavoastră
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="/director-tehnic.png"
                  width={128}
                  height={128}
                  alt="Membru echipă"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Mihai Popescu</h3>
              <p className="text-primary font-medium">Director Tehnic</p>
              <p className="text-muted-foreground">
                Cu peste 20 de ani de experiență în domeniul auto, Mihai coordonează toate operațiunile tehnice.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="/sef-atelier.png"
                  width={128}
                  height={128}
                  alt="Membru echipă"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Alexandru Ionescu</h3>
              <p className="text-primary font-medium">Șef Atelier</p>
              <p className="text-muted-foreground">
                Alexandru este responsabil pentru coordonarea echipei de mecanici și asigurarea calității lucrărilor.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="/relatii-clienti.png"
                  width={128}
                  height={128}
                  alt="Membru echipă"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Elena Dumitrescu</h3>
              <p className="text-primary font-medium">Manager Relații Clienți</p>
              <p className="text-muted-foreground">
                Elena se asigură că fiecare client primește atenția și serviciile de care are nevoie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Gata să ne încredințezi mașina ta?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Programează-te acum pentru ITP sau contactează-ne pentru orice serviciu auto de care ai nevoie.
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

