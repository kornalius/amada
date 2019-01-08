import { React, Style } from '../../amada'

export default React.createClass({

  getInitialState () {
    return { }
  },

  render () {
    return (
      <div className='index'>

        <Style scopeSelector='.index' rules={{
          color: 'white',
        }} />

        <h1>Amada</h1>
        <pre>
          <div>{'We are using node ' + process.versions.node}</div>
          <div>{'Chromium ' + process.versions.chrome}</div>
          <div>{'and Electron ' + process.versions.electron}</div>
        </pre>
      </div>
    )
  }
})
