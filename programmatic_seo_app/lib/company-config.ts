export const companyConfig = {
  name: "Prashant Stoic Home Care",
  tagline: "Compassionate care, right at your doorstep.",
  contact: {
    phone: "1-800-STOIC-CARE",
    email: "hello@prashantstoic.com",
    address: "123 Care Avenue, Texas, USA"
  },
  services: [
    "24/7 In-Home Senior Care",
    "Post-Surgery Recovery Assistance",
    "Dementia & Alzheimer's Specialized Care",
    "Companionship & Daily Living Help"
  ],
  pricing_policy: "We offer customized care plans starting at $25/hour. We accept most major insurances.",
  mission: "To provide dignified, professional, and empathetic care to seniors and individuals in need."
};

export function getCompanyFallbackContext(): string {
  return `
    Company Info Fallback (Core Profile):
    - Company Name: ${companyConfig.name}
    - Mission: ${companyConfig.mission}
    - Services Offered: ${companyConfig.services.join(", ")}
    - Pricing: ${companyConfig.pricing_policy}
    - Contact Email: ${companyConfig.contact.email}
    - Contact Phone: ${companyConfig.contact.phone}
  `;
}
