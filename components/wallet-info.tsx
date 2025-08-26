"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type WalletInfo as WalletInfoType, solanaTracker } from "@/lib/solana-tracker"
import { Loader2, Wallet, Copy, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WalletInfoProps {
  address: string
}
export function WalletInfo({ address }: WalletInfoProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfoType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const fetchWalletInfo = async () => {
    try {
      setLoading(true)
      setError(null)
      const info = await solanaTracker.getWalletInfo(address)
      setWalletInfo(info)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch wallet information")
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if (address) {
      fetchWalletInfo()
    }
  }, [address])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading wallet information...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Error: {error}</p>
          <Button onClick={fetchWalletInfo} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!walletInfo) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No wallet information found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Wallet Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">{address}</code>
            <Button variant="outline" size="sm" onClick={copyAddress} className="shrink-0 bg-transparent">
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Value (USD)</p>
              <p className="text-2xl font-bold">${walletInfo.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value (SOL)</p>
              <p className="text-2xl font-bold font-mono">{walletInfo.totalSol.toFixed(4)} SOL</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Last updated: {walletInfo.timestamp}</p>
        </CardContent>
      </Card>

      {/* Token Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Token Holdings ({walletInfo.tokens.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {walletInfo.tokens.length === 0 ? (
            <p className="text-muted-foreground">No token holdings found</p>
          ) : (
            <div className="space-y-4">
              {walletInfo.tokens.map((tokenBalance, index) => (
                <div
                  key={`${tokenBalance.token.mint}-${index}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {tokenBalance.token.image && (
                      <img
                        src={tokenBalance.token.image || "/placeholder.svg"}
                        alt={tokenBalance.token.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tokenBalance.token.name}</span>
                        <Badge variant="secondary">{tokenBalance.token.symbol}</Badge>
                      </div>
                      <code className="text-xs text-muted-foreground font-mono">{tokenBalance.token.mint}</code>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">
                      {tokenBalance.balance.toLocaleString()} {tokenBalance.token.symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">${tokenBalance.value.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
