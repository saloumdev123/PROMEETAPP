import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CompanyInfoComponent } from '../company-info-component/company-info-component';
import { ClientManagementComponent } from '../client-management-component/client-management-component';
import { DocumentFormComponent } from '../document-form-component/document-form-component';


type Tab = 'DocumentInfo' | 'CompanyInfo' | 'ClientInfo'; 

@Component({
  selector: 'app-documenaire-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ClientManagementComponent
    ,CompanyInfoComponent,
    DocumentFormComponent
  ],
  templateUrl: './documenaire-component.html',
  styleUrls: ['./documenaire-component.css']
})
export class DocumenaireComponent {
activeTab: Tab = 'DocumentInfo';

  setActiveTab(tab: Tab) {
    this.activeTab = tab;
  }
}
