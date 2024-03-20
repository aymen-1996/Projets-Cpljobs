import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../service/User.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
user:any
role:any
users:any

srcImageUser:string = "http://localhost:8080/user/files/"
constructor(private userService:UserService) { }

  ngOnInit(): void  {

    this.role =     localStorage.getItem('role')
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log("role: ",this.role);
    this.UserById()

    
}

getUsers(){
    
  this.userService.getUser().subscribe(
    (res:any) => {
      this.user= res
      console.log("user",res)
      
    }
  )
}

UserById(){
  this.userService.getbyid(this.user.id).subscribe((res:any)=>{
    this.users=res
    
  });
  
}
}

