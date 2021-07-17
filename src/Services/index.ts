import { Service as AnimeService } from "./AnimeService";
import { Service as AuthService } from "./AuthService";
import { Service as UserService } from "./UserService";

class Services {
  public authService: AuthService;
  public animeService: AnimeService;
  public userService: UserService;
  constructor() {
    this.authService = new AuthService();
    this.animeService = new AnimeService();
    this.userService = new UserService();
  }
}

export default new Services();
