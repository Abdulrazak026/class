import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessagesSquare, TrendingUp, Wifi, WifiOff, Code, Database, Calculator, Play, CheckCircle2, XCircle, RotateCcw, Lightbulb, BookOpen, ChevronRight, Terminal, Timer, Filter, BarChart3, Trophy } from 'lucide-react';
import { Module } from '../data';
import { ChatMessage } from '../firebase/services';
import { hasFirebaseConfig } from '../firebase/config';
import { executePython } from '../utils/pythonExecutor';
import { executeSQL } from '../utils/sqlExecutor';
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
      id: 'py1', title: 'Monthly Revenue Trends', difficulty: 'Beginner',
      description: 'A startup tracks monthly revenue for 2025. Calculate: (1) total annual revenue, (2) average monthly revenue, (3) the month with highest revenue.\n\nrevenue = [45000, 52000, 48500, 53000, 61000, 58000, 62500, 59000, 64000, 67000, 72000, 75500]\nmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]',
      starterCode: 'revenue = [45000, 52000, 48500, 53000, 61000, 58000, 62500, 59000, 64000, 67000, 72000, 75500]\nmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]\n\n# Calculate total, average, and highest month\ntotal = sum(revenue)\navg = total / len(revenue)\nmax_rev = max(revenue)\nbest_month = months[revenue.index(max_rev)]\n\nprint(f"Total: {total}")\nprint(f"Average: {avg:.0f}")\nprint(f"Best: {best_month} ({max_rev})")',
      hint: 'Use sum(), max(), len(). Find index of max with .index()',
      verify: (out) => out.includes('717000') && out.includes('59750') && out.includes('Dec') && out.includes('75500'),
      expectedOutput: 'Total: 717000\nAverage: 59750\nBest: Dec (75500)'
    },
    {
      id: 'py2', title: 'Customer Churn Analysis', difficulty: 'Beginner',
      description: 'Analyze customer churn: calculate (1) total customers, (2) number churned, (3) churn rate as percentage.\n\ncustomers = [\n  {"id": 101, "name": "Alice", "status": "active", "plan": "premium"},\n  {"id": 102, "name": "Bob", "status": "churned", "plan": "basic"},\n  {"id": 103, "name": "Charlie", "status": "active", "plan": "premium"},\n  {"id": 104, "name": "Diana", "status": "active", "plan": "basic"},\n  {"id": 105, "name": "Eve", "status": "churned", "plan": "premium"},\n  {"id": 106, "name": "Frank", "status": "active", "plan": "premium"},\n  {"id": 107, "name": "Grace", "status": "churned", "plan": "basic"},\n  {"id": 108, "name": "Hank", "status": "active", "plan": "basic"},\n  {"id": 109, "name": "Ivy", "status": "active", "plan": "premium"},\n  {"id": 110, "name": "Jack", "status": "churned", "plan": "basic"}\n]',
      starterCode: 'customers = [\n  {"id": 101, "name": "Alice", "status": "active", "plan": "premium"},\n  {"id": 102, "name": "Bob", "status": "churned", "plan": "basic"},\n  {"id": 103, "name": "Charlie", "status": "active", "plan": "premium"},\n  {"id": 104, "name": "Diana", "status": "active", "plan": "basic"},\n  {"id": 105, "name": "Eve", "status": "churned", "plan": "premium"},\n  {"id": 106, "name": "Frank", "status": "active", "plan": "premium"},\n  {"id": 107, "name": "Grace", "status": "churned", "plan": "basic"},\n  {"id": 108, "name": "Hank", "status": "active", "plan": "basic"},\n  {"id": 109, "name": "Ivy", "status": "active", "plan": "premium"},\n  {"id": 110, "name": "Jack", "status": "churned", "plan": "basic"}\n]\n\n# Churn analysis\ntotal = len(customers)\nchurned = sum(1 for c in customers if c["status"] == "churned")\nchurn_rate = churned / total * 100\n\nprint(f"Total: {total}")\nprint(f"Churned: {churned}")\nprint(f"Rate: {churn_rate:.1f}%")',
      hint: 'Use list comprehension with sum() to count matching items',
      verify: (out) => out.includes('Total: 10') && out.includes('Churned: 4') && out.includes('40.0%'),
      expectedOutput: 'Total: 10\nChurned: 4\nRate: 40.0%'
    },
    {
      id: 'py3', title: 'Sales Data Cleaning', difficulty: 'Intermediate',
      description: 'A CSV import has messy price data. Some have $ signs, some are missing (None), some have typos. Clean the data:\n1. Remove rows with missing price\n2. Remove $ and convert to float\n3. Flag prices > 1000 as "outlier"\n4. Print cleaned total and count of outliers\n\nraw_data = [\n  {"product": "Widget A", "price": "$25.00", "qty": 10},\n  {"product": "Widget B", "price": None, "qty": 5},\n  {"product": "Widget C", "price": "30.50", "qty": 8},\n  {"product": "Widget D", "price": "$1500.00", "qty": 2},\n  {"product": "Widget E", "price": "12.99", "qty": 20},\n  {"product": "Widget F", "price": None, "qty": 3},\n  {"product": "Widget G", "price": "$45.00", "qty": 7},\n  {"product": "Widget H", "price": "2000.00", "qty": 1},\n  {"product": "Widget I", "price": "$8.75", "qty": 15},\n  {"product": "Widget J", "price": "99.99", "qty": 4}\n]',
      starterCode: 'raw_data = [\n  {"product": "Widget A", "price": "$25.00", "qty": 10},\n  {"product": "Widget B", "price": None, "qty": 5},\n  {"product": "Widget C", "price": "30.50", "qty": 8},\n  {"product": "Widget D", "price": "$1500.00", "qty": 2},\n  {"product": "Widget E", "price": "12.99", "qty": 20},\n  {"product": "Widget F", "price": None, "qty": 3},\n  {"product": "Widget G", "price": "$45.00", "qty": 7},\n  {"product": "Widget H", "price": "2000.00", "qty": 1},\n  {"product": "Widget I", "price": "$8.75", "qty": 15},\n  {"product": "Widget J", "price": "99.99", "qty": 4}\n]\n\ndef clean_price(p):\n    if p is None: return None\n    if isinstance(p, str):\n        p = p.replace("$", "").strip()\n        try: return float(p)\n        except: return None\n    return float(p)\n\ncleaned = []\noutliers = 0\nfor row in raw_data:\n    price = clean_price(row["price"])\n    if price is None: continue\n    if price > 1000: outliers += 1\n    cleaned.append(price * row["qty"])\n\nprint(f"Total: {sum(cleaned):.2f}")\nprint(f"Outliers: {outliers}")',
      hint: 'Write a helper function to clean price. Use .replace("$", "") and float(). Skip None prices.',
      verify: (out) => out.includes('Total:') && out.includes('Outliers: 2'),
    },
    {
      id: 'py4', title: 'A/B Test Conversion Analysis', difficulty: 'Intermediate',
      description: 'An e-commerce site ran an A/B test on a new checkout flow. Group A (control) and Group B (variant). Calculate:\n1. Conversion rate for each group\n2. Relative lift of B over A\n3. Which group won?\n\nab_data = [\n  {"user": "u1", "group": "A", "converted": 0},\n  {"user": "u2", "group": "A", "converted": 1},\n  {"user": "u3", "group": "A", "converted": 0},\n  {"user": "u4", "group": "A", "converted": 0},\n  {"user": "u5", "group": "A", "converted": 1},\n  {"user": "u6", "group": "A", "converted": 0},\n  {"user": "u7", "group": "A", "converted": 1},\n  {"user": "u8", "group": "A", "converted": 0},\n  {"user": "u9", "group": "A", "converted": 0},\n  {"user": "u10", "group": "A", "converted": 0},\n  {"user": "u11", "group": "B", "converted": 1},\n  {"user": "u12", "group": "B", "converted": 1},\n  {"user": "u13", "group": "B", "converted": 0},\n  {"user": "u14", "group": "B", "converted": 1},\n  {"user": "u15", "group": "B", "converted": 0},\n  {"user": "u16", "group": "B", "converted": 1},\n  {"user": "u17", "group": "B", "converted": 1},\n  {"user": "u18", "group": "B", "converted": 0},\n  {"user": "u19", "group": "B", "converted": 1},\n  {"user": "u20", "group": "B", "converted": 1}\n]',
      starterCode: 'ab_data = [\n  {"user": "u1", "group": "A", "converted": 0},\n  {"user": "u2", "group": "A", "converted": 1},\n  {"user": "u3", "group": "A", "converted": 0},\n  {"user": "u4", "group": "A", "converted": 0},\n  {"user": "u5", "group": "A", "converted": 1},\n  {"user": "u6", "group": "A", "converted": 0},\n  {"user": "u7", "group": "A", "converted": 1},\n  {"user": "u8", "group": "A", "converted": 0},\n  {"user": "u9", "group": "A", "converted": 0},\n  {"user": "u10", "group": "A", "converted": 0},\n  {"user": "u11", "group": "B", "converted": 1},\n  {"user": "u12", "group": "B", "converted": 1},\n  {"user": "u13", "group": "B", "converted": 0},\n  {"user": "u14", "group": "B", "converted": 1},\n  {"user": "u15", "group": "B", "converted": 0},\n  {"user": "u16", "group": "B", "converted": 1},\n  {"user": "u17", "group": "B", "converted": 1},\n  {"user": "u18", "group": "B", "converted": 0},\n  {"user": "u19", "group": "B", "converted": 1},\n  {"user": "u20", "group": "B", "converted": 1}\n]\n\ngroup_a = [r for r in ab_data if r["group"] == "A"]\ngroup_b = [r for r in ab_data if r["group"] == "B"]\nconv_a = sum(r["converted"] for r in group_a) / len(group_a) * 100\nconv_b = sum(r["converted"] for r in group_b) / len(group_b) * 100\nlift = (conv_b - conv_a) / conv_a * 100\n\nprint(f"Group A: {conv_a:.1f}%")\nprint(f"Group B: {conv_b:.1f}%")\nprint(f"Lift: {lift:.1f}%")',
      hint: 'Filter by group, count conversions, divide by total, multiply by 100',
      verify: (out) => out.includes('Group A:') && out.includes('Group B:') && out.includes('%'),
    },
    {
      id: 'py5', title: 'Marketing Funnel Analysis', difficulty: 'Intermediate',
      description: 'Analyze the marketing funnel: Visitors → Signups → Trial → Paid. Calculate conversion rate at each stage and total conversion from visitor to paid.\n\nfunnel = {"visitors": 50000, "signups": 3500, "trial_started": 1800, "paid": 420}',
      starterCode: 'funnel = {"visitors": 50000, "signups": 3500, "trial_started": 1800, "paid": 420}\n\n# Calculate stage conversion rates\nvisitor_to_signup = funnel["signups"] / funnel["visitors"] * 100\nsignup_to_trial = funnel["trial_started"] / funnel["signups"] * 100\ntrial_to_paid = funnel["paid"] / funnel["trial_started"] * 100\noverall = funnel["paid"] / funnel["visitors"] * 100\n\nprint(f"Visitor→Signup: {visitor_to_signup:.1f}%")\nprint(f"Signup→Trial: {signup_to_trial:.1f}%")\nprint(f"Trial→Paid: {trial_to_paid:.1f}%")\nprint(f"Overall: {overall:.2f}%")',
      hint: 'Divide each stage by previous stage, multiply by 100',
      verify: (out) => out.includes('Visitor→Signup:') && out.includes('Overall:') && out.includes('0.84%'),
    },
    {
      id: 'py6', title: 'Inventory Reorder Alert', difficulty: 'Intermediate',
      description: 'A warehouse tracks inventory. Flag items where stock is at or below the reorder point. For flagged items, calculate how many units to order to reach the max stock level.\n\ninventory = [\n  {"item": "Bolts", "stock": 120, "reorder_at": 100, "max_stock": 500},\n  {"item": "Nuts", "stock": 45, "reorder_at": 50, "max_stock": 300},\n  {"item": "Washers", "stock": 20, "reorder_at": 30, "max_stock": 200},\n  {"item": "Screws", "stock": 200, "reorder_at": 150, "max_stock": 600},\n  {"item": "Springs", "stock": 8, "reorder_at": 25, "max_stock": 150},\n  {"item": "Gears", "stock": 60, "reorder_at": 40, "max_stock": 200},\n  {"item": "Pulleys", "stock": 15, "reorder_at": 20, "max_stock": 100},\n  {"item": "Belts", "stock": 90, "reorder_at": 75, "max_stock": 250}\n]',
      starterCode: 'inventory = [\n  {"item": "Bolts", "stock": 120, "reorder_at": 100, "max_stock": 500},\n  {"item": "Nuts", "stock": 45, "reorder_at": 50, "max_stock": 300},\n  {"item": "Washers", "stock": 20, "reorder_at": 30, "max_stock": 200},\n  {"item": "Screws", "stock": 200, "reorder_at": 150, "max_stock": 600},\n  {"item": "Springs", "stock": 8, "reorder_at": 25, "max_stock": 150},\n  {"item": "Gears", "stock": 60, "reorder_at": 40, "max_stock": 200},\n  {"item": "Pulleys", "stock": 15, "reorder_at": 20, "max_stock": 100},\n  {"item": "Belts", "stock": 90, "reorder_at": 75, "max_stock": 250}\n]\n\nprint("Items to reorder:")\nfor item in inventory:\n    if item["stock"] <= item["reorder_at"]:\n        order = item["max_stock"] - item["stock"]\n        print(f"{item[\"item\"]}: order {order} (stock: {item[\"stock\"]})")',
      hint: 'Compare stock vs reorder_at, calculate max_stock - stock',
      verify: (out) => out.includes('Items to reorder:') && out.includes('Nuts') && out.includes('Washers') && out.includes('Springs') && out.includes('Pulleys'),
    },
    {
      id: 'py7', title: 'Salary Equity Analysis', difficulty: 'Intermediate',
      description: 'Analyze salary data across departments. Calculate: (1) average salary by department, (2) overall average, (3) max salary gap between departments.\n\nemployees = [\n  {"name": "Alice", "dept": "Engineering", "salary": 95000},\n  {"name": "Bob", "dept": "Marketing", "salary": 72000},\n  {"name": "Charlie", "dept": "Engineering", "salary": 110000},\n  {"name": "Diana", "dept": "Sales", "salary": 85000},\n  {"name": "Eve", "dept": "Marketing", "salary": 68000},\n  {"name": "Frank", "dept": "Engineering", "salary": 105000},\n  {"name": "Grace", "dept": "Sales", "salary": 92000},\n  {"name": "Hank", "dept": "Marketing", "salary": 74000},\n  {"name": "Ivy", "dept": "Engineering", "salary": 98000},\n  {"name": "Jack", "dept": "Sales", "salary": 78000},\n  {"name": "Kate", "dept": "Engineering", "salary": 115000},\n  {"name": "Leo", "dept": "Marketing", "salary": 70000}\n]',
      starterCode: 'employees = [\n  {"name": "Alice", "dept": "Engineering", "salary": 95000},\n  {"name": "Bob", "dept": "Marketing", "salary": 72000},\n  {"name": "Charlie", "dept": "Engineering", "salary": 110000},\n  {"name": "Diana", "dept": "Sales", "salary": 85000},\n  {"name": "Eve", "dept": "Marketing", "salary": 68000},\n  {"name": "Frank", "dept": "Engineering", "salary": 105000},\n  {"name": "Grace", "dept": "Sales", "salary": 92000},\n  {"name": "Hank", "dept": "Marketing", "salary": 74000},\n  {"name": "Ivy", "dept": "Engineering", "salary": 98000},\n  {"name": "Jack", "dept": "Sales", "salary": 78000},\n  {"name": "Kate", "dept": "Engineering", "salary": 115000},\n  {"name": "Leo", "dept": "Marketing", "salary": 70000}\n]\n\ndepts = {}\nfor e in employees:\n    if e["dept"] not in depts: depts[e["dept"]] = []\n    depts[e["dept"]].append(e["salary"])\n\nprint("Avg salary by dept:")\nfor d, s in sorted(depts.items()):\n    avg = sum(s) / len(s)\n    print(f"{d}: ${avg:.0f}")\n\nall_salaries = [e["salary"] for e in employees]\nprint(f"\\nOverall avg: ${sum(all_salaries)/len(all_salaries):.0f}")',
      hint: 'Group salaries by department in a dict, then calculate averages',
      verify: (out) => out.includes('Engineering: $') && out.includes('Marketing: $') && out.includes('Sales: $'),
    },
    {
      id: 'py8', title: 'Cohort Retention Analysis', difficulty: 'Advanced',
      description: 'Calculate 1-month retention rate for each signup cohort. A user is "retained" if they were active in month 2. Print retention rate per cohort.\n\nusers = [\n  {"id": 1, "name": "Alice", "signup_month": "Jan", "active_month_2": True},\n  {"id": 2, "name": "Bob", "signup_month": "Jan", "active_month_2": False},\n  {"id": 3, "name": "Charlie", "signup_month": "Jan", "active_month_2": True},\n  {"id": 4, "name": "Diana", "signup_month": "Jan", "active_month_2": True},\n  {"id": 5, "name": "Eve", "signup_month": "Jan", "active_month_2": False},\n  {"id": 6, "name": "Frank", "signup_month": "Feb", "active_month_2": True},\n  {"id": 7, "name": "Grace", "signup_month": "Feb", "active_month_2": True},\n  {"id": 8, "name": "Hank", "signup_month": "Feb", "active_month_2": False},\n  {"id": 9, "name": "Ivy", "signup_month": "Mar", "active_month_2": True},\n  {"id": 10, "name": "Jack", "signup_month": "Mar", "active_month_2": True},\n  {"id": 11, "name": "Kate", "signup_month": "Mar", "active_month_2": True},\n  {"id": 12, "name": "Leo", "signup_month": "Mar", "active_month_2": False}\n]',
      starterCode: 'users = [\n  {"id": 1, "name": "Alice", "signup_month": "Jan", "active_month_2": True},\n  {"id": 2, "name": "Bob", "signup_month": "Jan", "active_month_2": False},\n  {"id": 3, "name": "Charlie", "signup_month": "Jan", "active_month_2": True},\n  {"id": 4, "name": "Diana", "signup_month": "Jan", "active_month_2": True},\n  {"id": 5, "name": "Eve", "signup_month": "Jan", "active_month_2": False},\n  {"id": 6, "name": "Frank", "signup_month": "Feb", "active_month_2": True},\n  {"id": 7, "name": "Grace", "signup_month": "Feb", "active_month_2": True},\n  {"id": 8, "name": "Hank", "signup_month": "Feb", "active_month_2": False},\n  {"id": 9, "name": "Ivy", "signup_month": "Mar", "active_month_2": True},\n  {"id": 10, "name": "Jack", "signup_month": "Mar", "active_month_2": True},\n  {"id": 11, "name": "Kate", "signup_month": "Mar", "active_month_2": True},\n  {"id": 12, "name": "Leo", "signup_month": "Mar", "active_month_2": False}\n]\n\n# Cohort retention\ncohorts = {}\nfor u in users:\n    if u["signup_month"] not in cohorts:\n        cohorts[u["signup_month"]] = {"total": 0, "retained": 0}\n    cohorts[u["signup_month"]]["total"] += 1\n    if u["active_month_2"]:\n        cohorts[u["signup_month"]]["retained"] += 1\n\nprint("Cohort Retention:")\nfor month, data in sorted(cohorts.items()):\n    rate = data["retained"] / data["total"] * 100\n    print(f"{month}: {rate:.0f}% ({data[\"retained\"]}/{data[\"total\"]})")',
      hint: 'Group by signup_month, count total and retained in each group, divide',
      verify: (out) => out.includes('Jan: 60%') || out.includes('Jan: 3/5') || out.includes('Cohort Retention:'),
    },
    {
      id: 'py9', title: 'Moving Average Forecast', difficulty: 'Intermediate',
      description: 'Calculate a 7-day moving average for daily sales. Then predict next day by extending the average. Print each day\'s MA and the forecast.\n\ndaily_sales = [120, 135, 128, 142, 156, 148, 139, 152, 165, 158, 171, 164, 180, 175, 190, 182, 195, 188, 202, 198, 210, 205, 220, 215, 230, 222, 238, 245, 250, 242]',
      starterCode: 'daily_sales = [120, 135, 128, 142, 156, 148, 139, 152, 165, 158, 171, 164, 180, 175, 190, 182, 195, 188, 202, 198, 210, 205, 220, 215, 230, 222, 238, 245, 250, 242]\n\nwindow = 7\nmoving_avgs = []\nfor i in range(len(daily_sales) - window + 1):\n    avg = sum(daily_sales[i:i+window]) / window\n    moving_avgs.append(avg)\n\nforecast = sum(daily_sales[-window:]) / window\n\nprint(f"Last MA: {moving_avgs[-1]:.1f}")\nprint(f"Forecast: {forecast:.1f}")',
      hint: 'Sliding window: sum(list[i:i+7])/7 for each i. Last 7 days = forecast.',
      verify: (out) => out.includes('Last MA:') && out.includes('Forecast:'),
    },
    {
      id: 'py10', title: 'CAGR Calculator', difficulty: 'Intermediate',
      description: 'Calculate Compound Annual Growth Rate (CAGR) for company revenue over 5 years. Formula: CAGR = (end/start)^(1/years) - 1. Express as percentage. Also find which product line grew fastest.\n\nrevenue_by_product = {\n  "SaaS": [500000, 580000, 670000, 820000, 1050000],\n  "Consulting": [300000, 320000, 310000, 350000, 380000],\n  "Hardware": [800000, 750000, 700000, 650000, 600000],\n  "Licensing": [200000, 260000, 340000, 450000, 620000]\n}\nyears = 4  # from year 1 to year 5 is 4 periods',
      starterCode: 'revenue_by_product = {\n  "SaaS": [500000, 580000, 670000, 820000, 1050000],\n  "Consulting": [300000, 320000, 310000, 350000, 380000],\n  "Hardware": [800000, 750000, 700000, 650000, 600000],\n  "Licensing": [200000, 260000, 340000, 450000, 620000]\n}\nyears = 4\n\nprint("CAGR by Product:")\nbest = {"name": "", "cagr": -999}\nfor product, revs in revenue_by_product.items():\n    start, end = revs[0], revs[-1]\n    cagr = (end / start) ** (1 / years) - 1\n    cagr_pct = cagr * 100\n    print(f"{product}: {cagr_pct:.1f}%")\n    if cagr > best["cagr"]:\n        best = {"name": product, "cagr": cagr}\n\nprint(f"\\nFastest: {best[\"name\"]} ({best[\"cagr\"]*100:.1f}%)")',
      hint: 'CAGR = (end_value / start_value)^(1/n_periods) - 1. Multiply by 100 for %.',
      verify: (out) => out.includes('SaaS:') && out.includes('Licensing:') && out.includes('Hardware:') && out.includes('Fastest:'),
    },
    {
      id: 'py11', title: 'RFM Customer Segmentation', difficulty: 'Advanced',
      description: 'Score customers by Recency (days since last purchase), Frequency (number of purchases), and Monetary (total spent). Assign each a score of 1-4 for each dimension, then calculate total RFM score.\n\ncustomers = [\n  {"name": "Alice", "recency": 2, "frequency": 12, "monetary": 8500},\n  {"name": "Bob", "recency": 45, "frequency": 3, "monetary": 1200},\n  {"name": "Charlie", "recency": 90, "frequency": 1, "monetary": 450},\n  {"name": "Diana", "recency": 5, "frequency": 8, "monetary": 6200},\n  {"name": "Eve", "recency": 180, "frequency": 2, "monetary": 800},\n  {"name": "Frank", "recency": 1, "frequency": 20, "monetary": 15000},\n  {"name": "Grace", "recency": 30, "frequency": 6, "monetary": 3400},\n  {"name": "Hank", "recency": 60, "frequency": 4, "monetary": 2200}\n]',
      starterCode: 'customers = [\n  {"name": "Alice", "recency": 2, "frequency": 12, "monetary": 8500},\n  {"name": "Bob", "recency": 45, "frequency": 3, "monetary": 1200},\n  {"name": "Charlie", "recency": 90, "frequency": 1, "monetary": 450},\n  {"name": "Diana", "recency": 5, "frequency": 8, "monetary": 6200},\n  {"name": "Eve", "recency": 180, "frequency": 2, "monetary": 800},\n  {"name": "Frank", "recency": 1, "frequency": 20, "monetary": 15000},\n  {"name": "Grace", "recency": 30, "frequency": 6, "monetary": 3400},\n  {"name": "Hank", "recency": 60, "frequency": 4, "monetary": 2200}\n]\n\n# Score helper: lower recency = better, higher freq/mon = better\ndef r_score(val):\n    if val <= 10: return 4\n    if val <= 45: return 3\n    if val <= 90: return 2\n    return 1\n\ndef fm_score(val, values):\n    sorted_vals = sorted(values)\n    if val >= sorted_vals[-2]: return 4\n    if val >= sorted_vals[len(values)//2]: return 3\n    if val >= sorted_vals[1]: return 2\n    return 1\n\nfreqs = [c["frequency"] for c in customers]\nmons = [c["monetary"] for c in customers]\n\nprint("RFM Scores:")\nfor c in customers:\n    r = r_score(c["recency"])\n    f = fm_score(c["frequency"], freqs)\n    m = fm_score(c["monetary"], mons)\n    total = r + f + m\n    print(f"{c[\"name\"]}: R={r} F={f} M={m} Total={total}")',
      hint: 'For recency: lower days = higher score. For freq/mon: compare against quartiles.',
      verify: (out) => out.includes('RFM Scores:') && out.includes('R=') && out.includes('Total='),
    },
    {
      id: 'py12', title: 'Outlier Detection with IQR', difficulty: 'Intermediate',
      description: 'Find outliers in transaction amounts using the IQR method. Calculate Q1, Q3, IQR. Any value below Q1 - 1.5*IQR or above Q3 + 1.5*IQR is an outlier.\n\ntransactions = [45, 52, 48, 55, 61, 58, 49, 53, 57, 62, 50, 47, 54, 59, 51, 46, 56, 60, 200, 44, 210, 63, 48, 52, 55, 49, 53, 58, 61, 47, 54, 50, 57, 62, 46, 59, 220, 45, 51, 56]',
      starterCode: 'transactions = [45, 52, 48, 55, 61, 58, 49, 53, 57, 62, 50, 47, 54, 59, 51, 46, 56, 60, 200, 44, 210, 63, 48, 52, 55, 49, 53, 58, 61, 47, 54, 50, 57, 62, 46, 59, 220, 45, 51, 56]\n\nsorted_t = sorted(transactions)\nn = len(sorted_t)\n\ndef median(lst):\n    m = len(lst) // 2\n    if len(lst) % 2 == 0:\n        return (lst[m-1] + lst[m]) / 2\n    return lst[m]\n\nq1 = median(sorted_t[:n//2])\nq3 = median(sorted_t[-(n//2):]) if n % 2 == 0 else median(sorted_t[-(n//2):])\niqr = q3 - q1\nlower = q1 - 1.5 * iqr\nupper = q3 + 1.5 * iqr\n\noutliers = [x for x in transactions if x < lower or x > upper]\n\nprint(f"Q1: {q1}, Q3: {q3}, IQR: {iqr}")\nprint(f"Bounds: {lower:.1f} to {upper:.1f}")\nprint(f"Outliers: {outliers}")',
      hint: 'Sort data, find median of lower half (Q1) and upper half (Q3). IQR = Q3 - Q1.',
      verify: (out) => out.includes('Outliers:') && (out.includes('200') || out.includes('210') || out.includes('220')),
    },
    {
      id: 'py13', title: 'Price Elasticity Analysis', difficulty: 'Advanced',
      description: 'Calculate price elasticity of demand for each product. Elasticity = % change in quantity / % change in price. If |elasticity| > 1, demand is elastic (sensitive to price).\n\nproducts = [\n  {"name": "Widget A", "price_before": 25, "price_after": 30, "qty_before": 1000, "qty_after": 700},\n  {"name": "Widget B", "price_before": 50, "price_after": 55, "qty_before": 500, "qty_after": 420},\n  {"name": "Widget C", "price_before": 10, "price_after": 12, "qty_before": 5000, "qty_after": 4800},\n  {"name": "Widget D", "price_before": 100, "price_after": 120, "qty_before": 200, "qty_after": 150},\n  {"name": "Widget E", "price_before": 15, "price_after": 18, "qty_before": 3000, "qty_after": 2800}\n]',
      starterCode: 'products = [\n  {"name": "Widget A", "price_before": 25, "price_after": 30, "qty_before": 1000, "qty_after": 700},\n  {"name": "Widget B", "price_before": 50, "price_after": 55, "qty_before": 500, "qty_after": 420},\n  {"name": "Widget C", "price_before": 10, "price_after": 12, "qty_before": 5000, "qty_after": 4800},\n  {"name": "Widget D", "price_before": 100, "price_after": 120, "qty_before": 200, "qty_after": 150},\n  {"name": "Widget E", "price_before": 15, "price_after": 18, "qty_before": 3000, "qty_after": 2800}\n]\n\nprint("Price Elasticity:")\nfor p in products:\n    pct_price = (p["price_after"] - p["price_before"]) / p["price_before"] * 100\n    pct_qty = (p["qty_after"] - p["qty_before"]) / p["qty_before"] * 100\n    elasticity = pct_qty / pct_price\n    elastic = "Elastic" if abs(elasticity) > 1 else "Inelastic"\n    print(f"{p[\"name\"]}: {elasticity:.2f} ({elastic})")',
      hint: '%ΔQ / %ΔP. %Δ = (after - before) / before * 100. |E|>1 = elastic.',
      verify: (out) => out.includes('Price Elasticity:') && out.includes('Elastic') && out.includes('Inelastic'),
    },
    {
      id: 'py14', title: 'Marketing ROI & ROAS', difficulty: 'Intermediate',
      description: 'Calculate Return on Ad Spend (ROAS) for each campaign. ROAS = Revenue / Cost. Also calculate profit = Revenue - Cost. Flag campaigns that lost money.\n\ncampaigns = [\n  {"name": "Google Ads Q1", "cost": 15000, "revenue": 52000},\n  {"name": "Facebook Q1", "cost": 8000, "revenue": 21000},\n  {"name": "LinkedIn Q1", "cost": 12000, "revenue": 18000},\n  {"name": "Email Q1", "cost": 3000, "revenue": 25000},\n  {"name": "Google Ads Q2", "cost": 18000, "revenue": 61000},\n  {"name": "Facebook Q2", "cost": 10000, "revenue": 28000},\n  {"name": "TikTok Q2", "cost": 5000, "revenue": 4000},\n  {"name": "Email Q2", "cost": 3500, "revenue": 22000}\n]',
      starterCode: 'campaigns = [\n  {"name": "Google Ads Q1", "cost": 15000, "revenue": 52000},\n  {"name": "Facebook Q1", "cost": 8000, "revenue": 21000},\n  {"name": "LinkedIn Q1", "cost": 12000, "revenue": 18000},\n  {"name": "Email Q1", "cost": 3000, "revenue": 25000},\n  {"name": "Google Ads Q2", "cost": 18000, "revenue": 61000},\n  {"name": "Facebook Q2", "cost": 10000, "revenue": 28000},\n  {"name": "TikTok Q2", "cost": 5000, "revenue": 4000},\n  {"name": "Email Q2", "cost": 3500, "revenue": 22000}\n]\n\nprint("Campaign ROAS:")\nfor c in campaigns:\n    roas = c["revenue"] / c["cost"]\n    profit = c["revenue"] - c["cost"]\n    flag = " LOSS!" if profit < 0 else ""\n    print(f"{c[\"name\"]}: ROAS={roas:.1f}x, Profit=${profit}{flag}")',
      hint: 'ROAS = Revenue / Cost. Profit = Revenue - Cost.',
      verify: (out) => out.includes('ROAS=') && out.includes('LOSS!') && out.includes('Email'),
    },
    {
      id: 'py15', title: 'Data Quality Report', difficulty: 'Advanced',
      description: 'Generate a data quality report on a customer import. Calculate: (1) % missing per field, (2) % duplicate emails, (3) % invalid phone numbers (must have 10 digits).\n\nrecords = [\n  {"name": "Alice", "email": "alice@co.com", "phone": "555-123-4567", "age": 32},\n  {"name": "Bob", "email": "bob@co.com", "phone": "555-234-5678", "age": None},\n  {"name": "Charlie", "email": None, "phone": "12345", "age": 28},\n  {"name": "Diana", "email": "diana@co.com", "phone": "555-345-6789", "age": 45},\n  {"name": "Eve", "email": "eve@co.com", "phone": "not-a-number", "age": 35},\n  {"name": "Frank", "email": "frank@co.com", "phone": "555-456-7890", "age": 29},\n  {"name": "Grace", "email": "grace@co.com", "phone": "555-567-8901", "age": None},\n  {"name": "Hank", "email": "alice@co.com", "phone": "555-678-9012", "age": 41},\n  {"name": "Ivy", "email": "ivy@co.com", "phone": "555-789-0123", "age": 33},\n  {"name": "Jack", "email": "jack@co.com", "phone": "short", "age": 26}\n]',
      starterCode: 'records = [\n  {"name": "Alice", "email": "alice@co.com", "phone": "555-123-4567", "age": 32},\n  {"name": "Bob", "email": "bob@co.com", "phone": "555-234-5678", "age": None},\n  {"name": "Charlie", "email": None, "phone": "12345", "age": 28},\n  {"name": "Diana", "email": "diana@co.com", "phone": "555-345-6789", "age": 45},\n  {"name": "Eve", "email": "eve@co.com", "phone": "not-a-number", "age": 35},\n  {"name": "Frank", "email": "frank@co.com", "phone": "555-456-7890", "age": 29},\n  {"name": "Grace", "email": "grace@co.com", "phone": "555-567-8901", "age": None},\n  {"name": "Hank", "email": "alice@co.com", "phone": "555-678-9012", "age": 41},\n  {"name": "Ivy", "email": "ivy@co.com", "phone": "555-789-0123", "age": 33},\n  {"name": "Jack", "email": "jack@co.com", "phone": "short", "age": 26}\n]\n\ntotal = len(records)\nfields = ["name", "email", "phone", "age"]\n\nprint("Data Quality Report:")\nprint(f"Total records: {total}")\n\nfor field in fields:\n    missing = sum(1 for r in records if r[field] is None)\n    print(f"\\n{field}:")\n    print(f"  Missing: {missing}/{total} ({missing/total*100:.0f}%)")\n\nemails = [r["email"] for r in records if r["email"]]\nduplicates = len(emails) - len(set(emails))\nprint(f"\\nDuplicate emails: {duplicates}")\n\ndef valid_phone(p):\n    digits = "".join(c for c in p if c.isdigit())\n    return len(digits) == 10\n\ninvalid_phones = sum(1 for r in records if not valid_phone(r["phone"]))\nprint(f"Invalid phones: {invalid_phones}/{total} ({invalid_phones/total*100:.0f}%)")',
      hint: 'Missing = count of None. Duplicate emails = total - unique. Valid phone = exactly 10 digits extracted.',
      verify: (out) => out.includes('Data Quality Report:') && out.includes('Missing:') && out.includes('Duplicate emails:') && out.includes('Invalid phones:'),
    },
    {
      id: 'py16', title: 'Revenue Forecasting with Linear Regression', difficulty: 'Advanced',
      description: 'Use linear regression (least squares) to forecast next quarter\'s revenue. You have 8 quarters of data. Calculate slope, intercept, and predict quarter 9.\n\nquarters = [1, 2, 3, 4, 5, 6, 7, 8]\nrevenue = [210, 245, 260, 290, 315, 340, 370, 395]  # in thousands',
      starterCode: 'quarters = [1, 2, 3, 4, 5, 6, 7, 8]\nrevenue = [210, 245, 260, 290, 315, 340, 370, 395]\n\nn = len(quarters)\nmean_x = sum(quarters) / n\nmean_y = sum(revenue) / n\n\nnumer = sum((quarters[i] - mean_x) * (revenue[i] - mean_y) for i in range(n))\ndenom = sum((quarters[i] - mean_x) ** 2 for i in range(n))\nslope = numer / denom\nintercept = mean_y - slope * mean_x\n\nq9_forecast = slope * 9 + intercept\n\nprint(f"Slope: {slope:.1f}")\nprint(f"Intercept: {intercept:.1f}")\nprint(f"Q9 Forecast: {q9_forecast:.0f}K")',
      hint: 'Slope = covariance(x,y)/variance(x). Intercept = mean_y - slope * mean_x.',
      verify: (out) => out.includes('Slope:') && out.includes('Intercept:') && out.includes('Q9 Forecast:') && (out.includes('420') || out.includes('430')) ,
    },
    {
      id: 'py17', title: 'Anomaly Detection: Z-Score Method', difficulty: 'Advanced',
      description: 'Flag fraudulent transactions using Z-score. Any transaction with |z-score| > 3 is an anomaly. Z = (value - mean) / std_dev.\n\ntransactions = [120, 135, 128, 142, 131, 138, 125, 140, 136, 129, 133, 127, 144, 130, 137, 122, 141, 134, 126, 139, 132, 123, 145, 128, 136, 130, 142, 125, 138, 134, 129, 141, 127, 133, 140, 126, 135, 131, 124, 132, 9800, 137, 128, 143, 130, 136, 122, 139, 125, 131, 13400, 127, 142, 135, 129, 144, 132, 126, 138, 130]',
      starterCode: 'transactions = [120, 135, 128, 142, 131, 138, 125, 140, 136, 129, 133, 127, 144, 130, 137, 122, 141, 134, 126, 139, 132, 123, 145, 128, 136, 130, 142, 125, 138, 134, 129, 141, 127, 133, 140, 126, 135, 131, 124, 132, 9800, 137, 128, 143, 130, 136, 122, 139, 125, 131, 13400, 127, 142, 135, 129, 144, 132, 126, 138, 130]\n\nmean = sum(transactions) / len(transactions)\nvariance = sum((x - mean) ** 2 for x in transactions) / len(transactions)\nstd = variance ** 0.5\n\nprint(f"Mean: {mean:.1f}")\nprint(f"Std: {std:.1f}")\nprint(f"\\nAnomalies (|z| > 3):")\nfor i, x in enumerate(transactions):\n    z = (x - mean) / std\n    if abs(z) > 3:\n        print(f"  TX #{i+1}: ${x} (z={z:.1f})")',
      hint: 'Calculate mean and std. For each value, z = (x-mean)/std. Flag if |z| > 3.',
      verify: (out) => out.includes('Anomalies') && out.includes('9800') && out.includes('13400') && out.includes('z='),
    },
    {
      id: 'py18', title: 'Attribution Modeling: Last-Click vs Linear', difficulty: 'Advanced',
      description: 'Compare last-click vs linear attribution models. For each customer journey (sequence of touchpoints), calculate how much credit each channel gets.\n\njourneys = [\n  {"customer": "Alice", "touchpoints": ["Email", "Search", "Search", "Direct"]},\n  {"customer": "Bob", "touchpoints": ["Social", "Email", "Search"]},\n  {"customer": "Charlie", "touchpoints": ["Search", "Social", "Direct", "Email", "Direct"]},\n  {"customer": "Diana", "touchpoints": ["Social", "Social", "Search"]},\n  {"customer": "Eve", "touchpoints": ["Email"]},\n  {"customer": "Frank", "touchpoints": ["Search", "Direct", "Social", "Search", "Email"]}\n]  # Assume each journey resulted in 1 conversion',
      starterCode: 'journeys = [\n  {"customer": "Alice", "touchpoints": ["Email", "Search", "Search", "Direct"]},\n  {"customer": "Bob", "touchpoints": ["Social", "Email", "Search"]},\n  {"customer": "Charlie", "touchpoints": ["Search", "Social", "Direct", "Email", "Direct"]},\n  {"customer": "Diana", "touchpoints": ["Social", "Social", "Search"]},\n  {"customer": "Eve", "touchpoints": ["Email"]},\n  {"customer": "Frank", "touchpoints": ["Search", "Direct", "Social", "Search", "Email"]}\n]\n\nchannels = ["Email", "Search", "Social", "Direct"]\nlast_click = {c: 0 for c in channels}\nlinear = {c: 0 for c in channels}\n\nfor j in journeys:\n    # Last-click: last touchpoint gets full credit\n    last = j["touchpoints"][-1]\n    last_click[last] += 1\n    \n    # Linear: each touchpoint gets equal share\n    share = 1 / len(j["touchpoints"])\n    for t in j["touchpoints"]:\n        linear[t] += share\n\nprint("Last-Click Attribution:")\nfor c in channels:\n    print(f"  {c}: {last_click[c]:.0f}")\n\nprint("\\nLinear Attribution:")\nfor c in channels:\n    print(f"  {c}: {linear[c]:.1f}")',
      hint: 'Last-click: credit the last touchpoint only. Linear: 1/n credit to each touchpoint.',
      verify: (out) => out.includes('Last-Click Attribution:') && out.includes('Linear Attribution:') && out.includes('Email:'),
    },
  ],
  sql: [
    {
      id: 'sql1', title: 'Top 10 Products by Revenue', difficulty: 'Beginner',
      description: 'Show the top 10 products by total revenue (price * quantity). Join orders with products to calculate revenue per product, then sort descending.',
      starterCode: 'SELECT p.name, SUM(p.unit_price * o.quantity) AS revenue\nFROM orders o\nJOIN products p ON o.product_id = p.id\nGROUP BY p.name\nORDER BY revenue DESC\nLIMIT 10',
      hint: 'JOIN orders with products, GROUP BY product name, SUM(price * quantity), ORDER BY DESC',
      verify: (out) => out.includes('Mechanical Keyboard') || out.includes('Laptop Stand') || out.includes('Ergonomic Chair'),
    },
    {
      id: 'sql2', title: 'Churned Customer Count', difficulty: 'Beginner',
      description: 'Count how many customers have churned (status = "churned") and how many are still active. Show status and count.',
      starterCode: "SELECT status, COUNT(*) AS count\nFROM customers\nWHERE status IN ('active', 'churned')\nGROUP BY status",
      hint: 'WHERE to filter, GROUP BY status, COUNT(*) to count',
      verify: (out) => out.includes('active') && out.includes('churned') && (out.includes('4') || out.includes('12') || out.includes('14')),
    },
    {
      id: 'sql3', title: 'Monthly Revenue vs Target', difficulty: 'Intermediate',
      description: 'Compare actual monthly revenue to targets. Show month, actual revenue, target, and variance (actual - target).',
      starterCode: "SELECT strftime('%m', o.order_date) AS month, ROUND(SUM(o.amount), 0) AS actual, t.target, ROUND(SUM(o.amount) - t.target, 0) AS variance\nFROM orders o\nJOIN sales_targets t ON strftime('%m', o.order_date) = t.month AND t.region = 'East'\nGROUP BY month\nORDER BY month",
      hint: 'Extract month from order_date with strftime, join on month, SUM(amount) - target',
      verify: (out) => out.includes('actual') || out.includes('target') || out.includes('variance'),
    },
    {
      id: 'sql4', title: 'Customers Who Haven\'t Ordered in 90+ Days', difficulty: 'Intermediate',
      description: 'Find customers who have not placed an order in 90 days or more (churn risk). Use the customers table with last_order_date.',
      starterCode: "SELECT id, name, segment, last_order_date, status\nFROM customers\nWHERE last_order_date < date('now', '-90 days') AND status = 'active'\nORDER BY last_order_date",
      hint: 'WHERE last_order_date < date("now", "-90 days") filters old orders, AND status = "active" ensures not already churned',
      verify: (out) => out.includes('Ivy') || out.includes('Diana') || out.length > 0,
    },
    {
      id: 'sql5', title: 'Return Rate by Product', difficulty: 'Advanced',
      description: 'Calculate return rate percentage for each product: (returned orders / total orders) * 100. Join orders with products, show products with return rate > 0.',
      starterCode: "SELECT p.name, COUNT(*) AS total_orders,\n  SUM(CASE WHEN o.status = 'returned' THEN 1 ELSE 0 END) AS returns,\n  ROUND(AVG(CASE WHEN o.status = 'returned' THEN 100.0 ELSE 0 END), 1) AS return_rate\nFROM orders o\nJOIN products p ON o.product_id = p.id\nGROUP BY p.name\nHAVING returns > 0\nORDER BY return_rate DESC",
      hint: 'Use CASE WHEN inside SUM to count returns. AVG with CASE to get rate. HAVING filters groups.',
      verify: (out) => out.includes('USB Hub') || out.includes('Desk Lamp') || out.includes('Widget Pro'),
    },
    {
      id: 'sql6', title: 'Marketing Channel ROI', difficulty: 'Intermediate',
      description: 'For each marketing channel, calculate: total spend, total revenue, ROI = (revenue - spend) / spend * 100. Sort by ROI descending.',
      starterCode: "SELECT channel, SUM(spend) AS total_cost, SUM(revenue) AS total_revenue,\n  ROUND((SUM(revenue) - SUM(spend)) * 100.0 / SUM(spend), 1) AS roi_pct\nFROM marketing_spend\nGROUP BY channel\nORDER BY roi_pct DESC",
      hint: 'GROUP BY channel, SUM spend and revenue, calculate roi_pct as (rev-cost)/cost*100',
      verify: (out) => out.includes('Search') && out.includes('Email') && out.includes('Social') && out.includes('roi'),
    },
    {
      id: 'sql7', title: 'Customer Lifetime Value (CLV)', difficulty: 'Advanced',
      description: 'Calculate lifetime value for each customer: total amount spent across all orders. Show top 10 customers by CLV.',
      starterCode: 'SELECT o.customer_name, COUNT(*) AS order_count, ROUND(SUM(o.amount), 2) AS total_spent\nFROM orders o\nGROUP BY o.customer_name\nORDER BY total_spent DESC\nLIMIT 10',
      hint: 'GROUP BY customer_name, COUNT orders, SUM amount, ORDER BY total_spent DESC',
      verify: (out) => out.includes('Alice') && out.includes('Charlie') && out.includes('total_spent'),
    },
    {
      id: 'sql8', title: 'Average Salary by Department', difficulty: 'Beginner',
      description: 'Calculate the average salary for each department. Show department name and average salary, sorted highest to lowest.',
      starterCode: 'SELECT department, ROUND(AVG(CAST(salary AS REAL)), 0) AS avg_salary\nFROM employees\nGROUP BY department\nORDER BY avg_salary DESC',
      hint: 'GROUP BY department, AVG(salary), ORDER BY DESC',
      verify: (out) => out.includes('Engineering') && out.includes('Sales') && out.includes('Marketing'),
    },
    {
      id: 'sql9', title: 'Sales by Region with YoY Change', difficulty: 'Advanced',
      description: 'Show annual sales by region for 2024 and 2025 if available, with year-over-year change percentage.',
      starterCode: "SELECT region, strftime('%Y', order_date) AS year, ROUND(SUM(amount), 0) AS sales\nFROM orders o\nJOIN customers c ON o.customer_name = c.name\nGROUP BY region, year\nORDER BY region, year",
      hint: 'Need to JOIN orders with customers to get region. GROUP BY region and year.',
      verify: (out) => out.includes('East') || out.includes('West') || out.includes('Central') || out.includes('South'),
    },
    {
      id: 'sql10', title: 'Premium Segment Analysis', difficulty: 'Intermediate',
      description: 'Find total revenue generated by each customer segment (Premium, Standard, Basic). Show segment and total revenue.',
      starterCode: 'SELECT c.segment, ROUND(SUM(o.amount), 2) AS total_revenue, COUNT(DISTINCT c.id) AS customer_count\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nGROUP BY c.segment\nORDER BY total_revenue DESC',
      hint: 'JOIN customers and orders, GROUP BY segment, SUM amount, COUNT distinct customer IDs',
      verify: (out) => out.includes('Premium') && out.includes('Standard') && out.includes('Basic'),
    },
    {
      id: 'sql11', title: 'Monthly New Customers vs Revenue', difficulty: 'Intermediate',
      description: 'Show each month: number of new customers who signed up that month, and total revenue from those customers.',
      starterCode: "SELECT strftime('%Y-%m', c.signup_date) AS cohort_month, COUNT(DISTINCT c.id) AS new_customers, ROUND(SUM(o.amount), 2) AS cohort_revenue\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY cohort_month\nORDER BY cohort_month",
      hint: 'LEFT JOIN ensures customers with no orders are included. GROUP BY signup month.',
      verify: (out) => out.includes('2024-') || out.includes('cohort'),
    },
    {
      id: 'sql12', title: 'Low Inventory Alert', difficulty: 'Beginner',
      description: 'Find products with stock below 50 units. Show product name, category, current stock, and the reorder amount needed to reach 100 units.',
      starterCode: "SELECT name, category, stock, (100 - stock) AS to_order\nFROM products\nWHERE stock < 50\nORDER BY stock",
      hint: 'WHERE stock < 50, calculate to_order = 100 - stock',
      verify: (out) => out.includes('Ergonomic Chair') || out.includes('Monitor') || out.includes('Laptop Stand') || out.includes('Mechanical Keyboard'),
    },
    {
      id: 'sql13', title: 'Product Category Performance', difficulty: 'Intermediate',
      description: 'Show total revenue and average unit price by product category. Include how many products in each category.',
      starterCode: 'SELECT p.category, COUNT(DISTINCT p.id) AS products, ROUND(SUM(o.quantity * p.unit_price), 2) AS total_revenue, ROUND(AVG(p.unit_price), 2) AS avg_price\nFROM products p\nLEFT JOIN orders o ON p.id = o.product_id\nGROUP BY p.category\nORDER BY total_revenue DESC',
      hint: 'LEFT JOIN to include categories with no orders. GROUP BY category.',
      verify: (out) => out.includes('Electronics') && out.includes('Office') && out.includes('Accessories'),
    },
    {
      id: 'sql14', title: 'Employee Hiring Trends', difficulty: 'Intermediate',
      description: 'Show how many employees were hired each year, broken down by department. Use GROUP BY with multiple columns.',
      starterCode: "SELECT department, strftime('%Y', hire_date) AS year, COUNT(*) AS hires\nFROM employees\nGROUP BY department, year\nORDER BY department, year",
      hint: 'GROUP BY both department and year to get cross-tabulation',
      verify: (out) => out.includes('Engineering') && (out.includes('2020') || out.includes('2021') || out.includes('2022')),
    },
    {
      id: 'sql15', title: 'Salary Rank Within Department', difficulty: 'Advanced',
      description: 'Rank employees by salary within their department. Show name, department, salary, and rank. Only show top 3 per department.',
      starterCode: "SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank\nFROM employees\nORDER BY department, salary_rank",
      hint: 'RANK() OVER (PARTITION BY department ORDER BY salary DESC)',
      verify: (out) => out.includes('Engineering') && out.includes('1') && out.includes('2'),
    },
    {
      id: 'sql16', title: 'Monthly Sales with Rolling Average', difficulty: 'Advanced',
      description: 'Show monthly sales with a 3-month rolling average using window functions. Helps smooth out seasonal fluctuations.',
      starterCode: "SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(amount), 2) AS monthly_sales, ROUND(AVG(SUM(amount)) OVER (ORDER BY strftime('%Y-%m', order_date) ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_3mo\nFROM orders\nGROUP BY month\nORDER BY month",
      hint: 'Window function: AVG(SUM(amount)) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)',
      verify: (out) => out.includes('2024-') && out.includes('rolling_avg') || out.includes('monthly_sales'),
    },
  ],
  excel: [
    {
      id: 'xl1', title: 'Total Revenue', difficulty: 'Beginner',
      description: 'Calculate total revenue across all 30 transactions. Each row has Price in column D and Qty in column E. Multiply D*E for each row and sum them up.\nThe data has 30 rows (D2:D31, E2:E31).',
      starterCode: '',
      hint: 'SUMPRODUCT multiplies arrays element-wise and sums. Or do =D2*E2+D3*E3+... but SUMPRODUCT is cleaner.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 9000 && n < 9500;
      },
    },
    {
      id: 'xl2', title: 'Average Order Value', difficulty: 'Beginner',
      description: 'Calculate the average order value (average of all prices in column D). Then show both average and count.\nData range: D2:D31 (30 orders).',
      starterCode: '',
      hint: 'AVERAGE(range) calculates mean. Use COUNT(range) to verify count.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 100 && n < 200;
      },
    },
    {
      id: 'xl3', title: 'Sales Commission Calculator', difficulty: 'Intermediate',
      description: 'A sales rep earns 15% commission on orders over $300, 10% on orders over $100, and 5% on all others. D2 = 149.99 (price for TXN-001). Calculate commission for the first transaction.',
      starterCode: '',
      hint: 'Nested IF: IF(condition, value_if_true, IF(next_condition, value_if_true, value_if_false))',
      verify: (out) => out.includes('14.999') || out.includes('15') || out.includes('149.99') || out.includes('14.99'),
    },
    {
      id: 'xl4', title: 'Budget Variance Analysis', difficulty: 'Intermediate',
      description: 'Calculate the total units sold (sum of column E), the max price (column D), and the min price (column D). These are key inventory metrics.',
      starterCode: '',
      hint: 'SUM for total units, MAX for highest price, MIN for lowest. Use & to concatenate text.',
      verify: (out) => out.includes('units') && out.includes('max') && out.includes('min'),
    },
    {
      id: 'xl5', title: 'Category Sales Rank', difficulty: 'Intermediate',
      description: 'Rank the first transaction (D2=149.99) against all prices. Determine if its price is above average. Show "Above Average" or "Below Average".',
      starterCode: '',
      hint: 'Compare a single cell to AVERAGE of the whole range. Use $ for absolute references.',
      verify: (out) => (out.includes('Above') || out.includes('Below')),
    },
    {
      id: 'xl6', title: 'VLOOKUP Product Price', difficulty: 'Advanced',
      description: 'Use VLOOKUP to find the price of "Ergonomic Chair" in the product list. The product names are in B2:B31 and prices in D2:D31. Price column is the 3rd column in the lookup range if you select B:D.',
      starterCode: '',
      hint: 'VLOOKUP(lookup_value, table_array, col_index, [range_lookup]). col_index is 3 for D (Price). Set 4th arg to 0 for exact match.',
      verify: (out) => out.includes('499.99') || out.includes('499.99'),
    },
    {
      id: 'xl7', title: 'Profit Margin Calculation', difficulty: 'Intermediate',
      description: 'Widget Pro costs $85 to make and sells at D2=149.99. Calculate: (1) Cost of Goods Sold for TXN-001 (price * qty, using D2*E2 where E2=2), (2) Revenue, (3) Profit Margin = (Revenue - COGS) / Revenue * 100.\nFirst calculate total cost = 85 * E2.',
      starterCode: '',
      hint: 'Margin = (Revenue - Cost) / Revenue * 100. Revenue = D2*E2, Cost = 85*E2.',
      verify: (out) => out.includes('43.33') || out.includes('43.3'),
    },
    {
      id: 'xl8', title: 'Nested IF Sales Tiers', difficulty: 'Advanced',
      description: 'Categorize TXN-001 total (D2*E2 = 149.99*2 = 299.98):\n"High" if > 500, "Medium" if > 200, "Low" otherwise.',
      starterCode: '',
      hint: 'Nested IF: IF(condition1, result1, IF(condition2, result2, default))',
      verify: (out) => out.includes('Medium'),
    },
    {
      id: 'xl9', title: 'Total Revenue with SUMPRODUCT', difficulty: 'Intermediate',
      description: 'Calculate total revenue across all 30 transactions using SUMPRODUCT. This multiplies each price by its quantity and sums the results.\nPrices: D2:D31, Quantities: E2:E31.',
      starterCode: '',
      hint: 'SUMPRODUCT(array1, array2) multiplies corresponding elements and sums them.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 9000 && n < 9500;
      },
    },
    {
      id: 'xl10', title: 'COUNTIF High-Value Orders', difficulty: 'Intermediate',
      description: 'Count how many transactions have a price (column D) greater than $100. Also count those that are $100 or less.',
      starterCode: '',
      hint: 'COUNTIF(range, criteria) with ">100" as criteria. Use <=100 for the other count.',
      verify: (out) => {
        const n = parseInt(out);
        return !isNaN(n) && n >= 15;
      },
    },
    {
      id: 'xl11', title: 'SUMIF by Region', difficulty: 'Advanced',
      description: 'Calculate total revenue for "East" region transactions. The region is in column H (H2:H31). Revenue is Price * Qty, approximated as just the Price in D. Sum prices for East region.',
      starterCode: '',
      hint: 'SUMIF(criteria_range, criteria, sum_range). The criteria is the region name.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 800;
      },
    },
    {
      id: 'xl12', title: 'VLOOKUP with Category', difficulty: 'Advanced',
      description: 'Use VLOOKUP to find the category of "Monitor 27\\" ". The lookup range is B2:D31, category is in column C (2nd column).',
      starterCode: '',
      hint: 'Escape double-quote with another double-quote inside a string. VLOOKUP with exact match (0).',
      verify: (out) => out.includes('Electronics'),
    },
    {
      id: 'xl13', title: 'Monthly Sales Growth Rate', difficulty: 'Advanced',
      description: 'Calculate the month-over-month growth rate for total sales. Assume TXN-001 (D2=149.99) is January and TXN-002 (D3=29.99) is February. Growth = (Feb - Jan) / Jan * 100.',
      starterCode: '',
      hint: 'Growth = (current - previous) / previous * 100. D3 is Feb, D2 is Jan.',
      verify: (out) => out.includes('-80') || out.includes('-79.99'),
    },
    {
      id: 'xl14', title: 'INDEX-MATCH Lookup', difficulty: 'Advanced',
      description: 'Use INDEX and MATCH to find the price of "Mechanical Keyboard" in the product list. Products in B2:B31, prices in D2:D31.\nINDEX-MATCH is more flexible than VLOOKUP.',
      starterCode: '',
      hint: 'INDEX(return_array, MATCH(lookup_value, lookup_array, 0)). MATCH finds the row number, INDEX returns the value.',
      verify: (out) => out.includes('149.99'),
    },
    {
      id: 'xl15', title: 'Conditional Discount with IF', difficulty: 'Intermediate',
      description: 'TXN-001 has qty (E2) = 2 and price (D2) = 149.99. If quantity >= 3, apply 15% discount to total (D2*E2). Otherwise no discount.',
      starterCode: '',
      hint: 'IF condition applies discount factor 0.85. Since E2=2 (<3), no discount applies.',
      verify: (out) => out.includes('299.98') || out.includes('299.98'),
    },
    {
      id: 'xl16', title: 'Total Quantity Sold', difficulty: 'Beginner',
      description: 'Calculate the total quantity of all items sold. Quantity is in column E (E2:E17). Use the SUM function.',
      starterCode: '',
      hint: 'SUM adds all values in a range. The data has 16 transactions (rows 2-17).',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 50 && n < 60;
      },
    },
    {
      id: 'xl17', title: 'Cheapest & Most Expensive Item', difficulty: 'Beginner',
      description: 'Find the cheapest and most expensive price in column D. Use MIN and MAX functions. Show them together using &.\n\nFormat: "Cheapest: $X, Most Expensive: $Y"',
      starterCode: '',
      hint: 'MIN finds the smallest value, MAX finds the largest. Use & to join text and numbers.',
      verify: (out) => out.includes('Cheapest:') && out.includes('Most Expensive:') && out.includes('$'),
    },
    {
      id: 'xl18', title: 'How Many Transactions?', difficulty: 'Beginner',
      description: 'Count how many transactions have a price listed. Use COUNTA on column D (D2:D17). Then also count only numeric prices using COUNT.\n\nShow both results separated by " / ".',
      starterCode: '',
      hint: 'COUNTA counts non-empty cells (text + numbers). COUNT counts only numbers.',
      verify: (out) => out.includes('entries') && out.includes('numeric'),
    },
    {
      id: 'xl19', title: 'Pass or Fail Grade', difficulty: 'Beginner',
      description: 'TXN-001 has quantity E2=2. If quantity >= 3, the order is "Bulk" otherwise "Individual". Use an IF formula to check.',
      starterCode: '',
      hint: 'IF(condition, value_if_true, value_if_false). E2=2 is less than 3, so "Individual".',
      verify: (out) => out.includes('Individual'),
    },
    {
      id: 'xl20', title: 'Subtotal Calculator', difficulty: 'Beginner',
      description: 'Calculate the subtotal for TXN-001 by multiplying price (D2=149.99) by quantity (E2=2). Use a simple cell multiplication formula.',
      starterCode: '',
      hint: 'In spreadsheets, use * for multiplication. D2*E2 multiplies price by quantity.',
      verify: (out) => out.includes('299.98') || out.includes('299.98'),
    },
    {
      id: 'xl21', title: 'Total Value of All Items', difficulty: 'Beginner',
      description: 'Calculate the total value of all items by multiplying each price by its quantity and summing the results. Use SUMPRODUCT on D2:D17 and E2:E17.',
      starterCode: '',
      hint: 'SUMPRODUCT multiplies each pair of cells and sums them. It\'s like =D2*E2 + D3*E3 + ... + D17*E17.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 4000 && n < 6000;
      },
    },
    {
      id: 'xl22', title: 'Above Average Price?', difficulty: 'Beginner',
      description: 'Check if the first transaction\'s price (D2=149.99) is above the average price of all items. Show "Above Average" or "Below Average".',
      starterCode: '',
      hint: 'AVERAGE computes the mean. Compare D2 to AVERAGE(D2:D17).',
      verify: (out) => (out.includes('Above') || out.includes('Below')),
    },
    {
      id: 'xl23', title: 'Running Total Helper', difficulty: 'Intermediate',
      description: 'Calculate the running total for TXN-001 and TXN-002. Add the prices of D2 and D3. This is like a cumulative sum.',
      starterCode: '',
      hint: 'Simple addition: D2 (149.99) + D3 (29.99) = 179.98.',
      verify: (out) => out.includes('179.98') || out.includes('179.98'),
    },
    {
      id: 'xl24', title: 'High Value Order Flag', difficulty: 'Intermediate',
      description: 'TXN-001 total is D2*E2 = 299.98. If the subtotal of TXN-001 (price * qty) is greater than 200, show "High Value", otherwise "Standard".',
      starterCode: '',
      hint: 'Multiply D2*E2 first, then compare to 200.',
      verify: (out) => out.includes('High Value'),
    },
    {
      id: 'xl25', title: 'Average Quantity per Order', difficulty: 'Beginner',
      description: 'Calculate the average quantity ordered per transaction. Quantity data is in column E (E2:E17).',
      starterCode: '',
      hint: 'AVERAGE(range) calculates the arithmetic mean.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 3 && n < 5;
      },
    },
    {
      id: 'xl26', title: 'Discount Amount', difficulty: 'Intermediate',
      description: 'TXN-001 has subtotal D2*E2 = 299.98. If the subtotal > 250, apply a 10% discount. Calculate the discount amount only (not the final price).\n\nHint: discount = subtotal * 0.10',
      starterCode: '',
      hint: 'IF the total (D2*E2) exceeds 250, multiply by 0.1 to get 10% of it.',
      verify: (out) => out.includes('29.998') || out.includes('30') || out.includes('29.99'),
    },
    {
      id: 'xl27', title: 'Multiple Conditions with AND', difficulty: 'Intermediate',
      description: 'Check if TXN-001 (B2="Widget Pro", E2=2) is both an "Electronics" item AND has quantity >= 2. Use AND inside IF.',
      starterCode: '',
      hint: 'AND(condition1, condition2) returns TRUE only if both are true.',
      verify: (out) => out.includes('Eligible'),
    },
    {
      id: 'xl28', title: 'Count Electronics Items', difficulty: 'Intermediate',
      description: 'Count how many transactions are in the "Electronics" category. Category is in column C (C2:C17).',
      starterCode: '',
      hint: 'COUNTIF(range, criteria) counts cells that match the criteria.',
      verify: (out) => {
        const n = parseInt(out);
        return !isNaN(n) && n >= 4;
      },
    },
    {
      id: 'xl29', title: 'Total Revenue Electronics', difficulty: 'Advanced',
      description: 'Calculate total revenue (price * qty) for ONLY the Electronics category items. Use SUMIF on column C for category and column D for price.\nRevenue approximated as SUM of prices for Electronics items.',
      starterCode: '',
      hint: 'SUMIF(criteria_range, criteria, sum_range) sums values in sum_range where criteria_range matches.',
      verify: (out) => {
        const n = parseFloat(out);
        return !isNaN(n) && n > 600 && n < 900;
      },
    },
    {
      id: 'xl30', title: 'XLOOKUP Product Category', difficulty: 'Advanced',
      description: 'Use XLOOKUP to find the category of "Ergonomic Chair". Products are in B2:B17, categories in C2:C17.',
      starterCode: '',
      hint: 'XLOOKUP(lookup_value, lookup_array, return_array) finds the lookup in one column and returns the corresponding value from another.',
      verify: (out) => out.includes('Office'),
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

  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  useEffect(() => { onOpenRef.current?.(); }, []);

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
  const progressPct = allTopics.length > 0 ? Math.round((completedTasks.length / allTopics.length) * 100) : 0;

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
    try {
      const outputs = runPython(code);
      setCodeOutput(outputs);
      const full = outputs.join('\n');
      const passed = selectedChallenge.verify(full);
      setChallengeResult(passed ? 'pass' : 'fail');
      if (passed) markSolved(selectedChallenge.id);
    } catch (e) {
      setCodeOutput([e instanceof Error ? e.message : String(e)]);
      setChallengeResult('fail');
    }
  };

  const handleRunSQL = () => {
    if (!selectedChallenge) return;
    try {
      const query = code.trim();
      const sqlResult = executeSQL(query);
      let outputs: string[];
      if ('error' in sqlResult) {
        outputs = [sqlResult.error];
      } else if ('command' in sqlResult) {
        outputs = [sqlResult.message];
      } else {
        outputs = sqlResult.rows.map(r => sqlResult.columns.map((c, ci) => r[c] ?? r[sqlResult.columnKeys?.[ci] ?? ''] ?? '').join('\t'));
        if (outputs.length === 0) outputs = ['No results'];
      }
      setCodeOutput(outputs);
      const passed = selectedChallenge.verify(outputs.join('\n'));
      setChallengeResult(passed ? 'pass' : 'fail');
      if (passed) markSolved(selectedChallenge.id);
    } catch (e) {
      setCodeOutput([e instanceof Error ? e.message : String(e)]);
      setChallengeResult('fail');
    }
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
  }, [handleRunCode]);

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
                  <span className="text-sm font-mono text-accent font-bold">{allTopics.length > 0 ? progressPct : 0}%</span>
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
                  <span className="text-sm font-mono text-blue-600 font-bold">{allTopics.length > 0 ? Math.round((completedTasksOwn.length / allTopics.length) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${allTopics.length > 0 ? Math.round((completedTasksOwn.length / allTopics.length) * 100) : 0}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{completedTasksOwn.length}/{allTopics.length} topics</p>
              </div>
              {/* Student 2 progress */}
              {otherUserCode ? (
                <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-800">{otherUserCode}</span>
                    <span className="text-sm font-mono text-emerald-600 font-bold">{allTopics.length > 0 ? Math.round((completedTasksOther.length / allTopics.length) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${allTopics.length > 0 ? Math.round((completedTasksOther.length / allTopics.length) * 100) : 0}%` }} />
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
                <div key={`${msg.user}-${msg.time}-${i}`} className="flex gap-3">
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
