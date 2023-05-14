import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';

const URL_API = environment.apiUrl+'users';
export class CustomValidators {

  static uniqueUsername(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService.checkUsernameUnique(control.value).pipe(
        map((response: any) => {
          console.log("Username exist")
          return response.available ? null : { usernameTaken: true };
        }),
        catchError(() => of(null))
      );
    };
  }

  static uniqueEmail(http: HttpClient) {
    return (control: FormControl) => {
      const email = control.value;
      return http.get(URL_API+'/check-email', { params: { email } })
        .pipe(
          map((res: any) => res.exists ? { uniqueEmail: true } : null)
        );
    };
  }
  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = /^\d{10}$/g.test(control.value);
      return valid ? null : { 'invalidPhone': true };
    };
  }
}
