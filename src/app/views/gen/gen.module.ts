import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginationComponent} from "../../container/pagination/pagination.component";
import {FilterbuilderComponent} from "../../utility/filterbuilder/filterbuilder.component";
import {FormbuilderComponent} from "../../utility/formbuilder/formbuilder.component";
import {ListbuilderComponent} from "../../utility/listbuilder/listbuilder.component";
import {BankBranchFormComponent} from "./bank-branch/form/bank-branch-form.component";
import {BankBranchListComponent} from "./bank-branch/list/bank-branch-list.component";
import {BankFormComponent} from "./bank/form/bank-form.component";
import {BankListComponent} from "./bank/list/bank-list.component";
import {GenRoutingModule} from "./gen-routing.module";
import {HolidayCalendarFormComponent} from "./holiday-calendar/form/holiday-calendar-form.component";
import {HolidayCalendarListComponent} from "./holiday-calendar/list/holiday-calendar-list.component";
import {LanguageFormComponent} from "./language/form/language-form.component";
import {LanguageListComponent} from "./language/list/language-list.component";
import {MarketFormComponent} from "./market/form/market-form.component";
import {MarketListComponent} from "./market/list/market-list.component";
import {RejectionReasonTypeFormComponent} from "./rejection-reason-type/form/rejection-reason-type-form.component";
import {RejectionReasonTypeListComponent} from "./rejection-reason-type/list/rejection-reason-type-list.component";
import {RejectionReasonFormComponent} from "./rejection-reason/form/rejection-reason-form.component";
import {RejectionReasonListComponent} from "./rejection-reason/list/rejection-reason-list.component";
import {RelationshipFormComponent} from "./relationship/form/relationship-form.component";
import {RelationshipListComponent} from "./relationship/list/relationship-list.component";
import {TenderTypeFormComponent} from "./tender-type/form/tender-type-form.component";
import {TenderTypeListComponent} from "./tender-type/list/tender-type-list.component";
import {UomTypeFormComponent} from "./uom-type/form/uom-type-form.component";
import {UomTypeListComponent} from "./uom-type/list/uom-type-list.component";
import {UomFormComponent} from "./uom/form/uom-form.component";
import {UomListComponent} from "./uom/list/uom-list.component";
import {HelpVideoFormComponent} from "./help-video/form/help-video-form.component";
import {HelpVideoListComponent} from "./help-video/list/help-video-list.component";
import {WorkflowListComponent} from './workflow/list/workflow-list.component';
import {WorkflowFormComponent} from './workflow/form/workflow-form.component';
import {WorkflowSectionListComponent} from './workflow-section/list/workflow-section-list.component';
import {WorkflowSectionFormComponent} from './workflow-section/form/workflow-section-form.component';
import {WorkflowSectionScreenListComponent} from './workflow-section-screen/list/workflow-section-screen-list.component';
import {WorkflowSectionScreenFormComponent} from "./workflow-section-screen/form/workflow-section-screen-form.component";
import {CompanyRoleListComponent} from './company-role/list/company-role-list.component';
import {CompanyRoleFormComponent} from './company-role/form/company-role-form.component';
import {FeesAndTaxesListComponent} from './fees-and-taxes/list/fees-and-taxes-list.component';
import {FeesAndTaxesFormComponent} from './fees-and-taxes/form/fees-and-taxes-form.component';
import {QuantityThresholdListComponent} from './quantity-threshold/list/quantity-threshold-list.component';
import {QuantityThresholdFormComponent} from './quantity-threshold/form/quantity-threshold-form.component';
import {MspPriceListComponent} from './msp-price/list/msp-price-list.component';
import {MspPriceFormComponent} from './msp-price/form/msp-price-form.component';
import {NonMspPriceListComponent} from './non-msp-price/list/non-msp-price-list.component';
import {NonMspPriceFormComponent} from './non-msp-price/form/non-msp-price-form.component';
import {MfpPriceListComponent} from './mfp-price/list/mfp-price-list.component';
import {MfpPriceFormComponent} from './mfp-price/form/mfp-price-form.component';
import {ZeroDayRegionalCommodityPmpDetailsComponent} from './zero-day-regional-commodity-pmp/details/zero-day-regional-commodity-pmp-details.component';
import {RawFormbuilderComponent} from "../../utility/raw-formbuilder/raw-formbuilder.component";
import {SelectWithSearchComponent} from "../../utility/form-controls/select-with-search/select-with-search.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommodityBenchmarkMarketListComponent} from './commodity-benchmark-market/list/commodity-benchmark-market-list.component';
import {CommodityBenchmarkMarketFormComponent} from './commodity-benchmark-market/form/commodity-benchmark-market-form.component';
import {CommodityMarketPriceListComponent} from './commodity-market-price/list/commodity-market-price-list.component';
import {CommodityMarketPriceFormComponent} from './commodity-market-price/form/commodity-market-price-form.component';
import { ZeroDayRegionalCommodityPmpFormComponent } from './zero-day-regional-commodity-pmp/form/zero-day-regional-commodity-pmp-form.component';


@NgModule({
	declarations: [
		BankListComponent,
		BankFormComponent,
		BankBranchFormComponent,
		BankBranchListComponent,
		LanguageListComponent,
		LanguageFormComponent,
		MarketFormComponent,
		MarketListComponent,
		RejectionReasonListComponent,
		RejectionReasonFormComponent,
		RejectionReasonTypeFormComponent,
		RejectionReasonTypeListComponent,
		TenderTypeFormComponent,
		TenderTypeListComponent,
		UomFormComponent,
		UomListComponent,
		UomTypeFormComponent,
		UomTypeListComponent,
		HelpVideoFormComponent,
		HelpVideoListComponent,
		RelationshipFormComponent,
		RelationshipListComponent,
		HolidayCalendarFormComponent,
		HolidayCalendarListComponent,

		WorkflowListComponent,
		WorkflowFormComponent,

		WorkflowSectionListComponent,
		WorkflowSectionFormComponent,

		WorkflowSectionScreenListComponent,
		WorkflowSectionScreenFormComponent,
		CompanyRoleListComponent,
		CompanyRoleFormComponent,
		FeesAndTaxesListComponent,
		FeesAndTaxesFormComponent,
		QuantityThresholdListComponent,
		QuantityThresholdFormComponent,
		MspPriceListComponent,
		MspPriceFormComponent,
		NonMspPriceListComponent,
		NonMspPriceFormComponent,
		MfpPriceListComponent,
		MfpPriceFormComponent,
		ZeroDayRegionalCommodityPmpDetailsComponent,
		CommodityBenchmarkMarketListComponent,
		CommodityBenchmarkMarketFormComponent,
		CommodityMarketPriceListComponent,
		CommodityMarketPriceFormComponent,
  ZeroDayRegionalCommodityPmpFormComponent
	],
	imports: [CommonModule,
		GenRoutingModule,
		FormsModule,
		FormbuilderComponent,
		ListbuilderComponent,
		PaginationComponent,
		FilterbuilderComponent,
		RawFormbuilderComponent,



		MatInputModule,
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		SelectWithSearchComponent,
	],
})
export class GenModule { }
