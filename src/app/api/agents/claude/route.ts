import { NextRequest, NextResponse } from 'next/server';
import ClaudeAgent from '@/lib/agents/claude';
import type { AgentRequest } from '@/types/agent';

let claudeAgent: ClaudeAgent | null = null;

function getClaudeAgent(): ClaudeAgent {
    if (!claudeAgent) {
        claudeAgent = new ClaudeAgent();
    }
    return claudeAgent;
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

        const agent = getClaudeAgent();
        const response = await agent.chat(body);

        return NextResponse.json(response);
    } catch (error) {
        console.error('[API] Claude agent error:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
