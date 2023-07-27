import {ALBUM_CREATE, ALBUM_DELETE, ALBUM_DETAILS, ALBUMS_LIST, LOGIN, PRICING, RECOVER_PASSWORD_BY_TOKEN, RECOVER_TOKEN, RESET_PASSWORD, USER_STAT} from "./const.js";
import requester, {multipartRequester, publicRequester} from "./axios.js";

export const login = async (data) => {
    return await requester.post(`${LOGIN}`, data)
}

export const resetPassword = async (data) => {
    return await requester.post(`${RESET_PASSWORD}`, data)
}

export const recoverPasswordByToken = async (data) => {
    return await requester.post(`${RECOVER_PASSWORD_BY_TOKEN}`, data)
}

export const recoverToken = async (data) => {
    return await requester.post(`${RECOVER_TOKEN}`, data)
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
    return await publicRequester.get(`${PRICING}`)
}

export const deleteAlbum = async (url) => {
    return await requester.post(`${ALBUM_DELETE}`, {url})
}

export const createAlbum = async (formData) => {
    return await multipartRequester.post(`${ALBUM_CREATE}`, formData)
}