import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  public LoggedInUser: string = '';
  status: boolean = false;
  currentRole : string = "";
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getRole();
  }
  clickEvent() {
    this.status = !this.status;
  }

  getRole() {
    this.currentRole = this.authService.getUserRole();
    console.log(this.currentRole);
  }
}
