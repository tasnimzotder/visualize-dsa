import { linearSearch } from './algorithms';

const main_array_dom = document.querySelector('.main-array') as HTMLDivElement;
const elm_div_dom = document.querySelectorAll('.elm-div');

const n_elem_dom = document.querySelector('#n-elem') as HTMLInputElement;
const src_elem_dom = document.querySelector('#src-elem') as HTMLInputElement;

// global variables
let n_of_elements: number = parseInt(n_elem_dom.value);
let src_elem_idx: number = parseInt(src_elem_dom.value);

// create array elements
const createArrayElements = () => {
  main_array_dom.innerHTML = '';

  for (let idx = 0; idx < n_of_elements; idx++) {
    let elm_div = document.createElement('div');
    elm_div.classList.add('elm-div');
    elm_div.innerHTML = `${idx}`;

    main_array_dom.appendChild(<any>elm_div);
  }
};

// chech for element click
if (elm_div_dom)
  elm_div_dom.forEach((elm_div) => {
    alert(elm_div);
    elm_div.addEventListener('click', (event) => {
      alert(event.target);
    });
  });

// document.querySelector('.elm-div')?.addEventListener('click', () => {
//   console.log('x');
// });

const updateFunc = () => {
  n_of_elements = parseInt(n_elem_dom.value);
  console.log(n_of_elements);
  console.log(src_elem_idx);

  createArrayElements();
};

// @ts-ignore
window.updateFunc = function () {
  updateFunc();
};

window.onload = () => {
  updateFunc();
};
