import { Component, OnInit } from '@angular/core';
import { BillsService, Bill } from '../../../../services/bills';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './bills.html',
  styleUrls: ['./bills.css']
})
export class UserBillsComponent implements OnInit {
  bills: Bill[] = [];
  newBill: Partial<Bill> = {
    billType: '',
    customerId: '',
    amount: 0
  };

  userId: number = Number(localStorage.getItem('userId')) || 101; // mock userId

  constructor(private billsService: BillsService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  // Load user bills
  loadBills() {
    this.billsService.getBillsByUser(this.userId).subscribe(data => {
      this.bills = data;
    });
  }

  // Create new bill
  addBill() {
    const bill: Bill = {
      ...this.newBill,
      userId: this.userId,
      userName: localStorage.getItem('userName') || 'User',
      amount: Number(this.newBill.amount),
      billType: this.newBill.billType!,
      customerId: this.newBill.customerId!
    };

    this.billsService.createBill(bill).subscribe(saved => {
      this.bills.push(saved);
      this.newBill = { billType: '', customerId: '', amount: 0 }; // reset form
    });
  }

  // Pay bill
  payBill(billId: number) {
    this.billsService.payBill(billId).subscribe(updated => {
      const index = this.bills.findIndex(b => b.billId === billId);
      if (index > -1) this.bills[index] = updated;
    });
  }
}
