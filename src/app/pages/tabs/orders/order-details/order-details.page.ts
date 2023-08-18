import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {


  orderId: number;
  order: any = {};

  constructor(public route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails() {
    const apiUrl = 'https://paos.jorgevulgarin.cc/api/order';
  
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const orders = response.orders;
        this.order = orders.find(order => order.id === this.orderId);
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  getTotalAmount(): number {
    return this.order?.order_products?.reduce((total, item) => total + item.product.price, 0) || 0;
  }

  
}
