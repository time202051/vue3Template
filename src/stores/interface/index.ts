export interface AuthState {
  routeName: string;
  authButtonList: {
    [key: string]: string[];
  };
  authMenuList: Menu.MenuOptions[];
}

export interface UserState {
  token: string;
  userInfo: {
    name: string;
  };
}
