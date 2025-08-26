"use client"

import type React from "react"

import { useState  } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardHeader, CardTitle   } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Wallet } from "lucide-react"

export default function walletSearchPage(){
    const [address, setAddress] =useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const validatesolanaAdress = (addr: string) =>{
        if (!addr) return "please enter a wallet address"
        if(addr.length < 32 || address.length > 44 ) return "Invalide solana adress Length"
        if(!/^[1-9A-HJ-NP-Za-km-z]+$/.test(addr)) return "Invalid solana address format"
        return ""
    }

    const handlesearch = () =>{
        const validationError = validatesolanaAdress(address.trim())
        if(validationError){
            setError(validationError)
            return
    }
    setError("")
    router.push(`/wallet/${address.trim()}`)
    }

    const handlekeyPress = ( e: React.KeyboardEvent) =>{
        if(e.key === "Enter"){
            handlesearch()
        }
    }

    const exampleAddresses =[
        {
            name:"Raydium protocol",
            address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtVhAW5Q5pge4j1",

        },
        {
            name:"Jupiter Aggregator",
            address: "JUP6LkbzbjS1jKwapdHNy74zc3tLUZoi5QNyVTaV4",

        },

    ]
    return(
        <div className="min-h-screen bg-background">
           <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">wallet LookUp</h1>
                <p className="text-muted-foreground mt-2">Enter a Solana wallet address to view token holdings and balance</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="h-4 w-4"/>
                            Search Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            discover trending token
                        </div>
                    </CardContent>
                </Card>
            </div>
           </div>
           </div>
    )
}