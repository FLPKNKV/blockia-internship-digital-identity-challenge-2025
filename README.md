# Sign & Verify - Digital Identity Demo

A demonstration of digital identity verification using cryptographic signatures, similar to how modern passwordless authentication systems work.

## Submission Information

- **Name**: Filip Kenkov
- **GitHub Username**: flpknk
- **Sample Signed Message**: 
  - Message: `BLOCKIA-Filip Kenkov-flpknk-20250411`
  - Signature: `YourSignatureWillAppearHereAfterRunningTheApp`
  - Public Key: `YourPublicKeyWillAppearHereAfterRunningTheApp`

## Overview

This application demonstrates how digital signatures can be used to verify a user's identity without passwords. Instead of using a password, the application uses cryptography to prove identity - similar to signing a digital document.

## How It Works

### Cryptographic Concepts

The application uses public-key cryptography (specifically EdDSA with the TweetNaCl library) which involves:

1. **Key Pair Generation**: Creates two mathematically related keys:
   - **Public Key**: Shared openly and used to verify signatures
   - **Private Key**: Kept secret and used to create signatures

2. **Digital Signatures**: A mathematical scheme that proves:
   - The message was created by the owner of the private key (authentication)
   - The message hasn't been altered (integrity)

3. **Verification**: Anyone with the public key can verify that a signature was created by the corresponding private key without needing access to the private key.

### Application Flow

1. **User Clicks "Login"**:
   - The application generates a new cryptographic key pair
   - The private key is kept in memory (never stored)
   - The public key could be registered with a service (in a real application)

2. **Message Creation**:
   - A message is created with the format: `BLOCKIA-<NAME>-<GITHUB_ID>-<DATE>`
   - This message serves as the data to be signed

3. **Signing Process**:
   - The application signs the message using the private key
   - This creates a unique signature that can only be produced with that private key

4. **Verification**:
   - The message, signature, and public key are sent to the server
   - The server verifies that the signature is valid for the given message and public key
   - If valid, the user's identity is confirmed

5. **Result Display**:
   - The application shows whether the verification was successful

## Technical Implementation

### Frontend (Next.js App Router)

- React components for the user interface
- Client-side cryptographic operations using TweetNaCl
- Axios for API communication

### Backend (Next.js API Routes)

- API endpoint for signature verification
- Server-side validation of the cryptographic proof

### Cryptography (TweetNaCl)

- Key pair generation using Ed25519 algorithm
- Message signing and verification
- Base64 encoding/decoding for data transmission

## Code Structure

- `app/page.tsx`: Main UI component with the login button and verification logic
- `app/api/verify/route.ts`: API endpoint for verifying signatures
- `utils/crypto.ts`: Cryptographic utility functions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
- npm install/yarn install
3. Run the dev server
- npm run dev/yarn dev
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Click the "Login with your ID" button to generate a key pair, sign the message, and verify the signature.
6. Check the browser console (F12 > Console) to see the actual message, signature, and public key values.