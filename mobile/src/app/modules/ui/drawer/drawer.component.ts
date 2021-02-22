import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {

  username : string

  constructor(private router : Router) { 
    this.username = localStorage.getItem('username')
  }


  ngOnInit() {
  }

  logOut(): void{
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }

  changePassword(): void{
    console.log("change password")
  }

  about(): void{
    console.log("about")
  }

}
