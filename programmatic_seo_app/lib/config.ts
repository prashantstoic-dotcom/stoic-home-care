// Equivalent to config/config.php
export const CONFIG = {
  // Use Next.js env variables for BASE_URL if needed, otherwise relative paths are fine
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://stoiccare.in',
  
  // Asset Paths (Relative to public directory in Next.js)
  CLIENT_ASSETS: '/client/view_assets',
  CLIENT_IMAGES: '/images',
  CLIENT_CSS: '/css',
  
  // Upload paths
  UPLOAD_URL: '/uploads',
  SERVICE_UPLOAD_URL: '/uploads/services',
  EQUIP_UPLOAD_URL: '/uploads/equipment',
  
  // Admin
  ADMIN_ASSETS: '/admin/assets',

  // Company Metadata for Schema & UI
  COMPANY: {
    name: "Stoic Home Care",
    url: "https://stoiccare.in",
    email: "stoichomecareservices@gmail.com",
    linkedinUrl: "https://linkedin.com/company/stoichomecare",
    twitterUrl: "https://twitter.com/stoichomecare"
  }
};
