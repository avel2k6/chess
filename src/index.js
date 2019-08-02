import watcher from './watcher';

const app = () => {
  const [initialChessColls, initialChessRows] = [[], {}];
  const rowLength = 10;
  const collLength = 10;

  for (let i = 0; i < collLength; i += 1) {
    initialChessColls.push('');
  }

  for (let i = 0; i < rowLength; i += 1) {
    initialChessRows[i] = initialChessColls;
  }

  initialChessRows['9'] = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ' '];
  initialChessRows['8'] = ['1', '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖', '1'];
  initialChessRows['7'] = ['2', '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙', '2'];
  initialChessRows['6'] = ['3', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '3'];
  initialChessRows['5'] = ['4', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '4'];
  initialChessRows['4'] = ['5', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '5'];
  initialChessRows['3'] = ['6', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '6'];
  initialChessRows['2'] = ['7', '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟', '7'];
  initialChessRows['1'] = ['8', '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '8'];
  initialChessRows['0'] = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ' '];


  console.log(initialChessRows);

  const appState = {
    chessField: [],
    checkedItem: {},
    targetItem: {},
    action: 'getItem',
  };

  const controls = (formCurrentState) => {
    const state = formCurrentState;


    const formInput = document.querySelector('#chess');
    formInput.addEventListener(
      'click',
      (e) => {
        const { target } = e;
        const tagetClasses = target.classList;
        if (!tagetClasses.contains('borders') && tagetClasses.contains('item')) {
          const elText = e.target.textContent;
          const elId = e.target.id;
          if (state.action === 'getItem') {
            if (elText === ' ') { // Не даем брать 'пустые' поля
              return;
            }
            state.checkedItem = {
              elText,
              elId,
            };
            state.action = 'setItem';
            return;
          }

          if (state.action === 'setItem') {
            state.targetItem = {
              elText,
              elId,
            };
            state.action = 'getItem';
          }
        }

        // if (target.c)
        // if (isURL(input) && !state.feeds.includes(input)) {
        //   rssForm.validate();
        // } else {
        //   rssForm.invalidate();
        // }
      },
    );
  };

  controls(appState);
  watcher(appState);

  appState.chessField = initialChessRows;
};

app();
