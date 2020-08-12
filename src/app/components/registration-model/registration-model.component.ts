import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UltraService } from 'src/app/services/ultra.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'registration-modal',
  templateUrl: './registration-model.component.html',
  styleUrls: ['./registration-model.component.sass'],
})

export class RegistrationModel implements OnInit {
  form: FormGroup;
  close_result: string;
  register_btn: any;
  hide_button: boolean = false;

  constructor(private modal_service: NgbModal,
              private ultra_service: UltraService,
              private form_builder: FormBuilder,
              private el: ElementRef) {
    this.form = this.form_builder.group({
      username: ['', Validators.required]
    });

    this.register_btn = this.el.nativeElement.querySelector('#registration-btn');
    const token = this.ultra_service.fetch_token()

    if(token !== null) {
      console.log(`Browser has a token: ${token}`)
      this.register_btn.style.display = 'none';
    }
  }

  ngOnInit(): void {}

  open(content: any) {
    this.modal_service.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  on_submit(): void {
    const username = this.form.get('username').value;
    console.log(`Registering user: ${username}`);
    this.modal_service.dismissAll();
    this.ultra_service.post_new_user(username);
  }
}
