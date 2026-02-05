
import {getHomePage} from "@/lib/strapi"
import HomeClient from "@/components/HomeClient";
import { Suspense } from "react";
export async function generateMetadata() {
  try {
  const strapiData = await getHomePage()
  return{
    title: strapiData?.title ?? "Inicio"
  }
}
catch {
    return { title: "OrdenIvEstilo" };
  }
}
export default async function HomePage() {

  return (
    <main>
      {/* 2. En Next 16, si un componente hace un 'await' de datos dinámicos, 
         DEBE estar envuelto en Suspense o la página fallará en producción.
      */}
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </main>
  )
}

async function HomeContent() {
  const strapiData = await getHomePage();
  if (!strapiData) {
    return <div>No se pudo conectar con Strapi</div>;
  }

  // Si sections es opcional, usamos optional chaining
  const [heroSection] = strapiData?.sections || [];

  return <HomeClient data={{ ...heroSection }} />;
}

function HomeSkeleton() {
  return <div className="animate-pulse h-screen bg-gray-100" />;
}