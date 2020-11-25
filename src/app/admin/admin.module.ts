import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ShortenPipe } from '../shared/pipe/shorten.pipe';
import { AdminComponent } from './admin/admin.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FilterPipe } from '../shared/pipe/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage, AdminComponent, ProductAddComponent, ProductEditComponent, ShortenPipe, FilterPipe],
  exports: [AdminComponent, ProductAddComponent, ProductEditComponent]
})
export class AdminPageModule {}
