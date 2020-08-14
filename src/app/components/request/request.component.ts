import { Component, OnInit } from '@angular/core';
import { UltraService, Pass } from 'src/app/services/ultra.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'request-page',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})

export class RequestPage implements OnInit {
  requests_form: FormGroup;
  location_form: FormGroup;
  time_form: FormGroup;
  form_position: number;

  available_passes: Array<Pass>;


  constructor(private ultra_service: UltraService) {
    this.form_position = 0;

    this.requests_form = new FormGroup({
      request_id: new FormControl(null, {validators: Validators.required})
    });

    this.location_form = new FormGroup({
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required)
    });

    this.time_form = new FormGroup({
      pass: new FormControl(0, Validators.required)
    });
  }

  ngOnInit(): void {}

  get_one_reqest(): void {
    // TODO: Finish this
  }

  get_passes(): void {
    const latitude = this.location_form.get('latitude').value;
    const longitude = this.location_form.get('longitude').value;

    console.log(`Getting orbital passes for coords: (${latitude}, ${longitude})`);
    this.ultra_service.get_passes(latitude, longitude).subscribe(
      data => {
        this.available_passes = data;
        this.form_position = 1;
      },
      error => {
        console.error(`Failed to retireve passes: ${error}`);
        this.available_passes = [];
      }
    );
  }

  post_reqest(): void {
    const latitude = this.location_form.get('latitude').value;
    const longitude = this.location_form.get('longitude').value;
    const form_time = this.time_form.get('pass').value;

    var i = parseInt(form_time.split(' ')[0].split(':')[0]) - 1
    const token = this.ultra_service.get_cached_token();
    const pass = this.available_passes[i];

    console.log(`Requested time: (${latitude}, ${longitude}) ${form_time}`);
    this.ultra_service.post_request(token, pass).subscribe(
      data => {
        console.log(`Success: ${data}`)
        window.location.reload();
      },
      error => {
        console.error(`Failed ot post new request: ${error}`);
      }
    );
  }
}
