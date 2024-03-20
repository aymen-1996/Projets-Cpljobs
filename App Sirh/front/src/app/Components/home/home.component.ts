import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/User.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  use:any
  
  srcImageUser:string = "http://localhost:8080/user/files/"
  id = this.activatedRoute.snapshot.params['id']
users1:any

  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router){} 

  ngOnInit(): void {

    this.use = JSON.parse(localStorage.getItem('user') || '{}');
    
this.UserById1()

  }
  signout(){
    localStorage.removeItem('state');
    this.router.navigateByUrl('/login');
    
  }

  UserById1(){
    this.userService.getbyid(this.use.id).subscribe((res:any)=>{
      this.users1=res
      
    });
    
  }
}
