import servicesData from "@/data/services.json";
import ServiceDetailPage from "./ServiceDetailPage";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
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
    keywords: [
      service.title,
      "Vedic astrology",
      "Kundli analysis",
      "astrology service",
      "REHAS astrology",
    ],
    alternates: {
      canonical: `https://rehas.in/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | REHAS Astrology Services`,
      description: service.description,
      url: `https://rehas.in/services/${service.slug}`,
      type: "article",
      images: [
        {
          url: service.image || "https://rehas.in/images/vedic.png",
          alt: service.imageAlt || service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | REHAS Astrology Services`,
      description: service.description,
    },
  };
}

export default async function ServiceRoutePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((item: { slug: string }) => item.slug === slug);

  if (!service) {
    return null;
  }

  return <ServiceDetailPage service={{ ...service, slug }} />;
}
