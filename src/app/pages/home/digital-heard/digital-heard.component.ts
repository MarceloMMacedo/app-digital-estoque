import { StorageService } from './../../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-digital-heard',
  templateUrl: './digital-heard.component.html',
  styleUrls: ['./digital-heard.component.css']
})
export class DigitalHeardComponent implements OnInit {
  isLogin:boolean=false;
  creds = {
    email:'' ,
    senha: ''
  };  

  validateForm!: FormGroup;
  constructor(
    private accountService: AccountService, 
    private router: Router,
    private utilServer: UtilsService,
    public storage: StorageService,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLogin=false;
    let localUser = this.storage.getLocalUser();
    if(localUser!=null){
      this.isLogin=true
    }
  
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]], 
      remember: [true]
    });
  
  }
    async onSubmit() {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
       {
         try {
           this.utilServer.utilspinnerShow();
           this.isLogin=   this.accountService.login(this.creds);
   
            
            
         } catch (error) {
           //console.error(error);
         }
       }
     }
     logout(){
      this.accountService.logout()
     }
}
