import { NextRequest, NextResponse } from 'next/server';
import { AccountBalanceQuery } from '@hashgraph/sdk';
import HederaClient from '@/lib/hedera/client';

export async function GET(request: NextRequest) {
    try {
        const hederaClient = HederaClient.getInstance();
        const client = hederaClient.getClient();
        const accountId = hederaClient.getAccountId();

        const balance = await new AccountBalanceQuery()
            .setAccountId(accountId)
            .execute(client);

        return NextResponse.json({
            accountId,
            hbars: balance.hbars.toString(),
            tokens: balance.tokens?.toString() || {},
        });
    } catch (error) {
        console.error('[API] Balance query error:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

export const runtime = 'nodejs';
