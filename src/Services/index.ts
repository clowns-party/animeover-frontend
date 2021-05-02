import { Service as AuthService } from "./AuthService";
import { Service as AnimeService } from "./AnimeService";
import { Api } from "./Api";

class Services {
  public authService: AuthService;
  public animeService: AnimeService;
  private api: Api;
  constructor() {
    this.init();
    this.authService = new AuthService(this.api.instance);
    this.animeService = new AnimeService(this.api.instance);
  }
  init() {
    this.api = new Api();
  }
}

export const service = new Services();
