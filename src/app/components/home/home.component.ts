import { Component, OnInit, ElementRef } from '@angular/core';
import { UltraService } from 'src/app/services/ultra.service';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomePage implements OnInit {
  token: string;
  username: string = 'N/A';
  no_token: boolean = true;
  reveal_token: boolean = false;

  constructor(private ultra_service: UltraService,
              private el: ElementRef) {
    this.username = this.ultra_service.get_cached_username();
    this.token = this.ultra_service.get_cached_token();
    this.no_token = this.token === '' || this.token === null || this.token === undefined;
  }

  ngOnInit(): void {}

  tstring(): string {
    if(this.reveal_token){
      return 'hide';
    }
    else {
      return 'reveal';
    }
  }

  toggle_reveal(): void {
    this.reveal_token = !this.reveal_token;
    const hide_element = this.el.nativeElement.querySelector('#token-display');

    if(this.reveal_token) {
      hide_element.style.display = 'block';
    }
    else {
      hide_element.style.display = 'none';
    }
  }
}
