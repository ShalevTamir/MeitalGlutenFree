import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./components/landing/landing.component";
import { NavbarComponent } from "./components/landing/components/navbar/navbar.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MenuItemDetailComponent } from './components/menu/components/menu-item-detail/menu-item-details.component';
import { ItemDetailsHandlerService } from '@root/common/services/item-details-handler.service';
import { AboutMeComponent } from "./components/about-me/about-me.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingComponent, NavbarComponent, MenuComponent, MenuItemDetailComponent, AboutMeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  @ViewChild('menuItemDetailsContainer', { read: ViewContainerRef, static: true }) menuItemDetailsContainer!: ViewContainerRef;
  title = 'MeitalGlutenFree';

  constructor(private itemDetailsHandler: ItemDetailsHandlerService){
  }

  ngOnInit(){
    this.itemDetailsHandler.setViewContainerRef(this.menuItemDetailsContainer);
  }

  scrollToMenu(){
    const menuElement: HTMLElement = this.menuComponent.ElementRef.nativeElement;
    menuElement.scrollIntoView({ behavior: 'smooth' });
  }
}
