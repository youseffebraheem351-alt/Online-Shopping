import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../servies/all.service';
import { ActivatedRoute } from '@angular/router';
import { Inter } from '../../../interfase/inter';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  constructor(private _AllService: AllService, private _ActivatedRoute: ActivatedRoute) {}
  detail!: Inter;

  ngOnInit(): void {
    const gamesid = this._ActivatedRoute.snapshot.paramMap.get("id");
    this._AllService.details(gamesid).subscribe({
      next: (data) => {
        console.log(data);
        this.detail = data;
      },
      
    });
  }
}
