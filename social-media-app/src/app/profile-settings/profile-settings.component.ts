import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: User;
  form: FormGroup;
  visibilyOptions: any;
  imageFile: File;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    //Create the form
    this.form = this.formBuilder.group({
      name: ['', [Validators.nullValidator, Validators.minLength(3)] ],
      last_name: ['', [Validators.nullValidator, Validators.minLength(3)]],
      password: ['', [Validators.nullValidator, Validators.minLength(3)]],
      user_visibilityid: ['', [Validators.nullValidator]],
      // Add more form controls as needed
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
    },
    err => {
      console.log("Ha habido un error en el fetch");
    });
    this.visibilyOptions = [
      { id: 1, visibility: "public" },
      { id: 2, visibility: "private" }
    ];
  }

  saveSettings() {
    // Logic to save the settings to the server
    console.log('Saving settings:', this.user);
    this.fetchData();
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Create a new object for the modified fields
      const updatedFields = {};

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
          console.log('Update successful');
          console.log(response);
        },
        error => {
          // Handle any errors that occurred during the server update
          console.error('Update failed', error);
        }
      );
    } else {
      // Form is invalid, handle validation errors
      console.log('Form is invalid');
    }
  }

  private updateUser() {
    this.userService.updateUser(this.form.value)
    .subscribe((response) => {
      console.log("Succesful request", response)
    },
    error => {
        console.log("Ha habido un error", error);
    });
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
          console.log('Image uploaded successfully', response);
          // Handle success response
        },
        error => {
          console.error('Error uploading image', error);
          // Handle error response
        }
      );
  }

}
