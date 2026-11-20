
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  loading = this.authStore.loading;
  error = this.authStore.error;

  async login() {
    if (!this.email().trim() || !this.password()) {
      return;
    }

    const success = await this.authStore.login(
      this.email().trim(),
      this.password()
    );

    if (success) {
      this.router.navigate(['/kitchen']);
    }
  }
}
