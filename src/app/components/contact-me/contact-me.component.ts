import { Component } from '@angular/core';
import { ContactItemComponent } from "./components/contact-item/contact-item.component";

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [ContactItemComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {

}
