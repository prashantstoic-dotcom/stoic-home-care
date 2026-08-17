export class AutoLinker {
  static linkify(html: string, dictionary: Record<string, string>): string {
    if (!html || !dictionary) return html;
    
    let linkedHtml = html;
    const replacementsMade = new Set<string>();

    const sortedKeywords = Object.keys(dictionary).sort((a, b) => b.length - a.length);

    for (const keyword of sortedKeywords) {
      if (replacementsMade.has(keyword)) continue;
      
      const url = dictionary[keyword];
      const href = url.startsWith('http') ? url : url; 
      
      // Simple regex to match keywords outside of HTML tags and <a> tags
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escapedKeyword})\\b(?![^<]*>|[^<>]*<\/a>)`, 'i');
      
      if (regex.test(linkedHtml)) {
        linkedHtml = linkedHtml.replace(regex, `<a href="${href}" class="wiki-link text-teal" style="text-decoration: underline; color: #0CB8C9; font-weight: bold;">$1</a>`);
        replacementsMade.add(keyword);
      }
    }
    
    return linkedHtml;
  }

  static generateTOC(html: string) {
    let tocHtml = '<div class="toc-box mb-4 p-4 bg-light rounded shadow-sm border border-secondary border-opacity-25">';
    tocHtml += '<h4 class="h6 fw-bold mb-3"><i class="fa-solid fa-list-ul me-2 text-primary"></i>On This Page</h4><ul class="list-unstyled mb-0" style="columns: 1; @media(min-width:768px){columns: 2;}">';
    
    let hasHeadings = false;
    
    const processedHtml = html.replace(/<h([23])(.*?)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
      hasHeadings = true;
      const strippedText = text.replace(/<[^>]*>/g, '').trim();
      const slug = strippedText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const newHeading = `<h${level}${attrs} id="${slug}">${text}</h${level}>`;
      
      const padding = level === '3' ? 'ps-4' : '';
      const icon = level === '2' ? '<i class="fa-solid fa-angle-right small text-primary me-2"></i>' : '<i class="fa-solid fa-minus small text-muted me-2"></i>';
      
      tocHtml += `<li class='mb-2 ${padding}'><a href='#${slug}' class='text-decoration-none text-dark hover-primary'>${icon}${strippedText}</a></li>`;
      
      return newHeading;
    });

    tocHtml += '</ul></div>';
    
    if (hasHeadings) {
      return tocHtml + processedHtml;
    }
    
    return processedHtml;
  }

  static optimizeImages(html: string, altSuffix: string) {
    let processed = html.replace(/<img\s+(?!.*?alt=)([^>]+)>/gi, `<img alt="${altSuffix}" $1>`);
    processed = processed.replace(/alt=["'](.*?)["']/gi, `alt="$1 - ${altSuffix}"`);
    processed = processed.replace(/<img /gi, '<img loading="lazy" ');
    return processed;
  }
}
