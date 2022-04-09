import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  // editForm!: FormGroup;
  // id: any;
  // employeeDetails: any;
  // constructor(
  //   private authService: AuthService,
  //   private activatedRoute: ActivatedRoute,
  //   private formBuilder: FormBuilder
  // ) {}

  // ngOnInit(): void {
  //   this.id = this.activatedRoute.snapshot.paramMap.get('id');
  //   this.employeeDetails = this.authService.getEmployee(this.id).subscribe({
  //     next: (res) => {
  //       this.employeeDetails = res.Result;
  //       console.log(res);
  //     },
  //   });
  //   this.editForm = this.formBuilder.group({
  //     FirstName: [''],
  //     LastName: [''],
  //     Email: [''],
  //     Mobile: [''],
  //     Address: [''],
  //     Designation: [''],
  //   });
  // }

  // updateEmployeeId(id: number) {
  //   this.authService.updateEmployeeId(id, this.editForm).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //   });
  // }

  empId !: number;
  empData !: EmployeeModel;
  constructor(private activatedRoute : ActivatedRoute, private empService : EmployeeService) { }
  ngAfterViewInit(): void {
   this.getEmployee();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.empId = val['id'];
      console.log(this.empId);
    })
  }
  getEmployee(){
    this.empService.getEmployeebyId(Number(this.empId))
    .subscribe((res:any)=>{
      this.empData = res.Result;
      this.empData.ProfileImageUrl = `https://localhost:44314/${this.empData.ProfileImageUrl}`
      console.log(this.empData);
    })
  }
}
