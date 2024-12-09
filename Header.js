"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faUser, faHospitalUser, faIdCard } from "@fortawesome/free-solid-svg-icons";


export default function Header({ onNavClick }) {
  return (
    <header className="bg-blue-500 text-white py-1 px-2 w-full shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-12 h-12 md:w-24 md:h-24 flex items-center justify-center">
              <button onClick={() => onNavClick("home")}>
                <FontAwesomeIcon icon={faHospital} className="text-2xl md:text-4xl" />
              </button>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-lg md:text-2xl font-bold">BSC Hospital</h1>
              <p className="text-sm md:text-lg">We care for you</p>
            </div>
          </div>
          <nav className="flex flex-row gap-1 md:gap-4">
            <button
              onClick={() => onNavClick("patients")}
              className="text-white hover:scale-105 transform transition-transform px-2 md:px-5 py-1 md:py-2 text-sm md:text-base"
            >
              <FontAwesomeIcon icon={faHospitalUser} className="mr-1 md:mr-2" />
              <span className="hidden md:inline">Patients</span>
            </button>
            <button className="text-white hover:scale-105 transform transition-transform px-2 md:px-5 py-1 md:py-2 text-sm md:text-base">
              <FontAwesomeIcon icon={faIdCard} className="mr-1 md:mr-2" />
              <span className="hidden md:inline">Rights</span>
            </button>
            <button className="text-white hover:scale-105 transform transition-transform px-2 md:px-5 py-1 md:py-2 text-sm md:text-base">
              <FontAwesomeIcon icon={faUser} className="mr-1 md:mr-2" />
              <span className="hidden md:inline">Login</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
