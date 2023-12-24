import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggrdIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  isLoggedInGaurd:boolean=false

  constructor(private afAuth:AngularFireAuth,
    private toaster:ToastrService,
    private router:Router) { }


  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then((logRef)=>{
    this.toaster.success("login Successfully")
    this.loadUser()
    this.loggrdIn.next(true)
    this.isLoggedInGaurd=true
    this.router.navigate(['/'])
    }).catch((error)=>{
      this.toaster.warning("Invalid Creadential")
    })
  }


  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      console.log(JSON.parse(JSON.stringify(user)))
      localStorage.setItem('user',JSON.stringify(user))
    })
  }


  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toaster.success("Logout Successfull.")
      localStorage.removeItem('user')
      this.loggrdIn.next(false)
      this.isLoggedInGaurd=false
      this.router.navigate(['/login'])
    })
  }


  isLoggedIn(){
    return this.loggrdIn.asObservable()
  }





}
