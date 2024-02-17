export interface ScreensOptionI {
  id: number;
  title: string;
  screenName: string;
}

export interface MenuI {
  isVisible: boolean;
  setMenuVisible: (value: boolean) => void;
}
