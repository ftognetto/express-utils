export const fireToJSON = (data: any) => {
    const body = data.data();
    convertFirestoreDates(body);
    return {
        ...body,
        id: data.id
    };
};

function convertFirestoreDates(obj: any): any {
    for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === 'object') {
                if (obj[property] && obj[property]['_seconds'] && obj[property]['_nanoseconds']) {
                    obj[property] = obj[property].toDate();
                }
                else {
                    convertFirestoreDates(obj[property]);
                }
            }
            else {
                console.log(property + '   ' + obj[property]);
            }
        }
    }
}
