"use client";

import ErrorToast from "./components/errorToast";
import Form from "./components/form";
import { useState } from "react";

export default function Home() {
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto] items-center justify-items-center p-6 sm:p-12 font-[family-name:var(--font-geist-sans)]">
      {showErrorToast && 
        <div className="absolute top-4 left-1/2 z-50 transform -translate-x-1/2">
          <ErrorToast onClose={setShowErrorToast}/>
        </div>}
      <main className="flex flex-col items-center gap-6 w-full max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold">{`TT tools 4 you <3`}</h1>
        <h3 className="text-lg sm:text-xl font-light">Free. No ads. No watermark.</h3>

        <div className="relative w-full h-32 bg-gradient-to-b shadow-md overflow-hidden flex justify-center items-center mt-8">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black"></div>
          <Form showErrorToast={setShowErrorToast}/>
        </div>
      </main>

      <footer className="mt-12 flex gap-6 flex-wrap items-center justify-center text-sm">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/stjepans17"
          target="_blank"
          rel="noopener noreferrer"
        >
          🌐 Go to my GitHub →
        </a>
      </footer>
    </div>
  );
}
