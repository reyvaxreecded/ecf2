import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategorie } from '../model/categorie.model';
import { INew } from '../model/new.model';
import { ITag } from '../model/tags.model';
import { BddService } from '../service/bdd.service';

export interface addTag {
  id_tag: number;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  categories: ICategorie[] = [];
  tags: ITag[] = [];
  createForm!: FormGroup;
  addTags: addTag[]= [];

  constructor(private bddService: BddService) { }

  ngOnInit(): void {
    this.bddService.getAllTags().subscribe((datas: ITag[])=>{
      this.tags = datas
    })
    this.bddService.getAllCategorie().subscribe((datas: ICategorie[])=>{
      this.categories = datas
    })
    this.initForm()
  }
  initForm(){
    this.createForm = new FormGroup({
      titre: new FormControl(),
      contenue: new FormControl(),
      categorie: new FormControl(),
      tag: new FormControl()
    })
  }
  addTag(){
    const tag = this.createForm.get('tag')?.value;
    this.addTags.push({id_tag: tag}); 
    console.log(this.addTags);
  }
  create(){
    const titre = this.createForm.get('titre')?.value;
    const contenue = this.createForm.get('contenue')?.value;
    const statut = 'Publié'
    const id_categorie = this.createForm.get('categorie')?.value;

    let newArticle: INew = {
      titre_article: titre,
      contenue_article: contenue,
      statut_article: statut,
      id_categorie: id_categorie,
      tags: this.addTags
    }
    this.bddService.createArticle(newArticle);
  }
  save(){
    const titre = this.createForm.get('titre')?.value;
    const contenue = this.createForm.get('contenue')?.value;
    const statut = 'Brouillon'
    const id_categorie = this.createForm.get('categorie')?.value;

    let newArticle: INew = {
      titre_article: titre,
      contenue_article: contenue,
      statut_article: statut,
      id_categorie: id_categorie,
      tags: this.addTags
    }
    this.bddService.createArticle(newArticle);
  }
}
