'use client';

import { Message } from '@/types/agent';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface MessageListProps {
    messages: Message[];
    agentType: 'claude' | 'gemini';
    onSuggestionClick: (message: string) => void;
    isLoading: boolean;
}

export default function MessageList({ messages, agentType, onSuggestionClick, isLoading }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        'Check HBAR balance',
        'Send HBAR',
        'Create token',
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    if (messages.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center mx-auto px-4 py-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600/10 mb-6">
                    <MessageSquare className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Start a conversation
                </h2>
                <p className="text-center text-gray-500 mb-8 max-w-md">
                    Ask {agentType === 'claude' ? 'Claude' : 'Gemini'} about Hedera operations like checking balances, sending HBAR, or managing tokens
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => onSuggestionClick(suggestion)}
                            className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-4">
            <div className="container mx-auto max-w-4xl space-y-4">
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

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
