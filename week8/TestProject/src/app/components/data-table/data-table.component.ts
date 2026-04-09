import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnChanges {
  @Input() title = '';
  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Input() enablePagination = false;
  @Input() pageSize = 5;
  @Input() showEdit = false;
  @Input() showDelete = false;

  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();

  currentPage = 1;
  totalPages = 1;
  paginatedData: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.currentPage = 1;
    this.setupPagination();
  }

  setupPagination(): void {
    if (!this.enablePagination) {
      this.paginatedData = this.data;
      this.totalPages = 1;
      return;
    }

    this.totalPages = Math.max(1, Math.ceil(this.data.length / this.pageSize));
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    if (!this.enablePagination) {
      this.paginatedData = this.data;
      return;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  onEdit(row: any): void {
    this.editClicked.emit(row);
  }

  onDelete(row: any): void {
    this.deleteClicked.emit(row);
  }
}
