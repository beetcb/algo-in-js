/**
 * @param {number[]} nums
 * @return {number}
 * @algo
 * for i in 0..len
 *   reset prevSum=0 if prevSum has no contribution to max sum
 *   record prevSum to currSum
 *   update maxSum if needed
 */
function maxSubArray(nums) {
  let maxPrevSum = 0;
  let maxSum = nums[0];
  for (const num of nums) {
    if (maxPrevSum < 0) {
      maxPrevSum = 0;
    }
    const currSum = maxPrevSum + num;
    maxSum = Math.max(maxSum, currSum);
    maxPrevSum = currSum;
  }

  return maxSum;
}
