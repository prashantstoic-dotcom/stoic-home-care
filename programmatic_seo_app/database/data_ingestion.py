import os
from dotenv import load_dotenv
import time
from supabase import create_client, Client
import json
import sys

# Fix for Windows console emoji printing
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# ==============================================================================
# PROGRAMMATIC SEO: Data Ingestion Pipeline
# Goal: Push thousands of rows (Cities, Categories) into Supabase instantly.
# ==============================================================================

load_dotenv(dotenv_path='../../.env')

# Initialize Supabase
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY") # We use the Service Role Key / Secret Key for insertions

if not url or not key:
    print("❌ Error: Supabase credentials missing. Check .env file.")
    exit(1)

supabase: Client = create_client(url, key)

def chunk_list(lst, chunk_size):
    """Yield successive chunks from list."""
    for i in range(0, len(lst), chunk_size):
        yield lst[i:i + chunk_size]

def ingest_programmatic_data():
    print("🚀 Starting Programmatic Data Ingestion...")
    
    # Example Dataset: Quick test for final audit
    cities = ["Mumbai", "Delhi"]
    category = "plumbers"
    
    records_to_insert = []
    
    for city in cities:
        # Dynamic Templating for SEO
        seo_title = f"Top 10 Best {category.capitalize()} in {city} (2026 Updated)"
        meta_description = f"Looking for the best {category} in {city}? Compare reviews, prices, and contact details of top-rated professionals near you."
        h1_tag = f"Expert {category.capitalize()} in {city}"
        
        # We can add dynamic variables inside the HTML content
        html_content = f"""
        <p>Finding reliable <strong>{category} in {city}</strong> can be a challenge. We have analyzed local data to bring you the best options.</p>
        <h2>Why Hire Local Professionals in {city}?</h2>
        <ul>
            <li>Quick response time within 2 hours.</li>
            <li>Verified licenses and background checks.</li>
        </ul>
        """
        
        records_to_insert.append({
            "category": category,
            "slug": f"{city.lower().replace(' ', '-')}-{len(records_to_insert)}", # Unique slug for test bulk
            "seo_title": seo_title,
            "meta_description": meta_description,
            "h1_tag": h1_tag,
            "html_content": html_content
        })

    print(f"📦 Prepared {len(records_to_insert)} pages. Pushing to Supabase in batches...")
    
    # BATCH INSERTION (Prevents Rate Limiting and Payload Size Errors)
    batch_size = 100
    total_inserted = 0
    
    for i, batch in enumerate(chunk_list(records_to_insert, batch_size)):
        try:
            data, count = supabase.table('programmatic_pages').insert(batch).execute()
            total_inserted += len(batch)
            print(f"✅ Batch {i+1} inserted successfully. (Total: {total_inserted})")
            time.sleep(0.5) # Gentle rate limiting
        except Exception as e:
            print(f"❌ ERROR in batch {i+1}: {e}")

    print("🎉 Ingestion complete!")
    print("🌐 Vercel will now automatically serve these pages at /plumbers/[city]")

if __name__ == "__main__":
    ingest_programmatic_data()
