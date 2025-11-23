import { NextRequest, NextResponse } from 'next/server';
import GeminiAgent from '@/lib/agents/gemini';
import type { AgentRequest } from '@/types/agent';

let geminiAgent: GeminiAgent | null = null;

function getGeminiAgent(): GeminiAgent {
    if (!geminiAgent) {
        geminiAgent = new GeminiAgent();
    }
    return geminiAgent;
}

export async function POST(request: NextRequest) {
    try {
        const body: AgentRequest = await request.json();

        if (!body.message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const agent = getGeminiAgent();
        const response = await agent.chat(body);

        return NextResponse.json(response);
    } catch (error) {
        console.error('[API] Gemini agent error:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
