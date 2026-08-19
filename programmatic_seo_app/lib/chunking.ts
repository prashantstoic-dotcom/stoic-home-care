/**
 * Chunks a large string of text into smaller arrays of text,
 * ensuring that the cuts happen at word boundaries (spaces) to avoid splitting words.
 * 
 * @param text The full raw scraped text.
 * @param maxLength The maximum character length per chunk (e.g., 8000 chars roughly equals 2000 tokens).
 * @returns Array of string chunks.
 */
export function chunkTextForAI(text: string, maxLength: number = 8000): string[] {
  if (!text) return [];
  
  const chunks: string[] = [];
  let currentStart = 0;
  
  while (currentStart < text.length) {
    let currentEnd = currentStart + maxLength;
    
    // If the slice goes beyond the text length, just grab the rest and break.
    if (currentEnd >= text.length) {
      chunks.push(text.slice(currentStart).trim());
      break;
    }
    
    // To prevent cutting a word in half, backtrack from currentEnd to the nearest space.
    let backtrackEnd = currentEnd;
    while (backtrackEnd > currentStart && text[backtrackEnd] !== ' ' && text[backtrackEnd] !== '\n') {
      backtrackEnd--;
    }
    
    // If we couldn't find a space (e.g., a single word longer than maxLength - very rare), 
    // just hard cut at maxLength.
    if (backtrackEnd === currentStart) {
      backtrackEnd = currentEnd;
    }
    
    chunks.push(text.slice(currentStart, backtrackEnd).trim());
    currentStart = backtrackEnd + 1; // Start the next chunk after the space.
  }
  
  return chunks.filter(chunk => chunk.length > 0);
}
