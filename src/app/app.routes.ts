import { Routes } from '@angular/router';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'add-feed', component: AddFeedComponent },
];