import Image from 'next/image';

export default function CategoryCard({ category }) {
  return (
    <div className="relative aspect-square w-full">
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover rounded-lg"
      />
    </div>
  );
} 