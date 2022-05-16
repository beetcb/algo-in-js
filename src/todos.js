/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const res = [];
  const nSum = (nums, res, temp, info) => {
    const { n, startIdx, target } = info;
    if (n > 2) {
      for (
        let idx = startIdx;
        idx <= nums.length - n;
        idx++
      ) {
        if (
          idx >= startIdx &&
          idx <= nums.length - 4 &&
          nums[idx] === nums[idx - 1]
        ) {
          continue;
        }

        const info = {
          n: n - 1,
          startIdx: idx + 1,
          target: target - nums[idx],
        };
        nSum(
          nums,
          res,
          temp.concat(nums[idx]),
          info
        );
      }
      return;
    }

    let [leftIdx, rightIdx] = [
      startIdx,
      nums.length - 1,
    ];
    while (leftIdx < rightIdx) {
      const sum = nums[leftIdx] + nums[rightIdx];
      if (sum > target) {
        rightIdx--;
        continue;
      }
      if (sum < target) {
        leftIdx++;
        continue;
      }

      res.push(
        temp.concat([
          nums[leftIdx],
          nums[rightIdx],
        ])
      );

      while (
        leftIdx < rightIdx &&
        nums[leftIdx] === nums[leftIdx + 1]
      ) {
        leftIdx++;
      }
      while (
        leftIdx < rightIdx &&
        nums[rightIdx] === nums[rightIdx - 1]
      ) {
        rightIdx--;
      }
      leftIdx++;
      rightIdx--;
    }
  };

  nSum(nums, res, [], {
    n: 4,
    startIdx: 0,
    target,
  });

  return res;
}

test('shall work', () => {
  expect(fourSum([-1, 0, -1, 2], 0)).toEqual([
    [-1, -1, 0, 2],
  ]);

  expect(
    fourSum([1, 0, -1, 0, -2, 2], 0)
  ).toEqual([
    [-2, -1, 1, 2],
    [-2, 0, 0, 2],
    [-1, 0, 0, 1],
  ]);

  expect(fourSum([2, 2, 2, 2, 2], 8)).toEqual([
    [2, 2, 2, 2],
  ]);

  // expect(
  //   fourSum([-2, -1, -1, 1, 1, 2, 2], 0)
  // ).toEqual([
  //   [-2, -1, 1, 2],
  //   [-1, -1, 1, 1],
  // ]);
});
