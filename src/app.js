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

  const whiteChessmens = [
    { targets: ['7_1', '7_2', '7_3', '7_4', '7_5', '7_6', '7_7', '7_8'], figure: '♙' },
    { targets: ['8_1', '8_8'], figure: '♖' },
    { targets: ['8_2', '8_7'], figure: '♘' },
    { targets: ['8_3', '8_6'], figure: '♗' },
    { targets: ['8_4'], figure: '♕' },
    { targets: ['8_5'], figure: '♔' },
  ];

  const blackChessmens = [
    { targets: ['2_1', '2_2', '2_3', '2_4', '2_5', '2_6', '2_7', '2_8'], figure: '♟' },
    { targets: ['1_1', '1_8'], figure: '♜' },
    { targets: ['1_2', '1_7'], figure: '♞' },
    { targets: ['1_3', '1_6'], figure: '♝' },
    { targets: ['1_4'], figure: '♛' },
    { targets: ['1_5'], figure: '♚' },
  ];

  initialChessRows['9'] = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ' '];
  initialChessRows['8'] = ['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1'];
  initialChessRows['7'] = ['2', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '2'];
  initialChessRows['6'] = ['3', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '3'];
  initialChessRows['5'] = ['4', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '4'];
  initialChessRows['4'] = ['5', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '5'];
  initialChessRows['3'] = ['6', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '6'];
  initialChessRows['2'] = ['7', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '7'];
  initialChessRows['1'] = ['8', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '8'];
  initialChessRows['0'] = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ' '];

  const appState = {
    chessFigures: {},
    chessField: [],
    checkedItem: {},
    targetItem: {},
    action: 'getItem',
    movedToPosition: {},
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
      },
    );

    const figuresInitialPosition = document.querySelectorAll('.figures');
    figuresInitialPosition.forEach(
      (initialPosition) => {
        initialPosition.addEventListener(
          'click',
          (e) => {
            const { target } = e;
            if (target.classList.contains('item-initial')) {
              const { textContent } = target;
              const targetPostition = target.getAttribute('target');
              state.movedToPosition = { targetPostition, textContent };
            }
          },
        );
      },
    );
  };

  controls(appState);
  watcher(appState);

  appState.chessField = initialChessRows;
  appState.chessFigures = {
    whiteChessmens,
    blackChessmens,
  };
};

export default app;
