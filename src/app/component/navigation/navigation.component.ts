import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserOptionsService } from 'src/app/service/user-options.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  isSideOpen: boolean = false;
  isMobile: boolean = true;
  width: number;

  constructor(
    private authService: AuthService,
    private userOption: UserOptionsService
  ) {}

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
    if (this.width > 568) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }

  changeTheme() {
    this.userOption.changeTheme();
  }

  showSideBar() {
    this.isSideOpen = true;
  }

  closeSideBar() {
    this.isSideOpen = false;
  }

  handleClick(event: MouseEvent) {
    event.stopPropagation();
  }

  logOut() {
    this.authService.logOut();
  }
}
