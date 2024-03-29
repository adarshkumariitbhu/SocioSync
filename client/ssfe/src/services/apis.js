const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL +  "/auth/login",
  FORGOTPASSWORD_API: BASE_URL + "/auth/forgotPassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  // UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  //  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  GET_ALL_USERS_API: BASE_URL + "/profile/getallusers",
}

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}
// Profile SETTINGS PAGE API
export const profileSettingsEndpoints ={
  UPDATE_DISPLAY_PICTURE_API:BASE_URL + "/profile/updatedisplaypicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/auth/deleteAccount"
}
export const friendsEndpoints = {
  SEND_REQUEST_API: BASE_URL + "/friends/sendrequest",
  ACCEPT_REQUEST_API: BASE_URL + "/friends/acceptrequest",
  DELETE_REQUEST_API: BASE_URL + "/friends/deleterequest",
  REJECT_REQUEST_API: BASE_URL + "/friends/rejectrequest",
}

export const chatEndpoints = {
  SEARCH_API: BASE_URL + "/search",
}