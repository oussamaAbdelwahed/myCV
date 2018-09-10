import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, FormationType } from '../commontasks/imagetype.enum';
import { Formation } from '../models/formation';
import { Subject } from "rxjs/Subject";

@Injectable()
export class FormationService {

  constructor(private httpClient: HttpClient) {
      console.log("FormationService");
  }
  private formations: Formation[];
  public formationSub: Subject<Formation[]> = new Subject<Formation[]>();

  private formation: Formation;
  public oneFormationSub: Subject<Formation> = new Subject<Formation>();

  getAll() {
      this.httpClient.get<Formation[]>(API_URL + '/myformations/all').subscribe(
          (data: Formation[] ) => {
              this.formations = data;
              this.emitFormationSubject();
          }
      );
  }

  getAllByType(type: FormationType) {
      this.httpClient.get<Formation[]>(API_URL + "/admin/formations/" + type).subscribe(
          (successData: Formation[]) => {
            this.formations = successData;
            this.emitFormationSubject();
          }, (errorRep) => {
            console.log(errorRep);
          }
      );
  }

  getOneById(id: number) {
      this.httpClient.get<Formation>(API_URL + "/admin/formations/byid/" + id).subscribe(
          (successData: Formation) => {
              this.formation = successData;
              this.emitOneFormationSubject();
          }, (errorRep) => {
              console.log(errorRep);
          }
      );
  }

    saveFormation(proofDocument: File, obj) {
      const formData = new FormData();
      formData.append("proofDocument", proofDocument, proofDocument.name);
      formData.append("serializedObj", JSON.stringify(obj));
      return new Promise<Boolean>((resolve, reject) => {
          this.httpClient.post(API_URL + "/admin/formations/save", formData).subscribe(
            (successData: boolean) => {
               resolve(successData);
            }, (errorRep) => {
                resolve(false);
            }
        );
      });
  }

  updateFormation(proofDocument: File, obj) {
      if (proofDocument !== null) {
          const formData = new FormData();
          formData.append("formation", JSON.stringify(obj));
          formData.append("proofDocument", proofDocument , proofDocument.name);
         return new Promise<Boolean>((resolve, reject) => {
           this.httpClient.post(API_URL + "/admin/formations/update", formData).subscribe(
              (successData: boolean) => {
                 resolve(successData);
              }, (errorRep) => {
                  resolve(false);
                  console.log(errorRep);
              }
           );
         });
      } else {
          return new Promise<Boolean>((resolve, reject) => {
              this.httpClient.post(API_URL + "/admin/formations/updateplaintext", obj).subscribe(
                  (successData: boolean) => {
                      resolve(successData);
                  }, (errorRep) => {
                      resolve(false);
                      console.log(errorRep);
                  }
              );
          });
      }
  }

  deleteFormation(id: number) {
      return new Promise<Boolean>((resolve, reject) => {
          this.httpClient.post(API_URL + "/admin/formations/delete", {id : id}).subscribe(
            (successData: boolean) => {
               resolve(successData);
            }, (errorRep) => {
                resolve(false);
            }
          );
      });
  }

  emitFormationSubject() {
      this.formationSub.next(this.formations.slice());
  }

  emitOneFormationSubject() {
      this.oneFormationSub.next(this.formation);
  }
}
