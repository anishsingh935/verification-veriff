import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const { BASE_URL, API_KEY, HMAC_SIGNATURE } = require('./constant');

export const createUser = async () => {
    const userData = {
        "verification": {
            "callback": "https://veriff.me",
            "vendorData": uuidv4(),
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'X-AUTH-CLIENT': API_KEY,
    };

    try {
        const response = await axios.post(`${BASE_URL}/v1/sessions/`, userData, { headers });
        console.log('User created successfully. Response:', JSON.stringify(response?.data?.verification, 2, null));
        return response?.data?.verification;
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
};

export const uploadImages = async (image64, sessionID, imageType) => {

    let imagePayload;

    if (imageType === 'front') {
        imagePayload = {
            "image": {
                "context": "document-front",
                "content": image64
            }
        }
    }

    if (imageType === 'back') {
        imagePayload = {
            "image": {
                "context": "document-back",
                "content": image64
            }
        }
    }

    if (imageType === 'selfi') {
        imagePayload = {
            "image": {
                "context": "face",
                "content": image64
            }
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'X-AUTH-CLIENT': API_KEY,
        'X-HMAC-SIGNATURE': HMAC_SIGNATURE
    };

    try {
        const response = await axios.post(`${BASE_URL}/v1/sessions/${sessionID}/media`, imagePayload, { headers });
        console.log('Image uploaded successfully. Response:', JSON.stringify(response?.data, 2, null));
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
};

export const submitSession = async (sessionID) => {

    const submitPayload = {
        "verification": {
            "status": "submitted"
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'X-AUTH-CLIENT': API_KEY,
        'X-HMAC-SIGNATURE': HMAC_SIGNATURE
    };

    try {
        const response = await axios.patch(`${BASE_URL}/v1/sessions/${sessionID}`, submitPayload, { headers });
        console.log('Session submitted successfully. Response:', response.data);
        return response?.data
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
};

export const getSessionResult = async (sessionID) => {

    const headers = {
        'Content-Type': 'application/json',
        'X-AUTH-CLIENT': API_KEY,
        'X-HMAC-SIGNATURE': HMAC_SIGNATURE
    };

    try {
        const response = await axios.get(`${BASE_URL}/v1/sessions/${sessionID}/decision`, { headers });
        console.log('Session result fetched. Response:', response.data);
        return response?.data
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
};