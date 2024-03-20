import { Component } from '@angular/core';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {
recherche:any;
srcImageUser:string = "http://localhost:8080/annonce/files/"

ngOnInit(){

  this.recherche = JSON.parse(localStorage.getItem('recherche') || '{}');

}
}
