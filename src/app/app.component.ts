import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  router: Router = inject(Router);
  masterService: MasterService = inject(MasterService);

  isLoaderVisible: boolean = false;
  isOffline: boolean = false;
  isOnline: boolean = false;

  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.isLoaderVisible = true;
      }
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.isLoaderVisible = false;
      }
    });

    this.masterService.isOnline$.subscribe((res: any) => {
      if(res){
        // If User is Online
        this.isOnline = true;

        setTimeout(() => {
          this.isOnline = false;
        }, 4000);
      }else {
        // If User is Offline
        this.isOffline = true;

        setTimeout(() => {
          this.isOffline = false;
        }, 4000);
      }
    })

    // window.addEventListener('offline', () => {
    //   this.isOffline = true;
    //   setTimeout(() => {
    //     this.isOffline = false;
    //   }, 3000);
    // });
  }

}
