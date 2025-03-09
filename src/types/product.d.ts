interface ProductImage {
  url: string;
}

interface Product {
  _id: {
    $oid: string;
  };
  sellerId: {
    $oid: string;
  };
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  discount: number;
  description: string;
  shopName: string;
  images: string[];
  rating: number;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
} 