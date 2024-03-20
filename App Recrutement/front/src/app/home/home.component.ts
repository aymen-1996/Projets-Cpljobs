import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddcustService } from '../services/addcust.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formCustomer !:FormGroup
  searchFormGroup !: FormGroup
  customer : any ;
  errorMessage !: string ; 
  constructor(private custo: AddcustService,private fb : FormBuilder , private router:Router) { }


  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(""),
      secteur : this.fb.control(""),
      maxAge:this.fb.control(""),
      minAge:this.fb.control("")
    });
    
  }
  Searchcust1() {
    let keyword = this.searchFormGroup.value.keyword;
    let maxAge = this.searchFormGroup.value.maxAge;
    let minAge = this.searchFormGroup.value.minAge;
    let secteur = this.searchFormGroup.value.secteur;
  
    // Check if any of the search criteria is not empty
    if (keyword || maxAge || minAge || secteur) {
      this.custo.Searchcust1(keyword, minAge || 0, maxAge || 999, secteur).subscribe(
        customers => {
          this.customer = customers;
          this.errorMessage = ''; // Clear any previous error messages
          console.log(customers);
          localStorage.setItem("recherche", JSON.stringify(this.customer));
          this.router.navigate(['/recherche'], {
            queryParams: {
              minAge: minAge,
              maxAge: maxAge,
              secteur: secteur,
              keyword: keyword
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
}
