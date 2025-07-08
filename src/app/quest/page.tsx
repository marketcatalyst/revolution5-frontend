import { stripCitations } from '@/utils/textUtils';

// This function fetches our Quest Page data from Strapi.
async function getQuestData() {
  try {
    const response = await fetch('http://localhost:1337/api/quest-page?populate=Bridges');

    if (!response.ok) {
      throw new Error('Failed to fetch Quest Page data.');
    }

    const data = await response.json();
    // For this single type, the data is directly in `data.data`
    return data.data;

  } catch (error) {
    console.error("Error fetching Quest Page data:", error);
    return null;
  }
}

// This is the main component for our Quest Page.
export default async function QuestPage() {

  const questData = await getQuestData();

  if (!questData) {
    return <main><p>Could not load Quest Page content. Is the Strapi server running and are permissions set?</p></main>;
  }

  // The 'Bridges' field contains our repeatable components.
  const { Bridges } = questData;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 lg:p-24 bg-[#F5F5DC]">
      <div className="w-full max-w-4xl">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-center text-[#36454F] sm:text-5xl mb-12">
          The Quest
        </h1>

        {/* We map over the Bridges array to display each one as a styled "card". */}
        {Array.isArray(Bridges) && Bridges.map((bridge: any) => (
          <section key={bridge.id} className="mb-12 p-8 border rounded-lg shadow-md bg-white">
            
            {/* We apply the stripCitations function to the headline */}
            <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
              {stripCitations(bridge.Headline)}
            </h2>
            
            {Array.isArray(bridge.Narrative) && bridge.Narrative.map((block: any, index: number) => (
              <div key={index}>
                {block.children.map((child: any, childIndex: number) => (
                  // We also apply it to the paragraph text
                  <p key={childIndex} className="mt-4 text-lg leading-8 text-gray-700">
                    {stripCitations(child.text)}
                  </p>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}