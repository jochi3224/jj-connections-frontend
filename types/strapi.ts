// ─── Strapi Media ─────────────────────────────────────────────────────────────
export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImageAttributes {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: StrapiImageAttributes;
  } | null;
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
export interface WhyChooseUsItem {
  id: number;
  title: string;
  description: string;
  icon: StrapiImage;
}

// ─── Services ─────────────────────────────────────────────────────────────────
export interface ServiceItem {
  id: number;
  number: string; // "01" | "02" | "03"
  title: string;
  description: string;
  slug: string;
  coverImage: StrapiImage;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavSubItem {
  id: number;
  label: string;
  slug: string;
}

export interface NavItem {
  id: number;
  label: string;
  slug: string;
  subItems?: NavSubItem[];
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export interface SocialLink {
  id: number;
  platform: "instagram" | "facebook" | "tiktok" | "whatsapp" | "youtube";
  url: string;
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export interface HomePageAttributes {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: StrapiImage;
  heroLogo: StrapiImage;
  heroCta: string;
  heroCtaUrl: string;

  // Why Choose Us
  whyChooseUsTitle: string;
  whyChooseUsItems: WhyChooseUsItem[];
  whyChooseUsMainImage: StrapiImage;

  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceItem[];

  // About
  aboutLabel: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutLocation: string;
  aboutImage: StrapiImage;

  // Social
  socialLinks: SocialLink[];

  // SEO
  seoTitle?: string;
  seoDescription?: string;

  createdAt: string;
  updatedAt: string;
}

export interface HomePageData {
  id: number;
  attributes: HomePageAttributes;
}

// ─── Strapi Generic Response ───────────────────────────────────────────────────
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Helper: resolve image URL ────────────────────────────────────────────────
export function getStrapiImageUrl(
  image: StrapiImage,
  format?: keyof NonNullable<StrapiImageAttributes["formats"]>
): string {
  if (!image?.data) return "/placeholder-watch.jpg";
  const { url, formats } = image.data.attributes;
  if (format && formats?.[format]) return formats[format]!.url;
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${url}`;
}

export function getStrapiImageAlt(image: StrapiImage): string {
  return image?.data?.attributes.alternativeText ?? "";
}
