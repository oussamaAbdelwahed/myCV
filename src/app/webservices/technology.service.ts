import { Injectable } from "../../../node_modules/@angular/core";
import { Technology } from '../models/technology';
import { Subject } from "../../../node_modules/rxjs/Subject";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_URL } from '../commontasks/imagetype.enum';

@Injectable()
export class TechnologyService {
    public techSubject: Subject<Technology[]> = new Subject<Technology[]>();
    private techs: Technology[];
    constructor(private httpClient: HttpClient) {}

    public getAllTechs() {
        this.httpClient.get<Technology[]>(API_URL + '/tech/all').subscribe(
            (data: Technology[]) => {
                this.techs = data;
                this.emitTechnologySubject();
            }
        );
    }

    emitTechnologySubject() {
        this.techSubject.next(this.techs.slice());
    }

}
