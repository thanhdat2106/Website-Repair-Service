import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/admin/icons', title: 'Repairer',  icon:'ni-planet text-blue', class: '' },
    { path: '#', title: 'Customer',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '#', title: 'Account',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/admin/HoaDon', title: 'Hóa đơn',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/admin/LoaiDV', title: 'Loại dịch vụ',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/admin/DichVu', title: 'Dịch vụ',  icon:'ni-key-25 text-info', class: '' },
    { path: '/admin/KhachHang', title: 'Khách hàng',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/admin/ThoSua', title: 'Thợ sửa',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/admin/NhanVien', title: 'Nhân viên',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() macv: number;
  @Input() manv: number;
  iskt : boolean
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
   }

  ngOnInit() {
  //   this.menuItems = ROUTES.filter(menuItem => menuItem);
  //   this.router.events.subscribe((event) => {
  //     this.isCollapsed = true;
  //  });
  if(this.macv==1)
  {
    this.iskt= false
  }
  else{
    this.iskt = true;
  }
  }
  click()
  {
    this.router.navigate(['admin/NhanVien'], { state: { macv: this.macv } });
  }
  
}
