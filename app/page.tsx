"use client"

import { useState } from "react"
import axios from "axios"
import { generateKeyPair, signMessage } from "./utils/crypto"

const NAME = "Filip Kenkov"
const GITHUB_ID = "flpknk"
const TODAY = new Date().toISOString().slice(0, 10).replace(/-/g, "")
const MESSAGE = `BLOCKIA-${NAME}-${GITHUB_ID}-${TODAY}`

export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)

  const handleLogin = async () => {
    setIsLoading(true)
    setResult(null)
    setIsVerified(null)

    try {
      const { publicKey, secretKey } = generateKeyPair()
      const signature = signMessage(MESSAGE, secretKey)
      const response = await axios.post("/api/verify", {
        message: MESSAGE,
        signature,
        publicKey,
      })
      console.log("Public key:", publicKey)
      console.log("Signature:", signature)
      console.log("MESSAGE:", MESSAGE)

      setIsVerified(response.data.verified)
      setResult(response.data.message)
    } catch (err) {
      console.error("Verification error:", err)
      setIsVerified(false)

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setResult(err.response.data.message)
      } else {
        setResult("An error occurred during verification")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-black font-bold text-center mb-6">Sign & Verify</h1>
        <div className="mb-6">
          <h2 className="text-lg text-black font-semibold mb-2">Your Identity</h2>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono break-all text-black">{MESSAGE}</div>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Login with your ID"}
        </button>

        {result && (
          <div
            className={`mt-6 p-4 rounded-md ${isVerified ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            <div className="flex items-center">
              <div
                className={`mr-3 flex-shrink-0 h-5 w-5 rounded-full ${isVerified ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <p className="font-medium">{result}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>Blockia Labs – Spring 2025 Internship Challenge</p>
      </div>
    </main>
  )
}
