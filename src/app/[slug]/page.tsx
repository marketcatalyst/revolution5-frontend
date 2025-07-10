import Link from 'next/link';
import { stripCitations } from '@/utils/textUtils';

// This function now robustly handles the Strapi API response for collections.
async function getPageDataBySlug(slug: string) {
  try {
    const response = await fetch(`http://localhost:1337/api/venture-pages?filters[slug][$eq]=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch page data.');
    }
    const json = await response.json();
    
    if (json.data && json.data.length > 0) {
      // This handles both `data[0].attributes` and `data[0]` structures.
      return json.data[0].attributes || json.data[0]; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function VenturePage({ params }: { params: { slug: string } }) {
  const pageData = await getPageDataBySlug(params.slug);

  if (!pageData) {
    return <main className="p-8"><p>Could not load page content for this venture.</p></main>;
  }

  const { 
    PageHeadline,
    OpeningNarrativeTitle,
    OpeningNarrativeBody,
    Section2Title,
    Section2Body,
    Section3Title,
    Section3Body,
    NextStepTitle,
    NextStepBody,
    CallToActionText 
  } = pageData;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 lg:p-24 bg-[#F5F5DC]">
      <article className="prose prose-lg w-full max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8 text-[#36454F]">{stripCitations(PageHeadline)}</h1>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-10 mb-4 text-gray-800">{stripCitations(OpeningNarrativeTitle)}</h2>
        {Array.isArray(OpeningNarrativeBody) && OpeningNarrativeBody.map((block: any, index: number) => (
          <div key={index}>
            {block.children.map((child: any, childIndex: number) => (
              <p key={childIndex} className="mb-6">{stripCitations(child.text)}</p>
            ))}
          </div>
        ))}

        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-10 mb-4 text-gray-800">{stripCitations(Section2Title)}</h2>
        {Array.isArray(Section2Body) && Section2Body.map((block: any, index: number) => (
          <div key={index}>
            {block.children.map((child: any, childIndex: number) => (
              <p key={childIndex} className="mb-6">{stripCitations(child.text)}</p>
            ))}
          </div>
        ))}
        
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-10 mb-4 text-gray-800">{stripCitations(Section3Title)}</h2>
         {Array.isArray(Section3Body) && Section3Body.map((block: any, index: number) => (
          <div key={index}>
            {block.children.map((child: any, childIndex: number) => (
              <p key={childIndex} className="mb-6">{stripCitations(child.text)}</p>
            ))}
          </div>
        ))}

        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-10 mb-4 text-gray-800">{stripCitations(NextStepTitle)}</h2>
        {Array.isArray(NextStepBody) && NextStepBody.map((block: any, index: number) => (
          <div key={index}>
            {block.children.map((child: any, childIndex: number) => (
              <p key={childIndex} className="mb-6">{stripCitations(child.text)}</p>
            ))}
          </div>
        ))}

        <div className="mt-10">
          <Link
            href="/connect"
            className="rounded-md bg-green-700 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-600 no-underline"
          >
            {stripCitations(CallToActionText)}
          </Link>
        </div>
      </article>
    </main>
  );
}