import memjs from 'memjs';

let setupDone = false;

let mockedFunctions = {
  memjs:{
      client:{
      }
  }
};

function _setup() {
    if(setupDone){
        return;
    }
    memjs.Client = {
        create: function () {
            return mockedFunctions.memjs.client;
        }
    };
    setupDone = true;
}

_setup();

export default mockedFunctions;
