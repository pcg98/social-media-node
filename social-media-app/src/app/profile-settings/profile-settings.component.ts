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

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    //Create the form
    this.form = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(3)],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      profile_picture: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
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
    });
  }

  saveSettings() {
    // Logic to save the settings to the server
    console.log('Saving settings:', this.user);
    this.fetchData();
  }

  onFileSelected(event: any) {
    // Logic to handle the selected profile picture file
    const file = event.target.files[0];
    this.fetchData();
  }

}
