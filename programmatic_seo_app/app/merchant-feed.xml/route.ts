import { fetchSupabase } from "@/lib/supabase";
import { CONFIG } from "@/lib/config";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const equipment = await fetchSupabase("stoic_equipment?select=*&order=id.desc") || [];

    const origin = CONFIG.BASE_URL;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n`;
    xml += `  <channel>\n`;
    xml += `    <title>Stoic Home Care Equipment Rentals</title>\n`;
    xml += `    <link>${origin}</link>\n`;
    xml += `    <description>Hospital-grade medical equipment available for rent in Delhi NCR.</description>\n`;

    for (const eq of equipment) {
      // Parse pricing - Merchant Center requires exact currency format
      const rawPrice = (eq.price || '500').replace(/[^0-9]/g, '') || '500';
      const price = `${rawPrice}.00 INR`;
      
      const imageUrl = eq.image_url 
        ? (eq.image_url.startsWith('http') ? eq.image_url : `${origin}${eq.image_url}`)
        : `${origin}/images/placeholder.png`;

      // Escape special characters for XML
      const title = (eq.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const description = (eq.description || `Rent ${title} for home use.`)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      xml += `    <item>\n`;
      xml += `      <g:id>EQ-${eq.id}</g:id>\n`;
      xml += `      <g:title>${title} Rental</g:title>\n`;
      xml += `      <g:description>${description}</g:description>\n`;
      xml += `      <g:link>${origin}/equipment</g:link>\n`;
      xml += `      <g:image_link>${imageUrl}</g:image_link>\n`;
      xml += `      <g:condition>new</g:condition>\n`;
      xml += `      <g:availability>in stock</g:availability>\n`;
      xml += `      <g:price>${price}</g:price>\n`;
      xml += `      <g:brand>Stoic Home Care</g:brand>\n`;
      xml += `      <g:google_product_category>Health &amp; Beauty &gt; Health Care &gt; Medical Equipment</g:google_product_category>\n`;
      xml += `    </item>\n`;
    }

    xml += `  </channel>\n`;
    xml += `</rss>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error("Failed to generate merchant feed:", error);
    // Return empty valid RSS feed to prevent Google Merchant Center hard failures
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>Stoic Home Care</title><link>https://stoiccare.in</link><description>Feed unavailable</description></channel></rss>`;
    return new Response(fallbackXml, {
      status: 500,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
