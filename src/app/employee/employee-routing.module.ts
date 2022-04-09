import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'departments', component: DepartmentComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'employee-detail/:id', component: EmployeeDetailComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'employee-leaves', component: EmployeeLeavesComponent },
      { path: 'employee-list', component: EmployeeListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
