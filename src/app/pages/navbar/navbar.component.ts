import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  masterService: MasterService = inject(MasterService);
  router: Router = inject(Router);

  loggedUser: any;
  isLoggedIn: any;

  constructor() {
    try {
      const localData = localStorage.getItem('collegeProject');

      if (localData != null) {
        this.loggedUser = JSON.parse(localData);
      }
    }catch(err){}
  }

  ngOnInit(): void {
    this.masterService.onLogin$.subscribe({
      next: (res: any)=> {
        this.isLoggedIn = this.masterService.isLoggedIn()
      }
    })
  }

  getYourProject() {
    this.masterService.onGetUserProject$.next(true);
  }

  logout() {
    try {
      localStorage.removeItem('collegeProject');
    } catch (err) { }
    this.router.navigateByUrl('/login');
    this.loggedUser = undefined;
  }

}
