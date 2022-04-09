import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:44314/';
  constructor(private httpClient: HttpClient, private router: Router) {}
  loginUser(loginObj: any) {
    return this.httpClient.post<any>(this.baseUrl + 'Auth/login', loginObj);
  }

  isUserLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.clear();
  }

  getLoggedInUser() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]!));
      console.log(decodedJWT);
      return decodedJWT;
    }
  }

  getUserName() {
    let decodedJWT = this.getLoggedInUser();
    return decodedJWT.FullName ? decodedJWT.FullName : 'No Name';
  }

  getUserRole() {
    let decodedJWT = this.getLoggedInUser();
    return decodedJWT.Role ? decodedJWT.Role : 'No Role';
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signupUser(userObj: any) {
    return this.httpClient.post<any>(this.baseUrl + 'Employee/add', userObj);
  }
  getEmployees() {
    return this.httpClient.get<any>(this.baseUrl + 'Employee');
  }
  getEmployee(id: number) {
    return this.httpClient.get<any>(this.baseUrl + `Employee/${id}`);
  }
  deleteEmployeeId(id: number) {
    return this.httpClient.delete<any>(this.baseUrl + `Employee/${id}`);
  }
  updateEmployeeId(id: number, empObj: any) {
    return this.httpClient.put<any>(this.baseUrl + `Employee/${id}`, empObj);
  }
}
