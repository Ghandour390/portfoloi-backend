


import NavBar from "../src/compennets/admin/navBar";
import SkillsCompennat, { SkillIcon } from "../src/compennets/visiteur/skillsCompennat";
import TitreDescription from "../src/compennets/visiteur/titreDescription";

export default function skillsPage() {
  return (
    <div className="skillsPage">
      <NavBar />
  <TitreDescription titre="Technical Skills" description="My expertise across different technologies and tools" />
    <SkillsCompennat />
    <SkillsCompennat title="Backend" skills={[
      { name: "Node.js", percent: 90, icon: <SkillIcon skillName="Node.js" percent={90} /> },
      { name: "Express", percent: 85, icon: <SkillIcon skillName="Express" percent={85} /> },
      { name: "MongoDB", percent: 80, icon: <SkillIcon skillName="MongoDB" percent={80} /> },
      { name: "php", percent: 75, icon: <SkillIcon skillName="php" percent={75} /> },
      { name: "MySQL", percent: 70, icon: <SkillIcon skillName="MySQL" percent={70} /> },
      { name: "laravel", percent: 80, icon: <SkillIcon skillName="laravel" percent={65} /> }
       ]} />

    <SkillsCompennat title="outils de développement " skills={[
      { name: "Git", percent: 90, icon: <SkillIcon skillName="Git" percent={90} /> },
      { name: "GitHub", percent: 85, icon: <SkillIcon skillName="GitHub" percent={85} /> },
      { name: "Postman", percent: 80, icon: <SkillIcon skillName="Postman" percent={80} /> },
      { name: "Docker", percent: 75, icon: <SkillIcon skillName="Docker" percent={75} /> },
    ]} />  

    <SkillsCompennat title="Langues" skills={[
      { name: "Arabic", percent: 100, icon: <SkillIcon skillName="Arabic" percent={100} /> },
      { name: "English", percent: 20, icon: <SkillIcon skillName="English" percent={20} /> },
      { name: "French", percent: 50, icon: <SkillIcon skillName="French" percent={50} /> },
    ]} />
    </div>
  );
}