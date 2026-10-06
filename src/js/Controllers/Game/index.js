import GameView from '../../Views/Game/index.js';

import LocalStorage from '../../Models/LocalStorage/index.js';
import EventEmitter from '../../Helpers/eventEmitter.js';

const BOARD_SIZE = 8;
const EQUAL_ITEMS_QUANTITY = 2;

class GameController {
  gameScore = 0;
  gameAttempt = 0;
  memoryItemsList = [];
  cardToCheckList = [];

  init() {
    GameView.renderWrapper();

    this.createMemoryItems();
    this.shuffleMemoryItems();

    GameView.render(this.memoryItemsList);

    EventEmitter.subscribe('onClickGameCard', this.checkCard);
    EventEmitter.subscribe('onClickNewGameDataFill', this.startNewGame);
  }

  createMemoryItems() {
    this.memoryItemsList = Array.from(
      { length: BOARD_SIZE * EQUAL_ITEMS_QUANTITY },
      (_, index) => {
        const itemNumber = Math.floor(index / 2) + 1;

        return `item-${itemNumber}`;
      },
    );
  }

  shuffleMemoryItems() {
    this.memoryItemsList = this.memoryItemsList
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  checkCard = (gameCardDataValue) => {
    this.cardToCheckList.push(gameCardDataValue);

    if (this.cardToCheckList.length < EQUAL_ITEMS_QUANTITY) {
      return;
    }

    ++this.gameAttempt;

    const isMatchedCards = this.cardToCheckList.every(
      (item) => item === this.cardToCheckList[0],
    );

    if (isMatchedCards) {
      ++this.gameScore;

      EventEmitter.publish('onMatchPair', {
        gameCardDataValue,
        score: this.gameScore,
        attempts: this.gameAttempt,
      });
    } else {
      EventEmitter.publish('onInconsistencyPair', {
        score: this.gameScore,
        attempts: this.gameAttempt,
      });
    }

    this.cardToCheckList = [];

    if (this.gameScore === BOARD_SIZE) {
      EventEmitter.publish('showCongratsModal', this.gameAttempt);

      LocalStorage.setLeaderBoard(this.gameAttempt);
    }
  };

  startNewGame = () => {
    this.createMemoryItems();
    this.shuffleMemoryItems();

    this.cardToCheckList = [];
    this.gameScore = 0;
    this.gameAttempt = 0;

    GameView.fillBoard(this.memoryItemsList);
  };
}

export default new GameController();
