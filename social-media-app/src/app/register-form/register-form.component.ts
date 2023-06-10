import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FlashMessagesService } from '../services/flash-messages.service';
import { MessagesService } from '../services/messages-service.service';
import { UserService } from '../services/user.service';
import { CustomValidators } from './custom-validatiors';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  sexes: string[] = ['man', 'woman', 'other'];
  user: any = {};
  userForm: FormGroup;
  httpAnswerMessageError: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private MessagesService: MessagesService,
    private customValidators: CustomValidators,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      nickname: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.customValidators.uniquenicknameValidator()]
      ],
      telephone: [
        '',
        [Validators.required, Validators.minLength(3),
        this.customValidators.phoneValidator()]//After send the form
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      sex: ['', [Validators.required]],
      bio: ['', Validators.maxLength(100)]
    });
  }

  onSubmit() {
    //If the form is invalid we show error message
    if(!this.userForm.valid){
      //If it's invalid we show the error
      this.flashMessagesService.showError('The form is invalid');
    }
    //If it's correct
    this.userService.createUser(this.user).subscribe(
      () => {
        this.flashMessagesService.showSuccess('User created successfully!');
        this.MessagesService.sendMessageAndRedirect('Login successful', '/home');
      },
      (error) => {
        console.log(error);
        console.log(error.nicknameTaken);
        if (error.error.nicknameTaken) {
          this.flashMessagesService.showError('Nickname taken');
        }
        else if (error.error.emailTaken) {
          this.flashMessagesService.showError('Email taken');
        }
        else if (error.error.telephoneTaken) {
          this.flashMessagesService.showError('Telephone taken');
        }
        else{
          this.flashMessagesService.showError('Something was wrong');
        }
      }
    );

  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ mismatchedPasswords: true });
      }
    };
  }
}
