import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { fetchSupabase, SUPABASE_URL, SUPABASE_KEY } from '@/lib/supabase';
import { CONFIG } from '@/lib/config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || CONFIG.BASE_URL;

// Safely initialize Supabase Client for precise counting
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. ISR Database Protection (24 hours cache)
export const revalidate = 86400;

// 2. Generate Sitemap Index (Calculates Total Chunks)
export async function generateSitemaps() {
  const CHUNK_SIZE = 10000;
  
  // Head:true fetches ONLY the total count, ensuring 0 MB data transfer payload.
  const { count, error } = await supabase
    .from('stoic_home_care')
    .select('*', { count: 'exact', head: true });

  if (error || count === undefined || count === null) {
    console.error("Error fetching total page count for sitemaps:", error);
    return [{ id: 1 }]; // Safety fallback to at least 1 chunk
  }

  const totalChunks = Math.ceil(count / CHUNK_SIZE);
  const chunksToReturn = totalChunks > 0 ? totalChunks : 1;
  
  // Generates array: [{ id: 1 }, { id: 2 }, ... { id: totalChunks }]
  return Array.from({ length: chunksToReturn }, (_, i) => ({ id: i + 1 }));
}

// 3. The Dynamic Chunk Endpoint Logic
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const chunkId = id || 1;
  const CHUNK_SIZE = 10000;
  
  // Mathematical Algorithm (Zero-Error Pagination)
  const offset = (chunkId - 1) * CHUNK_SIZE;
  const limit = offset + CHUNK_SIZE - 1;

  // Placeholder array to be populated
  const finalRoutes: MetadataRoute.Sitemap = [];

  // 1. Static Routes (Strictly injected only in Chunk 1)
  if (chunkId === 1) {
    const staticPages = ['', '/about', '/services', '/equipment', '/contact', '/blog'];
    
    const mappedStaticPages = staticPages.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }));
    
    finalRoutes.push(...mappedStaticPages);

    // 2. Blog Posts (Strictly injected only in Chunk 1)
    const { data: blogs, error: blogError } = await supabase
      .from('stoic_blogs')
      .select('slug, published_at');

    if (!blogError && blogs) {
      const mappedBlogs = blogs.map((blog: any) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
      finalRoutes.push(...mappedBlogs);
    }

    // 3. Hub Pages (Locations & Categories)
    try {
      const { getAllSeoPages } = await import('@/lib/supabase');
      const allPages = await getAllSeoPages();
      
      const uniqueLocations = Array.from(new Set(allPages.map((p: any) => p.location).filter(Boolean)));
      const uniqueCategories = Array.from(new Set(allPages.map((p: any) => p.category).filter(Boolean)));
      
      const locationRoutes = uniqueLocations.map((loc: any) => {
        const slug = loc.toLowerCase().replace(/\s+/g, '-');
        return {
          url: `${BASE_URL}/location/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
      
      const categoryRoutes = uniqueCategories.map((cat: any) => {
        const slug = cat.toLowerCase().replace(/\s+/g, '-');
        return {
          url: `${BASE_URL}/category/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
      
      finalRoutes.push(...locationRoutes, ...categoryRoutes);
    } catch (e) {
      console.error("Error fetching hubs for sitemap:", e);
    }
  }

  // 3. Programmatic SEO Pages (Paginated per 10k Chunk)
  const { data: seoPages, error: seoError } = await supabase
    .from('stoic_home_care')
    .select('slug, category, created_at')
    .range(offset, limit);

  if (!seoError && seoPages) {
    finalRoutes.push(
      ...seoPages.map((page: any) => {
        const catSlug = page.category ? page.category.toLowerCase().replace(/\s+/g, '-') + '/' : '';
        return {
          url: `${BASE_URL}/${catSlug}${page.slug}`,
          lastModified: page.created_at ? new Date(page.created_at) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.9,
        };
      })
    );
  }

  return finalRoutes;
}
