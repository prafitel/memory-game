import createNode from '../../Helpers/createNode.js';

class AppView {
  appWrapper = createNode('div', 'app');
  appContainer = createNode('div', 'app__wrapper');
  headerContainer = createNode('header', 'header');

  render() {
    this.appWrapper.append(this.appContainer);
    document.querySelector('body').append(this.headerContainer);
    document.querySelector('body').append(this.appWrapper);
  }

  getAppContainer() {
    return this.appContainer;
  }

  getHeaderContainer() {
    return this.headerContainer;
  }
}

export default new AppView();
