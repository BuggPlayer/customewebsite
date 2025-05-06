/**
 * Functions to fetch and process product data
 */

// Helper to calculate discounted price
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  return price - (price * (discount / 100));
};

// Fetch all products from data.json
export const fetchProducts = async () => {
  try {
    const response = await fetch('/assets/data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();

    // Process product data to format we need
    return products.map(product => ({
      id: product._id.$oid,
      name: product.name,
      slug: product.slug,
      category: product.category,
      brand: product.brand,
      price: product.price,
      sellerId: product.
      sellerId.$oid
      ,
      discountPrice: calculateDiscountedPrice(product.price, product.discount),
      discount: product.discount,
      description: product.description,
      stock: product.stock,
      images: product.images?.map(img => ensureValidImageUrl(img)) || ['/assets/frontend_assets/products/placeholder.jpg'],
      rating: product.rating || 0,
      scent: extractScentFromDescription(product.description)
    }));
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Extract a product by ID
export const getProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(product => product.id === id);
};

// Extract a product by slug
export const getProductBySlug = async (slug) => {
  const products = await fetchProducts();
  return products.find(product => product.slug === slug);
};

// Extract scent tags from description
const extractScentFromDescription = (description) => {
  if (!description) return [];
  
  // These are common descriptive terms from the product data
  const scentTerms = [
    'Vanilla', 'Woody', 'Warm', 'Spicy', 'Fresh', 'Citrus', 'Amber', 
    'Floral', 'Fruity', 'Aromatic', 'Sweet', 'Leather', 'Marine', 
    'Aquatic', 'Nutty', 'Chocolate'
  ];
  
  // Find all scent terms that appear in the description
  return scentTerms.filter(term => 
    description.toLowerCase().includes(term.toLowerCase())
  );
};

// Get featured products (first 4 products with images)
export const getFeaturedProducts = async () => {
  const products = await fetchProducts();
  return products
    .filter(product => product.images && product.images.length > 0)
    .slice(0, 4);
};

// Get related products based on scent profile similarity
export const getRelatedProducts = async (currentProductId, limit = 3) => {
  const products = await fetchProducts();
  const currentProduct = products.find(p => p.id === currentProductId);
  
  if (!currentProduct) return [];
  
  // Sort products by similarity to current product's scent
  const relatedProducts = products
    .filter(p => p.id !== currentProductId) // Exclude current product
    .sort((a, b) => {
      // Count matching scent notes
      const aMatches = currentProduct.scent.filter(s => a.scent.includes(s)).length;
      const bMatches = currentProduct.scent.filter(s => b.scent.includes(s)).length;
      return bMatches - aMatches; // Higher matches first
    })
    .slice(0, limit);
  
  return relatedProducts;
};

// Add this function to validate image URLs
const ensureValidImageUrl = (url) => {
  if (!url) return '/assets/frontend_assets/products/placeholder.jpg';
  return url;
}; 