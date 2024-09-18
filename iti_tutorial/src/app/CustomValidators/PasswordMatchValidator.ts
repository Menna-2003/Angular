import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let passwordControl = control.get('password')
        let confirmPasswordControl = control.get('confirmPassword')

        let validationError = { 'UnmatchPasswords': { 'pass': passwordControl?.value, 'confirmPass': confirmPasswordControl?.value } }

        // if (!passwordControl || !confirmPasswordControl || !passwordControl.value || !confirmPasswordControl.value) {
        //     return null;
        // }
        
        return (passwordControl?.value == confirmPasswordControl?.value) ? null : validationError

    }
}