import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { GridComponent, GridColumn, DataAdapter, Smart } from 'smart-webcomponents-angular/grid';
import { GetData } from '../common/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Cuadro Comparativo';
     @ViewChild('button', { read: ButtonComponent, static: false }) addColumn: ButtonComponent;
    @ViewChild('button2', { read: ButtonComponent, static: false }) removeLastColumn: ButtonComponent;
    @ViewChild('button3', { read: ButtonComponent, static: false }) addRow: ButtonComponent;
    @ViewChild('button4', { read: ButtonComponent, static: false }) removeLastRow: ButtonComponent;
    @ViewChild('printBtn', { read: ButtonComponent, static: false }) printBtn: ButtonComponent;
    @ViewChild('button5', { read: ButtonComponent, static: false }) pdfBtn: ButtonComponent;
    @ViewChild('grid', { read: GridComponent, static: false }) grid: GridComponent;
    
    appearance = {
        alternationStart: 0,
        alternationCount: 2,
    }

    dataExport = {
        view: true,
        viewStart: 0,
        viewEnd: 50
    }

    dataSource = new Smart.DataAdapter({
        dataSource: GetData(),
        dataFields: [
            'Columna1: string',
            'Columna2: string',
            'Columna3: string',
            'Columna4: string',
            'Columna5: string',
            'Columna6: string',
            'Columna7: string',
            'Columna8: string',
            'Columna9: string',
            'Columna10: string'
        ]
    })
    editing = {
        enabled: true,
        mode: 'cell',
        allowColumnHeaderEdit: true
    }
    columns = [
        'Columna1',
        'Columna2',

    ]

    ngOnInit(): void {
        // onInit code.
    }

    ngAfterViewInit(): void {
        // afterViewInit code.
        this.init();
    }

    init(): void {
        // init code.
        const that = this;

        let index = 0;
        const columnsList = [
            'Columna1',
            'Columna2',
            'Columna3',
            'Columna4',
            'Columna5',
            'Columna6',
            'Columna7',
            'Columna8',
            'Columna9',
            'Columna10'
        ];
        const updateButtonsDisabledState = function () {
            that.addColumn.disabled = (that.grid.columns as GridColumn[]).length === columnsList.length;
            that.removeLastColumn.disabled = (that.grid.columns as GridColumn[]).length === 0;
            that.removeLastRow.disabled = that.grid.rows.length === 0;
        };
        const createRow = () => {
            const newRow = new window.Smart.Grid.Row({  });

            return newRow;
        };

        that.addRow.addEventListener('click', function (event) {
            that.grid.rows.push(createRow());
            updateButtonsDisabledState();
        });

        that.addColumn.addEventListener('click', function (event) {
            for (let i = 0; i < columnsList.length; i++) {
                let alreadyAdded = false;
                for (let j = 0; j < (that.grid.columns as GridColumn[]).length; j++) {
                    const column = (that.grid.columns as GridColumn[])[j];
                    if (column && column.label === columnsList[i]) {
                        alreadyAdded = true;
                        break;
                    }
                }
                if (alreadyAdded) {
                    continue;
                }
                const newColumn = new Smart.Grid.Column({ label: columnsList[i], dataField: columnsList[i] });
                (that.grid.columns as GridColumn[]).push(newColumn);
                break;
            }
            updateButtonsDisabledState();
        });

        that.removeLastColumn.addEventListener('click', function (event) {
            (that.grid.columns as GridColumn[]).pop();
            updateButtonsDisabledState();
        });
        
        that.removeLastRow.addEventListener('click', function (event) {
            that.grid.rows.pop();
            updateButtonsDisabledState();
        });

        that.pdfBtn.addEventListener('click', () => {
            that.grid.exportData('pdf');
        });

        that.printBtn.addEventListener('click', () => {
            that.grid.print();
        });

    }
}
