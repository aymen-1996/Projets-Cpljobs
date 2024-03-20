import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /*currentLanguage: string = 'fr';*/
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  signout(){
    localStorage.removeItem('state');
    this.router.navigateByUrl('/login');
  }
 /* changeLanguage(): void {
    if (this.currentLanguage === 'fr') {
      // Changer vers l'anglais
      this.currentLanguage = 'en';
    } else {
      // Changer vers le français
      this.currentLanguage = 'fr';
    }
  }*/
}
