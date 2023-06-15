import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  sexes: string[] = ['men', 'woman', 'other'];
  user: any = {};
  userForm: FormGroup;
  httpAnswerMessageError: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private MessagesService: MessagesService,
    private customValidators: CustomValidators,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      nickname: [
        '',
        [Validators.required, Validators.minLength(3)]
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
    this.userService.createUser(this.userForm).subscribe(
      () => {
        this.flashMessagesService.showSuccess('User created successfully!');
        this.MessagesService.sendMessageAndRedirect('User created successfully!', '/home');
      },
      (error) => {
        console.log(error);
        console.log(error.nicknameTaken);
        if (error.error.nicknameTaken) {
          this.flashMessagesService.showError('Nickname taken');
          this.userForm.get('nickname').setErrors({ nicknameTaken: true });
        }
        else if (error.error.emailTaken) {
          this.flashMessagesService.showError('Email taken');
          this.userForm.get('email').setErrors({ emailTaken: true });
        }
        else if (error.error.telephoneTaken) {
          this.flashMessagesService.showError('Telephone taken');
          this.userForm.get('telephone').setErrors({ telephoneTaken: true });
        }
        else{
          this.flashMessagesService.showError('Something was wrong '+error);
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
