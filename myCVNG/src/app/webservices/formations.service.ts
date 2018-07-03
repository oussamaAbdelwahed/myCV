import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_URL } from '../commontasks/imagetype.enum';
import { Formation } from '../models/formation';
import { Subject } from "../../../node_modules/rxjs/Subject";

@Injectable()
export class FormationService {

  constructor(private httpClient: HttpClient) {}
  private formations: Formation[];
  public formationSub: Subject<Formation[]> = new Subject<Formation[]>();

  getAll() {
      this.httpClient.get<Formation[]>(API_URL + '/myformations/all').subscribe(
          (data: Formation[] ) => {
              this.formations = data;
              this.emitFormationSubject();
          }
      );
  }

  emitFormationSubject() {
      this.formationSub.next(this.formations.slice());
  }
}
