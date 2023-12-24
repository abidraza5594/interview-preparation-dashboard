import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userEmail:any
  isloggedIn$:Observable<boolean> | undefined

  constructor(private authService:AuthService){}

  ngOnInit() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.userEmail = JSON.parse(storedUser).email;
    }

   this.isloggedIn$= this.authService.isLoggedIn()
  }

  logOunt(){
    this.authService.logOut()
  }
  

}
