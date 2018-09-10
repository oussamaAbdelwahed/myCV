import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { LocalStorageService } from '../../webservices/localstorage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public admin: Admin;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const obj = this.localStorageService.get();
    this.admin = new Admin(obj['firstName'], obj['lastName'], obj['email'], obj['id']);
  }

}
