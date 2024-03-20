import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddcustService } from '../services/addcust.service';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {
  customer: any;
  formCustomer!: FormGroup;
  id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private custo: AddcustService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.formCustomer = this.fb.group({
      nom: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      secteur: ['', Validators.required],
      etude: ['', Validators.required],
      telephone: [''],
      region: [''],
      anneeExperience: [''],
    });

    this.cusromerById();
  }

  updateCust() {
    this.custo.updateCust(this.formCustomer.value, this.id).subscribe((res: any) => {
      console.log("cust", this.custo);
      this.router.navigateByUrl('/customers');
    });
    console.log("here customer to update: ", this.formCustomer.value);
  }

  cusromerById() {
    this.custo.getById(this.id).subscribe((res: any) => {
      this.customer = res;
      console.log("customer", this.customer);

      // Patch the form values with the retrieved customer values
      this.formCustomer.patchValue({
        nom: this.customer.nom,
        email: this.customer.email,
        anneeExperience: this.customer.anneeExperience,
        poste: this.customer.poste,
        secteur: this.customer.secteur,
        age: this.customer.age,
        etude: this.customer.etude,
        region: this.customer.region,
        telephone: this.customer.telephone

      });
      console.log("region", this.customer.region);

    });
  }
  
}
