import { Injectable } from "@angular/core";
import { Technology } from '../models/technology';
import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../commontasks/imagetype.enum';

@Injectable()
export class TechnologyService {
  public techSubject: Subject<Technology[]> = new Subject<Technology[]>();
  private techs: Technology[];
  private technology: Technology;
  public oneTechnologySubject: Subject<Technology> = new Subject<Technology>();

  constructor(private httpClient: HttpClient) {
    console.log("TechnologyService");
  }

  public getAllTechs() {
    this.httpClient
      .get<Technology[]>(API_URL + "/tech/all")
      .subscribe((data: Technology[]) => {
        this.techs = data;
        this.emitTechnologySubject();
      });
  }

  getOneTech(id: number) {
    this.httpClient.get<Technology>(API_URL + "/admin/technologies/byid/" + id).subscribe(
      (successData: Technology) => {
         this.technology = successData;
         this.emitOneTechnologySubject();
      }, (errorRep) => {
          console.log(errorRep);
      }
    );
  }

  saveTechnology(techImage: File, obj) {
      if (techImage !== null) {
        const formData = new FormData();
        formData.append("image", techImage, techImage.name);
        formData.append("technology", JSON.stringify(obj));
        return new Promise<Boolean>((resolve, reject) => {
            this.httpClient.post(API_URL + "/admin/technologies/save" , formData).subscribe(
                (successData: boolean) => {
                    resolve(successData);
                }, (errorRep) => {
                    resolve(false);
                }
            );
        });
      }
  }

  deleteTechnology(id: number) {
      return new Promise<Boolean>((resolve, reject) => {
          this.httpClient.post(API_URL + '/admin/technologies/delete', {id: id}).subscribe(
            (successData: boolean) => {
                resolve(successData);
            }, (errorRep) => {
                resolve(false);
            }
          );
      });
  }

  updateTechnology(techFile: File, obj) {
    if (techFile !== null) {
       const formData = new FormData();
        formData.append("image", techFile, techFile.name);
        formData.append("technology", JSON.stringify(obj));
        return new Promise<Boolean>((resolve , reject) => {
            this.httpClient.post(API_URL + "/admin/technologies/update", formData).subscribe(
                (successData: boolean) => {
                    resolve(successData);
                }, (errorRep) => {
                    resolve(false);
                }
            );
        });
    } else {
        return new Promise<Boolean>((resolve, reject) => {
            this.httpClient.post(API_URL + "/admin/technologies/updateplaintext", obj).subscribe(
                (successData: boolean) => {
                    resolve(successData);
                }, (errorRep) => {
                    resolve(false);
                }
            );
        });
    }
  }

  emitTechnologySubject() {
    this.techSubject.next(this.techs.slice());
  }

  emitOneTechnologySubject() {
      this.oneTechnologySubject.next(this.technology);
  }
}
