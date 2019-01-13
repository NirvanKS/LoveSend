import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  cssClass: any = "heart";
  div1 = "heart left side top";
  div2 = "heart center"
  div3 = "heart right side"

  constructor() {

  }


  sash() {
    console.log("button was clicked");
    this.cssClass = "heart2x";
    this.div1 = "heart2x left side top";
    this.div2 = "heart2x center"
    this.div3 = "heart2x right side"

  }

  ionViewWillEnter() {

  }


  //next steps:
  //manually try practice device motion if possible. understand the code first.
  //put the code to push and pull from firebase.
  //on load of the screen, see if there is anything to pull, pull it and then delete it.
  //push is just a simple value push after device motion stuff.
  //on second screen, put "nothing here but this little ghost for now!"
  //on other screen, put the receieve page to receive the love.


}
