import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { UsersService } from '../services/users.service';


@Component({
  templateUrl: 'app.html',
  providers: [UsersService]
})
export class MyApp {
  rootPage:any = LoginPage;
  rootPage2:any = TabsPage;
  public token;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _userService: UsersService) {
    this.token = this._userService.getToken();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
