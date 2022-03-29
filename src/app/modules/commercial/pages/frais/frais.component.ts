import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Frais } from 'src/app/models/Frais.model';
import { FraisService } from 'src/app/services/frais.service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit {
  addForm: FormGroup;
  frais!: Frais[];

  constructor(private fraisService: FraisService, private fb: FormBuilder) {
    this.addForm = this.fb.group({
			label: ['', Validators.required],
			montant: ['', Validators.required]
		});
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.fraisService.getAllForAdmin().subscribe({
      next: f => {
        this.frais = f;
      }
    });
  }

  onSubmit(): void {
    this.fraisService.add(this.addForm).subscribe({
      next: f => {
        console.log(f);
        this.reload();
        alert("Type de frais créé !");
      }
    });
  }
}