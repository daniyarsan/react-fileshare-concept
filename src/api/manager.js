import {ALBUM_DELETE, ALBUM_DETAILS, ALBUMS_LIST, LOGIN, PRICING, USER_STAT} from "./const.js";
import requester from "./axios.js";

export const login = async (data) => {
    return await requester.post(`${LOGIN}`, data)
}

export const getUserStat = async () => {
    return await requester.get(`${USER_STAT}`)
}

export const getAlbumsList = async () => {
    return await requester.post(`${ALBUMS_LIST}`)
}

export const getAlbumDetails = async (url) => {
    return await requester.post(`${ALBUM_DETAILS}`, {url})
}

export const getPricing = async () => {
    return await requester.get(`${PRICING}`)
}

export const deleteAlbum = async (url) => {
    return await requester.post(`${ALBUM_DELETE}`, {url})
}