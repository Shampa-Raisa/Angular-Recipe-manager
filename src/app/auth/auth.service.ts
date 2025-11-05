import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface StoredUser {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Observable user state
  user = new BehaviorSubject<any>(null);

  private STORAGE_KEY = 'my_demo_users';

  constructor(private router: Router) {}


  private loadUsers(): StoredUser[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  private saveUsers(users: StoredUser[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

   // Register new user
  register(email: string, password: string) {
    const users = this.loadUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('This email is already registered');
    }
    users.push({ email, password }); // storing plain password (demo only)
    this.saveUsers(users);
    this.user.next({ email });
    this.router.navigate(['/']);
  }

  // Login existing user
  login(email: string, password: string) {
    const users = this.loadUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Invalid email or password');
    }
    this.user.next({ email });
    this.router.navigate(['/']);
  }

  // Logout user
  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
  }
}