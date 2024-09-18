
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function ExistEmailValidator(existEmails: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let emailValue = control.value;
        // object => validationError = {'key' : { 'value} : '' }}
        let validationError = { 'ExistEmail': { 'value': emailValue } }

        if (emailValue.length == 0) return null;
        
        console.log("emailValue", emailValue)

        let foundEmail = existEmails.find((e) => {
            return e == emailValue;
        });

        console.log("Emails: ", existEmails)
        console.log("foundEmail", foundEmail)

        return foundEmail ? validationError : null;
        // return (emailValue.includes('@')) ? null : validationError;

    }
}