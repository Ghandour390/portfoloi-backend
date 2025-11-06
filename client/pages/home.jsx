import React from "react";
import CartProject from "../src/compennets/visiteur/cartProject";
import TagMain from "../src/compennets/visiteur/tagMain";
import ViewAllProjectsButton from "../src/compennets/visiteur/ViewAllProjectsButton";


function homePage() {
  return (
    <div className="homePage bg-transparent min-h-screen">
      {/* <NavBar /> */}
      <TagMain />
  <h1 className="mt-16 text-4xl md:text-5xl font-bold text-[#f5eec5] text-center mb-2">Featured Projects</h1>
  <h3 className="text-lg md:text-xl text-gray-400 text-center mb-8 font-normal">Showcasing my recent work</h3>
      <div className="projectsSection max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <CartProject />
        <CartProject />
        <CartProject />
      </div>
      <ViewAllProjectsButton name="View All Projects"  />
    </div>
  );
}

export default homePage;