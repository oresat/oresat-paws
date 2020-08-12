import { Component, OnInit, ElementRef } from '@angular/core';
import { UltraService, Pass } from 'src/app/services/ultra.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// interface Request {
//   uid: string,
//   user_token: string,
//   is_approved: boolean,
//   is_sent: boolean,
//   pass_uid: number,
//   created_date: Date,
//   updated_date: Date,
//   observation_type: string
// }

@Component({
  selector: 'request-page',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})

export class RequestPage implements OnInit {
  get_reqest_form: FormGroup;
  get_all_reqests_form: FormGroup;
  get_passes_form: FormGroup;
  passes: Array<any>;
  requests: Array<Pass>;


  constructor(private ultra_service: UltraService,
              private form_builder: FormBuilder,
              private el: ElementRef) {
   this.get_reqest_form = this.form_builder.group({
     token: [null, Validators.requiredTrue],
     request_id: [null, Validators.requiredTrue]
   });

   this.get_all_reqests_form = this.form_builder.group({
     token: ['', Validators.requiredTrue]
   });

   this.get_passes_form = this.form_builder.group({
     latitude: ['', Validators.requiredTrue],
     longitude: ['', Validators.requiredTrue],
     elevation_m: ['', Validators.requiredTrue],
     aos_utc: ['', Validators.requiredTrue],
     los_utc: ['', Validators.requiredTrue],
   });
  }

  ngOnInit(): void {}

  get_all_reqests(): void {
    this.requests = this.ultra_service.get_all_requests();
    console.log(this.requests);
  }

  get_reqest(): void {}

  get_passes(): void {
    const latitude = this.get_passes_form.get('latitude').value;
    const longitude = this.get_passes_form.get('longitude').value;
    console.log(`Getting passes for (${latitude}, ${longitude})`)
    this.passes = this.ultra_service.get_passes(latitude, longitude);

    console.log(`Available Passes: ${JSON.stringify(this.passes)}`)

    const pass_form = this.el.nativeElement.querySelector('#pass-form');
    const request_form = this.el.nativeElement.querySelector('#request-form');
    pass_form.style.display = 'none';
    request_form.style.display = 'block';
  }

  post_reqest(): void {
  }
}
