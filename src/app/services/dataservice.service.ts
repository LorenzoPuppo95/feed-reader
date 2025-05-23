import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
	constructor() { }

	async getData(): Promise<any[]> {

		const feeds = this.getSavedFeeds();
		const allPosts: any[] = [];

		for (const feed of feeds) {
			const posts = await this.getFeedPosts(feed);
			allPosts.push(...posts.map(post => ({ ...post, source: this.getFeedSource(feed) })));
		}

		return allPosts;
	}

	private getSavedFeeds(): any[] {
		const savedData = localStorage.getItem('feeds');
		return savedData ? JSON.parse(savedData) : [];
	}

	private getFeedSource(feed: any): string {
		if (feed.type === 'reddit') {
			const name = (feed.subreddit || '').trim();
			return name.startsWith('r/') ? `/${name}` : `/r/${name}`;
		} else {
			return feed.name;
		}
	}

	private async getFeedPosts(feed: any): Promise<any[]> {
		try {
			if (feed.type === 'rss') {
				return this.parseRss(feed.url);
			}
			if (feed.type === 'reddit') {
				return this.parseReddit(feed.subreddit);
			}
		} catch (err) {
			console.error(`Errore nel feed ${feed.name}:`, err);
		}
		return [];
	}

	private async parseRss(url: string): Promise<any[]> {
		if (!url?.startsWith('http')) {
			return [];
		}

		try {
			const response = await fetch(url);
			const xmlText = await response.text();

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

			if (xmlDoc.querySelector('parsererror')) {
				console.warn('Parsing RSS fallito:', xmlDoc.querySelector('parsererror')?.textContent);
				return [];
			}

			return Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
				title: item.querySelector('title')?.textContent || '',
				description: item.querySelector('description')?.textContent || '',
				link: item.querySelector('link')?.textContent || '',
				pubDate: item.querySelector('pubDate')?.textContent || ''
			}));
		} catch (err) {
			console.error('Errore nel fetch RSS:', err);
			return [];
		}
	}


	private async parseReddit(subreddit: string): Promise<any[]> {
		const name = subreddit?.trim().replace(/^r\//i, '');
		const res = await fetch(`https://www.reddit.com/r/${name}.json`);
		const json = await res.json();

		return json.data.children.map((child: any) => ({
			title: child.data.title,
			description: child.data.selftext || '',
			link: `https://reddit.com${child.data.permalink}`,
			pubDate: new Date(child.data.created_utc * 1000).toUTCString(),
			image: child.data.thumbnail, // aggiungi l'immagine
		}));
	}

}
