import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;

  constructor(private authService: UserAuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
}
