import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  allTransactions: any[] = [];
  transactions: any[] = [];
  segmentValue = 'in';

  constructor() { }

  ngOnInit() {
    this.allTransactions = [
      {id:1, to: 'Carmen Flores', date: '2023-06-14', amount: 44},
      {id:2, to: 'Jannett Rodriguez', date: '2023-05-23', amount: 15},
      {id:3, to: 'Ana Mendoza', date: '2023-05-1', amount: 17},
      {id:4, to: 'Gabriel Jimenez', date: '2023-05-10', amount: 12.50},
      {id:5, to: 'Jorge Vulgarin', date: '2023-04-7', amount: 8.75},
      {id:6, to: 'Gabriel Herrera', date: '2023-04-24', amount: 26},
      {id:7, to: 'Carlos Zambrano', date: '2023-08-14', amount: 44},
      {id:8, to: 'Lisset Mera', date: '2023-07-23', amount: 15},
      {id:9, to: 'Andres Flores', date: '2023-08-1', amount: 17},
      {id:10, to: 'Karen Cepeda', date: '2023-08-10', amount: 12.50},
      {id:11, to: 'Claus Redfield', date: '2023-06-7', amount: 8.75},
      {id:12, to: 'Manuel Carreño', date: '2023-01-24', amount: 26}
    ]
    this.filterTransactions();
  }

  filterTransactions() {
    if (this.segmentValue === 'in') {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Enero es 0, Febrero es 1, etc.
      this.transactions = this.allTransactions.filter(x => {
        const transactionDate = new Date(x.date);
        return transactionDate.getMonth() + 1 === currentMonth;
      });
    } else {
      this.transactions = this.allTransactions;
    }
  }
  

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
    this.filterTransactions();
  }

}
