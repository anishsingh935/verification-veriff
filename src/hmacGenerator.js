import { API_SECRETE_KEY } from "./constant";
import CryptoJS from "crypto-js";

export const getHMACcode = async (payload) => {
    payload = JSON.stringify(payload);
    const hash = await CryptoJS.HmacSHA256(payload, API_SECRETE_KEY).toString(CryptoJS.enc.Hex);
    return hash;
};
