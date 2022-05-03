/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * @algo
 * maintain a queue of curr window idxs, update the queue, move window, calc res
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const wdIdxs = [];
  const peek = (arr) => arr[arr.length - 1];
  const updateWdIdxs = (idx) => {
    while (nums[idx] >= nums[peek(wdIdxs)]) {
      wdIdxs.pop();
    }
    wdIdxs.push(idx);
  };
  const moveWd = (idx) => {
    if (wdIdxs[0] <= idx - k) {
      wdIdxs.shift();
    }
  };

  for (let idx = 0; idx < k; idx++) {
    updateWdIdxs(idx);
  }

  result.push(nums[wdIdxs[0]]);

  for (let idx = k; idx < nums.length; idx++) {
    updateWdIdxs(idx);
    moveWd(idx);
    result.push(nums[wdIdxs[0]]);
  }

  return result;
}
