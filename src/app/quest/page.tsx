import { stripCitations } from '@/utils/textUtils';

// This function now robustly handles the Strapi API response.
async function getQuestData() {
  try {
    const response = await fetch('http://localhost:1337/api/quest-page?populate=Bridges');
    if (!response.ok) {
      throw new Error('Failed to fetch Quest Page data.');
    }
    const json = await response.json();
    // For this single type, the data we need is directly in `data.data`.
    return json.data;
  } catch (error) {
    console.error("Error fetching Quest Page data:", error);
    return null;
  }
}

export default async function QuestPage() {
  const questData = await getQuestData();
  if (!questData) {
    return <main className="p-8"><p>Could not load Quest Page content. Is the Strapi server running and permissions set?</p></main>;
  }
  const { Bridges } = questData;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 lg:p-24 bg-[#F5F5DC]">
      <div className="w-full max-w-4xl">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-center text-[#36454F] sm:text-5xl mb-12">
          The Quest
        </h1>
        {Array.isArray(Bridges) && Bridges.map((bridge: any) => (
          <section key={bridge.id} className="mb-12 p-8 border rounded-lg shadow-md bg-white">
            <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
              {stripCitations(bridge.Headline)}
            </h2>
            {Array.isArray(bridge.Narrative) && bridge.Narrative.map((block: any, index: number) => (
              <div key={index}>
                {block.children.map((child: any, childIndex: number) => (
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
