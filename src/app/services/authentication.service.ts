import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({ providedIn: "root" })
export class AuthenticationService {

    private url = 'https://kdnodeappbackend.herokuapp.com/';
    mydata: any[];

  constructor(private http: HttpClient) {    
  }

  createWallet(username: string, balance: number) {

    return this.http
      .post<any>(this.url + 'setup', { username, balance })
      .pipe(
        map(user => {
          localStorage.setItem("currentUser", JSON.stringify(user.data));
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }

  public getUser(): any {
    const user = localStorage.getItem("currentUser");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public makeTransactions(walletId, amount, description): Observable<any> {
    let finalurl = this.url + `transact/${walletId}`
    return this.http.post<any>(
      finalurl,
      { amount, description},
    );
  }


  public getTransactions(walletId, skip?, limit?) {  
    let params = new HttpParams();
    params = params.append('walletId', walletId);
    params = params.append('skip', skip || 0);
    params = params.append('limit', limit || 100);


      return this.http.get(this.url + 'transactions', {params: params})
    }
  

  }


