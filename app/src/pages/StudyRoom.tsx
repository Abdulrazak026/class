import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessagesSquare, TrendingUp, Wifi, WifiOff, Code, Database, Calculator, Play, CheckCircle2, XCircle, RotateCcw, Lightbulb, BookOpen, ChevronRight, Terminal, Timer, Filter, BarChart3, Trophy } from 'lucide-react';
import { Module } from '../data';
import { ChatMessage } from '../firebase/services';
import { hasFirebaseConfig } from '../firebase/config';
import { executePython } from '../utils/pythonExecutor';
import { executeSQL, DmlResult } from '../utils/sqlExecutor';
import { SpreadsheetRunner } from '../components/SpreadsheetRunner';
import { evaluateFormula, createDefaultData } from '../utils/spreadsheetEngine';

interface StudyRoomProps {
  completedTasks: string[];
  completedTasksOwn: string[];
  completedTasksOther: string[];
  otherUserCode: string;
  curriculum: Module[];
  onlineMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  userCode: string;
  onOpen?: () => void;
}

type PracticeTab = 'chat' | 'python' | 'sql' | 'excel';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterCode: string;
  hint: string;
  verify: (output: string) => boolean;
  expectedOutput?: string;
}

function runPython(code: string): string[] {
  const outputs = executePython(code);
  return outputs.map(o => o.text);
}

const CHALLENGES: Record<Exclude<PracticeTab, 'chat'>, Challenge[]> = {
  python: [
    {
      id: 'py1', title: 'Sales Tax Calculator', difficulty: 'Beginner',
      description: 'A store sells items at $29.99 each. Write code to calculate the total cost for 5 items with 8% sales tax.\n\nExpected output: The total (including tax) for 5 items at $29.99 each',
      starterCode: '# Calculate total with tax\nprice = 29.99\nquantity = 5\ntax_rate = 0.08\n\n# Your code here\n',
      hint: 'total = price * quantity * (1 + tax_rate)',
      verify: (out) => out.includes('161.95') || out.includes('161.94'),
      expectedOutput: '161.946'
    },
    {
      id: 'py2', title: 'Employee Bonus Calculator', difficulty: 'Beginner',
      description: 'Employees with more than 5 years get a 15% bonus. Those with 3-5 years get 10%. Others get 5%.\nWrite code using if/elif/else to calculate the bonus for an employee with 7 years and salary $65,000.',
      starterCode: 'years = 7\nsalary = 65000\n\n# Calculate bonus based on years\n',
      hint: 'if years > 5: bonus = salary * 0.15',
      verify: (out) => out.includes('9750'),
    },
    {
      id: 'py3', title: 'Data Cleaning: Fix Prices', difficulty: 'Beginner',
      description: 'A list of prices has some items stored as strings with $ signs. Clean the data:\nraw_prices = ["$12.99", "$5.50", "$24.00", "$8.75"]\nConvert each to a float and print the total.',
      starterCode: 'raw_prices = ["$12.99", "$5.50", "$24.00", "$8.75"]\n\n# Clean and sum\n',
      hint: 'Use .replace("$", "") then float()',
      verify: (out) => out.includes('51.24'),
    },
    {
      id: 'py4', title: 'Customer Segmentation', difficulty: 'Intermediate',
      description: 'Given customer data, segment them:\ncustomers = [\n  {"name": "Alice", "spent": 3200},\n  {"name": "Bob", "spent": 800},\n  {"name": "Charlie", "spent": 1500}\n]\nPrint "Premium" for spent > 2000, "Standard" for > 1000, "Basic" otherwise.',
      starterCode: 'customers = [\n  {"name": "Alice", "spent": 3200},\n  {"name": "Bob", "spent": 800},\n  {"name": "Charlie", "spent": 1500}\n]\n\n# Segment each customer\n',
      hint: 'Use a for loop with if/elif/else',
      verify: (out) => out.includes('Premium') && out.includes('Standard') && out.includes('Basic'),
    },
    {
      id: 'py5', title: 'Running Total', difficulty: 'Intermediate',
      description: 'Calculate running total of daily sales: [450, 320, 510, 280, 390]\nPrint the cumulative total after each day.',
      starterCode: 'daily_sales = [450, 320, 510, 280, 390]\n\n# Calculate and print running total\n',
      hint: 'total = 0; for s in daily_sales: total += s',
      verify: (out) => out.includes('450') && out.includes('1950'),
    },
    {
      id: 'py6', title: 'Email Validator', difficulty: 'Intermediate',
      description: 'Write code that checks if an email has "@" and "." after the @.\nTest with: email = "alice@example.com" and email = "bademail.com"',
      starterCode: 'def is_valid_email(email):\n  # Your code here\n  return False\n\nprint(is_valid_email("alice@example.com"))\nprint(is_valid_email("bademail.com"))\n',
      hint: 'Use .find("@") and .find(".", at_pos)',
      verify: (out) => out.includes('True') && out.includes('False'),
    },
    {
      id: 'py7', title: 'Moving Average', difficulty: 'Advanced',
      description: 'Calculate a 3-day moving average for stock prices:\nprices = [100, 102, 104, 103, 101, 105, 107]\nPrint each rolling average.',
      starterCode: 'prices = [100, 102, 104, 103, 101, 105, 107]\n\n# 3-day moving average\n',
      hint: 'for i in range(len(prices)-2): avg = sum(prices[i:i+3])/3',
      verify: (out) => out.includes('102') && out.includes('104.33'),
    },
    {
      id: 'py8', title: 'Word Frequency Counter', difficulty: 'Advanced',
      description: 'Count word frequency in: "the cat and the dog and the bird"\nPrint each word and its count.',
      starterCode: 'text = "the cat and the dog and the bird"\n\n# Count word frequencies\n',
      hint: 'Split the text, use a dictionary to count',
      verify: (out) => out.includes('the: 3') || out.includes('the:3'),
    },
    {
      id: 'py9', title: 'FizzBuzz', difficulty: 'Intermediate',
      description: 'Print numbers 1 to 20. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for both print "FizzBuzz".',
      starterCode: 'for i in range(1, 21):\n    # Your code here\n    pass\n',
      hint: 'Use % operator: i % 3 == 0 for multiples of 3',
      verify: (out) => out.includes('Fizz') && out.includes('Buzz') && out.includes('FizzBuzz'),
    },
    {
      id: 'py10', title: 'List Comprehension Squared', difficulty: 'Intermediate',
      description: 'Use list comprehension to create a list of squares for numbers 1-10. Print the result.\nExpected: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]',
      starterCode: '# List comprehension\nsquares = [x**2 for x in range(1, 11)]\nprint(squares)\n',
      hint: '[expression for item in iterable]',
      verify: (out) => out.includes('100') && out.includes('25'),
    },
    {
      id: 'py11', title: 'Merge Two Sorted Lists', difficulty: 'Advanced',
      description: 'Merge [1, 3, 5, 7] and [2, 4, 6, 8] into a single sorted list.\nExpected: [1, 2, 3, 4, 5, 6, 7, 8]',
      starterCode: 'a = [1, 3, 5, 7]\nb = [2, 4, 6, 8]\n\n# Merge and print\n',
      hint: 'Use two pointers or sorted(a + b)',
      verify: (out) => out.includes('1, 2, 3, 4, 5, 6, 7, 8') || out.includes('[1, 2, 3, 4, 5, 6, 7, 8]'),
    },
    {
      id: 'py12', title: 'Factorial Calculator', difficulty: 'Intermediate',
      description: 'Write code to calculate factorial of 7 (7!).\nExpected: 5040',
      starterCode: 'def factorial(n):\n    # Your code\n    pass\n\nprint(factorial(7))\n',
      hint: 'factorial(n) = n * factorial(n-1) with base case n <= 1',
      verify: (out) => out.includes('5040'),
    },
    {
      id: 'py13', title: 'Palindrome Checker', difficulty: 'Intermediate',
      description: 'Write a function that checks if a word reads the same forwards and backwards.\nTest with: "racecar", "hello", "madam"',
      starterCode: 'def is_palindrome(word):\n    # Your code\n    pass\n\nprint(is_palindrome("racecar"))\nprint(is_palindrome("hello"))\nprint(is_palindrome("madam"))\n',
      hint: 'Compare word with word[::-1] (reverse slicing)',
      verify: (out) => out.includes('True') && out.includes('False') && out.includes('True'),
    },
    {
      id: 'py14', title: 'Stock Profit Calculator', difficulty: 'Intermediate',
      description: 'You bought 150 shares at $45 each and sold at $62 each. Calculate total profit (ignoring fees).',
      starterCode: 'shares = 150\nbuy_price = 45\nsell_price = 62\n\n# Calculate profit\n',
      hint: 'profit = shares * (sell_price - buy_price)',
      verify: (out) => out.includes('2550'),
    },
    {
      id: 'py15', title: 'Duplicate Finder', difficulty: 'Advanced',
      description: 'Find all duplicate values in a list: [10, 20, 30, 20, 40, 10, 50, 30]\nPrint only the duplicate values (each once).',
      starterCode: 'numbers = [10, 20, 30, 20, 40, 10, 50, 30]\n\n# Find and print duplicates\n',
      hint: 'Use a set to track seen items, another set for duplicates',
      verify: (out) => out.includes('10') && out.includes('20') && out.includes('30'),
    },
    {
      id: 'py16', title: 'Simple Linear Regression', difficulty: 'Advanced',
      description: 'Given hours studied and test scores, calculate the slope and intercept of the best-fit line:\nhours = [1, 2, 3, 4, 5]\nscores = [50, 55, 65, 70, 75]\nPrint slope and intercept.',
      starterCode: 'hours = [1, 2, 3, 4, 5]\nscores = [50, 55, 65, 70, 75]\n\n# Calculate slope and intercept\n# slope = sum((x - mean_x)*(y - mean_y)) / sum((x - mean_x)**2)\n# intercept = mean_y - slope * mean_x\n',
      hint: 'Follow the formulas: slope = covariance / variance of x',
      verify: (out) => out.includes('6.5') && out.includes('44.5') || out.includes('6.5') && out.includes('44') || out.includes('6') && out.includes('44'),
    },
    {
      id: 'py17', title: 'CSV Parser', difficulty: 'Advanced',
      description: 'Parse this CSV-like string and print the total sales:\ndata = """Product,Qty,Price\nWidget A,10,25\nWidget B,5,50\nWidget C,8,30"""',
      starterCode: 'data = """Product,Qty,Price\nWidget A,10,25\nWidget B,5,50\nWidget C,8,30"""\n\n# Parse and calculate total sales\n',
      hint: 'Split by newlines, then by commas. Total = sum(qty * price)',
      verify: (out) => out.includes('740') || out.includes('650'),
    },
    {
      id: 'py18', title: 'Data Normalizer', difficulty: 'Intermediate',
      description: 'Normalize this dataset to 0-1 range: [12, 45, 67, 23, 89, 34, 56]\nFormula: (x - min) / (max - min)',
      starterCode: 'data = [12, 45, 67, 23, 89, 34, 56]\n\n# Normalize to 0-1 range\n',
      hint: 'Find min and max, then apply (x - min) / (max - min) to each element',
      verify: (out) => out.includes('0') && out.includes('1'),
    },
  ],
  sql: [
    {
      id: 'sql1', title: 'Find High-Paid Employees', difficulty: 'Beginner',
      description: 'Find all employees with salary greater than 70,000. Show their name and salary.',
      starterCode: 'SELECT name, salary FROM employees WHERE salary > 70000',
      hint: 'Use SELECT with WHERE clause',
      verify: (out) => out.includes('75000') && out.includes('82000') && out.includes('90000'),
    },
    {
      id: 'sql2', title: 'Department Employee Count', difficulty: 'Beginner',
      description: 'Count how many employees are in each department. Show department_id and count.',
      starterCode: 'SELECT department_id, COUNT(*) FROM employees GROUP BY department_id',
      hint: 'Use GROUP BY with COUNT',
      verify: (out) => out.includes('3') || out.includes('2'),
    },
    {
      id: 'sql3', title: 'Top 3 Salaries', difficulty: 'Beginner',
      description: 'Find the top 3 highest paid employees. Show name and salary ordered from highest to lowest.',
      starterCode: 'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3',
      hint: 'Use ORDER BY DESC with LIMIT',
      verify: (out) => out.includes('90000') && out.includes('82000'),
    },
    {
      id: 'sql4', title: 'Employees with Department Names', difficulty: 'Intermediate',
      description: 'Join employees with departments to show: employee name, department name, and salary.',
      starterCode: 'SELECT e.name, d.name AS department, e.salary FROM employees e JOIN departments d ON e.department_id = d.id',
      hint: 'Use JOIN to combine tables',
      verify: (out) => out.includes('Engineering') && out.includes('Marketing'),
    },
    {
      id: 'sql5', title: 'Average Salary by Department', difficulty: 'Intermediate',
      description: 'Calculate average salary for each department using a JOIN. Show department name and average salary.',
      starterCode: 'SELECT d.name, AVG(e.salary) FROM employees e JOIN departments d ON e.department_id = d.id GROUP BY d.name',
      hint: 'JOIN then GROUP BY with AVG',
      verify: (out) => out.includes('Engineering') && (out.includes('82333') || out.includes('82334')),
    },
    {
      id: 'sql6', title: 'Customer Order Analysis', difficulty: 'Advanced',
      description: 'Find customers who have spent more than $200 total. Show customer name and total amount.',
      starterCode: 'SELECT customer, SUM(CAST(amount AS DECIMAL)) AS total_spent FROM orders GROUP BY customer HAVING total_spent > 200',
      hint: 'Use GROUP BY with HAVING',
      verify: (out) => out.includes('389.98') || out.includes('Alice') || out.includes('Bob'),
    },
    {
      id: 'sql7', title: 'Self-Join: Coworkers', difficulty: 'Advanced',
      description: 'Find employees who share the same department. Show employee name and coworker name (excluding self). Use a self-join.',
      starterCode: 'SELECT e1.name AS employee, e2.name AS coworker FROM employees e1 JOIN employees e2 ON e1.department_id = e2.department_id WHERE e1.id != e2.id ORDER BY e1.name',
      hint: 'Self-join with different aliases, exclude same employee',
      verify: (out) => out.includes('Alice') && out.includes('Charlie') && out.includes('Frank'),
    },
    {
      id: 'sql8', title: 'CASE Salary Bands', difficulty: 'Intermediate',
      description: 'Create salary bands: "High" (>80000), "Medium" (50001-80000), "Low" (<=50000). Show name, salary, and band.',
      starterCode: "SELECT name, salary, CASE WHEN salary > 80000 THEN 'High' WHEN salary > 50000 THEN 'Medium' ELSE 'Low' END AS band FROM employees",
      hint: 'CASE WHEN condition THEN result ELSE default END',
      verify: (out) => out.includes('High') && out.includes('Medium') && out.includes('Frank'),
    },
    {
      id: 'sql9', title: 'Running Total with Window', difficulty: 'Advanced',
      description: 'Show employees ordered by salary ascending with a running total column.',
      starterCode: 'SELECT name, salary, SUM(salary) OVER (ORDER BY salary) AS running_total FROM employees ORDER BY salary',
      hint: 'SUM(salary) OVER (ORDER BY salary) creates a running total',
      verify: (out) => out.includes('65000') && out.includes('133000') || out.includes('68000') && out.includes('133000'),
    },
    {
      id: 'sql10', title: 'Department Budget Usage', difficulty: 'Intermediate',
      description: 'Show each department name, its total salary expense, and its budget. Calculate what percentage of the budget is used.',
      starterCode: 'SELECT d.name, SUM(e.salary) AS total_salary, d.budget, ROUND(SUM(e.salary) * 100.0 / d.budget, 1) AS pct_used FROM employees e JOIN departments d ON e.department_id = d.id GROUP BY d.name, d.budget ORDER BY pct_used DESC',
      hint: 'SUM(employee salaries) / department budget * 100',
      verify: (out) => out.includes('Engineering') && out.includes('49.4'),
    },
    {
      id: 'sql11', title: 'Employees Hired Per Year', difficulty: 'Beginner',
      description: 'Count how many employees were hired each year. Show year and count sorted by year.',
      starterCode: "SELECT strftime('%Y', hire_date) AS year, COUNT(*) AS hires FROM employees GROUP BY year ORDER BY year",
      hint: 'Use strftime to extract year from date, then GROUP BY',
      verify: (out) => out.includes('2021') || out.includes('2'),
    },
    {
      id: 'sql12', title: 'First and Last Order Dates', difficulty: 'Intermediate',
      description: 'For each customer, show their first and last order date along with total amount spent.',
      starterCode: 'SELECT customer, MIN(order_date) AS first_order, MAX(order_date) AS last_order, SUM(amount) AS total_spent FROM orders GROUP BY customer',
      hint: 'MIN/MAX on dates, SUM on amounts, GROUP BY customer',
      verify: (out) => out.includes('Alice') || out.includes('Bob') || out.includes('Charlie'),
    },
    {
      id: 'sql13', title: 'Products Never Ordered', difficulty: 'Intermediate',
      description: 'Find products that have never been ordered. Use a LEFT JOIN with NULL check.',
      starterCode: 'SELECT p.id, p.name FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id WHERE oi.product_id IS NULL',
      hint: 'LEFT JOIN + WHERE right_table.id IS NULL finds non-matching rows',
      verify: (out) => out.length > 0,
    },
    {
      id: 'sql14', title: 'Moving Average of Sales', difficulty: 'Advanced',
      description: 'Calculate a 3-day moving average of order amounts using window functions.',
      starterCode: 'SELECT order_date, amount, AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg FROM orders ORDER BY order_date',
      hint: 'AVG OVER with ROWS BETWEEN frame clause for moving average',
      verify: (out) => out.includes('avg') || out.includes('moving'),
    },
    {
      id: 'sql15', title: 'Employee Department Rank', difficulty: 'Advanced',
      description: 'Rank employees by salary within their department and show the rank alongside their name, department, and salary.',
      starterCode: 'SELECT e.name, d.name AS department, e.salary, RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS salary_rank FROM employees e JOIN departments d ON e.department_id = d.id',
      hint: 'RANK() OVER (PARTITION BY department ORDER BY salary DESC)',
      verify: (out) => out.includes('Engineering') && out.includes('1'),
    },
    {
      id: 'sql16', title: 'Monthly Sales Growth', difficulty: 'Advanced',
      description: 'Show monthly sales with the previous month\'s sales and the percentage change using LAG.',
      starterCode: "SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS sales, LAG(SUM(amount)) OVER (ORDER BY strftime('%Y-%m', order_date)) AS prev_sales, ROUND((SUM(amount) - LAG(SUM(amount)) OVER (ORDER BY strftime('%Y-%m', order_date))) * 100.0 / LAG(SUM(amount)) OVER (ORDER BY strftime('%Y-%m', order_date)), 1) AS pct_change FROM orders GROUP BY month ORDER BY month",
      hint: 'Use LAG to get previous month sales, then calculate growth %',
      verify: (out) => out.includes('%') || out.includes('sales'),
    },
  ],
  excel: [
    {
      id: 'xl1', title: 'SUM Formula', difficulty: 'Beginner',
      description: 'Use =SUM(C2:C6) to total all prices in column C.\nExpected result: 82',
      starterCode: '=SUM(C2:C6)',
      hint: 'Type =SUM(C2:C6) in a cell',
      verify: (out) => out.includes('82'),
    },
    {
      id: 'xl2', title: 'AVERAGE Function', difficulty: 'Beginner',
      description: 'Calculate the average of values in C2:C6.\nExpected result: 16.4',
      starterCode: '=AVERAGE(C2:C6)',
      hint: 'Use =AVERAGE(range)',
      verify: (out) => out.includes('16.4'),
    },
    {
      id: 'xl3', title: 'IF Statement', difficulty: 'Intermediate',
      description: 'Return "High" if C2 > 15, else "Low". C2 = 10.\nExpected: "Low"',
      starterCode: '=IF(C2>15,"High","Low")',
      hint: 'IF(logical_test, value_if_true, value_if_false)',
      verify: (out) => out.includes('Low'),
    },
    {
      id: 'xl4', title: 'MAX and MIN', difficulty: 'Beginner',
      description: 'Find the maximum and minimum price in C2:C6.\nExpected: MAX=25, MIN=10',
      starterCode: '=MAX(C2:C6)',
      hint: '=MAX(range) and =MIN(range)',
      verify: (out) => out.includes('25'),
    },
    {
      id: 'xl5', title: 'COUNT Numbers', difficulty: 'Beginner',
      description: 'Count how many numeric prices are in C2:C6.\nExpected: 5',
      starterCode: '=COUNT(C2:C6)',
      hint: 'COUNT counts numeric cells',
      verify: (out) => out.includes('5'),
    },
    {
      id: 'xl6', title: 'VLOOKUP Lookup', difficulty: 'Advanced',
      description: 'Use VLOOKUP to find the price of "Bananas" in B2:C6.\nExpected: 20',
      starterCode: '=VLOOKUP("Bananas",B2:C6,2)',
      hint: 'VLOOKUP(lookup_value, table_array, col_index)',
      verify: (out) => out.includes('20'),
    },
    {
      id: 'xl7', title: 'ROUND Function', difficulty: 'Intermediate',
      description: 'Round the result of =SUM(C2:C6)/3 to 1 decimal place.\nSum of C2:C6 is 82. 82/3 = 27.333...\nExpected: 27.3',
      starterCode: '=ROUND(SUM(C2:C6)/3,1)',
      hint: 'ROUND(number, num_digits)',
      verify: (out) => out.includes('27.3'),
    },
    {
      id: 'xl8', title: 'Nested IF', difficulty: 'Advanced',
      description: 'Return "High" if C2 > 20, "Mid" if C2 > 10, else "Low". C2 = 10.\nExpected: "Low"',
      starterCode: '=IF(C2>20,"High",IF(C2>10,"Mid","Low"))',
      hint: 'Nest IF statements inside each other',
      verify: (out) => out.includes('Low'),
    },
    {
      id: 'xl9', title: 'Total Revenue Formula', difficulty: 'Intermediate',
      description: 'Create a formula that multiplies Price x Qty for each row, then sums them.\nExpected: 193 (10*3 + 20*2 + 15*5 + 25*1 + 12*4)',
      starterCode: '=C2*D2+C3*D3+C4*D4+C5*D5+C6*D6',
      hint: 'Multiply each Price by its Qty, then add all results',
      verify: (out) => out.includes('193'),
    },
    {
      id: 'xl10', title: 'COUNTIF Formula', difficulty: 'Intermediate',
      description: 'Count how many products in B2:B6 have a price in C2:C6 greater than 15.\nExpected: 2 (Bananas=20, Grapes=25)',
      starterCode: '=COUNTIF(C2:C6,">15")',
      hint: 'COUNTIF(range, criteria) counts cells meeting a condition',
      verify: (out) => out.includes('2'),
    },
    {
      id: 'xl11', title: 'SUMIF by Category', difficulty: 'Intermediate',
      description: 'Sum the prices in C2:C6 where the product in B2:B6 contains "Apple".\nData: B2=Apple, C2=10; B3=Banana, C3=20; B4=Apple, C4=15',
      starterCode: '=SUMIF(B2:B6,"Apple",C2:C6)',
      hint: 'SUMIF(criteria_range, criteria, sum_range)',
      verify: (out) => out.includes('25') || out.includes('10'),
    },
    {
      id: 'xl12', title: 'CONCATENATE Names', difficulty: 'Beginner',
      description: 'Combine first name in A2 and last name in B2 into full name.\nA2=John, B2=Smith\nExpected: John Smith',
      starterCode: '=A2&" "&B2',
      hint: 'Use & operator to join text with a space',
      verify: (out) => out.includes('John Smith'),
    },
    {
      id: 'xl13', title: 'TODAY Date Function', difficulty: 'Beginner',
      description: 'Use the TODAY function to show today\'s date.\nThen create a formula that calculates days until Christmas (Dec 25).',
      starterCode: '=DATE(2026,12,25)-TODAY()',
      hint: 'DATE(year, month, day) - TODAY() gives days until a date',
      verify: (out) => !isNaN(parseInt(out)) && parseInt(out) >= 200,
    },
    {
      id: 'xl14', title: 'INDEX-MATCH Lookup', difficulty: 'Advanced',
      description: 'Use INDEX and MATCH to find the price of "Bananas" in B2:C6.\nINDEX-MATCH is more flexible than VLOOKUP.',
      starterCode: '=INDEX(C2:C6,MATCH("Bananas",B2:B6,0))',
      hint: 'INDEX(array, MATCH(lookup_value, lookup_array, 0))',
      verify: (out) => out.includes('20'),
    },
    {
      id: 'xl15', title: 'Calculated Discount', difficulty: 'Intermediate',
      description: 'If quantity (D2) >= 10, apply 10% discount to subtotal (C2*D2), otherwise no discount.\nC2=25, D2=12\nExpected: 270 (300 - 10%)',
      starterCode: '=IF(D2>=10,C2*D2*0.9,C2*D2)',
      hint: 'IF condition, apply discount formula, else full price',
      verify: (out) => out.includes('270'),
    },
  ],
};

const challengeTabs: { id: PracticeTab; label: string; icon: React.ReactNode }[] = [
  { id: 'chat', label: 'Chat', icon: <MessagesSquare className="w-4 h-4" /> },
  { id: 'python', label: 'Python', icon: <Code className="w-4 h-4" /> },
  { id: 'sql', label: 'SQL', icon: <Database className="w-4 h-4" /> },
  { id: 'excel', label: 'Excel', icon: <Calculator className="w-4 h-4" /> },
];

type DifficultyFilter = 'all' | 'Beginner' | 'Intermediate' | 'Advanced';

const STORAGE_KEY = 'studychallenge_completed';

function loadCompleted(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function saveCompleted(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function StudyRoom({ completedTasks, completedTasksOwn, completedTasksOther, otherUserCode, curriculum, onlineMessages, onSendMessage, userCode, onOpen }: StudyRoomProps) {
  const [activeTab, setActiveTab] = useState<PracticeTab>('chat');
  const [input, setInput] = useState('');
  const chatEnd = useRef<HTMLDivElement>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState<string[]>([]);
  const [challengeResult, setChallengeResult] = useState<'none' | 'pass' | 'fail'>('none');
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>(loadCompleted);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { onOpen?.(); }, [onOpen]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [onlineMessages, chatEnd]);

  useEffect(() => {
    saveCompleted(solvedChallenges);
  }, [solvedChallenges]);

  const sendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const allTopics = curriculum.flatMap(m => m.topics);
  const progressPct = Math.round((completedTasks.length / allTopics.length) * 100);

  const solvedCount = solvedChallenges.filter(id => id.startsWith(activeTab)).length;
  const totalCount = (CHALLENGES[activeTab] || []).length;
  const challengeStats = {
    python: solvedChallenges.filter(id => id.startsWith('py')).length,
    sql: solvedChallenges.filter(id => id.startsWith('sql')).length,
    excel: solvedChallenges.filter(id => id.startsWith('xl')).length,
  };

  const filteredChallenges = (CHALLENGES[activeTab] || []).filter(
    ch => difficultyFilter === 'all' || ch.difficulty === difficultyFilter
  );



  const renderMessageText = (text: string) => {
    const parts = text.split(/(```(\w*)\n?[\s\S]*?```)/);
    if (parts.length <= 1) return text;
    const result: React.ReactNode[] = [];
    let idx = 0;
    const regex = /```(\w*)\n?([\s\S]*?)```/g;
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) {
        result.push(<span key={idx++}>{text.slice(last, match.index)}</span>);
      }
      const lang = match[1] || 'code';
      const code = match[2].replace(/\n$/, '');
      result.push(
        <div key={idx++} className="my-2 bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border-b border-gray-800">
            <Terminal className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium uppercase">{lang}</span>
          </div>
          <pre className="p-3 overflow-x-auto text-xs font-mono text-gray-200 leading-relaxed">{code}</pre>
        </div>
      );
      last = match.index + match[0].length;
    }
    if (last < text.length) {
      result.push(<span key={idx++}>{text.slice(last)}</span>);
    }
    return result.length > 0 ? result : text;
  };

  const handleSelectChallenge = (ch: Challenge) => {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setCodeOutput([]);
    setChallengeResult('none');
  };

  const handleResetChallenge = () => {
    if (!selectedChallenge) return;
    setCode(selectedChallenge.starterCode);
    setCodeOutput([]);
    setChallengeResult('none');
  };

  const markSolved = (id: string) => {
    if (!solvedChallenges.includes(id)) {
      setSolvedChallenges(prev => [...prev, id]);
    }
  };

  const handleRunPython = () => {
    if (!selectedChallenge) return;
    const outputs = runPython(code);
    setCodeOutput(outputs);
    const full = outputs.join('\n');
    const passed = selectedChallenge.verify(full);
    setChallengeResult(passed ? 'pass' : 'fail');
    if (passed) markSolved(selectedChallenge.id);
  };

  const handleRunSQL = () => {
    if (!selectedChallenge) return;
    const query = code.trim();
    const sqlResult = executeSQL(query);
    let outputs: string[];
    if ('error' in sqlResult) {
      outputs = [sqlResult.error];
    } else if ('command' in sqlResult) {
      outputs = [sqlResult.message];
    } else {
      outputs = sqlResult.rows.map(r => sqlResult.columns.map(c => r[c] ?? '').join('\t'));
      if (outputs.length === 0) outputs = ['No results'];
    }
    setCodeOutput(outputs);
    const passed = selectedChallenge.verify(outputs.join('\n'));
    setChallengeResult(passed ? 'pass' : 'fail');
    if (passed) markSolved(selectedChallenge.id);
  };

  const handleRunExcel = () => {
    if (!selectedChallenge) return;
    const formula = code.trim();
    if (formula.startsWith('=')) {
      const data = createDefaultData();
      try {
        const result = evaluateFormula(formula, data);
        setCodeOutput([String(result)]);
        const passed = selectedChallenge.verify(String(result));
        setChallengeResult(passed ? 'pass' : 'fail');
        if (passed) markSolved(selectedChallenge.id);
      } catch { setCodeOutput(['#ERROR']); setChallengeResult('fail'); }
    } else {
      setCodeOutput([formula]);
      const passed = selectedChallenge.verify(formula);
      setChallengeResult(passed ? 'pass' : 'fail');
      if (passed) markSolved(selectedChallenge.id);
    }
  };

  const handleRunCode = useCallback(() => {
    if (activeTab === 'python') handleRunPython();
    else if (activeTab === 'sql') handleRunSQL();
    else if (activeTab === 'excel') handleRunExcel();
    else setCodeOutput(['Run code to check your answer']);
  }, [code, activeTab, selectedChallenge]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); handleRunCode(); }
  }, [code, activeTab, selectedChallenge]);

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <MessagesSquare className="w-7 h-7 text-accent" />
            Study Room
          </h2>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono ${
            hasFirebaseConfig ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {hasFirebaseConfig ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {hasFirebaseConfig ? 'Online' : 'Local'}
          </div>
        </div>
        <p className="text-gray-500 mt-1">Practice coding, solve challenges, or chat with your study partner.</p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
        {(['python', 'sql', 'excel'] as const).map(lang => {
          const total = (CHALLENGES[lang] || []).length;
          const done = challengeStats[lang];
          return (
            <div key={lang} className="bg-surface border border-border rounded-xl p-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                lang === 'python' ? 'bg-blue-50 text-blue-600' : lang === 'sql' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {lang === 'python' ? <Code className="w-4 h-4" /> : lang === 'sql' ? <Database className="w-4 h-4" /> : <Calculator className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">{lang}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800">{done}/{total}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${
                      lang === 'python' ? 'bg-blue-500' : lang === 'sql' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} style={{ width: `${total ? (done/total)*100 : 0}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 overflow-x-auto">
        {challengeTabs.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedChallenge(null); setCodeOutput([]); setChallengeResult('none'); setDifficultyFilter('all'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-accent text-white shadow-sm' : 'text-slate-600 hover:text-slate-800 hover:bg-deeper'
            }`}>
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Progress
              </h3>
              {/* Combined progress */}
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-800">Combined</span>
                  <span className="text-sm font-mono text-accent font-bold">{progressPct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-2">{completedTasks.length}/{allTopics.length} topics done</p>
              </div>
              {/* Student 1 progress */}
              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-800">You</span>
                  <span className="text-sm font-mono text-blue-600 font-bold">{Math.round((completedTasksOwn.length / allTopics.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${Math.round((completedTasksOwn.length / allTopics.length) * 100)}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{completedTasksOwn.length}/{allTopics.length} topics</p>
              </div>
              {/* Student 2 progress */}
              {otherUserCode ? (
                <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-800">{otherUserCode}</span>
                    <span className="text-sm font-mono text-emerald-600 font-bold">{Math.round((completedTasksOther.length / allTopics.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${Math.round((completedTasksOther.length / allTopics.length) * 100)}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{completedTasksOther.length}/{allTopics.length} topics</p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-slate-50/50 border border-slate-200">
                  <p className="text-xs text-slate-400 text-center py-1">Waiting for partner to join...</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-surface border border-border rounded-xl flex flex-col h-[500px] lg:h-[600px] shadow-sm">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${hasFirebaseConfig ? 'bg-green-500' : 'bg-amber-500'}`} />
              <span className="text-sm font-bold text-slate-800">Live Chat</span>
              <span className="text-xs text-slate-400">{onlineMessages.length} messages</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {onlineMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <MessagesSquare className="w-12 h-12 mb-3 text-slate-200" />
                  <p className="font-medium">No messages yet</p>
                  <p className="text-xs mt-1">Start a conversation with your study partner!</p>
                </div>
              )}
              {onlineMessages.map((msg, i) => {
                const isOwn = msg.user === userCode;
                return (
                <div key={i} className="flex gap-3">
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${isOwn ? 'bg-accent' : 'bg-emerald-500'}`}>
                    {msg.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700">{isOwn ? 'You' : msg.user}</span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <div className={`p-3 rounded-xl text-sm ${isOwn ? 'bg-accent/5 border border-accent/20 text-slate-800' : 'bg-emerald-50 border border-emerald-200 text-slate-800'}`}>{renderMessageText(msg.text)}</div>
                  </div>
                </div>
                );
              })}
              <div ref={chatEnd} />
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input className="flex-1 bg-deeper border border-border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
                  value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }} placeholder="Type a message..." />
                <button onClick={sendMessage} className="bg-accent hover:bg-accent-dark text-white px-5 py-3 rounded-xl transition-all font-bold flex items-center gap-2 shadow-sm"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Practice Tabs */}
      {(activeTab === 'python' || activeTab === 'sql' || activeTab === 'excel') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between px-1 mb-3">
              <h3 className="text-sm font-bold text-slate-800">
                {activeTab === 'python' ? 'Python' : activeTab === 'sql' ? 'SQL' : 'Excel'} Challenges
                <span className="text-xs font-normal text-slate-400 ml-2">({filteredChallenges.length})</span>
              </h3>
              <div className="flex gap-1">
                {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map(f => (
                  <button key={f} onClick={() => setDifficultyFilter(f)}
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-all ${
                      difficultyFilter === f ? 'bg-accent text-white' : 'text-slate-400 hover:text-slate-600'
                    }`}>{f === 'all' ? 'All' : f === 'Beginner' ? 'Easy' : f === 'Intermediate' ? 'Med' : 'Hard'}</button>
                ))}
              </div>
            </div>
            {filteredChallenges.map(ch => {
              const solved = solvedChallenges.includes(ch.id);
              return (
              <button key={ch.id} onClick={() => handleSelectChallenge(ch)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedChallenge?.id === ch.id ? 'border-accent bg-accent/5' : 'border-border bg-surface hover:border-accent/30'
                } ${solved ? 'opacity-80' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-semibold ${solved ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {solved && <Trophy className="w-3 h-3 inline mr-1 text-emerald-500" />}
                    {ch.title}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    ch.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' : ch.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>{ch.difficulty}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{ch.description}</p>
              </button>
              );
            })}
            {filteredChallenges.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No challenges match this filter.</div>
            )}
          </div>

          {/* Challenge Detail */}
          <div className="lg:col-span-2 space-y-4">
            {selectedChallenge ? (
              <>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-800">{selectedChallenge.title}</h3>
                        {solvedChallenges.includes(selectedChallenge.id) && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> Solved
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        selectedChallenge.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' : selectedChallenge.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                      }`}>{selectedChallenge.difficulty}</span>
                    </div>
                    <button onClick={() => setSelectedChallenge(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedChallenge.description}</div>
                  {selectedChallenge.hint && (
                    <details className="mt-3 group">
                      <summary className="text-xs text-accent cursor-pointer flex items-center gap-1 hover:text-accent-dark transition-colors"><Lightbulb className="w-3 h-3" /> Hint</summary>
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                        <p className="text-xs text-slate-500 mt-1 p-2 bg-deeper rounded-lg border border-border">{selectedChallenge.hint}</p>
                      </motion.div>
                    </details>
                  )}
                </div>

                {/* Code Editor */}
                <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-deeper to-surface border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        {activeTab === 'python' ? 'Python' : activeTab === 'sql' ? 'SQL' : 'Formula'}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">Ctrl+Enter to run</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleResetChallenge} title="Reset to starter code"
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-all">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={handleRunCode} className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-sm">
                        <Play className="w-3.5 h-3.5" /> Run
                      </button>
                    </div>
                  </div>
                  <textarea ref={textareaRef} value={code} onChange={e => setCode(e.target.value)} onKeyDown={handleKeyDown}
                    className="w-full p-4 text-sm font-mono text-slate-800 bg-deeper focus:outline-none resize-none min-h-[120px]"
                    placeholder={activeTab === 'python' ? '# Write Python code' : activeTab === 'sql' ? '-- Write SQL query' : 'Enter formula like =SUM(C2:C6)...'} />
                </div>

                {/* Live Sheet for Excel Tab */}
                {activeTab === 'excel' && (
                  <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="px-4 py-2 bg-deeper border-b border-border">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Live Sheet</span>
                    </div>
                    <div className="p-3">
                      <SpreadsheetRunner />
                    </div>
                  </div>
                )}

                {/* Output */}
                <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className={`px-4 py-2 border-b border-border flex items-center justify-between ${
                    challengeResult === 'pass' ? 'bg-emerald-50' : challengeResult === 'fail' ? 'bg-red-50' : 'bg-deeper'
                  }`}>
                    <div className="flex items-center gap-2">
                      {challengeResult === 'pass' && <><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span className="text-xs font-bold text-emerald-700">Passed!</span></>}
                      {challengeResult === 'fail' && <><XCircle className="w-4 h-4 text-red-600" /><span className="text-xs font-bold text-red-700">Not quite. Try again!</span></>}
                      {challengeResult === 'none' && <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Output</span>}
                    </div>
                    {challengeResult === 'fail' && (
                      <button onClick={handleResetChallenge} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-white/50 transition-all">
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    )}
                  </div>
                  <div className="p-4 min-h-[80px] max-h-[200px] overflow-y-auto font-mono text-sm text-slate-700 whitespace-pre-wrap">
                    {codeOutput.length > 0 ? codeOutput.map((o, i) => <div key={i}>{o}</div>) : <span className="text-slate-400 italic">Run your code to see output...</span>}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20">
                <BookOpen className="w-16 h-16 mb-4 text-slate-200" />
                <p className="font-medium text-lg">Select a challenge</p>
                <p className="text-sm mt-1">Choose a challenge from the left to start practicing</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
