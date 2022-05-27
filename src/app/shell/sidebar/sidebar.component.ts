import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  role = Roles;
  roleNumber!: number;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.roleNumber = this.authService.usserRole;
  }
}
