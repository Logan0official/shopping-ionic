import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './cart.page';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
    children: [
      { path: '', component: CartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule {}
