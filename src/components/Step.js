const { h, Component } = require('ink');
const isComponent = require('../utils/isComponent');

function defaultMatch (sourceTask, exp, delimiter = [':', '/']) {
  return sourceTask.indexOf(exp) === 0 && (!sourceTask[exp.length] || delimiter.includes(sourceTask[exp.length]));
}

class Step extends Component {
  constructor (...args) {
    super(...args);

    this.state = {
      matched: this.computeMatch(),
    }
  }

  computeMatch () {
    const { match, delimiter, task } = this.props;

    // console.log(task, this.context.step.task.name, delimiter, match(task, this.context.step.task.name, delimiter))

    return match(task, this.context.step.task.name, delimiter);   
  }

  componentDidMount () {
    const matched = this.computeMatch();

    // console.log('Step mount\n', matched, this.state.matched)
    if (matched !== this.state.matched) {
      this.setState({
        matched
      }) 
    }
  }

  componentDidUpdate () {
    // console.log('Step update\n');
    const matched = this.computeMatch();

    if (matched !== this.state.matched) {
      this.setState({
        matched
      }) 
    }
  }

  render () {
    const { component, render, children } = this.props;

    if (this.state.matched) {
      // console.log(component, isComponent(component));
      if (isComponent(component)) {
        // console.log(component)
        return h(component, null);
      }
  
      if (render) {
        // console.log('render!');
        return render(this.props, this.state, this.context);
      }
  
      if (children) {
        return children;
      }
    }

    // console.log('null render');
    
    return null;
  }
}

Step.defaultProps = {
  match: defaultMatch,
  delimiter: [':', '/'],
}

module.exports = Step;