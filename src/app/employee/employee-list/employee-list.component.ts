import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public employeeList: any = [];
  public files: any;
  public imgUrl: string | ArrayBuffer | null = '';
  public departmentList: any = [];
  public roleList: any = [];
  public employeeForm!: FormGroup;
  employeeObj = new EmployeeModel();

  currentEmpId: number = 0;
  isEdit: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Address: [''],
      Mobile: [''],
      DepartmentId: [''],
      Designation: [''],
      Email: [''],
      Password: [''],
      RoleId: [''],
      ProfileImageurl: [''],
      StartDate: [''],
    });

    this.getAllEmployees();
    this.getAllDepartments();
    this.getAllRoles();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.employeeList = res.Result;
        this.employeeList.forEach((element: any) => {
          console.log(element.ProfileImageUrl);
          element.ProfileImageUrl =
            'https://localhost:44314/' + element.ProfileImageUrl;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllDepartments() {
    this.departmentService.getAllDepartment().subscribe({
      next: (res) => {
        console.log(res);
        this.departmentList = res.Result;
      },
    });
  }

  getAllRoles() {
    this.roleService.getAllRole().subscribe({
      next: (res) => {
        console.log(res);
        this.roleList = res.Result;
      },
    });
  }

  addEmployee() {
    this.employeeObj.FirstName = this.employeeForm.value.FirstName;
    this.employeeObj.LastName = this.employeeForm.value.LastName;
    this.employeeObj.Address = this.employeeForm.value.Address;
    this.employeeObj.RoleId = this.employeeForm.value.RoleId;
    this.employeeObj.DepartmentId = this.employeeForm.value.DepartmentId;
    this.employeeObj.Designation = this.employeeForm.value.Designation;
    this.employeeObj.StartDate = this.employeeForm.value.StartDate;
    this.employeeObj.Email = this.employeeForm.value.Email;
    this.employeeObj.Mobile = this.employeeForm.value.Mobile;
    this.employeeObj.Password = this.employeeForm.value.Password;
    let formData = new FormData();
    formData.append('EmployeeDetails', JSON.stringify(this.employeeObj));
    formData.append('EmployeeImages', this.files);
    console.log(this.files);
    this.employeeService.addEmployee(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.employeeForm.reset();
        document.getElementById('close-emp')?.click();
        this.getAllEmployees();
      },
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllEmployees();
      }
    })
  }

  updateEmployee() {
    this.employeeObj.Id = this.currentEmpId;
    this.employeeObj.FirstName = this.employeeForm.value.FirstName;
    this.employeeObj.LastName = this.employeeForm.value.LastName;
    this.employeeObj.Address = this.employeeForm.value.Address;
    this.employeeObj.RoleId = this.employeeForm.value.RoleId;
    this.employeeObj.DepartmentId = this.employeeForm.value.DepartmentId;
    this.employeeObj.Designation = this.employeeForm.value.Designation;
    this.employeeObj.StartDate = this.employeeForm.value.StartDate;
    this.employeeObj.Email = this.employeeForm.value.Email;
    this.employeeObj.Mobile = this.employeeForm.value.Mobile;
    this.employeeObj.Password = this.employeeForm.value.Password;
    let formData = new FormData();
    formData.append('EmployeeDetails', JSON.stringify(this.employeeObj));
    formData.append('EmployeeImages', this.files);
    console.log(this.files);
    this.employeeService.updateEmployee(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.employeeForm.reset();
        document.getElementById('close-emp')?.click();
        this.getAllEmployees();
      },
    });
  }

  onEditEmployee(row: any) {
    this.isEdit = true;
    console.log(row);
    this.currentEmpId = row.Id;
    this.employeeForm.controls['FirstName'].setValue(row.FirstName);
    this.employeeForm.controls['LastName'].setValue(row.LastName);
    this.employeeForm.controls['Address'].setValue(row.Address);
    this.employeeForm.controls['RoleId'].setValue(row.RoleId);
    this.employeeForm.controls['DepartmentId'].setValue(row.DepartmentId);
    this.employeeForm.controls['Designation'].setValue(row.Designation);
    this.employeeForm.controls['StartDate'].setValue(row.StartDate);
    this.employeeForm.controls['Email'].setValue(row.Email);
    this.employeeForm.controls['Mobile'].setValue(row.Mobile);
  }

  onAddEmployee() {
    this.isEdit = false;
    this.employeeForm.reset();
  }

  loadProfileImage(event: any) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.files[0]);
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      alert('You must select an image!');
    }
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/ == null)) {
      alert('Only images are supported');
      return;
    }
    if (event.target.files[0].size > 100000) {
      alert('Maximum size should be 100kB!');
      return;
    }
    this.files = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    };
  }

  seeDetails(id: number) {
    this.router.navigate(['employee/employee-detail', id])
  }
}
