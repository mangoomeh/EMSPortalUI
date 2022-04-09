import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public baseApiUrl : string = "https://localhost:44314/Role"
  constructor(private httpClient : HttpClient) { }

  getAllRole() {
    return this.httpClient.get<any>(this.baseApiUrl)
  }
}
