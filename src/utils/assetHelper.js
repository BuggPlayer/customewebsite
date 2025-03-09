/**
 * Helper function to get asset paths from the frontend_assets directory
 * @param {string} path - The path relative to frontend_assets
 * @returns {string} The complete path to the asset
 */
export const getAssetPath = (path) => {
  return `/assets/frontend_assets/${path}`;
};

// Predefine commonly used assets for easy access
export const assets = {
  // Product images - update these with your actual file names
  products: {
    perfume1: {
      main: getAssetPath('products/perfume1-main.jpg'),
      image2: getAssetPath('products/perfume1-2.jpg'),
      image3: getAssetPath('products/perfume1-3.jpg'),
      image4: getAssetPath('products/perfume1-4.jpg'),
    },
    perfume2: {
      main: getAssetPath('products/perfume2.jpg'),
      image2: getAssetPath('products/perfume2-2.jpg'),
      image3: getAssetPath('products/perfume2-3.jpg'),
    },
    perfume3: {
      main: getAssetPath('products/perfume3.jpg'),
    },
    perfume4: {
      main: getAssetPath('products/perfume4.jpg'),
    },
  },
  
  // Collections
  collections: {
    women: getAssetPath('collections/hero2.jpg'),
    men: getAssetPath('collections/men.jpg'),
    unisex: getAssetPath('collections/unisex.jpg'),
  },
  
  // Backgrounds
  backgrounds: {
    hero: getAssetPath('backgrounds/hero1.jpg'),
    gold: getAssetPath('backgrounds/hero2.jpg'),
    about: getAssetPath('backgrounds/about-background.jpg'),
  },
  
  // Testimonials
  testimonials: {
    person1: getAssetPath('testimonials/person1.jpg'),
    person2: getAssetPath('testimonials/person2.jpg'),
    person3: getAssetPath('testimonials/person3.jpg'),
  },
  
  // Logo
  logo: getAssetPath('logo/logo.png'),
}; 