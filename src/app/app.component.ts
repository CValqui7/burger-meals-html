import { Component } from '@angular/core';
interface SideNaveToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'burger-meals-html';
  isSideNavCollapsed = false;
  screenwidth = 0;
  onToggleSideNav(event: any): void {
    console.log(event);
    this.screenwidth = event.screenwidth;
    this.isSideNavCollapsed = event.collapsed;
  }
}
