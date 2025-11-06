import NavBar from "../src/compennets/admin/navBar";
import CartProject from "../src/compennets/visiteur/cartProject";
import MyProjectDescription from "../src/compennets/visiteur/titreDescription";

export default function ProjectPage() {
  return (
    <>
    <div className="projectPage bg-transparent min-h-screen">
      <NavBar />
     <MyProjectDescription titre="My Projects" description="A collection of my work showcasing various technologies and solutions" />
    <div className="projectPageContent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-12 bg-transparent ">
        <CartProject />
        <CartProject />
        <CartProject />
        </div>
    </div>
   
    </>
  );
}