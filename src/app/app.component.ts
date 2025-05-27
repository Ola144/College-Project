import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  router: Router = inject(Router);

  isLoaderVisible: boolean = false;

  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.isLoaderVisible = true;
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel){
        this.isLoaderVisible = false;
      }
    })
  }


}
