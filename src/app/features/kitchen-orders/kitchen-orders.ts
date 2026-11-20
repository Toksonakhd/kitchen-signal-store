
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { OrdersStore } from '../../store/orders.store';

@Component({
  selector: 'app-kitchen-orders',
  imports: [],
  templateUrl: './kitchen-orders.html',
  styleUrl: './kitchen-orders.scss'
})
export class KitchenOrders implements OnInit {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private ordersStore = inject(OrdersStore);

  orders = this.ordersStore.orders;
  loading = this.ordersStore.loading;
  updating = this.ordersStore.updating;
  error = this.ordersStore.error;

  ngOnInit() {
    if (!this.authStore.accessToken()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrders();
  }

  loadOrders() {
    this.ordersStore.loadOrders();
  }

  updateStatus(id: string, status: string) {
    this.ordersStore.updateStatus(id, status);
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
