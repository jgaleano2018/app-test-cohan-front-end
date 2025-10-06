import {Component, OnInit} from '@angular/core';
import {AuthProvider, UserProfile} from "../../../models/auth";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from '../../../service/auth.service';
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../../service/api.service";
import {ACCESS_TOKEN} from "../../../models/constants";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authProvider: AuthProvider = AuthProvider.provider;
  token!: string;
  userInfo!: UserProfile;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log("Starting profile view....");
    
    this.route.paramMap.subscribe(params => {
      this.authProvider = params.get('authProvider') as AuthProvider;
    });

    let item = localStorage.getItem(ACCESS_TOKEN);
    
    console.log("Item profile:: " + item);

    if (item) {
      this.token = item;

      this.apiService.getUserInfo()
        .subscribe({
          next: (data) => {
            this.userInfo = data;
          },
          error: (error) => {
            this.toastrService.error(JSON.stringify(error.error.message, null, '\t'));
          }
        })
    } else {
      this.authService.logout();
    }
  }

  getAuthProviderDisplayName(authProvider: AuthProvider): string {
    switch (authProvider) {
      case AuthProvider.github:
        return 'GitHub';
      case AuthProvider.google:
        return 'Google';
      case AuthProvider.local:
        return 'Email/Password';
      default:
        return 'Unknown';
    }
  }

}
