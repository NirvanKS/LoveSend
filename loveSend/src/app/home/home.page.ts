import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  cssClass: any = "banner";
  subscription: any;
  constructor(private deviceMotion: DeviceMotion, private navController: NavController, private platform: Platform) {
    this.shakeTest();
  }


  shakeTest() {
    this.platform.ready().then(() => {
      // Get the device current acceleration
      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) => console.log("dis be current", acceleration),
        (error: any) => console.log(error)
      );
      // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
      });


    });


  }

  ionViewDidLeave() {
    // Stop watch
    this.subscription.unsubscribe();
  }


}
