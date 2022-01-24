let screen = document.querySelector('div.screen-inner');
const outerScreen = document.querySelector('div.screen-outer');
const colorButtons = document.querySelectorAll('button.btn.color');
const darkenButton = document.querySelector('button#darken');
const eraseButton = document.querySelector('button.btn.erase');
const slider = document.querySelector('#myRange');
const sliderValue = document.querySelector('#slider-value');

// Initial grid size when page loaded
const screenWidth = parseInt(getComputedStyle(screen).width);
const gridsPerSide = 10;
const gridWidth = screenWidth / gridsPerSide;
const totalGrids = gridsPerSide ** 2;
let lastButtonClicked = 'black';

formInitialGrid();
changeColor();

slider.addEventListener('input', () => {
  sliderValue.textContent = slider.value;
  changeGrid(slider.value);
  changeColor();
});

const colorButtonsArray = [...colorButtons];
colorButtonsArray.forEach((button) => {
  button.addEventListener('click', () => {
    lastButtonClicked = button.id;
    toggleFocusClass(colorButtonsArray, button);
  });
});

function toggleFocusClass(colorButtonsArray, clickedButton) {
  for (const button of colorButtonsArray) {
    if (button === clickedButton) {
      button.classList.add('focus');
    } else {
      button.classList.remove('focus');
    }
  }
}

eraseButton.addEventListener('click', () => {
  const gridDivs = document.querySelectorAll('div.grid');
  const gridsArray = [...gridDivs];
  gridsArray.forEach((grid) => {
    grid.style.backgroundColor = 'rgba(205,205,205,0)';
  })
});

function formInitialGrid() {
  for (let i = 0; i < totalGrids; i++) {
    const newGrid = document.createElement('div');
    screen.appendChild(newGrid);
  
    newGrid.classList.add('grid');
    newGrid.style.height = `${gridWidth}px`;
    newGrid.style.width = `${gridWidth}px`;
  }

  changeBorderRadius(gridsPerSide);
}

function changeGrid(gridsPerSide) {
  outerScreen.removeChild(screen);
  screen = document.createElement('div');
  outerScreen.appendChild(screen);
  screen.classList.add('screen-inner');
  
  const gridWidth = screenWidth / gridsPerSide;
  const totalGrids = gridsPerSide ** 2;

  for (let i = 0; i < totalGrids; i++) {
    const newGrid = document.createElement('div');
    screen.appendChild(newGrid);
  
    newGrid.classList.add('grid');
    newGrid.style.height = `${gridWidth}px`;
    newGrid.style.width = `${gridWidth}px`;
  }

  changeBorderRadius(gridsPerSide);
}

function changeBorderRadius(gridsPerSide) {
  const totalGrids = gridsPerSide ** 2;
  const gridDivs = document.querySelectorAll('div.grid');
  const leftTopCorner = gridDivs[0];
  const rightTopCorner = gridDivs[gridsPerSide - 1];
  const bottomLeftCorner = gridDivs[totalGrids - gridsPerSide];
  const bottomRightCorner = gridDivs[totalGrids - 1];

  leftTopCorner.style.borderTopLeftRadius = '10px';
  rightTopCorner.style.borderTopRightRadius = '10px';
  bottomLeftCorner.style.borderBottomLeftRadius = '10px';
  bottomRightCorner.style.borderBottomRightRadius = '10px';
}

function changeColor() {
  const gridDivs = document.querySelectorAll('div.grid');
  const gridsArray = [...gridDivs];
  
  gridsArray.forEach((grid) => {
    grid.addEventListener('mouseenter', (e) => {
      if (lastButtonClicked === 'black') {
        grid.style.backgroundColor = '#000';
      } else if (lastButtonClicked === 'rainbow') {
        grid.style.backgroundColor = getRandomColor();
      } else {
        if (grid.style.backgroundColor !== 'rgb(0, 0, 0)') {
          let opacity = parseFloat(grid.style.backgroundColor.split(',')[3]);
          if (isNaN(opacity)) {
            opacity = 0;
          }
          opacity += 0.2;
          grid.style.backgroundColor = `rgba(0,0,0,${opacity})`;
        }
      }
    })
  });
}

function getRandomColor() {
  const LETTERS = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += LETTERS[Math.floor(Math.random() * 16)];
  }
  return color;
}
