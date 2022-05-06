# Custom Inline Edit Datatable
Custom Inline Edit Datatable is a valid and effective approach to high quality inline edit support for lightning datatable.

## Get Started
This lwc component has a combobox inline editor for datatable as an example. You are welcome to add your own custom inline edit support as well.

The first and most important step to declare your custom inline edit support is to extend from lightning datatable and add your own type.

Here is the code:
```javascript
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
```

Note that besides the normal **template** attribute, we also add **editTemplate** attribute here. **typeAttributes** can be used both in **template** and **editTemplate**. Also, **standardCellLayout** has to be set to true to enable custom inline edit support.

Next, if you want to use simple base lightning component as the inline editor, you can go with this in your **editTemplate** html file.
```html
<template>
    <lightning-input
        name="edit"
        label="Edit"
        data-inputable="true"
        value={editedValue}
    >
    </lightning-input>
</template>
```

**editedValue** is used to pass in the current edited value and the new edited value will be passed out by bubbling of change events.

If you want to have a more complicated implementation of the inline editor, then you can create a custom lwc component like below:
```javascript
export default class ComboboxDatatype extends LightningElement {
    _value = null;
    @api
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    @api options = [];

    handleChange(e) {
        e.stopPropagation();

        this._value = e.detail.value;

        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                value: this._value,
            },
        }));
    }

    @api
    get validity() {
        return this.template.querySelector('lightning-combobox').validity;
    }

    @api
    showHelpMessageIfInvalid() {
        this.template.querySelector('lightning-combobox').showHelpMessageIfInvalid();
    }

    @api
    focus() {
        this.template.querySelector('lightning-combobox').focus();
    }
}
```

The methods annotated with @api are all required here.

In the **editTemplate** html, we can pass in the type attributes like this:
```html
<template>
    <c-combobox-datatype
        data-inputable="true"
        options={columnDef.typeAttributes.options}
        value={editedValue}
    >
    </c-combobox-datatype>
</template>
```

Here is the screen snapshot:
![CustomInlineEditDatatable](/docs/customInlineEditDatatable.png "CustomInlineEditDatatable")

## Pros and Cons

### Pros
This implementation utilizes the same approach that standard lightning datatable uses internally to render inline editing for standard types. So the behavior is highly consistent.

### Cons
This implementation relies on the internal behavior of lightning datatable and is subject to change.
