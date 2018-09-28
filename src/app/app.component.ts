import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MensagemPage } from '../pages/mensagem/mensagem';
import { AlertasPage } from '../pages/alertas/alertas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public fcm: FCM) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Meus Contatos', component: ListPage },
      { title: 'Alertas Recebidos', component: MensagemPage },
      { title: 'Alertas Enviados', component: AlertasPage },
      { title: 'Logout', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      //Notifications
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token=>{
        console.log(token);
      })
      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      this.fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });
      //end notifications.
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
