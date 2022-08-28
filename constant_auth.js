//expo-auth-session + google creds. Maybe it's better to refactor this to get from ENV instead of constants.
export default Object.freeze({
    IOS_CLIENT_ID: "382648074525-3bh0jsq03ut910i367er4djqp2fm0iok.apps.googleusercontent.com",
    EXPO_CLIENT_ID: "382648074525-luus5lp62g7f13fjsq8h19poe2541ltr.apps.googleusercontent.com",
    ANDROID_CLIENT_ID: "382648074525-4ll05bhmc1od6ubeu4n4ri2omjhs88mj.apps.googleusercontent.com",
    WEB_CLIENT: "382648074525-luus5lp62g7f13fjsq8h19poe2541ltr.apps.googleusercontent.com",
    SCOPES: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ]
})
