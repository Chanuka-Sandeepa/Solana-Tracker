"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type TrendingToken, solanaTracker } from "@/lib/solana-tracker"
import { Loader2, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"

export function TrendingTokens() {
  const [tokens, setTokens] = useState<TrendingToken[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("1h")

  const fetchTrendingTokens = async () => {
    try {
      setLoading(true)
      setError(null)
      const trendingTokens = await solanaTracker.getTrendingTokens(timeframe)
      setTokens(trendingTokens)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch trending tokens")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingTokens()
  }, [timeframe])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading trending tokens...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Error: {error}</p>
          <Button onClick={fetchTrendingTokens} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">Trending Tokens</h2>
        </div>

        <div className="flex gap-2">
          {["1h", "6h", "24h"].map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tokens.map((tokenData) => {
          const { token, pools, events } = tokenData
          const mainPool = pools[0] // Use the first pool as main pool
          const priceChange24h = events["24h"]?.priceChangePercentage || 0

          return (
            <Card key={token.mint} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {token.image && (
                      <img src={token.image || "/placeholder.svg"} alt={token.name} className="w-6 h-6 rounded-full" />
                    )}
                    <span className="truncate">{token.name}</span>
                  </div>
                  <Badge variant="secondary">{token.symbol}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mainPool && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="font-mono">${mainPool.price.usd.toFixed(6)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">24h Change</span>
                      <div className="flex items-center gap-1">
                        {priceChange24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`font-mono text-sm ${priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {priceChange24h >= 0 ? "+" : ""}
                          {priceChange24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Volume 24h</span>
                      <span className="font-mono text-sm">${mainPool.txns.volume24h.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Market Cap</span>
                      <span className="font-mono text-sm">${mainPool.marketCap.usd.toLocaleString()}</span>
                    </div>
                  </>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground font-mono truncate">{token.mint}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {tokens.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No trending tokens found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
