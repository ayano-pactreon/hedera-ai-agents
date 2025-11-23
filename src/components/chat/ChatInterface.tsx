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
        // user message
        console.log(content);
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
