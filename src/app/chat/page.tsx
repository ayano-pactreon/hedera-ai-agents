'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatInterface from '@/components/chat/ChatInterface';

function ChatContent() {
    const searchParams = useSearchParams();
    const agent = searchParams.get('agent') as 'claude' | 'gemini' || 'claude';

    return (
        <main className="h-screen overflow-hidden">
            <ChatInterface agentType={agent} />
        </main>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatContent />
        </Suspense>
    );
}
