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
        htmlToPDFmake(` <h2 style="font-weight: bold;">CÔNG TY TNHH REPAIRVSERVICE</h2>
        <p style="font-size: 20px;">19 đường số 30, phường Linh Đông, Quận Thủ Đức, Thành phố Hồ Chí Minh</p>
        <p>Hotline: 0823742210 – Zalo: 039 312 1200 - Website: repairservice.com – Email: repairservice@gmail.com</p>
        <hr/>
        <p><i>-	Căn cứ Bộ Luật Dân sự ngày 14/06/2005 của Quốc hội nước CHXHCN Việt Nam</i></p>
        <p><i>-	Căn cứ Luật Doanh nghiệp số 60/2005/QH11 ngày 29/11/2005 của Quốc hội</i></p>
        <p><i>-	Căn cứ Nghị định số 102/2010/NĐ-CP ngày 01/10/2010 của Chính phủ hướng dẫn chi tiết thi hành một số điều Luật Doanh Nghiệp</i></p>
        <p><i>-	Căn cứ Điều lệ tổ chức và hoạt động của Công ty TNHH RepairService</i></p>`),
        {
          text: 'Hôm nay, ngày ' + this.date.getDate() + ' tháng ' + this.date.getMonth() + ' năm ' + this.date.getFullYear() + ' , tại Công ty TNHH REPAIRSERVICE, 19 đường số 30, Quận Thủ Đức, TP. Hồ Chí Minh. Chúng tôi gồm:',

        },
        htmlToPDFmake(` <p style="font-weight: bold;">BÊN A: Công ty TNHH RepairService</p>
        <p>Địa chỉ: Số 19 đường số 30, Quận Thủ Đức, TP. Hồ Chí Minh</p>
        <p>Đại diện: Ông Nguyễn Thành Đạt</h4>
        <p>T.Khoản:	Số: 0451000355268 - Ngân hàng TMCP Ngoại thương VN – CN. Thành Công</p>`),
        {
          text: 'BÊN B: '+this.thosua.tenTho,
          bold: true
        },
        {
          text:' '
        },
        {
          text: 'Địa chỉ: '+this.thosua.soNha+', '+this.diachi[0].tenPX+', '+this.diachi[0].tenQH+', '+this.diachi[0].tenTinh ,
        },
        {
          text:' '
        },
        {
          text: 'Đại diện: '+this.thosua.tenTho
        },
        {
          text:' '
        },
        {
          text: 'Điện thoại: '+this.thosua.sdt+'                 '+'Email '+this.thosua.email
        },
        {
          text:' '
        },
        {
          text: 'Hai bên cùng thống nhất ký kết “Thỏa thuận cung cấp dịch vụ trên ứng dụng Rada những điều khoản như sau:',
          
        },
        {
          text:' '
        },
        {
          text: 'Điều 1. Nội dung chính của thỏa thuận:',
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
          text: 'Bên A cung cấp ứng dụng giúp cho khách hàng có thể gửi yêu cầu dịch vụ đến với Bên B khi hai bên cách nhau trong một khoảng cách nhất định để hai bên có thể liên lạc, thỏa thuận và thực hiện giao dịch cung cấp dịch vụ của bên B cho khách hàng.',
        },
        htmlToPDFmake(`
        <p style="font-weight: bold;">Điều 1. Nội dung chính của thỏa thuận</p>
        <p>Bên B tham gia cung cấp dịch vụ tận nơi cho khách hàng trên ứng dụng di động Rada thuộc một (hoặc một số) lĩnh vực dưới đây:</p>
        <p>Bên A cung cấp ứng dụng giúp cho khách hàng có thể gửi yêu cầu dịch vụ đến với Bên B khi hai bên cách nhau trong một khoảng cách nhất định để hai bên có thể liên lạc, thỏa thuận và thực hiện giao dịch cung cấp dịch vụ của bên B cho khách hàng.</p>
        <p style="font-weight: bold;">Điều 2. Cơ chế & phương thức hợp tác</p>
        <p>Đối với mỗi yêu cầu của khách hàng thuộc lĩnh vực dịch vụ bên B cung cấp, Bên A đảm bảo phát yêu cầu (một cách công bằng) tới ứng dụng RadaPartner cài đặt trên điện thoại của bên B cũng như các đối tác khác cung cấp dịch vụ cùng lĩnh vực trong một phạm vi xác định (còn gọi là bán kính phục vụ ngành dịch vụ).
          Theo đó, Bên B sẽ chủ động tiếp nhận yêu cầu thông qua ứng dụng RadaPartner để cung cấp dịch vụ căn cứ trên khả năng và sự sẵn sàng của bên B tại thời điểm tiếp nhận.
          </p>
        <p style="font-weight: bold;">Điều 3. Các khoản phí, đặt cọc để mở tài khoản trên Rada</p>
        <p>Bên B thanh toán cho Bên A chi phí kết nối, giới thiệu khách hàng là 10% - 15% giá trị đơn hàng được giới thiệu/giao dịch thành công ghi nhận trên hệ thống (Chi tiết bảng mức phí trong phụ lục số 2).</p>
        <p> - Tiền ký quỹ (đảm bảo trách nhiệm): 2.000.000 đ (Hai triệu đồng chẵn ./.)</p>
          <p> - Tiền nạp trước vào tài khoản nhận khách: 1.000.000đ (Một triệu đồng).</p>
            <p>  *** Lưu ý: số dư tối thiểu trong tài khoản (để nhận khách): 200.000 đ (Hai trăm nghìn đồng)
          </p>
          <p style="font-weight: bold;">Điều 4. Trách nhiệm và cam kết</p>
          <p>Bên B chịu trách nhiệm toàn bộ chất lượng, tính minh bạch, giá cả, chứng từ của dịch vụ do mình cung cấp đến khách hàng (bao gồm cả tính pháp lý) khi triển khai, chi tiết tại Phụ lục 2.</p>
          <p> Bên B thanh toán đầy đủ giá trị giới thiệu được ghi nhận trên hệ thống cho Bên A trên tài khoản ứng dụng hoặc tài khoản Ngân hàng do Bên A thông báo.</p>
          <p>  Bên A xuất bảng kê đối soát, hóa đơn, chứng từ cho Bên B tại thời điểm phát sinh thanh toán giữa hai bên.
          </p>
          <p style="font-weight: bold;">Điều 5. Thời hạn của thỏa thuận</p>
          <p>
            Thỏa thuận này có thời hạn là 12 (mười hai) tháng kể từ ngày ký trong điều kiện bình thường hoặc có thể chấm dứt nếu:</p>
            <p>-	Hai bên đồng ý chấm dứt thỏa thuận</p>
            <p>-	Bên B vi phạm cam kết chất lượng hoặc pháp lý liên quan đến dịch vụ hoặc các triển khai do mình cung cấp đến khách hàng
            </p>
            <p style="font-weight: bold;">Điều 6. Bảo mật thông tin</p>
            <p>Mỗi Bên tham gia Thỏa thuận này có nghĩa vụ giữ bí mật mọi chi tiết về Thỏa thuận này các hồ sơ, tài liệu, thông tin được Bên kia cung cấp, ngoại trừ trong các trường hợp sau:</p>
              <p>-	Việc tiết lộ các chi tiết về Thỏa thuận và/hoặc cung cấp các hồ sơ, tài liệu, thông tin đó là theo yêu cầu của các cơ quan nhà nước có thẩm quyền theo quy định của pháp luật;</p>
              <p>-	Việc tiết lộ các chi tiết Thỏa thuận và/hoặc cung cấp các hồ sơ, tài liệu, thông tin đó là cho bên tư vấn hợp pháp của Bên đó hoặc cho nhân viên có liên quan, với điều kiện việc tiết lộ này được thực hiện thông qua việc ký kết một thoả thuận bảo mật, theo đó những người được tiết lộ cam kết sẽ tuân theo các quy định về bảo mật như được quy định tại Thỏa thuận này</p>
              <p>-	Việc tiết lộ các chi tiết về Thỏa thuận và/hoặc cung cấp các hồ sơ, tài liệu, thông tin đó đã được Bên kia chấp thuận bằng văn bản.</p>
              <p> Nghĩa vụ này phải được Các Bên thực hiện trong suốt quá trình thực hiện Thỏa thuận này và sau 03 (ba) tháng kể từ ngày Thỏa thuận này hết thời hạn, bị chấm dứt hoặc hủy bỏ.
              </p>
              <p style="font-weight: bold;">Điều 7. Giải quyết tranh chấp</p>
              <p>Trong quá trình thực hiện Thỏa thuận này, nếu phát sinh tranh chấp, 
                hai bên cùng nhau thương lượng giải quyết trên nguyên tắc tôn trọng quyền lợi của nhau,
                 mỗi bên phải thông báo bằng văn bản nêu rõ bản chất tranh chấp và gửi cho bên kia biết để cùng thương lượng giải quyết. Trường hợp việc thương lượng không đạt được kết quả thì trong thời hạn 30 (ba mươi) ngày kể từ ngày gửi thông báo nêu trên, một trong hai bên có quyền khởi kiện để yêu cầu Tòa án nhân dân có thẩm quyền tại Việt Nam xét xử theo quy định của pháp luật Việt Nam.</p>
              <p style="font-weight: bold;">Điều 8. Điều khoản chung</p>
              <p>Thỏa thuận này có hiệu lực kể từ ngày ký và được lập thành 03 (ba) 
                bản có giá trị như nhau, mỗi Bên A giữ 02 (hai) bản, Bên B giữa 01 (một) 
                bản để thực hiện.</p>
             
                <p style="font-size:20; font-weight:bold">BÊN B                                                                           BÊN A</p>
                <p >Người ký:                                                                                                          Nguyễn Thành Đạt</p>
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

