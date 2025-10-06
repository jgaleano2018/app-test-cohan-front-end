import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ACCESS_TOKEN} from "../models/constants";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  parsedToken: any;
  authenticated: boolean = false;
  currentUser: any;

  private storage: Storage | null = null;

  constructor(public router: Router) {

    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }

    const token = this.getToken();
    console.log("Token AUTH - Cohan ---->")
    console.log(token)

    if (token !== null && this.parsedToken == null) {
      console.log("JWT Decode -- Before To LOGIN --->")
      console.log(token)

      if (token.trim()) {
        this.parsedToken = jwtDecode(token);
      }
    }
  }

  getToken() {
    if (!this.storage) return null;
    return localStorage.getItem(ACCESS_TOKEN);
  }

  setAuthentication(accessToken: string) {
    if (!this.storage) return;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    this.authenticated = true;
  }

  logout() {
    if (!this.storage) return;
    localStorage.removeItem(ACCESS_TOKEN);
    this.authenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

}
