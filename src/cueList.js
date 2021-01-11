import { LightningElement, api } from "lwc";

export default class CueList extends LightningElement {
  @api isedit = false
  @api cues = []
  @api current = {}
  @api selected = []

  handleCueSelect(event) {
    this.current = event.target.cue
    console.log(this.current.Id)
  }
}
