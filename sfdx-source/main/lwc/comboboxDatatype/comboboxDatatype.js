import { LightningElement, api } from 'lwc';

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
