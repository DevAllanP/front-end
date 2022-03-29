import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeProduit } from 'src/app/models/TypeProduit.model';
import { TypeproduitService } from 'src/app/services/typeproduit.service';

@Component({
  selector: 'app-typesproduit',
  templateUrl: './typesproduit.component.html',
  styleUrls: ['./typesproduit.component.css']
})
export class TypesproduitComponent implements OnInit {
  addForm: FormGroup;
  tp!: TypeProduit[];

  constructor(private tpService: TypeproduitService, private fb: FormBuilder) {
    this.addForm = this.fb.group({
			label: ['', Validators.required]
		});
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.tpService.getAllForAdmin().subscribe({
      next: t => {
        this.tp = t;
      }
    });
  }

  onSubmit(): void {
    this.tpService.add(this.addForm).subscribe({
      next: t => {
        console.log(t);
        this.reload();
        alert("Type de produit créé ! Actualisez la page pour voir les changements.");
      }
    });
  }
}