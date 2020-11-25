import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritePage } from './favourite.page';
import { FavouriteComponent } from './favourite/favourite.component';

const routes: Routes = [
  {
    path: '',
    component: FavouritePage,
    children: [
      { path: '', component: FavouriteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritePageRoutingModule {}
