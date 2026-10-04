import createNode from '../../Helpers/createNode.js';
import AppView from '../App/index.js';

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
  }
}

export default new GameControlsView();
