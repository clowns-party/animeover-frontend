import { AxiosInstance, AxiosResponse } from "axios";
import { AuthFormData, User, UserSchema } from "bus/auth/types";
import autoBind from "auto-bind";
import { Api } from "./Api";

export class Service implements Api {
  public instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
    autoBind(this);
  }
  me(token?: string, refreshToken?: string): Promise<AxiosResponse<User>> {
    return !token
      ? this.instance.post<User>("/auth/me")
      : this.instance.post<User>("/auth/me", null, {
          headers: {
            Authorization: token,
            Refreshtoken: refreshToken,
          },
        });
  }

  auth(payload: AuthFormData): Promise<AxiosResponse<User>> {
    return this.instance.post<User>("/auth", null, {
      params: {
        email: payload.email,
        password: payload.password,
      },
    });
  }

  signUp(authData: AuthFormData): Promise<AxiosResponse<UserSchema>> {
    return this.instance.post<UserSchema>("/auth/signup", null, {
      params: {
        email: authData.email,
        password: authData.password,
      },
    });
  }
}
