import LocalStorage from '../../Models/LocalStorage/index.js';

import EventEmitter from '../../Helpers/eventEmitter.js';
import createNode from '../../Helpers/createNode.js';

const CONGRATULATIONS_TYPE = 'congratulations';
const LEADER_BOARD_TYPE = 'leader_board';
const ESCAPE_KEY = 'Escape';

class ModalWindowView {
  render({ type, attempts = 0 }) {
    const modalPopup = createNode('div', 'modal-popup');
    const modalPopupContentWrapper = createNode(
      'div',
      'modal-popup-content__wrapper',
    );
    const btnClose = createNode('button', 'close-popup');

    if (type === CONGRATULATIONS_TYPE) {
      this.prepareCongratsModal(modalPopupContentWrapper, attempts);
    }

    if (type === LEADER_BOARD_TYPE) {
      this.prepareLeaderBoardModal(modalPopupContentWrapper);
    }

    modalPopupContentWrapper.append(btnClose);
    modalPopup.append(modalPopupContentWrapper);
    document.body.append(modalPopup);

    setTimeout(() => {
      modalPopup.style.transform = 'scale(1)';
      modalPopup.style.opacity = 1;
    }, 100);

    this.popupClickHandler();
    this.popupPressHandler();

    EventEmitter.subscribe('removePopup', this.removePopup);
  }

  popupClickHandler = () => {
    document
      .querySelector('.modal-popup')
      .addEventListener('click', (event) => {
        if (
          event.target instanceof HTMLElement &&
          (event.target.classList.contains('close-popup') ||
            event.target.classList.contains('modal-popup'))
        ) {
          this.removePopup();
        }
      });
  };

  popupPressHandler = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === ESCAPE_KEY) {
        this.removePopup();
      }
    });
  };

  removePopup() {
    const popup = document.querySelector('.modal-popup');

    if (popup instanceof HTMLElement) {
      setTimeout(() => {
        popup.style.transform = 'scale(0)';
        popup.style.opacity = '0';
      }, 100);
    }

    setTimeout(() => {
      popup.remove();
    }, 300);
  }

  prepareCongratsModal(modalPopupContentWrapper, attempts) {
    const congratsText = createNode('p', 'modal-congrats__text');
    congratsText.innerText = `Поздравляем! Вы выиграли за ${attempts} ходов`;

    const congratsBtnsWrapper = createNode(
      'div',
      'modal-congrats__btns-wrapper',
    );

    const newGameBtn = createNode('button', 'modal-congrats__new-game-btn');
    newGameBtn.setAttribute('type', 'button');
    newGameBtn.innerText = 'Новая игра';

    const closeModalBtn = createNode('button', 'modal-congrats__close-btn');
    closeModalBtn.setAttribute('type', 'button');
    closeModalBtn.innerText = 'Закрыть';

    congratsBtnsWrapper.append(newGameBtn, closeModalBtn);

    modalPopupContentWrapper.append(congratsText, congratsBtnsWrapper);

    congratsBtnsWrapper.addEventListener('click', (event) => {
      if (event.target.closest('.modal-congrats__new-game-btn')) {
        EventEmitter.publish('onClickNewGameViewPreparing');
        EventEmitter.publish('onClickNewGameDataFill');

        this.removePopup();
      }

      if (event.target.closest('.modal-congrats__close-btn')) {
        this.removePopup();
      }
    });
  }

  prepareLeaderBoardModal(modalPopupContentWrapper) {
    const leaderBoardInfo = LocalStorage.getLeaderBoard();

    const stabText = createNode('p', 'modal-score__stab');
    stabText.innerText = 'Пока нет результатов';

    if (!leaderBoardInfo.length) {
      modalPopupContentWrapper.append(stabText);
    }

    const leaderBoardWrapper = createNode('div', 'modal-score__wrapper');

    leaderBoardInfo.forEach(({ attempts, date }, index) => {
      const leaderBoardItem = createNode('div', 'modal-score__item');
      leaderBoardItem.innerText = `${index + 1}. Число ходов: ${attempts}. Дата: ${new Date(date).toLocaleDateString('ru-RU')}`;

      leaderBoardWrapper.append(leaderBoardItem);
    });

    modalPopupContentWrapper.append(leaderBoardWrapper);
  }
}

export default new ModalWindowView();
