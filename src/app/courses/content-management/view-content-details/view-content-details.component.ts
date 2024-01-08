import { Component, OnInit} from '@angular/core';
import { ContentManagementService } from '../../../../services/content-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-content-details',
  templateUrl: './view-content-details.component.html',
  styleUrls: ['./view-content-details.component.css']
})
export class ViewContentDetailsComponent implements OnInit {
  public contentId!: number;
  public contentDetails: any;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentManagementService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contentId = +params['id'];
      this.getContentDetails();
    });
  }

  public getContentDetails() {
    this.contentService.getContentDetails(this.contentId).subscribe((details) => {
      this.contentDetails = details;
    });
  }
}