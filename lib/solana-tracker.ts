const API_BASE_URL = "https://data.solanatracker.io"
const API_KEY = process.env.NEXT_PUBLIC_SOLANA_TRACKER_API_KEY || "5c91cba0-4483-4880-8bf2-765a99ef1c07"

export interface TrendingToken {
  token: {
    name: string
    symbol: string
    mint: string
    decimals: number
    image?: string
    description?: string
  }
  pools: Array<{
    poolId: string
    price: {
      usd: number
      quote: number
    }
    marketCap: {
      usd: number
      quote: number
    }
    liquidity: {
      usd: number
      quote: number
    }
    txns: {
      volume24h: number
      buys: number
      sells: number
      total: number
    }
  }>
  events: {
    "24h": {
      priceChangePercentage: number
    }
  }
}

export interface WalletTokenBalance {
  token: {
    name: string
    symbol: string
    mint: string
    decimals: number
    image?: string
  }
  balance: number
  value: number
}

export interface WalletInfo {
  tokens: WalletTokenBalance[]
  total: number
  totalSol: number
  timestamp: string
}

class SolanaTrackerAPI {
  private async fetchAPI(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "x-api-key": API_KEY, // Updated header name to match API docs
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getTrendingTokens(timeframe = "1h"): Promise<TrendingToken[]> {
    try {
      const data = await this.fetchAPI(`/tokens/trending/${timeframe}`)
      return data || []
    } catch (error) {
      console.error("Error fetching trending tokens:", error)
      throw error
    }
  }

  async getWalletInfo(address: string): Promise<WalletInfo> {
    try {
      // Validate Solana address format (basic check)
      if (!address || address.length < 32 || address.length > 44) {
        throw new Error("Invalid Solana wallet address")
      }

      const data = await this.fetchAPI(`/wallet/${address}`)
      return data
    } catch (error) {
      console.error("Error fetching wallet info:", error)
      throw error
    }
  }
}

export const solanaTracker = new SolanaTrackerAPI()
