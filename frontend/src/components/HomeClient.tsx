'use client'
import { STRAPI_BASE_URL } from '@/lib/strapi';
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion";
import carrucel1 from '@/../public/images/carrucel1.webp'
import carrucel2 from '@/../public/images/carrucel2.jpg'
import carrucel3 from '@/../public/images/carrucel3.jpeg'
import { ChevronLeft, ChevronRight, Sparkles, Luggage, Shirt, LayoutTemplate } from "lucide-react";


export default function HomeClient({data}: {readonly data:{ tagline:string, title:string, images:[{title:string, alt:string, image:{url:string}}], description:string, link:{href:string, label:string}}} ){
  if(!data) return null;

  console.log('home',data)
  const {tagline, title,description, link } = data;


const services = [
  {
    name: 'Packing & Unpacking',
    description: 'Llega a tu hotel o Airbnb en Cancún y encuentra tu ropa lista. Nosotros nos encargamos de todo.',
    icon: Luggage,
  },
  {
    name: 'Business Express',
    description: 'Servicio de planchado y cuidado de prendas para que tu única preocupación sea tu agenda.',
    icon: Shirt,
  },
  {
    name: 'Home Reset',
    description: 'Organización profunda de closets, maquillaje o alacenas. Especialistas en mudanzas.',
    icon: LayoutTemplate,
  },
];
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [data.images.length])

  const features = [
    {
      name: 'Viaja ligero',
      description:
        'Llegas a Cancún y tu ropa ya está lista. Empaque y desempaque con cuidado premium.',
    },
    {
      name: 'Imagen profesional',
      description:
        'Planchado express y outfits armados para viajes de negocio.',
    },
    {
      name: 'Orden consciente',
      description:
        'Closets, alacenas y espacios que transmiten calma y funcionalidad.',
    },
  ]
// 1. Definimos las variantes de animación para el contenedor y los hijos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Los elementos hijos aparecerán uno tras otro
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

  return(
     <main>
      {/* HERO + CARRUSEL */}
      <section className="relative isolate min-h-screen flex items-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data.images.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <Image
                  src={image.image.url.startsWith('http')
  ? image.image.url : `${STRAPI_BASE_URL}${image.image.url}`}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>

          {/* CONTROLES */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 hidden sm:flex rounded-full bg-white/70 backdrop-blur-md p-3"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex rounded-full bg-white/70 backdrop-blur-md p-3"
          >
            ›
          </button>

          {/* DOTS */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {data.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* TEXTO HERO */}
        <div className="mx-auto max-w-5xl  py-32 sm:py-48 lg:py-56 text-center ">
           <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-slate-200 ring-1 ring-teal-100/10 hover:ring-teal-100/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
              {tagline}{' '}
              <a href="#" className="font-semibold text-blue-200 dark:text-indigo-400">
                <span aria-hidden="true" className="absolute inset-0" />
                Leer más <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="text-5xl sm:text-7xl font-semibold text-rose-100">
            {title}
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-rose-200">
            {description}
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <a className="rounded-md bg-rose-400 px-6 py-3 text-white font-semibold">
              Reservar servicio
            </a>
            <a className="text-rose-200 font-semibold">
              Ver servicios →
            </a>
          </div>
        </div>
      </section>


       <section className="">
    <motion.div 
      className="overflow-hidden bg-slate-100 dark:bg-slate-300 -translate-y-8 py-24 sm:py-32 rounded-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Se activa al hacer scroll
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          {/* Columna de Texto */}
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <motion.h2 variants={itemVariants} className="text-base/7 font-semibold text-indigo-600">
                {/* {subtitle} */} suntiituko
              </motion.h2>
              <motion.p variants={itemVariants} className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {/* {title} */} titulo
              </motion.p>
              <motion.p variants={itemVariants} className="mt-6 text-lg/8 text-gray-700">
                {/* {description} */} descripcion
              </motion.p>
              
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <motion.div  variants={itemVariants} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      {/* El icono vendría de una librería o Strapi */}
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>

          {/* Columna de Imagen */}
          <motion.img
            alt="Product screenshot"
            src={"https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"}
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </motion.div>
      </section>



      {/* SECCIÓN VALOR */}
      <section className="bg-slate-100 py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold text-gray-900">
              Orden funcional con estética glam escandinava
            </h2>
            <p className="mt-6 text-lg text-gray-700">
              Menos ruido visual. Más armonía, lujo discreto y claridad.
            </p>

            <dl className="mt-10 space-y-8">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="font-semibold text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xl">
            <Image
              src={carrucel2}
              alt="Organización de closets"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:max-w-lg"
            >
              <h2 className="text-sm font-bold tracking-[0.3em] text-glam-gold uppercase">Estilo de Vida</h2>
              <p className="mt-2 text-4xl font-serif tracking-tight text-luxury-black sm:text-5xl">
                El Orden es el Nuevo Lujo
              </p>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 font-light">
                No solo acomodamos objetos; creamos sistemas de vida que te permiten disfrutar lo que realmente importa: tu tiempo en el paraíso.
              </p>
              <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                {services.map((service) => (
                  <div key={service.name} className="relative pl-12">
                    <dt className="inline font-semibold text-luxury-black">
                      <service.icon className="absolute left-1 top-1 h-6 w-6 text-glam-gold" />
                      {service.name}
                    </dt>
                    <dd className="mt-1 font-light">{service.description}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
            <div className="relative">
                <div className="absolute -inset-4 rounded-4xl bg-glam-rose/10 -z-10" />
                <img
                    src="/images/closet-organization.jpg"
                    alt="Organización de closet premium"
                    className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-400/10"
                />
            </div>
          </div>
        </div>
      </section>


  
    </main>
  )
}