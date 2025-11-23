'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatInterface from '@/components/chat/ChatInterface';

function ChatContent() {
    const searchParams = useSearchParams();
    const agent = searchParams.get('agent') as 'claude' | 'gemini' || 'claude';

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <ChatInterface agentType={agent} />
            </div>
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
