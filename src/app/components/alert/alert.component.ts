import { Component, OnInit } from '@angular/core';

interface WebAlert {
  message: string,
  type: number
}

@Component({
  selector: 'alert-queue',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})

export class AlertQueue implements OnInit {
  queue: Array<WebAlert> = []
  constructor() {}
  ngOnInit(): void {}

  add(message: string, type: number = 1) {
    this.queue.push({message: message, type: type});
  }

  close(alert: WebAlert) {
    this.queue.splice(this.queue.indexOf(alert), 1);
  }

  clear() {
    this.queue.forEach((alert) => {
      this.close(alert);
    });
  }
}
