# ink-step
Manage Ink app step by step. inspired by react-router.

## Install

``` bash
$ npm install --save ink-step
```

## Getting Started

``` js
const { h, render, Component, Color } = require('ink');
const { Step, To, TaskProvider, createStepHistory } = require('ink-step');

// Welcome step Component
class WelcomeStep extends Component {
  constructor (...args) {
    super(...args);

    this.state = {
      welcome: true,
    };
  }

  componentDidMount () {
    setTimeout(() => {
			this.setState({ welcome: false });
    }, 1000)
  }

  render (props, state, context) {
    if (!this.state.welcome) {
      return <To task='main' />
    }

    return (
      <Color blue>Welcome to Step!</Color>
    )
  }
}

// Main step Component
function MainStep (props, context) {
  return <Color green>This is Ink-step</Color>
}

// create step history
const history = createStepHistory('welcome')

const App = () => (
  <div>
    <Step task='welcome' render={() => <WelcomeStep />} />
    <Step task='main' render={() => <MainStep />}/>
  </div>
)

// Provider must have root child.
render(
  <TaskProvider history={history}>
    <App /> 
  </TaskProvider>
);

```

## API

### TaskProvider
``` js
const history = createStepHistory('init')

<TaskProvider history={history}>
  <MyApp />
</TaskProvider>
```

### Step
```js
<Step task='welcome' render={() => <WelcomeStep />} />
// or
<Step task='welcome'>
  <WelcomeStep />
</Step>
```

### To
``` js
<To task='welcome' />
```

### createStepHistory
``` js
const { createStepHistory } = require('ink-step');

const history = createStepHistory('initial-task');
```



