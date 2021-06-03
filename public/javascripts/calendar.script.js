const $btnPreviousWeek = document.querySelector('.btn-previous-week');
const $btnNextWeek =document.querySelector('.btn-previous-week');
const $p = document.querySelectorAll('.current-week');

console.log('previous week', $btnPreviousWeek);
console.log('next week', $btnNextWeek);

$btnNextWeek.addEventListener('click', (e) => {
  console.log('next week')
}, false);

$btnPreviousWeek.addEventListener('click', (e) => {
  console.log('previous weekti')
}, false);
