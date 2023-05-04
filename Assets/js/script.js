var rootEl = $('#root');
var resultEl = $('#result');
var schedule = [];

$(function () {
  initSchedule();

  // Event listener for saving schedule to local storage
  $('button').click(function() {
    var task = {
      time: $(this).parent().attr('id'),
      note: $(this).siblings('textarea').val()
    }

    var timeBlock = $('#' + task.time).children('div').text();

    if (confirm('Are you sure you would like to save?')) {
      binarySearchSort(task);

      localStorage.setItem('schedule', JSON.stringify(schedule));
      resultEl.text(`✔️:\n\nNew Task Saved to ${timeBlock} Block`);
      resultEl.attr('style', 'visibility: visible');
    } else {
      resultEl.text(`❌:\n\nCanceled Save to ${timeBlock} Block`);
      resultEl.attr('style', 'visibility: visible');
    }
  })
  
  // Color codes each time block depending on past, present, or future
  for (var i = 9; i <= 17; i++) {
    if (i < parseInt(dayjs().format('H'))) {
      rootEl.children('#hour-' + i).addClass('past');
    } else if (i === parseInt(dayjs().format('H'))) {
      rootEl.children('#hour-' + i).addClass('present');
    } else {
      rootEl.children('#hour-' + i).addClass('future');
    }
  }

  // Renders all scheduled tasks to the screen 
  for (var i = 0; i < schedule.length; i++) {
    let time = schedule[i].time;
    let note = schedule[i].note;

    $('#' + time).children('textarea').val(note);
  }

  // Renders current date above the schedule
  $('#currentDay').text(dayjs().format('[Today is: ]dddd, MMMM D[th]'));
});

// Binary search and sort algorithm function to sort and add newly scheduled tasks
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
}