<?php
/* ============================================================
   Stoic Home Care — merchant-feed.php
   Dynamically generates Google Merchant Center XML feed for
   medical equipment rentals (treating them as products).
   ============================================================ */
require_once __DIR__ . '/config/init.php';

$db = getDB();
$equipment = $db->query("SELECT * FROM equipment ORDER BY id DESC")->fetchAll();

header("Content-Type: application/xml; charset=utf-8");
echo '<?xml version="1.0"?>' . "\n";
?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Stoic Home Care Equipment Rentals</title>
    <link>https://stoiccare.in</link>
    <description>Hospital-grade medical equipment available for rent in Delhi NCR.</description>
    <?php foreach ($equipment as $eq): 
      // Parse pricing - Merchant Center requires exact currency format
      $rawPrice = preg_replace('/[^0-9]/', '', $eq['price'] ?? '500') ?: '500';
      $price = $rawPrice . '.00 INR';
    ?>
    <item>
      <g:id>EQ-<?= (int)$eq['id'] ?></g:id>
      <g:title><?= htmlspecialchars($eq['title']) ?> Rental</g:title>
      <g:description><?= htmlspecialchars($eq['description'] ?? 'Rent ' . $eq['title'] . ' for home use.') ?></g:description>
      <g:link>https://stoiccare.in/equipment</g:link>
      <g:image_link><?= $eq['image'] ? EQUIP_UPLOAD_URL . '/' . htmlspecialchars($eq['image']) : CLIENT_IMAGES . '/equip.avif' ?></g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price><?= $price ?></g:price>
      <g:brand>Stoic Home Care</g:brand>
      <g:google_product_category>Health &amp; Beauty &gt; Health Care &gt; Medical Equipment</g:google_product_category>
    </item>
    <?php endforeach; ?>
  </channel>
</rss>
