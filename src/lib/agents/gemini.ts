import { GoogleGenAI } from '@google/genai';
import HederaToolkit from '@/lib/hedera/toolkit';
import Logger from '@/lib/utils/logger';
import type { AgentRequest, AgentResponse, ToolCall } from '@/types/agent';

const logger = new Logger('Gemini Agent');

class GeminiAgent {
    private ai: GoogleGenAI;
    private modelName: string;
    private tools: any[];

    constructor() {
        this.ai = new GoogleGenAI({});
        this.modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

        const toolkit = HederaToolkit.getInstance();
        const hederaTools = toolkit.getTools();

        this.tools = hederaTools.map((tool: any) => {
            let schema = tool.schema || {};

            try {
                const serialized = JSON.stringify(schema);
                schema = JSON.parse(serialized);
            } catch (e) {
                logger.warn(`Could not serialize schema for ${tool.name}`);
                schema = {};
            }

            return {
                name: tool.name,
                description: tool.description || 'No description',
                parameters: {
                    type: 'object',
                    properties: schema.properties || {},
                    required: schema.required || [],
                },
            };
        });

        logger.info(`Gemini initialized with model: ${this.modelName} and ${this.tools.length} tools`);
    }

    async chat(request: AgentRequest): Promise<AgentResponse> {
        logger.info(`Processing message: "${request.message}"`);

        const toolCalls: ToolCall[] = [];

        try {
            const response = await this.ai.models.generateContent({
                model: this.modelName,
                contents: request.message,
                config: {
                    systemInstruction: this.getSystemPrompt(),
                    tools: this.tools.length > 0 ? [{ functionDeclarations: this.tools }] : undefined,
                },
            });

            let finalResponse = response.text;

            if (response.functionCalls && response.functionCalls.length > 0) {
                logger.info(`Gemini requesting ${response.functionCalls.length} function calls`);

                const functionResponses: any[] = [];

                for (const functionCall of response.functionCalls) {
                    logger.info(`Executing function: ${functionCall.name}`);

                    try {
                        const toolkit = HederaToolkit.getInstance();
                        const tools = toolkit.getTools();
                        const tool = tools.find((t: any) => t.name === functionCall.name);

                        if (!tool) {
                            throw new Error(`Tool ${functionCall.name} not found`);
                        }

                        const result = await tool.invoke(functionCall.args || {});
                        logger.success(`Function ${functionCall.name} executed`);

                        toolCalls.push({
                            name: functionCall.name || '',
                            input: functionCall.args || {},
                            output: result,
                        });

                        functionResponses.push({
                            name: functionCall.name,
                            response: result,
                        });
                    } catch (error) {
                        logger.error(`Function error:`, error);
                        functionResponses.push({
                            name: functionCall.name,
                            response: { error: (error as Error).message },
                        });
                    }
                }
                
                const followUpResponse = await this.ai.models.generateContent({
                    model: this.modelName,
                    contents: `Based on these function results: ${JSON.stringify(functionResponses)}, please provide a helpful response to the user's question: "${request.message}"`,
                });

                finalResponse = followUpResponse.text;
            }

            logger.success('Conversation completed');

            return {
                message: finalResponse || '',
                conversationId: request.conversationId || 'new',
                toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
            };
        } catch (error) {
            logger.error('Chat error:', error);
            throw error;
        }
    }

    private getSystemPrompt(): string {
        return `You are a helpful AI assistant with access to Hedera blockchain operations.

You can perform Hedera blockchain operations including HBAR transfers, token management, NFT operations, and Hedera Consensus Service interactions.

When users ask about blockchain operations, use the appropriate tools and always explain what you're doing clearly.`;
    }
}

export default GeminiAgent;
