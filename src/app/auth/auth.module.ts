import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { AuthService } from '../shared/service/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FireBaseConfig } from 'src/environments/firebase.config';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from '../shared/service/user.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireDatabaseModule,
  ],
  declarations: [AuthPage, AuthComponent],
  providers: [AuthService, UserService]
})
export class AuthPageModule {}
