
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

export interface KitchenOrder {
  id: string;
  status: string;
  customerName?: string;
  itemCount?: number;
  total?: number;
  createdAt?: string;
  slaDeadline?: string;
  assignedWaiter?: string;
}

interface OrdersResponse {
  orders: KitchenOrder[];
  serverTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = 'https://srmsapi.stepacademy.ge/api/v1';

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
    });
  }

  getOrders() {
    return this.http.get<OrdersResponse>(
      `${this.apiUrl}/enterprise/orders/queue`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.orders)
    );
  }

  updateStatus(id: string, status: string) {
    return this.http.patch(
      `${this.apiUrl}/enterprise/orders/${id}/status`,
      { status },
      { headers: this.getHeaders() }
    );
  }
}
