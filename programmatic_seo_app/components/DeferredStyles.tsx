export default function DeferredStyles() {
  return (
    <>
      <link rel="stylesheet" id="css-swiper" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" media="print" />
      <link rel="stylesheet" id="css-aos" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" media="print" />
      <link rel="stylesheet" id="css-fa" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" />
      <link rel="stylesheet" id="css-mi" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" media="print" />
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('css-swiper').media = 'all';
          document.getElementById('css-aos').media = 'all';
          document.getElementById('css-fa').media = 'all';
          document.getElementById('css-mi').media = 'all';
        `
      }} />
    </>
  );
}
