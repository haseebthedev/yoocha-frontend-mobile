export interface MenuOptionI {
  id: number;
  title: string;
  onPress?: () => void;
}
export interface MenuI {
  isVisible: boolean;
  menuOptions: MenuOptionI[];
  setMenuVisible: (value: boolean) => void;
  setMenuOption?: (item: MenuOptionI) => void;
}
