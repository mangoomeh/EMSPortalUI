import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // step 1
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // step 2

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {} // step 3: inject form builder

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.required],
    }); // step 4: init the form
    console.log(this.authService.loginUser(this.loginForm.value));
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert('login Success!');
          this.router.navigate(['employee']);
          localStorage.setItem('token', res.Token);
          if (this.authService.getUserRole() === "No Role") {
            this.router.navigate(['employee/employee-detail', ])
          }
        },
      });
      console.log(this.loginForm.value);
    } else {
      alert('Form not valid');
    }
  }
}
