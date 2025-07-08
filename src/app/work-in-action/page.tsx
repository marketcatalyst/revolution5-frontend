import Link from 'next/link';
// We now import both of our utility functions.
import { stripCitations, smartTruncate } from '@/utils/textUtils';

async function getWorkInActionData() {
  try {
    const response = await fetch('http://localhost:1337/api/our-work-in-action-page?populate=venture_pages');
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function WorkInActionPage() {
  const pageData = await getWorkInActionData();

  if (!pageData) {
    return <main><p>Could not load page content.</p></main>;
  }

  const { PageHeadline, OpeningParagraph, venture_pages } = pageData;

  return (
    <main className="bg-[#F5F5DC]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold font-serif tracking-tight text-[#36454F] sm:text-4xl">
            {stripCitations(PageHeadline)}
          </h1>
          {Array.isArray(OpeningParagraph) && OpeningParagraph.map((block: any, index: number) => (
            <div key={index}>
              {block.children.map((child: any, childIndex: number) => (
                <p key={childIndex} className="mt-6 text-lg leading-8 text-gray-600">
                  {stripCitations(child.text)}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {Array.isArray(venture_pages) && venture_pages.map((venture: any) => {
            // First, get the full, clean text.
            const description = stripCitations(venture.OpeningNarrativeBody[0]?.children[0]?.text || '');

            return (
              <Link key={venture.id} href={`/${venture.slug}`} className="block rounded-lg p-8 shadow-md border bg-white hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold font-serif text-gray-900">
                  {stripCitations(venture.PageHeadline)}
                </h2>
                <div className="mt-4 text-base leading-7 text-gray-600">
                  {/* UPDATED: We now use our 'smartTruncate' function */}
                  {smartTruncate(description, 150)}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  );
}