import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, map, Observable  } from 'rxjs';
import { customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { throwError } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { AddcustService } from '../services/addcust.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
 
 
  customers! : Observable<Array<customer>> ;
  customer : any ;
  errorMessage !: string ; 
  searchFormGroup !: FormGroup
  fileInfos?: Observable<any>;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  error=''
  term:String="";
  affichageErreu:boolean=true
  message = '';
  c: any;
  currentPage: number = 1;
  pageSize=20
  id=this.activatedRoute.snapshot.params['id']

  formCustomer !:FormGroup
  minAge!:number 
  maxAge!:number 
  fileUrl!: SafeResourceUrl;
  fileType!: string;

 
     

  constructor(private sanitizer: DomSanitizer,private http:HttpClient,private activatedRoute:ActivatedRoute,private custo: AddcustService, private customerService : CustomerService , private fb : FormBuilder,  private formgroupe : FormBuilder, private router : Router, private uploadService: FileUploadService) { }

  ngOnInit(): void {
 
    this.formCustomer = this.formgroupe.group({
      nom: "",
      prenom: "",
      age: "",
      email:"",
      secteur: "",
      etude:"",
      telephone:"",
      region:"",
      anneeExperience:"",

    })
    
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(""),
      secteur : this.fb.control(""),
      maxAge:this.fb.control(""),
      minAge:this.fb.control("")
    });
    
    this.getAllcust();


      
    }
    
    getAllcust(){
      this.custo.getAllCustomer().subscribe((res:any)=>{
         this.customer=res;
         console.log("customer : ", res);
         
       },
  
      
       )
      

     }
   

  handleSearchAccount() {
    throw new Error('Method not implemented.');
  }

  handleDeleteCustomer(c: customer) {
    
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            this.getAllcust();
            return data;
            
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
   
  }
  cusromerById(){
    this.custo.getById(this.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
      
    });
    
  }

  /*  handleSearchCustomers() {
      let keyword = this.searchFormGroup.value.keyword;
      let maxAge = this.searchFormGroup.value.maxAge;
      let minAge = this.searchFormGroup.value.minAge;
    


      if (!keyword|| !this.minAge || !this.maxAge)  {
        this.custo.Searchcust(keyword,  minAge || 0, maxAge || 999).subscribe(
          customers => {
            this.customer = customers;
            this.errorMessage = ''; // Clear any previous error messages
            console.log(customers); 
          },
          (error) => {
            console.error(error);
          }
        );
      }
      else if (keyword && (minAge || maxAge)) {
        this.custo.Searchcust(keyword, minAge, maxAge).subscribe(
          customers => {
            this.customer = customers;
            this.errorMessage = ''; // Clear any previous error messages
            console.log("search by keyword and age range", customers); // Log the customers data to the console
          },
          err => {
            this.errorMessage = err.message;
          }
        );
      } 
      else if (keyword) {
        this.custo.Searchcust(keyword,  minAge || 0, maxAge || 999).subscribe(
          customers => {
            this.customer = customers;
            this.errorMessage = ''; 
            console.log("search by keyword", customers); 
          },
          err => {
            this.errorMessage = err.message;
          }
        );
      } 

     else if (!keyword && !this.minAge && !this.maxAge)  {
        this.customerService.getCustomers().subscribe(
          customers => {
            this.customer = customers;
            this.errorMessage = ''; // Clear any previous error messages
            console.log(customers); 
          },
          (error) => {
            console.error(error);
          }
        );
  
      }
      else if (!keyword )  {
        this.customerService.searchCustomersByAge(minAge, maxAge).subscribe(
          customers => {
            this.customer = customers;
            this.errorMessage = ''; // Clear any previous error messages
            console.log(customers); 
          },
          (error) => {
            console.error(error);
          }
        );
  
      }
      else if((!keyword && (minAge || maxAge))) {
        this.customerService.searchCustomersByAge(minAge, maxAge).subscribe(
          customers => {
            this.customer = customers;
            this.errorMessage = ''; 
            console.log(customers); 
          },
          (error) => {
            console.error(error);
          }
        );
      } 
    }*/
    
    Searchcust1() {
      let keyword = this.searchFormGroup.value.keyword;
      let maxAge = this.searchFormGroup.value.maxAge;
      let minAge = this.searchFormGroup.value.minAge;
      let secteur = this.searchFormGroup.value.secteur;
      this.custo.Searchcust1(keyword, minAge|| 0, maxAge || 999, secteur).subscribe(
        customers => {
          this.customer = customers;
          this.errorMessage = ''; // Clear any previous error messages
          console.log(customers);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    

    onPageChange(event: any): void {
  
      this.pageSize = Number(event.target.value) 
     
    }

    loadFileContent(filename: string) {
      const url = `http://localhost:8080/files/${filename}`;
      const fileExtension = this.getFileExtension(filename);
    
      this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
        let fileBlob: Blob;
        let fileType: string;
    
        if (fileExtension === 'pdf') {
          fileBlob = new Blob([data], { type: 'application/pdf' });
          fileType = 'application/pdf';
        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
          fileBlob = new Blob([data], { type: 'application/msword' });
          fileType = 'application/msword';
        } else if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
          fileBlob = new Blob([data], { type: 'image/jpeg' });
          fileType = 'image/jpeg';
        } else {
          console.error('Format de fichier non pris en charge.');
          return;
        }
    
        const fileUrl = URL.createObjectURL(fileBlob);
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
        this.fileType = fileType;
    
        // Ouvrir le fichier dans une nouvelle fenêtre ou un nouvel onglet
        window.open(fileUrl, '_blank');
      });
    }
    getFileExtension(filename: string): string {
      const parts = filename.split('.');
      if (parts.length === 1) {
        return ''; // Aucune extension trouvée
      }
      return parts[parts.length - 1].toLowerCase();
    }
  
    /*downloadFile(filename: string) {
      const url = `http://localhost:8080/files/${filename}`;
      this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
        // Crée un objet URL pour le blob de données
        const fileURL = URL.createObjectURL(data);
    
        // Crée un lien temporaire pour télécharger le fichier
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = filename;
    
        // Ajoute le lien au document et déclenche le téléchargement
        document.body.appendChild(link);
        link.click();
    
        // Nettoie les ressources après le téléchargement
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
      });
    }*/
}
