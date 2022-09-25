import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { ExcelService } from '../services/excel.service';


@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent {

    public user: any = {};
    public transactionList: any = []

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private flashMessage: FlashMessagesService,
        private excelService: ExcelService
    ) { }

    ngOnInit() {
        this.user = {}
        this.user = this.authenticationService.getUser();
        this.getTransactionData();
    }

    ngOnChange() {
        this.user = this.authenticationService.getUser();
        this.getTransactionData();
    }

    getTransactionData() {
        this.authenticationService.getTransactions(this.user.walletId).subscribe((data: any) => {
            this.transactionList = this.cleanData(data.body);
        });
    }

    cleanData(data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log(element)
            element['amount'] = parseFloat(element.amount.$numberDecimal);
            element['balance'] = parseFloat(element.balance.$numberDecimal);
        }
        return data;
    }

    logout() {
        this.authenticationService.logout();
        this.user = '';
        this.transactionList = []
        this.router.navigate(['/']);
    }

    onSubmit(data: any) {
        let walletId = this.user.walletId
        let amount;
        amount = data.amount - (data.amount * 2)
        if (data.type == true) {
            amount = data.amount
        }
        this.authenticationService.makeTransactions(walletId, amount, data.description).subscribe((data) => {
            let localData = JSON.parse(localStorage.getItem("currentUser"))
            localData.Balance = data.body.balance
            localStorage.setItem("currentUser", JSON.stringify(localData));
            if (data) {
                this.flashMessage.show('Transaction successful', { cssClass: 'alert-success', timeout: 3200 });
            } else {
                this.flashMessage.show('Transaction failed', { cssClass: 'alert-danger', timeout: 3200 });
            }
            this.user = this.authenticationService.getUser();
            this.getTransactionData();
        });;
    }

    exportAsXLSX(): void {
        this.excelService.exportAsExcelFile(this.transactionList, 'sample');
    }

}