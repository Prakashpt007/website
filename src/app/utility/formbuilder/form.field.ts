export interface FormField {
	bulkInsert?: BulkFormFieldJSON[];
	formData: FormDataJSON[];
}

export interface BulkFormFieldJSON {
	name: string;
	label: string;
	value?: any;
	type: string;
	prefix?: prefixSuffixJSON;
	suffix?: prefixSuffixJSON;
	bulkInsertStoreUrl: string;
	downloadSampleFileUrl: string;
	downloadErrorFileUrl?: string;
	MIMETypes: string;
	validators: ValidatorJSON;
}
export interface prefixSuffixJSON {
	type: any['text' | 'icon' | 'matIcon'];
	value: string;
}

export interface FormFieldJSON {
	name: string;
	label: string;
	value: any;
	type: string;
	prefix?: prefixSuffixJSON;
	suffix?: prefixSuffixJSON;
	validators: ValidatorJSON;
	options: OptionJSON[];
}

export interface FormDataJSON {
	fields: FormFieldJSON[];
	formStoreUrl: string;
	errors?: [];
}

interface ValidatorJSON {
	min?: any;
	max?: any;
	numberic?: any;
	readonly?: any;
	disabled?: any;
	mobile?: boolean;
	required?: boolean;
	email?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	dateFormat?: string;
	MIMEType?: string[];
}

interface OptionJSON {
	label: string;
	value: any;
}
