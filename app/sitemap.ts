import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

const ROUTES = ["/", "/events", "/members", "/achievements"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    priority: path === "/" ? 1.0 : 0.8,
  }));
}
