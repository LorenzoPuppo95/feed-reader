import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, DrawerComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'feed-reader';

  isHomeSidenavOpen = false;

  openSidenav() {
    this.isHomeSidenavOpen = !this.isHomeSidenavOpen;
  }
}
