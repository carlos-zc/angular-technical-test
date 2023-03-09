import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Character } from 'src/app/shared/interfaces/character.interface';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = [
    'name',
    'species',
    'gender',
    'house',
    'age',
    'image'
  ];
  dataSource = new MatTableDataSource<Character>([]);

  houseSection: boolean | undefined = false;
  houseSelected: string = '';

  @Input() data: Character[] = [];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() houseChange: EventEmitter<MatSelectChange> = new EventEmitter(); // Define un nuevo EventEmitter

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<Character>(this.data);
    this.houseSection =
      this.activatedRoute.snapshot.routeConfig?.path?.includes('characters');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Character>(this.data);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onHouseChange(event: MatSelectChange) {
    this.houseSelected = event.value;
    this.houseChange.emit(event); // Emite el evento houseChange con el valor del evento
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
