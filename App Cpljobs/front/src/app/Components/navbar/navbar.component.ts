import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { CustomerService } from 'src/app/services/customer.service';
import { InfoproService } from 'src/app/services/infopro.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

infopro:any

  users:any
user:any
id!: number;
  formAuth!: FormGroup;
candidat :any ;
  formUser!: FormGroup;
  alert:boolean=false
  infocan:any;
  infocust:any
  returnUrl!: string;
  affichageErreu!: boolean;
  error: any;
  loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private infoproservice: InfoproService,
    private route: Router,
   private candidatservice:CandidatService,
   private CustomerService:CustomerService,
   private authService: AuthenticationService,
   private activatedRoute: ActivatedRoute

   
  ) {
 
   }

  ngOnInit(): void {

    this.formAuth = this.formBuilder.group({

      username:'', 

      password: ''
    });
   
    
    this.formUser = this.formBuilder.group({
      nom: '',
      prenom: '',
      pseudo: '',
      password: '',
      email:'',
      role: ''
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    


  }

  addUser() {
    let formData = new FormData();
  formData.append("nom", this.formUser.value.nom);
  formData.append("prenom", this.formUser.value.prenom);
  formData.append("pseudo", this.formUser.value.pseudo);
  formData.append("email", this.formUser.value.email);
  formData.append("password", this.formUser.value.password);8
  formData.append("role", this.formUser.value.role);
    this.userService.saveUser(formData).subscribe(
      (res: any) => {
        console.log("add :", res);
        window.scrollTo(0,0)
        this.alert=true
        this.formUser.reset({})
      }
    );
  }

 /* userauth() {
    this.userService.postUser(this.formAuth.value).subscribe((res: any) => {
      console.log("user", res);
  if(res.role === 'Candidat'){
      this.users = res;
      console.log("user connected is", res);
      localStorage.setItem('state', '1');
      localStorage.setItem('role', res.role);
      console.log("role", res.role);

      localStorage.setItem('user', JSON.stringify(this.users));
  
    
      this.candidatservice.getinfocan(res.id).subscribe((infoRes: any) => {
        this.infocan=infoRes
        localStorage.setItem('info', JSON.stringify(infoRes));


        
      });
  

      this.infoproservice.getinfopro(res.id).subscribe((infopros: any) => {
        this.infopro=infopros
        localStorage.setItem('infopro', JSON.stringify(infopros));


        
      });

     
    }

     if(res.role === 'Recruteur'){
      this.users = res;
      console.log("user connected is", res);
      localStorage.setItem('state', '1');
      localStorage.setItem('role', res.role);
      console.log("role", res.role);
      localStorage.setItem('user', JSON.stringify(this.users));

      this.CustomerService.getinfocustid(res.id).subscribe((infocust: any) => {
        this.infocust = infocust;
      console.log("result" ,infocust )
        localStorage.setItem('infocust', JSON.stringify(infocust));
      });
    }
       if(res.role == 'Recruteur'){
        this.route.navigateByUrl('/profilrec');

      }else{
        this.route.navigateByUrl('/profil');

      }
  
      
      window.location.reload();
    });
  }*/


  userauth() {
    this.authService.login(this.formAuth.value.username, this.formAuth.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data.role === 'Candidat') {
            this.users = data;
            console.log("user connected is", data);
            localStorage.setItem('state', '1');
            localStorage.setItem('role', data.role);
            console.log("role", data.role);
  
            localStorage.setItem('user', JSON.stringify(this.users));
  
            this.candidatservice.getinfocan(data.id).subscribe((infoRes: any) => {
              this.infocan = infoRes;
              localStorage.setItem('info', JSON.stringify(infoRes));
            });
  
            this.infoproservice.getinfopro(data.id).subscribe((infopros: any) => {
              this.infopro = infopros;
              localStorage.setItem('infopro', JSON.stringify(infopros));
            });

            this.route.navigateByUrl('/profil');

          } else if (data.role === 'Recruteur') {
            this.users = data;
            console.log("user connected is", data);
            localStorage.setItem('state', '1');
            localStorage.setItem('role', data.role);
            console.log("role", data.role);
            localStorage.setItem('user', JSON.stringify(this.users));
  
            this.CustomerService.getinfocustid(data.id).subscribe((infocust: any) => {
              this.infocust = infocust;
              console.log("result", infocust);
              localStorage.setItem('infocust', JSON.stringify(infocust));
            });
  
            this.route.navigateByUrl('/profilrec');
          }
  
          window.location.reload();
        },
        error => {
          this.affichageErreu = true;
          this.error = error;
          this.loading = false;
        }
      );
  }
  
  

  
  
     logout(){
    localStorage.clear();
    this.route.navigateByUrl('/');

    if (this.route.url === '/') {
      // If it is "/", reload the page
      location.reload();
    }
  }





}