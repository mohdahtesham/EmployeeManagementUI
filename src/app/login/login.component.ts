import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginView: boolean = true;
  uname: any;
  pswd: any;

  constructor(private employeeService: EmployeeService,
    private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  create(){
    this.loginView = false;
    let data = {
      email: this.uname,
      password: this.pswd
    }
    
    this.employeeService.create(data).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('email',this.uname);
        this.router.navigate(['/home']);
        
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.toastr.error('Email already exists.', 'Error');
      }
    );
  }
  login(){
    this.loginView = true;
    let data = {
      email: this.uname,
      password: this.pswd
    }
    
    this.employeeService.login(data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
        localStorage.setItem('email',this.uname);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.toastr.error('Email or Password entered is incorrect', 'Error');

      }
    );
    
  }

}
