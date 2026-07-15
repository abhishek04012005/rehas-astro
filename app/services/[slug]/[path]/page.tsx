import servicesData from "@/data/services.json";
import serviceSeoData from "@/data/serviceSeo.json";
import ServiceDetailPage from "../ServiceDetailPage";

interface ServiceIntentPageProps {
  params: Promise<{ slug: string; path: string }>;
}

export async function generateMetadata({ params }: ServiceIntentPageProps) {
  const { slug, path } = await params;
  const service = servicesData.find((item: { slug: string }) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | REHAS",
      description: "The requested astrology service could not be found.",
    };
  }

  const seoData = serviceSeoData.find((item) => item.slug === service.slug && (item.path ?? "") === path);

  return {
    title: `${seoData?.title ?? service.title} | REHAS Astrology Services`,
    description: seoData?.description ?? service.description,
    keywords: [service.title, ...(seoData?.keywords ?? ["astrology service", "REHAS astrology"])],
    alternates: {
      canonical: `https://astrology.rehas.in/services/${service.slug}/${path}`,
    },
    openGraph: {
      title: `${seoData?.title ?? service.title} | REHAS Astrology Services`,
      description: seoData?.description ?? service.description,
      url: `https://astrology.rehas.in/services/${service.slug}/${path}`,
      type: "article",
      images: [
        {
          url: service.image || "https://astrology.rehas.in/images/vedic.png",
          alt: service.imageAlt || service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoData?.title ?? service.title} | REHAS Astrology Services`,
      description: seoData?.description ?? service.description,
    },
  };
}

export default async function ServiceIntentRoutePage({ params }: ServiceIntentPageProps) {
  const { slug, path } = await params;
  const service = servicesData.find((item: { slug: string }) => item.slug === slug);

  if (!service) {
    return null;
  }

  return <ServiceDetailPage service={{ ...service, slug, path }} />;
}
