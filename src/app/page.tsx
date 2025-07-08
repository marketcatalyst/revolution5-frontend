import Link from 'next/link';
import { stripCitations } from '@/utils/textUtils';

// This function fetches our data from the Strapi backend.
async function getHomepageData() {
  try {
    const response = await fetch('http://localhost:1337/api/homepage');
    if (!response.ok) {
      throw new Error('Failed to fetch homepage data.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

// This is our main Homepage component.
export default async function Home() {
  
  const homepage = await getHomepageData();

  if (!homepage) {
    return <main className="flex items-center justify-center min-h-screen"><p>Could not load page content. Is the Strapi server running?</p></main>;
  }

  const { MainHeadline, SupportingNarrative, CallToActionText } = homepage;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5DC]">
      <div className="text-center px-6 py-24 sm:py-32 lg:px-8">
        
        {/* UPDATED HEADLINE: Added max-w-3xl and mx-auto to control width and ensure centering. */}
        <h1 className="font-serif text-4xl font-bold tracking-tight text-[#36454F] sm:text-6xl max-w-3xl mx-auto">
          {stripCitations(MainHeadline)}
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          {Array.isArray(SupportingNarrative) && stripCitations(
            SupportingNarrative.map((block: any) => 
              block.children.map((child: any) => child.text).join('')
            ).join('\n')
          )}
        </p>
        
        <div className="mt-10">
          <a
            href="/quest"
            className="rounded-md bg-green-700 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            {stripCitations(CallToActionText)}
          </a>
        </div>
      </div>
    </main>
  );
}