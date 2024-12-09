"use client";

import { useState } from "react";

import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Patients from "@/components/Patients";
// import Rights from "@/components/Rights";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const handleNavClick = (view) => {
    setCurrentView(view);
  };
  return (
    <div className="flex min-h-screen font-sans">
      <Header onNavClick={handleNavClick} />
      <main className="flex-grow pt-16">
        {currentView === "home" ? (
          <Body />
        ) : currentView === "patients" ? (
          <Patients />
        ) : (
          <Rights />
        )}
      </main>
      <Footer />
    </div>
  );
}
