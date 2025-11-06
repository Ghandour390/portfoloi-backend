
import React from "react";

const defaultInfo = {
	email: "abdelhakghandour@gmail.com",
	phone: "+212 602432851",
	location: "youssoufia, Morocco",
};

const ContactInfo = ({
	email = defaultInfo.email,
	phone = defaultInfo.phone,
	location = defaultInfo.location,
}) => (
	<div className="bg-[#23262b] rounded-xl p-6 w-full max-w-xs mx-auto mt-6 border border-[#23232b] text-left shadow flex flex-col gap-4">
		<h2 className="text-2xl font-bold text-[#f6f3d7] mb-2">Contact Info</h2>
		<div className="flex items-center gap-3">
			<span className="bg-[#232323] rounded-lg p-2 flex items-center justify-center">
				<svg width="24" height="24" fill="none" stroke="#ffc72c" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg>
			</span>
			<span className="text-[#bfc3c9] text-base">{email}</span>
		</div>
		<div className="flex items-center gap-3">
			<span className="bg-[#232323] rounded-lg p-2 flex items-center justify-center">
				<svg width="24" height="24" fill="none" stroke="#ffc72c" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 21 16.91z"/></svg>
			</span>
			<span className="text-[#bfc3c9] text-base">{phone}</span>
		</div>
		<div className="flex items-center gap-3">
			<span className="bg-[#232323] rounded-lg p-2 flex items-center justify-center">
				<svg width="24" height="24" fill="none" stroke="#ffc72c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 12-8 12S4 15.25 4 10a8 8 0 0 1 8-8z"/></svg>
			</span>
			<span className="text-[#bfc3c9] text-base">{location}</span>
		</div>
	</div>
);

export default ContactInfo;
