import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/service/user.service";
import { AuthService } from "../../shared/service/auth.service";
import { User } from "../../shared/model/user.model";
import { ToastController } from '@ionic/angular';
declare var $: any;
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  providers: [EmailValidator],
})
export class AuthComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: "",
  };

  login = true;
  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController
  ) {
    this.createUser = new User();
  }

  ngOnInit() { }

  addUser(userForm: NgForm) {
    userForm.value["isAdmin"] = false;
    this.authService
      .createUserWithEmailAndPassword(
        userForm.value["emailId"],
        userForm.value["password"]
      )
      .then((res) => {
        const user = {
          email: res.user.email,
          uid: res.user.uid,
        };

        this.userService.createUser(user);

        this.addUserToast();

        setTimeout((router: Router) => {
          $("#createUserForm").modal("hide");
          this.router.navigate(["/"]);
        }, 500);
      })
      .catch((err) => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        this.errorAddUserToast();
      });
  }

  async addUserToast() {
    const toast = await this.toastController.create({
      message: 'User Registeration!',
      position: 'top',
      duration: 3000,
      color: 'success', 
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async errorAddUserToast() {
    const toast = await this.toastController.create({
      message: 'A user with this email address already exists!',
      position: 'top',
      duration: 3000,
      color: 'danger', 
      buttons: [
        {
          side: 'start',
          icon: 'close-circle-outline',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  signInWithEmail(userForm: NgForm) {
    this.authService
      .signInRegular(userForm.value["emailId"], userForm.value["loginPassword"])
      .then((res) => {
        this.loginUserToast();

        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "/"]);
        }, 500);

        this.router.navigate(["/"]);
      })
      .catch((err) => {
        this.errorLoginUserToast();
      });
  }

  async loginUserToast() {
    const toast = await this.toastController.create({
      message: 'Authentication Success!',
      position: 'top',
      duration: 3000,
      color: 'success', 
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async errorLoginUserToast() {
    const toast = await this.toastController.create({
      message: 'Invalid Credentials, Please Check your credentials!',
      position: 'top',
      duration: 3000,
      color: 'danger', 
      buttons: [
        {
          side: 'start',
          icon: 'close-circle-outline',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
