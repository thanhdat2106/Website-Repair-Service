import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { LoaiDV } from "src/app/Models/LoaiDV";
import { TinTuc } from "src/app/Models/TinTuc";
import { LoaidvServicesService } from "src/app/Services/LoaiDV/loaidv-services.service";
import { TintucServicesService } from "src/app/Services/TinTuc/tintuc-services.service";

@Component({
    selector: 'DialogTinTuc',
    templateUrl: 'DialogTinTuc.component.html',
    providers: [{
      provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
    }]
  })
  export class DialogTinTuc implements OnInit  {
    a: string
    tt: TinTuc
    addForm: FormGroup
    matintuc: Number
    TinTucIdUpdate: null
    anh: string;
    allloaidv: LoaiDV[]
    maldv: Number
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private tintucdv:TintucServicesService,
        private loaidv: LoaidvServicesService,
      ) {}
    
      ngOnInit(){
        this.matintuc =  this.route.snapshot.params['id'];
        this.addForm = this.formBuilder.group({
            //employeeID: [],
            tieuDe: ['', Validators.required],
            moTa: ['', Validators.required],
            ngayDang: ['', Validators.required],
            tacGia: ['', Validators.required],
            hinhAnh: ['', Validators.required],
            maLoaiDV: ['', Validators.required],
          });
          this.getByID();
          this.getAll();
         
      }
      getAll()
      {
        this.loaidv.getAll().subscribe(res=>{this.allloaidv= res})
      }
      getByID()
      {
        this.tintucdv.getByID(this.matintuc).subscribe(res=> {
            this.addForm.get('tieuDe').setValue(res.tieuDe)
            this.addForm.get('moTa').setValue(res.moTa)
            this.addForm.get('ngayDang').setValue(res.ngayDang)
            this.addForm.get('tacGia').setValue(res.tacGia)
            this.addForm.get('hinhAnh').setValue(res.hinhAnh)
            this.addForm.get('maLoaiDV').setValue(res.maLoaiDV)
            this.anh = res.hinhAnh
        });
       
      }
      onSubmit(){
        
        this.addForm.get("maLoaiDV").setValue ( Number(this.addForm.get("maLoaiDV").value))
        this.tt = this.addForm.value;
        const date = new Date();
        this.tt.ngayDang= date
        this.createTinTuc(this.tt);
        this.addForm.reset();
        
      }
      createTinTuc(tt: TinTuc)
      {
        if (this.matintuc == 0) {                    
            this.tintucdv.Post(tt).subscribe( () => {     
                this.router.navigate(['admin/TinTuc/']);
              }  
            );  
          } else {  
            tt.maTT =  Number(this.matintuc)
            this.tintucdv.Put(tt).subscribe(() => {  
              this.router.navigate(['admin/TinTuc']);
            });  
          }  
      }
      onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.anh = file.name
            this.addForm.get('hinhAnh').setValue(this.anh)
          };
        }
      }
      editorConfig: AngularEditorConfig = {
        editable: true,
          spellcheck: true,
          height: 'auto',
          minHeight: '0',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'Enter text here...',
          defaultParagraphSeparator: '',
          defaultFontName: '',
          defaultFontSize: '',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
        ],
    
        uploadWithCredentials: true,
        sanitize: true,
        toolbarPosition: 'top',
    };
    }