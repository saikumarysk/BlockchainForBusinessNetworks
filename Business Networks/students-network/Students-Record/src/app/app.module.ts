import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewerComponent } from './Viewer/Viewer.component';
import { StaffComponent } from './Staff/Staff.component';
import { StudentComponent } from './Student/Student.component';
import { ChangeNameComponent } from './ChangeName/ChangeName.component';
import { ChangeGenderComponent } from './ChangeGender/ChangeGender.component';
import { ChangeHostelComponent } from './ChangeHostel/ChangeHostel.component';

@NgModule
({
	declarations:
	[
		AppComponent,
		HomeComponent,
		StudentComponent,
		ViewerComponent,
		StaffComponent,
		ChangeNameComponent,
		ChangeGenderComponent,
		ChangeHostelComponent
	],
	imports:
	[
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers:
	[
		Configuration,
		DataService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }