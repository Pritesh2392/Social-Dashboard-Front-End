import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import { Router } from '@angular/router';
import { User } from '../../model/usermodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  response: any;
  
  constructor(private builder:FormBuilder,private service:RegisterService,private router: Router) {}

  mobileNo = new FormControl('', [Validators.required,Validators.minLength(3)]);  
  userpassword = new FormControl('', [Validators.required,Validators.minLength(3) ]);

  loginForm: FormGroup = this.builder.group({
    mobileNo : this.mobileNo,  
    userpassword: this.userpassword,
  });

  


  ngOnInit(): void {
    localStorage.clear();
  }

loginSubmit(): void{
  this.service.Login_User(this.loginForm.value)
      .subscribe(data => {
        this.response = data;
        
        if(this.response.statusCode==200)
        {
            let responedata=this.response.data.replaceAll("\r\n","");
            let data=JSON.parse(responedata);
            
            localStorage.setItem('MobileNo',data[0].MobileNo)
            localStorage.setItem('UserID',data[0].UserID);
            localStorage.setItem('RoleID',data[0].RoleID);
            this.router.navigate(['/dashboard']);
        }
        else
        {
            alert("Invalid Login Details");
        }    
  })
}

}
