import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'modal-coord',
  templateUrl: './modal-coord.component.html',
  styleUrls: ['./modal-coord.component.css']
})
export class ModalCoordComponent implements OnInit {
  @Input() id!: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'waoo-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('waoo-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('waoo-modal-open');
  }

}
