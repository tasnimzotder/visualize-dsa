import './tower-of-hanoi-hanoi.scss';

const towers = document.querySelectorAll('.tower');
const auto_solve_btn = document.querySelector('#auto-btn');
const msg_display = document.querySelector('.msg-display');

const total_steps = document.querySelector('#total-steps');
const steps_counter = document.querySelector('#steps-counter');

const inp_size = document.querySelector('#inp-size') as HTMLInputElement;
const speed = document.querySelector('#speed') as HTMLInputElement;

const reset_btn = document.querySelector('#reset') as HTMLButtonElement;

// global variables / constants

const plate_width_max = 130;
const plate_width_min = 50;

let trans_speed: number = 100; // transition speed in ms
let no_of_plates: number = 3;
let curr_steps: number = 0;

let plates: Array<any> = [];
let curr_selects: any = {
  plate: null,
  tower: null,
};

const towers_id = ['tower-0', 'tower-1', 'tower-2'];

let plate_colors: Array<string> = [
  '79C99E',
  'CB5D4E',
  'FA7E61',
  '5DA271',
  'AB81CD',
  'B5A886',
  '73967D',
  '689C77',
  '4C1E4F',
  'C84630',
  '8093F1',
  'B08EA2',
];

// creates plates
const createPlates = () => {
  // remove all possible plates
  plates.length = 0;
  towers.forEach((tower) => {
    if (tower) tower.innerHTML = '';
  });

  for (let idx = no_of_plates - 1; idx >= 0; idx--) {
    let temp_plate = document.createElement('div');
    temp_plate.classList.add('plate');
    temp_plate.setAttribute('id', `plate-${idx}`);
    temp_plate.style.backgroundColor = `#${plate_colors[no_of_plates - idx]}`;

    let width =
      plate_width_min +
      ((plate_width_max - plate_width_min) / (no_of_plates - 1)) * idx;
    temp_plate.style.width = `${width}px`;

    let idx_text_node = document.createTextNode(`#${idx + 1}`);

    temp_plate.appendChild(idx_text_node);

    plates.push(temp_plate);
  }

  // display the plates on DOM
  plates.forEach((plate) => {
    towers[0].appendChild(plate);
  });
};

createPlates();

const handleMessage = (from_tower: string, to_tower: string) => {
  from_tower = (parseInt(from_tower) + 1).toString();
  to_tower = (parseInt(to_tower) + 1).toString();

  let msg_str = `<p>Moving plate from <span>Tower ${from_tower}</span> 
  to <span>Tower ${to_tower}</span></p>`;

  if (msg_display) msg_display.innerHTML = msg_str;
};

const handlePasteLogic = (tower_elm: HTMLElement) => {
  let selected_plate = document.getElementById(curr_selects.plate);
  let last_child = tower_elm.lastChild;

  // convert width string values to integer
  // @ts-ignore
  let last_child_width = last_child?.style.width;
  // @ts-ignore
  last_child_width = parseInt(last_child_width?.slice(0, -2), 10);
  let selected_plate_width = parseInt(
    // @ts-ignore
    selected_plate?.style.width.slice(0, -2),
    10
  );

  if (last_child) {
    // @ts-ignore
    if (last_child_width > selected_plate_width) {
      return true;
    }
  } else {
    return true;
  }

  return false;
};

// handles plate movement
const handlePlateMove = (plate: any, to_tower: string) => {
  let tower_elm = document.getElementById(to_tower) as HTMLElement;
  tower_elm.appendChild(<Node | any>plate);

  curr_steps += 1;

  if (curr_steps.toString().length < solutions.length.toString().length) {
    if (steps_counter) steps_counter.innerHTML = '0' + curr_steps.toString();
  } else {
    if (steps_counter) steps_counter.innerHTML = curr_steps.toString();
  }
};

// handle plate movement w/ towers
const handlePlateMoveWithTowers = (from_tower: string, to_tower: string) => {
  let from_tower_elm = document.getElementById(from_tower);

  let total_child = from_tower_elm?.childElementCount;

  if (
    total_child
    // && handlePasteLogic(<HTMLElement>document.getElementById(to_tower))
  ) {
    let top_plate = from_tower_elm?.lastChild;

    handlePlateMove(top_plate, to_tower);
    handleMessage(from_tower.substr(-1), to_tower.substr(-1));
  }
};

(function () {
  //@ts-ignore
  window.handlePlateMoveWithTowers = handlePlateMoveWithTowers;
})();

// handles the click event on plate(s)
plates.forEach((plate) => {
  plate.addEventListener('click', (event: any) => {
    console.log(`selected plate: ${event.target?.id}`);
    // check if the plate is the top most
    if (plate.parentElement.lastElementChild === plate) {
      if (curr_selects.plate == null) {
        curr_selects.plate = event.target?.id;
        curr_selects.tower = event.target?.parentNode.id;

        // add 'selected' class to the plate
        document.getElementById(curr_selects.plate)?.classList.add('selected');
      } else {
        // remove 'selected' class from the plate
        document
          .getElementById(curr_selects.plate)
          ?.classList.remove('selected');
        curr_selects.plate = null;
      }
    }
  });
});

// handles the click event on tower(s)
towers.forEach((tower) => {
  tower.addEventListener('click', (event: any) => {
    let tower_elm = event.target;
    let tower_id = tower_elm?.id;

    // check if the selected elem is a plate
    if (tower_elm?.className.split(' ')[0] === 'plate') {
      tower_id = tower_elm?.parentNode.id;
    }

    if (curr_selects.tower !== tower_id && curr_selects.plate !== null) {
      if (handlePasteLogic(<HTMLElement>document.getElementById(tower_id))) {
        let plate_eml = document.getElementById(curr_selects.plate);

        // tower.appendChild(<Node | any>plate_eml);
        handlePlateMove(plate_eml, tower_id);

        document
          .getElementById(curr_selects.plate)
          ?.classList.remove('selected');
        curr_selects.plate = null;
        curr_selects.tower = null;
      }
    }
  });
});

let solutions: Array<any> = [];

// algorithm for the solution
const solveTheGame = (n: number, from: string, aux: string, to: string) => {
  if (n == 1) {
    solutions.push([from, to]);
    return;
  } else {
    solveTheGame(n - 1, from, to, aux);

    solutions.push([from, to]);

    solveTheGame(n - 1, aux, from, to);
  }
};

let updatePlatesTimeOutFunc: any;

const updatePlatesTimeOut = (step: Array<any>, i: number) => {
  updatePlatesTimeOutFunc = setTimeout(() => {
    // updatePlatesTimeOutFunc(step, i);
    handlePlateMoveWithTowers(step[0], step[1]);

    if (i === solutions.length - 1) {
      setTimeout(() => {
        if (msg_display) msg_display.innerHTML = '';
      }, 1666);
    }
  }, (i + 1) * trans_speed);
};

const updatePlates = () => {
  solutions.forEach((step, i) => {
    updatePlatesTimeOut(step, i);
  });
};

auto_solve_btn?.addEventListener('click', () => {
  updateGame();
  updatePlates();
});

function updateGame() {
  // update inp size
  let inp_size_val = inp_size.value;
  no_of_plates = parseInt(inp_size_val);
  let inp_size_val_elm = document.getElementById('inp-size-val');
  if (inp_size_val_elm) inp_size_val_elm.innerHTML = inp_size_val.toString();

  // update speed
  let speed_val = speed.value;
  trans_speed = parseInt(speed_val);
  let speed_val_elm = document.querySelector('#speed-val');
  if (speed_val_elm) speed_val_elm.innerHTML = speed_val;

  createPlates();

  solutions = [];
  solveTheGame(no_of_plates, towers_id[0], towers_id[1], towers_id[2]);

  // update total steps
  if (total_steps)
    total_steps.innerHTML = solutions.length as unknown as string;
}

if (inp_size)
  inp_size.addEventListener('change', () => {
    updateGame();
  });

if (speed)
  speed.addEventListener('change', () => {
    updateGame();
  });

const reset = () => {
  inp_size.value = '3';
  speed.value = '1000';

  trans_speed = 100;
  no_of_plates = 3;

  curr_steps = 0;
  if (curr_steps.toString().length < solutions.length.toString().length) {
    if (steps_counter) steps_counter.innerHTML = '0' + curr_steps.toString();
  } else {
    if (steps_counter) steps_counter.innerHTML = curr_steps.toString();
  }

  updateGame();

  clearTimeout(updatePlatesTimeOutFunc);
};

reset_btn.addEventListener('click', () => {
  reset();
});

// window.onload = () => {
//   updateGame();
// };
