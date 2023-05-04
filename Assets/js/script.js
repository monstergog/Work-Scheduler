var rootEl = $('#root');
var schedule = [];

$(function () {
  initSchedule();

  $('button').click(function() {
    var task = {
      time: $(this).parent().attr('id'),
      note: $(this).siblings('textarea').val()
    }

    binarySearchSort(task);

    console.log('After Sort: ', schedule)
    localStorage.setItem('schedule', JSON.stringify(schedule));
  })
  
  for (var i = 9; i <= 17; i++) {
    if (i < parseInt(dayjs().format('H'))) {
      rootEl.children('#hour-' + i).addClass('past');
    } else if (i === parseInt(dayjs().format('H'))) {
      rootEl.children('#hour-' + i).addClass('present');
    } else {
      rootEl.children('#hour-' + i).addClass('future');
    }
  }

  for (var i = 0; i < schedule.length; i++) {
    let time = schedule[i].time;
    let note = schedule[i].note;

    $('#' + time).children('textarea').val(note);
  }

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