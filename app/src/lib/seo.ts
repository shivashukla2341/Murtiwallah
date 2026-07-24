import fs from "fs";
import path from "path";

/**
 * Server-only. Checks whether a file under /public actually exists yet, so
 * generateMetadata can point og:image/twitter:image at real product/category
 * photos once uploaded, while gracefully falling back to the site-wide
 * branded opengraph-image.tsx card for anything not uploaded yet (an empty
 * `images` array here would otherwise make scrapers show no image at all).
 */
export function publicImageExists(relativePath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", relativePath));
  } catch {
    return false;
  }
}
