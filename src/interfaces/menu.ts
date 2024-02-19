export interface MenuOptionsI {
  id: number;
  title: string;
  screenName: string;
  onPress?: () => void;
}

export interface MenuI {
  isVisible: boolean;
  setMenuVisible: (value: boolean) => void;
  menuOptions: MenuOptionsI[];
}
