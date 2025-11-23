'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="p-4 bg-white">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask about Hedera operations..."
                        disabled={disabled}
                        className="flex-1 rounded-full border-2 border-blue-600 px-6 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 disabled:opacity-50 bg-white"
                    />
                    <button
                        type="submit"
                        disabled={disabled || !message.trim()}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 px-2">
                    Try: "What's my HBAR balance?" or "Send 1 HBAR to 0.0.12345"
                </div>
            </div>
        </form>
    );
}
