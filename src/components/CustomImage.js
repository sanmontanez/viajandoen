import React from 'react';
import Image from 'next/image';

const CustomImage = ({ src, alt, width = 40, height = 40, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default CustomImage;
