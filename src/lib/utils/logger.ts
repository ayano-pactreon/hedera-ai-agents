type LogLevel = 'info' | 'success' | 'error' | 'warn' | 'debug';

class Logger {
    private context: string;

    constructor(context: string) {
        this.context = context;
    }

    private log(level: LogLevel, message: string, ...args: any[]): void {
        const timestamp = new Date().toISOString();
        const emoji = {
            info: 'ℹ️',
            success: '✅',
            error: '❌',
            warn: '⚠️',
            debug: '🐛',
        }[level];

        const logMessage = `${timestamp} [${this.context}] ${emoji} ${message}`;

        switch (level) {
            case 'error':
                console.error(logMessage, ...args);
                break;
            case 'warn':
                console.warn(logMessage, ...args);
                break;
            case 'debug':
                if (process.env.NODE_ENV === 'development') {
                    console.log(logMessage, ...args);
                }
                break;
            default:
                console.log(logMessage, ...args);
        }
    }

    info(message: string, ...args: any[]): void {
        this.log('info', message, ...args);
    }

    success(message: string, ...args: any[]): void {
        this.log('success', message, ...args);
    }

    error(message: string, ...args: any[]): void {
        this.log('error', message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.log('warn', message, ...args);
    }

    debug(message: string, ...args: any[]): void {
        this.log('debug', message, ...args);
    }
}

export default Logger;
