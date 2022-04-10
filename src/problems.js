import * as tests from './tests';

/**
 * Impl Array.prototype.flat()
 * @param {*} array
 */
function flatten(array) {
  if (
    array === undefined ||
    array === null ||
    array.length === 0
  ) {
    return array;
  }

  let res = [];
  for (const ele of array) {
    if (Array.prototype.isPrototypeOf(ele)) {
      res.push(...flatten(ele));
      continue;
    }
    res.push(ele);
  }
  return res;
}
// tests.assertObEq(flatten([1, 2, 3, [4, 5, [6, 7], 8]]), [
//   1,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7,
//   8
// ]);

/**
 * Binary Search
 */
function binarySearch0(array, target) {
  const len = array.length;
  if (len === 0) {
    return -1;
  }

  return search(array, 0, len - 1, target);

  function search(array, start, end, target) {
    if (start > end) {
      return -1;
    }

    const mid = Math.floor((start + end) / 2);
    const val = array[mid];

    if (target === val) {
      return mid;
    }
    if (target < val) {
      return search(array, start, mid, target);
    }
    return search(array, mid + 1, end, target);
  }
}

/**
 * Impl binarySearch using iteration
 */
function binarySearch(array, target) {
  const len = array.length;
  if (len === 0) {
    return -1;
  }

  let [start, end] = [0, len - 1];

  while (start + 1 < end) {
    const mid = start + (end - start) - 1;
    const cur = array[mid];

    if (cur === target) {
      return mid;
    } else if (cur < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  if (array[start] === target) {
    return start;
  }
  if (array[end] === target) {
    return end;
  }
}
// tests.assertPremitive(binarySearch([1, 2], 2), 1);
// tests.assertPremitive(binarySearch([1, 3], 3), 1);
// tests.assertPremitive(binarySearch([1, 3], 1), 0);
// tests.assertPremitive(binarySearch([1], 1), 0);
// tests.assertPremitive(binarySearch([], 3), -1);

/**
 * Fibonacii array
 * @state nth -> Nth fibonacii num, 1-based
 * @state fiboNum -> fibonacii num
 * @state lastNum -> last fibonacii num
 */
function findNthFibonacii(n) {
  if (n <= 2) {
    return n - 1;
  }

  let nth = 2;
  let fiboNum = 1;
  let lastNum = 1;
  while (true) {
    if (nth === n) {
      return fiboNum;
    }
    [lastNum, fiboNum] = [
      fiboNum,
      lastNum + fiboNum,
    ];
    nth++;
  }
}
// tests.assertPremitive(findNthFibonacii(2), 1);
// tests.assertPremitive(findNthFibonacii(3), 2);
// tests.assertPremitive(findNthFibonacii(4), 3);
// tests.assertPremitive(findNthFibonacii(5), 5);

/**
 * . . . . .
 *   m         check palindrome based on middle idx
 *     m
 *       m
 */
function longestPalindrome(s) {
  if (s.length <= 1) {
    return s;
  }
  if (s.length === 2) {
    return s[0] === s[1] ? s : s[0];
  }

  // a c a
  // l   r
  //l      r
  function extendBasedOnMid(
    s,
    leftIdx,
    rightIdx
  ) {
    while (leftIdx >= 0 && rightIdx < s.length) {
      const [leftVal, rightVal] = [
        s[leftIdx],
        s[rightIdx],
      ];
      if (leftVal !== rightVal) {
        break;
      }

      leftIdx--;
      rightIdx++;
    }

    return s.substring(leftIdx + 1, rightIdx);
  }

  let longestSub = '';
  let mid = 0;

  while (mid < s.length - 1) {
    let [leftIdx, rightIdx] = [mid, mid];

    const extendParlOdd = extendBasedOnMid(
      s,
      leftIdx,
      rightIdx
    );
    const extendParlEven = extendBasedOnMid(
      s,
      leftIdx,
      rightIdx + 1
    );

    const maxExtend =
      extendParlEven.length > extendParlOdd.length
        ? extendParlEven
        : extendParlOdd;

    if (maxExtend.length > longestSub.length) {
      longestSub = maxExtend;
    }

    mid++;
  }

  return longestSub;
}

/**
 * @param {number[]} temperatures
 * @return {number[]}
 *
 * 1 3 2 1
 * @state lowerIdxs = [0]
 * @state resNums = [0,0,0...t.len]
 * @state curTempIdx = 1, ++, < t.length
 * @algo
 *  t[curTempIdx] < t[lowerIdxs.last()]
 *    ? lowerIdxs.push(curTempIdx)
 *    : loop lowerIdxs {
 *        t[curTempIdx] > t[lowerIdxs.last()]
 *          ? loweridxs.pop()
 *          : resNums[lowerIdxs.last()] = cur - last
 *      } */
var dailyTemperatures = function (temperatures) {
  if (temperatures.length <= 1) {
    return [0];
  }

  let curTempIdx = 1;
  let lowerIdxs = [0];
  let resNums = Array(temperatures.length);
  for (let i = 0; i < temperatures.length; i++) {
    resNums[i] = 0;
  }

  while (curTempIdx < temperatures.length) {
    let topOfStack = lowerIdxs.slice(-1)[0];
    if (
      temperatures[curTempIdx] <
      temperatures[topOfStack]
    ) {
      lowerIdxs.push(curTempIdx);
      continue;
    }

    while (true) {
      if (lowerIdxs.length === 0) {
        break;
      }

      if (
        temperatures[curTempIdx] <=
        temperatures[topOfStack]
      ) {
        break;
      }

      resNums[topOfStack] =
        curTempIdx - topOfStack;
      lowerIdxs.pop();
      topOfStack = lowerIdxs.slice(-1)[0];
    }

    lowerIdxs.push(curTempIdx);
    curTempIdx++;
  }

  return resNums;
};

// tests.assertObEq(dailyTemperatures([89, 62, 70, 58, 47, 47, 46, 76, 100, 70]), [
//   8,
//   1,
//   5,
//   4,
//   3,
//   2,
//   1,
//   1,
//   0,
//   0
// ]);

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * @state leftFwdIdx = 0,++,<right
 * @state rightBwdIdx = len-1,>left
 */
var reverseString = function (s) {
  let [leftFwdIdx, rightBwdIdx] = [
    0,
    s.length - 1,
  ];
  while (leftFwdIdx < rightBwdIdx) {
    [s[leftFwdIdx], s[rightBwdIdx]] = [
      s[rightBwdIdx],
      s[leftFwdIdx],
    ];
    leftFwdIdx++;
    rightBwdIdx--;
  }

  return s;
};

// tests.assertObEq(reverseString(["h", "e", "l", "l", "o"]), [
//   "o",
//   "l",
//   "l",
//   "e",
//   "h"
// ]);

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * abc cba
 * @state readCharToCount {}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  if (s.length <= 1 && s === t) {
    return true;
  }

  const readCharToCount = {};
  for (const charFromS of s) {
    if (!readCharToCount[charFromS]) {
      readCharToCount[charFromS] = 1;
      continue;
    }

    readCharToCount[charFromS] += 1;
  }

  for (const charFromT of t) {
    if (!readCharToCount[charFromT]) {
      return false;
    }

    readCharToCount[charFromT] -= 1;
  }

  const isAnagram = !Object.values(
    readCharToCount
  ).filter((c) => c !== 0).length;

  return isAnagram;
};

// tests.assertObEq(isAnagram("anagram", "nagaram"), true);

/**
 * @param {ListNode} head
 * @return {ListNode}
 * @state currNumHead
 * 1 2 3
 * f(2,1) 2->1
 * f(3,2) 3->2->1
 * f(null,3) 3->2->1->null
 */
var reverseListRec = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const reverse = (currNumHead, prevNumHead) => {
    if (!currNumHead) {
      return prevNumHead;
    }

    const nextNumHead = currNumHead.next;

    currNumHead.next = prevNumHead;
    return reverse(nextNumHead, currNumHead);
  };

  return reverse(head, null);
};

/**
 * iB = isLeaf
 *    ? true
 *    : heightMatch && iB(l) && iB(r)
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (!root) {
    return true;
  }

  const isChildHeightMatch =
    Math.abs(
      getMaxHeight(root.left) -
        getMaxHeight(root.right)
    ) <= 1;
  return (
    isChildHeightMatch &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};

// h = isLeaf
//   ? 0
//   : max(h(l), h(r)) + 1
const getMaxHeight = (root) =>
  root
    ? Math.max(
        getMaxHeight(root.left),
        getMaxHeight(root.right)
      ) + 1
    : 0;

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 1
 * 2 3
 * @state pathss = [[1,2], [1,3]]
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  if (!root) {
    return root.val;
  }

  const pathss = [];
  findPathss(pathss, [], root);

  const nums = pathss.map((paths) => {
    let sum = 0;
    for (const path of paths) {
      sum = sum * 10 + path;
    }
    return sum;
  });

  return nums.reduce((acc, sum) => acc + sum, 0);
};

// f - root
//   ?
//     isLeaf
//        ? pathss.push(tempPaths + [root.val])
//        ：f([[]], [], root)
//   :
const findPathss = (pathss, tempPaths, root) => {
  if (!root) {
    return;
  }
  if (!root.left && !root.right) {
    pathss.push(tempPaths.concat(root.val));
    return;
  }

  tempPaths.push(root.val);
  findPathss(pathss, tempPaths, root.left);
  findPathss(pathss, tempPaths, root.right);
  tempPaths.pop();
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 1
 * 2 3
 * 1 2 -> 3
 * 1 3 -> 4
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  return isPathSumMatchTarget(0, root, targetSum);
};

// f -> root
//   ? isLeaf
//     ? checkMatch -> return true
//     : f(l) || f(r)
//   :
const isPathSumMatchTarget = (
  pathSum,
  root,
  target
) => {
  if (!root) {
    return false;
  }
  if (!root.left && !root.right) {
    if (pathSum + root.val === target) {
      return true;
    }
  }

  pathSum += root.val;

  return (
    isPathSumMatchTarget(
      pathSum,
      root.left,
      target
    ) ||
    isPathSumMatchTarget(
      pathSum,
      root.right,
      target
    )
  );
};

/**
 * Impl Promise.all()
 * @cornor
 *  - [] -> res([])
 *  - [1,2,3] -> res([1,2,3])
 * @param {*} iterable
 */
function all(iterable) {
  if (!iterable && !iterable[Symbol.iterator]) {
    throw new TypeError(
      `${typeof iterable} is not a iterable`
    );
  }

  const iter = iterable[Symbol.iterator]();
  const orderedResolvedValues = [];

  return new Promise((res, rej) => {
    let [stillPendingCount, currOrderedIdx] = [
      0, 0,
    ];
    let currIter = iter.next();

    if (currIter.done) {
      res([]);
    }

    while (true) {
      const currValue = currIter.value;
      const isIterOver = currIter.done;

      if (isIterOver) {
        break;
      }

      currIter = iter.next();
      stillPendingCount++;

      if (
        !Promise.prototype.isPrototypeOf(
          currValue
        )
      ) {
        orderedResolvedValues[currOrderedIdx++] =
          currValue;
        stillPendingCount--;
        continue;
      }

      currValue
        .then((val) => {
          orderedResolvedValues[
            currOrderedIdx++
          ] = val;
          stillPendingCount--;

          if (stillPendingCount === 0) {
            res(orderedResolvedValues);
          }
        })
        .catch((reason) => rej(reason));
    }
  });
}
// all([
//   new Promise((res) => setTimeout(res, 1, 1)),
//   Promise.resolve(2),
//   Promise.reject(1)
// ])
//   .then(console.log)
//   .catch(console.error)
// all([1, 2, 3, Promise.resolve(4)]).then(console.log);
// all([]).then(console.log);

/**
 * @param func
 * @param wait
 * @param options
 */
function debounce(
  func,
  wait,
  { leading, trailing } = {
    leading: false,
    trailing: true,
  }
) {
  let [timerId, setTimerId] = [
    null,
    (id) => (timerId = id),
  ];
  let [prevArgs, setPrevArgs] = [
    null,
    (...args) =>
      (prevArgs = args.length ? args : null),
  ];
  let [isTimeout, toggleIsTimeout] = [
    leading,
    () => (isTimeout = !isTimeout),
  ];

  const setTimer = () => {
    if (prevArgs && trailing) {
      func.apply(this, prevArgs);
    }

    toggleIsTimeout();
    setPrevArgs();
  };

  return (...args) => {
    if (leading && isTimeout) {
      func.apply(this, args);
      toggleIsTimeout();
    } else {
      setPrevArgs(args);
    }

    clearTimeout(timerId);
    setTimerId(setTimeout(setTimer, wait));
  };
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {Object} options
 */
function throttle(
  func,
  wait,
  { leading, trailing } = {
    leading: true,
    trailing: true,
  }
) {
  let [lastCallArgs, setPrevArgs] = [
    null,
    (args) => (lastCallArgs = args),
  ];

  let [timerId, setTimerId] = [
    null,
    (id) => (timerId = id),
  ];

  const setTimer = () => {
    if (lastCallArgs && trailing) {
      func.apply(this, lastCallArgs);
      setPrevArgs();
      setTimerId(setTimeout(setTimer, wait));
    } else {
      setTimerId();
    }
  };

  return function (...args) {
    if (!timerId) {
      if (leading) {
        func.apply(this, args);
      }
      setTimerId(setTimeout(setTimer, wait));
    } else {
      setPrevArgs(args);
    }
  };
}

// 2,6,8,5 -> 2>8 -> 3
// readDecreaseIdxToGap = {0:0,1:0,2:1,3:0,4:1}
// while (currIdx < len) fwdIncreaseGap = go right, find max Increase gap
// maxGap = max(maxGap, readDecreaseIdxToGap[currIdx] + fwdIncreaseGap)
function frogJumpLongestDistence(blocks) {
  if (blocks <= 2) {
    return 2;
  }

  let maxGap = 2;
  let readDecreaseIdxToGap = { 0: 0 };
  let currIdx = 0;
  while (currIdx < blocks.length) {
    readDecreaseIdxToGap[currIdx] =
      blocks[currIdx] <= blocks[currIdx - 1]
        ? readDecreaseIdxToGap[currIdx - 1] + 1
        : 0;

    let fwdIncreaseGap = 0;
    let fwdIncreaseIdx = currIdx + 1;
    while (fwdIncreaseIdx < blocks.length) {
      if (
        !(
          blocks[fwdIncreaseIdx] >=
          blocks[fwdIncreaseIdx - 1]
        )
      ) {
        break;
      }

      fwdIncreaseGap++;
      fwdIncreaseIdx++;
    }

    maxGap = Math.max(
      maxGap,
      readDecreaseIdxToGap[currIdx] +
        fwdIncreaseGap +
        1
    );

    currIdx++;
  }

  console.log(readDecreaseIdxToGap);
  return maxGap;
}

// tests.assertObEq(frogJumpLongestDistence([2, 6, 8, 5]), 3);
// tests.assertObEq(
//   frogJumpLongestDistence([1, 5, 5, 2, 6]),
//   4
// );

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  const returned = (...args) => {
    if (args.length >= fn.length)
      return fn(...args);
    return (...args2) =>
      returned(...args, ...args2);
  };

  return returned;
}

const curriedJoin = curry((a, b, c) => {
  return `${a}_${b}_${c}`;
});

// console.log(curriedJoin(1, 2, 3)); // '1_2_3'
// console.log(curriedJoin(1)(2, 3)); // '1_2_3'
// console.log(curriedJoin(1, 2)(3)); // '1_2_3'
// console.log(curriedJoin(1, 2, 3, 4)); // '1_2_3'
// console.log(curriedJoin(1)(2)(3)); // '1_2_3'

/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  if (arr === null || arr === undefined) {
    return null;
  }

  const flattedArr = [];

  for (const ele of arr) {
    if (Array.isArray(ele)) {
      if (!(depth < 1)) {
        flattedArr.push(...flat(ele, depth - 1));
        continue;
      }
    }

    flattedArr.push(ele);
  }

  return flattedArr;
}
// console.log(flat([1, 2, [3, 4, [2, 3]]], 3));

/**
 * Impl EventEmitter
 */
class EventEmitter {
  subscribe(eventName, callback) {
    let { eventToHandlers } = this;

    if (!eventToHandlers) {
      eventToHandlers = {};
    }

    if (!eventToHandlers[eventName]) {
      eventToHandlers[eventName] = [];
    }

    eventToHandlers[eventName].push(callback);

    this.eventToHandlers = eventToHandlers;

    return {
      release: () =>
        this.eventToHandlers[eventName].pop(),
    };
  }

  emit(eventName, ...args) {
    const { eventToHandlers } = this;
    if (!eventToHandlers) {
      return;
    }

    const handlers = eventToHandlers[eventName];
    for (const handler of handlers) {
      handler.apply(this, args);
    }
  }
}

/**
 * Impl NodeStore, a ployfill for Map
 * Store our [key] on node itself
 */
class NodeStore {
  set(node, value) {
    if (!this.storeKey) {
      this.storeKey = Symbol();
    }
    node[this.storeKey] = Symbol();
    this[node[this.storeKey]] = value;
  }

  get(node) {
    return this[node[this.storeKey]];
  }

  has(node) {
    return (
      this[node[this.storeKey]] !== undefined
    );
  }
}
// const node = document.querySelector("#app");
// const nodeStore = new NodeStore();
// nodeStore.set(node, "hello");
// console.assert(nodeStore.get(node) === "hello");
// nodeStore.set(node, "A");
// console.assert(nodeStore.get(node) === "A");

/**
 * Impl clearAllTimeout()
 */
function clearAllTimeout() {
  // The returned timeoutID is a positive integer value
  let timerId = setTimeout(null, 0);
  while (timerId > 0) {
    window.clearTimeout(timerId);
    timerId--;
  }
}

/**
 * Impl memorization, useful in DP problems
 * @param {*} func
 * @param {*} cacheKeyCalculator
 */
function memo(func, cacheKeyCalculator) {
  const readcacheKeyToRetruned = {};

  return function (...args) {
    const cacheKey = cacheKeyCalculator
      ? cacheKeyCalculator.apply(this, args)
      : args.join('-');

    const cacheReturned =
      readcacheKeyToRetruned[cacheKey];
    if (cacheReturned !== undefined) {
      return cacheReturned;
    }

    const returned = func.apply(this, args);
    readcacheKeyToRetruned[cacheKey] = returned;

    return returned;
  };
}
// const func = (arg1, arg2) => {
//   return arg1 + arg2;
// };
// const memoed = memo(func, () => "samekey");
// memoed(1, 2);
// 3, func is called, 3 is cached with key 'samekey'
// memoed(1, 2);
// 3, since key is the same, 3 is returned without calling func
// memoed(1, 3);
// 3, since key is the same, 3 is returned without calling func

/**
 * Calculate height of a DOM tree
 */
function getHeight(node) {
  if (!node) {
    return 0;
  }

  if (!node.children || !node.children.length) {
    return 1;
  }

  let maxHeight = Math.max();
  console.log([...node.children]);
  for (const child of [...node.children]) {
    const height = getHeight(child) + 1;
    maxHeight = Math.max(maxHeight, height);
  }

  return maxHeight;
}
// const div = document.createElement("div");
// div.innerHTML = `
// <div>
//   <p>
//     <button>Hello</button>
//   </p>
// </div>
// <p>
//   <span>World!</span>
// </p>`;
// console.log(getHeight(div));

/**
 * Excute fn with accumulate returnedValue
 * @param {*} fns
 */
function pipe(fns) {
  if (!Array.isArray(fns)) {
    return;
  }

  return (x) =>
    fns.reduce(
      (accReturnedValue, fn) =>
        fn(accReturnedValue),
      x
    );
}
// const times = (y) => (x) => x * y;
// const composition = pipe([times(2), times(3)]);
// console.log(composition(4));

/**
 * . . . . . .
 * . . . . . .
 * . . . . . .
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  if (
    message.length === 0 ||
    message[0].length === 0
  ) {
    return '';
  }

  // ++
  let xCoord = 0;
  // ++, --, ++, --, ++, --
  let yCoord = 0;
  const bottomY = message.length - 1;
  const rightX = message[0].length - 1;
  const downAction = () => yCoord++;
  const upAction = () => yCoord--;
  const xCoordAction = () => xCoord++;

  let nextAction = [xCoordAction, downAction];
  let resMessage = '';

  for (
    let count = 1;
    count <= message.length * 3;
    count++
  ) {
    if (xCoord > rightX) {
      break;
    }

    resMessage += message[yCoord][xCoord];
    if (yCoord === bottomY) {
      nextAction[1] = upAction;
      console.log('going up');
    }
    if (yCoord === 0) {
      nextAction[1] = downAction;
      console.log('going down');
    }

    nextAction[0]();
    nextAction[1]();
  }

  return resMessage;
}
const input = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D'],
];
// console.log(decode(input));

/**
 * Impl Array.prototype.map
 */
function map(mapper, passedThis) {
  const array = this;
  return array.reduce((acc, ele, idx) => {
    if (!array.hasOwnProperty(idx)) {
      return acc;
    }

    acc[idx] = mapper.call(
      passedThis,
      ele,
      idx,
      array
    );
    return acc;
  }, []);
}

/**
 * Valid Parentheses
 */
function isValid(str) {
  const rightParenthesesToLeft = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  let tailOutLeft = [];
  const peek = () =>
    tailOutLeft[tailOutLeft.length - 1];

  for (const char of str) {
    const leftParenthesis =
      rightParenthesesToLeft[char];

    if (!leftParenthesis) {
      tailOutLeft.push(char);
      continue;
    }

    const tail = peek();
    if (!(tail === leftParenthesis)) {
      return false;
    }

    tailOutLeft.pop();
  }

  return tailOutLeft.length === 0;
}
// console.log("]")

/**
 * A pure math problem about `digit root`
 */
function addDigits(num) {
  if (num < 10) {
    return num;
  }
  return 1 + ((num - 1) % (10 - 1));
}

/**
 * Add big number represented by string
 */
function addStrings(str1, str2) {
  let [charBwdIdx1, charBwdIdx2] = [
    str1.length - 1,
    str2.length - 1,
  ];

  let carry = 0;
  let resStr = '';
  while (charBwdIdx1 >= 0 || charBwdIdx2 >= 0) {
    const sum =
      carry +
      Number(str1[charBwdIdx1] ?? 0) +
      Number(str2[charBwdIdx2] ?? 0);

    resStr = (sum % 10).toString() + resStr;
    carry = sum > 9 ? 1 : 0;

    charBwdIdx2--;
    charBwdIdx1--;
  }
  if (carry) {
    return '1' + resStr;
  }

  return resStr;
}

/**
 * Reverse string (k)
 * 01xx45,2
 * 10xx54
 */
function reverseStr(string, gap) {
  if (gap <= 1) {
    return string;
  }

  let currStartIdx = 0;
  let resString = [...string];

  while (currStartIdx < string.length) {
    reverseK(
      resString,
      currStartIdx,
      currStartIdx + gap - 1
    );
    currStartIdx += 2 * gap;
  }

  function reverseK(str, start, end) {
    if (end >= str.length) {
      end = str.length - 1;
    }

    let [leftFwdIdx, rightBwdIdx] = [start, end];
    while (leftFwdIdx < rightBwdIdx) {
      [str[leftFwdIdx], str[rightBwdIdx]] = [
        str[rightBwdIdx],
        str[leftFwdIdx],
      ];
      leftFwdIdx++;
      rightBwdIdx--;
    }
  }

  return resString.join('');
}
// tests.assertPremitiveEq(
//   reverseStr('abcdefg', 8),
//   'gfedcba'
// );
