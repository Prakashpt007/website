import {ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {AutocompleteAutoActiveFirstOptionExample} from './autocomplete/autocomplete-auto-active-first-option-example';
import {AutocompleteDisplayExample} from './autocomplete/autocomplete-display-example';
import {AutocompleteFilterExample} from './autocomplete/autocomplete-filter-example';
import {AutocompleteOptgroupExample} from './autocomplete/autocomplete-optgroup-example';
import {AutocompleteOverviewExample} from './autocomplete/autocomplete-overview-example';
import {AutocompleteRequireSelectionExample} from './autocomplete/autocomplete-require-selection-example';
import {AutocompleteSimpleExample} from './autocomplete/autocomplete-simple-example';
import {BadgeOverviewExample} from './badge/badge-overview-example';
import {BottomSheetOverviewExample, BottomSheetOverviewExampleSheet} from './bottom-sheet/bottom-sheet-overview-example';
import {ButtonOverviewExample} from './button/button.component';
import {ButtonToggleAppearanceExample} from './button-toggle/button-toggle-appearance-example';
import {ButtonToggleExclusiveExample} from './button-toggle/button-toggle-exclusive-example';
import {ButtonToggleFormsExample} from './button-toggle/button-toggle-forms-example';
import {ButtonToggleModeExample} from './button-toggle/button-toggle-mode-example';
import {ButtonToggleOverviewExample} from './button-toggle/button-toggle-overview-example';
import {CardActionsExample} from './card/card-actions-example';
import {CardFancyExample} from './card/card-fancy-example';
import {CardFooterExample} from './card/card-footer-example';
import {CardMediaSizeExample} from './card/card-media-size-example';
import {CardOverviewExample} from './card/card-overview-example';
import {CardSubtitleExample} from './card/card-subtitle-example';
import {CheckboxConfigurableExample} from './checkbox/checkbox-configurable-example';
import {CheckboxOverviewExample} from './checkbox/checkbox-overview-example';
import {CheckboxReactiveFormsExample} from './checkbox/checkbox-reactive-forms-example';
import {ChipsAutocompleteExample} from './chips/chips-autocomplete-example';
import {ChipsAvatarExample} from './chips/chips-avatar-example';
import {ChipsDragDropExample} from './chips/chips-drag-drop-example';
import {ChipsFormControlExample} from './chips/chips-form-control-example';
import {ChipsInputExample} from './chips/chips-input-example';
import {ChipsOverviewExample} from './chips/chips-overview-example';
import {ChipsStackedExample} from './chips/chips-stacked-example';
import {DateRangePickerComparisonExample} from './datepicker/date-range-picker-comparison-example';
import {DateRangePickerFormsExample} from './datepicker/date-range-picker-forms-example';
import {DateRangePickerOverviewExample} from './datepicker/date-range-picker-overview-example';
import {DateRangePickerSelectionStrategyExample} from './datepicker/date-range-picker-selection-strategy-example';
import {DatepickerActionsExample} from './datepicker/datepicker-actions-example';
import {DatepickerApiExample} from './datepicker/datepicker-api-example';
import {DatepickerColorExample} from './datepicker/datepicker-color-example';
import {DatepickerCustomHeaderExample} from './datepicker/datepicker-custom-header-example';
import {DatepickerCustomIconExample} from './datepicker/datepicker-custom-icon-example';
import {DatepickerDateClassExample} from './datepicker/datepicker-date-class-example';
import {DatepickerDisabledExample} from './datepicker/datepicker-disabled-example';
import {DatepickerEventsExample} from './datepicker/datepicker-events-example';
import {DatepickerFilterExample} from './datepicker/datepicker-filter-example';
import {DatepickerFormatsExample} from './datepicker/datepicker-formats-example';
import {DatepickerInlineCalendarExample} from './datepicker/datepicker-inline-calendar-example';
import {DatepickerLocaleExample} from './datepicker/datepicker-locale-example';
import {DatepickerMinMaxExample} from './datepicker/datepicker-min-max-example';
import {DatepickerMomentExample} from './datepicker/datepicker-moment-example';
import {DatepickerOverviewExample} from './datepicker/datepicker-overview-example';
import {DatepickerStartViewExample} from './datepicker/datepicker-start-view-example';
import {DatepickerTouchExample} from './datepicker/datepicker-touch-example';
import {DatepickerValueExample} from './datepicker/datepicker-value-example';
import {DatepickerViewsSelectionExample} from './datepicker/datepicker-views-selection-example';
import {DialogAnimationsExample} from './dialog/dialog-animations-example';
import {DialogContentExample} from './dialog/dialog-content-example';
import {DialogDataExample} from './dialog/dialog-data-example';
import {DialogElementsExample} from './dialog/dialog-elements-example';
import {DialogFromMenuExample} from './dialog/dialog-from-menu-example';
import {DialogOverviewExample} from './dialog/ialog-overview-example';
import {DividerOverviewExample} from './divider/divider-overview-example';
import {ExpansionExpandCollapseAllExample} from './expansion-panel/expansion-expand-collapse-all-example';
import {ActivatedRoute, Router} from '@angular/router';
import {ExpansionOverviewExample} from './expansion-panel/expansion-overview-example';
import {ExpansionStepsExample} from './expansion-panel/expansion-steps-example';
import {FormFieldAppearanceExample} from './form-field/form-field-appearance-example';
import {FormFieldCustomControlExample} from './form-field/form-field-custom-control-example';
import {FormFieldErrorExample} from './form-field/form-field-error-example';
import {FormFieldHintExample} from './form-field/form-field-hint-example';
import {FormFieldLabelExample} from './form-field/form-field-label-example';
import {FormFieldOverviewExample} from './form-field/form-field-overview-example';
import {FormFieldPrefixSuffixExample} from './form-field/form-field-prefix-suffix-example';
import {FormFieldThemingExample} from './form-field/form-field-theming-example';
import {MatDivider} from '@angular/material/divider';
import {GridListDynamicExample} from './grid-list/grid-list-dynamic-example';
import {GridListOverviewExample} from './grid-list/grid-list-overview-example';
import {IconOverviewExample} from './icon/icon-overview-example';
import {IconSvgExample} from './icon/icon-svg-example';
import {InputClearableExample} from './input/input-clearable-example';
import {InputErrorStateMatcherExample} from './input/input-error-state-matcher-example';
import {InputErrorsExample} from './input/input-errors-example';
import {InputFormExample} from './input/input-form-example';
import {InputHintExample} from './input/input-hint-example';
import {InputOverviewExample} from './input/input-overview-example';
import {InputPrefixSuffixExample} from './input/input-prefix-suffix-example';
import {ListOverviewExample} from './list/list-overview-example';
import {ListSectionsExample} from './list/list-sections-example';
import {ListSelectionExample} from './list/list-selection-example';
import {ListSingleSelectionExample} from './list/list-single-selection-example';
import {ListVariantsExample} from './list/list-variants-example';
import {MenuIconsExample} from './menu/menu-icons-example';
import {MenuNestedExample} from './menu/menu-nested-example';
import {MenuOverviewExample} from './menu/menu-overview-example';
import {MenuPositionExample} from './menu/menu-position-example';
import {ProgressBarBufferExample} from './progress-bar/progress-bar-buffer-example';
import {ProgressBarConfigurableExample} from './progress-bar/progress-bar-configurable-example';
import {ProgressBarDeterminateExample} from './progress-bar/progress-bar-determinate-example';
import {ProgressBarIndeterminateExample} from './progress-bar/progress-bar-indeterminate-example';
import {ProgressBarQueryExample} from './progress-bar/progress-bar-query-example';
import {ProgressSpinnerConfigurableExample} from './progress-spinner/progress-spinner-configurable-example';
import {ProgressSpinnerOverviewExample} from './progress-spinner/progress-spinner-overview-example';
import {RadioNgModelExample} from './radio/radio-ng-model-example';
import {RadioOverviewExample} from './radio/radio-overview-example';
import {RippleOverviewExample} from './ripple/ripple-overview-example';
import {SelectCustomTriggerExample} from './select/select-custom-trigger-example';
import {SelectDisabledExample} from './select/select-disabled-example';
import {SelectErrorStateMatcherExample} from './select/select-error-state-matcher-example';
import {SelectFormExample} from './select/select-form-example';
import {SelectHintErrorExample} from './select/select-hint-error-example';
import {SelectInitialValueExample} from './select/select-initial-value-example';
import {SelectMultipleExample} from './select/select-multiple-example';
import {SelectNoRippleExample} from './select/select-no-ripple-example';
import {SelectOptgroupExample} from './select/select-optgroup-example';
import {SelectOverviewExample} from './select/select-overview-example';
import {SelectPanelClassExample} from './select/select-panel-class-example';
import {SelectReactiveFormExample} from './select/select-reactive-form-example';
import {SelectResetExample} from './select/select-reset-example';
import {SelectValueBindingExample} from './select/select-value-binding-example';
import {SidenavAutosizeExample} from './sidenav/sidenav-autosize-example';
import {SidenavBackdropExample} from './sidenav/sidenav-backdrop-example';
import {SidenavDrawerOverviewExample} from './sidenav/sidenav-drawer-overview-example';
import {SlideToggleConfigurableExample} from './slide-toggle/slide-toggle-configurable-example';
import {SlideToggleFormsExample} from './slide-toggle/slide-toggle-forms-example';
import {SlideToggleOverviewExample} from './slide-toggle/slide-toggle-overview-example';
import {SliderConfigurableExample} from './slider/slider-configurable-example';
import {SliderFormattingExample} from './slider/slider-formatting-example';
import {SliderOverviewExample} from './slider/slider-overview-example';
import {SliderRangeExample} from './slider/slider-range-example';
import {SnackBarAnnotatedComponentExample} from './snack-bar/snack-bar-annotated-component-example';
import {SnackBarComponentExample} from './snack-bar/snack-bar-component-example';
import {SnackBarOverviewExample} from './snack-bar/snack-bar-overview-example';
import {SnackBarPositionExample} from './snack-bar/snack-bar-position-example';
import {SortOverviewExample} from './sort-header/sort-overview-example';
import {StepperAnimationsExample} from './stepper/stepper-animations-example';
import {StepperEditableExample} from './stepper/stepper-editable-example';
import {StepperErrorsExample} from './stepper/stepper-errors-example';
import {StepperHeaderPositionExample} from './stepper/stepper-header-position-example';
import {StepperIntlExample} from './stepper/stepper-intl-example';
import {StepperLabelPositionBottomExample} from './stepper/stepper-label-position-bottom-example';
import {StepperLazyContentExample} from './stepper/stepper-lazy-content-example';
import {StepperOverviewExample} from './stepper/stepper-overview-example';
import {StepperResponsiveExample} from './stepper/stepper-responsive-example';
import {StepperStatesExample} from './stepper/stepper-states-example';
import {StepperVerticalExample} from './stepper/stepper-vertical-example';
import {TableBasicExample} from './table/table-basic-example';
import {TableColumnStylingExample} from './table/table-column-styling-example';
import {TableDynamicArrayDataExample} from './table/table-dynamic-array-data-example';
import {TableDynamicColumnsExample} from './table/table-dynamic-columns-example';
import {TableDynamicObservableDataExample} from './table/table-dynamic-observable-data-example';
import {TableExpandableRowsExample} from './table/table-expandable-rows-example';
import {TableFilteringExample} from './table/table-filtering-example';
import {TableFlexBasicExample} from './table/table-flex-basic-example';
import {TableFlexLargeRowExample} from './table/table-flex-large-row-example';
import {TableFooterRowExample} from './table/table-footer-row-example';
import {TableGeneratedColumnsExample} from './table/table-generated-columns-example';
import {TableHttpExample} from './table/table-http-example';
import {TableMultipleHeaderFooterExample} from './table/table-multiple-header-footer-example';
import {TableOverviewExample} from './table/table-overview-example';
import {TablePaginationExample} from './table/table-pagination-example';
import {TableRecycleRowsExample} from './table/table-recycle-rows-example';
import {TableReorderableExample} from './table/table-reorderable-example';
import {TableRowBindingExample} from './table/table-row-binding-example';
import {TableRowContextExample} from './table/table-row-context-example';
import {TableSelectionExample} from './table/table-selection-example';
import {TableSortingExample} from './table/table-sorting-example';
import {TableStickyColumnsExample} from './table/table-sticky-columns-example';
import {TableStickyComplexFlexExample} from './table/table-sticky-complex-flex-example';
import {TableStickyComplexExample} from './table/table-sticky-complex-example';
import {TableStickyFooterExample} from './table/table-sticky-footer-example';
import {TableStickyHeaderExample} from './table/table-sticky-header-example';
import {TableTextColumnAdvancedExample} from './table/table-text-column-advanced-example';
import {TableTextColumnExample} from './table/table-text-column-example';
import {TableWithRipplesExample} from './table/table-with-ripples-example';
import {TableWrappedExample} from './table/table-wrapped-example';
import {TabGroupAlignExample} from './tabs/tab-group-align-example';
import {TabGroupAnimationsExample} from './tabs/tab-group-animations-example';
import {TabGroupAsyncExample} from './tabs/tab-group-async-example';
import {TabGroupBasicExample} from './tabs/tab-group-basic-example';
import {TabGroupCustomLabelExample} from './tabs/tab-group-custom-label-example';
import {TabGroupDynamicHeightExample} from './tabs/tab-group-dynamic-height-example';
import {TabGroupDynamicExample} from './tabs/tab-group-dynamic-example';
import {TabGroupHeaderBelowExample} from './tabs/tab-group-header-below-example';
import {TabGroupInkBarExample} from './tabs/tab-group-ink-bar-example';
import {TabGroupInvertedExample} from './tabs/tab-group-inverted-example';
import {TabGroupLazyLoadedExample} from './tabs/tab-group-lazy-loaded-example';
import {TabGroupPaginatedExample} from './tabs/tab-group-paginated-example';
import {TabGroupPreserveContentExample} from './tabs/tab-group-preserve-content-example';
import {TabGroupStretchedExample} from './tabs/tab-group-stretched-example';
import {TabGroupThemeExample} from './tabs/tab-group-theme-example';
import {TabNavBarBasicExample} from './tabs/tab-nav-bar-basic-example';
import {ToolbarOverviewExample} from './toolbar/toolbar-overview-example';
import {ToolbarMultirowExample} from './toolbar/toolbar-multirow-example';
import {ToolbarBasicExample} from './toolbar/toolbar-basic-example';
import {TooltipAutoHideExample} from './tooltip/tooltip-auto-hide-example';
import {TooltipCustomClassExample} from './tooltip/tooltip-custom-class-example';
import {TooltipDelayExample} from './tooltip/tooltip-delay-example';
import {TooltipDisabledExample} from './tooltip/tooltip-disabled-example';
import {TooltipManualExample} from './tooltip/tooltip-manual-example';
import {TooltipMessageExample} from './tooltip/tooltip-message-example';
import {TooltipModifiedDefaultsExample} from './tooltip/tooltip-modified-defaults-example';
import {TooltipOverviewExample} from './tooltip/tooltip-overview-example';
import {TooltipPositionAtOriginExample} from './tooltip/tooltip-position-at-origin-example';
import {TooltipPositionExample} from './tooltip/tooltip-position-example';
import {TreeDynamicExample} from './tree/tree-dynamic-example';
import {TreeFlatOverviewExample} from './tree/tree-flat-overview-example';
import {TreeHarnessExample} from './tree/tree-harness-example';
import {TreeLoadmoreExample} from './tree/tree-loadmore-example';
import {TreeNestedOverviewExample} from './tree/tree-nested-overview-example';

import {DraggableScrollDirective} from '../../utility/directives/draggable.directive';




@Component({
	selector: 'app-mat-theme',
	standalone: true,
	imports: [
		MatDivider,
		MatIconModule,
		DraggableScrollDirective,
		AutocompleteAutoActiveFirstOptionExample,
		AutocompleteDisplayExample,
		AutocompleteFilterExample,
		AutocompleteOptgroupExample,
		AutocompleteOverviewExample,
		AutocompleteRequireSelectionExample,
		AutocompleteSimpleExample,
		BadgeOverviewExample,
		BottomSheetOverviewExample,
		ButtonOverviewExample,
		ButtonToggleAppearanceExample,
		ButtonToggleExclusiveExample,
		ButtonToggleFormsExample,
		ButtonToggleModeExample,
		ButtonToggleOverviewExample,
		CardActionsExample,
		CardFancyExample,
		CardFooterExample,
		CardMediaSizeExample,
		CardOverviewExample,
		CardSubtitleExample,
		CheckboxConfigurableExample,
		CheckboxOverviewExample,
		CheckboxReactiveFormsExample,
		ChipsAutocompleteExample,
		ChipsAvatarExample,
		ChipsDragDropExample,
		ChipsFormControlExample,
		ChipsInputExample,
		ChipsOverviewExample,
		ChipsStackedExample,
		DateRangePickerComparisonExample,
		DateRangePickerFormsExample,
		DateRangePickerOverviewExample,
		DateRangePickerSelectionStrategyExample,
		DatepickerActionsExample,
		DatepickerApiExample,
		DatepickerColorExample,
		DatepickerCustomHeaderExample,
		DatepickerCustomIconExample,
		DatepickerDateClassExample,
		DatepickerDisabledExample,
		DatepickerEventsExample,
		DatepickerFilterExample,
		DatepickerFormatsExample,
		DatepickerInlineCalendarExample,
		DatepickerLocaleExample,
		DatepickerMinMaxExample,
		DatepickerMomentExample,
		DatepickerOverviewExample,
		DatepickerStartViewExample,
		DatepickerTouchExample,
		DatepickerValueExample,
		DatepickerViewsSelectionExample,
		DialogAnimationsExample,
		DialogContentExample,
		DialogDataExample,
		DialogElementsExample,
		DialogFromMenuExample,
		DialogOverviewExample,
		DividerOverviewExample,
		ExpansionExpandCollapseAllExample,
		ExpansionOverviewExample,
		ExpansionStepsExample,
		FormFieldAppearanceExample,
		FormFieldCustomControlExample,
		FormFieldErrorExample,
		FormFieldHintExample,
		FormFieldLabelExample,
		FormFieldOverviewExample,
		FormFieldPrefixSuffixExample,
		FormFieldThemingExample,
		GridListDynamicExample,
		GridListOverviewExample,
		IconOverviewExample,
		IconSvgExample,
		InputClearableExample,
		InputErrorStateMatcherExample,
		InputErrorsExample,
		InputFormExample,
		InputHintExample,
		InputOverviewExample,
		InputPrefixSuffixExample,
		ListOverviewExample,
		ListSectionsExample,
		ListSelectionExample,
		ListSingleSelectionExample,
		ListVariantsExample,
		MenuIconsExample,
		MenuNestedExample,
		MenuOverviewExample,
		MenuPositionExample,
		ProgressBarBufferExample,
		ProgressBarConfigurableExample,
		ProgressBarDeterminateExample,
		ProgressBarIndeterminateExample,
		ProgressBarQueryExample,
		ProgressSpinnerConfigurableExample,
		ProgressSpinnerOverviewExample,
		RadioNgModelExample,
		RadioOverviewExample,
		RippleOverviewExample,
		SelectCustomTriggerExample,
		SelectDisabledExample,
		SelectErrorStateMatcherExample,
		SelectFormExample,
		SelectHintErrorExample,
		SelectInitialValueExample,
		SelectMultipleExample,
		SelectNoRippleExample,
		SelectOptgroupExample,
		SelectOverviewExample,
		SelectPanelClassExample,
		SelectReactiveFormExample,
		SelectResetExample,
		SelectValueBindingExample,
		SidenavAutosizeExample,
		SidenavBackdropExample,
		SidenavDrawerOverviewExample,
		SlideToggleConfigurableExample,
		SlideToggleFormsExample,
		SlideToggleOverviewExample,
		SliderConfigurableExample,
		SliderFormattingExample,
		SliderOverviewExample,
		SliderRangeExample,
		SnackBarAnnotatedComponentExample,
		SnackBarComponentExample,
		SnackBarOverviewExample,
		SnackBarPositionExample,
		SortOverviewExample,
		StepperAnimationsExample,
		StepperEditableExample,
		StepperErrorsExample,
		StepperHeaderPositionExample,
		StepperIntlExample,
		StepperLabelPositionBottomExample,
		StepperLazyContentExample,
		StepperOverviewExample,
		StepperResponsiveExample,
		StepperStatesExample,
		StepperVerticalExample,
		TableBasicExample,
		TableColumnStylingExample,
		TableDynamicArrayDataExample,
		TableDynamicColumnsExample,
		TableDynamicObservableDataExample,
		TableExpandableRowsExample,
		TableFilteringExample,
		TableFlexBasicExample,
		TableFlexLargeRowExample,
		TableFooterRowExample,
		TableGeneratedColumnsExample,
		TableHttpExample,
		TableMultipleHeaderFooterExample,
		TableOverviewExample,
		TablePaginationExample,
		TableRecycleRowsExample,
		TableReorderableExample,
		TableRowBindingExample,
		TableRowContextExample,
		TableSelectionExample,
		TableSortingExample,
		TableStickyColumnsExample,
		TableStickyComplexFlexExample,
		TableStickyComplexExample,
		TableStickyFooterExample,
		TableStickyHeaderExample,
		TableTextColumnAdvancedExample,
		TableTextColumnExample,
		TableWithRipplesExample,
		TableWrappedExample,
		TabGroupAlignExample,
		TabGroupAnimationsExample,
		TabGroupAsyncExample,
		TabGroupBasicExample,
		TabGroupCustomLabelExample,
		TabGroupDynamicHeightExample,
		TabGroupDynamicExample,
		TabGroupHeaderBelowExample,
		TabGroupInkBarExample,
		TabGroupInvertedExample,
		TabGroupLazyLoadedExample,
		TabGroupPaginatedExample,
		TabGroupPreserveContentExample,
		TabGroupStretchedExample,
		TabGroupThemeExample,
		TabNavBarBasicExample,
		ToolbarBasicExample,
		ToolbarOverviewExample,
		ToolbarMultirowExample,
		TooltipAutoHideExample,
		TooltipCustomClassExample,
		TooltipDelayExample,
		TooltipDisabledExample,
		TooltipManualExample,
		TooltipMessageExample,
		TooltipModifiedDefaultsExample,
		TooltipOverviewExample,
		TooltipPositionAtOriginExample,
		TooltipPositionExample,
		TreeDynamicExample,
		TreeFlatOverviewExample,
		TreeHarnessExample,
		TreeLoadmoreExample,
		TreeNestedOverviewExample
	],
	templateUrl: './mat-theme.component.html',
	styleUrl: './mat-theme.component.scss'
})
export class MatThemeComponent {

	@ViewChild('autocomplete') autocomplete!: ElementRef;

	@ViewChildren("element", {read: ElementRef}) elements!: QueryList<ElementRef>;
	constructor (private elementRef: ElementRef, private router: Router, private route: ActivatedRoute, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) { }


	ngOnInit (): void {
		this.route.queryParams.subscribe((params: {[x: string]: string;}) => {
			params['tab'] != undefined ? this.toggleTabs(params['tab']) : this.setTab('autocomplete');
		});


	}
	tabs: Array<any> = [
		{
			label: 'Autocomplete',
			name: "autocomplete",
			status: false
		},
		{
			label: 'Badge',
			name: "badge",
			status: false
		},
		{
			label: 'Bottom Sheet',
			name: "bottom-sheet",
			status: false
		},
		{
			label: 'Buttons',
			name: "buttons",
			status: false
		},
		{
			label: 'Buttons Toggle',
			name: "buttons-toggle",
			status: false
		},
		{
			label: 'Card',
			name: "card",
			status: false
		},
		{
			label: 'Checkbox',
			name: "checkbox",
			status: false
		},
		{
			label: 'Chips',
			name: "chips",
			status: false
		},
		{
			label: 'Datepicker',
			name: "datepicker",
			status: false
		},
		{
			label: 'Dialog',
			name: "dialog",
			status: false
		},
		{
			label: 'Divider',
			name: "divider",
			status: false
		},
		{
			label: 'Expansion Panel',
			name: "expansion-panel",
			status: false
		},
		{
			label: 'Form Fields',
			name: "form-field",
			status: false
		},
		{
			label: 'Grid List',
			name: "grid-list",
			status: false
		},
		{
			label: 'Icon',
			name: "icon",
			status: false
		},
		{
			label: 'Input',
			name: "input",
			status: false
		},
		{
			label: 'List',
			name: "list",
			status: false
		},
		{
			label: 'Menu',
			name: "menu",
			status: false
		},
		{
			label: 'Paginator',
			name: "paginator",
			status: false
		},
		{
			label: 'Progress Bar',
			name: "progress-bar",
			status: false
		},
		{
			label: 'Progress Spinner',
			name: "progress-spinner",
			status: false
		},
		{
			label: 'Radio',
			name: "radio",
			status: false
		},
		{
			label: 'Ripple',
			name: "ripple",
			status: false
		},
		{
			label: 'Select',
			name: "select",
			status: false
		},
		{
			label: 'Sidenav',
			name: "sidenav",
			status: false
		},
		{
			label: 'Slide Toggle',
			name: "slide-toggle",
			status: false
		},
		{
			label: 'Slider',
			name: "slider",
			status: false
		},
		{
			label: 'Snack Bar',
			name: "snack-bar",
			status: false
		},
		{
			label: 'Sort Header',
			name: "sort-header",
			status: false
		},
		{
			label: 'Stepper',
			name: "stepper",
			status: false
		},
		{
			label: 'Table',
			name: "table",
			status: false
		},
		{
			label: 'Tabs',
			name: "tabs",
			status: false
		},
		{
			label: 'Toolbar',
			name: "toolbar",
			status: false
		},
		{
			label: 'Tooltip',
			name: "tooltip",
			status: false
		},
		{
			label: 'Tree',
			name: "tree",
			status: false
		}
	];


	setTab (name: string) {
		this.toggleTabs(name);
		this.router.navigate(["/mat-theme"], {queryParams: {tab: name}});

	}

	toggleTabs (name: string) {
		this.tabs.map(tab => tab.name === name ? tab.status = true : tab.status = false);
		this.router.navigate(["/mat-theme"], {queryParams: {tab: name}});
		setTimeout(() => {
			this.scrollToElement();
		}, 500);
	}

	scrollToElement () {
		// console.log(element.nativeElement.getAttribute('data-name') == tabname);
		// this.tabs.forEach((element, i) => {

		// 	// console.log(element.status);

		// 	if (element.status) {
		// 		element.nativeElement.scrollIntoView({
		// 			behavior: "smooth",
		// 			block: "center",
		// 			inline: "center"
		// 		});
		// 	}

		// });

		const activeTab = this.tabs.find(tab => tab.status === true);
		if (activeTab) {
			const activeTabIndex = this.tabs.indexOf(activeTab);
			const activeButton = this.elements.toArray()[activeTabIndex].nativeElement;
			activeButton.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center'
			});
		}
	}

}
