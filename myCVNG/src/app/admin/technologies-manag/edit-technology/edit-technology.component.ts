import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TechnologyService } from '../../../webservices/technology.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Technology } from '../../../models/technology';
declare const $: any;
@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrls: ['./edit-technology.component.css']
})
export class EditTechnologyComponent implements OnInit, OnDestroy {

  public editTechForm: FormGroup;
  private TechnologyServiceSub: Subscription;
  private techFile: File = null;
  public technology: Technology;
  private techId = null;
  public srcImg = null;
  public valLevel = "";
  constructor(
    private technologyService: TechnologyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    $("#maskforloading").fadeIn(0);
    this.getIdFromUrl();
    this.initForm();
    this.subscribeToTechnologyService();
  }

  initForm() {
    this.editTechForm = this.formBuilder.group({
      name: ["", Validators.required],
      level: [
        "",
        [Validators.required, Validators.min(20), Validators.max(95)]
      ],
      technology: ["", Validators.required]
    });
  }

  fillForm() {
    this.editTechForm = this.formBuilder.group({
      name: [this.technology.name, Validators.required],
      level: [
        this.technology.level,
        [Validators.required, Validators.min(20), Validators.max(95)]
      ],
      technology: [""]
    });
  }

  getIdFromUrl() {
    this.activatedRoute.params.subscribe((params) => {
      this.techId = +params['id'];
      this.technologyService.getOneTech(this.techId);
    });
  }

  subscribeToTechnologyService() {
    this.TechnologyServiceSub = this.technologyService.oneTechnologySubject.subscribe(
         (emittedData: Technology) => {
           this.srcImg = emittedData.technology;
           this.technology = emittedData;
           this.fillForm();
           $("#maskforloading").fadeOut(600);
         }, (error) => {
           $("#maskforloading").fadeOut(600);
         }
    );
  }

  ngOnDestroy() {
    this.TechnologyServiceSub.unsubscribe();
  }

  onChangeLevel(event) {
    this.valLevel = event.target.value + "%";
  }

  onChangeFile(event) {
    this.techFile = <File>event.target.files[0];
    const url = window.URL || window['webkitURL'];
    this.srcImg = url.createObjectURL(this.techFile);
  }

 onSubmitForm() {
    const formValue = this.editTechForm.value;
    const obj = {};
    obj['name'] = formValue['name'];
    obj['level'] = formValue['level'];
    obj['id'] = this.techId;
    $("#maskforloading").fadeIn(0);
    this.technologyService.updateTechnology(this.techFile, obj).then(
      (resolvedData: boolean) => {
        if (resolvedData) {
          this.router.navigate(["admin", "dashboard", "technologies"]);
        }
        $("#maskforloading").fadeOut(600);
      }, (error) => {
        console.log(error);
        $("#maskforloading").fadeOut(600);
      });
  }
}

