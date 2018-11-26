import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { NavController, Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SendFeelsServiceService {
  subscription: any;
  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;
  
  constructor(private deviceMotion: DeviceMotion, private navController: NavController, private platform: Platform) { }


  shake(){
    this.platform.ready().then(() => {
      // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        if(!this.lastX) {
          this.lastX = acceleration.x;
          this.lastY = acceleration.y;
          this.lastZ = acceleration.z;
          return;
        }

        let deltaX:number, deltaY:number, deltaZ:number;
        deltaX = Math.abs(acceleration.x-this.lastX);
        deltaY = Math.abs(acceleration.y-this.lastY);
        deltaZ = Math.abs(acceleration.z-this.lastZ);
        console.log(deltaX,deltaY,deltaZ);

        if(deltaX + deltaY + deltaZ > 3) {
          this.moveCounter++;
        } else {
          this.moveCounter = Math.max(0, --this.moveCounter);
        }

        if(this.moveCounter > 2) { 
          console.log('SHAKE');
          //this.loadCats(); 
          this.moveCounter=0; 
        }

        this.lastX = acceleration.x;
        this.lastY = acceleration.y;
        this.lastZ = acceleration.z;

      });


    });

  }

  cancelSubscription(){
    this.subscription.unsubscribe();
  }
}
