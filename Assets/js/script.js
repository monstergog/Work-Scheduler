var schedule = [];

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  initSchedule();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('button').click(function() {
    var task = {
      time: $(this).parent().attr('id'),
      note: $(this).siblings('textarea').val()
    }

    binarySearchSort(task);

    console.log('After Sort: ', schedule)
    localStorage.setItem('schedule', JSON.stringify(schedule));
  })
  

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 0; i < schedule.length; i++) {
    let time = schedule[i].time;
    let note = schedule[i].note;

    $('#' + time).children('textarea').val(note);
  }

  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('[Today is: ]dddd, MMMM D[th]'));
});

// Binary search and sort algorithm
function binarySearchSort(newTask) {
  let startIndex = 0;
  let endIndex = schedule.length - 1;
  let insertIndex = endIndex + 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);

    if (parseInt(newTask.time.slice(5)) <= parseInt(schedule[midIndex].time.slice(5))) {
      insertIndex = midIndex;
      endIndex = midIndex - 1;
    } else {
      startIndex = midIndex + 1;
    }
  }
  if (schedule.length != insertIndex && schedule[insertIndex].time === newTask.time) {
    schedule.splice(insertIndex, 1, newTask);
  } else {
    schedule.splice(insertIndex, 0, newTask);
  }
}

// Initialize schedule from local storage
function initSchedule() {
  var storedSchedule = JSON.parse(localStorage.getItem('schedule'));

  if (storedSchedule != null) {
    schedule = storedSchedule;
  }
  console.log('Initial Schedule: ', schedule);
}