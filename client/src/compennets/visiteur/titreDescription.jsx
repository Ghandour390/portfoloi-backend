
import React from "react";


const titreDescription = ( {titre , description}) => {
  return (
    <div className="bg-transparent flex flex-col items-center py-2 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-[#f6f3d7] mb-2" style={{ fontFamily: 'Montserrat, serif' }}>
        {titre}
      </h1>
      <p className="text-lg md:text-xl text-[#bfc3c9] max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {description}
      </p>
    </div>
  );
};

export default titreDescription;
