import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { AffaireService } from '../affaire.service';
import { Affaire } from '../model';
import { NgForm } from '@angular/forms';
import { AffairesComponent } from '../affaires/affaires.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-affaire-detail',
  templateUrl: './affaire-detail.component.html',
  styleUrls: ['./affaire-detail.component.css']
})
export class AffaireDetailComponent implements OnInit {

  affaire = new Affaire();
  editing: boolean;
  affaireId:number;



  constructor(
    private affaireComponent: AffairesComponent,
    private route: ActivatedRoute,
    private router: Router,
    private affaireService: AffaireService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log( params.get('id'));
      this.affaireId = +this.route.snapshot.paramMap.get('id');

      this.affaireService
      .getAffaire(this.affaireId)
      .subscribe(
        affaire => (this.affaire = affaire),
     );
    });
  }

  onSubmit(spt: NgForm) {
    this.affaireService.updateAffaire(this.affaire)
    .subscribe( () => {
      this.affaireComponent.ngOnInit();
      this.router.navigate(['../'], {
        relativeTo: this.route
      });
    } ); }

  deleteAffaire() {
    this.affaireService.deleteAffaire(this.affaire.id).subscribe(
      () => {
        this.router.navigate(['../../'], {
          relativeTo: this.route
        });
      },
      err => {
        console.log(err);
      }
    );
  }


updateAffaire(form: NgForm) {
  console.log(this.affaire);
  this.affaireService.updateAffaire(this.affaire).subscribe(
    () => {
      this.affaireComponent.ngOnInit();
      this.router.navigate(['/affaire'], {
      });
    },
  );

}
}
