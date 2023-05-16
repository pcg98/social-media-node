import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { MessagesService } from '../services/messages-service.service';
import { UserService } from '../services/user.service';
import { CustomValidators } from './custom-validatiors';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  sexes :string[] = ['man','woman','other'];
  user : any = {};
  userForm: FormGroup;
  httpAnswerMessageError: string;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private MessagesService: MessagesService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)], [CustomValidators.uniqueUsername(this.userService)]],
      telephone: ['', [Validators.required, Validators.minLength(3), CustomValidators.phoneValidator()]],
      email: ['', [Validators.required, Validators.email, /*CustomValidators.uniqueEmail()*/]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      sex: ['', [Validators.required]],
      bio: ['', Validators.maxLength(100)]
    });
  }
  onSubmit(){

    this.userService.createUser(this.user) // pass the user object to the createUser() method in the UserService
      .subscribe(() => {
        console.log('User created successfully!');
        this.MessagesService.sendMessageAndRedirect('Login successful', '/home');
      }, error => {
        console.log(error);
        console.log(error.nicknameTaken);
        if(error.error.nicknameTaken){
          alert("Nickname taken")
        }
        if(error.error.emailTaken){
          alert("Email taken")
        }
        if(error.error.telephoneTaken){
          alert("Telephone taken")
        }
        //this.httpAnswerMessageError = error.error;
      });
      console.log(this.userForm.value)
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ mismatchedPasswords: true })
      }
    }
  }
}
