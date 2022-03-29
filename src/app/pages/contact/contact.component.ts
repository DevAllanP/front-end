import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  types: any;

  constructor(private fb: FormBuilder, private contactService: ContactService, private router : Router, private modalService: ModalService) {
    this.contactForm = this.fb.group({
      type: ['', Validators.required],
      objet: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactService.getTypes().subscribe({
      next: types => {
        this.types = types;
      }
    });
  }

  send(): void {
    this.modalService.open("modal-contact");
    this.contactService.send(this.contactForm).subscribe({
      next: data => {
        const navigationExtras: NavigationExtras = {state: {data: "Le message a été envoyé avec succès ! Nous reviendrons vers vous dans les plus brefs délais."}};
        this.modalService.close("modal-contact");
        this.router.navigate(['/'], navigationExtras);
      }
    });
  }

}
