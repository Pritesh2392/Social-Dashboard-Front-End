import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private builder:FormBuilder,private service:RegisterService) {
  }

   response:any;

   map: mapboxgl.Map;
   style = 'mapbox://styles/mapbox/streets-v11';
   lat = 22.100662116090128;
   lng = 73.21423307530257;

   facebookLink= new FormControl('',[Validators.minLength(3),Validators.maxLength(50)]);
   instagramLink= new FormControl('',[Validators.minLength(3),Validators.maxLength(50)]);
   twitterLink= new FormControl('',[Validators.minLength(3), Validators.maxLength(10)]);
   OtherLink= new FormControl('',[Validators.minLength(3)]);
   currentlongitude= new FormControl('',[Validators.minLength(6)]);
   currentlatitude= new FormControl('',[Validators.minLength(6)]);
   userId=new FormControl('');

   
   ngOnInit(): void {
    this.GetSocialMediaDetails();
  }

  socialmedia : FormGroup = this.builder.group({
    facebookLink:this.facebookLink,
    instagramLink:this.instagramLink,
    twitterLink:this.twitterLink,
    OtherLink:this.OtherLink,
    currentlongitude:this.currentlongitude,
    currentlatitude:this.currentlatitude,
    userId:localStorage.getItem('UserID'),
    currentLocation:""
  })

  GetSocialMediaDetails(): void {
    
    this.service.Get_SocialMediaDetail(Number(1))
      .subscribe( data => {
        
        this.response = data;
        if(this.response.statusCode==200)
          {
              let responedata=this.response.data.replaceAll("\r\n","");
              let data=JSON.parse(responedata);
              
              localStorage.setItem('MobileNo',data[0].MobileNo)
              localStorage.setItem('UserID',data[0].UserID);
              this.socialmedia.controls['currentlongitude'].setValue(data[0].Longitude);
              this.socialmedia.controls['currentlatitude'].setValue(data[0].Latitude);
              this.socialmedia.controls['facebookLink'].setValue(data[0].FacebookLink);
              this.socialmedia.controls['instagramLink'].setValue(data[0].InstagramLink);
              this.socialmedia.controls['twitterLink'].setValue(data[0].TwitterLink);
              this.socialmedia.controls['OtherLink'].setValue(data[0].OtherLink);   
          }
       
  })
}


  onSubmitSocialMedia(): void {
    this.service.Save_SocialMediaDetail(this.socialmedia.value)
      .subscribe( data => {
        
        this.response = data;
        console.log(this.response);
        return false;        
  })
}

}
