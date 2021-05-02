import { ApiError, isApiError } from './api_error';

export function success(res: any, body?: any, contentType?: string): any {
    if (contentType && contentType === 'text') { return buildTextResponse(res, 200, body); }
    else { return buildResponse(res, 200, body); }
}
  
export function failure(res: any, body: ApiError): any {
    console.error(`ERROR - ${res.req.method} ${res.req.protocol}://${res.req.get('host')}${res.req.originalUrl} - ${JSON.stringify(body)}`);
    // stackdriverLog(`ERROR - ${res.req.protocol}://${res.req.get('host')}${res.req.originalUrl} - ${JSON.stringify(body)}`)
    return buildResponse(res, isApiError(body) ? body.code : 500, body);
}
  
function buildResponse(res: any, statusCode: number, body: any): any {
    return res
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Credentials', 'true')
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD')
        .status(statusCode)
        .json(body);
}
function buildTextResponse(res: any, statusCode: number, body: any): any {
    return res
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Credentials', 'true')
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD')
        .status(statusCode)
        .send(body);
}
function buildEmptyResponse(res: any, statusCode: number): any {
    return res
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Credentials', 'true')
        .header('Access-Control-Expose-Headers', 'Authorization')
        .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD')
        .sendStatus(statusCode);
}
