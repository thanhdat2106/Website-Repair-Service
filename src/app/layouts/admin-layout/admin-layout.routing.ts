import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { LoaiDVListComponent } from 'src/app/pages/LoaiDV/services-tpye-list.component';
import { DichvuComponent } from 'src/app/pages/DichVu/dichvu.component';
import { KhachhangComponent } from 'src/app/pages/KhachHang/khachhang.component';
import { ThosuaComponent } from 'src/app/pages/ThoSua/thosua.component';
import { TintucComponent } from 'src/app/pages/tintuc/tintuc.component';
import { DialogTinTuc } from 'src/app/pages/tintuc/DialogTinTuc.component';
import { NhanvienComponent } from 'src/app/pages/nhanvien/nhanvien.component';
import { DialogNhanVien } from 'src/app/pages/nhanvien/dialog_nhanvien.component';
import { HoadonComponent } from 'src/app/pages/hoadon/hoadon.component';
import { ReportHopDong } from 'src/app/pages/ThoSua/ReportHopDong.component';
import { HopdongComponent } from 'src/app/pages/HopDong/hopdong.component';
import { DialogHoaDon } from 'src/app/pages/hoadon/DialogHoaDon.component';
import { WebsiteLayoutComponent } from '../website-layout/website-layout.component';
import { GoithoComponent } from 'src/app/pages/GoiTho/goitho.component';
import { DialogGoiTho } from 'src/app/pages/GoiTho/DialogGoiTho.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'user-profile/:manv',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'LoaiDV',   component: LoaiDVListComponent },
    { path: 'DichVu',   component: DichvuComponent },
    { path: 'KhachHang',   component: KhachhangComponent },
    { path: 'ThoSua',   component: ThosuaComponent },
    { path: 'TinTuc',   component: TintucComponent },
    { path: 'DialogTinTuc/:id',   component: DialogTinTuc },
    { path: 'NhanVien',   component: NhanvienComponent },
    { path: 'DialogNhanVien/:id',   component: DialogNhanVien },
    { path: 'HoaDon',   component: HoadonComponent },
    { path: 'ReportHopDong/:id',   component: ReportHopDong },
    { path: 'HopDong/:manv',   component: HopdongComponent },
    { path: 'DialogHoaDon/:id',   component: DialogHoaDon },
    { path: 'GoiTho',   component: GoithoComponent },
    { path: 'DialogGoiTho/:id',   component: DialogGoiTho },
    
    
];
