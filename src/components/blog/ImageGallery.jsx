import React, { useState } from 'react';
import { IoMdArrowBack, IoMdArrowForward, IoMdClose } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // If no images, don't render
  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, render it without controls
  if (images.length === 1) {
    return (
      <div className="rounded-xl overflow-hidden mb-6">
        <figure className="relative">
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="w-full h-auto object-cover rounded-xl"
          />
          {images[0].caption && (
            <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
              {images[0].caption}
            </figcaption>
          )}
        </figure>
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (imageIndex) => {
    setCurrentIndex(imageIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Escape') {
      setIsFullScreen(false);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Fullscreen modal gallery
  if (isFullScreen) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <button 
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          onClick={toggleFullScreen}
        >
          <IoMdClose size={30} />
        </button>
        
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
          onClick={goToPrevious}
        >
          <IoMdArrowBack size={24} />
        </button>
        
        <div className="relative max-w-4xl max-h-screen p-4">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-[80vh] object-contain"
          />
          
          {images[currentIndex].caption && (
            <figcaption className="text-white text-center mt-4">
              {images[currentIndex].caption}
            </figcaption>
          )}
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className="focus:outline-none"
              >
                <FaCircle 
                  size={index === currentIndex ? 10 : 8} 
                  className={index === currentIndex ? "text-white" : "text-gray-500"}
                />
              </button>
            ))}
          </div>
        </div>
        
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
          onClick={goToNext}
        >
          <IoMdArrowForward size={24} />
        </button>
      </div>
    );
  }

  // Regular gallery
  return (
    <div className="mb-8">
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 mb-3 cursor-pointer" onClick={toggleFullScreen}>
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-all duration-500"
        />
        
        {/* Navigation arrows */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 rounded-full p-1 hover:bg-opacity-90 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          aria-label="Previous image"
        >
          <IoMdArrowBack size={20} />
        </button>
        
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 rounded-full p-1 hover:bg-opacity-90 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          aria-label="Next image"
        >
          <IoMdArrowForward size={20} />
        </button>
        
        {/* Fullscreen hint */}
        <div className="absolute top-2 right-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Click for fullscreen
        </div>
      </div>
      
      {/* Image caption */}
      {images[currentIndex].caption && (
        <figcaption className="text-sm text-gray-600 italic text-center mb-3">
          {images[currentIndex].caption}
        </figcaption>
      )}
      
      {/* Thumbnail navigation */}
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`h-16 w-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${
              index === currentIndex 
                ? 'ring-2 ring-primary transform scale-105' 
                : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img 
              src={image.url} 
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;