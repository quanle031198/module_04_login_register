import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validator,
  ValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data:any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService  ) {}

  userForm = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/),
          Validators.maxLength(30),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16)]],
      password_confirmation: ['', Validators.required],
    },
    { validators: this.checkPassword() }
  );

  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('password_confirmation')?.value;
      return password === confirmPassword ? null : { notSame: true };
    };
  }
  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.dataService.registerUser(this.userForm.value).subscribe((res: any) => {
      this.data = res
      // console.log(res);
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 2000,
          progressBar: true
        });
      }
      this.submitted = false;
      this.userForm.get('name')?.reset();
      this.userForm.get('email')?.reset();
      this.userForm.get('password')?.reset();
      this.userForm.get('password_confirmation')?.reset();

    });
  }
}
