import React from 'react'
import Navbar from './navbar'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col gap-5">
        <Navbar />
        {children}
    </section>
  )
}
