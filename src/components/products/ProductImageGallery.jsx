'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProductImageGallery = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
        <div className="relative h-[500px] w-full">
          <Image 
            src={mainImage} 
            alt={productName} 
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
      
      {/* Thumbnail images */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button 
            key={index}
            className={`relative h-24 overflow-hidden rounded-md ${
              mainImage === image ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image 
              src={image} 
              alt={`${productName} - View ${index + 1}`} 
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery; 