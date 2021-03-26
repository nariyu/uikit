import { atom } from 'recoil';

interface UserInfo {
  username: string;
  profileImageUrl: string;
  email: string;
  phoneNumber: string;
  happy: boolean;
}

export const defaultUserInfo: UserInfo = {
  username: 'nariyu',
  profileImageUrl:
    'https://s.gravatar.com/avatar/fad811287984696321fe0297077833b4?s=300',
  email: 'nariyu@example.com',
  phoneNumber: '09012345678',
  happy: false,
};

export const userInfoState = atom<UserInfo | undefined>({
  key: 'userInfoState',
  default: defaultUserInfo,
});
