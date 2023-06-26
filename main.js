import './input.css';

// INPUTS
const colorInput = document.getElementById('color-input');
const colorSelect = document.getElementById('color-select');
const btnGetColorScheme = document.getElementById('btn-color-scheme');

// COLOR DIVS
const bgDivs = document.querySelectorAll('.color-choice');
const hexDivs = document.querySelectorAll('.color-hex');

// SELECTED COLORS
let colorPicked = colorInput.value.substring(1);
let colorSelected = colorSelect.value;
let colorScheme;

// Reset inputs on load
document.addEventListener('DOMContentLoaded', () => {
  colorInput.value = '#f55a5a';
  colorSelect.value = 'monochrome';
});

// FUNCTION - Update the Background Colors
/* eslint-disable no-param-reassign */
function updateBgColors() {
  bgDivs.forEach((div, index) => {
    div.style.backgroundColor = colorScheme[index];
  });

  hexDivs.forEach((text, index) => {
    text.textContent = colorScheme[index];
  });
}
/* eslint-disable no-param-reassign */

// FUNCTION - FETCH Color Scheme from API
function getColorScheme(color, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
    .then((response) => response.json())
    .then((data) => {
      data.colors.forEach((newColor) => {
        colorScheme.push(newColor.hex.value);
      });

      updateBgColors();
    });
}

function colorChanged() {
  colorPicked = colorInput.value.substring(1);
}

function colorSchemeChanged() {
  colorSelected = colorSelect.value;
}

document.addEventListener('dblclick', (e) => {
  const hexCode = e.target.textContent;
  navigator.clipboard.writeText(hexCode);
});

colorInput.addEventListener('input', colorChanged);
colorSelect.addEventListener('input', colorSchemeChanged);

// BUTTON
btnGetColorScheme.addEventListener('click', () => {
  colorScheme = [];

  getColorScheme(colorPicked, colorSelected);
});
