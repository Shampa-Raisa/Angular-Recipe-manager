import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  email = '';
  password = '';
  error: string | null = null;
  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    try {
      if (this.isLoginMode) {
        this.authService.login(this.email, this.password);
      } else {
        this.authService.register(this.email, this.password);
      }

      this.error = null;
      } catch (err: any) {
        this.error = err.message || 'Something went wrong!';
      }
  }
}
