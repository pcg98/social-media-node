import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
