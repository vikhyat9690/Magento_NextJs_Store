// components/Navbar.tsx
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCartIcon } from "lucide-react"
import { getCustomer } from "../lib/customer"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState("");
  useEffect(() => {
    async function initCustomer() {
      try {
        const data = await getCustomer();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    initCustomer()
  }, [])

  return (
    <nav className="w-full px-6 py-4 bg-black shadow-md flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="w-1/3 text-xl font-bold text-gray-200">
        MageStore
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-14 w-2/3 justify-end">
        <span className="text-white">
          {data.length}
        </span>
        <Link href="/products" className="text-gray-500 hover:text-white">
          Products
        </Link>
        <Link href="/about" className="text-gray-500 hover:text-white">
          About
        </Link>
        <Link href="/contact" className="text-gray-500 hover:text-white">
          Contact
        </Link>
        <Link href="/auth/login" className="text-gray-500 hover:text-white">
          Login
        </Link>
        <Link href="/cart" className="text-gray-500 hover:text-white flex items-center">
          <ShoppingCartIcon />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/products" onClick={() => setOpen(false)}>
                Products
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
