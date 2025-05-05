import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
     declarations: [HeaderComponent, FooterComponent],
     imports: [BrowserModule, CommonModule],
     exports: [HeaderComponent, FooterComponent],
     providers: [],
     bootstrap: []
})
export class LayoutsModule {}
