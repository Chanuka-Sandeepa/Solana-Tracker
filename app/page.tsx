import { TrendingTokens } from "@/components/trending-token"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold tracking-tight">Track Solana Tokens & Wallets</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover trending tokens, analyze wallet portfolios, and connect your Phantom wallet on the Solana
            blockchain
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Trending Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View the most trending tokens on Solana with real-time price data and 24h changes
              </p>
              <Button asChild className="w-full">
                <Link href="#trending">View Trending</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                Wallet Lookup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Check any Solana wallet&#39;s token holdings, portfolio value, and transaction history
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/wallet">Search Wallet</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Phantom Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Phantom wallet to instantly view your own holdings and portfolio
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/phantom">Connect Phantom</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trending Tokens Section */}
        <div id="trending">
          <TrendingTokens />
        </div>

        {/* Footer */}
        <footer className="border-t pt-8 mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Built for ByteSquad Labs Frontend Internship Assignment</p>
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <a href="https://docs.solanatracker.io" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Docs
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Phantom
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
