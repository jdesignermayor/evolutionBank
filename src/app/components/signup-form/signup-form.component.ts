import { UserInformation } from '../../../model/user.interface';
import { AuthService } from '../../services/auth.service';

import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  displayPinField: boolean = false;
  displayPinNumber: string = "";
  errorMessage: string = ""

  userInformation: UserInformation = {
    email: "",
    phone: 0,
  };

  pinNumberForm = new FormGroup({
    pinNumber: new FormControl('', [Validators.required]),
  });

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.min(10), Validators.required]),
  });

  constructor(private _auth: AuthService, private router: Router) { }

  onSubmit = async () => {
    if (this.signUpForm.valid) {
      this.userInformation.email = this.signUpForm.get('email')?.value;
      this.userInformation.phone = this.signUpForm.get('phone')?.value;
      try {
        this._auth.signInProccess(this.userInformation).then((res: any) => {
          const { pinNumber } = res.userInformation;
          this.displayPinField = true;
          this.displayPinNumber = pinNumber;
          this.errorMessage = "";
        }).catch((err: any) => {
          this.errorMessage = err.message;
        })
      } catch (error) {
        console.log('something went wrong');
      }
    } else {
      alert('please review the fields.')
    }
  }

  onSubmitPinNumber = () => {
    if (this.pinNumberForm.valid) {
      let pinNumber = this.pinNumberForm.get('pinNumber')?.value;
      this._auth.signInWithPinNumberProccess(pinNumber).then((res: any) => {
        const { id } = res;
        this._auth.getUserData(id).then((data: any) => {
          const navigationExtras: NavigationExtras = {
            state: {
              data,
            },
          };
          this.errorMessage = "";
          this.router.navigateByUrl('/dashboard', navigationExtras);
        })
      }).catch((err) => {
        this.errorMessage = err.message;
      })
    }
  }
}
