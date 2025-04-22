import { CommonModule } from '@angular/common';
import { Component, input, output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
	selector: 'app-drawer',
	standalone: true,
	imports: [ MatListModule, CommonModule, MatSidenavModule ],
	templateUrl: './drawer.component.html',
	styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
	constructor(private router: Router) {}

	feeds: any[] = [];
	isSidebarOpen = input(false);
	feedSelected = output<string>();
	selected: string = 'ALL'; // tiene traccia di quale feed è selezionato

	ngOnInit() {
		const savedData = localStorage.getItem('feeds');
		this.feeds = savedData ? JSON.parse(savedData) : [];
	}

	getFeedKey(feed: any): string {
		if (feed.type === 'reddit') {
			const name = (feed.subreddit || '').trim();
			return name.startsWith('r/') ? `/${name}` : `/r/${name}`;
		}
		return feed.name;
	}

	selectFeed(feed: any | string) {
		if (typeof feed === 'string') {
			this.selected = feed;
			this.feedSelected.emit(feed);
		} else {
			const key = this.getFeedKey(feed);
			this.selected = key;
			this.feedSelected.emit(key);
		}
		this.router.navigate(['/']);
	}
}
