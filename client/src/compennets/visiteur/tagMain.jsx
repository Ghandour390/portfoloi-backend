

import React from "react";
import profileImg from "../../assets/img/ghandour.png";
import ViewAllProjectsButton from "./ViewAllProjectsButton";

export default function TagMain() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-transparent text-center relative">
      <div className="flex flex-col items-center gap-6 mt-16">
        <div className="relative">
              <img
                src={profileImg}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-yellow-400 shadow-xl mx-auto object-cover"
                style={{ boxShadow: "0 0 80px 10px #ffc72c44" }}
              />
        </div>
  <h1 className="text-5xl md:text-6xl font-bold mb-2 animate-fade-in-up animate-gradient-text bg-gradient-to-r from-[#f5eec5] via-[#ffc72c] to-[#f5eec5] bg-clip-text text-transparent">ghandour abdelhak</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#ffc72c] mb-4">Full-Stack MERN Developer</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-6">
          Passionate about creating elegant solutions to complex problems.<br />
          Specializing in modern web technologies and building scalable applications.
        </p>

        <ViewAllProjectsButton name="View Projects"/>

        <div className="flex gap-8 justify-center mt-2 text-2xl text-gray-400">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc72c] transition" aria-label="GitHub">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc72c] transition" aria-label="LinkedIn">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
            </svg>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc72c] transition" aria-label="Twitter">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/>
            </svg>
          </a>
        </div>
      </div>
      {/* Effet de halo doré */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#ffc72c33] blur-3xl opacity-40 -z-10"></div>
    </section>
  );
}
