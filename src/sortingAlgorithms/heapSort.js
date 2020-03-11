export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  heapSort(array,animations);

  return animations;
  
} 

function heapSort(array,animations) {

  var swap = function(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  };

function Heapify(array, i,animations) {
    var l = 2 * i;
    var r = l + 1;
    var largest=i;
    if (l < array.heapSize && array[l] > array[largest]) {
      largest = l;
    } 
    if (r < array.heapSize && array[r] > array[largest]) {
      largest = r;
    }
    if (largest != i) {
      animations.push([i,largest]);
      animations.push([i,largest]);
      animations.push([i,largest]);

      swap(array, i, largest);
      Heapify(array, largest,animations);
    }
  };

  function buildHeap(array,animations) {
    array.heapSize = array.length;
    for (var i = Math.floor(array.length / 2); i >= 0; i--) {
      Heapify(array, i,animations);
    }
  };

  buildHeap(array,animations);

  for (var i = array.length-1; i >= 1; i--) {

    animations.push([-1,i]);
    animations.push([-1,i]);
    animations.push([-1,i]);
    swap(array, 0, i);
    array.heapSize--;
    Heapify(array, 0,animations);

  }
};
 