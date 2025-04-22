import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-card-feed',
	imports: [CommonModule, MatIcon],
	templateUrl: './card-feed.component.html',
	styleUrl: './card-feed.component.scss'
})
export class CardFeedComponent {

	post = input<any>();


	saveFavorite() {
		const myFavorites = JSON.parse(localStorage.getItem('favorites') || '[]'); //parsa i dati da localstorage key 'favorites' se non c'è ancora crea nuovo array
		const currentPostLink = this.post().link;

		let alreadySaved = false;

		for (const favorite of myFavorites) {
			if (favorite.link === currentPostLink) {
				alreadySaved = true;
				break;
			}
		}
		if (!alreadySaved) {
			myFavorites.push(this.post());
			localStorage.setItem('favorites', JSON.stringify(myFavorites));
			alert('Aggiunto ai preferiti!');
		} else {
			alert('Già nei preferiti');
		}
	}

	shareLink() {
		if (navigator.share) { //mostra pannello condividi, se supportato da browser
			navigator.share({
				title: this.post().title,
				url: this.post().link
			});
		} else {
			navigator.clipboard.writeText(this.post().link); //altrimenti si limita a copiare il link diretto
			alert('Link copiato!');
		}
	}

	openLinkInNewTab() {
		window.open(this.post().link, '_blank');
	}

}
