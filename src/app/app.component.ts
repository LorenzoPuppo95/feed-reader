import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, MatSidenavModule, DrawerComponent, HomepageComponent, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	constructor(private router: Router) {}

	currentFeedName = signal('ALL');

	onFeedSelected(feedName: string) {
		console.log('Hai cliccato il feed:', feedName);
		this.currentFeedName.set(feedName);
	}

	isHomepage(): boolean {
        return this.router.url === '/';
    }
}
