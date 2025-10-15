import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = ''; // ✅ تعريف صريح بالنوع لتفادي أي مشاكل في ngIf

  constructor(private router: Router) {}

  onRegister() {
    const { email, password, confirmPassword } = this.registerData;

    if (email && password && confirmPassword && password === confirmPassword) {
      const user = { email, password };
      localStorage.setItem('user', JSON.stringify(user));

      this.errorMessage = ''; // ✅ مسح الرسالة لو التسجيل صحيح
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }
}
