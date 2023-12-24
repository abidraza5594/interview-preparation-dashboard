// signup.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData: { email: string, password: string } = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.authService.login(this.formData.email, this.formData.password);
  }
}
