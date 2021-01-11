import { LightningElement, api } from 'lwc';

export default class CueEdit extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api cue
}
