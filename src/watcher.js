import { watch } from 'melanke-watchjs';
import '../assets/application.css';

export default (state) => {
  const chessFieldDiv = document.querySelector('#chess');

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
      checkedEl.textContent = targetItem.elText;
      checkedEl.classList.remove('active');

      const targetEl = document.getElementById(targetItem.elId);
      targetEl.textContent = checkedItem.elText;
    },
  );
};
