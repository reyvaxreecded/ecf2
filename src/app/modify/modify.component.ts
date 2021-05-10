import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '../model/article.model';
import { ICategorie } from '../model/categorie.model';
import { INew } from '../model/new.model';
import { ITag } from '../model/tags.model';
import { IUpdate } from '../model/update.model';
import { BddService } from '../service/bdd.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  article!: IArticle
  tags: ITag[] = []
  categories: ICategorie[] = [];  
  addTags: string[] = [];
  currentTags: string[] = [];
  createForm!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private bddService: BddService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      const idN = parseInt(_id as string, 10);
      if(idN){
        this.singleArticle(idN);
      }
      this.bddService.getAllTags().subscribe((datas: ITag[])=>{
        this.tags = datas
      })
      this.bddService.getAllCategorie().subscribe((datas: ICategorie[])=>{
        this.categories = datas
      })
      this.initForm()      
    });     
  }
  initForm(){
    this.createForm = new FormGroup({
      titre: new FormControl(),
      contenue: new FormControl(),
      categorie: new FormControl(),
      tag: new FormControl()
    })    
  }
  singleArticle(id: number) {
    this.bddService.getSingleArticle(id).subscribe((data: IArticle) => {
      this.article = data;      
    });
    this.bddService.getTagsArticle(id).subscribe((datas:ITag[]) => {
      for(let info of datas){
        this.addTags.push(String(info.id_tag));
        this.currentTags.push(info.nom_tag);
      }
    })  
  }
  save(){
    const titre = this.createForm.get('titre')?.value;
    const contenue = this.createForm.get('contenue')?.value;
    const statut = 'Brouillon'
    const id_categorie = this.createForm.get('categorie')?.value;
    if(titre != null && contenue != null && id_categorie != null){
      let newArticle: IUpdate = {
        id_article: this.article.id_article,
        titre_article: titre,
        contenue_article: contenue,
        statut_article: statut,
        id_categorie: id_categorie,
        tags: this.addTags
      }
      this.bddService.updateArticle(newArticle);
      this.router.navigate(["/"]);
    }
    else{
      alert('veuillez remplir tout les champs')
    }
  }
  publish(){
    const titre = this.createForm.get('titre')?.value;
    const contenue = this.createForm.get('contenue')?.value;
    const statut = 'Publié'
    const id_categorie = this.createForm.get('categorie')?.value;
    if(titre != null && contenue != null && id_categorie != null){
      let newArticle: IUpdate = {
        id_article: this.article.id_article,
        titre_article: titre,
        contenue_article: contenue,
        statut_article: statut,
        id_categorie: id_categorie,
        tags: this.addTags
      }
      this.bddService.updateArticle(newArticle);
      this.router.navigate(["/"]);
    }
    else{
      alert('veuillez remplir tout les champs')
    }
  }
  delete(id: number){
    this.bddService.deleteArticle(id);
  }
  addTag(){
    const tagid = this.createForm.get('tag')?.value;
    this.addTags.push(tagid);
    for(let tag of this.tags){
      if(tagid == tag.id_tag){
        this.currentTags.push(tag.nom_tag);
      }
    }
    console.log(this.addTags)
  }
  deleteTag(id: number){
    const tag = this.createForm.get('tag')?.value;
    this.currentTags.splice(id, 1);  
    this.addTags.splice(id, 1);
    console.log(this.addTags)
  }
}
