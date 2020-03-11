export function getBubbleSortAnimations(items) {
  const animations = [];
  if (items.length <= 1) return animations;
  bubble_Sort(items,animations);

  return animations;
  
} 

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function bubble_Sort(arr,animations){

    var len = arr.length,
        i, j, stop;

    for (i=0; i < len; i++){
        for (j=0; j < (len-i); j++){
            if (arr[j] > arr[j+1]){
                animations.push([j,j+1]);
                animations.push([j,j+1]);
                animations.push([j,j+1]);
                swap(arr, j, j+1);
            }
        }
        animations.push([-1,(len-i-1)]);
        animations.push([-1,(len-i-1)]);
        animations.push([-1,(len-i-1)]);
    }

}