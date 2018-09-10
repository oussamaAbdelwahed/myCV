import { Injectable } from '@angular/core';
import { CVImage } from '../models/cvimage';
import { Subject } from 'rxjs/Subject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ImageType, API_URL } from '../commontasks/imagetype.enum';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CVImageService {
    public logoImage: CVImage;
    public myBigImage: CVImage;
    public images: CVImage[];
    public oneImage: CVImage;

    public singleImageSubject: Subject<CVImage> = new Subject<CVImage>();
    public myImageSubject: Subject<CVImage> = new Subject<CVImage>();
    public myVar: Observable<CVImage> = new Observable<CVImage>();
    public manyImagesSubject: Subject<CVImage[]> = new Subject<CVImage[]>();
    public oneImageSubject: Subject<CVImage> = new Subject<CVImage>();

    constructor(private httpClient: HttpClient) {
        console.log("CVImageService");
    }

    getOneImage(type: ImageType) {
        this.httpClient.get<CVImage>(API_URL + '/cvimages/' + type).subscribe(
           (imageObject: CVImage) => {
               if (imageObject.type === 'NAVBAR_LOGO') {
                    this.logoImage = imageObject;
                    this.emitSingleImageSubject();
               } else if (imageObject.type === 'ME_BIG_PICTURE') {
                    this.myBigImage = imageObject;
                    this.emitMyImageSubject();
               } else { }
           }, (error: HttpErrorResponse) => {
              console.log(error);
           }
       );
    }



    getAllCertifications() {
        this.httpClient.get<CVImage[]>(API_URL + '/cvimages/certifications').subscribe(
            (certifications: CVImage[]) => {
               this.images = certifications;
               this.emitManyImagesSubject();
            }, (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    getAllByType(imageType: ImageType) {
        this.httpClient.get<CVImage[]>(API_URL + "/admin/images/" + imageType).subscribe(
           (successData: CVImage[]) => {
             this.images = successData;
             this.emitManyImagesSubject();
           }, (errorData) => {
              console.log(errorData);
           }
        );
    }

    getOneById(id: number) {
        this.httpClient.get<CVImage>(API_URL + "/admin/images/byid/" + id).subscribe(
            (successData: CVImage) => {
              this.oneImage = successData;
              this.emitOneImageSubject();
            }, (errorRep: HttpErrorResponse) => {
              console.log(errorRep);
            }
        );
    }

    saveImage(image: File, imgObj) {
      return new Promise<Boolean>((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", image, image.name);
        formData.append("serializedObj", JSON.stringify(imgObj));
        this.httpClient.post(API_URL + "/admin/images/save", formData).subscribe(
            (successData: boolean) => {
              resolve(successData);
            }, (errorRep) => {
              resolve(false);
            }
        );
      });

    }

    updateImage(image: File, imgObj) {
        const data = new FormData();
        // tslint:disable-next-line:forin
        if (image != null) {
          data.append("image", image, image.name);
          for (const key in imgObj) {
            if (imgObj.hasOwnProperty(key)) {
                data.append(key, imgObj[key]);
            }
          }
          return new Promise<Boolean>((resolve, reject) => {
            this.httpClient.post(API_URL + "/admin/images/update", data).subscribe(
                (successData: boolean) => {
                    resolve(successData);
                }, (errorRep) => {
                    resolve(false);
                }
            );
        });
        } else {
          return new Promise<Boolean>((resolve, reject) => {
              this.httpClient.post(API_URL + "/admin/images/updateplaintext", imgObj).subscribe(
                (successData: boolean) => {
                    resolve(successData);
                }, (errorRep) => {
                    resolve(false);
                }
            );
        });
        }
    }


    deleteImage(id: number) {
        console.log("id from service  = " + id);
        return new Promise<boolean>((resolve, reject) => {
            /*const obj = new FormData();
            obj.append("id", "" + id + "");*/
            const obj = {id : id};
            this.httpClient.post(API_URL + "/admin/images/delete", obj).subscribe(
            (successData: boolean) => {
               resolve(successData);
            }, (errorRep) => {
                console.log(errorRep);
                resolve(false);
            }
          );
        });
    }

    emitSingleImageSubject() {
         this.singleImageSubject.next(this.logoImage);
    }

    emitMyImageSubject() {
         this.myImageSubject.next(this.myBigImage);
    }

    emitManyImagesSubject() {
         this.manyImagesSubject.next(this.images.slice());
    }

    emitOneImageSubject() {
        this.oneImageSubject.next(this.oneImage);
    }
}

