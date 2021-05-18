import { Service as AuthService } from "./AuthService";
import { Service as AnimeService } from "./AnimeService";
import { Service as UserService } from "./UserService";
import { Api } from "./Api";

class Services {
  public authService: AuthService;
  public animeService: AnimeService;
  public userService: UserService;
  private api: Api;
  constructor() {
    this.init();
    this.authService = new AuthService(this.api.instance);
    this.animeService = new AnimeService(this.api.instance);
    this.userService = new UserService(this.api.instance);
  }
  init() {
    this.api = new Api();
  }
}

export const service = new Services();
