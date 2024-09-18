import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ExistEmailValidator } from 'src/app/CustomValidators/existEmailValidator';
import { PasswordMatch } from 'src/app/CustomValidators/PasswordMatchValidator';
import { IUser } from 'src/app/Models/iuser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  userRegisterForm: FormGroup;
  existUserEmails: string[] = [];

  constructor(private formBuilder: FormBuilder) {

    // call API to fill user emails, or better send the email to the server and get the response
    this.existUserEmails = [
      'menna@gmail.com',
      'menna2@gmail.com',
      'menna3@gmail.com',
      'menna4@gmail.com',
    ]

    this.userRegisterForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: ['', [Validators.required, ExistEmailValidator(this.existUserEmails), Validators.email]],
      phoneNumber: this.formBuilder.array([this.formBuilder.control('')]),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        street: ['', [Validators.required]]
      }),
      referral: [''],
      referralOther: ['']
    }, { validators: PasswordMatch() });


  }

  ngOnInit(): void { }

  get FullName() {
    return this.userRegisterForm.get('fullname');
  }
  get PhoneNumber() {
    return this.userRegisterForm.get('phoneNumber') as FormArray;
  }
  get Email() {
    return this.userRegisterForm.get('email');
  }
  get Password() {
    return this.userRegisterForm.get('password');
  }
  get ConfirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }
  get Referral() {
    return this.userRegisterForm.get('referral');
  }
  submit() {
    let userModel: IUser = this.userRegisterForm.value as IUser

    // call API, and send user data
    console.log(userModel)
  }

  UpdateReferralValidator() {
    if (this.Referral?.value == 'other') {
      this.userRegisterForm?.get('referralOther')?.addValidators([Validators.required]);
    }
    else {
      this.userRegisterForm?.get('referralOther')?.clearValidators();
    }
    //&  without 'updateValueAndValidity' the addValidators & clearValidators won't be updated
    this.userRegisterForm?.get('referralOther')?.updateValueAndValidity();
  }

  AddPhone() {
    //! push form control to the array of numbers not array of controls
    this.PhoneNumber.push(this.formBuilder.control(''));
  }

  //~ Sync validator function
  // recommended to use async to send and recieve data from API, it isn't right to call thouthands of emails to check, just call an API to check
  // ExistEmailValidator(existEmails: string[]): ValidatorFn {
  //   //  AbstractControl is the base class (parent) for all form controls
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let emailValue = control.value;
  //     // object => validationError = {'key' : { 'value} : '' }}
  //     let validationError = { 'ExistEmail': { 'value': emailValue } }

  //     if (emailValue.length == 0) return null;

  //     let foundEmail = existEmails.find((e) => {
  //       return e == emailValue as string;
  //     });

  //     console.log("emailValue", emailValue)
  //     console.log("Emails: ", this.existUserEmails)
  //     console.log("foundEmail", foundEmail)

  //     return foundEmail ? validationError : null;
  //     // return (emailValue.includes('@')) ? null : validationError;

  //   }
  // }

  FillForm() {
    //! all properties must be provided not like patchValue
    // this.userRegisterForm.setValue({
    //   fullname:'Menna',
    //   email: 'menna@gmail.com',
    //   phoneNumber: '0123456789',
    //   address:{
    //     city: 'cairo',
    //     postalCode: '12345',
    //     street: 'street 1'
    //   }
    // })

    this.userRegisterForm.patchValue({
      fullname: 'Menna',
      email: 'menna@gmail.com',
      phoneNumber: '0123456789',
      address: {
        city: 'cairo',
        postalCode: '12345',
        street: 'street 1'
      }
    })
  }

}
