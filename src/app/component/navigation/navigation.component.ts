import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  isSideOpen: boolean = false;
  isMobile: boolean = true;
  width: number;

  constructor(private authService: AuthService) {}

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
    const theme = localStorage.getItem('theme');
    console.log(theme);
    if (theme == 'light') {
      const body = document.getElementById('bodyTodoMain');
      console.log(body);
      if (body) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    } else if (theme == 'dark') {
      const body = document.getElementById('bodyTodoMain');
      console.log(body);
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }
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
