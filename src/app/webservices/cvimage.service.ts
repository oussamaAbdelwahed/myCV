import { Injectable } from '../../../node_modules/@angular/core';
import { CVImage } from '../models/cvimage';
import { Subject } from '../../../node_modules/rxjs/Subject';
import {HttpClient, HttpErrorResponse} from '../../../node_modules/@angular/common/http';
import { ImageType, API_URL } from '../commontasks/imagetype.enum';
@Injectable()
export class CVImageService {
    public logoImage: CVImage;
    public myBigImage: CVImage;
    public images: CVImage[];

    public singleImageSubject: Subject<CVImage> = new Subject<CVImage>();
    public myImageSubject: Subject<CVImage> = new Subject<CVImage>();

    public manyImagesSubject: Subject<CVImage[]> = new Subject<CVImage[]>();
    constructor(private httpClient: HttpClient) {}

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

    emitSingleImageSubject() {
         this.singleImageSubject.next(this.logoImage);
    }
    emitMyImageSubject() {
         this.myImageSubject.next(this.myBigImage);
    }

    emitManyImagesSubject() {
         this.manyImagesSubject.next(this.images.slice());
    }
}

