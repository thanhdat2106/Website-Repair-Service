import { Routes } from "@angular/router";
import { ContentLayoutComponent } from "src/app/components/content-layout/content-layout.component";
import { DetailLayoutComponent } from "src/app/components/detail-layout/detail-layout.component";
import { BanggiaComponent } from "src/app/pages-layout/banggia/banggia.component";
import { BanggiadetailComponent } from "src/app/pages-layout/banggiadetail/banggiadetail.component";
import { TintucComponent } from "src/app/pages-layout/tintuc/tintuc.component";
import { GioithieuComponent } from "src/app/pages/GioiThieu/gioithieu.component";
import { TuyendungComponent } from "src/app/pages/TuyenDung/tuyendung.component";

export const WebLayoutRoutes: Routes = [
    { path: '',      component: ContentLayoutComponent },
    { path: 'detail/:maTT',      component: DetailLayoutComponent },
    { path: 'banggia',      component: BanggiaComponent },
    { path: 'banggia/detailbanggia/:maDV',      component: BanggiadetailComponent },
    { path: 'tintuc/:id', component: TintucComponent },
    { path: 'gioithieu', component: GioithieuComponent},
    { path: 'tuyendung', component: TuyendungComponent}
];