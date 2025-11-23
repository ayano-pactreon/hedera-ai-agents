import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Hedera AI Agents
                    </h1>
                    <p className="text-xl text-gray-600">
                        AI-powered blockchain operations on Hedera network
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Claude Agent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Powered by Anthropic Claude with advanced reasoning capabilities
                            </p>
                            <Link href="/chat?agent=claude">
                                <Button className="w-full">Chat with Claude</Button>
                            </Link>
                        </CardContent>
                    </Card>

                </div>


            </div>
        </main>
    );
}
