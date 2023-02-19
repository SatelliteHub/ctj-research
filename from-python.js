<script>
function lt(inputCompare, other) {
  const isGreaterThan = prompt(`Is ${other.value} greater than ${inputCompare.value}? (y/n)`).toLowerCase() === 'y';
  return isGreaterThan;
}

function sortInput() {
  const A = Array.from({length: 8}, (_, i) => i); // CREATE ARRAY
  A.sort(() => Math.random() - 0.5); // SHUFFLE THE ARRAY
  const B = []; // EMPTY ARRAY TO STORE SORTED NUMBERS

  for (let i = 0; i < A.length; i++) {
    const inputCompare = {value: A[i]};
    const index = findInsertionIndex(B, inputCompare);
    B.splice(index, 0, inputCompare);
  }

  const result = B.map((x) => x.value); // RESULT IS AN ARRAY TO STORE NEW ORDER
  document.getElementById("sorting-result").textContent = result; // DISPLAY THE RESULT ORDERED ARRAY TO THE USER
}

function findInsertionIndex(arr, item) {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (lt(item, arr[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}


</script>
