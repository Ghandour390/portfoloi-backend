
import NavBar from "../src/compennets/admin/navBar";
import TitreDescription from "../src/compennets/visiteur/titreDescription";
import ContactInfo from "../src/compennets/visiteur/contactInfo"; 
import CartMessage from "../src/compennets/visiteur/cartMessage";
import SocialMedia from "../src/compennets/visiteur/socialMedia";




export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <NavBar />
      <div className="flex flex-col items-center py-12">
        <TitreDescription
          titre="Get In Touch"
          description="Have a project in mind or just want to chat? I'd love to hear from you."
        />
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mt-10">
          <div className="flex-1">
            <CartMessage />
          </div>
          <div className="flex flex-col gap-6 flex-1 min-w-[320px] max-w-sm">
            <ContactInfo />
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
}