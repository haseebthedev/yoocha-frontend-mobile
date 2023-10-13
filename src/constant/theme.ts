const PRIMARY_COLOR = '#fc5c65'

const BACKGROUND_COLOR = '#F2F4F9'
const BLUE = '#0a2d51'
const BUTTON_COLOR = '#fc5c65'
const BACKGROUND_COLOR_ANDROID = '#FFFFFF'
const BORDER_COLOR = '#CFCFCF'
const DARK_BLUE = '#F7F5F5'
const DIVIDER = '#EBEBEB'
const WHITE = '#FFFFFF'
const BLACK = '#000000'
const LIGHT_BLACK = '#181c1f'
const TEXTCOLOR_DARKGREY = '#7D8690'
const DISABLED = '#7D8690'
const TEXTCOLOR_GREEN = '#04C424'
const FACEBOOK = '#3B5998'
const GOOGLE = '#DE5246'
const ERROR = '#FF0000'

const WHITE_GRAY = '#E6E6E6'
const SUCCESS = '#62D19E'
const OVERLAY = 'rgba(0, 0, 0, 0.7)'
const OVERLAYHALF = 'rgba(0, 0, 0, 0.5)'
const OVERLAYLIGHT = 'rgba(252,92,101,0.3)'

const LIGHT_YELLOW = '#FCE8BC'
const LIGHT_RED = '#FFD7D9'
const LIGHT_GREY = '#c1c1c1'

const RED = '#f31919'
const YELLOW = '#d6ba01'
const PURPLE = '#7d24c1'
const GOLD = '#FFD700'
const ORANGE = '#FFA500'

const theme = {
  brand: {
    primary: PRIMARY_COLOR,
  },
  text: {
    label: BLACK,
    labelWhite: WHITE,
    labelGrey: TEXTCOLOR_DARKGREY,
    primaryLabel: PRIMARY_COLOR,
    disabledLabel: TEXTCOLOR_DARKGREY,
    heading: BUTTON_COLOR,
    input: BLACK,
    primaryBody: WHITE,
    secondaryBody: TEXTCOLOR_DARKGREY,
    placeholder: TEXTCOLOR_DARKGREY,
    title: BLACK,
    brandTitle: PRIMARY_COLOR,
    subtitle: TEXTCOLOR_DARKGREY,
    overlayTitle: WHITE,
    error: ERROR,
  },
  border: {
    active: PRIMARY_COLOR,
    disabled: DISABLED,
  },
  ui: {
    button: BUTTON_COLOR,
    background: BLACK,
    backgroundAndroid: BACKGROUND_COLOR_ANDROID,
    backgroundWhite: WHITE,
    backgroundPrimary: DARK_BLUE,
    Border: BORDER_COLOR,
    overlay: OVERLAY,
    overlayMedium: OVERLAYHALF,
    overlayLight: OVERLAYLIGHT,

    dotActive: PRIMARY_COLOR,
    dotInactive: DISABLED,
    success: SUCCESS,
  },
  navigation: {
    bottomTabBarBackground: WHITE,
    bottomTabBarText: TEXTCOLOR_DARKGREY,
    bottomTabBarSelected: BUTTON_COLOR,
    bottomTabBarBorderColor: BUTTON_COLOR,
    //Top TabBar Color
    topNavigationBarBackground: BUTTON_COLOR,
    topNavigationBarText: WHITE,
    topTabBarUnderline: WHITE,
  },

  status: {
    accepted: BLUE,
    completed: TEXTCOLOR_GREEN,
    rejected: RED,
    pending: ORANGE,
    notAppeared: TEXTCOLOR_DARKGREY,
    notAccepted: YELLOW,
  },
  custom: {
    facebook: FACEBOOK,
    google: GOOGLE,
    white: WHITE,
    black: BLACK,
    red: RED,
    light_yellow: LIGHT_YELLOW,
    light_black: LIGHT_BLACK,
    light_grey: LIGHT_GREY,
    yellow: YELLOW,
    purple: PURPLE,
  },
  unique: {
    gold: GOLD,
  },
}

export { theme }
