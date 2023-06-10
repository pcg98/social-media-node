import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FlashMessagesService } from '../services/flash-messages.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: User;
  form: FormGroup;
  visibilyOptions: any = [];
  imageFile: File;


  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    //Create the form
    this.form = this.formBuilder.group({
      name: ['', [Validators.nullValidator, Validators.minLength(3)] ],
      last_name: ['', [Validators.nullValidator, Validators.minLength(3)]],
      password: ['', [Validators.nullValidator, Validators.minLength(3)]],
      user_visibilityid: ['', [Validators.nullValidator, this.visibilityOptionValidator]],
      // Add more form controls
    });
    //Get the user
    this.fetchData();
  }

  fetchData(){
    this.userService.getCurrentUser()
    .subscribe((data: any) => {
      console.log(data);
      this.user = data.currentUser;
      this.form.patchValue({
        name: data.name,
        last_name: data.last_name,
        password: ""
      })
    },err => {
      this.flashMessagesService.showError("Ha habido un error en el fetch data "+err);
    });
    this.visibilyOptions = [
      { id: 1, visibility: "public" },
      { id: 2, visibility: "private" }
    ];
  }


  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Create a new object for the modified fields
      const updatedFields = {};
      console.log(formValue);

      // Check each field if it has been modified and add it to the updatedFields object
      if (this.form.controls.name.dirty) {
        updatedFields['name'] = formValue.name;
      }

      if (this.form.controls.last_name.dirty) {
        updatedFields['last_name'] = formValue.last_name;
      }

      if (this.form.controls.password.dirty) {
        updatedFields['password'] = formValue.password;
      }
      if (this.form.controls.user_visibilityid.dirty) {
        updatedFields['user_visibilityid'] = formValue.user_visibilityid;
      }

      // Send the updatedFields object to the server
      this.userService.updateUser(updatedFields).subscribe(
        response => {
          // Handle the server response if needed
          this.flashMessagesService.showSuccess('Update successful');
          console.log(response);
        },
        error => {
          // Handle any errors that occurred during the server update
          this.flashMessagesService.showError('Update failed' +error);
        }
      );
    } else {
      // Form is invalid, handle validation errors
      this.flashMessagesService.showError('Invalid form');
    }
  }


  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }
  changeProfilePicture() {
    const formData = new FormData();
    formData.append('image', this.imageFile);

    this.userService.changeProfilePicture(this.imageFile)
      .subscribe(
        response => {
          this.flashMessagesService.showSuccess('Image uploaded successfully');
          // Handle success response
        },
        error => {
          this.flashMessagesService.showError('Error uploading image' +error);
          // Handle error response
        }
      );
  }

  //Check that the visibilty value is inside
  visibilityOptionValidator = (control: AbstractControl): { [key: string]: any } | null => {
    const selectedOption = control.value;
    console.log(this.visibilyOptions);

    const isValidOption = this.visibilyOptions.some(option => option.id === selectedOption);
    console.log(isValidOption+ " final")
    return isValidOption ? null : { invalidVisibilityOption: true };
  }


}
