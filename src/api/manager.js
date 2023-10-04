import {
    ALBUM_CREATE,
    ALBUM_DELETE,
    ALBUM_DETAILS, ALBUM_DETAILS_PUBLIC, ALBUM_FULL_IMAGE,
    ALBUM_UPDATE_BY_ID,
    ALBUMS_LIST,
    LOGIN,
    TARIFF_PRICING,
    RECOVER_PASSWORD_BY_TOKEN,
    RECOVER_TOKEN,
    RESET_PASSWORD,
    USER_STAT, TARIFF_ACTIVATE, ALBUM_CREATE_ANON, ALBUM_FULL_IMAGE_PUBLIC, ALBUM_DELETE_PUBLIC, AUTH_TOKEN, TARIFF_OFFER
} from "./const.js";
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
export const getTariff = async (option, use_year_discount) => {
    return await requester.post(`${TARIFF_ACTIVATE}`, {option, use_year_discount})
}
export const deleteAlbum = async (url) => {
    return await requester.post(`${ALBUM_DELETE}`, {url})
}
export const getFullImage = async (index, url) => {
    return await requester.post(`${ALBUM_FULL_IMAGE}`, {index: index, url: url} )
}

/* PUBLIC REQUESTS */
export const getAlbumDetailsPublic = async (url, password) => {
    return await publicRequester.get(`${ALBUM_DETAILS_PUBLIC}/${url}/${password}`)
}
export const getFullImagePublic = async (url, password, index) => {
    return await publicRequester.get(`${ALBUM_FULL_IMAGE_PUBLIC}/${url}/${password}/${index}`)
}
export const getPricing = async () => {
    return await publicRequester.get(`${TARIFF_PRICING}`)
}
export const getPromotionTariff = async () => {
    return await publicRequester.get(`${TARIFF_OFFER}`)
}
export const deleteAlbumPublic = async (url, password) => {
    return await publicRequester.get(`${ALBUM_DELETE_PUBLIC}/${url}/${password}`)
}


/* MULTIPART REQUESTS */
export const createAlbum = async (formData) => {
    return await multipartRequester.post(`${ALBUM_CREATE}`, formData)
}
export const createAlbumPublic = async (formData) => {
    return await multipartRequester.post(`${ALBUM_CREATE_ANON}`, formData)
}
export const updateAlbum = async (formData) => {
    return await multipartRequester.post(`${ALBUM_UPDATE_BY_ID}`, formData)
}