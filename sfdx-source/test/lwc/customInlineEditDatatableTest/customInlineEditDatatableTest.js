import { LightningElement, api } from 'lwc';

export default class CustomInlineEditDatatable extends LightningElement {
    columns = [
        {
            fieldName: 'id',
            label: 'Id',
        },
        {
            fieldName: 'name',
            label: 'Name',
            type: 'combobox',
            typeAttributes: {
                options: [
                    {
                        label: 'wilson',
                        value: 'wilson',
                    },
                    {
                        label: 'coco',
                        value: 'coco',
                    },
                ],
            },
            editable: true,
        },
    ];

    data = [
        {
            id: '1',
            name: 'wilson',
        },
    ];
}
