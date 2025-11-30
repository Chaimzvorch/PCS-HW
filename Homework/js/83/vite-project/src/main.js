import './style.css';
import { greet, meaningOfLife } from './utils.js';

console.log(greet("Student"));
console.log("Meaning of life:", meaningOfLife);

import dayjs from 'dayjs';

const now = dayjs();
console.log(now.format('dddd, MMMM D, YYYY h:mm:ss A'));

const p = document.createElement("p");
p.textContent = now.format('dddd, MMMM D, YYYY h:mm:ss A');
document.body.appendChild(p);

