const { Component } = require('ink')
const createStepHistory = require('../createStepHistory');

class TaskProvider extends Component {
  constructor (props, context) {
    super(props, context);

    this.history = props.history;
    this.task = { ...this.history.task };
    this.state = {}
  }

  render ({ children }) {
    // const { children } = this.props;
    // console.log('Provider render', this.props, this.state, this.context)
    return children;
  }

  getChildContext () {
    return {
      step: {
        history: this.history,
        task: this.task,
      }
    }
  }

  componentDidMount () {
    this.unlisten = this.history.listen(task => {
      // console.log('listen!!!!\n', task, this.history.task);
      if (this.state.task !== task) {
        // console.log('1', this.task, task);
        Object.assign(this.task, task);
        // console.log('2', this.task);
        // console.log(this.context)
        this.setState({
          task,
        })
      }
    })
  }

  componentWillUnmount () {
    this.unlisten();
  }
}

module.exports = TaskProvider;