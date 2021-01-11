import { LightningElement, api } from 'lwc';

export default class CueDisplay extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api cue

    handleSelect(event) {
        event.preventDefault();
        const selectEvent = new CustomEvent('cueselect', {
            bubbles: true,
            detail: this.cue.Id
        });
        this.dispatchEvent(selectEvent);
    }
}
