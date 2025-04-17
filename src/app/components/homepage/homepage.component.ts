import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { DataService } from '../../services/dataservice.service';

@Component({
  selector: 'app-homepage',
  imports: [MatGridListModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {
  rssFeed: string = '';
  constructor(private dataService: DataService) {}


  data: any;

  ngOnInit(): void {
    this.data = this.dataService.getData();
    render(this.data);
  }
}

function render(data: any) {
  const feedContainer = document.getElementById('feed-container');
  if (feedContainer) {
    feedContainer.innerHTML = '';
    const items = data['activeElement']['innerHtml'].querySelectorAll('item');
    items.forEach((item: any) => {
      
    });
  }
}

