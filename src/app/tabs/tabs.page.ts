import { Component } from '@angular/core';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public productService: ProductService
  ) { }
}
