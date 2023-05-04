


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