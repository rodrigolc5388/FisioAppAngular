import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Temp
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routes
import { APP_ROUTES } from './app.routes';

// Our modules
import { PagesModule } from './pages/pages.module';

// Our components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Services
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
