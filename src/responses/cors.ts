
export const corsConfig = {
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    optionsSuccessStatus: 200
};

export function cors(req: any, res: any) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Expose-Headers', 'Authorization');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.status(204);
        res.setHeader('Content-Length', '0');
        res.end();
        return true;
    }
    return false;
}