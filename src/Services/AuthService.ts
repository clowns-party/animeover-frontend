import { AxiosResponse } from "axios";
import { AuthFormData, User, UserSchema } from "bus/auth/types";
import autoBind from "auto-bind";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { Api } from "./Api";

export class Service extends Api {
  constructor() {
    super();
    autoBind(this);
  }
  me(
    context?: GetServerSidePropsContext<ParsedUrlQuery>
  ): Promise<AxiosResponse<User>> {
    return this.getInstance(context).post<User>("/auth/me");
  }

  auth(payload: AuthFormData): Promise<AxiosResponse<User>> {
    return this.getInstance().post<User>("/auth", null, {
      params: {
        email: payload.email,
        password: payload.password,
      },
    });
  }

  signUp(authData: AuthFormData): Promise<AxiosResponse<UserSchema>> {
    return this.getInstance().post<UserSchema>("/auth/signup", null, {
      params: {
        email: authData.email,
        password: authData.password,
      },
    });
  }
}
