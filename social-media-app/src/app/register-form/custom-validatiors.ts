import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

const URL_API = environment.apiUrl+'users';
@Injectable({ providedIn: 'root' })
export class CustomValidators {
  constructor(private userService: UserService) {}

  nicknameTakenValidator(): AsyncValidatorFn {
    console.log("Enter to check the nickname unique");
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const value = control.value;
      return this.userService.checknicknameUnique(value).pipe(
        map(isAvailable => (isAvailable ? null : { nicknameTaken: true })),
        catchError(() => of(null)) // Handle errors and return null if needed
      );
    };
  }


  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const value = control.value;
      return this.userService.emailAvaliable(value).pipe(
        map(isAvailable => (isAvailable ? null : { emailTaken: true })),
        catchError(() => of(null)) // Handle errors and return null if needed
      );
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d{10}$/g.test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }

}
