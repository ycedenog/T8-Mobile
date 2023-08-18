import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OrdersPage } from './orders.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders and filtered orders on ngOnInit', () => {
    component.ngOnInit();
    expect(component.orders).toBeTruthy();
    expect(component.filteredOrders).toEqual(component.orders);
  });

  it('should filter orders based on searchTerm', () => {
    component.orders = [
      { id: 1, state: 'PENDING', delivery_address: 'Address 1' },
      { id: 2, state: 'PROCESSING', delivery_address: 'Address 2' },
    ];
    component.searchTerm = '1';

    component.filterOrders();
    expect(component.filteredOrders.length).toBe(1);
    expect(component.filteredOrders[0].id).toBe(1);
  });

  it('should navigate to order details with correct order ID', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.orders = [{ id: 1, state: 'PENDING', delivery_address: 'Address 1' }];
    component.viewOrderDetails(1);

    expect(routerSpy).toHaveBeenCalledWith(['/tabs/orders/order-details'], {
      state: { orderDetails: component.orders[0] },
    });
  });
});
