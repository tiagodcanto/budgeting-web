import { Routes } from '@angular/router';
import { BudgetGenerationComponent } from './main/budget-generation/budget-generation.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';
import { ContactComponent } from './main/contact/contact.component';
import { TermsServicesComponent } from './main/terms-services/terms-services.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { FaqComponent } from './main/faq/faq.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generate-budged', component: BudgetGenerationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'terms-services', component: TermsServicesComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'faq', component: FaqComponent },
];
