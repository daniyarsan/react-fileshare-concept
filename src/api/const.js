export const BASE_URL = window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL : '/api'
export const API_URL = 'megapics.pm'

export const BASE_API_URL = BASE_URL + '/'

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
export const ALBUM_FULL_IMAGE = '/album/fetch'
export const ALBUM_DELETE = '/album/remove'

export const ALBUM_DETAILS_PUBLIC = '/album/shared/get'
export const ALBUM_DELETE_PUBLIC = '/album/shared/remove' // /{url}/{password}
export const ALBUM_FULL_IMAGE_PUBLIC = '/album/shared/fetch'  // /{url}/{password}/{index}

export const ALBUM_CREATE = '/album/upload'
export const ALBUM_CREATE_ANON = '/album/anon/upload'
export const ALBUM_UPDATE_BY_ID = '/album/update'

export const DOWNLOAD = '/download' // /{url}

/* TARIFF */
export const TARIFF_PRICING = '/tariff/pricing'
export const TARIFF_ACTIVATE = '/tariff/activate'
export const TARIFF_OFFER = '/tariff/offer'

/* CONSTANTS */
export const AUTH_TOKEN = 'AUTH_TOKEN'
export const VALIDATION_MIN_PASSWORD_LENGTH = 5
export const VALIDATION_DEFAULT_FILES_UPLOAD_LIMIT = 2
export const DEFAULT_SHELF_DAYS_LIMIT = 30
export const REGISTRATION_USERNAME_LIMIT = 200
export const ALBUM_FORM_NAME_LIMIT = 300
export const ALBUM_FORM_TEXTAREA_LIMIT = 450


