export default function DeferredStyles() {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" media="print" onLoad={(e) => { (e.target as HTMLLinkElement).media = 'all'; }} />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" media="print" onLoad={(e) => { (e.target as HTMLLinkElement).media = 'all'; }} />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" onLoad={(e) => { (e.target as HTMLLinkElement).media = 'all'; }} />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" media="print" onLoad={(e) => { (e.target as HTMLLinkElement).media = 'all'; }} />
    </>
  );
}
