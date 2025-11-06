
import React from "react";

const defaultLinks = [
	{
		name: "GitHub",
		url: "https://github.com/",
		icon: (
			<svg width="22" height="22" fill="none" stroke="#ffc72c" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
		),
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com/",
		icon: (
			<svg width="22" height="22" fill="none" stroke="#ffc72c" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M8 11v5"/><path d="M8 8v.01"/><path d="M12 16v-5"/><path d="M16 16v-3a2 2 0 0 0-4 0"/></svg>
		),
	},
	{
		name: "Twitter",
		url: "https://twitter.com/",
		icon: (
			<svg width="22" height="22" fill="none" stroke="#ffc72c" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.69.11 1.02A12.94 12.94 0 0 1 3.1.67a4.52 4.52 0 0 0-.61 2.28c0 1.57.8 2.96 2.02 3.77A4.48 4.48 0 0 1 1.64 6.1v.06c0 2.2 1.56 4.03 3.64 4.45-.38.1-.78.16-1.19.16-.29 0-.57-.03-.85-.08.57 1.78 2.22 3.08 4.18 3.12A9.06 9.06 0 0 1 0 19.54a12.8 12.8 0 0 0 6.94 2.03c8.33 0 12.89-6.9 12.89-12.89 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a9.05 9.05 0 0 1-2.6.71z"/></svg>
		),
	},
];

const SocialMedia = ({ links = defaultLinks }) => (
	<div className="bg-[#23262b] rounded-xl p-6 w-full max-w-xs mx-auto mt-6 border border-[#23232b] text-left shadow flex flex-col gap-4">
		<h2 className="text-2xl font-bold text-[#f6f3d7] mb-2">Social Media</h2>
		{links.map((link, idx) => (
			<a
				key={idx}
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-3 group"
			>
				<span className="bg-[#232323] rounded-lg p-2 flex items-center justify-center group-hover:bg-[#ffc72c] transition">
					{link.icon}
				</span>
				<span className="text-[#bfc3c9] text-base group-hover:text-[#ffc72c] transition font-medium">{link.name}</span>
			</a>
		))}
	</div>
);

export default SocialMedia;
