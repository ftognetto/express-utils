
import { getHttpStatus } from './http_status';

export class ApiError extends Error {

    status: string;
    code: number;
    timestamp: string;
    message: string;
    debugMessage: string | null;

    constructor(code: number, message: string, error?: any) {
        super(message);
        if (!error) {
            if (message) { error = message; } 
            else { error = 'An error occurred.'; }
        }
        let debugMessage = JSON.stringify(error);
        if (!debugMessage || debugMessage === '' || debugMessage === '{}') { debugMessage = error.message || error; }
        const now = new Date();

        this.status = getHttpStatus(code);
        this.code = code,
        this.timestamp = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        try {
            if (typeof(message) === 'string') {
                this.message = message;
            }
            else if (typeof(message) === 'object') {
                this.message = (message as any).message || JSON.stringify(message);
            }
            else {
                this.message = message;
            }
        }
        catch (e) {
            this.message = message;
        }
        this.debugMessage = debugMessage;
        
    }

    static badRequest = (reason?: string) => new ApiError(400, reason || '');
    static missingParameters = (parameter?: string) => new ApiError(400, 'Missing parameters' + (parameter ? ' - ' + parameter : ''));
    static wrongParameters = (parameter?: string) => new ApiError(400, 'Wrong parameters' + (parameter ? ' - ' + parameter : ''));
    static unauthorized = () => new ApiError( 401, 'Unauthorized');
    static forbidden = () => new ApiError( 403, 'Access denied');
    static notFound = (what?: string) => new ApiError( 404, (what || 'Object') + ' not found');
    static error = (message: string, error?: any) => new ApiError(500, message, error);

    toResponse = (res: any) => res.status(this.code).json(this);
   
}

export function isApiError(error: any): error is ApiError {
    if (error && error.message && error.code && error.status) {
        return true;
    }
    return false;
    
}
