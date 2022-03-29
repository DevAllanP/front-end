import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeProduit } from 'src/app/models/TypeProduit.model';
import { TypeproduitService } from 'src/app/services/typeproduit.service';

@Component({
  selector: 'app-typeproduitedit',
  templateUrl: './typeproduitedit.component.html',
  styleUrls: ['./typeproduitedit.component.css']
})
export class TypeproduiteditComponent implements OnInit {
  editForm: FormGroup;
  @Input() tp!: TypeProduit;
  @Output() needReload = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private tpService: TypeproduitService) {
    this.editForm = this.fb.group({
      label: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.tp)
      this.editForm.setValue({label: this.tp.label});
  }

  onSubmit(): void {
    this.tpService.update(this.tp, this.editForm).subscribe({
      next: t => {
        console.log(t);
        alert("Type de produit renommé ! Actualisez la page pour voir les changements.");
      }
    });
  }

  delete(): void {
    if(confirm("Voulez-vous vraiment supprimer ce type de produit ?")) {
      this.tpService.delete(this.tp).subscribe({
        next: () => {
          this.needReload.next("delete");
          alert("Type de produit supprimé ! Actualisez la page pour voir les changements.");
        }
      });
    }
  }
}