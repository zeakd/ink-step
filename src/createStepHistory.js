const emptyTask = {}

function createStepHistory (...args) {
  class StepHistory {
    constructor (initialTask = '') {

      this.stack = [];  
      this.listeners = [];

      this.task = this.formatTask(initialTask);
      this.stack.push(this.task);
    }

    formatTask (task) {
      return typeof task === 'string' ? { name: task } : task;
    }

    push (_task) {
      const task = this.formatTask(_task);

      this.stack.push(task);
      this.task = task;

      // console.log('push task', _task, task)
      this.notify(this.task);
    }

    pop () {
      const task = this.stack.pop();
      this.task = task ? task : emptyTask;

      this.notify(this.task)
    }

    listen (func) {
      const _listen = (_func) => {
        let isActive = true;

        const listener = (...args) => {
          if (isActive) _func(...args)
        }

        this.listeners.push(listener);

        return () => {
          isActive = false;
          this.listeners = this.listeners.filter(l => l !== listener);
        }
      }
      
      return _listen(func);
    }

    notify (...args) {
      this.listeners.forEach(listener => {
        listener(...args);
      })
    }
  }

  return new StepHistory(...args);
}

module.exports = createStepHistory;