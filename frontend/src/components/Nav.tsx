"use client"

import Link from "next/link";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import logo from '@/../public/images/Logo.png'
import { Logs, X, Menu  } from 'lucide-react';
import Image from "next/image";

export default function Nav(){

      const menuItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return(
       <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-scandi-green/35 backdrop-blur-md shadow-lg py-3" // Fondo verde al bajar
          : "bg-transparent py-5" // Transparente al inicio
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        
        {/* LOGO: Con tu estilo radial pero más refinado */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition-transform hover:scale-105">
            <div className="relative rounded-full bg-gradient-to-r from-pink-100 from-40% to-stone-600/60 p-2 backdrop-blur-sm">
              <span className="sr-only">OrdenIvEstilo</span>
              <Image
                alt="logo"
                 width={120}
                height={64}
                src={logo} // Asegúrate de que esté en public/logo.png
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>
        </div>

        {/* MENÚ MÓVIL (Usando Sheet de shadcn) */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-luxury-black">
                <Logs className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white/95 backdrop-blur-xl border-l-scandi-gray">
              <SheetTitle className="font-serif text-2xl tracking-widest mt-10">MENU</SheetTitle>
              <div className="flex flex-col gap-6 mt-12">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-light tracking-widest uppercase hover:text-glam-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* MENÚ DESKTOP: Estilo Scandi (limpio y espaciado) */}
        <div className="hidden lg:flex lg:gap-x-12">
          {menuItems.map((item) => (
            <Link
        key={item.name}
        href={item.href}
        className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 
          /* Estado Normal vs Scroll */
          ${isScrolled ? "text-scandi-green-100" : "text-pink-100"}
          
          /* Hover: Siempre a dorado */
          hover:text-glam-gold 
          
 
        `}
      >
        {item.name}
      </Link>
          ))}
        </div>

        {/* ACCESO / CTA: Estilo Glam */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          {/* <Link 
            href="/login" 
            className="text-xs uppercase tracking-widest font-semibold text-luxury-black hover:opacity-70 transition-opacity"
          >
            Log in
          </Link> */}
          <Button 
            variant="outline" 
            className="border-luxury-black rounded-none uppercase text-[10px] tracking-widest hover:bg-luxury-black hover:text-white transition-all px-6"
          >
            Reservar
          </Button>
        </div>
      </div>
    </nav>
    )
}