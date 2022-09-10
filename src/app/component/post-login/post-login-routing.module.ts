import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginComponent } from './post-login.component';

const routes: Routes = [
  {
    path: "",
    component: PostLoginComponent,
    children: [
      {
        path: 'section',
        loadChildren: () => import('./section/section.module')
          .then(m => m.SectionModule)
      },
      {
        path:'location-type',
        loadChildren: () => import('./location-type/location-type.module')
          .then(m => m.LocationTypeModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }
