'use client';
import { useEffect, useState } from 'react';

export default function DeferredStyles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" media="print" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" media="print" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" media="print" />
      </>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" media="all" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" media="all" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="all" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" media="all" />
    </>
  );
}
