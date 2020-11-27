import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { ToastController } from '@ionic/angular';
import { Product } from "../model/product.model";
import { AuthService } from "../service/auth.service";

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  product: AngularFireObject<Product>;

  favouriteProducts: AngularFireList<FavouriteProduct>;
  cartProducts: AngularFireList<FavouriteProduct>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    public toastController: ToastController
  ) { }

  getProduct(index: string) {
    return this.products[index];
  }

  getProducts() {
    this.products = this.db.list("products");
    return this.products;
  }

  createProduct(data: Product) {
    this.products.push(data);

    this.addProductToast();
  }

  getProductById(key: string) {
    this.product = this.db.object("products/" + key);
    return this.product;
  }

  updateProduct(data: Product) {
    this.product.update(data);

    this.updateProductToast();
  }

  deleteProduct(key: string) {
    this.products.remove(key);

    this.deleteProductToast();
  }

  async addProductToast() {
    const toast = await this.toastController.create({
      message: 'New product added!',
      position: 'top',
      duration: 3000,
      color: 'success', 
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
        }
      ]
    });
    toast.present();
  }

  async updateProductToast() {
    const toast = await this.toastController.create({
      message: 'The product has been changed!',
      position: 'top',
      duration: 3000,
      color: 'success', 
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
        }
      ]
    });
    toast.present();
  }

  async deleteProductToast() {
    const toast = await this.toastController.create({
      message: 'The item has been deleted!',
      position: 'top',
      duration: 3000,
      color: 'danger', 
      buttons: [
        {
          side: 'start',
          icon: 'close-circle-outline',
        }
      ]
    });
    toast.present();
  }


  //  ----------  Favourite Product Function  ----------

  async getUsersFavouriteProduct() {
    const user = await this.authService.user$.toPromise();
    this.favouriteProducts = this.db.list("favouriteProducts", (ref) =>
      ref.orderByChild("userId").equalTo(user.$key)
    );
    return this.favouriteProducts;
  }

  addFavouriteProduct(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avf_item")) || [];
    a.push(data);
    setTimeout(() => {
      localStorage.setItem("avf_item", JSON.stringify(a));
    }, 500);

    this.addFavouriteToast();
  }

  getLocalFavouriteProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avf_item")) || [];

    return products;
  }

  removeFavourite(key: string) {
    this.favouriteProducts.remove(key);
  }

  removeLocalFavourite(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avf_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("avf_item", JSON.stringify(products));
    
    this.removeFavouriteToast();
  }

  async addFavouriteToast() {
    const toast = await this.toastController.create({
      message: 'The product has been added to favorites!',
      position: 'top',
      duration: 3000,
      color: 'success', 
      buttons: [
        {
          side: 'start',
          icon: 'heart',
        }
      ]
    });
    toast.present();
  } 

  async removeFavouriteToast() {
    const toast = await this.toastController.create({
      message: 'Item removed from favorites!',
      position: 'top',
      duration: 3000,
      color: 'warning', 
      buttons: [
        {
          side: 'start',
          icon: 'trash',
        }
      ]
    });
    toast.present();
  }


  //  ----------  Cart Product Function  ----------

  addToCart(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    a.push(data);
    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
    }, 500);

    this.addCartToast();
  }

  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("avct_item", JSON.stringify(products));

    this.removeCartToast();
  }

  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

  async addCartToast() {
    const toast = await this.toastController.create({
      message: 'The product has been added to cart!',
      position: 'top',
      duration: 3000,
      color: 'success', 
      buttons: [
        {
          side: 'start',
          icon: 'cart',
        }
      ]
    });
    toast.present();
  }

  async removeCartToast() {
    const toast = await this.toastController.create({
      message: 'Item removed from cart!',
      position: 'top',
      duration: 3000,
      color: 'warning', 
      buttons: [
        {
          side: 'start',
          icon: 'trash',
        }
      ]
    });
    toast.present();
  }
}

export class FavouriteProduct {
  product: Product;
  productId: string;
  userId: string;
}
