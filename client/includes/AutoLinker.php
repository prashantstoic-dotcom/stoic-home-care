<?php
declare(strict_types=1);

/* ============================================================
   Stoic Home Care — client/includes/AutoLinker.php
   The "Wikipedia Engine" for automated internal linking.
   ============================================================ */

class AutoLinker {
    /**
     * Parses HTML and replaces dictionary keywords with links.
     * Prevents replacing keywords inside existing <a> tags or HTML attributes.
     */
    public static function linkify(string $html, array $dictionary): string {
        if (empty(trim($html)) || empty($dictionary)) {
            return $html;
        }

        // We only want to replace the first occurrence of each keyword to avoid spamming
        $replacementsMade = [];

        // Sort dictionary keys by length descending to match longest phrases first 
        // e.g., "ICU Setup at Home" matches before "ICU Setup"
        uksort($dictionary, function($a, $b) {
            return mb_strlen($b) - mb_strlen($a);
        });

        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        // Wrap in a body tag to ensure proper parsing, with UTF-8 encoding
        $dom->loadHTML('<?xml encoding="UTF-8"><body>' . $html . '</body>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();

        $xpath = new DOMXPath($dom);
        // Select all text nodes that are not inside <a>, <script>, <style>, <textarea>, <button>, or headings <h1>-<h6>
        $textNodes = $xpath->query('//text()[not(ancestor::a) and not(ancestor::script) and not(ancestor::style) and not(ancestor::textarea) and not(ancestor::button) and not(ancestor::h1) and not(ancestor::h2) and not(ancestor::h3)]');

        // Note: Modifying a DOM while iterating its NodeList can be problematic if nodes shift.
        // We convert to array first.
        $nodesArray = [];
        foreach ($textNodes as $node) {
            $nodesArray[] = $node;
        }

        foreach ($nodesArray as $node) {
            $text = $node->nodeValue;

            foreach ($dictionary as $keyword => $url) {
                // If we already linked this keyword on this page, skip it (Wikipedia style)
                if (isset($replacementsMade[$keyword])) {
                    continue;
                }

                // Word boundary check (case-insensitive, unicode support)
                $pattern = '/\b(' . preg_quote($keyword, '/') . ')\b/iu';
                
                if (preg_match($pattern, $text, $matches)) {
                    $matchedText = $matches[0];

                    $parts = preg_split($pattern, $text, 2);
                    if (count($parts) === 2) {
                        $fragment = $dom->createDocumentFragment();
                        
                        if ($parts[0] !== '') {
                            $fragment->appendChild($dom->createTextNode($parts[0]));
                        }
                        
                        $a = $dom->createElement('a');
                        // Ensure BASE_URL is prepended if $url is relative
                        $href = (strpos($url, 'http') === 0) ? $url : (defined('BASE_URL') ? BASE_URL . $url : $url);
                        $a->setAttribute('href', $href);
                        $a->setAttribute('class', 'wiki-link font-weight-bold text-teal'); 
                        $a->setAttribute('style', 'text-decoration: underline; color: #0CB8C9;');
                        $a->appendChild($dom->createTextNode($matchedText));
                        $fragment->appendChild($a);
                        
                        if ($parts[1] !== '') {
                            $fragment->appendChild($dom->createTextNode($parts[1]));
                        }

                        $node->parentNode->replaceChild($fragment, $node);
                        $replacementsMade[$keyword] = true;
                        
                        // We break here because the current $node has been replaced.
                        // Future replacements on the remaining text of this node won't work in this iteration,
                        // which is an acceptable trade-off (1 keyword linked per text node).
                        break; 
                    }
                }
            }
        }

        // Extract the inner HTML of the <body> wrapper
        $body = $dom->getElementsByTagName('body')->item(0);
        $newHtml = '';
        if ($body) {
            foreach ($body->childNodes as $child) {
                $newHtml .= $dom->saveHTML($child);
            }
        } else {
            $newHtml = $html;
        }

        // Clean up the XML declaration injected by DOMDocument
        $newHtml = str_replace('<?xml encoding="UTF-8">', '', $newHtml);

        return trim($newHtml);
    }
}
