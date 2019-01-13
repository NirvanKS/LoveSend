import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { NavController, Platform } from '@ionic/angular';
import { SendFeelsServiceService } from '../send-feels-service.service'
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  cssClass: any = "banner";
  subscription: any;
  showHome;
  heartRate: any;
  beatFast: Boolean;
  beatFastest: Boolean
  constructor(private deviceMotion: DeviceMotion, private navController: NavController, private platform: Platform,
    private shakeService: SendFeelsServiceService, private router: Router, public afd: AngularFireDatabase) {
    this.showHome = true;
    this.heartRate = "heartbeat";
    this.beatFast = false;
    this.beatFastest = false;

  }





  ionViewDidLeave() {
    // Stop watch
    this.shakeService.cancelSubscription();
    this.showHome = true;
    this.beatFast = false;
    this.beatFastest = false;
  }

  ionViewWillEnter() {
    this.showHome = true;
    this.beatFast = false;
    this.beatFastest = false;
  }

  async sendLove() {
    this.showHome = false;
    timer(10000).subscribe(() => {
      console.log("try dis out");
      this.shakeService.shake();
      this.afd.object('/Sent/').valueChanges().subscribe(data => {
        console.log("value of sent - ", data);
        if (data > 100) {
          this.heartRate = "heartbeat2x";
          this.beatFast = true;
          timer(30000).subscribe(() => this.showHome = true);
        }
        if (data < 100) {
          this.heartRate = "heartbeat3x";
          this.beatFastest = true;
        }

      });
    });


  }

  pushToGetHeartPage() {
    this.router.navigate(['/tabs/(about:about)']);
    //href="/tabs/(about:about)"
  }


}

//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>