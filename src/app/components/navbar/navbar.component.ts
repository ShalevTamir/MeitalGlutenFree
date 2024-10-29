import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ScrollHandler } from '@root/common/services/scroll-handler.service';
import { insertDynamicNewLines } from '@root/common/utils/htmlUtils';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactMeComponent } from '../contact-me/contact-me.component';
import { MenuComponent } from '../menu/menu.component';
import { ScrollItem } from '@root/common/models/types/scroll-types';
import { NavbarMetadata } from '@root/common/models/navbar-metadata';

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

  protected aboutMeComponent: ScrollItem = AboutMeComponent;
  protected contactMeComponent: ScrollItem = ContactMeComponent;
  protected menuComponent: ScrollItem = MenuComponent;

  constructor(protected scrollHandler: ScrollHandler, navbarMetadata: NavbarMetadata, elementRef: ElementRef){
      navbarMetadata.SetNavbarHtmlElement(elementRef.nativeElement);
  }
  
  ngAfterViewInit(): void{
    let wrapperChildren: Element[] = Array.from(this.wrapper.nativeElement.children);
    let navItems = wrapperChildren.filter(wrapperChild => wrapperChild.classList.contains(this.navItemClass));
    navItems.forEach(navItem => {
      insertDynamicNewLines(navItem as HTMLElement);
    });
  }
  
}
