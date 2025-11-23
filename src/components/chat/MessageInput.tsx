'use client';

import { useState, FormEvent } from 'react';
import { Send, ChevronDown } from 'lucide-react';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

const DEMO_ACTIONS = [
    { label: 'Select a demo action...', value: '' },
    { label: '💰 Check HBAR Balance', value: "What's my HBAR balance?" },
    { label: '💸 Send HBAR', value: 'Send 0.1 HBAR to 0.0.12345' },
    { label: '🪙 Create Token', value: 'Create a token called DemoToken with symbol DEMO and supply 1000000' },
    { label: '📊 Get Account Info', value: 'Get account information for my account' },
    { label: '📝 Create Topic', value: 'Create a consensus topic called "Hackathon Demo"' },
    { label: '🌐 What is Hedera?', value: 'What is Hedera blockchain?' },
];

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleDemoSelect = (value: string) => {
        if (value) {
            setMessage(value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="container mx-auto max-w-4xl">
                {/* Demo Action Selector */}
                <div className="mb-3">
                    <div className="relative">
                        <select
                            onChange={(e) => handleDemoSelect(e.target.value)}
                            disabled={disabled}
                            className="w-full px-4 py-2 pr-10 text-sm border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-blue-600 disabled:opacity-50 appearance-none cursor-pointer"
                        >
                            {DEMO_ACTIONS.map((action) => (
                                <option key={action.value} value={action.value}>
                                    {action.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Input and Send Button */}
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
                    💡 Select a demo action above or type your own question
                </div>
            </div>
        </form>
    );
}
