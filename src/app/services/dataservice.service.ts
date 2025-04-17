import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rssUrl = 'https://www.ilsecoloxix.it/genova/rss';

  constructor() { }

  getData(){
    fetch(this.rssUrl)
    .then(response => response.text())
    .then(str => {
      const parser = new DOMParser();
      return parser.parseFromString(str, "text/xml");
    })
    .then(data => {data;console.log(data)})
    .catch(error => {
      console.error("Error fetching RSS feed:", error);
    });
  }
}
