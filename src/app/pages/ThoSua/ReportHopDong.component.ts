import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import * as jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPDFmake from 'html-to-pdfmake'
import { style } from "@angular/animations";
import { ActivatedRoute } from "@angular/router";
import { ThosuaServicesService } from "src/app/Services/ThoSua/thosua-services.service";
import { ThoSua } from "src/app/Models/ThoSua";
import { PhuongxaService } from "src/app/Services/PhuongXa/phuongxa.service";
import { DiaChi } from "src/app/Models/DiaChi";
import { LoaidvServicesService } from "src/app/Services/LoaiDV/loaidv-services.service";
import { LoaiDV } from "src/app/Models/LoaiDV";
import { ThoDichvuService } from "src/app/Services/Tho_DichVu/tho-dichvu.service";
import { Tho_DichVu } from "src/app/Models/Tho_DichVu";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'ReportHopDong',
  templateUrl: './ReportHopDong.component.html',
})
export class ReportHopDong implements OnInit {
  date = new Date();
  matho:number
  thosua: ThoSua
  diachi: DiaChi
  mapx: number
  loaidv: LoaiDV
  thodv: Tho_DichVu[]
  dichvu: string
  @ViewChild('content', { static: false }) content: ElementRef;
  constructor(
    private tsservice: ThosuaServicesService,
    private route: ActivatedRoute,
    private pxservice: PhuongxaService,
    private ldvservice: LoaidvServicesService,
    private tdv: ThoDichvuService,
  ) {}
  ngOnInit() {
    this.matho =  this.route.snapshot.params['id'];
    this.getThoSua()
    
  }
  getThoSua()
  {
    this.tsservice.getByID(this.matho).subscribe(res=>{
      this.thosua = res
      this.pxservice.getAllByID(res.maPX).subscribe(res=>{
        this.diachi = res
        console.log(this.diachi)
      })
        this.tdv.getByID(res.maTho).subscribe(res=>{
          this.thodv= res
          for(var i=0; i<res.length;i++)
          {
            if(i==0)
            {
              this.dichvu = res[i].tenDV
            }else
            {
              this.dichvu = this.dichvu+', '+res[i].tenDV
            }
           
          }
        });
      
    })
  }
   html = htmlToPDFmake(`
  <p>
    This sentence has <strong>a highlighted word</strong>, but not only.
  </p>
  `);
  
  generatePdf() {
    const documentDefinition = {
      content: [
        htmlToPDFmake(` <h2 style="font-weight: bold;">C??NG TY TNHH REPAIRVSERVICE</h2>
        <p style="font-size: 20px;">19 ???????ng s??? 30, ph?????ng Linh ????ng, Qu???n Th??? ?????c, Th??nh ph??? H??? Ch?? Minh</p>
        <p>Hotline: 0823742210 ??? Zalo: 039 312 1200 - Website: repairservice.com ??? Email: repairservice@gmail.com</p>
        <hr/>
        <p><i>-	C??n c??? B??? Lu???t D??n s??? ng??y 14/06/2005 c???a Qu???c h???i n?????c CHXHCN Vi???t Nam</i></p>
        <p><i>-	C??n c??? Lu???t Doanh nghi???p s??? 60/2005/QH11 ng??y 29/11/2005 c???a Qu???c h???i</i></p>
        <p><i>-	C??n c??? Ngh??? ?????nh s??? 102/2010/N??-CP ng??y 01/10/2010 c???a Ch??nh ph??? h?????ng d???n chi ti???t thi h??nh m???t s??? ??i???u Lu???t Doanh Nghi???p</i></p>
        <p><i>-	C??n c??? ??i???u l??? t???? ch????c va?? hoa??t ??????ng c???a C??ng ty TNHH RepairService</i></p>`),
        {
          text: 'H??m nay, ng??y ' + this.date.getDate() + ' th??ng ' + this.date.getMonth() + ' n??m ' + this.date.getFullYear() + ' , t???i C??ng ty TNHH REPAIRSERVICE, 19 ???????ng s??? 30, Qu???n Th??? ?????c, TP. H??? Ch?? Minh. Ch??ng t??i g???m:',

        },
        htmlToPDFmake(` <p style="font-weight: bold;">B??N A: C??ng ty TNHH RepairService</p>
        <p>?????a ch???: S???? 19 ???????ng s??? 30, Qu????n Th??? ?????c, TP. H??? Ch?? Minh</p>
        <p>?????i di???n: ??ng Nguy???n Th??nh ?????t</h4>
        <p>T.Kho???n:	S???: 0451000355268 - Ng??n h??ng TMCP Ngo???i th????ng VN ??? CN. Th??nh C??ng</p>`),
        {
          text: 'B??N B: '+this.thosua.tenTho,
          bold: true
        },
        {
          text:' '
        },
        {
          text: '?????a ch???: '+this.thosua.soNha+', '+this.diachi[0].tenPX+', '+this.diachi[0].tenQH+', '+this.diachi[0].tenTinh ,
        },
        {
          text:' '
        },
        {
          text: '?????i di???n: '+this.thosua.tenTho
        },
        {
          text:' '
        },
        {
          text: '??i???n tho???i: '+this.thosua.sdt+'                 '+'Email '+this.thosua.email
        },
        {
          text:' '
        },
        {
          text: 'Hai b??n c??ng th???ng nh???t k?? k???t ???Th???a thu???n cung c???p d???ch v??? tr??n ???ng d???ng Rada nh???ng ??i???u kho???n nh?? sau:',
          
        },
        {
          text:' '
        },
        {
          text: '??i???u 1. N???i dung ch??nh c???a th???a thu???n:',
          bold: true
        },
        {
          text:' '
        },
        {
          text: this.dichvu,
          
        },
        {
          text:''
        },
        {
          text: 'B??n A cung c???p ???ng d???ng gi??p cho kh??ch h??ng c?? th??? g???i y??u c???u d???ch v??? ?????n v???i B??n B khi hai b??n c??ch nhau trong m???t kho???ng c??ch nh???t ?????nh ????? hai b??n c?? th??? li??n l???c, th???a thu???n v?? th???c hi???n giao d???ch cung c???p d???ch v??? c???a b??n B cho kh??ch h??ng.',
        },
        htmlToPDFmake(`
        <p style="font-weight: bold;">??i???u 1. N???i dung ch??nh c???a th???a thu???n</p>
        <p>B??n B tham gia cung c???p d???ch v??? t???n n??i cho kh??ch h??ng tr??n ???ng d???ng di ?????ng Rada thu???c m???t (ho???c m???t s???) l??nh v???c d?????i ????y:</p>
        <p>B??n A cung c???p ???ng d???ng gi??p cho kh??ch h??ng c?? th??? g???i y??u c???u d???ch v??? ?????n v???i B??n B khi hai b??n c??ch nhau trong m???t kho???ng c??ch nh???t ?????nh ????? hai b??n c?? th??? li??n l???c, th???a thu???n v?? th???c hi???n giao d???ch cung c???p d???ch v??? c???a b??n B cho kh??ch h??ng.</p>
        <p style="font-weight: bold;">??i???u 2. C?? ch??? & ph????ng th???c h???p t??c</p>
        <p>?????i v???i m???i y??u c???u c???a kh??ch h??ng thu???c l??nh v???c d???ch v??? b??n B cung c???p, B??n A ?????m b???o ph??t y??u c???u (m???t c??ch c??ng b???ng) t???i ???ng d???ng RadaPartner c??i ?????t tr??n ??i???n tho???i c???a b??n B c??ng nh?? c??c ?????i t??c kh??c cung c???p d???ch v??? c??ng l??nh v???c trong m???t ph???m vi x??c ?????nh (c??n g???i l?? b??n k??nh ph???c v??? ng??nh d???ch v???).
          Theo ????, B??n B s??? ch??? ?????ng ti???p nh???n y??u c???u th??ng qua ???ng d???ng RadaPartner ????? cung c???p d???ch v??? c??n c??? tr??n kh??? n??ng v?? s??? s???n s??ng c???a b??n B t???i th???i ??i???m ti???p nh???n.
          </p>
        <p style="font-weight: bold;">??i???u 3. Ca??c khoa??n ph??, ??????t co??c ?????? m???? ta??i khoa??n tr??n Rada</p>
        <p>B??n B thanh to??n cho B??n A chi ph?? k???t n???i, gi???i thi???u kh??ch h??ng l?? 10% - 15% gi?? tr??? ????n h??ng ???????c gi???i thi???u/giao d???ch th??nh c??ng ghi nh???n tr??n h??? th???ng (Chi ti???t b???ng m???c ph?? trong ph??? l???c s??? 2).</p>
        <p> - Ti????n ky?? quy?? (??a??m ba??o tra??ch nhi????m): 2.000.000 ?? (Hai tri????u ??????ng ch????n ./.)</p>
          <p> - Ti???n na??p tr??????c va??o t??i kho???n nh????n kha??ch: 1.000.000?? (M???t tri???u ?????ng).</p>
            <p>  *** L??u y??: s???? d?? t???i thi???u trong t??i kho???n (????? nh???n kha??ch): 200.000 ?? (Hai tr??m ngh??n ?????ng)
          </p>
          <p style="font-weight: bold;">??i???u 4. Tr??ch nhi???m v?? cam k???t</p>
          <p>B??n B ch???u tr??ch nhi???m to??n b??? ch???t l?????ng, t??nh minh b???ch, gi?? c???, ch???ng t??? c???a d???ch v??? do m??nh cung c???p ?????n kh??ch h??ng (bao g???m c??? t??nh ph??p l??) khi tri???n khai, chi ti???t t???i Ph??? l???c 2.</p>
          <p> B??n B thanh to??n ?????y ????? gi?? tr??? gi???i thi???u ???????c ghi nh???n tr??n h??? th???ng cho B??n A tr??n t??i kho???n ???ng d???ng ho???c t??i kho???n Ng??n h??ng do B??n A th??ng b??o.</p>
          <p>  B??n A xu???t b???ng k?? ?????i so??t, h??a ????n, ch???ng t??? cho B??n B t???i th???i ??i???m ph??t sinh thanh to??n gi???a hai b??n.
          </p>
          <p style="font-weight: bold;">??i???u 5. Th???i h???n c???a th???a thu???n</p>
          <p>
            Th???a thu???n n??y c?? th???i h???n l?? 12 (m?????i hai) th??ng k??? t??? ng??y k?? trong ??i???u ki???n b??nh th?????ng ho???c c?? th??? ch???m d???t n???u:</p>
            <p>-	Hai b??n ?????ng ?? ch???m d???t th???a thu???n</p>
            <p>-	B??n B vi ph???m cam k???t ch???t l?????ng ho???c ph??p l?? li??n quan ?????n d???ch v??? ho???c c??c tri???n khai do m??nh cung c???p ?????n kh??ch h??ng
            </p>
            <p style="font-weight: bold;">??i???u 6. B???o m???t th??ng tin</p>
            <p>M???i B??n tham gia Th???a thu???n n??y c?? ngh??a v??? gi??? b?? m???t m???i chi ti???t v??? Th???a thu???n n??y c??c h??? s??, t??i li???u, th??ng tin ???????c B??n kia cung c???p, ngo???i tr??? trong c??c tr?????ng h???p sau:</p>
              <p>-	Vi???c ti???t l??? c??c chi ti???t v??? Th???a thu???n v??/ho???c cung c???p c??c h??? s??, t??i li???u, th??ng tin ???? l?? theo y??u c???u c???a c??c c?? quan nh?? n?????c c?? th???m quy???n theo quy ?????nh c???a ph??p lu???t;</p>
              <p>-	Vi???c ti???t l??? c??c chi ti???t Th???a thu???n v??/ho???c cung c???p c??c h??? s??, t??i li???u, th??ng tin ???? l?? cho b??n t?? v???n h???p ph??p c???a B??n ???? ho???c cho nh??n vi??n c?? li??n quan, v???i ??i???u ki???n vi???c ti???t l??? n??y ???????c th???c hi???n th??ng qua vi???c k?? k???t m???t tho??? thu???n b???o m???t, theo ???? nh???ng ng?????i ???????c ti???t l??? cam k???t s??? tu??n theo c??c quy ?????nh v??? b???o m???t nh?? ???????c quy ?????nh t???i Th???a thu???n n??y</p>
              <p>-	Vi???c ti???t l??? c??c chi ti???t v??? Th???a thu???n v??/ho???c cung c???p c??c h??? s??, t??i li???u, th??ng tin ???? ???? ???????c B??n kia ch???p thu???n b???ng v??n b???n.</p>
              <p> Ngh??a v??? n??y ph???i ???????c C??c B??n th???c hi???n trong su???t qu?? tr??nh th???c hi???n Th???a thu???n n??y v?? sau 03 (ba) th??ng k??? t??? ng??y Th???a thu???n n??y h???t th???i h???n, b??? ch???m d???t ho???c h???y b???.
              </p>
              <p style="font-weight: bold;">??i???u 7. Gi???i quy???t tranh ch???p</p>
              <p>Trong qu?? tr??nh th???c hi???n Th???a thu???n n??y, n???u ph??t sinh tranh ch???p, 
                hai b??n c??ng nhau th????ng l?????ng gi???i quy???t tr??n nguy??n t???c t??n tr???ng quy???n l???i c???a nhau,
                 m???i b??n ph???i th??ng b??o b???ng v??n b???n n??u r?? b???n ch???t tranh ch???p v?? g???i cho b??n kia bi???t ????? c??ng th????ng l?????ng gi???i quy???t. Tr?????ng h???p vi???c th????ng l?????ng kh??ng ?????t ???????c k???t qu??? th?? trong th???i h???n 30 (ba m????i) ng??y k??? t??? ng??y g???i th??ng b??o n??u tr??n, m???t trong hai b??n c?? quy???n kh???i ki???n ????? y??u c???u T??a ??n nh??n d??n c?? th???m quy???n t???i Vi???t Nam x??t x??? theo quy ?????nh c???a ph??p lu???t Vi???t Nam.</p>
              <p style="font-weight: bold;">??i???u 8. ??i???u kho???n chung</p>
              <p>Th???a thu???n n??y c?? hi???u l???c k??? t??? ng??y k?? v?? ???????c l???p th??nh 03 (ba) 
                b???n c?? gi?? tr??? nh?? nhau, m???i B??n A gi??? 02 (hai) b???n, B??n B gi???a 01 (m???t) 
                b???n ????? th???c hi???n.</p>
             
                <p style="font-size:20; font-weight:bold">B??N B                                                                           B??N A</p>
                <p >Ng?????i k??:                                                                                                          Nguy???n Th??nh ?????t</p>
              </div>
        `)
      ],
      style: {
        fontsize17: {
          fontSize: 17
        },
        Italic: {
          Italic: true
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

}

