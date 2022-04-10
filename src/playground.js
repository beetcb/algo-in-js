import * as tests from './tests';

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

tests.assertPremitiveEq(
  longestPalindrome('aaaccb'),
  5
);
tests.assertPremitiveEq(
  longestPalindrome('aaacccb'),
  5
);
tests.assertPremitiveEq(
  longestPalindrome('abccccdd'),
  7
);
tests.assertPremitiveEq(
  longestPalindrome('a'),
  1
);
tests.assertPremitiveEq(
  longestPalindrome('ab'),
  1
);
tests.assertPremitiveEq(
  longestPalindrome('aa'),
  2
);
tests.assertPremitiveEq(
  longestPalindrome('bananas'),
  5
);
