import { Component } from '@angular/core';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  

  constructor(private builder:FormBuilder,private service:RegisterService) {}

   response:any;
   firstname= new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]);
   lastname= new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]);
   mobile= new FormControl('',[ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$") ]);
   userpassword= new FormControl('',[Validators.required,Validators.minLength(6)]);
   userconfpassword= new FormControl('',[Validators.required,Validators.minLength(6)]);
   referencesite= new FormControl('',[Validators.required,Validators.minLength(3)]);

  ngOnInit(): void {
  }



  registerform : FormGroup = this.builder.group({
    firstname:this.firstname,
    lastname:this.lastname,
    mobile:this.mobile,
    userpassword:this.userpassword,
    userconfpassword:this.userconfpassword,
    referencesite:this.referencesite
  })


  onSubmitregistration(): void {
    this.service.Create_User(this.registerform.value)
      .subscribe( data => {
        
        this.response = data;
        console.log(this.response);
        return false;        
  })
}
}
