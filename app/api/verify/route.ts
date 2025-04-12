import { type NextRequest, NextResponse } from "next/server"
import { verifySignature } from "../../utils/crypto"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, signature, publicKey } = body
    
    if (!message || !signature || !publicKey) {
      return NextResponse.json(
        {
          verified: false,
          message: "Missing required fields: message, signature, or publicKey",
        },
        { status: 400 },
      )
    }
    const verified = verifySignature(message, signature, publicKey)

    if (verified) {
      return NextResponse.json({
        verified: true,
        message: "Identity verified successfully",
      })
    } else {
      return NextResponse.json(
        {
          verified: false,
          message: "Signature verification failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      {
        verified: false,
        message: "An error occurred during verification",
      },
      { status: 500 },
    )
  }
}
