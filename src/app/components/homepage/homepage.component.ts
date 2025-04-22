import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataService } from '../../services/dataservice.service';
import { CommonModule } from '@angular/common';
import { CardFeedComponent } from '../card-feed/card-feed.component';

@Component({
	selector: 'app-homepage',
	imports: [MatGridListModule, CommonModule, CardFeedComponent],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {
	feeds: any[] = [];

	constructor(private dataService: DataService) { }

	async ngOnInit(): Promise<void> {
		try {
		  this.feeds = await this.dataService.getData();
		  console.log('FEED CARICATI:', this.feeds);
		} catch (e) {
		  console.error('Errore nel caricamento dei feed:', e);
		  this.feeds = [];
		}
	  }
	  
}
