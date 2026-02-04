
import {getHomePage} from "@/lib/strapi"
import HomeClient from "@/components/HomeClient";

export async function generateMetadata() {
  const strapiData = await getHomePage()
  return{
    title: strapiData?.title
  }
}
export default async function HomePage() {
  const strapiData = await getHomePage();
  const [heroSection] = strapiData?.sections || []

  return (
   <HomeClient data={{...heroSection}}></HomeClient>
  )
}
