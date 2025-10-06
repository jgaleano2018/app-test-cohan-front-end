import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-test-cohan-front-end');

  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  constructor() {
    this.initSvgIcons();
  }

  private initSvgIcons() {
    this.matIconRegistry.addSvgIcon(
      'google_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/google_logo.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'github_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/github_logo.svg'
      )
    );
  }
}
