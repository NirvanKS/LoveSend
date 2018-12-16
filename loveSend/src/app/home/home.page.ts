import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { NavController, Platform } from '@ionic/angular';
import { SendFeelsServiceService } from '../send-feels-service.service'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  cssClass: any = "banner";
  subscription: any;
  constructor(private deviceMotion: DeviceMotion, private navController: NavController, private platform: Platform,
    private shakeService: SendFeelsServiceService) {
    console.log("try dis out" + this.shakeService.shake());

  }





  ionViewDidLeave() {
    // Stop watch
    this.shakeService.cancelSubscription();
  }


}
