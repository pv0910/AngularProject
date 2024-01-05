import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentManagementService } from '../../../services/content-management.service';
import { EditContentComponent } from './edit-content/edit-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
})
export class ContentManagementComponent implements OnInit {
  newContent: any = {};
  allContent: any[] = [];
  selectedCourseId: number = 0;
  isadmin=false;
  
  constructor(
    private contentService: ContentManagementService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
    if(role=='instructor'){
      this.isadmin=true;
    }
  }

  ngOnInit(): void {
    this.loadAllContent();

    this.route.params.subscribe((params) => {
      this.selectedCourseId = +params['id'];
      this.filterContentByCourseId();
    });
  }

  filterContentByCourseId() {
    this.contentService.getContentByCourseId(this.selectedCourseId).subscribe((content) => {
      this.allContent = content;
    });
  }

  loadAllContent() {
    this.contentService.getAllContent().subscribe((content) => {
      this.allContent = content;
      this.filterContentByCourseId(); 
    });
  }

  createContent() {
    this.newContent.courseId = this.selectedCourseId;
    this.contentService.createContent(this.newContent).subscribe(
      (response) => {
        console.log('New Content created:', response);
        this.allContent.push(response); 
        this.newContent = {};
        this.selectedCourseId = 0;
      },
      (error) => {
        console.error('Error creating content:', error);
      }
    );
  }

  editContent(contentId: string) {
    const contentToEdit = this.allContent.find((content) => content.id === contentId);
  
    if (contentToEdit) {
      const dialogRef = this.dialog.open(EditContentComponent, {
        data: contentToEdit,
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.contentService.updateContent(contentId, result).subscribe(
            (response) => {
              console.log('Content updated:', response);
              this.loadAllContent();
            },
            (error) => {
              console.error('Error updating content:', error);
            }
          );
        }
      });
    } else {
      console.error('Content not found for editing');
    }
  }

  deleteContent(contentId: string) {
    this.contentService.deleteContentById(contentId).subscribe(
      (response) => {
        console.log('Content deleted:', response);
        this.allContent = this.allContent.filter((content) => content.id !== contentId);
      },
      (error) => {
        console.error('Error deleting content:', error);
      }
    );
  }
  viewContentDetails(contentId: number) {
    this.router.navigate(['/content-details', contentId]);
  }


}
