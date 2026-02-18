
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  schema?: object; // JSON-LD Structured Data
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://panterasbsb.com/og-default.jpg', // Placeholder for default social image
  url = window.location.href,
  noIndex = false,
  schema
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOg = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Description
    if (description) {
      setMeta('description', description);
      setOg('og:description', description);
    }

    // 4. Update Open Graph
    setOg('og:title', title);
    setOg('og:type', 'website');
    setOg('og:url', url);
    setOg('og:image', image);
    setOg('og:site_name', 'Panteras BSB');
    setOg('og:locale', 'pt_BR');

    // 5. Handle Robots (noindex)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    if (noIndex) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      metaRobots.setAttribute('content', 'index, follow');
    }

    // 6. JSON-LD Schema Injection
    if (schema) {
      let scriptSchema = document.querySelector('script[data-type="seo-schema"]');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('type', 'application/ld+json');
        scriptSchema.setAttribute('data-type', 'seo-schema');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    }

  }, [title, description, image, url, noIndex, schema]);

  return null;
};

export default SEO;
