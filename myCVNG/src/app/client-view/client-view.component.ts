import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#maskforloading").fadeIn(0);
  }

}
