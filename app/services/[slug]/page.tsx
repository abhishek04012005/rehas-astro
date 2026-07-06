import servicesData from "@/data/services.json";
import ServiceDetailPage from "./ServiceDetailPage";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service: { slug: string }) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((item: { slug: string }) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | REHAS",
      description: "The requested astrology service could not be found.",
    };
  }

  return {
    title: `${service.title} | REHAS Astrology Services`,
    description: service.description,
    alternates: {
      canonical: `https://rehas.in/services/${service.slug}`,
    },
  };
}

export default async function ServiceRoutePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((item: { slug: string }) => item.slug === slug);

  if (!service) {
    return null;
  }

  return <ServiceDetailPage service={service} />;
}
