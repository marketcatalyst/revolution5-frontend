import { stripCitations } from '@/utils/textUtils';

// This function fetches the data for our "Our Genesis" page.
async function getGenesisData() {
  try {
    const response = await fetch('http://localhost:1337/api/our-genesis-page');
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

export default async function GenesisPage() {
  const pageData = await getGenesisData();

  if (!pageData) {
    return <main><p>Could not load page content.</p></main>;
  }

  const { PageHeadline, Narrative } = pageData;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 lg:p-24 bg-[#F5F5DC]">
      <article className="prose prose-lg w-full max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8 text-[#36454F]">
          {stripCitations(PageHeadline)}
        </h1>
        
        {Array.isArray(Narrative) && Narrative.map((block: any, index: number) => {
          const paragraphText = block.children.map((child: any) => stripCitations(child.text)).join('');
          if (paragraphText.trim().length > 0) {
            // UPDATED PARAGRAPH: Added a className for margin-bottom (mb-6) to create space.
            return <p key={index} className="mb-6">{paragraphText}</p>;
          }
          return null;
        })}

      </article>
    </main>
  );
}