
import React from "react";

const defaultData = {
	company: "Tech Innovations Inc.",
	role: "Senior Full-Stack Developer",
	dateDebut: "Jan 2022",
	dateFin: "Present",
	description:
		"Leading development of enterprise web applications using MERN stack. Mentoring junior developers and implementing best practices for scalable architecture.",
};

const ExperienceCard = ({
	company = defaultData.company,
	role = defaultData.role,
	dateDebut = defaultData.dateDebut,
	dateFin = defaultData.dateFin,
	description = defaultData.description,
}) => (
	<div className="bg-[#23262b] rounded-xl p-6 w-full max-w-3xl mx-auto mt-6 border border-[#23232b] text-left shadow flex flex-col gap-2 relative">
		<div className="flex justify-between items-start">
			<div>
				<span className="inline-flex items-center text-2xl font-bold text-[#f6f3d7] mb-1">
					<span className="mr-2">
						<svg width="22" height="22" fill="#ffc72c" viewBox="0 0 24 24"><path d="M12 2C7.031 2 3 6.031 3 11c0 4.969 4.031 9 9 9s9-4.031 9-9c0-4.969-4.031-9-9-9zm0 16c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-13c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6s6-2.691 6-6c0-3.309-2.691-6-6-6zm0 10c-2.211 0-4-1.789-4-4s1.789-4 4-4 4 1.789 4 4-1.789 4-4 4z"/></svg>
					</span>
					{company}
				</span>
				<div className="text-lg font-semibold text-[#ffc72c] mb-1">{role}</div>
			</div>
			<div className="text-sm font-semibold text-[#bfc3c9] mt-1">{dateDebut} - {dateFin}</div>
		</div>
		<div className="text-[#bfc3c9] text-base mt-2">
			{description}
		</div>
	</div>
);

export default ExperienceCard;
