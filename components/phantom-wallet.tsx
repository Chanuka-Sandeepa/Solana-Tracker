"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, Copy, CheckCircle, AlertCircle } from "lucide-react"

interface PhantomProvider {
  isPhantom: boolean
  connect: () => Promise<{ publicKey: { toString: () => string } }>
  disconnect: () => Promise<void>
  isConnected: boolean
  publicKey: { toString: () => string } | null
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider
    }
  }
}

export function PhantomWallet() {
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Check if Phantom is installed
    const checkPhantom = () => {
      if (typeof window !== "undefined" && window.phantom?.solana?.isPhantom) {
        setIsPhantomInstalled(true)

        // Check if already connected
        if (window.phantom.solana.isConnected && window.phantom.solana.publicKey) {
          setIsConnected(true)
          setPublicKey(window.phantom.solana.publicKey.toString())
        }
      }
    }

    // Check immediately
    checkPhantom()

    // Also check after a short delay in case Phantom loads asynchronously
    const timer = setTimeout(checkPhantom, 1000)

    return () => clearTimeout(timer)
  }, [])

  const connectWallet = async () => {
    if (!window.phantom?.solana) {
      setError("Phantom wallet not found")
      return
    }

    try {
      setIsConnecting(true)
      setError(null)

      const response = await window.phantom.solana.connect()
      const pubKey = response.publicKey.toString()

      setIsConnected(true)
      setPublicKey(pubKey)
    } catch (err) {
      console.error("Error connecting to Phantom:", err)
      setError(err instanceof Error ? err.message : "Failed to connect to Phantom wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    if (!window.phantom?.solana) return

    try {
      await window.phantom.solana.disconnect()
      setIsConnected(false)
      setPublicKey(null)
      setError(null)
    } catch (err) {
      console.error("Error disconnecting from Phantom:", err)
      setError(err instanceof Error ? err.message : "Failed to disconnect from Phantom wallet")
    }
  }

  const copyPublicKey = async () => {
    if (!publicKey) return

    try {
      await navigator.clipboard.writeText(publicKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy public key:", err)
    }
  }

  const openPhantomDownload = () => {
    window.open("https://phantom.app/download", "_blank")
  }

  if (!isPhantomInstalled) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <AlertCircle className="h-5 w-5" />
              Phantom Wallet Not Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-orange-700 dark:text-orange-300">
              Install Phantom Wallet extension on Google Chrome to use this feature
            </p>
            <Button onClick={openPhantomDownload} className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Download Phantom Wallet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Phantom Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Phantom is a popular Solana wallet that allows you to store, send, receive, and swap tokens on the Solana
              blockchain.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Secure storage of SOL and SPL tokens</li>
                <li>• Built-in token swapping</li>
                <li>• NFT support</li>
                <li>• DeFi protocol integration</li>
                <li>• Hardware wallet support</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Phantom Wallet
            <Badge variant="secondary" className="ml-auto">
              Detected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Connect your Phantom wallet to view your public key and access your wallet information.
              </p>
              <Button onClick={connectWallet} disabled={isConnecting} className="w-full">
                {isConnecting ? "Connecting..." : "Connect Phantom Wallet"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Connected
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Public Key</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">{publicKey}</code>
                  <Button variant="outline" size="sm" onClick={copyPublicKey}>
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1" disabled={!publicKey}>
                  <a href={`/wallet/${publicKey}`}>View Wallet Details</a>
                </Button>
                <Button variant="outline" onClick={disconnectWallet} className="bg-transparent">
                  Disconnect
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && publicKey && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <a href={`/wallet/${publicKey}`}>
                <Wallet className="h-4 w-4 mr-2" />
                View Full Portfolio
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <a href={`https://solscan.io/account/${publicKey}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Solscan
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
