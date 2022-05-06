import { LightningElement, api } from 'lwc';
import LightningDatatable from 'lightning/datatable';
import viewer from './viewer.html';
import editor from './editor.html';

export default class CustomInlineEditDatatable extends LightningDatatable {
    static customTypes = {
        combobox: {
            template: viewer,
            editTemplate: editor,
            typeAttributes: ['options'],
            standardCellLayout: true,
        },
    };
}
