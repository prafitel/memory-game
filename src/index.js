import AppContainer from './js/Controllers/App/index.js';
import GameControlsController from './js/Controllers/GameControls/index.js';
import GameController from './js/Controllers/Game/index.js';
import ModalWindowController from './js/Controllers/ModalWindow/index.js';

const initApp = () => {
  AppContainer.init();
  GameControlsController.init();
  GameController.init();
  ModalWindowController.init();
};

initApp();
