
const isComponent = component => typeof component === 'function' || (component && component.isComponent);

module.exports = isComponent;