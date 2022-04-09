import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public baseApiUrl: string = "https://localhost:44314/Department"
  constructor(private httpClient: HttpClient) { }

  getAllDepartment() {
    return this.httpClient.get<any>(this.baseApiUrl);
  }
}
