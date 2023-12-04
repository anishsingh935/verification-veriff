const crypto = require('crypto');

let payload = {
    "verification": {
        "callback": "https://veriff.com",
        "person": {
            "firstName": "John",
            "lastName": "Smith"
        },
        "document": {
            "type": "PASSPORT",
            "country": "EE"
        },
        "vendorData": "a4d486cd-6c67-4a29-a1d4-5cf86cd52beb",
        "timestamp": "2016-05-19T08:30:25.597Z"
    }
};

if (payload.constructor === Object) {
    payload = JSON.stringify(payload);
}

if (payload.constructor !== Buffer) {
    payload = Buffer.from(payload, 'utf8');
}

const digest = crypto.createHmac('sha256', "7057e3b0-358d-4e52-9361-8a12138779e7").update(Buffer.from(payload, 'utf8')).digest('hex').toLowerCase();
console.log("pringintg", digest);