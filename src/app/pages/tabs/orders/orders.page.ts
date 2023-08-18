import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const apiUrl = 'https://paos.jorgevulgarin.cc/api/order/';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.orders = response.orders;
        this.filteredOrders = [...this.orders];
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter(order => {
      const isPending = order.state.toLowerCase() === 'pending';
      const hasMatchingId = order.id.toString().includes(this.searchTerm.toLowerCase());
  
      return isPending && hasMatchingId;
    });
  }

  viewOrderDetails(orderId: number) {
    const selectedOrder = this.orders.find(order => order.id === orderId);
    if (selectedOrder) {
      this.router.navigate(['/tabs/orders/order-details', orderId], { state: { orderDetails: selectedOrder } });
    }
  }
}
