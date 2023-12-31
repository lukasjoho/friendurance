'use client';
import { getCloudinaryImage } from '@/lib/clients/cloudinary';
import { AdvancedImage, responsive } from '@cloudinary/react';
import { FC } from 'react';

interface OptimizedImageProps {
  src: string;
  steps?: number[];
}

const OptimizedImage: FC<OptimizedImageProps> = ({ src, steps }) => {
  return (
    <AdvancedImage
      width="100%"
      height="100%"
      objectFit="cover"
      cldImg={getCloudinaryImage(src)}
      plugins={[responsive({ steps })]}
    />
  );
};

export default OptimizedImage;
