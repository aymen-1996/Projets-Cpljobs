import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  user:any;
ngOnInt(){

  this.user = JSON.parse(localStorage.getItem('user') || '{}');
}


onsubmit(){

  window.scroll(0,0)
}
}

