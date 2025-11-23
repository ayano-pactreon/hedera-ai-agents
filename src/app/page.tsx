import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Sparkles, Coins, FileText, MessageSquare } from "lucide-react"

export default function Home() {
    return (
        <div className="h-screen overflow-y-auto">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="container relative px-4 py-8 mx-auto max-w-7xl md:py-12">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium text-foreground">Powered by Hedera Network</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">Hedera AI Agents</h1>

                        <p className="max-w-2xl text-base text-muted-foreground text-pretty md:text-lg">
                            AI-powered blockchain operations on Hedera network
                        </p>
                    </div>
                </div>
            </section>

            {/* Agent Cards Section */}
            <section className="container px-4 py-6 mx-auto max-w-7xl md:py-8">
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Claude Agent Card */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 border-border/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="relative space-y-2 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Claude Agent</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Powered by Anthropic Claude with advanced reasoning capabilities
                            </p>
                        </CardHeader>
                        <CardContent className="relative">
                            <Link href="/chat?agent=claude">
                                <Button
                                    size="default"
                                    className="w-full cursor-pointer text-sm font-medium bg-blue-600 hover:bg-blue-800 text-primary-foreground shadow-lg shadow-primary/20"
                                >
                                    Chat with Claude
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Gemini Agent Card */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-accent/5 border-border/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="relative space-y-2 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20">
                                        <Sparkles className="w-5 h-5 text-accent" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Gemini Agent</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Powered by Google Gemini with multimodal understanding
                            </p>
                        </CardHeader>
                        <CardContent className="relative">
                            <Link href="/chat?agent=gemini">
                                <Button
                                    size="default"
                                    className="w-full cursor-pointer text-sm font-medium bg-cyan-600 hover:bg-cyan-800 text-accent-foreground shadow-lg shadow-accent/20"
                                >
                                    Chat with Gemini
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Capabilities Section */}
            <section className="border-t border-border bg-muted/30">
                <div className="container px-4 py-6 mx-auto max-w-7xl md:py-8">
                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Capabilities</h2>
                            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                                Powerful blockchain operations powered by AI
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {/* HBAR Transfers */}
                            <div className="group relative">
                                <Card className="h-full transition-all hover:shadow-lg border-border/50">
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 transition-transform group-hover:scale-110">
                                            <Coins className="w-5 h-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">HBAR Transfers</CardTitle>
                                        <p className="text-sm leading-relaxed">
                                            Send and receive Hedera's native cryptocurrency
                                        </p>
                                    </CardHeader>
                                </Card>
                            </div>

                            {/* Token Management */}
                            <div className="group relative">
                                <Card className="h-full transition-all hover:shadow-lg border-border/50">
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 transition-transform group-hover:scale-110">
                                            <Sparkles className="w-5 h-5 text-secondary" />
                                        </div>
                                        <CardTitle className="text-lg">Token Management</CardTitle>
                                        <p className="text-sm leading-relaxed">
                                            Create and manage fungible tokens and NFTs
                                        </p>
                                    </CardHeader>
                                </Card>
                            </div>

                            {/* Consensus Service */}
                            <div className="group relative">
                                <Card className="h-full transition-all hover:shadow-lg border-border/50">
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 transition-transform group-hover:scale-110">
                                            <FileText className="w-5 h-5 text-accent" />
                                        </div>
                                        <CardTitle className="text-lg">Consensus Service</CardTitle>
                                        <p className="text-sm leading-relaxed">
                                            Create topics and log immutable messages
                                        </p>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


