import { AxiosResponse } from "axios";
import {
  ResponseUserAnimeListType,
  UserAnimeListFormData,
} from "bus/UserAnimeList/types";
import autoBind from "auto-bind";
import { UpdateUserFormData, UserUpdateResponse } from "../bus/profile/types";
import { Api } from "./Api";

export class Service extends Api {
  constructor() {
    super();
    autoBind(this);
  }
  animeList(): Promise<ResponseUserAnimeListType> {
    return this.getInstance().get<ResponseUserAnimeListType["data"]>(
      `/user/animelist`
    );
  }
  animeListRemoveItem(animeId: string): Promise<ResponseUserAnimeListType> {
    return this.getInstance().delete<ResponseUserAnimeListType["data"]>(
      `/user/animelist?animeId=${animeId}`
    );
  }
  animeListChange(
    form: UserAnimeListFormData
  ): Promise<ResponseUserAnimeListType> {
    return this.getInstance().patch<ResponseUserAnimeListType["data"]>(
      "/user/animelist",
      null,
      {
        params: { ...form },
      }
    );
  }
  updateUser(
    form: UpdateUserFormData
  ): Promise<AxiosResponse<UserUpdateResponse>> {
    return this.getInstance().put(
      `/user/update?displayName=${form.displayName}&photoURL=${form.photoURL}`
    );
  }
}
