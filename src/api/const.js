export const BASE_URL = import.meta.env.VITE_API_URL
export const FRONT_URL = window.location.hostname
export const BASE_API_URL = BASE_URL + '/api'

/* USER PROFILE */
export const REGISTER = '/user/register'
export const LOGIN = '/user/login'
export const REFRESH = '/token/refresh'
export const RECOVER_PASSWORD_BY_TOKEN = '/password/recover'
export const RESET_PASSWORD = '/password/reset'
export const RECOVER_TOKEN = '/password/new'
export const USER_STAT = '/user/stat'

/* ALBUMS */
export const ALBUMS_LIST = '/album/list'
export const ALBUM_DETAILS = '/album/get'
export const ALBUM_DELETE = '/album/remove'
export const ALBUM_FULL_IMAGE = '/album/fetch'
export const ALBUM_DETAILS_PUBLIC = '/album/shared/get'       // /{url}/{password}
export const ALBUM_FULL_IMAGE_PUBLIC = '/album/shared/fetch'  // /{url}/{password}/{index}
export const ALBUM_CREATE = '/album/upload'
export const ALBUM_UPDATE_BY_ID = '/album/update/'

/* TARIFF */
export const TARIFF_PRICING = '/tariff/pricing'
export const TARIFF_ACTIVATE = '/tariff/activate'

/* CONSTANTS */
export const AUTH_TOKEN = 'AUTH_TOKEN'
export const VALIDATION_MIN_PASSWORD_LENGTH = 5


