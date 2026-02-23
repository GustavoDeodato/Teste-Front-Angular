import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'new-item', component: ItemFormComponent },
  { path: 'edit-item/:id', component: ItemFormComponent }
];
