interface FeaturedProductsProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    discountPrice?: number;
    discount?: number;
  }>;
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Your existing component code
} 