import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  msg: string = '';

  loginForm: FormGroup;

  constructor(public userServ: UserService, public router: Router,private prodServ: ProductsService, public toaster: ToastrService){}

  ngOnInit(): void {
    $('.toggle').click(()=>{
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });

    this.loginForm = new FormGroup({
      'Username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'Password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')])
    })

  }

  get userNameCtrl(){
    return this.loginForm.get('Username');
  }

  get userPasswordCtrl(){
    return this.loginForm.get('Password');
  }

  doRegistration(form: NgForm){
      this.userServ.registerForm(form.value).subscribe({
        next: (data: string) => {

          (data);
          this.msg = data;
          form.reset();
        }, error: (error: any ) => {
          
          (error);
        }
      });
  }

  doLogin(){
    // (this.loginForm.value)
        this.userServ.loginForm(this.loginForm.value).subscribe({
          next: (data: string) => {
            // (datas);
          if(data.length > 0){
            localStorage.setItem('loggedUser',data);
            this.prodServ.updateCart.next('');
            this.router.navigateByUrl('/');
            this.toaster.success('Login Successfully');
           
          }
          else{
            this.msg = 'invalid username / password';
            this.loginForm.reset();
          }

            // this.loginForm.reset();

          }, error: (error: any) => {

            (error)

          }
        })
       
  }
}
