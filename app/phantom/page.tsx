import { PhantomWallet } from "@/components/phantom-wallet";

export default function PhantomPage() {
  return (
    <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">phantom Waleet</h1>
                <p className="text-muted-foreground mt-2">Integrate Phantom Wallet into your Next.js app</p> 
            </div>
      <h1 className="text-2xl font-bold mb-4">Phantom Wallet Integration</h1>
      <PhantomWallet />
    </div>
    </div>
  );
}