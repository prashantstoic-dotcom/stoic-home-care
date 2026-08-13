import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json

# Top 0.015% Enterprise SEO: Semantic Internal Linking via NLP
# Goal: Don't link based on "Exact Match Keyword". Link based on mathematical Context (Vectors).
# This prevents spammy internal links and creates true semantic clusters for Googlebot.

print("Loading NLP Model (all-MiniLM-L6-v2)...")
# We use a lightweight transformer model to convert text to 384-dimensional vectors.
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_semantic_links(articles_db_path, similarity_threshold=0.82):
    """
    Reads a database of articles, converts their text to vector embeddings, 
    and finds pairs that are conceptually identical.
    """
    print(f"Loading articles from {articles_db_path}...")
    # Assume CSV has columns: 'url', 'title', 'main_content'
    # df = pd.read_csv(articles_db_path)
    
    # Mock Data for demonstration
    df = pd.DataFrame([
        {'url': '/seo-guide', 'main_content': 'Search engine optimization involves optimizing your website to rank higher.'},
        {'url': '/technical-seo', 'main_content': 'Improving site speed and crawlability to help search engines parse your site.'},
        {'url': '/best-laptops', 'main_content': 'The top 10 gaming laptops to buy in 2026 with RTX graphics.'}
    ])

    print("Generating Vector Embeddings for all articles. This requires heavy compute...")
    # Convert article text to numbers (Vectors)
    embeddings = model.encode(df['main_content'].tolist())

    print("Calculating Cosine Similarity Matrix...")
    # Measure the angle between vectors. 1.0 means exact match, 0.0 means totally unrelated.
    similarity_matrix = cosine_similarity(embeddings)

    internal_link_map = []

    for i in range(len(df)):
        for j in range(len(df)):
            if i != j:
                score = similarity_matrix[i][j]
                if score >= similarity_threshold:
                    internal_link_map.append({
                        'source_url': df.iloc[i]['url'],
                        'target_url': df.iloc[j]['url'],
                        'similarity_score': round(float(score), 4)
                    })

    print(f"\nFound {len(internal_link_map)} Highly Semantic Link Opportunities.")
    
    # In a real enterprise setup, this JSON would be pushed to an API (like WordPress REST API or Contentful)
    # to automatically inject the internal link in the "Related Articles" section.
    print(json.dumps(internal_link_map, indent=2))

if __name__ == "__main__":
    generate_semantic_links('mock_db.csv')
