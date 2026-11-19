// Master DSA Problems Dataset for CodingX Platform
export const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "EASY",
    topic: "Arrays & Hashing",
    stage: 1,
    order: 1,
    acceptanceRate: "51.4%",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
    return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your code here
        return []`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[0];
    }
}`
    },
    testCases: [
      { input: "[2,7,11,15], target = 9", expected: "[0,1]" },
      { input: "[3,2,4], target = 6", expected: "[1,2]" },
      { input: "[3,3], target = 6", expected: "[0,1]" }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "EASY",
    topic: "Stack",
    stage: 1,
    order: 2,
    acceptanceRate: "40.8%",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here
    return false;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        return False`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        return false;
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
}`
    },
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" }
    ]
  },
  {
    id: 3,
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "MEDIUM",
    topic: "Stack",
    stage: 1,
    order: 3,
    acceptanceRate: "52.8%",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the \`MinStack\` class:\n- \`MinStack()\` initializes the stack object.\n- \`void push(int val)\` pushes the element val onto the stack.\n- \`void pop()\` removes the element on the top of the stack.\n- \`int top()\` gets the top element of the stack.\n- \`int getMin()\` retrieves the minimum element in the stack.`,
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: "[null,null,null,null,-3,null,0,-2]",
        explanation: "MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2"
      }
    ],
    constraints: [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."
    ],
    starterCode: {
      javascript: `class MinStack {
    constructor() {
        // Initialize your stack data structure here
    }

    push(val) {
        // Write your code here
    }

    pop() {
        // Write your code here
    }

    top() {
        // Write your code here
        return 0;
    }

    getMin() {
        // Write your code here
        return 0;
    }
}`,
      python: `class MinStack:
    def __init__(self):
        # Initialize your stack data structure here
        pass

    def push(self, val: int) -> None:
        # Write your code here
        pass

    def pop(self) -> None:
        # Write your code here
        pass

    def top(self) -> int:
        # Write your code here
        return 0

    def getMin(self) -> int:
        # Write your code here
        return 0`,
      cpp: `class MinStack {
public:
    MinStack() {
        // Initialize your stack data structure here
    }
    
    void push(int val) {
        // Write your code here
    }
    
    void pop() {
        // Write your code here
    }
    
    int top() {
        return 0;
    }
    
    int getMin() {
        return 0;
    }
};`,
      java: `class MinStack {
    public MinStack() {
        // Initialize your stack data structure here
    }
    
    public void push(int val) {
        // Write your code here
    }
    
    public void pop() {
        // Write your code here
    }
    
    public int top() {
        return 0;
    }
    
    public int getMin() {
        return 0;
    }
}`
    },
    testCases: [
      { input: "push(-2), push(0), push(-3), getMin()", expected: "-3" },
      { input: "pop(), top()", expected: "0" },
      { input: "getMin()", expected: "-2" }
    ]
  },
  {
    id: 4,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "EASY",
    topic: "Sliding Window",
    stage: 1,
    order: 4,
    acceptanceRate: "54.2%",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    // Write your code here
    return 0;
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Write your code here
        return 0`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
        return 0;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }
}`
    },
    testCases: [
      { input: "[7,1,5,3,6,4]", expected: "5" },
      { input: "[7,6,4,3,1]", expected: "0" }
    ]
  },
  {
    id: 5,
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "EASY",
    topic: "Binary Search",
    stage: 1,
    order: 5,
    acceptanceRate: "57.3%",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // Write your code here
    return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        # Write your code here
        return -1`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
}`
    },
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expected: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expected: "-1" }
    ]
  },
  {
    id: 6,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "EASY",
    topic: "Linked List",
    stage: 1,
    order: 6,
    acceptanceRate: "74.5%",
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    // Write your code here
    return null;
}`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head):
        # Write your code here
        return None`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
        return nullptr;
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }
}`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" },
      { input: "[1,2]", expected: "[2,1]" }
    ]
  },
  {
    id: 7,
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "MEDIUM",
    topic: "Intervals",
    stage: 1,
    order: 7,
    acceptanceRate: "47.1%",
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    // Write your code here
    return [];
}`,
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        # Write your code here
        return []`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[0][0];
    }
}`
    },
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" },
      { input: "[[1,4],[4,5]]", expected: "[[1,5]]" }
    ]
  },
  {
    id: 8,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "HARD",
    topic: "Two Pointers",
    stage: 1,
    order: 8,
    acceptanceRate: "61.2%",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are trapped."
      }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    // Write your code here
    return 0;
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        # Write your code here
        return 0`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        return 0;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        // Write your code here
        return 0;
    }
}`
    },
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "[4,2,0,3,2,5]", expected: "9" }
    ]
  },
  {
    id: 9,
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "MEDIUM",
    topic: "Linked List",
    stage: 1,
    order: 9,
    acceptanceRate: "42.7%",
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the \`LRUCache\` class:\n- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.\n- \`int get(int key)\` Return the value of the key if the key exists, otherwise return -1.\n- \`void put(int key, int value)\` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]"
      }
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    starterCode: {
      javascript: `/**
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
        // Initialize your LRU cache
    }

    get(key) {
        // Write your code here
        return -1;
    }

    put(key, value) {
        // Write your code here
    }
}`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        # Initialize your LRU cache
        pass

    def get(self, key: int) -> int:
        # Write your code here
        return -1

    def put(self, key: int, value: int) -> None:
        # Write your code here
        pass`,
      cpp: `class LRUCache {
public:
    LRUCache(int capacity) {
        // Initialize your LRU cache
    }
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
        // Write your code here
    }
};`,
      java: `class LRUCache {
    public LRUCache(int capacity) {
        // Initialize your LRU cache
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: "put(1,1), put(2,2), get(1)", expected: "1" },
      { input: "put(3,3), get(2)", expected: "-1" }
    ]
  },
  {
    id: 10,
    title: "Word Break",
    slug: "word-break",
    difficulty: "MEDIUM",
    topic: "Dynamic Programming",
    stage: 1,
    order: 10,
    acceptanceRate: "46.3%",
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.`,
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: "true",
        explanation: 'Return true because "leetcode" can be segmented as "leet code".'
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: "true",
        explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple". Note that words can be reused.'
      }
    ],
    constraints: [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20",
      "s and wordDict[i] consist of only lowercase English letters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    // Write your code here
    return false;
}`,
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        # Write your code here
        return False`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // Write your code here
        return false;
    }
};`,
      java: `import java.util.List;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // Write your code here
        return false;
    }
}`
    },
    testCases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', expected: "true" },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', expected: "false" }
    ]
  },
  {
    id: 11,
    title: "Palindrome Number",
    slug: "palindrome-number",
    difficulty: "EASY",
    topic: "Math",
    stage: 2,
    order: 1,
    acceptanceRate: "55.8%",
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.\nFor example, \`121\` is a palindrome while \`123\` is not.`,
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        input: "x = 10",
        output: "false",
        explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
      }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Write your code here
    return false;
}`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        # Write your code here
        return False`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Write your code here
        return false;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
        return false;
    }
}`
    },
    testCases: [
      { input: "x = 121", expected: "true" },
      { input: "x = -121", expected: "false" },
      { input: "x = 10", expected: "false" }
    ]
  }
];
