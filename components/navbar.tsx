"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            Auto<span className="text-primary">Service</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Acasă
          </Link>
          <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
            Servicii
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            Despre noi
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <Link href="/booking">
            <Button className="ml-4">Programare ITP</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background border-b transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-64 py-4" : "max-h-0 py-0 overflow-hidden",
        )}
      >
        <div className="container flex flex-col space-y-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Acasă
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Servicii
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Despre noi
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full">Programare ITP</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

