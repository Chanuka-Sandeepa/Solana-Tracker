import { WalletInfo } from "@/components/wallet-info";

interface WalletPageProps {
    params:{
        address: string
    }
}

export default async function WalletPage({params}: WalletPageProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="conatiner mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">wallet Information</h1>
                    <p className="text-muted-foreground mt-2">view SQL balance and token holdings</p>
                </div>
                <WalletInfo address={params.address} />
            </div>
        </div>
    )
}