"use client"; // This directive marks the component as a Client Component.

import Link from 'next/link';
import { stripCitations } from '@/utils/textUtils';

// Since this is now a Client Component, we'll define the content directly
// for simplicity, as server-side data fetching works differently here.
const homepage = {
    MainHeadline: "Do you remember when learning was a joy?",
    SupportingNarrative: "Before the conveyor belt of formal education, we all lived in a world of inquiry and discovery. Market Catalyst warmly welcomes you to 'The Fifth Revolution of the Heart and Mind'—a return to that original way of learning, repurposed for the new Industry 5.0 knowledge age. It is a place of profound psychological safety, where creativity and empathy are honored, and where peer-to-peer collaboration is the engine of innovation. It is here that we help you shed the 'systemic verdicts' of the past, so you can lead your team with a new hope, a new way of being, and a new future.",
    CallToActionText: "Begin Your Quest"
};

export default function Home() {
  return (
    // The main container is now the hero section itself.
    <main className="relative flex h-[calc(100vh-80px)] flex-col items-center justify-center text-white">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-10 bg-black opacity-50" />

      {/* Content Container */}
      <div className="relative z-20 text-center px-6 py-24 sm:py-32 lg:px-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl text-shadow">
          {stripCitations(homepage.MainHeadline)}
        </h1>
        
        <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto text-shadow">
          {stripCitations(homepage.SupportingNarrative)}
        </p>
        
        <div className="mt-10">
          <Link
            href="/quest"
            className="rounded-md bg-green-700 px-5 py-3 text-base font-semibold text-white shadow-lg hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            {stripCitations(homepage.CallToActionText)}
          </Link>
        </div>
      </div>
      {/* Simple CSS for text shadow to improve readability against the image */}
      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </main>
  );
}