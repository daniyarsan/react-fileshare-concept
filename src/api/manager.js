import {ALBUMS_DETAILS, ALBUMS_LIST, LOGIN_URL, PRICING, USER_STAT} from "./const.js";
import requester from "./axios.js";

export const login = async (data) => {
    return await requester.post(`${LOGIN_URL}`, data)
}

export const getUserStat = async () => {
    return await requester.get(`${USER_STAT}`)
}

export const getAlbumsList = async () => {
    return await requester.post(`${ALBUMS_LIST}`)
}

export const getAlbumDetails = async (url) => {
    return await requester.post(`${ALBUMS_DETAILS}`, {url})
}

export const getPricing = async () => {
    return await requester.get(`${PRICING}`)
}
