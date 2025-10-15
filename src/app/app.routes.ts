import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AllComponent } from '../padges/all/all.component';
import { MenComponent } from '../padges/all/men/men.component';
import { WomenComponent } from '../padges/all/women/women.component';
import { JewerlyComponent } from '../padges/all/jewerly/jewerly.component';
import { ElectorincComponent } from '../padges/all/electorinc/electorinc.component';
import { DetailsComponent } from '../padges/all/details/details.component';
import { NotfoundComponent } from '../padges/all/notfound/notfound.component';
import { authGuard } from '../gurd/auth.guard';

// ✅ ضفت صفحة Cart هنا
import { CartComponent } from '../padges/all/cart/cart.component';
import { HeartComponent } from '../padges/heart/heart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },

  // ✅ كل الصفحات المستقلة هنا
  { path: 'all', component: AllComponent, title: 'All', canActivate: [authGuard] },
  { path: 'men', component: MenComponent, title: 'Men', canActivate: [authGuard] },
  { path: 'woman', component: WomenComponent, title: 'Woman', canActivate: [authGuard] },
  { path: 'jewerly', component: JewerlyComponent, title: 'Jewerly', canActivate: [authGuard] },
  { path: 'electorinc', component: ElectorincComponent, title: 'Electronics', canActivate: [authGuard] },
  { path: 'details/:id', component: DetailsComponent, title: 'Details', canActivate: [authGuard] },

  // ✅ راوت كارت الجديد
  { path: 'cart', component: CartComponent, title: 'Cart', canActivate: [authGuard] },
  { path: 'heart', component: HeartComponent, title: 'Wishlist', canActivate: [authGuard] },

  // ✅ صفحة NotFound
  { path: '**', component: NotfoundComponent }
];
