'use client'
import Link from "next/link"
import Nav from "./Nav"
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Nav />
    </header>
  )
}