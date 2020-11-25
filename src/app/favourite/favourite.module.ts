import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritePage } from './favourite.page';

import { FavouritePageRoutingModule } from './favourite-routing.module';
import { FavouriteComponent } from './favourite/favourite.component';
import { ShortenPipe } from '../shared/pipe/shorten.pipe';
import { FilterPipe } from '../shared/pipe/filter.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FavouritePageRoutingModule
  ],
  declarations: [FavouritePage, FavouriteComponent, ShortenPipe, FilterPipe],
  exports: [FavouriteComponent]
})
export class FavouritePageModule {}
