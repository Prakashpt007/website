
import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
  host: {'id': 'commonHeader'},
  standalone: true,
  imports: [CommonModule]
})
export class CommonHeaderComponent {
  theme!: any;

  constructor (

  ) { }

  ngOnInit (): void {
    this.setTheme(this.getPreferredTheme());

  }

  getStoredTheme () {
    if (localStorage.getItem("theme") == null) {
      this.changeTheme("auto");
    }

    return localStorage.getItem("theme");
  }

  setStoredTheme (theme: any) {
    localStorage.setItem("theme", theme);
  }

  getPreferredTheme () {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  setTheme (theme: any) {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.theme = "auto";
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      this.theme = "auto";
      document.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      this.theme = theme;
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  }

  changeTheme (theme: string) {
    this.setStoredTheme(theme);
    this.setTheme(theme);
  }
}
