"""
Patch data-content.ts to fill the 4 identified interview prep gaps:
  Gap 1: SQL query optimization / EXPLAIN PLAN (w12-d4)
  Gap 2: INSERT INTO dedup-safe production loading (w12-d3)
  Gap 3: Python reusable data validation function (w16-d4)
  Gap 4: Business case investigation framework (w24-d2)
"""

with open("src/data-content.ts", "r", encoding="utf-8") as f:
    s = f.read()

BN = chr(0x5C) + "n"  # literal backslash + n  (JS \n escape inside string)


def make_section(lines):
    """Convert a list of text lines into a JS-string segment.
    Real newlines become BN; lines join with BN."""
    joined = BN.join(lines)
    return BN + BN + joined  # prepend double blank line


# =========================================================
# GAP 1: Query Optimization in w12-d4 (add EXPLAIN content)
# =========================================================
lines1 = [
    "## Query Optimization for Interviews (Q12)",
    "",
    "A common senior SQL interview question: *A query on a 50-million-row table is running slowly. How would you diagnose and fix it?*",
    "",
    "**Step 1 - Run EXPLAIN (or EXPLAIN ANALYZE):**",
    "```sql",
    "-- Shows the query plan without executing",
    "EXPLAIN SELECT * FROM orders WHERE customer_id = 42;",
    "",
    "-- Shows plan AND actual runtime stats",
    "EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;",
    "```",
    "Look for these in the output:",
    "- **Seq Scan** (Sequential Scan): reads EVERY row. Bad on large tables - indicates a missing index.",
    "- **Index Scan**: jumps directly to matching rows using an index. Fast.",
    "- **Hash Join / Nested Loop**: different join strategies with different cost profiles.",
    "",
    "**Step 2 - Add indexes on filtered/joined columns:**",
    "```sql",
    "-- Single-column index on a WHERE column",
    "CREATE INDEX idx_orders_customer ON orders(customer_id);",
    "",
    "-- Composite index for multi-column WHERE/JOIN",
    "CREATE INDEX idx_orders_cust_date ON orders(customer_id, order_date);",
    "```",
    "",
    "**Step 3 - Other optimization levers:**",
    "- Replace SELECT * with only the columns you need (reduces data transfer)",
    "- Filter early with WHERE before JOINs when possible",
    "- Break complex queries into CTEs so the optimizer can plan each step",
    "- Consider materialized views for repeated heavy aggregations",
    "- Partition large tables by date or region",
    "",
    "**Interview answer framework:** Say: 'I start by running EXPLAIN ANALYZE to see if the database is doing a Seq Scan or using an index. If it is a Seq Scan, I add an index on the filtered column. I also look at whether SELECT * can be narrowed, and whether complex logic can be broken into CTEs.'",
    "",
    ":::checkpoint",
    "What does a Seq Scan in EXPLAIN output indicate?",
    "A) The query is using an index efficiently",
    "B) The database is reading every row - likely a missing index on large tables",
    "C) The query ran successfully",
    "D) Results are sorted",
    "Correct: B",
]

a1 = "D) Encrypts the table" + BN + 'Correct: B",'
r1 = "D) Encrypts the table" + BN + "Correct: B" + make_section(lines1) + '",'
assert a1 in s, "Gap1 anchor not found"
s = s.replace(a1, r1, 1)
print("Gap 1 patched (Query Optimization)")

# =========================================================
# GAP 2: INSERT INTO dedup-safe loading in w12-d3
# =========================================================
lines2 = [
    "## INSERT INTO for Production Data Loading (Avoiding Duplicates)",
    "",
    "A common interview scenario: *Load new customer rows from a staging table into production without creating duplicates.*",
    "",
    "**Safe INSERT using NOT EXISTS:**",
    "```sql",
    "INSERT INTO customers (customer_id, customer_name, email, created_date)",
    "SELECT s.customer_id, s.customer_name, s.email, CURRENT_DATE",
    "FROM staging_customers s",
    "WHERE NOT EXISTS (",
    "  SELECT 1 FROM customers c",
    "  WHERE c.customer_id = s.customer_id",
    "     OR c.email = s.email",
    ");",
    "```",
    "",
    "**Alternative with LEFT JOIN:**",
    "```sql",
    "INSERT INTO customers (customer_id, customer_name, email)",
    "SELECT s.customer_id, s.customer_name, s.email",
    "FROM staging_customers s",
    "LEFT JOIN customers c ON c.customer_id = s.customer_id",
    "WHERE c.customer_id IS NULL;",
    "```",
    "",
    "**Why these work:**",
    "- NOT EXISTS: for each staging row, checks whether a matching record already exists. If yes, skip. If no, insert.",
    "- LEFT JOIN ... WHERE IS NULL: only returns staging rows with no match in production.",
    "",
    "**Interview answer tip:** Before writing the query, say: 'I always check for existing records before inserting because loading duplicates corrupts aggregate reports and violates primary key constraints.' This shows data integrity thinking.",
    "",
    ":::checkpoint",
    "Which SQL pattern safely loads new rows from a staging table without creating duplicates?",
    "A) Plain INSERT INTO ... SELECT (no check)",
    "B) INSERT WHERE NOT EXISTS or LEFT JOIN ... WHERE target IS NULL",
    "C) TRUNCATE the target table first, then INSERT",
    "D) UPDATE the staging table first",
    "Correct: B",
]

a2 = "D) TRUNCATE supports WHERE" + BN + 'Correct: A",'
r2 = "D) TRUNCATE supports WHERE" + BN + "Correct: A" + make_section(lines2) + '",'
assert a2 in s, "Gap2 anchor not found"
s = s.replace(a2, r2, 1)
print("Gap 2 patched (INSERT INTO dedup)")

# =========================================================
# GAP 3: Python data validation function in w16-d4
# =========================================================
lines3 = [
    "## Reusable Data Validation Functions (Q26 style)",
    "",
    "A Python interview question you will encounter: *Write a function that validates a dataset before analysis.* This tests whether you write reusable, defensive code - not just one-off scripts.",
    "",
    "```python",
    "import pandas as pd",
    "",
    "def validate_dataset(df, required_cols, numeric_cols=None, date_cols=None):",
    '    """Validate a DataFrame before analysis.',
    "    Returns True if valid, prints issues and returns False otherwise.",
    '    """',
    "    issues = []",
    "",
    "    # 1. Check required columns exist",
    "    missing = [c for c in required_cols if c not in df.columns]",
    "    if missing:",
    '        issues.append(f"Missing required columns: {missing}")',
    "",
    "    # 2. Check for excessive missing values (> 20%)",
    "    null_pct = (df.isnull().sum() / len(df) * 100).round(1)",
    "    high_null = null_pct[null_pct > 20].to_dict()",
    "    if high_null:",
    '        issues.append(f"Columns with >20% nulls: {high_null}")',
    "",
    "    # 3. Check numeric columns for negatives",
    "    if numeric_cols:",
    "        for col in numeric_cols:",
    "            if col in df.columns and (df[col] < 0).any():",
    '                issues.append(f"{col} has {(df[col] < 0).sum()} negative values")',
    "",
    "    # 4. Check date columns parse correctly",
    "    if date_cols:",
    "        for col in date_cols:",
    "            if col in df.columns:",
    "                try:",
    "                    pd.to_datetime(df[col])",
    "                except Exception as e:",
    '                    issues.append(f"{col} has unparseable dates: {e}")',
    "",
    "    # 5. Check for duplicate rows",
    "    dupes = df.duplicated().sum()",
    "    if dupes > 0:",
    '        issues.append(f"{dupes} duplicate rows found")',
    "",
    "    if issues:",
    '        print("VALIDATION FAILED:")',
    "        for issue in issues:",
    '            print(f"  - {issue}")',
    "        return False",
    "",
    '    print("All validations passed.")',
    "    return True",
    "",
    "# Usage",
    "orders = pd.read_csv('orders.csv')",
    "if validate_dataset(orders,",
    '                    required_cols=["customer_id", "amount", "order_date"],',
    '                    numeric_cols=["amount"],',
    '                    date_cols=["order_date"]):',
    "    # proceed with analysis",
    "    pass",
    "```",
    "",
    "**Why this matters in interviews:** Writing a reusable function shows you think about maintainability. The pattern - check required columns, check null percentages, check value ranges, check date validity, check duplicates - is exactly the mental checklist you should run on every new dataset.",
    "",
    "**Career changers tip:** Even if you have not used this pattern professionally, you can say: 'In my portfolio project I created a validation function to catch data issues early rather than discovering them mid-analysis. It saved hours of backtracking.'",
    "",
    ":::checkpoint",
    "Why write a reusable validation function instead of inline checks?",
    "A) It runs faster than inline checks",
    "B) It is reusable across datasets, consistently catches issues, and is easier to maintain",
    "C) It is required by Pandas",
    "D) Inline ad-hoc checks are always better",
    "Correct: B",
]

a3 = "D) A visualization" + BN + 'Correct: B",'
r3 = "D) A visualization" + BN + "Correct: B" + make_section(lines3) + '",'
assert a3 in s, "Gap3 anchor not found"
s = s.replace(a3, r3, 1)
print("Gap 3 patched (Python validation function)")

# =========================================================
# GAP 4: Business case investigation framework in w24-d2
# =========================================================
lines4 = [
    "## Business Case Investigation Framework (Q32 and Q34 style)",
    "",
    "Interviewers often give open-ended scenarios. The structured approach matters as much as the answer.",
    "",
    "**Classic scenario: 'Revenue dropped 15% last month. Walk me through your investigation.'**",
    "",
    "**Step 1 - Clarify BEFORE querying:**",
    "- Is the drop across ALL products or one category?",
    "- Is it all customers or a specific segment (SMB vs Enterprise)?",
    "- Is it all regions or one geography?",
    "- Same period last year - is this seasonal?",
    "Asking these questions immediately signals analytical maturity.",
    "",
    "**Step 2 - Segment the data to isolate the source:**",
    "```sql",
    "SELECT",
    "  product_category,",
    "  SUBSTR(order_date, 1, 7) AS month,",
    "  SUM(amount) AS revenue",
    "FROM orders",
    "WHERE order_date >= '2024-10-01'",
    "GROUP BY product_category, month",
    "ORDER BY month DESC, revenue ASC;",
    "```",
    "",
    "**Step 3 - Form and test hypotheses systematically:**",
    "| Hypothesis | How to test with SQL/data |",
    "|---|---|",
    "| Lost a major customer | GROUP BY customer, compare to prior period |",
    "| Price decrease | CHECK AVG(amount) over time |",
    "| Fewer orders (not lower prices) | COUNT(orders) not just SUM(revenue) |",
    "| Seasonality | Compare same month last year with LAG(..., 12) |",
    "",
    "**Step 4 - Quantify and communicate clearly:**",
    "Do NOT say 'revenue dropped.' Say: 'Enterprise segment revenue fell 22% while SMB grew 3%. Net impact: -15%. We lost 2 enterprise contracts in week 3. Recommended action: customer retention outreach to at-risk enterprise accounts.'",
    "",
    "**For product feature success (Q34 style):**",
    "1. Define success BEFORE looking at data (conversion rate? retention? engagement?)",
    "2. Ideally use A/B test data (treatment vs control). If not available, use before/after with time-series.",
    "3. Check for confounders: did anything else change at the same time (pricing, marketing, seasonality)?",
    "4. Quantify business impact, not just statistical significance.",
    "",
    "**The key insight:** Interviewers are not just testing SQL. They want to see that you approach problems like a business analyst - clarify scope, segment data, form hypotheses, test them systematically, and communicate findings in business terms.",
    "",
    ":::checkpoint",
    "When investigating a revenue drop, what is the FIRST thing to do?",
    "A) Write a complex SQL query immediately",
    "B) Clarify the scope: is the drop everywhere or concentrated in one segment?",
    "C) Blame the last deployment",
    "D) Present the finding to leadership without investigating",
    "Correct: B",
]

a4 = "most complex syntax possible" + BN + 'Correct: B",'
r4 = "most complex syntax possible" + BN + "Correct: B" + make_section(lines4) + '",'
assert a4 in s, "Gap4 anchor not found"
s = s.replace(a4, r4, 1)
print("Gap 4 patched (Business case framework)")

# =========================================================
# Write back via temp file + rename
# =========================================================
import os
import shutil

tmp_path = os.path.join(os.getcwd(), "src", "data-content.ts.tmp")
final_path = os.path.join(os.getcwd(), "src", "data-content.ts")

with open(tmp_path, "w", encoding="utf-8") as f:
    f.write(s)

shutil.move(tmp_path, final_path)

print("SUCCESS - all 4 gaps patched.")
print("File size (bytes):", os.path.getsize(final_path))
