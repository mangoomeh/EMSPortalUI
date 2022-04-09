import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: [''],
      Mobile: [''],
      Designation: [''],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.authService.signupUser(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
        }
      })
    } else {
      alert('Not Valid!');
    }
  }
}
