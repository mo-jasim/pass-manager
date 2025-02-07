import { AddCards } from "@/components/AddCards";
import { AddPasswords } from "@/components/AddPasswords";
import { YourCards } from "@/components/YourCards";
import { YourPasswords } from "@/components/YourPasswords";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="w-full min-h-screen bg-background py-5">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <section className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Add Your Passwords
            </h2>
            <AddPasswords />
          </section>

          <section className="bg-card rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-card-foreground mb-4">
              Add Your Card Details
            </h1>
            <AddCards />
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <section className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Your Passwords
            </h2>
            <YourPasswords passwords={Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.passwords:[]} />
          </section>

          <section className="bg-card rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-card-foreground mb-4">
              Your Card Details
            </h1>
            <YourCards
              cards={
                Array.isArray(user?.privateMetadata.cards)
                  ? user?.privateMetadata.cards
                  : []
              }
            />
          </section>
        </div>
      </div>
    </main>
  );
}
