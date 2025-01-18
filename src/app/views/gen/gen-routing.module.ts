import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BankListComponent} from "./bank/list/bank-list.component";
import {BankFormComponent} from "./bank/form/bank-form.component";
import {BankBranchListComponent} from "./bank-branch/list/bank-branch-list.component";
import {BankBranchFormComponent} from "./bank-branch/form/bank-branch-form.component";
import {LanguageListComponent} from "./language/list/language-list.component";
import {LanguageFormComponent} from "./language/form/language-form.component";
import {MarketFormComponent} from "./market/form/market-form.component";
import {MarketListComponent} from "./market/list/market-list.component";
import {RejectionReasonListComponent} from "./rejection-reason/list/rejection-reason-list.component";
import {RejectionReasonFormComponent} from "./rejection-reason/form/rejection-reason-form.component";
import {RejectionReasonTypeListComponent} from "./rejection-reason-type/list/rejection-reason-type-list.component";
import {RejectionReasonTypeFormComponent} from "./rejection-reason-type/form/rejection-reason-type-form.component";
import {TenderTypeListComponent} from "./tender-type/list/tender-type-list.component";
import {TenderTypeFormComponent} from "./tender-type/form/tender-type-form.component";
import {UomListComponent} from "./uom/list/uom-list.component";
import {UomFormComponent} from "./uom/form/uom-form.component";
import {UomTypeFormComponent} from "./uom-type/form/uom-type-form.component";
import {UomTypeListComponent} from "./uom-type/list/uom-type-list.component";
import {RelationshipListComponent} from "./relationship/list/relationship-list.component";
import {RelationshipFormComponent} from "./relationship/form/relationship-form.component";
import {HolidayCalendarListComponent} from "./holiday-calendar/list/holiday-calendar-list.component";
import {HolidayCalendarFormComponent} from "./holiday-calendar/form/holiday-calendar-form.component";
import {HelpVideoFormComponent} from "./help-video/form/help-video-form.component";
import {HelpVideoListComponent} from "./help-video/list/help-video-list.component";
import {WorkflowListComponent} from "./workflow/list/workflow-list.component";
import {WorkflowFormComponent} from "./workflow/form/workflow-form.component";
import {WorkflowSectionListComponent} from "./workflow-section/list/workflow-section-list.component";
import {WorkflowSectionFormComponent} from "./workflow-section/form/workflow-section-form.component";
import {WorkflowSectionScreenListComponent} from "./workflow-section-screen/list/workflow-section-screen-list.component";
import {WorkflowSectionScreenFormComponent} from "./workflow-section-screen/form/workflow-section-screen-form.component";
import {CompanyRoleFormComponent} from "./company-role/form/company-role-form.component";
import {CompanyRoleListComponent} from "./company-role/list/company-role-list.component";
import {AuthGaurdService} from "../../services/auth-gaurd.service";
import {FeesAndTaxesListComponent} from "./fees-and-taxes/list/fees-and-taxes-list.component";
import {FeesAndTaxesFormComponent} from "./fees-and-taxes/form/fees-and-taxes-form.component";
import {QuantityThresholdListComponent} from "./quantity-threshold/list/quantity-threshold-list.component";
import {QuantityThresholdFormComponent} from "./quantity-threshold/form/quantity-threshold-form.component";
import {MspPriceListComponent} from "./msp-price/list/msp-price-list.component";
import {MspPriceFormComponent} from "./msp-price/form/msp-price-form.component";
import {NonMspPriceListComponent} from "./non-msp-price/list/non-msp-price-list.component";
import {NonMspPriceFormComponent} from "./non-msp-price/form/non-msp-price-form.component";
import {MfpPriceListComponent} from "./mfp-price/list/mfp-price-list.component";
import {MfpPriceFormComponent} from "./mfp-price/form/mfp-price-form.component";
import {ZeroDayRegionalCommodityPmpDetailsComponent} from "./zero-day-regional-commodity-pmp/details/zero-day-regional-commodity-pmp-details.component";
import {CommodityBenchmarkMarketListComponent} from "./commodity-benchmark-market/list/commodity-benchmark-market-list.component";
import {CommodityBenchmarkMarketFormComponent} from "./commodity-benchmark-market/form/commodity-benchmark-market-form.component";
import {CommodityMarketPriceListComponent} from "./commodity-market-price/list/commodity-market-price-list.component";
import {CommodityMarketPriceFormComponent} from "./commodity-market-price/form/commodity-market-price-form.component";

const routes: Routes = [
	{
		path: "",
		data: {
			title: "Gen",
			breadcrumb: {
				alias: "Gen",
			},
		},
		children: [
			{
				path: "",
				redirectTo: "bank/list",
				pathMatch: "full",
			},

			//--------Bank Routes--------//
			{
				path: "bank/list",
				component: BankListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Banks",
					breadcrumb: {
						label: "Banks",
						alias: "Banks",
					},
				},
			},
			{
				path: "bank/form",
				component: BankFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Bank Details",
					breadcrumb: {
						label: "Bank Details",
						alias: "Bank Details",
					},
				},
			},
			{
				path: "bank/form/:id",
				component: BankFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Bank Details",
					breadcrumb: {
						label: "Bank Details",
						alias: "Bank Details",
					},
				},
			},
			//--------Bank Routes End--------//

			//--------Bank Branch Routes--------//
			{
				path: "bank-branch/list",
				component: BankBranchListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Bank Branches",
					breadcrumb: {
						label: "Bank Branches",
						alias: "Bank Branches",
					},
				},
			},
			{
				path: "bank-branch/form",
				component: BankBranchFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Bank Branch Details",
					breadcrumb: {
						label: "Bank Branch Details",
						alias: "Bank Branch Details",
					},
				},
			},
			{
				path: "bank-branch/form/:id",
				component: BankBranchFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Bank Branch Details",
					breadcrumb: {
						label: "Bank Branch Details",
						alias: "Bank Branch Details",
					},
				},
			},
			//--------Bank Routes End--------//

			//--------Language Routes--------//
			{
				path: "language/list",
				component: LanguageListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Languages",
					breadcrumb: {
						label: "Languages",
						alias: "Languages",
					},
				},
			},
			{
				path: "language/form",
				component: LanguageFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Language Details",
					breadcrumb: {
						label: "Language Details",
						alias: "Language Details",
					},
				},
			},
			{
				path: "language/form/:id",
				component: LanguageFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Language Details",
					breadcrumb: {
						label: "Language Details",
						alias: "Language Details",
					},
				},
			},
			//--------Language Routes End--------//

			//--------Market Routes--------//
			{
				path: "market/list",
				component: MarketListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Markets",
					breadcrumb: {
						label: "Markets",
						alias: "Markets",
					},
				},
			},
			{
				path: "market/form",
				component: MarketFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Market Details",
					breadcrumb: {
						label: "Market Details",
						alias: "Market Details",
					},
				},
			},
			{
				path: "market/form/:id",
				component: MarketFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Market Details",
					breadcrumb: {
						label: "Market Details",
						alias: "Market Details",
					},
				},
			},
			//--------Market Routes End--------//

			//--------Rejection Reason Routes--------//
			{
				path: "rejection-reason/list",
				component: RejectionReasonListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Rejection Reasons",
					breadcrumb: {
						label: "Rejection Reasons",
						alias: "Rejection Reasons",
					},
				},
			},
			{
				path: "rejection-reason/form",
				component: RejectionReasonFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Rejection Reason Details",
					breadcrumb: {
						label: "Rejection Reason Details",
						alias: "Rejection Reason Details",
					},
				},
			},
			{
				path: "rejection-reason/form/:id",
				component: RejectionReasonFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Rejection Reason Details",
					breadcrumb: {
						label: "Rejection Reason Details",
						alias: "Rejection Reason Details",
					},
				},
			},
			//--------Rejection Reason Routes End--------//

			//--------Rejection Reason Type Routes--------//
			{
				path: "rejection-reason-type/list",
				component: RejectionReasonTypeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Rejection Reason Types",
					breadcrumb: {
						label: "Rejection Reason Types",
						alias: "Rejection Reason Types",
					},
				},
			},
			{
				path: "rejection-reason-type/form",
				component: RejectionReasonTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Rejection Reason Type Details",
					breadcrumb: {
						label: "Rejection Reason Type Details",
						alias: "Rejection Reason Type Details",
					},
				},
			},
			{
				path: "rejection-reason-type/form/:id",
				component: RejectionReasonTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Rejection Reason Type Details",
					breadcrumb: {
						label: "Rejection Reason Type Details",
						alias: "Rejection Reason Type Details",
					},
				},
			},
			//--------Rejection Reason Routes End--------//

			//--------Tender Type Routes--------//
			{
				path: "tender-type/list",
				component: TenderTypeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Tender Types",
					breadcrumb: {
						label: "Tender Types",
						alias: "Tender Types",
					},
				},
			},
			{
				path: "tender-type/form",
				component: TenderTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Tender Type Details",
					breadcrumb: {
						label: "Tender Type Details",
						alias: "Tender Type Details",
					},
				},
			},
			{
				path: "tender-type/form/:id",
				component: TenderTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Tender Type Details",
					breadcrumb: {
						label: "Tender Type Details",
						alias: "Tender Type Details",
					},
				},
			},
			//--------Tender Type Routes End--------//

			//--------UOM Routes--------//
			{
				path: "uom/list",
				component: UomListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Unit Of Measurements",
					breadcrumb: {
						label: "Unit Of Measurements",
						alias: "Unit Of Measurements",
					},
				},
			},
			{
				path: "uom/form",
				component: UomFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Unit Of Measurement Details",
					breadcrumb: {
						label: "Unit Of Measurement Details",
						alias: "Unit Of Measurement Details",
					},
				},
			},
			{
				path: "uom/form/:id",
				component: UomFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Unit Of Measurement Details",
					breadcrumb: {
						label: "Unit Of Measurement Details",
						alias: "Unit Of Measurement Details",
					},
				},
			},
			//--------UOM Routes End--------//

			//--------UOM Type Routes--------//
			{
				path: "uom-type/list",
				component: UomTypeListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "UOM Types",
					breadcrumb: {
						label: "UOM Types",
						alias: "UOM Types",
					},
				},
			},
			{
				path: "uom-type/form",
				component: UomTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "UOM Type Details",
					breadcrumb: {
						label: "UOM Type Details",
						alias: "UOM Type Details",
					},
				},
			},
			{
				path: "uom-type/form/:id",
				component: UomTypeFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "UOM Type Details",
					breadcrumb: {
						label: "UOM Type Details",
						alias: "UOM Type Details",
					},
				},
			},
			//--------UOM Routes End--------//

			//--------Help Video Routes--------//
			{
				path: "help-video/list",
				component: HelpVideoListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Help Videos",
					breadcrumb: {
						label: "Help Videos",
						alias: "Help Videos",
					},
				},
			},
			{
				path: "help-video/form",
				component: HelpVideoFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Help Video Details",
					breadcrumb: {
						label: "Help Video Details",
						alias: "Help Video Details",
					},
				},
			},
			{
				path: "help-video/form/:id",
				component: HelpVideoFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Help Video Details",
					breadcrumb: {
						label: "Help Video Details",
						alias: "Help Video Details",
					},
				},
			},
			//--------Help Video Routes End--------//



			//--------Relationship Routes--------//
			{
				path: "relationship/list",
				component: RelationshipListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Relationships",
					breadcrumb: {
						label: "Relationships",
						alias: "Relationships",
					},
				},
			},
			{
				path: "relationship/form",
				component: RelationshipFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Relationship Details",
					breadcrumb: {
						label: "Relationship Details",
						alias: "Relationship Details",
					},
				},
			},
			{
				path: "relationship/form/:id",
				component: RelationshipFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Relationship Details",
					breadcrumb: {
						label: "Relationship Details",
						alias: "Relationship Details",
					},
				},
			},
			//--------Relationship Routes End--------//


			//--------Holiday Calendar Routes--------//
			{
				path: "holiday-calendar/list",
				component: HolidayCalendarListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Holiday Calendar",
					breadcrumb: {
						label: "Holiday Calendar",
						alias: "Holiday Calendar",
					},
				},
			},
			{
				path: "holiday-calendar/form",
				component: HolidayCalendarFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Holiday Calendar Details",
					breadcrumb: {
						label: "Holiday Calendar Details",
						alias: "Holiday Calendar Details",
					},
				},
			},
			{
				path: "holiday-calendar/form/:id",
				component: HolidayCalendarFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Holiday Calendar Details",
					breadcrumb: {
						label: "Holiday Calendar Details",
						alias: "Holiday Calendar Details",
					},
				},
			},
			//--------Holiday Calendar Routes End--------//			

			//--------Workflow Routes--------//
			{
				path: "workflow/list",
				component: WorkflowListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflows",
					breadcrumb: {
						label: "Workflows",
						alias: "Workflows",
					},
				},
			},
			{
				path: "workflow/form",
				component: WorkflowFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Details",
					breadcrumb: {
						label: "Workflow Details",
						alias: "Workflow Details",
					},
				},
			},
			{
				path: "workflow/form/:id",
				component: WorkflowFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Details",
					breadcrumb: {
						label: "Workflow Details",
						alias: "Workflow Details",
					},
				},
			},
			//--------Workflow Routes End--------//

			//--------Workflow Section Routes--------//
			{
				path: "workflow-section/list",
				component: WorkflowSectionListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Sections",
					breadcrumb: {
						label: "Workflow Sections",
						alias: "Workflow Sections",
					},
				},
			},
			{
				path: "workflow-section/form",
				component: WorkflowSectionFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Section Details",
					breadcrumb: {
						label: "Workflow Section Details",
						alias: "Workflow Section Details",
					},
				},
			},
			{
				path: "workflow-section/form/:id",
				component: WorkflowSectionFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Section Details",
					breadcrumb: {
						label: "Workflow Section Details",
						alias: "Workflow Section Details",
					},
				},
			},
			//--------Workflow Section Routes End--------//

			//--------Workflow Section Screen Routes--------//
			{
				path: "workflow-section-screen/list",
				component: WorkflowSectionScreenListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Section Screens",
					breadcrumb: {
						label: "Workflow Section Screens",
						alias: "Workflow Section Screens",
					},
				},
			},
			{
				path: "workflow-section-screen/form",
				component: WorkflowSectionScreenFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Section Screen Details",
					breadcrumb: {
						label: "Workflow Section Screen Details",
						alias: "Workflow Section Screen Details",
					},
				},
			},
			{
				path: "workflow-section-screen/form/:id",
				component: WorkflowSectionScreenFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Workflow Section Screen Details",
					breadcrumb: {
						label: "Workflow Section Screen Details",
						alias: "Workflow Section Screen Details",
					},
				},
			},
			//--------Workflow Section Screen Routes End--------//

			//--------Company Role Routes--------//
			{
				path: "company-role/list",
				component: CompanyRoleListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Roles",
					breadcrumb: {
						label: "Roles",
						alias: "Roles",
					},
				},
			},
			{
				path: "company-role/form",
				component: CompanyRoleFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Role Details",
					breadcrumb: {
						label: "Role Details",
						alias: "Role Details",
					},
				},
			},
			{
				path: "company-role/form/:id",
				component: CompanyRoleFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Role Details",
					breadcrumb: {
						label: "Role Details",
						alias: "Role Details",
					},
				},
			},
			//--------Company Role Routes End--------//

			//--------Fees And Taxes Routes--------//
			{
				path: "fees-and-taxes/list",
				component: FeesAndTaxesListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Fees And Taxes",
					breadcrumb: {
						label: "Fees And Taxes",
						alias: "Fees And Taxes",
					},
				},
			},
			{
				path: "fees-and-taxes/form",
				component: FeesAndTaxesFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Fees And Tax Details",
					breadcrumb: {
						label: "Fees And Tax Details",
						alias: "Fees And Tax Details",
					},
				},
			},
			{
				path: "fees-and-taxes/form/:id",
				component: FeesAndTaxesFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Fees And Tax Details",
					breadcrumb: {
						label: "Fees And Tax Details",
						alias: "Fees And Tax Details",
					},
				},
			},
			//--------Fees And Taxes Routes End--------//

			//--------Quantity Threshold Routes--------//
			{
				path: "quantity-threshold/list",
				component: QuantityThresholdListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quantity Threshold",
					breadcrumb: {
						label: "Quantity Threshold",
						alias: "Quantity Threshold",
					},
				},
			},
			{
				path: "quantity-threshold/form",
				component: QuantityThresholdFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quantity Threshold Details",
					breadcrumb: {
						label: "Quantity Threshold Details",
						alias: "Quantity Threshold Details",
					},
				},
			},
			{
				path: "quantity-threshold/form/:id",
				component: QuantityThresholdFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Quantity Threshold Details",
					breadcrumb: {
						label: "Quantity Threshold Details",
						alias: "Quantity Threshold Details",
					},
				},
			},
			//--------Quantity Threshold Routes End--------//

			//--------MSP Price Routes--------//
			{
				path: "msp-price/list",
				component: MspPriceListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "MSP Price",
					breadcrumb: {
						label: "MSP Price",
						alias: "MSP Price",
					},
				},
			},
			{
				path: "msp-price/form",
				component: MspPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "MSP Price Details",
					breadcrumb: {
						label: "MSP Price Details",
						alias: "MSP Price Details",
					},
				},
			},
			{
				path: "msp-price/form/:id",
				component: MspPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "MSP Price Details",
					breadcrumb: {
						label: "MSP Price Details",
						alias: "MSP Price Details",
					},
				},
			},
			//--------MSP Price Routes End--------//

			//--------MFP Price Routes--------//
			{
				path: "mfp-price/list",
				component: MfpPriceListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "MFP Price",
					breadcrumb: {
						label: "MFP Price",
						alias: "MFP Price",
					},
				},
			},
			{
				path: "mfp-price/form",
				component: MfpPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "MFP Price Details",
					breadcrumb: {
						label: "MFP Price Details",
						alias: "MFP Price Details",
					},
				},
			},
			{
				path: "mfp-price/form/:id",
				component: MfpPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "MFP Price Details",
					breadcrumb: {
						label: "MFP Price Details",
						alias: "MFP Price Details",
					},
				},
			},
			//--------MFP Price Routes End--------//

			//--------Non-MSP Price Routes--------//
			{
				path: "non-msp-price/list",
				component: NonMspPriceListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Non-MSP Price",
					breadcrumb: {
						label: "Non-MSP Price",
						alias: "Non-MSP Price",
					},
				},
			},
			{
				path: "non-msp-price/form",
				component: NonMspPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Non-MSP Price Details",
					breadcrumb: {
						label: "Non-MSP Price Details",
						alias: "Non-MSP Price Details",
					},
				},
			},
			{
				path: "non-msp-price/form/:id",
				component: NonMspPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Non-MSP Price Details",
					breadcrumb: {
						label: "Non-MSP Price Details",
						alias: "Non-MSP Price Details",
					},
				},
			},
			//--------Non-MSP Price Routes End--------//

			//--------Zero-Day Regional Commodity PMP Routes--------//
			{
				path: "zero-day-regional-commodity-pmp/details",
				component: ZeroDayRegionalCommodityPmpDetailsComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Zero-Day Regional Commodity PMP",
					breadcrumb: {
						label: "Zero-Day Regional Commodity PMP",
						alias: "Zero-Day Regional Commodity PMP",
					},
				},
			},
			//--------Zero-Day Regional Commodity PMP Routes End--------//


			//--------Commodity Benchmark Market Routes--------//
			{
				path: "commodity-benchmark-market/list",
				component: CommodityBenchmarkMarketListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Benchmark Commodity Markets",
					breadcrumb: {
						label: "Benchmark Commodity Markets",
						alias: "Benchmark Commodity Markets",
					},
				},
			},
			{
				path: "commodity-benchmark-market/form",
				component: CommodityBenchmarkMarketFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Benchmark Commodity Market Details",
					breadcrumb: {
						label: "Benchmark Commodity Market Details",
						alias: "Benchmark Commodity Market Details",
					},
				},
			},
			{
				path: "commodity-benchmark-market/form/:id",
				component: CommodityBenchmarkMarketFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Benchmark Commodity Market Details",
					breadcrumb: {
						label: "Benchmark Commodity Market Details",
						alias: "Benchmark Commodity Market Details",
					},
				},
			},
			//--------Commodity Benchmark Market Routes End--------//


			//--------Commodity Market Price Routes--------//
			{
				path: "commodity-market-price/list",
				component: CommodityMarketPriceListComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Market Prices",
					breadcrumb: {
						label: "Commodity Market Prices",
						alias: "Commodity Market Prices",
					},
				},
			},
			{
				path: "commodity-market-price/form",
				component: CommodityMarketPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Market Price Details",
					breadcrumb: {
						label: "Commodity Market Price Details",
						alias: "Commodity Market Price Details",
					},
				},
			},
			{
				path: "commodity-market-price/form/:id",
				component: CommodityMarketPriceFormComponent,
				canActivate: [AuthGaurdService],
				data: {
					title: "Commodity Market Price Details",
					breadcrumb: {
						label: "Commodity Market Price Details",
						alias: "Commodity Market Price Details",
					},
				},
			},
			//--------Commodity Market Price Routes End--------//
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GenRoutingModule { }
