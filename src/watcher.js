import { watch } from 'melanke-watchjs';

export default (state) => {
  const chessFieldDiv = document.querySelector('#chess');

  watch(
    state,
    'chessFigures',
    (prop, action, chess) => {
      const chessColors = Object.keys(chess);
      chessColors.forEach(
        (color) => {
          const chessFirstPositionDiv = document.getElementById(`${color}`);
          const chessFirstPositionTable = document.createElement('table');
          chessFirstPositionDiv.textContent = '';
          const firstRow = document.createElement('tr');
          chess[color].forEach(
            (figuresData) => {
              const { figure, targets } = figuresData;
              targets.forEach(
                (target) => {
                  const td = document.createElement('td');
                  td.setAttribute('target', target);
                  td.textContent = figure;
                  td.classList.add('item-initial');
                  firstRow.append(td);
                },
              );
            },
          );
          chessFirstPositionTable.append(firstRow);
          chessFirstPositionDiv.append(chessFirstPositionTable);
        },
      );
    },
  );

  watch(
    state,
    'chessField',
    (prop, action, newValue) => {
      const chessTable = document.createElement('table');
      const rowsKeys = Object.keys(newValue);
      rowsKeys.forEach(
        (row) => {
          const chessRow = document.createElement('tr');
          newValue[row].forEach(
            (col, i) => {
              const chessCol = document.createElement('td');
              if (i === 0 || row === '0' || i === 9 || row === '9') {
                chessCol.classList.add('borders');
              } else {
                chessCol.classList.add('item');
              }
              chessCol.id = `${row}_${i}`;
              chessCol.textContent = col;
              // Можно без датасетов
              // chessCol.dataset.row = row;
              // chessCol.dataset.col = i;
              chessRow.append(chessCol);
            },
          );
          chessTable.append(chessRow);
        },
      );
      document.getElementById('loading').remove();
      chessFieldDiv.append(chessTable);
    },
  );

  watch(
    state,
    'checkedItem',
    () => {
      const { checkedItem } = state;
      const checkedEl = document.getElementById(checkedItem.elId);
      checkedEl.classList.add('active');
    },
  );

  watch(
    state,
    'targetItem',
    () => {
      const { checkedItem, targetItem } = state;

      const checkedEl = document.getElementById(checkedItem.elId);
      checkedEl.textContent = ' '; // Если мы хотим, чтобы фигуры 'ели' друг друга
      // checkedEl.textContent = targetItem.elText; // Если мы хотим, чтобы фигуры менялсь местами
      checkedEl.classList.remove('active');

      const targetEl = document.getElementById(targetItem.elId);
      targetEl.textContent = checkedItem.elText;
    },
  );

  watch(
    state,
    'movedToPosition',
    (prop, action, newValue) => {
      const { targetPostition, textContent } = newValue;
      const targetElement = document.getElementById(targetPostition);
      targetElement.textContent = textContent;

      const initialElemet = document.querySelector(`[target='${targetPostition}']`);
      initialElemet.textContent = '';
      initialElemet.classList.remove('item-initial');
      initialElemet.classList.add('hidden');
    },
  );
};
