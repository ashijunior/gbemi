import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { LoginComponent } from './login/login.component';
import { RpasswordComponent } from './rpassword/rpassword.component';

const routes: Routes = [
  {
    path: '', component : FirstpageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'teams', component: TeamComponent
  },
  {
    path: 'abouts', component: AboutComponent
  },
  {
    path: 'contacts', component: ContactComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forgotPassword', component: ForgotpasswordComponent
  },
  {
    path: 'reset', component: RpasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
