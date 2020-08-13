import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UltraService } from 'src/app/services/ultra.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'registration-modal',
  templateUrl: './registration-model.component.html',
  styleUrls: ['./registration-model.component.sass'],
})

export class RegistrationModel implements OnInit {
  form: FormGroup;
  close_result: string;
  show_button: boolean;

  constructor(private modal_service: NgbModal,
              private ultra_service: UltraService,
              private form_builder: FormBuilder,
              private el: ElementRef,
              private router: Router) {
    this.form = this.form_builder.group({
      username: ['', Validators.required]
    });

    const token = this.ultra_service.get_cached_token();
    this.show_button = token === '' || token === null || token === undefined;
  }

  ngOnInit(): void {}

  open(content: any) {
    this.modal_service.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  on_submit(): void {
    const username = this.form.get('username').value;
    console.log(`Registering user: ${username}`);
    this.modal_service.dismissAll();
    this.ultra_service.post_user(username);
    this.router.navigate(['/a'])
    this.router.navigate(['/'])
  }
}
