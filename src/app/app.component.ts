import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./components/landing/landing.component";
import { NavbarComponent } from "./components/landing/components/navbar/navbar.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MenuItemDetailComponent } from './components/menu/components/menu-item-detail/menu-item-details.component';
import { ItemDetailsHandlerService } from '@root/common/services/item-details-handler.service';
import { AboutMeComponent } from "./components/about-me/about-me.component";
import { ContactMeComponent } from "./components/contact-me/contact-me.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";
import { SocialMediaBoundriesManager } from '@root/common/services/social-media-intersection-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingComponent, NavbarComponent, MenuComponent, MenuItemDetailComponent, AboutMeComponent, ContactMeComponent, SocialMediaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  @ViewChild(ContactMeComponent, { read: ElementRef, static: true }) contactMeElementRef!: ElementRef<HTMLElement>;
  @ViewChild('menuItemDetailsContainer', { read: ViewContainerRef, static: true }) menuItemDetailsContainer!: ViewContainerRef;
  title = 'MeitalGlutenFree';

  constructor(private itemDetailsHandler: ItemDetailsHandlerService, private _socialMediaBoundriesManager: SocialMediaBoundriesManager){
  }
  
  ngAfterViewInit(): void {
    this._socialMediaBoundriesManager.setBottomBoundaryElement(this.contactMeElementRef.nativeElement);
  }

  ngOnInit(){
    this.itemDetailsHandler.setViewContainerRef(this.menuItemDetailsContainer);
  }

  scrollToMenu(){
    const menuElement: HTMLElement = this.menuComponent.ElementRef.nativeElement;
    menuElement.scrollIntoView({ behavior: 'smooth' });
  }
}
