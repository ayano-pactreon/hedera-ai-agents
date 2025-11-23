# Hedera AI Agents

A Next.js web application that brings AI-powered blockchain operations to the Hedera network. Chat with Claude or Gemini to execute blockchain transactions, manage tokens, and interact with Hedera services using natural language.

## What it does

Instead of writing code or using command-line tools to interact with Hedera, just chat. Ask the AI to send HBAR, create tokens, query account balances, or set up consensus topics. Both Claude and Gemini understand Hedera operations and can execute them for you.

## Features

- **Dual AI Agents**: Choose between Anthropic's Claude or Google's Gemini
- **HBAR Transfers**: Send and receive Hedera's native cryptocurrency
- **Token Management**: Create fungible tokens and NFTs
- **Account Queries**: Check balances and account information
- **Consensus Service**: Create topics and submit messages
- **Demo Mode**: Pre-configured actions for quick testing

## Tech Stack

- Next.js 16 (with Turbopack)
- TypeScript
- Anthropic Claude API
- Google Gemini API
- Hedera SDK
- Hedera Agent Kit
- Tailwind CSS

## Getting Started

### Prerequisites

You'll need API keys for:
- Anthropic Claude
- Google Gemini
- Hedera testnet account (account ID and private key)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=your-private-key

# AI APIs
ANTHROPIC_API_KEY=your-claude-api-key
GOOGLE_API_KEY=your-gemini-api-key

# Optional
GEMINI_MODEL=gemini-2.5-flash
CLAUDE_MODEL=claude-3-7-sonnet-20250219
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## How to Use

1. Select either Claude or Gemini from the home page
2. Use the demo action dropdown to quickly test features, or type your own request
3. Examples of what you can ask:
   - "What's my HBAR balance?"
   - "Send 0.1 HBAR to 0.0.12345"
   - "Create a token called MyToken with symbol MTK"
   - "Get my account information"
   - "Create a consensus topic called Demo"

## Project Link

Check it out here: https://superlative-griffin-8bd3fc.netlify.app/
