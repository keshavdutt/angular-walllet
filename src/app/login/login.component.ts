import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (JSON.parse(localStorage.getItem("currentUser"))) {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {

    }


    onSubmit(data: any) {

        this.authenticationService.createWallet(data.username, data.balance)
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    // this.error = error;
                    // this.loading = false;
                });
    }
}
