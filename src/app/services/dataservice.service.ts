import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private rssUrl = 'https://www.ilsecoloxix.it/genova/rss';

	constructor(private http: HttpClient) { }

	async getData(): Promise<any[]> {
		try {
			const xmlText = await firstValueFrom(this.http.get(this.rssUrl, { responseType: 'text' }));
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
			const items = Array.from(xmlDoc.querySelectorAll('item'));

			const result = items.map(item => ({
				title: item.querySelector('title')?.textContent || '',
				description: item.querySelector('description')?.textContent || '',
				link: item.querySelector('link')?.textContent || '',
				pubDate: item.querySelector('pubDate')?.textContent || ''
			}));

			return result;
		} catch (error) {
			console.error('Error parsing RSS feed:', error);
			return [];
		}
	}
}
