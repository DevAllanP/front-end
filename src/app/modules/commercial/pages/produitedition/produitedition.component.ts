import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/models/Produit.model';
import { TypeProduit } from 'src/app/models/TypeProduit.model';
import { ProduitsService } from 'src/app/services/produits.service';
import { TypeproduitService } from 'src/app/services/typeproduit.service';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';

/* class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
} */

@Component({
  selector: 'app-produitedition',
  templateUrl: './produitedition.component.html',
  styleUrls: ['./produitedition.component.css']
})
export class ProduiteditionComponent implements OnInit {
  produit!: Produit;
  types!: TypeProduit[];
  editForm: FormGroup;
  // selectedFile!: ImageSnippet;
  fileSelected: any = null;

  config = {
    bucketName: 'waoo',
    region: 'eu-west-3',
    accessKeyId: "AKIATO7T3NEOHVJZLFX3",
    secretAccessKey: "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",
    s3Url: 'https://waoo.s3.eu-west-3.amazonaws.com/'
  }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);


  constructor(private produitsService: ProduitsService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private tpService: TypeproduitService) {
    this.editForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tpService.getAllForAdmin().subscribe({
      next: t => {
        this.types = t;
        this.setValues();
      }
    });
    this.activatedRoute.params.subscribe({
      next: params => {
        this.produitsService.getById(params["id"]).subscribe({
          next: p => {
           // this.produit = p;
            this.produit = new Produit(p.idProduit, false, p.nom, p.description, p.prix, p.tagDtos, p.typeProduitDto, new Array());
            this.produitsService.setImages(this.produit);
            this.setValues();
          }
        });
      }
    });
  }

  setValues(): void {
    if(this.types && this.produit) {
      let typeId: number = 0, tags: string[] = [];
      for(let i = 0; i < this.types.length; i++) {
        if(this.types[i].label === this.produit.typeProduitDto.label) {
          typeId = this.types[i].id;
          break;
        }
      }
      this.produit.tagDtos.forEach(tag => tags.push(tag.label));
      this.editForm.setValue({
        nom: this.produit.nom,
        type: typeId,
        description: this.produit.description,
        prix: this.produit.prix,
        tags: tags.join(" ")
      });
    }
  }

  onSubmit(): void {
    if(this.types && this.types.length) {
      let currentType: TypeProduit = this.types[0];
      for(let i = 0; i < this.types.length; i++) {
        if(this.types[i].id === parseInt(this.editForm.get("type")?.value)) {
          currentType = this.types[i];
          break;
        }
      }
      this.produitsService.modifie(this.produit.idProduit, this.editForm, currentType).subscribe({
        next: p => {
          this.router.navigate(["/commercial/produit/liste"]);
        }
      });
    }
  }

  onChangeFile(event: any) {
    this.fileSelected = event.target.files[0];
 /*    this.selectedFile = new ImageSnippet(event.target.result, this.fileSelected);
    console.log(this.selectedFile); */
  }

  async handleSendFile() {
    console.log("handleSendFile");
    console.log(this.fileSelected);
    await this.S3CustomClient
      .uploadFile(this.fileSelected, this.fileSelected.type, undefined, this.fileSelected.name, "private")
      .then((data: UploadResponse) => {
          console.log(data);
          const url = data.location || "";
          const id = this.produit.idProduit;
          this.produitsService.addImage(this.produit, url)
      })
      .catch((err: any) => console.error(err))   
  }
}


