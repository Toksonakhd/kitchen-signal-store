
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth';

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState({
    accessToken: localStorage.getItem('accessToken') || '',
    loading: false,
    error: ''
  }),

  withMethods((store, authService = inject(AuthService)) => ({
    async login(email: string, password: string) {
      patchState(store, { loading: true, error: '' });

      try {
        const result = await firstValueFrom(
          authService.login(email, password)
        );

        localStorage.setItem('accessToken', result.accessToken);

        patchState(store, {
          accessToken: result.accessToken,
          loading: false
        });

        return true;
      } catch {
        patchState(store, {
          loading: false,
          error: 'Login failed'
        });

        return false;
      }
    },

    logout() {
      localStorage.removeItem('accessToken');
      patchState(store, { accessToken: '' });
    }
  }))
);
