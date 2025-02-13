import React from 'react';

const AspectRatioImage = ({ src, alt }) => {
  return (
    <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default AspectRatioImage;