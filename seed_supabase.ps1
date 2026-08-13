$SupabaseUrl = "https://idlmeduwekczlizgpvcx.supabase.co/rest/v1/stoic_home_care"
$ApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbG1lZHV3ZWtjemxpemdwdmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTUxODQsImV4cCI6MjEwMjEzMTE4NH0.oEULTKL9tE94c6vNp8vZtHGzQG0CFZG9nrHDuER9jvo"

$Headers = @{
    "apikey" = $ApiKey
    "Authorization" = "Bearer $ApiKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

$Locations = @("Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad")

$Services = @(
    @{
        Id = "icu-nursing"
        Category = "Nursing"
        Title = "ICU Nursing"
        MetaDesc = "Get professional ICU-trained nursing staff at home in {LOCATION}. 24/7 critical care, post-surgery recovery, and medical support by Stoic Home Care."
        HeroSub = "Professional critical care delivered right to your home in {LOCATION} by highly trained and certified ICU nurses."
        Html = "<p>When your loved one needs critical care in <strong>{LOCATION}</strong>, hospital stays can be stressful and expensive. Stoic Home Care brings the entire ICU experience to your home. Our nurses are fully trained in handling ventilators, BiPAP, tracheostomy care, and constant vital monitoring.</p><p>We provide 24/7 support across all sectors of {LOCATION}, ensuring peace of mind and the highest standard of medical care.</p>"
    },
    @{
        Id = "physiotherapy"
        Category = "Physiotherapy"
        Title = "Physiotherapy"
        MetaDesc = "Expert physiotherapy services at home in {LOCATION}. Get relief from back pain, joint issues, and post-surgery rehab with Stoic Home Care's certified physios."
        HeroSub = "Recover faster with personalized, professional physiotherapy sessions in the comfort of your home in {LOCATION}."
        Html = "<p>Recovering from an injury or surgery? Dealing with chronic back or joint pain? Our certified physiotherapists in <strong>{LOCATION}</strong> provide personalized rehabilitation plans directly at your home.</p><p>Skip the hassle of traveling to a clinic. From post-operative care to stroke rehabilitation, we bring advanced physiotherapy techniques to your doorstep in {LOCATION}.</p>"
    },
    @{
        Id = "elder-care"
        Category = "Elder Care"
        Title = "Elder Care & Attendants"
        MetaDesc = "Trust Stoic Home Care for reliable and compassionate old age care in {LOCATION}. Daily living assistance, medication management, and emotional support for seniors."
        HeroSub = "Dignified, round-the-clock elder care services in {LOCATION}. Because your parents deserve the absolute best."
        Html = "<p>Caring for aging parents requires time, patience, and professional expertise. At Stoic Home Care, we offer dedicated elder care services across <strong>{LOCATION}</strong>. Our trained attendants help with mobility, personal hygiene, timely medication, and most importantly, companionship.</p><p>Give your loved ones the comfort of aging gracefully in their own home, surrounded by familiar faces and memories in {LOCATION}.</p>"
    },
    @{
        Id = "medical-equipment"
        Category = "Equipment"
        Title = "Medical Equipment on Rent"
        MetaDesc = "Rent high-quality medical equipment in {LOCATION}. Oxygen concentrators, hospital beds, BiPAP/CPAP machines delivered to your home by Stoic Home Care."
        HeroSub = "Fast and reliable delivery of essential medical equipment to your home in {LOCATION}."
        Html = "<p>Setting up home care requires the right medical infrastructure. Stoic Home Care provides top-tier medical equipment on rent or purchase in <strong>{LOCATION}</strong>. Whether you need an oxygen concentrator, a motorized hospital bed, a wheelchair, or a BiPAP machine, we have you covered.</p><p>All our equipment is sanitized, well-maintained, and delivered swiftly across {LOCATION} to ensure your loved one's treatment is never interrupted.</p>"
    }
)

$Payload = @()

foreach ($Loc in $Locations) {
    foreach ($Srv in $Services) {
        $Slug = ($Srv.Id + "-" + $Loc).ToLower().Replace(" ", "-")
        
        $Item = @{
            slug = $Slug
            category = $Srv.Category
            location = $Loc
            page_title = "Best " + $Srv.Title + " in " + $Loc + " | Stoic Home Care"
            meta_desc = $Srv.MetaDesc.Replace("{LOCATION}", $Loc)
            h1_title = "Expert " + $Srv.Title + " at Home in " + $Loc
            hero_subtitle = $Srv.HeroSub.Replace("{LOCATION}", $Loc)
            content_html = $Srv.Html.Replace("{LOCATION}", $Loc)
        }
        
        $Payload += $Item
    }
}

$JsonPayload = $Payload | ConvertTo-Json -Depth 10

try {
    $Response = Invoke-RestMethod -Uri $SupabaseUrl -Method Post -Headers $Headers -Body $JsonPayload
    Write-Output "✅ Successfully inserted $($Payload.Count) SEO pages into Supabase!"
} catch {
    Write-Error "❌ Failed to insert data: $_"
}
