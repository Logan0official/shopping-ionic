import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsPage } from './products.page';

import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ShortenPipe } from '../shared/pipe/shorten.pipe';
import { FilterPipe } from '../shared/pipe/filter.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage, ProductListComponent, ShortenPipe, FilterPipe],
  exports: [ProductListComponent]
  
})
export class ProductsPageModule {}
