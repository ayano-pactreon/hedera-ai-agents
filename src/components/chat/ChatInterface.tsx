'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { Message } from '@/types/agent';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft, MessageSquare, Sparkles} from "lucide-react";

interface ChatInterfaceProps {
    agentType: 'claude' | 'gemini';
}

export default function ChatInterface({ agentType }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isGemini = agentType === "gemini";
    const agentIcon = isGemini ? Sparkles : MessageSquare
    const AgentIcon = agentIcon

    const sendMessage = async (content: string) => {
        const userMessage: Message = {
            id: uuidv4(),
            role: 'user',
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/agents/${agentType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: content }),
            });

            if (!response.ok) {
                throw new Error(`Agent error: ${response.statusText}`);
            }

            const data = await response.json();

            const agentMessage: Message = {
                id: uuidv4(),
                role: 'agent',
                content: data.message,
                timestamp: new Date(),
                metadata: {
                    toolCalls: data.toolCalls,
                },
            };
            setMessages((prev) => [...prev, agentMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: uuidv4(),
                role: 'system',
                content: `Error: ${(error as Error).message}`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white flex-shrink-0">
                <div className="container mx-auto max-w-4xl py-6">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Button variant="ghost" size="default" className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                                    isGemini ? "bg-blue-100" : "bg-blue-100"
                                }`}
                            >
                                <AgentIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">
                                    {agentType === 'claude' ? 'Claude' : 'Gemini'} Hedera Agent
                                </h1>
                                <p className="text-sm text-gray-500">AI-powered blockchain assistant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages - scrollable */}
            <div className="flex-1 overflow-hidden">
                <MessageList messages={messages} agentType={agentType} onSuggestionClick={sendMessage} isLoading={isLoading} />
            </div>

            {/* Input - fixed at bottom */}
            <div className="flex-shrink-0">
                <MessageInput onSend={sendMessage} disabled={isLoading} />
            </div>
        </div>
    );
}
