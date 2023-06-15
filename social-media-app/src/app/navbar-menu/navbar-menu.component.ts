import { Component, Input, OnInit } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {

  @Input() isLogged: boolean = false;
  hasNewNotifications: boolean = false;


  constructor(private tokenStorageService: TokenStorageService,
    private actionsService: ActionsService) { }

  ngOnInit() {
    this.hasNotifications();
  }

  hasNotifications(){
    this.actionsService.hasNotifications().subscribe(
      (result: boolean) => {
        console.log(result)
        this.hasNewNotifications = result;
        console.log(result);
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error if the API request encounters an error
      }
    );
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
