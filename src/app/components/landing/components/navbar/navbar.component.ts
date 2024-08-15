import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { injectDynamicNewLines } from '@root/common/utils/htmlUtils';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit{
  @ViewChild('wrapper') wrapper!: ElementRef<HTMLElement>;
  readonly navItemClass = 'nav-item';
  ngAfterViewInit(): void{
    let wrapperChildren: Element[] = Array.from(this.wrapper.nativeElement.children);
    let navItems = wrapperChildren.filter(wrapperChild => wrapperChild.classList.contains(this.navItemClass));
    navItems.forEach(navItem => {
      injectDynamicNewLines(navItem as HTMLElement);
    });
  }
  
}
