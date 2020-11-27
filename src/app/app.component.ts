import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/service/auth.service';
import { ProductService } from './shared/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService, 
    public productService: ProductService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();

    this.logoutToast();
  }

  async logoutToast() {
    const toast = await this.toastController.create({
      message: 'You are signed out!',
      position: 'top',
      duration: 3000,
      color: 'warning', 
      buttons: [
        {
          side: 'start',
          icon: 'warning-outline',
        }
      ]
    });
    toast.present();
  }
}
