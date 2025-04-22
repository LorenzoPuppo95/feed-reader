import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
	selector: 'app-drawer',
	imports: [ MatListModule, CommonModule, MatSidenavModule ],
	templateUrl: './drawer.component.html',
	styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

	feeds: any[] = [];
	isSidebarOpen = input(false);
	ngOnInit() {
		const savedData = localStorage.getItem('feeds');
		this.feeds = savedData ? JSON.parse(savedData) : [];
	}


}
