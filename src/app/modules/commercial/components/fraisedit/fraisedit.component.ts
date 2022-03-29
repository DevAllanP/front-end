import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Frais } from 'src/app/models/Frais.model';
import { FraisService } from 'src/app/services/frais.service';

@Component({
  selector: 'app-fraisedit',
  templateUrl: './fraisedit.component.html',
  styleUrls: ['./fraisedit.component.css']
})
export class FraiseditComponent implements OnInit {
  editForm: FormGroup;
  @Input() frais!: Frais;
  @Output() needReload = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private fraisService: FraisService) {
    this.editForm = this.fb.group({
      label: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.frais)
      this.editForm.setValue({label: this.frais.label});
  }

  onSubmit(): void {
    this.fraisService.update(this.frais, this.editForm).subscribe({
      next: t => {
        console.log(t);
        alert("Type de frais renommé !");
      }
    });
  }
}