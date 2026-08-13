import requests
from bs4 import BeautifulSoup
# NOTE: pip install google-cloud-language
from google.cloud import language_v1

# Top 0.015% Enterprise SEO: Content Gap Entity Extraction
# Goal: Scrape a competitor's article, extract the "Entities" (Nouns, Concepts) that Google recognizes,
# and compare it to our own database to find Content Gaps.

def extract_entities_from_competitor(url):
    print(f"Scraping Competitor URL: {url}...")
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract main text (e.g., from paragraphs inside article body)
        paragraphs = soup.find_all('p')
        text_content = ' '.join([p.get_text() for p in paragraphs])
        
        print("Sending text to Google Cloud Natural Language API...")
        client = language_v1.LanguageServiceClient()
        
        document = language_v1.Document(
            content=text_content, type_=language_v1.Document.Type.PLAIN_TEXT
        )
        
        # Analyze Entities
        response = client.analyze_entities(document=document)
        
        # Filter for the most salient (important) entities
        top_entities = []
        for entity in response.entities:
            if entity.salience > 0.05: # Only keep highly relevant entities
                top_entities.append({
                    'name': entity.name,
                    'type': language_v1.Entity.Type(entity.type_).name,
                    'salience': round(entity.salience, 4),
                    # Wikipedia link if Google Knowledge Graph recognizes it
                    'wikipedia_url': entity.metadata.get('wikipedia_url', 'N/A') 
                })
                
        print(f"\nTop Entities Found on Competitor Page (Salience > 0.05):")
        for e in top_entities:
            print(f"- {e['name']} ({e['type']}) | Relevance: {e['salience']}")
            
        return top_entities

    except Exception as e:
        print(f"Failed to analyze competitor: {e}")

if __name__ == "__main__":
    # Placeholder for execution
    print("Entity Extractor Initialized.")
    # extract_entities_from_competitor('https://www.competitor-site.com/best-seo-tips')
