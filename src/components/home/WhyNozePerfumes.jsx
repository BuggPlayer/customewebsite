// components/WhyNozePerfumes.tsx

import { GiRabbit, GiPerfumeBottle } from 'react-icons/gi';
import { FaWallet, FaTransgenderAlt } from 'react-icons/fa';

const features = [
  {
    icon: <GiRabbit size={40} className="text-primary" />,
    title: 'Cruelty Free',
    description: 'Kindness in every bottle: Our commitment to cruelty-free products.',
  },
  {
    icon: <GiPerfumeBottle size={40} className="text-primary" />,
    title: 'Fragrance Forward',
    description: 'Kindness in every bottle: Our commitment to cruelty-free products.',
  },
  {
    icon: <FaWallet size={40} className="text-primary" />,
    title: 'Affordable Luxury',
    description: 'Offering premium quality and elegance at a reasonable price.',
  },
  {
    icon: <FaTransgenderAlt size={40} className="text-primary" />,
    title: 'Gender Neutral',
    description: 'Elevate your self-care routine with bath, body and personal care for all.',
  },
];

export default function WhyNozePerfumes() {
  return (
    <section className="py-16 bg-bg-color text-textColor-secondary">
      <div className="container text-center">
        <h2 className="section-title">
          Why NOZE Perfumes
          <span className="section-title-bar" />
        </h2>
        <p className="section-description">
          Experience elegance, ethics, and accessibility in every bottle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center px-4">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-light tracking-wide text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-textColor-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>


      
    </section>
  );
}
