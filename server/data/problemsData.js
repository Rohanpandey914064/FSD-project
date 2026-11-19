// Mock DSA Problems Dataset for Full-Stack Showcase
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
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in seen:\n                return [seen[complement], i]\n            seen[num] = i\n        return []`,
      cpp: `#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (map.find(complement) != map.end()) {\n                return {map[complement], i};\n            }\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      java: `import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`
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
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    const stack = [];\n    const pairs = { ')': '(', '}': '{', ']': '[' };\n    for (const char of s) {\n        if (char in pairs) {\n            if (stack.pop() !== pairs[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        pairs = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in pairs:\n                if not stack or stack.pop() != pairs[char]:\n                    return False\n            else:\n                stack.append(char)\n        return len(stack) == 0`,
      cpp: `#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    bool isValid(std::string s) {\n        std::stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                if (c == ')' && st.top() != '(') return false;\n                if (c == '}' && st.top() != '{') return false;\n                if (c == ']' && st.top() != '[') return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};`,
      java: `import java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') stack.push(c);\n            else {\n                if (stack.isEmpty()) return false;\n                if (c == ')' && stack.pop() != '(') return false;\n                if (c == '}' && stack.pop() != '{') return false;\n                if (c == ']' && stack.pop() != '[') return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}`
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
      javascript: `class MinStack {\n    constructor() {\n        this.stack = [];\n        this.minStack = [];\n    }\n    push(val) {\n        this.stack.push(val);\n        if (!this.minStack.length || val <= this.getMin()) {\n            this.minStack.push(val);\n        }\n    }\n    pop() {\n        const val = this.stack.pop();\n        if (val === this.getMin()) {\n            this.minStack.pop();\n        }\n    }\n    top() {\n        return this.stack[this.stack.length - 1];\n    }\n    getMin() {\n        return this.minStack[this.minStack.length - 1];\n    }\n}`,
      python: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        if not self.min_stack or val <= self.min_stack[-1]:\n            self.min_stack.append(val)\n    def pop(self) -> None:\n        if self.stack.pop() == self.min_stack[-1]:\n            self.min_stack.pop()\n    def top(self) -> int:\n        return self.stack[-1]\n    def getMin(self) -> int:\n        return self.min_stack[-1]`,
      cpp: `#include <stack>\n\nclass MinStack {\n    std::stack<int> s;\n    std::stack<int> minS;\npublic:\n    MinStack() {}\n    void push(int val) {\n        s.push(val);\n        if (minS.empty() || val <= minS.top()) minS.push(val);\n    }\n    void pop() {\n        if (s.top() == minS.top()) minS.pop();\n        s.pop();\n    }\n    int top() { return s.top(); }\n    int getMin() { return minS.top(); }\n};`,
      java: `import java.util.Stack;\n\nclass MinStack {\n    private Stack<Integer> s = new Stack<>();\n    private Stack<Integer> minS = new Stack<>();\n    public MinStack() {}\n    public void push(int val) {\n        s.push(val);\n        if (minS.isEmpty() || val <= minS.peek()) minS.push(val);\n    }\n    public void pop() {\n        if (s.pop().equals(minS.peek())) minS.pop();\n    }\n    public int top() { return s.peek(); }\n    public int getMin() { return minS.peek(); }\n}`
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
      javascript: `function maxProfit(prices) {\n    let minPrice = Infinity;\n    let maxProfit = 0;\n    for (const p of prices) {\n        if (p < minPrice) minPrice = p;\n        else if (p - minPrice > maxProfit) maxProfit = p - minPrice;\n    }\n    return maxProfit;\n}`,
      python: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_p = float('inf')\n        max_p = 0\n        for p in prices:\n            if p < min_p:\n                min_p = p\n            elif p - min_p > max_p:\n                max_p = p - min_p\n        return max_p`,
      cpp: `#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int maxProfit(std::vector<int>& prices) {\n        int minP = 1e9, maxP = 0;\n        for (int p : prices) {\n            minP = std::min(minP, p);\n            maxP = std::max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxP) maxP = p - minP;\n        }\n        return maxP;\n    }\n}`
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
      javascript: `function search(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return -1`,
      cpp: `#include <vector>\n\nclass Solution {\npublic:\n    int search(std::vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}`
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
      javascript: `function reverseList(head) {\n    let prev = null, curr = head;\n    while (curr) {\n        const next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      python: `class Solution:\n    def reverseList(self, head):\n        prev = None\n        curr = head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n};`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n}`
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
      javascript: `function merge(intervals) {\n    if (!intervals.length) return [];\n    intervals.sort((a, b) => a[0] - b[0]);\n    const res = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        const last = res[res.length - 1];\n        if (intervals[i][0] <= last[1]) {\n            last[1] = Math.max(last[1], intervals[i][1]);\n        } else {\n            res.push(intervals[i]);\n        }\n    }\n    return res;\n}`,
      python: `class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        intervals.sort(key=lambda x: x[0])\n        merged = []\n        for interval in intervals:\n            if not merged or merged[-1][1] < interval[0]:\n                merged.append(interval)\n            else:\n                merged[-1][1] = max(merged[-1][1], interval[1])\n        return merged`,
      cpp: `#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {\n        std::sort(intervals.begin(), intervals.end());\n        std::vector<std::vector<int>> merged;\n        for (const auto& i : intervals) {\n            if (merged.empty() || merged.back()[1] < i[0]) merged.push_back(i);\n            else merged.back()[1] = std::max(merged.back()[1], i[1]);\n        }\n        return merged;\n    }\n};`,
      java: `import java.util.Arrays;\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> merged = new ArrayList<>();\n        for (int[] interval : intervals) {\n            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {\n                merged.add(interval);\n            } else {\n                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);\n            }\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}`
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
      javascript: `function trap(height) {\n    let left = 0, right = height.length - 1;\n    let maxL = 0, maxR = 0, total = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= maxL) maxL = height[left];\n            else total += maxL - height[left];\n            left++;\n        } else {\n            if (height[right] >= maxR) maxR = height[right];\n            else total += maxR - height[right];\n            right--;\n        }\n    }\n    return total;\n}`,
      python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_l = max_r = total = 0\n        while l < r:\n            if height[l] < height[r]:\n                if height[l] >= max_l: max_l = height[l]\n                else: total += max_l - height[l]\n                l += 1\n            else:\n                if height[r] >= max_r: max_r = height[r]\n                else: total += max_r - height[r]\n                r -= 1\n        return total`,
      cpp: `#include <vector>\n\nclass Solution {\npublic:\n    int trap(std::vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int maxL = 0, maxR = 0, total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= maxL) maxL = height[l];\n                else total += maxL - height[l];\n                l++;\n            } else {\n                if (height[r] >= maxR) maxR = height[r];\n                else total += maxR - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n};`,
      java: `class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1;\n        int maxL = 0, maxR = 0, total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= maxL) maxL = height[l];\n                else total += maxL - height[l];\n                l++;\n            } else {\n                if (height[r] >= maxR) maxR = height[r];\n                else total += maxR - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n}`
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
      javascript: `class LRUCache {\n    constructor(capacity) {\n        this.capacity = capacity;\n        this.cache = new Map();\n    }\n    get(key) {\n        if (!this.cache.has(key)) return -1;\n        const val = this.cache.get(key);\n        this.cache.delete(key);\n        this.cache.set(key, val);\n        return val;\n    }\n    put(key, value) {\n        if (this.cache.has(key)) {\n            this.cache.delete(key);\n        } else if (this.cache.size >= this.capacity) {\n            const firstKey = this.cache.keys().next().value;\n            this.cache.delete(firstKey);\n        }\n        this.cache.set(key, value);\n    }\n}`,
      python: `from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)`,
      cpp: `#include <unordered_map>\n#include <list>\n\nclass LRUCache {\n    int cap;\n    std::list<std::pair<int, int>> lru;\n    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> map;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) {\n        if (map.find(key) == map.end()) return -1;\n        lru.splice(lru.begin(), lru, map[key]);\n        return map[key]->second;\n    }\n    void put(int key, int value) {\n        if (map.find(key) != map.end()) {\n            lru.splice(lru.begin(), lru, map[key]);\n            map[key]->second = value;\n            return;\n        }\n        if (lru.size() == cap) {\n            map.erase(lru.back().first);\n            lru.pop_back();\n        }\n        lru.push_front({key, value});\n        map[key] = lru.begin();\n    }\n};`,
      java: `import java.util.LinkedHashMap;\nimport java.util.Map;\n\nclass LRUCache {\n    private LinkedHashMap<Integer, Integer> map;\n    private int capacity;\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.map = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {\n            protected boolean removeEldestEntry(Map.Entry eldest) {\n                return size() > LRUCache.this.capacity;\n            }\n        };\n    }\n    public int get(int key) {\n        return map.getOrDefault(key, -1);\n    }\n    public void put(int key, int value) {\n        map.put(key, value);\n    }\n}`
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
      javascript: `function wordBreak(s, wordDict) {\n    const set = new Set(wordDict);\n    const dp = new Array(s.length + 1).fill(false);\n    dp[0] = true;\n    for (let i = 1; i <= s.length; i++) {\n        for (let j = 0; j < i; j++) {\n            if (dp[j] && set.has(s.substring(j, i))) {\n                dp[i] = true;\n                break;\n            }\n        }\n    }\n    return dp[s.length];\n}`,
      python: `class Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        words = set(wordDict)\n        dp = [False] * (len(s) + 1)\n        dp[0] = True\n        for i in range(1, len(s) + 1):\n            for j in range(i):\n                if dp[j] and s[j:i] in words:\n                    dp[i] = True\n                    break\n        return dp[len(s)]`,
      cpp: `#include <string>\n#include <vector>\n#include <unordered_set>\n\nclass Solution {\npublic:\n    bool wordBreak(std::string s, std::vector<std::string>& wordDict) {\n        std::unordered_set<std::string> dict(wordDict.begin(), wordDict.end());\n        std::vector<bool> dp(s.length() + 1, false);\n        dp[0] = true;\n        for (int i = 1; i <= s.length(); i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && dict.count(s.substr(j, i - j))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n};`,
      java: `import java.util.HashSet;\nimport java.util.List;\nimport java.util.Set;\n\nclass Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> set = new HashSet<>(wordDict);\n        boolean[] dp = new boolean[s.length() + 1];\n        dp[0] = true;\n        for (int i = 1; i <= s.length(); i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && set.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n}`
    },
    testCases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', expected: "true" },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', expected: "false" }
    ]
  }
];
