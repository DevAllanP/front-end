import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  rechercheForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.rechercheForm = this.fb.group({
      recherche: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rechercheForm.setValue({
        recherche: params["req"] || ""
      });
    });
  }

  onSubmit(): void {
    this.router.navigate(['/recherche'], {queryParams: {req: this.rechercheForm.get("recherche")?.value}})
  }
}