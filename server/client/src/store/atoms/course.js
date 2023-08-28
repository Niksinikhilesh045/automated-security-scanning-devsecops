import { atom } from "recoil";

export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});

export const courseDisabled = atom({
  key: "courseDisabled",
  default: false,
});
