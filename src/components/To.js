const { Component } = require('ink');

class To extends Component {
  render () {
    return null;
  }

  stepTo () {
    const { history } = this.context.step;
    const { task } = this.props;

    // console.log(history, task);
    history.push(task);
  }

  componentDidMount () {
    // console.log('To mount')
    this.stepTo();
  }

  componentDidUpdate () {
    // console.log('To update')
    this.stepTo();
  }
}

module.exports = To;