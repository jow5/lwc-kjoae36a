import { LightningElement } from "lwc";
import { datamock, buildModel} from './mock'

export default class App extends LightningElement {
  title = "Welcome to the mockup!";

  showFeatures = false;
  fetchedData = { Shows: {}, Episodes: {}, Cues: {}, CPAs: {}, Songs: {} }
  episode = {}
  cuelist = []
  current

  async connectedCallback() {
    this.fetchedData = buildModel(datamock)
    this.episode = this.fetchedData.Episodes['B0101']
    this.cuelist = Array.from(this.episode.Cues)
  }

  renderedCallback(){
      // this.spinner = "off"
      // this.toggleSpinner(false, 'rc')
      // alert('calledback')
  }

  handleCueSelect(event) {
    const selectedCueId = event.detail
    this.current = this.cuelist.find(o => o.Id === selectedCueId)
  }
}
