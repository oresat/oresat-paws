import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.entries = [
      {
        name: 'Home',
        url: '/home'
      },
      {
        name: 'Telemetry',
        url: '/telemetry'
      },
      {
        name: 'Requests',
        url: '/requests'
      }
    ]
  }
}
