import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { TConstructor } from '@root/common/models/types';
import { ScrollHandler } from '@root/common/services/scroll-handler.service';
import { insertDynamicNewLines } from '@root/common/utils/htmlUtils';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactMeComponent } from '../contact-me/contact-me.component';
import { MenuComponent } from '../menu/menu.component';

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

  protected aboutMeComponent: TConstructor<AboutMeComponent> = AboutMeComponent;
  protected contactMeComponent: TConstructor<ContactMeComponent> = ContactMeComponent;
  protected menuComponent: TConstructor<MenuComponent> = MenuComponent;

  constructor(protected scrollHandler: ScrollHandler, elementRef: ElementRef){
    const nativeElement: HTMLElement = elementRef.nativeElement;
    scrollHandler.setDefaults({ topOffset: nativeElement.offsetHeight });
  }
  
  ngAfterViewInit(): void{
    let wrapperChildren: Element[] = Array.from(this.wrapper.nativeElement.children);
    let navItems = wrapperChildren.filter(wrapperChild => wrapperChild.classList.contains(this.navItemClass));
    navItems.forEach(navItem => {
      insertDynamicNewLines(navItem as HTMLElement);
    });
  }
  
}
