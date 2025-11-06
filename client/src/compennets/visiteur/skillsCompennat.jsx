import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function SkillIcon({ skillName, percent }) {
	return (
		<div className="flex flex-col items-center relative w-20 h-20">
			<CircularProgressbar
				value={percent}
				text={`${percent}%`}
				strokeWidth={8}
				styles={buildStyles({
					pathColor: '#ffc72c',
					textColor: '#ffc72c',
					trailColor: '#23232b',
					textSize: '1.2rem',
					backgroundColor: 'transparent',
				})}
			/>
			<span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 text-base font-bold text-[#191a1d] bg-[#ffc72c] px-2 py-0.5 rounded shadow">
				{skillName}
			</span>
		</div>
	);
}

const defaultSkills = [
	{ name: "React", percent: 95, icon: <SkillIcon skillName="React" percent={95} /> },
	{ name: "TypeScript", percent: 90, icon: <SkillIcon skillName="TS" percent={90} /> },
	{ name: "JavaScript", percent: 95, icon: <SkillIcon skillName="JS" percent={95} /> },
	{ name: "Tailwind CSS", percent: 88, icon: <SkillIcon skillName="Tailwind" percent={88} /> },
];

const SkillsCompennat = ({ title = "Frontend", skills = defaultSkills }) => {
	return (
		<div className="bg-[#23262b] rounded-xl p-6 md:p-8 w-full max-w-6xl mx-auto mt-6 border border-[#23232b]">
			<h2 className="text-3xl font-bold text-[#f6f3d7] mb-8">{title}</h2>
			<div className="flex flex-wrap justify-center gap-8">
		{skills.map((skill, idx) => (
		  <div key={idx} className="flex flex-col items-center w-40">
		    <div className="mb-2">{skill.icon}</div>
		    <span className="mt-2 text-lg font-semibold text-[#f6f3d7]">{skill.name}</span>
		  </div>
		))}
			</div>
		</div>
	);
};

export default SkillsCompennat;
