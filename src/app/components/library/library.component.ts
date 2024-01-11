import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public books: any[] = [];
  public articles: any[] = [];
  public externalLinks: any[] = [];

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.getLibraryResources().subscribe(data => {
      this.books = data.filter(resource => resource.type === 'Book');
      this.articles = data.filter(resource => resource.type === 'Article');
      this.externalLinks = data.filter(resource => resource.type === 'Link');
    });
  }
}
