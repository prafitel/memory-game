import GameView from '../../Views/Game/index.js';

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
    console.log(this.memoryItemsList);

    this.shuffleMemoryItems();
    console.log(this.memoryItemsList);

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

    console.log('gameCardDataValue', gameCardDataValue);
    console.log('this.cardToCheckList', this.cardToCheckList);
    if (this.cardToCheckList.length < 2) {
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
      console.log('++this.gameAttempt', this.gameAttempt);
      EventEmitter.publish('onInconsistencyPair', {
        score: this.gameScore,
        attempts: this.gameAttempt,
      });
    }

    this.cardToCheckList = [];
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
