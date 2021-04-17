// Core
import { AxiosInstance, AxiosResponse } from "axios";
// Types
import { AuthFormData, User, UserSchema } from "../bus/auth/types";
import { Anime, IdType } from "../bus/anime/types";
import { axiosInstace } from "../../axios/axios.instance";

export class Api {
  public baseUrl: string;
  public instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstace;
    // Methods
    this.animeList = this.animeList.bind(this);
    this.signUp = this.signUp.bind(this);
    this.auth = this.auth.bind(this);
    this.me = this.me.bind(this);
    this.ongoingList = this.ongoingList.bind(this);
    this.anime = this.anime.bind(this);
  }

  me(token?: string): Promise<AxiosResponse<User>> {
    return !token
      ? this.instance.post<User>("/auth/me")
      : this.instance.post<User>("/auth/me", null, {
          headers: {
            Authorization: token,
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

  animeList(): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>("/animedb?limit=30");
  }

  ongoingList(): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>("/ongoing");
  }

  anime(id: IdType): Promise<AxiosResponse<Anime>> {
    return this.instance.get<Anime>(`/animedb/anime/${id}`);
  }
}

// прописывать bind в constructor

export const service = new Api();
