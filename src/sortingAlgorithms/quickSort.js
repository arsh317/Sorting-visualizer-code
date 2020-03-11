export function getQuickSortAnimations(items) {
  const animations = [];
  if (items.length <= 1) return animations;
  quickSort(items,0,items.length-1,animations);

  return animations;
  
} 

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right,animations) {
    var pivot = items[right], i = left, j = right;
    var ptr=left; 

    //animations.push([-1,right,2]);
    //animations.push([-1,right,2]);
    //animations.push([-1,right,2]);

    while (i <right) {
        if(items[i]<pivot)
        { 
            animations.push([i,ptr,0]);
            animations.push([i,ptr,0]);
            animations.push([i,ptr,0]);
            swap(items,i,ptr); ptr++; 

        }
        i++;
    }
    animations.push([ptr,right,1]);
    animations.push([ptr,right,1]);
    animations.push([ptr,right,1]);
    swap(items,ptr,right)
    return ptr;
}

function quickSort(items, left, right,animations) {

    if(left>right){ return; }
    var index = partition(items, left, right,animations);
    quickSort(items, left, index - 1,animations);
    quickSort(items, index+1, right,animations);   
}
