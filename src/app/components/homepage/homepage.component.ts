import { Component, input, computed, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { CardFeedComponent } from '../card-feed/card-feed.component';
import { DataService } from '../../services/dataservice.service';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [CommonModule, MatGridListModule, CardFeedComponent],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
	private dataService = inject(DataService);
	feeds: any[] = [];
	selectedFeedName = input<string>('ALL');

	filteredFeeds = computed(() => {
		const selected = this.selectedFeedName();
		if (!selected || selected === 'ALL') return this.feeds;
		return this.feeds.filter(f => f.source === selected);
	});

	async ngOnInit() {
		this.feeds = await this.dataService.getData();
	}
}