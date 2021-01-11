export const datamock = {
  Shows:[
    {Id: 'A0010', Name: 'Morning Edition'},
    {Id: 'A0011', Name: 'The Zoo'},
  ],
  Episodes: [
    {Id: 'B0101', ShowId: 'A0010', Name: 'ME for June 1 2020', Date: '2020-06-01' },
    {Id: 'B0102', ShowId: 'A0010', Name: 'ME for June 2 2020', Date: '2020-06-02' },
    {Id: 'B0111', ShowId: 'A0011', Name: 'Zoo for June 1 2020', Date: '2020-06-01' },
    {Id: 'B0112', ShowId: 'A0011', Name: 'Zoo for June 2 2020', Date: '2020-06-02' },
  ],
  Cues: [
    {Id: 'C1010', EpisodeId: 'B0101', CueTimeIn: 0, SongId: 'E0001', SongTimeStart: 233, TimeLength: 30},
    {Id: 'C1011', EpisodeId: 'B0101', CueTimeIn: 38, SongId: 'E0002', SongTimeStart: 3, TimeLength: 15},
  ],
  CPAs: [
    {Id: 'D0001', Type: 'C', Name: 'Bach, JS', Agent: 'Public Domain'},
    {Id: 'D0002', Type: 'C', Name: 'Joel, B', Agent: 'ABC'},
    {Id: 'D0003', Type: 'A', Name: 'Joel, B', Agent: 'ABC'},
    {Id: 'D0004', Type: 'A', Name: 'Liberace', Agent: 'CBA'},
    {Id: 'D0005', Type: 'P', Name: 'Alpha', Agent: 'CBA'},
    {Id: 'D0006', Type: 'P', Name: 'Bravo', Agent: 'ABC'},
  ],
  Songs: [
    {Id: 'E0001', Name: 'Alef', C: [{Id: 'D0001', Share: 75 }, {Id: 'D0002', Share: 25 }], P: [{Id: 'D0005', Share: null}], A: [{Id: 'D0004', Share: null}] },
    {Id: 'E0002', Name: 'Beth', C: [{Id: 'D0001', Share: 50 }, {Id: 'D0002', Share: 50 }], P: [{Id: 'D0005', Share: null}], A: [{Id: 'D0003', Share: null}, {Id: 'D0004', Share: null}] },
    {Id: 'E0003', Name: 'Gimel', C: [{Id: 'D0002', Share: 100 }], P: [{Id: 'D0005', Share: null}, {Id: 'D0006', Share: null}], A: [{Id: 'D0004', Share: null}] },
    {Id: 'E0004', Name: 'Dalet', C: [{Id: 'D0001', Share: 100 }], P: [{Id: 'D0006', Share: null}], A: [{Id: 'D0003', Share: 50}, {Id: 'D0004', Share: 50}] },
    {Id: 'E0005', Name: 'Lamed', C: [{Id: 'D0001', Share: 60 }, {Id: 'D0002', Share: 40 }], P: [{Id: 'D0006', Share: null}], A: [{Id: 'D0004', Share: null}] },
    {Id: 'E0006', Name: 'Mem', C: [{Id: 'D0002', Share: 75 }, {Id: 'D0001', Share: 25 }], P: [{Id: 'D0005', Share: 40}, {Id: 'D0006', Share: 60}], A: [{Id: 'D0003', Share: 60}, {Id: 'D0004', Share: 40}] },
    {Id: 'E0007', Name: 'Nun', C: [{Id: 'D0002', Share: 60 }, {Id: 'D0001', Share: 40 }], P: [{Id: 'D0006', Share: null}], A: [{Id: 'D0004', Share: null}] },
    {Id: 'E0008', Name: 'Samech', C: [], P: [], A: [] },
  ],
}
export const buildModel = (flat) => {
    const objectizeById = arr => { return arr.reduce((r, item) => { r[item.Id] = item; return r }, {}) }
    const applyTo = (obj, method) => { for (const k in obj) { method(obj[k]) } }
    const result = { Shows: {}, Episodes: {}, Cues: {}, CPAs: {}, Songs: {} }
    flat.Songs.forEach(item => result.Songs[item.Id] = new Song(item))
    flat.CPAs.forEach(item => result.CPAs[item.Id] = new CPA(item))
    flat.Cues.forEach(item => result.Cues[item.Id] = new Cue(item))
    flat.Episodes.forEach(item => result.Episodes[item.Id] = new Episode(item))
    flat.Shows.forEach(item => result.Shows[item.Id] = new Show(item))
    applyTo(result.Cues, item => {
      item.Episode = result.Episodes[item.EpisodeId]
      if (!!!item.Episode.Cues) item.Episode.Cues = []
      item.Episode.Cues.push(item)
      item.Song = result.Songs[item.SongId]
    })
    applyTo(result.Episodes, item => {
      item.Show = result.Shows[item.ShowId]
      if (!!!item.Show.Episodes) item.Show.Episodes = []
      item.Show.Episodes.push(item)
    })
    applyTo(result.Shows, item => {
      item.Episodes = Object.entries(result.Episodes).reduce((r, e) => {const o = e[1]; if (o.ShowId === item.Id) r.push(o); return r}, [])
    })
    // console.log(result)
    return result
  }




class Wrapper {
  obj
  summary = ''
  typeLabel = 'Object'
  constructor(source) {
    this.obj = source
    for (const [key, value] of Object.entries(this.obj)) {
      this[key] = value
    }
  }
  applySummary(){
    this.summary = `${this.typeLabel} : ${((!!this.obj) ? this.obj.Name||this.obj.Id : 'n/a')}`
  }
}

class Show extends Wrapper {
  typeLabel = 'Show'
  constructor(s, ...args) {
    super(s, ...args)
    this.applySummary()
  }
}

class Episode extends Wrapper {
  typeLabel = 'Episode'
  constructor(s, ...args) {
    super(s, ...args)
    this.applySummary()
  }
}

class Cue extends Wrapper {
  typeLabel = 'Cue'
    constructor(s, ...args) {
      super(s, ...args)
      this.applySummary()
    }
}

class Song extends Wrapper {
  typeLabel = 'Song'
  constructor(s, ...args) {
    super(s, ...args)
    this.applySummary()
  }
}

class CPA extends Wrapper {
  typeLabel = this.obj.Type
  constructor(s, ...args) {
    super(s, ...args)
    this.applySummary()
  }
}

