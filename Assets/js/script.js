// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $('#currentDay').text(dayjs().format('[Today is: ]dddd, MMMM D[th]'));
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  var schedule = [];
  
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('button').click(function() {
    var task = {
      time: $(this).parent().attr('id').slice(5),
      note: $(this).siblings('textarea').val()
    }
    if (schedule == ''  ) {
      schedule.push(task);
      console.log(schedule);
      console.log('Middle: ' + Math.floor(schedule.length / 2));
    } else if (schedule[Math.floor(schedule.length / 2)].time === task.time) {
      console.log('Middle: ' + Math.floor(schedule.length / 2));
      schedule[Math.floor(schedule.length / 2)] = task;
      console.log('replaced', schedule);
    } else if (schedule[Math.floor(schedule.length / 2)].time < task.time) {
      console.log('Middle: ' + Math.floor(schedule.length / 2));
      schedule.splice(schedule[Math.floor(schedule.length / 2)], 0, task);
      console.log('added before', schedule);
    } else {
      console.log('Middle: ' + Math.floor(schedule.length / 2));
      schedule.splice(schedule[Math.floor(schedule.length / 2 + 1)], 0, task);
      console.log('added after', schedule);
    }
    
    // localStorage.setItem('schedule', schedule);
  })
  

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

  // TODO: Add code to display the current date in the header of the page.
  
});
