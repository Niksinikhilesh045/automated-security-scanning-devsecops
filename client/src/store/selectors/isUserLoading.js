import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLoading = selector({
  key: "isUserLoading",
  get: ({ get }) => {
    const state = get(userState);
    if (state) {
      return state.isLoading;
    }
    return true;
  },
});
