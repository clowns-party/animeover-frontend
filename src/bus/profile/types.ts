import { UserSchema } from "bus/auth/types";

export type UpdateUserFormData = {
  displayName: string;
  photoURL: string | null;
};
export type UserUpdateResponse = {
  data: UserSchema;
};
