import React from 'react';

const HeroSection = ({ name, picture }) => {
  const galleryImages = [
    '/Room1.jpg',
    '/Room2.jpg',
    '/Pic2.jpg',
    '/Pic3.jpg',
  ];

  return (
    <section className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden group shadow-2xl rounded-b-3xl">
      <img
        src={picture} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ease-in-out transform-gpu"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
      <div className="absolute inset-0 flex items-end justify-start p-8 md:p-20">
        <div className="text-white max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 leading-tight drop-shadow-2xl animate-fade-in-up">
            {name}
          </h1>
          <p className="text-xl md:text-3xl font-light mb-8 drop-shadow-xl animate-fade-in-up-delay">
            Experience unparalleled luxury and comfort in a breathtaking setting.
          </p>
        </div>
      </div>
      
      {/* Image Gallery Grid - visible on larger screens */}
      <div className="absolute bottom-0 right-0 p-8 hidden md:grid grid-cols-2 gap-4 w-1/3 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
        {galleryImages.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Gallery image ${index + 1}`} 
            className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white/30 transform hover:scale-105 transition-transform duration-300 transform-gpu"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
