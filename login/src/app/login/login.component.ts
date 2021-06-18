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

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data:any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  userForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16)]],

    }
  );
  ngOnInit(): void {}

  submit(){
    this.submitted = true;

    if(this.userForm.invalid){
      return;
    }

    this.dataService.login(this.userForm.value).subscribe(res =>{
      this.data = res;
      // console.log(res);
      if(this.data.status === 1){
        this.token = this.data.data.token;
        localStorage.setItem('token',this.token);
        this.router.navigate(['/']);
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
    });
  }
}
