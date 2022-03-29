import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/Tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  addForm: FormGroup;
  tags!: Tag[];

  constructor(private tagService: TagService, private fb: FormBuilder) {
    this.addForm = this.fb.group({
			label: ['', Validators.required]
		});
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.tagService.getAllForAdmin().subscribe({
      next: t => {
        this.tags = t;
      }
    });
  }

  onSubmit(): void {
    this.tagService.add(this.addForm).subscribe({
      next: t => {
        console.log(t);
        this.reload();
        alert("Tag créé !");
      }
    });
  }
}