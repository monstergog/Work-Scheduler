# Work-Scheduler

## Description

A simple calender app to help in organizing your work day schedule

## Installation

Once the repo has been downloaded, you can open the webpage by opening on the index.html file.

## Usage

Each time block is an hour apart and is color coded to represent if the correpsonding time block has passed (Grey), is current (Red), or still in the future (Green)
After entering your task into a time block text field, press button to the right to save your task to the schedule.

![Work-Scheduler-Screenshot](assets/images/screenshot.png)

## Credits

Binary Search Sort function based off of ChatGPT function:
```javascript
function insertIntoSortedArray(array, ...newElements) {
  const newElementsLength = newElements.length;
  let startIndex = 0;
  let endIndex = array.length - 1;
  let insertIndex = endIndex + 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);

    if (newElements[0] <= array[midIndex]) {
      insertIndex = midIndex;
      endIndex = midIndex - 1;
    } else {
      startIndex = midIndex + 1;
    }
  }

  array.splice(insertIndex, 0, ...newElements);

  return array;
}
```

## License

N/A

---