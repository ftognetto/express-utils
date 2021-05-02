
export function parseIntParam(param: any, ifNotValid?: number): number {
    return param && !Number.isNaN(param) ? Number(param) : ifNotValid || 0;
}

export function parseIntArrayParam(param: any): number[] | undefined {
    if (!param) { return undefined; }
    if (param instanceof Array) {
        try {
            return param.map(Number);
        }
        catch (e) {
            return undefined;
        }
    }
    else if (param.indexOf(',') > -1) {
        try {
            return param.split(',').map(Number);
        }
        catch (e) {
            return undefined;
        }
    }
    else {
        try {
            return [ Number.parseInt(param) ];
        }
        catch (e) {
            return undefined;
        }
    }
}

export function parseStringArrayParam(param: any): string[] | undefined {
    if (!param) { return undefined; }
    if (param instanceof Array) {
        try {
            return param.map(String);
        }
        catch (e) {
            return undefined;
        }
    }
    else if (param.indexOf(',') > -1) {
        try {
            return param.split(',').map(String);
        }
        catch (e) {
            return undefined;
        }
    }
    else {
        try {
            return [ param.toString() ];
        }
        catch (e) {
            return undefined;
        }
    }
}

export function parseDateParam(param: any, ifNotValid?: Date): Date | undefined {
    if (!param) { return ifNotValid; }
    if (param instanceof Date) { return param; }
    else { return new Date(param); }
}

export function parseBoolParam(param: any, ifNotValid?: boolean): boolean | undefined {
    if (param === 'true' || param === true) { return true; }
    else if (param === 'false' || param === false) { return false; }
    else { return ifNotValid; }
}
