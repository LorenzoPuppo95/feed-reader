import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataService } from '../../services/dataservice.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-homepage',
	imports: [MatGridListModule, CommonModule],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {
	feeds: any[] = [];

	constructor(private dataService: DataService) { }

	async ngOnInit(): Promise<void> {
		this.feeds = await this.dataService.getData();
	}
}
