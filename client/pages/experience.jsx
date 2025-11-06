import React from "react";
import NavBar from "../src/compennets/admin/navBar";
import TitreDescription from "../src/compennets/visiteur/titreDescription";
import ExperienceCard from "../src/compennets/visiteur/experenceCart";



export default function ExperiencePage() {
  return (
    <div className="experiencePage">
      <NavBar />
  <TitreDescription titre="Professional Experience" description="A summary of my work history and key roles I've undertaken" />
  <div className="experienceCards max-w-7xl mx-auto px-4 py-8 space-y-6 sm:px-6 lg:max-w-2xl lg:py-12 lg:space-y-14">
    <ExperienceCard
      title="Frontend Developer at Web Creatives"
      description="Implemented responsive web designs and enhanced user experience using React.js."
      dateDebut="Jun 2021"
      dateFin="Dec 2021"
    />

    <ExperienceCard 
      title="Software Engineer at Tech Solutions"
      description="Developed innovative solutions for clients using modern web technologies."
      dateDebut="Jan 2022"
      dateFin="Present"
    />
  </div>
  </div>
  );
}