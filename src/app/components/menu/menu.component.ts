import { Component, OnInit } from '@angular/core';
import { UltraService } from 'src/app/services/ultra.service';

interface Link {
  name: string,
  url: string
}

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class Menu implements OnInit {
  entries: Array<Link>;
  no_token: boolean;

  constructor(private ultra_service: UltraService) {
    const token = this.ultra_service.get_cached_token();
    this.no_token = token === '' || token === null || token === undefined;
  }

  ngOnInit(): void {
    const conditional_entries = [
      {
        name: 'Requests',
        url: '/requests'
      }
    ]

    this.entries = [
      {
        name: 'Home',
        url: '/home'
      },
      {
        name: 'Telemetry',
        url: '/telemetry'
      }
    ]

    if(!this.no_token) {
      this.entries = this.entries.concat(conditional_entries);
    }
  }
}
