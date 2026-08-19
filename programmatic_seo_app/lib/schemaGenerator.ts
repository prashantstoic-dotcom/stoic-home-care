/**
 * Generates JSON-LD Medical Web Page Schema to establish E-E-A-T and Knowledge Graph connections
 */
export function generateMedicalSchema(
  serviceName: string,
  url: string,
  description: string
) {
  const knowledgeGraphMap: Record<string, string> = {
    'physiotherapy': 'https://en.wikipedia.org/wiki/Physical_therapy',
    'nursing': 'https://en.wikipedia.org/wiki/Nursing',
    'elder-care': 'https://en.wikipedia.org/wiki/Elderly_care',
    'dementia-care': 'https://en.wikipedia.org/wiki/Dementia',
    'post-surgery': 'https://en.wikipedia.org/wiki/Postoperative_care',
    'palliative': 'https://en.wikipedia.org/wiki/Palliative_care',
    'default': 'https://en.wikipedia.org/wiki/Home_care'
  };

  const lowerName = serviceName.toLowerCase();
  let sameAsUrl = knowledgeGraphMap['default'];
  
  for (const [key, val] of Object.entries(knowledgeGraphMap)) {
    if (lowerName.includes(key.replace('-', ' '))) {
      sameAsUrl = val;
      break;
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: serviceName,
    url: url,
    description: description,
    about: {
      '@type': 'MedicalSpecialty',
      name: serviceName,
      sameAs: sameAsUrl
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Stoic Home Care',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stoiccare.in/logo.png'
      }
    }
  };
}
