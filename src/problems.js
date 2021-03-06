/**
 *
 * @param {Array<number>} arr
 * @param {number} target
 * @return {number}
 */
function binarySearchRec(arr, target) {
  let [leftIdx, rightIdx] = [0, arr.length - 1];

  while (leftIdx <= rightIdx) {
    const midIdx =
      leftIdx + (rightIdx - leftIdx) / 2;
    if (arr[midIdx] === target) {
      return midIdx;
    }
    if (arr[midIdx] > target) {
      rightIdx = midIdx - 1;
    } else {
      leftIdx = midIdx + 1;
    }
  }

  return -1;
}
test('shall works', () => {
  expect(binarySearchRec([1, 2, 3], 3)).toBe(2);
  expect(binarySearchRec([1, 2, 3], 9)).toBe(-1);
});

/**
 *
 * @param {Array<number>} arr
 * @param {number} target
 * @return {number}
 */
function binarySearchRec(arr, target) {
  let [leftIdx, rightIdx] = [0, arr.length - 1];

  const searchRec = (
    arr,
    target,
    leftIdx,
    rightIdx
  ) => {
    if (leftIdx > rightIdx) {
      return -1;
    }
    const midIdx =
      leftIdx + (rightIdx - leftIdx) / 2;
    if (arr[midIdx] === target) {
      return midIdx;
    }

    if (arr[leftIdx] > target) {
      return searchRec(
        arr,
        target,
        leftIdx,
        midIdx - 1
      );
    } else {
      return searchRec(
        arr,
        target,
        midIdx + 1,
        rightIdx
      );
    }
  };

  return searchRec(
    arr,
    target,
    leftIdx,
    rightIdx
  );
}
test('shall works', () => {
  expect(binarySearchRec([1, 2, 3], 3)).toBe(2);
  expect(binarySearchRec([1, 2, 3], 9)).toBe(-1);
});

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
// --------------test--------------
tests.assertObEq(
  reverseString(['h', 'e', 'l', 'l', 'o']),
  ['o', 'l', 'l', 'e', 'h']
);

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
// --------------test--------------
tests.assertEq(
  isAnagram('anagram', 'nagaram'),
  true
);

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
//        ???f([[]], [], root)
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
// --------------test--------------
all([
  new Promise((res) => setTimeout(res, 1, 1)),
  Promise.resolve(2),
  Promise.reject(1),
])
  .then(console.log)
  .catch(console.error);
all([1, 2, 3, Promise.resolve(4)]).then(
  console.log
);
all([]).then(console.log);

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
    ,
    (id) => (timerId = id),
  ];
  let [prevArgs, setPrevArgs] = [
    ,
    (args) => (prevArgs = args),
  ];

  const setTimer = () => {
    if (prevArgs && trailing) {
      func.apply(this, prevArgs);
    }

    setTimerId();
    setPrevArgs();
  };

  return (...args) => {
    if (leading && !timerId) {
      func.apply(this, args);
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
  let [prevArgs, setPrevArgs] = [
    ,
    (args) => (prevArgs = args),
  ];

  let [timerId, setTimerId] = [
    ,
    (id) => (timerId = id),
  ];

  const setTimer = () => {
    if (prevArgs && trailing) {
      func.apply(this, prevArgs);
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
}
// --------------test--------------
tests.assertEq(
  frogJumpLongestDistence([2, 6, 8, 5]),
  3
);
tests.assertEq(
  frogJumpLongestDistence([1, 5, 5, 2, 6]),
  4
);

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
// --------------test--------------
const node = document.querySelector('#app');
const nodeStore = new NodeStore();
nodeStore.set(node, 'hello');
tests.assertEq(nodeStore.get(node), 'hello');
nodeStore.set(node, 'A');
tests.assertEq(nodeStore.get(node), 'A');

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
// --------------test--------------
const func = (arg1, arg2) => {
  return arg1 + arg2;
};
const memoed = memo(func, () => 'samekey');
tests.assertEq(memoed(1, 2), 3);
tests.assertEq(memoed(1, 2), 3);
tests.assertEq(memoed(1, 3), 3);

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
// --------------test--------------
const div = document.createElement('div');
div.innerHTML = `
<div>
  <p>
    <button>Hello</button>
  </p>
</div>
<p>
  <span>World!</span>
</p>`;
tests.assertEq(getHeight(div), 3);

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
// --------------test--------------
tests.assertEq(
  reverseStr('abcdefg', 8),
  'gfedcba'
);

/**
 * Longest Palindrome
 * dcc($odd)ccd
 * a:1 x 
   b:1 x
   c:4
   d:2
   e:3 
 * @perf use set will be faster 
*/
function longestPalindrome(string) {
  if (string.length === 1) {
    return 1;
  }

  // b:2 -> 2
  // a:1
  // b:1 -> 0
  if (string.length === 2) {
    if (string[0] === string[1]) {
      return 2;
    }
    return 1;
  }

  const readCharToCount = {};
  for (const char of string) {
    if (!readCharToCount[char]) {
      readCharToCount[char] = 1;
      continue;
    }

    readCharToCount[char]++;
  }

  let oddCount = 0;
  let resCount = 0;
  let hasSingleChar = false;

  for (const count of Object.values(
    readCharToCount
  )) {
    if (count % 2 === 1) {
      hasSingleChar = true;
      oddCount += count - 1;
      continue;
    }

    resCount += count;
  }

  return (
    resCount + oddCount + (hasSingleChar ? 1 : 0)
  );
}
// --------------test--------------
tests.assertEq(longestPalindrome('aaaccb'), 5);
tests.assertEq(longestPalindrome('aaacccb'), 5);
tests.assertEq(longestPalindrome('abccccdd'), 7);
tests.assertEq(longestPalindrome('a'), 1);
tests.assertEq(longestPalindrome('ab'), 1);
tests.assertEq(longestPalindrome('aa'), 2);
tests.assertEq(longestPalindrome('bananas'), 5);

/**
 * Network request: timeout -> cancel request
 * @returns
 */
async function fetchTimeout(
  url,
  timeout,
  { signal, ...options } = {}
) {
  if (!timeout) {
    throw new TypeError(
      'timeout must be specified'
    );
  }
  console.info(
    'Fetching with timeout ' + timeout
  );

  const controller = new AbortController();
  const promise = fetch(url, {
    signal: controller.signal,
    ...options,
  });
  const timeoutId = setTimeout(
    () => controller.abort(),
    timeout
  );

  if (signal) {
    signal.addEventListener('abort', () =>
      controller.abort()
    );
  }

  return promise.finally(() =>
    clearTimeout(timeoutId)
  );
}
// --------------test--------------
const recordFetchTimeLabel =
  'Fetching time consumed';
console.time(recordFetchTimeLabel);
fetchTimeout('http://vm.local:3001/hello', 10000)
  .then(console.log)
  .catch(console.error)
  .finally(() =>
    console.timeEnd(recordFetchTimeLabel)
  );

async function fetchRetry(
  url,
  retryLimit,
  { ...options } = {}
) {
  if (!Number.isInteger(retryLimit)) {
    throw new TypeError(
      'retryLimit must be a integer'
    );
  }

  const promise = fetch(url, options);

  return promise.catch((err) => {
    if (retryLimit > 0) {
      const leftRetryLimit = retryLimit - 1;
      console.info(
        'Fetch failed, retrying, left retry times = ' +
          retryLimit
      );
      return fetchRetry(
        url,
        leftRetryLimit,
        options
      );
    }

    console.info(
      'Fetch failed, reatch retrying limit, aborting request'
    );
    return err;
  });
}

fetchRetry('http://vm.local:3001/hello', 5)
  .then(console.log)
  .catch(console.err);

/**
 * Impl an vdom virtualizer and render
 */
class VirtualDOMHelper {
  constructor(hNode) {}

  /**
   * f(root) => newVNode;for r of root {newVNode.push(f(r))};retrun newVNode
   */
  virtualize(hNode) {
    const nodeIter = (root) => {
      const vRoot = {
        type: root.tagName.toLowerCase(),
        props: {},
      };

      if (root.hasAttributes()) {
        for (const {
          name,
          value,
        } of root.attributes) {
          vRoot.props[
            name === 'class' ? 'className' : name
          ] = value;
        }
      }

      // set children text
      if (root.children.length === 0) {
        vRoot.props.children = root.textContent;
        return vRoot;
      }

      vRoot.props.children = [];
      for (const child of root.childNodes) {
        if (child.nodeType === 3) {
          vRoot.props.children.push(
            child.textContent
          );
          continue;
        }

        vRoot.props.children.push(
          nodeIter(child)
        );
      }

      return vRoot;
    };

    return nodeIter(hNode, {});
  }

  /**
   * @typedef {{type: string, props: {children: any[], className: string}} VNode
   */
  /**
   * @param } valid object literal presentation
   * @return {HTMLElement}
   */
  render(obj) {
    /**
     * @param {VNode} vNode
     */
    const vNodeIter = (vNode) => {
      const { type, props } = vNode;
      const hNode = document.createElement(type);

      for (const [name, value] of Object.entries(
        props
      )) {
        if (name === 'children') {
          // will be handled separately
          continue;
        }

        hNode.setAttribute(
          name === 'className' ? 'class' : name,
          value
        );
      }

      if (!Array.isArray(props.children)) {
        hNode.textContent = props.children;
        return hNode;
      }

      for (const child of props.children) {
        if (typeof child === 'string') {
          hNode.append(
            document.createTextNode(child)
          );
          continue;
        }

        hNode.appendChild(vNodeIter(child));
      }

      return hNode;
    };

    return vNodeIter(obj);
  }
}

const vdomHelper = new VirtualDOMHelper();
const testNode = document.createElement('div');
testNode.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`;
console.log(vdomHelper.virtualize(testNode));
document
  .querySelector('#app')
  .append(
    vdomHelper.render(
      vdomHelper.virtualize(testNode)
    )
  );

/**
 * Permutations
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const permuteRec = (
    permutations,
    tempNumToExis,
    depth
  ) => {
    if (depth === nums.length) {
      permutations.push(
        Array.from(tempNumToExis)
      );
    }

    for (const num of nums) {
      if (tempNumToExis.has(num)) {
        continue;
      }
      tempNumToExis.add(num);
      permuteRec(
        permutations,
        tempNumToExis,
        depth + 1
      );
      tempNumToExis.delete(num);
    }

    return permutations;
  };

  return permuteRec([], new Set(), 0);
}

/**
 * Find longestDupSubstring, dp memo, purely learning impl without rolling hash
 * @algo
 * idx2 > idx1
 * f(idx1, idx2) =>
 *  s[idx1] === s[idx2]
 *  ? f(idx1-1, idx2-1) + s[idx1];
 *  : f(idx1-1, idx2); f(idx1-1, idx2-1);
 * @param {string} s
 * @return {string}
 */
function longestDupSubstringBad(s) {
  let [maxSubStr, setMaxSubStr] = [
    '',
    (str) => (maxSubStr = str),
  ];

  const longestSubStringRec = (
    memo,
    idx1,
    idx2
  ) => {
    if (idx1 < 0) {
      return;
    }
    if (idx1 === 0) {
      if (s[idx1] === s[idx2]) {
        if (maxSubStr.length < 1) {
          setMaxSubStr(s[idx1]);
        }
        memo[idx1][idx2] = s[idx1];
        return memo[idx1][idx2];
      }
      memo[idx1][idx2] = '';
      return memo[idx1][idx2];
    }

    const [val1, val2] = [s[idx1], s[idx2]];

    if (memo[idx1][idx2] !== null) {
      return memo[idx1][idx2];
    }

    if (val1 === val2) {
      const prevLongestSubStr =
        longestSubStringRec(
          memo,
          idx1 - 1,
          idx2 - 1,
          maxSubStr
        ) + val1;
      memo[idx1][idx2] = prevLongestSubStr;
      setMaxSubStr(
        prevLongestSubStr.length >
          maxSubStr.length
          ? prevLongestSubStr
          : maxSubStr
      );
      return memo[idx1][idx2];
    }

    longestSubStringRec(memo, idx1 - 1, idx2);

    longestSubStringRec(memo, idx1 - 1, idx2 - 1);

    memo[idx1][idx2] = '';
    return memo[idx1][idx2];
  };

  const memo = Array(s.length)
    .fill()
    .map(() => Array(s.length).fill(null));

  longestSubStringRec(
    memo,
    s.length - 2,
    s.length - 1
  );

  return maxSubStr;
}
tests.assertEq(
  longestDupSubstringBad(
    'nnpxouomcofdjuujloanjimymadkuepightrfodmauhrsy'
  ),
  'ma'
);
tests.assertEq(
  longestDupSubstringBad('baba'),
  'ba'
);

/**
 * Find longestDupSubstring, dp tabu, purely learning impl without rolling hash
 * @algo
 * idx2 > idx1
 * f(idx1, idx2) =>
 *  s[idx1] === s[idx2]
 *  ? s[idx1-1, idx2-1] + s[idx1];
 * @param {string} s
 * @return {string}
 */
function longestDupSubstring(s) {
  let [maxSubStr, setMaxSubStr] = [
    '',
    (str) => (maxSubStr = str),
  ];

  const longestSubStringRec = (tabu) => {
    if (s.length <= 1) {
      return '';
    }

    for (
      let idx1 = 0;
      idx1 < s.length - 1;
      idx1++
    ) {
      for (
        let idx2 = idx1 + 1;
        idx2 < s.length;
        idx2++
      ) {
        tabu[idx1][idx2] =
          s[idx1] === s[idx2]
            ? idx1 !== 0
              ? tabu[idx1 - 1][idx2 - 1] + s[idx1]
              : s[idx1]
            : '';

        const currSubStr = tabu[idx1][idx2];

        if (
          currSubStr.length > maxSubStr.length
        ) {
          setMaxSubStr(currSubStr);
        }
      }
    }
  };

  const tabu = Array(s.length)
    .fill()
    .map(() => Array(s.length).fill(''));
  longestSubStringRec(tabu);

  return maxSubStr;
}
tests.assertEq(
  longestDupSubstring(
    'nnpxouomcofdjuujloanjimymadkuepightrfodmauhrsy'
  ),
  'ma'
);
tests.assertEq(longestDupSubstring('baba'), 'ba');

/**
 * @param {any[]} arr
 */
function shuffle(arr) {
  // Fisher-Yates
  arr.forEach((_, idx) => {
    const randIdx = Math.floor(
      Math.random() * (idx + 1)
    );

    [arr[randIdx], arr[idx]] = [
      arr[idx],
      arr[randIdx],
    ];
  });

  return arr;
}
console.log(shuffle([1, 2, 3, 4]));
console.log(shuffle([1, 2, 3, 4]));
console.log(shuffle([1, 2, 3, 4]));
console.log(shuffle([1, 2, 3, 4]));
console.log(shuffle([1, 2, 3, 4]));
console.log(shuffle([1, 2, 3, 4]));

/**
 * @param {number} num
 */
function sum(num) {
  const func = (n) => (n ? sum(num + n) : num);
  func.valueOf = () => num; // A trick to make == magics happens
  return func;
}

/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  let resLongestCommonIdx = Math.min();

  for (
    let strIdx = 1;
    strIdx < strs.length;
    strIdx++
  ) {
    if (strs.length == 0) return '';
    const [prevStr, currStr] = [
      strs[strIdx - 1],
      strs[strIdx],
    ];
    let commonIdx = 0;
    while (
      commonIdx < prevStr.length &&
      commonIdx < currStr.length &&
      commonIdx < resLongestCommonIdx
    ) {
      if (
        prevStr[commonIdx] !== currStr[commonIdx]
      ) {
        break;
      }
      commonIdx++;
    }

    resLongestCommonIdx = Math.min(
      resLongestCommonIdx,
      commonIdx
    );
  }

  return strs[0].substring(
    0,
    resLongestCommonIdx
  );
}

test('works', () => {
  expect(
    longestCommonPrefix([
      'flower',
      'flow',
      'flight',
    ])
  ).toBe('fl');

  expect(
    longestCommonPrefix(['dog', 'racecar', 'car'])
  ).toBe('');

  expect(
    longestCommonPrefix(['ccc', 'ccc', 'ccc'])
  ).toBe('ccc');
});

/**
 * @algo aab aba
 *   loop through the elements od s
 *
 *     if repeated, update the leftFwdIdx
 *     find gap, update maxGap
 *   return maxGap
 *
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  if (s.length <= 1) {
    return s.length;
  }

  let charToNearIdx = {};
  let maxGap = 1;
  let leftFwdIdx = 0;
  let charIdx = -1;
  for (const char of s) {
    charIdx++;
    if (
      charToNearIdx[char] !== undefined &&
      charToNearIdx[char] >= leftFwdIdx
    ) {
      leftFwdIdx = charToNearIdx[char] + 1;
    }
    charToNearIdx[char] = charIdx;

    const gap = charIdx - leftFwdIdx + 1;
    if (gap > maxGap) {
      maxGap = gap;
    }
  }

  return maxGap;
}

test('works 0', () => {
  expect(lengthOfLongestSubstring('cccc')).toBe(
    1
  );
});
test('works 1', () => {
  expect(lengthOfLongestSubstring('pwwkew')).toBe(
    3
  );
});
test('works 2', () => {
  expect(lengthOfLongestSubstring('   ')).toBe(1);
});
test('works 3', () => {
  expect(lengthOfLongestSubstring('abc')).toBe(3);
});
test('works 4', () => {
  expect(lengthOfLongestSubstring('aab')).toBe(2);
});
test('works 5', () => {
  expect(
    lengthOfLongestSubstring('abcabcbb')
  ).toBe(3);
});
test('works 5', () => {
  expect(lengthOfLongestSubstring('abba')).toBe(
    2
  );
});

/**
 * @algo
 *   f(idx1, idx2) = isEqual
 *     ? f(idx1-1,idx2-1)+1
 *     : 0
 *
 *     f(3,3) = false -> max(f(2,3), f(3,2))
 *
 *   1 2 3 2
 *         idx1
 *   3 2 4 7
 *         idx2
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findLength(nums1, nums2) {
  let readIdxToRes = Array(nums1.length)
    .fill(null)
    .map((_) => Array(nums2.length).fill(0));
  let max = Math.max();

  for (
    let idx1 = 0;
    idx1 < nums1.length;
    idx1++
  ) {
    for (
      let idx2 = 0;
      idx2 < nums2.length;
      idx2++
    ) {
      if (nums1[idx1] === nums2[idx2]) {
        readIdxToRes[idx1][idx2] =
          (readIdxToRes[idx1 - 1]?.[idx2 - 1] ??
            0) + 1;
      } else {
        // readIdxToRes[idx1][idx2] = Math.max(
        //   readIdxToRes[idx1 - 1]?.[idx2] ?? 0,
        //   readIdxToRes[idx1]?.[idx2 - 1] ?? 0
        // );
      }

      max = Math.max(
        max,
        readIdxToRes[idx1][idx2]
      );
    }
  }

  return max;
}

[
  [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    5,
  ],
  [
    [
      [1, 2, 3, 2, 1],
      [3, 2, 1, 4, 7],
    ],
    3,
  ],
  [
    [
      [1, 2, 7, 2, 1],
      [3, 2, 1, 4, 7],
    ],
    2,
  ],
  [[[1], [1]], 1],
  [[[1], [2]], 0],
  [
    [
      [0, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ],
    2,
  ],
].forEach((e) =>
  test(e[0].join(' | '), () => {
    expect(findLength.apply(null, e[0])).toEqual(
      e[1]
    );
  })
);

/**
 *   0 1 2 3
 * 0 > > > >
 * 1 | > > |
 * 2 < < < |
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  // x = 0, y = 0
  let position = [0, 0];
  let [points, addPoint] = [
    [matrix[0][0]],
    (position) => {
      points.push(
        matrix[position[0]][position[1]]
      );
    },
  ];

  const movements = {
    up: () => position[0]--,
    down: () => position[0]++,
    left: () => position[1]--,
    right: () => position[1]++,
  };
  const edges = {
    top: 0,
    down: matrix.length - 1,
    left: 0,
    right: matrix[0].length - 1,
  };

  while (
    edges.top <= edges.down &&
    edges.left <= edges.right
  ) {
    // go right
    while (position[1] < edges.right) {
      movements.right();
      addPoint(position);
    }
    // go down
    while (position[0] < edges.down) {
      movements.down();
      addPoint(position);
    }
    // shrink the up/right edges
    edges.top++;
    edges.right--;

    // if donw>top go up
    if (edges.down < edges.top) {
      break;
    }
    while (position[1] > edges.left) {
      movements.left();
      addPoint(position);
    }
    // if right go left
    if (edges.right < edges.left) {
      break;
    }
    while (position[0] > edges.top) {
      movements.up();
      addPoint(position);
    }
    // shrink the down/left edges
    edges.down--;
    edges.left++;
  }

  return points;
}

[
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [1, 2, 3, 6, 9, 8, 7, 4, 5],
  ],
  [
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ],
    [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
  ],
].forEach((e) =>
  test(e.join(' | '), () => {
    expect(spiralOrder(e[0])).toEqual(e[1]);
  })
);
/**
 * @algo
 *    9,3,15,20,7 left,root,right inorder
 *    l
 *    9,15,7,20,3 left,right,root postorder
 *              r
 *    let root be postorder.last()
 *    let root.left be rec(newInorder, newPostorder)
 *      newInorder <- split inorder by idx of root val
 *                    select left sub arr A
 *      newPostorder <- pop root from postorder
 *                      select leftIdx..=length of A - 1)
 *    let root.right be rec(newPostorder, newPostorder)
 *      newInorder <- split inorder by root idx
 *                    select right sub arr B
 *      newPostorder <- pop root from postorder
 *                      select length of A..=rightIdx
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
function buildTree(inorder, postorder) {
  const buildRoot = (
    postOrdLeftIdx,
    postOrdRightIdx,
    inOrdLeftIdx,
    inorderRightIdx
  ) => {
    if (
      inOrdLeftIdx > inorderRightIdx ||
      postOrdLeftIdx > postOrdRightIdx
    ) {
      return null;
    }

    const rootVal = postorder[postOrdRightIdx];
    const root = {
      val: rootVal,
      left: null,
      right: null,
    };
    const rootInOrdIdx = inorder.indexOf(rootVal);
    const leftLen = rootInOrdIdx - inOrdLeftIdx;

    root.left = buildRoot(
      postOrdLeftIdx,
      postOrdLeftIdx + leftLen - 1,
      inOrdLeftIdx,
      rootInOrdIdx - 1
    );
    root.right = buildRoot(
      postOrdLeftIdx + leftLen,
      postOrdRightIdx - 1,
      rootInOrdIdx + 1,
      inorderRightIdx
    );

    return root;
  };

  return buildRoot(
    0,
    inorder.length - 1,
    0,
    postorder.length - 1
  );
}

test('example 1', () => {
  expect(
    buildTree(
      [9, 3, 15, 20, 7],
      [9, 15, 7, 20, 3]
    )
  ).toEqual({
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: null,
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  });
});

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Construct Binary Tree from Preorder and Inorder Traversal
 * @algo
 *   9,2,3 root,left,right
 *   2,9,3 left,root,right
 *   let root be preorder[0]
 *   let root.left = rev(newPreorder, newInorder)
 *     newInorder <- split inorder by root value
 *                   select left sub arr A
 *     newPreorder <- select left+1..=(left+length of A)
 *   let root.right = rev(newPreorder, new)
 *     newInorder <- split inorder by root value
 *                   select left sub arr B
 *     newPostorder <- select (left+1+length of A)..=right
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  const buildRoot = (
    preOrdLeftIdx,
    preOrdRightIdx,
    inOrdLeftIdx,
    inOrdRightIdx
  ) => {
    if (
      preOrdLeftIdx > preOrdRightIdx ||
      inOrdLeftIdx > inOrdRightIdx
    ) {
      return null;
    }

    const rootVal = preorder[preOrdLeftIdx];
    const rootInOrdIdx = inorder.indexOf(rootVal);
    const leftLen = rootInOrdIdx - inOrdLeftIdx;
    const root = {
      val: rootVal,
      left: null,
      right: null,
    };

    root.left = buildRoot(
      preOrdLeftIdx + 1,
      preOrdLeftIdx + leftLen,
      inOrdLeftIdx,
      rootInOrdIdx - 1
    );
    root.right = buildRoot(
      preOrdLeftIdx + leftLen + 1,
      preOrdRightIdx,
      rootInOrdIdx + 1,
      inOrdRightIdx
    );

    return root;
  };

  return buildRoot(
    0,
    preorder.length - 1,
    0,
    inorder.length - 1
  );
}

test('example 1', () => {
  expect(
    buildTree(
      [3, 9, 20, 15, 7],
      [9, 3, 15, 20, 7]
    )
  ).toEqual({
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: null,
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  });
});
test('example 2', () => {
  expect(buildTree([-1], [-1])).toEqual({
    val: -1,
    left: null,
    right: null,
  });
});
test('test case 3', () => {
  expect(buildTree([1, 2], [1, 2])).toEqual({
    right: { left: null, right: null, val: 2 },
    left: null,
    val: 1,
  });
});
test('test case 4', () => {
  expect(buildTree([1, 2, 3], [1, 2, 3])).toEqual(
    {
      right: {
        left: null,
        right: {
          val: 3,
          left: null,
          right: null,
        },
        val: 2,
      },
      left: null,
      val: 1,
    }
  );
});

/**
 * @param {number[][]} grid
 * @return {number}
 * @algo
 *   minSumOfPath = f(0,0) = min(f(i+1,j), f(i,j+1), handle cornor cases
 *   for (i (m-1)..=0) {
 *     for (j (n-1)..=0) {
 *       * cornor case n == 0 || m == 0
 *       * if j == colLen, i shall go down only
 *       * if i == rowLen, j shall go right only
 *       minPathSum[i][j] = min(minPathSum[i+1,j], minPathSum[i,j+1])
 *     }
 *   }
 */
function minPathSum(grid) {
  const [rowLen, colLen] = [
    grid.length,
    grid[0].length,
  ];
  if (rowLen === 1) {
    return grid[0].reduce(
      (acc, num) => acc + num,
      0
    );
  }
  if (colLen === 1) {
    return grid.reduce(
      (acc, [num]) => acc + num,
      0
    );
  }

  let readMinSum = {};
  for (let row = rowLen - 1; row >= 0; row--) {
    for (let col = colLen - 1; col >= 0; col--) {
      const currMinSum =
        Math.min(
          row !== rowLen - 1
            ? readMinSum[`${row + 1}${col}`]
            : col === colLen - 1
            ? 0
            : Math.min(),
          col !== colLen - 1
            ? readMinSum[`${row}${col + 1}`]
            : row === rowLen - 1
            ? 0
            : Math.min()
        ) + grid[row][col];

      readMinSum[`${row}${col}`] = currMinSum;
    }
  }

  return readMinSum[`00`];
}

/**
 * @param {TreeNode} root
 * @return {number}
 * @algo
 *   findH(r): find height of curr node, update maxD when (2+lH+lH) > maxD
 *     -> -1, if r === null
 *     -> 1 + max(findH(root.left), findH(root.right))
 */
function diameterOfBinaryTree(root) {
  if (root.left === null && root.right === null) {
    return 0;
  }

  let maxD = Math.max();
  const findH = (r) => {
    if (r === null) {
      return -1;
    }

    const lH = findH(r.left);
    const rH = findH(r.right);
    const currMaxD = lH + rH + 2;

    maxD = Math.max(currMaxD, maxD);
    return 1 + Math.max(lH, rH);
  };

  findH(root);
  return maxD;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * @algo
 *   [1,2,3,4,5], k = 3
 *   ->
 *   [3,2,1,4,5]
 */
function reverseKGroup(head, k) {
  if (k === 1) {
    return head;
  }
  const reverseK = (head, k) => {
    let newBeforeTail = head;
    let prev = null;
    let curr = head;

    while (curr && k > 0) {
      const tempNext = curr.next;
      if (prev === null) {
        newBeforeTail = curr;
      }

      curr.next = prev;
      prev = curr;
      curr = tempNext;
      k--;
    }

    return [prev, curr, newBeforeTail];
  };

  const checkRestLen = (head, k) => {
    while (k > 0) {
      head = head?.next;
      k--;
    }

    // head === null is ok, means we are right at the tail
    return head !== undefined;
  };

  let [firstReversedHead, beforeTail] = [
    null,
    null,
  ];
  let [newHead, curr, newBeforeTail] = [
    head,
    head,
    head,
  ];
  while (checkRestLen(curr, k)) {
    [newHead, curr, newBeforeTail] = reverseK(
      curr,
      k
    );
    if (firstReversedHead === null) {
      firstReversedHead = newHead;
    }

    // cat reversed lists
    if (beforeTail) {
      beforeTail.next = newHead;
    }
    beforeTail = newBeforeTail;
  }

  // cat reversed list with reset
  newBeforeTail.next = curr;

  return firstReversedHead;
}
/**
 * @algo
 *   construct rootToChilds -> dfs
 */
function computeMaxDepth(nodes) {
  let rootNode = null;
  const rootToChilds = {};

  for (const { id, parent } of nodes) {
    if (!rootToChilds[parent]) {
      rootToChilds[parent] = [];
    }
    rootToChilds[parent].push(id.toString());

    if (parent === -1) {
      rootNode = id.toString();
    }
  }

  const getMaxD = (root) => {
    if (!root) {
      return 0;
    }

    const [left, right] =
      rootToChilds[root] ?? [];

    return (
      Math.max(getMaxD(left), getMaxD(right)) + 1
    );
  };

  return getMaxD(rootNode);
}
const TestNodes = [
  { id: 5, parent: 4 },
  { id: 2, parent: 0 },
  { id: 3, parent: 1 },
  { id: 1, parent: 0 },
  { id: 4, parent: 1 },
  { id: 0, parent: -1 },
];
const TestNodes2 = [
  { id: 5, parent: 4 },
  { id: 2, parent: 0 },
  { id: 3, parent: 1 },
  { id: 1, parent: 0 },
  { id: 4, parent: 1 },
  { id: 0, parent: -1 },
  { id: 8, parent: 7 },
  { id: 9, parent: 8 },
  { id: 7, parent: 2 },
];
test('works', () => {
  expect(computeMaxDepth(TestNodes)).toBe(4);
  expect(computeMaxDepth(TestNodes2)).toBe(5);
});

/**
 * 3 -> 2 -> 0 -> 4 -> 5 -> 2
 * @param {ListNode} head
 * @return {boolean}
 * @algo
 *   if next node pointer matches readNumToNode[next.val], return true
 *   otherwise return false
 */
function hasCycle(head) {
  // const readNumToNode = {};
  // let currHead = head;

  // while (currHead) {
  //   const { val, next } = currHead;
  //   if (
  //     readNumToNode[next?.val] === currHead.next
  //   ) {
  //     return true;
  //   }

  //   readNumToNode[val] = currHead;
  //   currHead = next;
  // }

  // use two pointers
  let [slowNode, fastNode] = [
    head,
    head?.next?.next,
  ];
  while (fastNode) {
    if (slowNode === fastNode) {
      return true;
    }
    slowNode = slowNode?.next;
    fastNode = fastNode?.next?.next;
  }
  return false;
}

function deleteNode(node) {
  let [currNode, nextNode] = [node, node.next];

  currNode.val = nextNode.val;
  currNode.next = nextNode.next;
}

function deleteMiddle(head) {
  if (!head.next) {
    return null;
  }

  let [prevNode, currNode] = [head, head];
  let fastNode = head.next?.next;
  while (true) {
    // delete curr node
    if (fastNode === undefined) {
      prevNode.next = currNode.next;
      return head;
    }

    // delete next node
    if (fastNode === null) {
      currNode.next = currNode?.next?.next;
      return head;
    }

    prevNode = currNode;
    currNode = currNode?.next;
    fastNode = fastNode?.next?.next;
  }
}

/**
 * @param {*} head
 * @algo
 *   1 2 3 4
 *   s   f
 *     sf
 */
function detectCycle(head) {
  if (!head || !head.next) {
    return null;
  }

  let [slowNode, fastNode] = [
    head.next,
    head.next?.next,
  ];

  while (fastNode) {
    if (fastNode === slowNode) {
      slowNode = head;
      while (slowNode !== fastNode) {
        fastNode = fastNode.next;
        slowNode = slowNode.next;
      }

      return slowNode;
    }
    slowNode = slowNode?.next;
    fastNode = fastNode?.next?.next;
  }

  return null;
}

/**
 * @algo
 * 2 3 4 5 ,9 8 3 4 5
 * 9 8 3 4 5 ,2 3 4 5
 */
function getIntersectionNode(headA, headB) {
  let [nodeA, nodeB] = [headA, headB];
  let [isPadA, isPadB] = [false, false];
  while (nodeA && nodeB) {
    if (nodeA === nodeB && isPadA && isPadB) {
      return nodeA;
    }

    nodeA = nodeA.next;
    nodeB = nodeB.next;
    if (nodeA === null && !isPadA) {
      nodeA = headB;
      isPadA = true;
    }
    if (nodeB === null && !isPadB) {
      nodeB = headA;
      isPadB = true;
    }
  }

  return null;
}

/**
 * @algo
 * recorsively split the list into left and right
 * -> merge the left and right elements, return merged list
 */
function sortList(head) {
  const compluteLen = (head) => {
    let len = 0;
    while (head) {
      len++;
      head = head.next;
    }

    return len;
  };

  // 1 2 3 4
  // ^   ^ merge(1->2, 3->4)
  // ^ ^ merge(1,2) merge(3,4)
  const split = (head) => {
    const len = compluteLen(head);
    if (len <= 1) {
      return head;
    }
    const mid = Math.floor(len / 2);

    let leftH = head;
    let rightH = head;
    let tempMid = mid;
    while (tempMid-- > 0) {
      const tempNext = rightH.next;
      if (tempMid === 0) {
        rightH.next = null;
      }
      rightH = tempNext;
    }

    return merge(split(leftH), split(rightH));
  };

  const merge = (leftH, rightH) => {
    let newHead = { next: null };
    let currHead = newHead;
    while (leftH || rightH) {
      const [lv, rv] = [leftH?.val, rightH?.val];
      if (
        (lv ?? Math.min()) > (rv ?? Math.min())
      ) {
        currHead.next = { val: rv, next: null };
        rightH = rightH?.next;
      } else {
        currHead.next = { val: lv, next: null };
        leftH = leftH?.next;
      }
      currHead = currHead.next;
    }

    return newHead.next;
  };

  return split(head);
}

/**
 * @return {number[][]}
 * @algo
 * maintain a levelQueue, dequeue origin queue util it's empty
 *   levelQueue.enqueue(childs of ele)
 *   if empty, compute res
 */
function levelOrder(root) {
  if (!root) {
    return [];
  }

  const bfs = (headOutNums, res) => {
    let levelNums = [];
    while (headOutNums.length > 0) {
      let tempLen = headOutNums.length;
      while (tempLen-- > 0) {
        const node = headOutNums.shift();
        levelNums.push(node.val);

        if (node.left) {
          headOutNums.push(node.left);
        }
        if (node.right) {
          headOutNums.push(node.right);
        }
      }

      res.push(levelNums);
      levelNums = [];
    }

    return res;
  };

  return bfs([root], []);
}

/**
 * @return {number}
 * @algo
 * getMinD(root): compute the minimum height of the root node
 * -> 1, if root is leaf node
 * -> +Infinity, if root is null, path is not valid
 */
function minDepth(root) {
  if (!root) {
    return 0;
  }

  const getMinD = (root) => {
    if (!root) {
      return Math.min();
    }
    if (!root.left && !root.right) {
      return 1;
    }
    const leftD = getMinD(root.left);
    const rightD = getMinD(root.right);
    return Math.min(leftD, rightD) + 1;
  };

  return getMinD(root);
}

/**
 * @param {string[]} tokens
 * @return {number}
 * @algo
 * traverse the tokens, for each token
 *   if is operator, push the calculated popped two factor from tailOutTokens to tailOutTokens
 *   else push token to tailOutTokens
 */
function evalRPN(tokens) {
  let tailOutTokens = [];
  let findFactors = (tailOutToken) => {
    return [
      Number(tailOutToken.pop()),
      Number(tailOutToken.pop()),
    ];
  };
  let isToken = (token) =>
    token === '+' ||
    token === '-' ||
    token === '*' ||
    token === '/';

  for (const token of tokens) {
    if (!isToken(token)) {
      tailOutTokens.push(Number(token));
      continue;
    }

    const [fac1, fac2] = findFactors(
      tailOutTokens
    );
    if (token === '-') {
      tailOutTokens.push(fac2 - fac1);
    }
    if (token === '+') {
      tailOutTokens.push(fac2 + fac1);
    }
    if (token === '*') {
      tailOutTokens.push(fac2 * fac1);
    }
    if (token === '/') {
      let res = fac2 / fac1;
      if (res < 0 && !Number.isInteger(res)) {
        res += 1;
      }

      tailOutTokens.push(Math.floor(res));
    }
  }

  return tailOutTokens[0];
}

class MyQueue {
  constructor() {
    this.curr = [];
    this.backup = [];
  }
  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.curr.push(x);
  }
  /**
   * @return {number}
   * @algo
   * run peek, pop top of backup queue
   */
  pop() {
    this.peek();
    return this.backup.pop();
  }

  /**
   * @return {number}
   * @algo
   * if backup is empty, run backup process, let backup be a queue-like stack
   * -> backup.top()
   */
  peek() {
    if (this.backup.length === 0) {
      while (this.curr.length > 0) {
        this.backup.push(this.curr.pop());
      }
    }
    return this.backup[this.backup.length - 1];
  }
  /**
   * @return {boolean}
   */
  empty() {
    return (
      this.curr.length === 0 &&
      this.backup.length === 0
    );
  }
}

/**
 * @param {number[]} heights
 * @return {number}
 * @algo
 * traverse heights
 *   while tailOutLeftIdxToH's top height > curr height, pop and campare maxArea
 *   push [leftMostIdx, height] to tailOutLeftIdxToH
 * traverse tailOutLeftIdxToH, campare maxArea
 */
function largestRectangleArea(heights) {
  const tailOutLeftIdxToH = [];
  const top = () =>
    tailOutLeftIdxToH[
      tailOutLeftIdxToH.length - 1
    ];

  let maxArea = 0;
  heights.forEach((currH, currIdx) => {
    let leftIdx = currIdx;
    while (top() && top()[1] > currH) {
      const topE = tailOutLeftIdxToH.pop();
      maxArea = Math.max(
        maxArea,
        topE[1] * (currIdx - topE[0])
      );
      leftIdx = topE[0];
    }

    tailOutLeftIdxToH.push([leftIdx, currH]);
  });

  while (tailOutLeftIdxToH.length > 0) {
    const topE = tailOutLeftIdxToH.pop();
    maxArea = Math.max(
      maxArea,
      topE[1] * (heights.length - topE[0])
    );
  }

  return maxArea;
}

/**
 * @param {number[]} temperatures
 * @return {number[]}
 * @algo
 * for tem in enum(temperatures)
 *   if nextTem<=tem, then push curr tem to tailOutIdxToTemperature to maintain then down tems
 *   else if tailOutIdxToTemperature not empty, pop and compute the result
 */
function dailyTemperatures(temperatures) {
  let tailOutIdxToTemperature = [];
  let res = Array(temperatures.length).fill(0);
  const peek = (stack) => stack[stack.length - 1];

  for (
    let idx = 0;
    idx < temperatures.length - 1;
    idx++
  ) {
    const nextIdx = idx + 1;
    if (
      temperatures[nextIdx] <= temperatures[idx]
    ) {
      tailOutIdxToTemperature.push({
        idx,
        tem: temperatures[idx],
      });
      continue;
    }

    res[idx] = 1;

    while (tailOutIdxToTemperature.length > 0) {
      const topTem = peek(
        tailOutIdxToTemperature
      );
      if (!(temperatures[nextIdx] > topTem.tem)) {
        break;
      }

      res[topTem.idx] = nextIdx - topTem.idx;
      tailOutIdxToTemperature.pop();
    }
  }

  return res;
}

/**
 * @return {number}
 * @algo
 * f(root): find longest zigzag path of [root->left, root->right], update maxPath the same time
 * -> [-1,-1], root is null
 * -> [f(root.right)+1,f(root.left)+1]
 */
function longestZigZag(root) {
  let maxPath = 0;
  const findZigZig = (root) => {
    if (root === null) {
      return [-1, -1];
    }

    const leftPath =
      findZigZig(root.left)?.[1] + 1;
    const rightPath =
      findZigZig(root.right)?.[0] + 1;

    const currMax = Math.max(leftPath, rightPath);
    if (currMax > maxPath) {
      maxPath = currMax;
    }

    return [leftPath, rightPath];
  };

  findZigZig(root);
  return maxPath;
}

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

/**
 * Encodes a tree to a single string.
 *
 * @return {string}
 */
function serialize(root) {
  let res = [];
  const traverseNodes = (root, res) => {
    if (root === null) {
      res.push('N');
      return;
    }
    res.push(root.val.toString());
    traverseNodes(root.left, res);
    traverseNodes(root.right, res);
  };

  traverseNodes(root, res);
  return res.join(',');
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 */
function deserialize(data) {
  const nodes = data.split(',');
  let idx = 0;
  const buildNodes = () => {
    if (nodes[idx] === 'N') {
      idx++;
      return null;
    }

    const node = { val: parseInt(nodes[idx]) };
    idx++;
    node.left = buildNodes();
    node.right = buildNodes();

    return node;
  };

  return buildNodes();
}

function serialize(root) {
  const resEles = [];
  const sameLevelNodes = [root];

  while (sameLevelNodes.length > 0) {
    const n = sameLevelNodes.shift();
    resEles.push(n ? n.val : '#');

    if (n !== null) {
      sameLevelNodes.push(n.left, n.right);
    }
  }

  return resEles.join(',');
}

function deserialize(data) {
  const nodes = data.split(',').map((ele) =>
    ele === '#'
      ? null
      : {
          val: parseInt(ele),
          left: null,
          right: null,
        }
  );
  if (nodes.length === 0) {
    return null;
  }

  const root = nodes.shift();
  const sameLevelNodes = [root];

  while (sameLevelNodes.length > 0) {
    const n = sameLevelNodes.shift();
    if (n === null) {
      continue;
    }
    n.left = nodes.shift() ?? null;
    n.right = nodes.shift() ?? null;
    sameLevelNodes.push(n.left, n.right);
  }

  return root;
}

/**
 * @param {number[][]} matrix
 * @return {number}
 * @algo
 * for r in matrix
 *  for c in matrix[r]
 *  findLongestP(r,c,matrix[r][-1]): find longest increasing path of (r,c)
 *  -> 0, if out of bounds or curr<=prev
 *  -> 1 + max(f(l),f(u),f(d),f(r))
 */
function longestIncreasingPath(matrix) {
  const [rows, cols] = [
    matrix.length,
    matrix[0]?.length,
  ];
  const pointToMaxP = {};
  let res = 1;

  const findLongestP = (row, col, prevVal) => {
    if (
      row < 0 ||
      row === rows ||
      col < 0 ||
      col === cols ||
      prevVal >= matrix[row][col]
    ) {
      return 0;
    }

    const currVal = matrix[row][col];

    const pointKey = `${row}-${col}`;
    if (pointToMaxP[pointKey]) {
      return pointToMaxP[pointKey];
    }

    const maxP =
      Math.max(
        findLongestP(row - 1, col, currVal),
        findLongestP(row + 1, col, currVal),
        findLongestP(row, col - 1, currVal),
        findLongestP(row, col + 1, currVal)
      ) + 1;
    res = Math.max(res, maxP);
    pointToMaxP[pointKey] = maxP;

    return maxP;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      findLongestP(row, col, Math.max());
    }
  }

  return res;
}

/**
 * @algo
 * f(root): count matched children
 * -> 0, if root is null
 * -> f(root.left) + f(root.right)
 *    + (matches ? 1 : 0)
 */
function lowestCommonAncestor(root, p, q) {
  let res;
  const findMatch = (root) => {
    if (!root) {
      return 0;
    }

    let matchCount =
      findMatch(root.left) +
      findMatch(root.right);
    if (
      root.val === p.val ||
      root.val === q.val
    ) {
      matchCount += 1;
    }

    if (matchCount === 2 && !res) {
      res = root;
    }

    return matchCount;
  };

  findMatch(root);
  return res;
}

/**
 * @return {boolean}
 * @algo
 * f(root): determine root is valid or not
 * -> true, if root is null
 * -> false, if leftBound<root<rightBound is false
 * -> f(root.left) && f(root.right)
 */
function isValidBST(root) {
  const isValidRoot = (
    root,
    leftBound,
    rightBound
  ) => {
    if (!root) {
      return true;
    }

    if (
      !(
        leftBound < root.val &&
        rightBound > root.val
      )
    ) {
      return false;
    }

    return (
      isValidRoot(
        root.left,
        leftBound,
        root.val
      ) &&
      isValidRoot(
        root.right,
        root.val,
        rightBound
      )
    );
  };

  return isValidRoot(root, -Infinity, +Infinity);
}

/**
 * @return {boolean}
 * @algo
 * traverse every node of the tree, by level
 *   set hasNull to true if we encounter a null node
 *   -> false, if node not null and hasNull
 * -> true
 */
function isCompleteTree(root) {
  const levelNodes = [root];
  let hasNull = false;
  while (levelNodes.length > 0) {
    const node = levelNodes.shift();
    if (node === null && !hasNull) {
      hasNull = true;
    }
    if (node) {
      if (hasNull) {
        return false;
      }
      levelNodes.push(node.left);
      levelNodes.push(node.right);
    }
  }

  return true;
}

/**
 * @algo
 * trverse two tree simultaneously, construct new tree recorsively
 * createTree(root1, root2): construct new tree based on root1 and root2
 * -> null, if !root1 && !root2
 * -> newRoot, create newRoot by following the 3 rules below
 *    1. newRoot.val to sum of root1 and root2 val
 *    2. newRoot.left = createTree(root1?.left, root2?.left)
 *    3. newRoot.right = createTree(root1?.right, root2?.right)
 */
function mergeTrees(root1, root2) {
  const createTree = (root1, root2) => {
    if (!root1 && !root2) {
      return null;
    }

    let currVal =
      (root1?.val ?? 0) + (root2?.val ?? 0);
    let newRoot = {
      val: 0,
      left: null,
      right: null,
    };

    newRoot.val = currVal;
    newRoot.left = createTree(
      root1?.left,
      root2?.left
    );
    newRoot.right = createTree(
      root1?.right,
      root2?.right
    );

    return newRoot;
  };

  return createTree(root1, root2);
}

/**
 * Find the first idx of element equal to target
 * @returns
 */
function findFirstIndexOf(arr, target) {
  let [leftIdx, rightIdx] = [0, arr.length - 1];
  let res = -1;
  while (leftIdx <= rightIdx) {
    const midIdx = Math.floor(
      leftIdx + (rightIdx - leftIdx) / 2
    );
    if (target <= arr[midIdx]) {
      if (arr[midIdx] === target) {
        res = midIdx;
      }
      rightIdx = midIdx - 1;
    } else {
      leftIdx = midIdx + 1;
    }
  }
  return res;
}

test('shall work when no repeat', () => {
  expect(findFirstIndexOf([1, 2, 3], 3)).toBe(2);
  expect(findFirstIndexOf([1, 2, 3], 2)).toBe(1);
  expect(findFirstIndexOf([1, 2, 3], 1)).toBe(0);
  expect(findFirstIndexOf([1, 2, 3], 4)).toBe(-1);
});
test('shall work when repeat', () => {
  expect(
    findFirstIndexOf([1, 2, 2, 3, 3], 2)
  ).toBe(1);
  expect(
    findFirstIndexOf([1, 2, 2, 3, 3], 3)
  ).toBe(3);
});

/**
 * Find the last idx of element equal to target
 */
function findLastIndexOf(arr, target) {
  let [leftIdx, rightIdx] = [0, arr.length - 1];
  let res = -1;
  while (leftIdx <= rightIdx) {
    const midIdx = Math.floor(
      leftIdx + (rightIdx - leftIdx) / 2
    );
    if (target >= arr[midIdx]) {
      if (arr[midIdx] === target) {
        res = midIdx;
      }
      leftIdx = midIdx + 1;
    } else {
      rightIdx = midIdx - 1;
    }
  }
  return res;
}

test('shall work when no repeat', () => {
  expect(findLastIndexOf([1, 2, 3], 3)).toBe(2);
  expect(findLastIndexOf([1, 2, 3], 2)).toBe(1);
  expect(findLastIndexOf([1, 2, 3], 1)).toBe(0);
  expect(findLastIndexOf([1, 2, 3], 4)).toBe(-1);
});
test('shall work when repeat', () => {
  expect(
    findLastIndexOf([1, 2, 2, 3, 3], 2)
  ).toBe(2);
  expect(
    findLastIndexOf([1, 2, 2, 3, 3], 3)
  ).toBe(4);
});
/**
 * Find last idx of the element greater or equal to target
 * @param {Array<number>} arr
 * @param {number} target
 * @returns
 */
function findLastIndexOfLessOrEqual(arr, target) {
  let [leftIdx, rightIdx] = [0, arr.length - 1];
  let res = -1;
  while (leftIdx <= rightIdx) {
    const midIdx = Math.floor(
      leftIdx + (rightIdx - leftIdx) / 2
    );
    if (target <= arr[midIdx]) {
      res = midIdx;
      rightIdx = midIdx - 1;
    } else {
      leftIdx = midIdx + 1;
    }
  }
  return res;
}

test('shall work when no repeat', () => {
  expect(
    findLastIndexOfLessOrEqual([1, 2, 3], 3)
  ).toBe(2);
  expect(
    findLastIndexOfLessOrEqual([1, 2, 3], 2)
  ).toBe(1);
  expect(
    findLastIndexOfLessOrEqual([1, 2, 3], 1)
  ).toBe(0);
  expect(
    findLastIndexOfLessOrEqual([1, 2, 3], 4)
  ).toBe(-1);
});
test('shall work when repeat', () => {
  expect(
    findLastIndexOfLessOrEqual([1, 2, 2, 3, 3], 0)
  ).toBe(0);
  expect(
    findLastIndexOfLessOrEqual([1, 2, 2, 3, 3], 3)
  ).toBe(3);
  expect(
    findLastIndexOfLessOrEqual(
      [3, 4, 6, 7, 10],
      5
    )
  ).toBe(2);
});

/**
 * Find first idx of the element less or equal to target
 * @param {Array<number>} arr
 * @param {number} target
 * @returns
 */
function findFirstIndexOfLessOrEqual(
  arr,
  target
) {
  let [leftIdx, rightIdx] = [0, arr.length - 1];
  let res = -1;
  while (leftIdx <= rightIdx) {
    const midIdx = Math.floor(
      leftIdx + (rightIdx - leftIdx) / 2
    );
    if (target >= arr[midIdx]) {
      res = midIdx;
      leftIdx = midIdx + 1;
    } else {
      rightIdx = midIdx - 1;
    }
  }

  return res;
}

test('shall work when repeat', () => {
  expect(
    findFirstIndexOfLessOrEqual(
      [3, 4, 6, 7, 10],
      5
    )
  ).toBe(1);
  expect(
    findFirstIndexOfLessOrEqual(
      [3, 4, 6, 7, 10],
      7
    )
  ).toBe(3);
});

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 * @algo
 * nSum: match two sum with target
 * -> nSum(n-1, target - curr), if n > 2
 * -> check two sum, update res and quadNums
 */
function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  let [res, quadNums] = [[], []];
  const nSum = (nums, info) => {
    const { n, startIdx, target } = info;
    if (n > 2) {
      for (
        let idx = startIdx;
        idx <= nums.length - n;
        idx++
      ) {
        if (
          idx > startIdx &&
          nums[idx] === nums[idx - 1]
        ) {
          continue;
        }

        const info = {
          n: n - 1,
          startIdx: idx + 1,
          target: target - nums[idx],
        };
        quadNums.push(nums[idx]);
        nSum(nums, info);
        quadNums.pop();
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
        quadNums.concat([
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
      leftIdx++;
      rightIdx--;
    }
  };

  nSum(nums, {
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

  expect(
    fourSum([-2, -1, -1, 1, 1, 2, 2], 0)
  ).toEqual([
    [-2, -1, 1, 2],
    [-1, -1, 1, 1],
  ]);
});

/**
 * @param {number[]} nums
 * @return {number[][]}
 * @algo
 * for num of nums[0..=nums.length - 3]
 *   two sum checking(two pointers)
 *     if left and leftNext dup, jump to left next
 */
function threeSum(nums) {
  const len = nums.length;
  nums.sort((a, b) => a - b);
  const res = [];

  for (let idx = 0; idx <= len - 3; idx++) {
    if (idx > 0 && nums[idx] == nums[idx - 1]) {
      continue;
    }

    let leftIdx = idx + 1;
    let rightIdx = len - 1;
    while (leftIdx < rightIdx) {
      const sum =
        nums[idx] +
        nums[leftIdx] +
        nums[rightIdx];
      if (sum < 0) {
        leftIdx += 1;
        continue;
      }
      if (sum > 0) {
        rightIdx -= 1;
        continue;
      }

      res.push([
        nums[idx],
        nums[leftIdx],
        nums[rightIdx],
      ]);

      while (
        leftIdx < rightIdx &&
        nums[leftIdx] == nums[leftIdx + 1]
      ) {
        leftIdx += 1;
      }
      leftIdx += 1;
      rightIdx -= 1;
    }
  }

  return res;
}

test('shall work', () => {
  expect(threeSum([1, 0, -1])).toEqual([
    [-1, 0, 1],
  ]);
  expect(threeSum([-1, 2, -1, -1])).toEqual([
    [-1, -1, 2],
  ]);
});

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
function fourSumCount(
  nums1,
  nums2,
  nums3,
  nums4
) {
  const readTwoSumToCount = {};
  let res = 0;
  for (const num1 of nums1) {
    for (const num2 of nums2) {
      const sum = num1 + num2;
      if (!readTwoSumToCount[sum]) {
        readTwoSumToCount[sum] = 1;
        continue;
      }
      readTwoSumToCount[sum]++;
    }
  }

  for (const num3 of nums3) {
    for (const num4 of nums4) {
      const sum = num3 + num4;
      const match = 0 - sum;
      if (readTwoSumToCount[match]) {
        res += readTwoSumToCount[match];
      }
    }
  }

  return res;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let closestSum = Infinity;
  for (
    let idx = 0;
    idx <= nums.length - 3;
    idx++
  ) {
    let [leftIdx, rightIdx] = [
      idx + 1,
      nums.length - 1,
    ];

    while (leftIdx < rightIdx) {
      const sum =
        nums[idx] +
        nums[leftIdx] +
        nums[rightIdx];
      if (
        Math.abs(sum - target) <
        Math.abs(closestSum - target)
      ) {
        closestSum = sum;
      }
      if (sum > target) {
        rightIdx--;
        continue;
      }
      if (sum < target) {
        leftIdx++;
        continue;
      }

      return target;
    }
  }

  return closestSum;
}

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
  let maxSum = nums[0];
  let prevSum = 0;
  for (const num of nums) {
    if (prevSum < 0) {
      prevSum = 0;
    }
    const currSum = prevSum + num;
    maxSum = Math.max(maxSum, currSum);
    prevSum = currSum;
  }

  return maxSum;
}

/**
 * @param {number[]} nums
 * @return {string}
 * @algo
 * sort nums based on following steps
 * a. let catOpt1 = a cat b
 * b. let catOpt2 = b cat a
 * c. campare catOpt1 to catOpt2
 * -> 0, if nums[0] === "0"
 * -> nums.join("")
 */
function largestNumber(nums) {
  const sorted = nums
    .map((num) => num.toString())
    .sort((str1, str2) => {
      const [catOpt1, catOpt2] = [
        str1 + str2,
        str2 + str1,
      ];
      return catOpt1 < catOpt2 ? 1 : -1;
    });
  if (sorted[0] === '0') {
    return '0';
  }
  return sorted.join('');
}

/**
 * @param {number} num
 * @return {number}
 * @algo
 * convert num to chars array
 * -> 0, if num == 0
 * -> "-" + joined sorted chars array, if num < 0
 * shift "-"
 * sort chars ascendingly
 * -> joined sorted chars array, if num > 0
 * sort chars descendingly
 * if sort chars[0] === "0", swap 0 and firtNoneZero idx of chars array
 */
function smallestNumber(num) {
  if (num === 0) {
    return 0;
  }
  const isNeg = num < 0;
  const chars = num.toString().split('');
  if (isNeg) {
    chars.shift();
    const sorted = chars.sort((a, b) =>
      a < b ? 1 : -1
    );
    return Number(`-${sorted.join('')}`);
  }

  const sorted = chars.sort((a, b) =>
    a < b ? -1 : 1
  );
  if (sorted[0] === '0') {
    let firstNoneZero = 1;
    while (
      firstNoneZero < sorted.length &&
      sorted[firstNoneZero] === '0'
    ) {
      firstNoneZero += 1;
    }
    [sorted[0], sorted[firstNoneZero]] = [
      sorted[firstNoneZero],
      sorted[0],
    ];
  }
  return Number(sorted.join(''));
}

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 * @algo
 * -> "0", if numerator is 0
 * cat "-" to resStr, if res will be negative
 * calculate quotient and reminder of divisor / divident repeat repeatly
 *   push quotient to res
 *   -> return res if reminder == 0
 *   push "." to res if res isn't having "." yet
 *   -> return res with repeated nums wrapped in "(" ")", if reminder was read
 *
 *   readQuotientToIdx[reminder] = res.len - 1, if res has "."
 *   update divisor, continue calculating
 */
function fractionToDecimal(
  numerator,
  denominator
) {
  if (numerator == 0) {
    return '0';
  }

  let res = [];
  let readReminderToIdx = {};
  let divisor = Math.abs(numerator);
  const divident = Math.abs(denominator);
  const isNeg =
    (numerator < 0 ? 1 : 0) ^
    (denominator < 0 ? 1 : 0);

  if (isNeg == 1) {
    res.push('-');
  }

  let hasDot = false;
  while (true) {
    const reminder = divisor % divident;
    const quotient = Math.floor(
      divisor / divident
    );

    res.push(quotient);

    if (reminder == 0) {
      return res.join('');
    }

    if (!hasDot) {
      res.push('.');
      hasDot = true;
    }

    if (
      readReminderToIdx[reminder] != undefined
    ) {
      const start =
        readReminderToIdx[reminder] + 1;
      const end = res.length - 1;
      let resStr = '';
      for (let idx = 0; idx <= end; idx++) {
        if (idx == start) {
          resStr += '(';
        }
        resStr += res[idx];
      }
      resStr += ')';

      return resStr;
    }

    if (hasDot) {
      readReminderToIdx[reminder] =
        res.length - 1;
    }
    divisor = reminder * 10;
  }
}

it('shall return 0 if numerator==0', () => {
  expect(fractionToDecimal(0, 2));
  expect(fractionToDecimal(0, 22));
});
it('shall wrap () if reminder repeats', () => {
  expect(fractionToDecimal(1, 3)).toBe('0.(3)');
  expect(fractionToDecimal(4, 333)).toBe(
    '0.(012)'
  );
});
it('shall pad - if res is negative', () => {
  expect(fractionToDecimal(-1, 3)).toBe('-0.(3)');
  expect(fractionToDecimal(1, -3)).toBe('-0.(3)');
});

/**
 * @param {number[]} nums
 * @return {number[]}
 * @algo
 * maintain a map of largestNum to longest divisible subset
 * traverse num in nums
 *  iterate over the map, update the map
 * -> longest subset of map
 */
function largestDivisibleSubset1(nums) {
  const largestNumToLDS = {};
  nums.sort((a, b) => a - b);
  nums.forEach((ele, idx) => {
    if (idx === 0) {
      largestNumToLDS[ele] = [ele];
      return;
    }

    for (const [
      largestNum,
      sub,
    ] of Object.entries(largestNumToLDS)) {
      if (
        largestNum === '1' ||
        ele % Number(largestNum) === 0
      ) {
        if (
          largestNumToLDS[ele] === undefined ||
          sub.length >
            largestNumToLDS[ele].length - 1
        ) {
          largestNumToLDS[ele] = sub.concat(ele);
          continue;
        }
      }
    }

    if (largestNumToLDS[ele] === undefined) {
      largestNumToLDS[ele] = [ele];
    }
  });

  let longestSub = [];
  for (const sub of Object.values(
    largestNumToLDS
  )) {
    if (sub.length > longestSub.length) {
      longestSub = sub;
    }
  }

  return longestSub;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 * @algo
 * maintain a list where list[largestNum's idx] contains the LDS
 * traverse num in nums
 *  iterate over the list, update the list when needed
 * -> longest subset of list
 */
function largestDivisibleSubset(nums) {
  const LDS = [];
  nums.sort((a, b) => a - b);
  nums.forEach((ele, idx) => {
    LDS.forEach((sub, largestNumIdx) => {
      const largestNum = nums[largestNumIdx];
      if (
        largestNum === 1 ||
        ele % largestNum === 0
      ) {
        if (
          LDS[idx] === undefined ||
          sub.length > LDS[idx].length - 1
        ) {
          LDS[idx] = sub.concat(ele);
        }
      }
    });

    if (LDS[idx] === undefined) {
      LDS[idx] = [ele];
    }
  });

  let longestSub = [];
  for (const sub of LDS) {
    if (sub.length > longestSub.length) {
      longestSub = sub;
    }
  }

  return longestSub;
}

test('shall works', () => {
  expect(
    largestDivisibleSubset([1, 2, 4])
  ).toEqual([1, 2, 4]);
  expect(
    largestDivisibleSubset([1, 2, 10, 20])
  ).toEqual([1, 2, 10, 20]);
  expect(
    largestDivisibleSubset([1, 4, 10, 8])
  ).toEqual([1, 4, 8]);
});
