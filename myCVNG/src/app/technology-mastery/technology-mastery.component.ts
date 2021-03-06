import { Component, OnInit, OnDestroy } from '@angular/core';
import { TechnologyService } from '../webservices/technology.service';
import { Subscription } from 'rxjs/Subscription';
import { Technology } from '../models/technology';

@Component({
  selector: 'app-technology-mastery',
  templateUrl: './technology-mastery.component.html',
  styleUrls: ['./technology-mastery.component.css']
})
export class TechnologyMasteryComponent implements OnInit, OnDestroy {
  private techServiceSub: Subscription;
  public techs: Technology[];
  constructor(private techService: TechnologyService) { }


  ngOnInit() {
    this.subscribeToTechService();
    this.techService.getAllTechs();
  }
  ngOnDestroy() {
    this.techServiceSub.unsubscribe();
  }

  subscribeToTechService() {
    this.techServiceSub = this.techService.techSubject.subscribe(
      (emittedData: Technology []) => {
        this.techs = emittedData;
      }
    );
  }

}
