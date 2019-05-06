import { Component, OnInit } from '@angular/core';
import * as Landbot from '@landbot/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showChat: boolean;
  showHistory: boolean;

  core = new Landbot.Core({
    firebase: firebase, // required
    brandID: 12235, // required
  channelToken: 'H-116929-N86QGRNNY6QCWEU3', // required
  welcomeUrl: 'https://welcome.landbot.io/', // recommended
  });

  ngOnInit() {
    this.showChat = true;
    this.showHistory = false;
  }

  

  changeShowHistory () {
    this.showChat = false;
    this.showHistory = true;
  }

  changeShowChat() {
    this.showChat = true;
    this.showHistory = false;
  }
}
