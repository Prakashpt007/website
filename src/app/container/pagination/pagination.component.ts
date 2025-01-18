
import {
	Component,
	Input,
	OnChanges,
	Output,
	EventEmitter,
} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationConfig, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-pagination",
	templateUrl: "./pagination.component.html",
	styleUrls: ["./pagination.component.scss"],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgbPaginationModule],
	providers: [NgbPaginationConfig],
})
export class PaginationComponent implements OnChanges {
	// firstPageLinkActive: boolean = false;
	// lastPageLinkActive: boolean = false;

	// prevPageLinkActive: boolean = false;
	// nextPageLinkActive: boolean = false;

	@Input() totalRecords!: number;
	@Input() recordsPerPage!: number;
	@Input() currentPage!: number;
	@Input() pageSizeList: number[] = [];
	activePage!: number;
	pageSize!: number;
	constructor (config: NgbPaginationConfig) {
		// customize default values of paginations used by this component tree
		config.size = 'sm';
		config.pageSize = this.pageSize;
		config.boundaryLinks = true;
		// config.maxSize = 5;
	}
	ngOnChanges (): any {
		if (this.currentPage == undefined) {
			this.activePage = 1;
		} else {
			this.activePage = Number(this.currentPage);
		}

	}

	@Output() onPageChange: EventEmitter<number> = new EventEmitter();
	@Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();

	// public pages: number[] = [];


	// ngOnChanges(): any {
	//   const pageCount = this.getPageCount();
	//   this.pages = this.getArrayOfPage(pageCount);
	//   console.log(this.pages);


	//   if (this.currentPage == undefined) {
	//     this.activePage = 1;
	//   } else {
	//     this.activePage = Number(this.currentPage);
	//   }

	//   if (this.recordsPerPage == undefined) {
	//     this.pageSize = 10;
	//   } else {
	//     this.pageSize = Number(this.recordsPerPage);
	//   }
	//   // this.onPageChange.emit(1);

	//   if (this.activePage > 1) {
	//     this.firstPageLinkActive = true;
	//     this.prevPageLinkActive = true;
	//   } else {
	//     this.firstPageLinkActive = false;
	//     this.prevPageLinkActive = false;
	//   }

	//   if (this.pages.length > this.activePage) {
	//     this.lastPageLinkActive = true;
	//     this.nextPageLinkActive = true;
	//   } else {
	//     this.lastPageLinkActive = false;
	//     this.nextPageLinkActive = false;
	//   }
	// }

	// private getPageCount(): number {
	//   let totalPage = 0;

	//   if (this.totalRecords > 0 && this.recordsPerPage > 0) {
	//     const pageCount = this.totalRecords / this.recordsPerPage;
	//     const roundedPageCount = Math.floor(pageCount);

	//     totalPage =
	//       roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
	//   }

	//   return totalPage;
	// }

	// private getArrayOfPage(pageCount: number): number[] {
	//   const pageArray = [];
	//   if (pageCount > 0) {
	//     for (let i = 1; i <= pageCount - 1; i++) {
	//       pageArray.push(i);
	//     }
	//   }

	//   return pageArray;
	// }

	// onClickPage(pageNumber: number): void {
	//   if (pageNumber >= 1 && pageNumber <= this.pages.length) {
	//     this.activePage = pageNumber;
	//     this.onPageChange.emit(this.activePage);
	//   }
	// }

	// getFirstPage() {
	//   this.activePage = 1;
	//   this.onClickPage(this.activePage);
	// }

	// getLastPage() {
	//   this.activePage = this.pages.length;
	//   this.onClickPage(this.activePage);
	// }

	pageSizeChange (event: any) {
		this.onPageSizeChange.emit(event);
	}

	pageChange (e: any) {
		this.onPageChange.emit(e);
	}
}
