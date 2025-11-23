'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about Hedera operations..."
                    disabled={disabled}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <Button type="submit" disabled={disabled || !message.trim()}>
                    Send
                </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
                Try: "What's my HBAR balance?" or "Send 1 HBAR to 0.0.12345"
            </div>
        </form>
    );
}
