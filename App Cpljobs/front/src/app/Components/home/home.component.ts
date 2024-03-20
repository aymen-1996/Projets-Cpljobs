import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentIndex: number = 0;
  annonce:any;
  searchFormGroup!:FormGroup ;
  images: string[] = [
    'assets/images/image1.jpg',
    'assets/images/image2.jpg',
    'assets/images/image4.jpg',
    'assets/images/image3.jpg',
   
  ];

  private imageChangeInterval: any;
  constructor( private fb : FormBuilder , private annonceService:AnnonceService , private router : Router){}

  ngOnInit() {


    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(""),
    
      region:this.fb.control("")
    });
    this.imageChangeInterval = setInterval(() => {
      this.nextImage();
    }, 5000); // Changes image every 5 seconds. Adjust time as needed.
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  ngOnDestroy() {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }





  handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
   
    let region = this.searchFormGroup.value.region;
  
    this.annonceService.SearchAnnonce1(keyword  , region).subscribe(
      (response: any) => {
        this.annonce = response;
     
        console.log("search",response)
        localStorage.setItem("recherche", JSON.stringify(this.annonce));
        this.router.navigateByUrl('/recherche')
      },
      (err: any) => {
       
      }
    );
  }
}