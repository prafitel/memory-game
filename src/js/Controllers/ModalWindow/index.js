import ModalWindowView from '../../Views/ModalWindow/index.js';

import EventEmitter from '../../Helpers/eventEmitter.js';

const CONGRATULATIONS_TYPE = 'congratulations';
const LEADER_BOARD_TYPE = 'leader_board';

class ModalWindowController {
  init() {
    EventEmitter.subscribe('showCongratsModal', this.showCongratsModal);
    EventEmitter.subscribe('onClickLeaderBoard', this.showScoreModal);
  }

  showCongratsModal(attempts) {
    ModalWindowView.render({ type: CONGRATULATIONS_TYPE, attempts });
  }

  showScoreModal() {
    ModalWindowView.render({ type: LEADER_BOARD_TYPE });
  }
}

export default new ModalWindowController();
