import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { NavController, Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SendFeelsServiceService {
  subscription: any;
  private lastX: number;
  private lastY: number;
  private lastZ: number;
  private moveCounter: number = 0;
  private scale: number = 0;

  constructor(private deviceMotion: DeviceMotion, private navController: NavController, private platform: Platform) { }


  async shake() {
    this.platform.ready().then(() => {
      // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
        if (!this.lastX) {
          this.lastX = acceleration.x;
          this.lastY = acceleration.y;
          this.lastZ = acceleration.z;
          return;
        }

        let deltaX: number, deltaY: number, deltaZ: number;
        deltaX = Math.abs(acceleration.x - this.lastX);
        deltaY = Math.abs(acceleration.y - this.lastY);
        deltaZ = Math.abs(acceleration.z - this.lastZ);

        if (deltaX + deltaY + deltaZ > 3) {
          var milliscale = deltaX + deltaY + deltaZ;
          console.log("counting" + milliscale);
          this.scale += milliscale;
          console.log("SCALE" + this.scale);
          this.moveCounter++;
        } else {
          this.moveCounter = Math.max(0, --this.moveCounter);
        }

        if (this.moveCounter > 5) {
          console.log('SHAKE');

          this.moveCounter = 0;
          this.cancelSubscription();

        }

        this.lastX = acceleration.x;
        this.lastY = acceleration.y;
        this.lastZ = acceleration.z;

      });


    });

  }

  getFinalShakeValue(): number {
    return this.scale;
  }

  cancelSubscription() {
    this.subscription.unsubscribe();
  }
}
