import AppView from '../App/index.js';

import EventEmitter from '../../Helpers/eventEmitter.js';
import createNode from '../../Helpers/createNode.js';

class GameControlsView {
  controlsWrapper = createNode('div', 'header__wrapper');
  newGameBtn = createNode('button', 'header__start-btn');
  leaderBoardBtn = createNode('button', 'header__leaders-btn');

  render() {
    AppView.getHeaderContainer().append(this.controlsWrapper);

    this.newGameBtn.setAttribute('type', 'button');
    this.newGameBtn.innerText = 'Новая игра';

    this.leaderBoardBtn.setAttribute('type', 'button');
    this.leaderBoardBtn.innerText = 'Таблица лидеров';

    this.controlsWrapper.append(this.newGameBtn, this.leaderBoardBtn);

    this.controlsClickHandler();

    EventEmitter.subscribe('disableControls', this.disableControls);
  }

  controlsClickHandler = () => {
    this.controlsWrapper.addEventListener('click', (event) => {
      if (event.target.closest('.header__start-btn')) {
        EventEmitter.publish('onClickNewGameViewPreparing');
        EventEmitter.publish('onClickNewGameDataFill');
      }

      if (event.target.closest('.header__leaders-btn')) {
        EventEmitter.publish('onClickLeaderBoard');
      }
    });
  };

  disableControls = () => {
    this.newGameBtn.classList.toggle('disable-clicks');
  };
}

export default new GameControlsView();
