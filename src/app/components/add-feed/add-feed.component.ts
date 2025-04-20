import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-feed',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
	],
	templateUrl: './add-feed.component.html',
	styleUrls: ['./add-feed.component.scss'],
})
export class AddFeedComponent {
	feedForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router) {
		this.feedForm = this.fb.group({
			name: ['', Validators.required],
			type: ['rss', Validators.required], // rss o reddit
			value: ['', Validators.required], // url se rss, name se reddit
			categories: this.fb.array([]) //aggiungi formarray
		});
	}

	get categories(): FormArray {
		return this.feedForm.get('categories') as FormArray;
	}

	addCategory(): void {
		this.categories.push(this.fb.control('', Validators.required));
	}

	removeCategory(index: number): void {
		this.categories.removeAt(index);
	}


	onSubmit(): void {
		if (this.feedForm.invalid) return;

		const { name, type, categories, value } = this.feedForm.value;
		const feedData = this.feedForm.value;
		console.log(feedData);


		const newFeed = {
			name: feedData.name,
			type: feedData.type,
			categories: feedData.categories,
			url: feedData.type === 'rss' ? value : null,
			subreddit: feedData.type === 'reddit' ? value : null,
		};

		const storedFeeds = localStorage.getItem('feeds');
		const feeds = storedFeeds ? JSON.parse(storedFeeds) : [];
		feeds.push(newFeed);
		localStorage.setItem('feeds', JSON.stringify(feeds));

		alert('Feed aggiunto!');
		this.router.navigate(['/']); // torna alla home
	}
}
