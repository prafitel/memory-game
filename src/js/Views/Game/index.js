import AppView from '../App/index.js';

import EventEmitter from '../../Helpers/eventEmitter.js';
import createNode from '../../Helpers/createNode.js';

class GameView {
  gameWrapper = createNode('div', 'game__wrapper');
  gameBoard = createNode('div', 'game__board');
  gameCountersWrapper = createNode('div', 'game__counters-wrapper');
  gameScoreCounter = createNode('div', 'game__counter');
  gameAttemptCounter = createNode('div', 'game__attempt-counter');

  renderWrapper() {
    this.changeCountersValue(0, 0);

    this.gameCountersWrapper.append(
      this.gameScoreCounter,
      this.gameAttemptCounter,
    );

    this.gameWrapper.append(this.gameBoard, this.gameCountersWrapper);

    AppView.getAppContainer().append(this.gameWrapper);
  }

  render(gameCards) {
    console.log('gameCards', gameCards);
    this.fillBoard(gameCards);

    this.gameBoardClickHandler();

    EventEmitter.subscribe('onMatchPair', this.changeMatchedCards);
    EventEmitter.subscribe('onInconsistencyPair', this.changeInconsistencyPair);
  }

  crateCard(gameCardAttribute) {
    const newCard = createNode('div', 'game__card');

    newCard.setAttribute('data-value', gameCardAttribute);

    return newCard;
  }

  fillBoard(gameCards) {
    gameCards.forEach((gameCard) => {
      this.gameBoard.append(this.crateCard(gameCard));
    });
  }

  gameBoardClickHandler = () => {
    this.gameBoard.addEventListener('click', (event) => {
      const gameCardTarget = event.target.closest('.game__card');

      if (
        gameCardTarget &&
        !gameCardTarget.classList.contains('is-flipped') &&
        !gameCardTarget.classList.contains('is-matched')
      ) {
        console.log('xxxxx', gameCardTarget.getAttribute('data-value'));

        gameCardTarget.classList.add('is-flipped');

        EventEmitter.publish(
          'onClickGameCard',
          gameCardTarget.getAttribute('data-value'),
        );
      }
    });
  };

  changeMatchedCards = ({ gameCardDataValue, score, attempts }) => {
    document
      .querySelectorAll(`.game__card[data-value=${gameCardDataValue}]`)
      .forEach((item) => {
        item.classList.add('is-matched');

        item.classList.remove('is-flipped');
      });

    this.changeCountersValue(score, attempts);
  };

  changeInconsistencyPair = ({ score, attempts }) => {
    console.log(
      'document.querySelectorAll(`.is-flipped`)',
      document.querySelectorAll(`.is-flipped`),
    );

    document.querySelectorAll(`.is-flipped`).forEach((item) => {
      item.classList.add('is-wrong');
    });

    this.disableClickOnCards();

    setTimeout(() => {
      document.querySelectorAll(`.is-flipped`).forEach((item) => {
        item.classList.remove('is-wrong');
        item.classList.remove('is-flipped');
      });

      this.disableClickOnCards();
    }, 1500);

    console.log('score, attempts', score, attempts);

    this.changeCountersValue(score, attempts);
  };

  changeCountersValue(score, attempts) {
    this.gameScoreCounter.innerText = `Ходов: ${attempts}`;
    this.gameAttemptCounter.innerText = `Пар: ${score} из 8`;
  }

  disableClickOnCards() {
    this.gameBoard.classList.toggle('disable-clicks');
  }
}

export default new GameView();
