import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  alert: boolean = false;
  text: string = "text par défaut";
  formCan: FormGroup;
  candidats: any;
  users: any;
  info: any;
  fileUpload: File[] = [];

  aff:boolean =false

  formCan1!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private candidatService: CandidatService,
    private router: Router
  ) {
    this.formCan = this.formBuilder.group({
      region: [''],
      age: [''],
      ville: [''],
      nationalite: [''],
      code: [''],
      telephone: [''],
      genre: [''],
      etat: [''],
      adresse: [''],
      user: ['']
    });
    this.formCan1 = this.formBuilder.group({
      region: [''],
      age: [''],
      ville: [''],
      nationalite: [''],
      code: [''],
      telephone: [''],
      genre: [''],
      etat: [''],
      adresse: [''],
      user: ['']
    });
  }

  ngOnInit(): void {

    this.users = JSON.parse(localStorage.getItem('user') || '{}');

    this.infoById();
  }

  handleFileInput(files: any): void {
    this.fileUpload = <File[]>files.target.files;
    console.log(this.fileUpload);
  }

  addCandidat(): void {
    let formData = new FormData();
    formData.append("age", this.formCan.value.age);
    formData.append("region", this.formCan.value.region);
    formData.append("ville", this.formCan.value.ville);
    formData.append("nationalite", this.formCan.value.nationalite);
    formData.append("code", this.formCan.value.code);
    formData.append("telephone", this.formCan.value.telephone);
    formData.append("genre", this.formCan.value.genre);
    formData.append("etat", this.formCan.value.etat);
    formData.append("adresse", this.formCan.value.adresse);
    formData.append("file", this.fileUpload[0]);
    formData.append("user", this.formCan.value.user);

    this.candidatService.saveCandidat(formData, this.users.id).subscribe(
      (res: any) => {
        console.log("add ", res);
        this.alert = true;
        window.scrollTo(0, 0);
        this.formCan.reset({});
        localStorage.setItem('info', JSON.stringify(res));

        setTimeout(() => {
          this.router.navigateByUrl("/profil");
        }, 3000);
      }
    );
  }

  closeAlert(): void {
    this.alert = false;
  }

  updateCan(): void {
    const infocanArray = JSON.parse(localStorage.getItem('info') || '[]');
    const firstInfocanId = infocanArray[0].id;

    let formData = new FormData();
    formData.append("age", this.formCan1.value.age);
    formData.append("region", this.formCan1.value.region);
    formData.append("ville", this.formCan1.value.ville);
    formData.append("nationalite", this.formCan1.value.nationalite);
    formData.append("code", this.formCan1.value.code);
    formData.append("telephone", this.formCan1.value.telephone);
    formData.append("genre", this.formCan1.value.genre);
    formData.append("etat", this.formCan1.value.etat);
    formData.append("adresse", this.formCan1.value.adresse);
    formData.append("user", this.formCan1.value.user);

    this.candidatService.updateCan(formData, firstInfocanId).subscribe(
      (res: any) => {
        this.candidats = res;
        this.alert = true;
        window.scrollTo(0, 0);
        setTimeout(() => {
          this.router.navigateByUrl("/profil");
        }, 3000);
      }
    );
  }

  infoById(): void {
    const infocanArray1 = JSON.parse(localStorage.getItem('info') || '[]');
    const firstInfocanId1 = infocanArray1[0].id;
    this.candidatService.getById(firstInfocanId1).subscribe((res: any) => {
      this.candidats = res;
      this.formCan1.patchValue({
        region: this.candidats.region,
        age: this.candidats.age,
        ville: this.candidats.ville,
        nationalite: this.candidats.nationalite,
        code: this.candidats.code,
        telephone: this.candidats.telephone,
        genre: this.candidats.genre,
        etat: this.candidats.etat,
        adresse: this.candidats.adresse
      });
      console.log("customer", res);
    });
  }
  getoui(){
    this.aff=true 
   }

}

