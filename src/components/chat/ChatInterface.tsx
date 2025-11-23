'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { Message } from '@/types/agent';

interface ChatInterfaceProps {
    agentType: 'claude' | 'gemini';
}

export default function ChatInterface({ agentType }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
        <Card className="w-full h-[600px] flex flex-col">
            <CardHeader>
                <CardTitle>
                    {agentType === 'claude' ? 'Claude' : 'Gemini'} Hedera Agent
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
                <MessageList messages={messages} />
                <MessageInput onSend={sendMessage} disabled={isLoading} />
            </CardContent>
        </Card>
    );
}
