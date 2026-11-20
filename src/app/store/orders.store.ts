
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { KitchenOrder, OrdersService } from '../services/orders';

export const OrdersStore = signalStore(
  { providedIn: 'root' },

  withState({
    orders: [] as KitchenOrder[],
    loading: false,
    updating: false,
    error: ''
  }),

  withMethods((store, ordersService = inject(OrdersService)) => ({
    async loadOrders() {
      patchState(store, { loading: true, error: '' });

      try {
        const orders = await firstValueFrom(ordersService.getOrders());

        patchState(store, {
          orders,
          loading: false
        });
      } catch {
        patchState(store, {
          loading: false,
          error: 'Failed to load orders'
        });
      }
    },

    async updateStatus(id: string, status: string) {
      patchState(store, { updating: true, error: '' });

      try {
        await firstValueFrom(ordersService.updateStatus(id, status));

        patchState(store, { updating: false });

        await this.loadOrders();
      } catch {
        patchState(store, {
          updating: false,
          error: 'Failed to update order'
        });
      }
    }
  }))
);
