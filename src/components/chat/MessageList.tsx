'use client';

import { Message } from '@/types/agent';

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : message.role === 'agent'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'bg-yellow-50 text-yellow-900 border border-yellow-200'
                        }`}
                    >
                        <div className="text-sm font-medium mb-1">
                            {message.role === 'user' ? 'You' : message.role === 'agent' ? 'AI Agent' : 'System'}
                        </div>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        {message.metadata?.transactionId && (
                            <div className="mt-2 text-xs opacity-75">
                                TX: {message.metadata.transactionId}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
