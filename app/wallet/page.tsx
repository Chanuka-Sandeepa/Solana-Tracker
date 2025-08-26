"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Wallet } from "lucide-react"

export default function WalletSearchPage() {
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const validateSolanaAddress = (addr: string) => {
    // Basic Solana address validation
    if (!addr) return "Please enter a wallet address"
    if (addr.length < 32 || addr.length > 44) return "Invalid Solana address length"
    if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(addr)) return "Invalid Solana address format"
    return ""
  }

  const handleSearch = () => {
    const validationError = validateSolanaAddress(address.trim())
    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    router.push(`/wallet/${address.trim()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const exampleAddresses = [
    {
      name: "Raydium Protocol",
      address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    },
    {
      name: "Jupiter Aggregator",
      address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Wallet Lookup</h1>
          <p className="text-muted-foreground mt-2">Enter a Solana wallet address to view token holdings and balance</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Search Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Solana Wallet Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="address"
                    placeholder="Enter wallet address (e.g., 5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1)"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      if (error) setError("")
                    }}
                    onKeyPress={handleKeyPress}
                    className="font-mono"
                  />
                  <Button onClick={handleSearch} disabled={!address.trim()}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exampleAddresses.map((example) => (
                  <div
                    key={example.address}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setAddress(example.address)
                      setError("")
                    }}
                  >
                    <div>
                      <p className="font-medium">{example.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">{example.address}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
