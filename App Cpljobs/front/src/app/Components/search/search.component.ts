import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { InfoproService } from 'src/app/services/infopro.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  infopro:any
  searchFormGroup! : FormGroup
  doc:any

constructor( private fb : FormBuilder , private infoproservice:InfoproService ,private documentService:DocumentService ,private router : Router){}


ngOnInit() {
  this.searchFormGroup = this.fb.group({
    keyword: this.fb.control(''),
    secteur: this.fb.control(''),
    lieu: this.fb.control(''),
    experience: this.fb.control(''),
    etude: this.fb.control('')
  });

}

handleSearchInfopro() {
  let keyword = this.searchFormGroup.value.keyword;
  let secteur = this.searchFormGroup.value.secteur;
  let lieu = this.searchFormGroup.value.lieu;
  let experience = this.searchFormGroup.value.experience;
  let etude = this.searchFormGroup.value.etude;

  this.infoproservice.Searchinfopro(keyword, secteur, lieu, experience, etude).subscribe(
    (response: any) => {
      this.infopro = response;
      console.log('search', response);
      localStorage.setItem('resultat', JSON.stringify(this.infopro));
      this.router.navigateByUrl('/resultat');
    },
    (err: any) => {
      // Handle errors here, e.g., show an error message to the user
      console.error('Error occurred:', err);
    }
  );
}


}