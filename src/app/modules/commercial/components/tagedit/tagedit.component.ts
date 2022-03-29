import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/Tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tagedit',
  templateUrl: './tagedit.component.html',
  styleUrls: ['./tagedit.component.css']
})
export class TageditComponent implements OnInit {
  editForm: FormGroup;
  @Input() tag!: Tag;
  @Output() needReload = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private tagService: TagService) {
    this.editForm = this.fb.group({
      label: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.tag)
      this.editForm.setValue({label: this.tag.label});
  }

  onSubmit(): void {
    this.tagService.update(this.tag, this.editForm).subscribe({
      next: t => {
        console.log(t);
        alert("Tag renommé !");
      }
    });
  }

  delete(): void {
    if(confirm("Voulez-vous vraiment supprimer ce tag ?")) {
      this.tagService.delete(this.tag).subscribe({
        next: () => {
          this.needReload.next("delete");
          alert("Tag supprimé !");
        }
      });
    }
  }

}
