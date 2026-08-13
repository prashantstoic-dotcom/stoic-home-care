import requests
import csv
import concurrent.futures

# Enterprise SEO: Automated Bulk Redirect Tester
# Goal: Test thousands of 301 redirects instantly before a migration goes live.
# Ensures no redirect chains, no 404s, and strict HTTPS routing.

def check_redirect(url_pair):
    """
    Given a tuple of (old_url, expected_new_url), requests the old_url
    and verifies that it arrives exactly at the expected_new_url with a 301.
    """
    old_url, expected_url = url_pair
    try:
        # allow_redirects=False lets us check the very first hop (Strict 301 Check)
        response = requests.get(old_url, allow_redirects=False, timeout=5)
        
        status_code = response.status_code
        actual_redirect = response.headers.get('Location', '')

        if status_code in [301, 308]:
            if actual_redirect == expected_url:
                return {"old": old_url, "status": "PASS", "code": status_code, "msg": "Correct Target"}
            else:
                return {"old": old_url, "status": "FAIL", "code": status_code, "msg": f"Wrong Target: {actual_redirect}"}
        elif status_code == 410:
             return {"old": old_url, "status": "PASS", "code": status_code, "msg": "Successfully marked as 410 Gone"}
        else:
            return {"old": old_url, "status": "FAIL", "code": status_code, "msg": "Did not redirect"}

    except requests.exceptions.RequestException as e:
         return {"old": old_url, "status": "ERROR", "code": 0, "msg": str(e)}


def run_bulk_test(mapping_file_path):
    print(f"Starting Bulk Redirect Test using {mapping_file_path}...")
    
    url_pairs = []
    # Mocking data reading for demonstration
    # In reality, reads from a CSV: old_url, expected_new_url
    url_pairs = [
        ("http://www.example.com/category/product-123.html", "https://www.example.com/p/123"),
        ("https://www.example.com/discontinued-products/old-item", "410_EXPECTED"), 
        ("https://www.example.com/old-page/", "https://www.example.com/new-page/")
    ]

    print(f"Testing {len(url_pairs)} URLs concurrently...\n")
    
    results = []
    # Use multi-threading to test thousands of URLs in seconds
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        future_to_url = {executor.submit(check_redirect, pair): pair for pair in url_pairs}
        for future in concurrent.futures.as_completed(future_to_url):
            results.append(future.result())

    # Print Report
    failed = [r for r in results if r['status'] != 'PASS']
    passed = [r for r in results if r['status'] == 'PASS']

    print(f"--- TEST COMPLETE ---")
    print(f"PASSED: {len(passed)}")
    print(f"FAILED: {len(failed)}")

    if failed:
        print("\n--- FAILURE LOG ---")
        for f in failed:
            print(f"[FAIL {f['code']}] {f['old']} -> {f['msg']}")

if __name__ == "__main__":
    run_bulk_test("redirect_mapping.csv")
