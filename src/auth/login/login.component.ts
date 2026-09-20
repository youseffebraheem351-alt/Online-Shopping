import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],  // ضفنا NgIf هنا
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = ''; // ✅ أضفناها هنا لحل المشكلة

  constructor(private router: Router) {}

  onLogin() {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (
      savedUser.email === this.loginData.email &&
      savedUser.password === this.loginData.password
    ) {
      localStorage.setItem('token', 'true');
      this.errorMessage = ''; // ✅ مسح أي رسالة قبل التنقل
      alert('Login successful!');
      this.router.navigate(['/all']);
    } else {
      this.errorMessage = 'Invalid email or password'; // ✅ اظهار رسالة الخطأ
    }
  }




  
}
