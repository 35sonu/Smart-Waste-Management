import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
}

export default function SmartImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  fallback = '/images/placeholder.svg' 
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Validate alt text
  if (!alt || alt.trim() === '') {
    console.warn('SmartImage: Missing or empty alt text for image:', src);
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          aria-label="Loading image..."
          role="img"
        >
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      
      <img
        src={hasError ? fallback : src}
        alt={hasError ? `${alt} (failed to load, showing placeholder)` : alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-auto transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        role="img"
        {...(hasError && { 'data-fallback': 'true' })}
      />
    </div>
  );
}
