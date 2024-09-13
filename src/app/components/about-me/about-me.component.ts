import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { insertNewLinesAtChar } from '@root/common/utils/htmlUtils';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit{
  @ViewChild('description') description!: ElementRef<HTMLElement>
  
  ngAfterViewInit(): void {
    insertNewLinesAtChar(this.description.nativeElement, '.');
  }

}
