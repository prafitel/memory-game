import AppContainer from './js/Controllers/App/index.js';
import GameControlsController from './js/Controllers/GameControls/index.js';
import GameController from './js/Controllers/Game/index.js';

const initApp = () => {
  AppContainer.init();

  GameControlsController.init();
  GameController.init();
};

initApp();
