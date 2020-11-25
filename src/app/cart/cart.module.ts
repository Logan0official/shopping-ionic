import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';

import { CartPageRoutingModule } from './cart-routing.module';
import { ShortenPipe } from '../shared/pipe/shorten.pipe';
import { CartComponent } from './cart/cart.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';
import { FilterPipe } from '../shared/pipe/filter.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CartPage }]),
    CartPageRoutingModule,
  ],
  declarations: [CartPage, CartComponent, CartCalculatorComponent , ShortenPipe, FilterPipe],
  exports: [CartComponent, CartCalculatorComponent]
})
export class CartPageModule {}
