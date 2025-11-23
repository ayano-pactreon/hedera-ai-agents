import Anthropic from '@anthropic-ai/sdk';
import HederaToolkit from '@/lib/hedera/toolkit';
import Logger from '@/lib/utils/logger';
import type { AgentRequest, AgentResponse, ToolCall } from '@/types/agent';

const logger = new Logger('Claude Agent');

class ClaudeAgent {
    private anthropic: Anthropic;
    private model: string;
    private tools: any[];

    constructor() {
        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is required');
        }

        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        this.model = process.env.CLAUDE_MODEL || 'claude-3-haiku-20240307';

        const toolkit = HederaToolkit.getInstance();
        const hederaTools = toolkit.getTools();

        this.tools = hederaTools.map((tool: any) => {
            const schema = tool.schema || {};
            return {
                name: tool.name,
                description: tool.description || 'No description',
                input_schema: {
                    type: 'object',
                    properties: schema.properties || {},
                    required: schema.required || [],
                },
            };
        });

        logger.success(`Initialized with ${this.tools.length} tools`);
    }

    async chat(request: AgentRequest): Promise<AgentResponse> {
        logger.info(`Processing message: "${request.message}"`);

        const messages: any[] = [
            { role: 'user', content: request.message },
        ];

        const toolCalls: ToolCall[] = [];
        let continueLoop = true;
        let fullResponse = '';

        try {
            while (continueLoop) {
                const response = await this.anthropic.messages.create({
                    model: this.model,
                    max_tokens: 4096,
                    messages,
                    tools: this.tools,
                    system: this.getSystemPrompt(),
                });

                messages.push({
                    role: 'assistant',
                    content: response.content,
                });

                if (response.stop_reason === 'tool_use') {
                    logger.info('Claude requesting tool execution');
                    const toolResults: any[] = [];

                    for (const content of response.content) {
                        if (content.type === 'tool_use') {
                            logger.info(`Executing tool: ${content.name}`);

                            try {
                                const toolkit = HederaToolkit.getInstance();
                                const tools = toolkit.getTools();
                                const tool = tools.find((t: any) => t.name === content.name);

                                if (!tool) {
                                    throw new Error(`Tool ${content.name} not found`);
                                }

                                const result = await tool.invoke(content.input);
                                logger.success(`Tool ${content.name} executed`);

                                toolCalls.push({
                                    name: content.name,
                                    input: content.input,
                                    output: result,
                                });

                                toolResults.push({
                                    type: 'tool_result',
                                    tool_use_id: content.id,
                                    content: JSON.stringify(result),
                                });
                            } catch (error) {
                                logger.error(`Tool error:`, error);

                                toolResults.push({
                                    type: 'tool_result',
                                    tool_use_id: content.id,
                                    content: JSON.stringify({
                                        error: (error as Error).message,
                                    }),
                                    is_error: true,
                                });
                            }
                        }
                    }

                    messages.push({
                        role: 'user',
                        content: toolResults,
                    });
                } else {
                    for (const content of response.content) {
                        if (content.type === 'text') {
                            fullResponse += content.text;
                        }
                    }
                    continueLoop = false;
                }
            }

            logger.success('Conversation completed');

            return {
                message: fullResponse,
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

You can:
- Transfer HBAR (Hedera's native cryptocurrency) between accounts
- Get account information and balances
- Manage tokens (create fungible tokens, transfer, query balances)
- Manage NFTs (create non-fungible tokens, mint, transfer, airdrop)
- Create and manage Hedera Consensus Service topics
- Submit messages to topics for immutable logging
- Query account data and token information

When users ask about blockchain operations, use the appropriate tools to help them. Always:
1. Explain what you're doing before executing
2. Provide clear transaction details after execution
3. Include transaction IDs when available
4. Warn about costs (HBAR fees) before executing
5. Confirm success or failure clearly

Be conversational, helpful, and transparent about blockchain operations.`;
    }
}

export default ClaudeAgent;
