// components/Navbar.tsx
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

import { Menu, ShoppingCartIcon } from "lucide-react"
import { MdShoppingCartCheckout } from "react-icons/md"
import { Logout } from "../lib/logout"
import toast from "react-hot-toast"

interface Customer {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  postCode?: number,
  phone?: string,
  gender?: number
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    async function initCustomer() {
      try {
        const customerInfo = localStorage.getItem('customer_info')!;
        const customer = JSON.parse(customerInfo);
        setCustomer(customer)
      } catch (error) {
        console.log(error);
      }
    }
    initCustomer()
  }, [])

  const handleSubmit = async () => {
    const res = await Logout();
    toast.success('Logged out successfully');
  }

  return (
    <nav className="w-full px-6 py-4 bg-black shadow-md flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="w-1/3 text-xl font-bold text-gray-200">
        MageStore
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-14 w-2/3 justify-end">
        <span className="text-white" id={customer?.id}>
          {customer
            ? ('Hello, ' + customer?.firstname + ' !')
            : ''
          }
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
        {
          customer
            ? <Link href="/auth/login" onClick={handleSubmit}>
              Logout
            </Link>
            : <Link href="/auth/login" onClick={() => setOpen(false)}>
              Login/Register
            </Link>
        }
        <Link href="/auth/cashier/login" className="text-gray-500 hover:text-white flex items-center">
          Casheir Login
        </Link>
        <Link href="/cart" className="text-gray-500 hover:text-white flex items-center">
          <ShoppingCartIcon />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="border border-none">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-black text-white border border-black">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/products" onClick={() => setOpen(false)}>
                Products
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
              {
                customer
                  ? <Link href="/auth/logout" onClick={() => setOpen(false)}>
                    Logout
                  </Link>
                  : <Link href="/auth/login" onClick={() => setOpen(false)}>
                    Login/Register
                  </Link>
              }
              <Link href="/cart" onClick={() => setOpen(false)}>
                Your Cart
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
