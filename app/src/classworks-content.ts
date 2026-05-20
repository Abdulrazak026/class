import { ParsedClasswork } from './components/ClassworkCard';


export const topicClassworks: Record<string, ParsedClasswork[]> = {
  'w1-d1': [
    {
      task: `List three tools you plan to use as a data analyst and what each is used for.`,
      language: 'text',
      code: ``,
      expectedOutput: `spreadsheet||database||visualization||sql||excel||python`,
      hint: `Think about spreadsheets, databases, and visualization tools.`,
    },
  ],
  'w1-d2': [
    {
      task: `Describe the six phases of the data lifecycle in your own words.`,
      language: 'text',
      code: ``,
      expectedOutput: `ask||prepare||process||analyze||share||act`,
      hint: `The phases are: Ask, Prepare, Process, Analyze, Share, Act.`,
    },
  ],
  'w1-d3': [
    {
      task: `What is the difference between a cell, a row, and a column in a spreadsheet?`,
      language: 'text',
      code: ``,
      expectedOutput: `cell||row||column||individual||horizontal||vertical`,
      hint: `Cells are individual boxes, rows go horizontal, columns go vertical.`,
    },
  ],
  'w1-d4': [
    {
      task: `Write a SUM formula that adds values in cells A1 through A10.`,
      language: 'text',
      code: ``,
      expectedOutput: `=sum||a1||a10||range`,
      hint: `Use the pattern =SUM(range)`,
    },
  ],
  'w1-d5': [
    {
      task: `Create a simple budget in your spreadsheet with at least 5 income/expense categories and a total formula.`,
      language: 'text',
      code: ``,
      expectedOutput: `budget||categories||total||sum||income||expense`,
      hint: `Use SUM to calculate totals for each category.`,
    },
  ],
  'w2-d1': [
    {
      task: `Write a formula that extracts the first 5 characters from cell A2.`,
      language: 'text',
      code: ``,
      expectedOutput: `=left||a2||5||=mid`,
      hint: `Use =LEFT(A2, 5) or =MID(A2, 1, 5)`,
    },
  ],
  'w2-d2': [
    {
      task: `Write an IF formula that returns "Pass" if cell B2 is greater than or equal to 70, and "Fail" otherwise.`,
      language: 'text',
      code: ``,
      expectedOutput: `=if||b2>=70||"pass"||"fail"`,
      hint: `Pattern: =IF(B2>=70, "Pass", "Fail")`,
    },
  ],
  'w2-d3': [
    {
      task: `What does VLOOKUP do? Write the syntax for looking up a product price in a table where the product name is in cell E2 and the table range is A2:B100.`,
      language: 'text',
      code: ``,
      expectedOutput: `vlookup||lookup||table||column||range||e2||a2:b100`,
      hint: `=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`,
    },
  ],
  'w2-d4': [
    {
      task: `Describe how you would use conditional formatting to highlight all cells in column A that contain the word "Urgent".`,
      language: 'text',
      code: ``,
      expectedOutput: `conditional formatting||formula||urgent||rule||highlight`,
      hint: `Use Home > Conditional Formatting > New Rule > Use a formula`,
    },
  ],
  'w2-d5': [
    {
      task: `What steps would you take to clean a dataset with missing values, inconsistent date formats, and duplicate rows?`,
      language: 'text',
      code: ``,
      expectedOutput: `missing||duplicate||clean||trim||remove duplicates||format`,
      hint: `Use TRIM, PROPER, Remove Duplicates, and Find & Replace.`,
    },
  ],
  'w3-d1': [
    {
      task: `What is a pivot table used for? Describe how you would create one to show total sales by region.`,
      language: 'text',
      code: ``,
      expectedOutput: `pivot table||summarize||aggregate||rows||values||region||sales`,
      hint: `Drag Region to Rows, Sales to Values, and use Sum.`,
    },
  ],
  'w3-d2': [
    {
      task: `How would you add a calculated field to a pivot table that shows profit as a percentage of sales?`,
      language: 'text',
      code: ``,
      expectedOutput: `calculated field||formula||profit||sales||percentage||analyze`,
      hint: `Use Analyze > Fields, Items & Sets > Calculated Field.`,
    },
  ],
  'w3-d3': [
    {
      task: `What is data validation and how can it prevent errors in a shared spreadsheet?`,
      language: 'text',
      code: ``,
      expectedOutput: `data validation||restrict||input||error||prevent||invalid`,
      hint: `Data Validation restricts what can be entered in a cell.`,
    },
  ],
  'w3-d4': [
    {
      task: `Which chart type would you use to show the trend of monthly sales over a year?`,
      language: 'text',
      code: ``,
      expectedOutput: `line chart||trend||time||monthly||sales`,
      hint: `A line chart is best for showing trends over time.`,
    },
  ],
  'w3-d5': [
    {
      task: `Design a simple sales dashboard with at least 3 different chart types and explain what each shows.`,
      language: 'text',
      code: ``,
      expectedOutput: `dashboard||bar chart||line chart||pie chart||sales||kpi`,
      hint: `Include a bar chart, line chart, and pie chart.`,
    },
  ],
  'w4-d1': [
    {
      task: `What is the difference between Git and GitHub?`,
      language: 'text',
      code: ``,
      expectedOutput: `git||version control||local||github||hosting||remote`,
      hint: `Git is a version control tool; GitHub is a hosting service for Git repositories.`,
    },
  ],
  'w4-d2': [
    {
      task: `Write the git commands to clone a repository, create a new branch, and switch to it.`,
      language: 'text',
      code: ``,
      expectedOutput: `git clone||git branch||git checkout||git switch`,
      hint: `Use git clone, git branch, and git checkout or git switch.`,
    },
  ],
  'w4-d3': [
    {
      task: `Explain the difference between git commit and git push. When would you use each?`,
      language: 'text',
      code: ``,
      expectedOutput: `commit||local||push||remote||save||upload`,
      hint: `Commit saves locally; Push sends to remote.`,
    },
  ],
  'w4-d4': [
    {
      task: `What is a pull request and why is it important for collaborative projects?`,
      language: 'text',
      code: ``,
      expectedOutput: `pull request||review||changes||merge||collaboration||feedback`,
      hint: `A PR proposes changes for review before merging.`,
    },
  ],
  'w4-d5': [
    {
      task: `Create a README.md outline for a data analysis project. Include at minimum: title, description, installation, usage, and results sections.`,
      language: 'text',
      code: ``,
      expectedOutput: `title||description||installation||usage||results||readme`,
      hint: `A good README explains what, why, and how of your project.`,
    },
  ],
  'w5-d1': [
    {
      task: `Explain the difference between a primary key and a foreign key. Give an example.`,
      language: 'text',
      code: ``,
      expectedOutput: `primary key||unique||identifies||foreign key||references||links`,
      hint: `Primary key uniquely identifies a row; foreign key links to another table's primary key.`,
    },
  ],
  'w5-d2': [
    {
      task: `Write a query to see all columns from the departments table.`,
      language: 'sql',
      code: `SELECT * FROM departments;`,
      expectedOutput: `id | name | location | budget
----
(3 rows)`,
      hint: `SELECT * returns all columns.`,
    },
  ],
  'w5-d3': [
    {
      task: `Write a query to find employees with a salary greater than 70000. Show their name and salary.`,
      language: 'sql',
      code: `SELECT name, salary FROM employees WHERE salary > 70000;`,
      expectedOutput: ``,
      hint: `Use WHERE with the > operator.`,
    },
  ],
  'w5-d4': [
    {
      task: `Write a query showing the 3 lowest-paid employees. Show name and salary, sorted lowest first.`,
      language: 'sql',
      code: `SELECT name, salary FROM employees ORDER BY salary ASC LIMIT 3;`,
      expectedOutput: ``,
      hint: `Use ORDER BY ... ASC and LIMIT.`,
    },
  ],
  'w5-d5': [
    {
      task: `Write a query that counts how many total employees there are in the company.`,
      language: 'sql',
      code: `SELECT COUNT(*) AS total_employees FROM employees;`,
      expectedOutput: ``,
      hint: `Use COUNT(*) to count all rows.`,
    },
  ],
  'w6-d1': [
    {
      task: `Write a query to find the average salary of all employees.`,
      language: 'sql',
      code: `SELECT AVG(salary) AS average_salary FROM employees;`,
      expectedOutput: ``,
      hint: `Use AVG() aggregate function.`,
    },
  ],
  'w6-d2': [
    {
      task: `Write a query that counts how many employees are in each department.`,
      language: 'sql',
      code: `SELECT e.department_id, COUNT(*) AS employee_count FROM employees e GROUP BY e.department_id;`,
      expectedOutput: ``,
      hint: `Use GROUP BY after SELECT.`,
    },
  ],
  'w6-d3': [
    {
      task: `Write a query showing departments with a total salary budget over 100000.`,
      language: 'sql',
      code: `SELECT e.department_id, SUM(e.salary) AS total_salary FROM employees e GROUP BY e.department_id HAVING SUM(e.salary) > 100000;`,
      expectedOutput: ``,
      hint: `Use HAVING to filter groups (not WHERE).`,
    },
  ],
  'w6-d4': [
    {
      task: `Write a query counting how many orders were placed in each year.`,
      language: 'sql',
      code: `SELECT COUNT(*) AS order_count, status FROM orders GROUP BY status;`,
      expectedOutput: ``,
      hint: `Use strftime to extract the year from a date.`,
    },
  ],
  'w6-d5': [
    {
      task: `Write a query that shows the total sales amount for each product, sorted highest to lowest.`,
      language: 'sql',
      code: `SELECT product, SUM(amount) AS total_sales FROM orders GROUP BY product ORDER BY total_sales DESC;`,
      expectedOutput: ``,
      hint: `Use SUM(amount) and ORDER BY DESC.`,
    },
  ],
  'w7-d1': [
    {
      task: `Explain what a foreign key is and how it relates two tables. Give an example from the employees and departments tables.`,
      language: 'text',
      code: ``,
      expectedOutput: `foreign key||references||primary key||employees||departments||link`,
      hint: `A foreign key in one table points to a primary key in another.`,
    },
  ],
  'w7-d2': [
    {
      task: `Write a query using INNER JOIN to show each employee name alongside their department location.`,
      language: 'sql',
      code: `SELECT e.name, d.name AS department FROM employees e INNER JOIN departments d ON e.department_id = d.id;`,
      expectedOutput: ``,
      hint: `Use INNER JOIN with the ON clause matching the related columns.`,
    },
  ],
  'w7-d3': [
    {
      task: `Write a LEFT JOIN query to show all departments (including those with no employees) and any employees in them.`,
      language: 'sql',
      code: `SELECT d.name AS department, e.name AS employee FROM departments d LEFT JOIN employees e ON d.id = e.department_id;`,
      expectedOutput: ``,
      hint: `LEFT JOIN keeps all rows from the left (departments) table.`,
    },
  ],
  'w7-d4': [
    {
      task: `What is the difference between INNER JOIN and FULL OUTER JOIN? When would you use each?`,
      language: 'text',
      code: ``,
      expectedOutput: `inner join||matches||full outer join||all rows||both tables||null`,
      hint: `INNER JOIN shows only matches; FULL OUTER JOIN shows all rows from both tables.`,
    },
  ],
  'w7-d5': [
    {
      task: `Write a query joining employees, departments, and orders to show employee name, department name, and order amount.`,
      language: 'sql',
      code: `SELECT e.name, d.name AS department, o.amount FROM employees e JOIN departments d ON e.department_id = d.id JOIN orders o ON o.customer = e.name;`,
      expectedOutput: ``,
      hint: `Chain multiple JOINs with ON clauses.`,
    },
  ],
  'w8-d1': [
    {
      task: `Write a self-join query that finds employees who work in the same department as employee id 1 (Alice).`,
      language: 'sql',
      code: `SELECT e2.name, e2.department_id FROM employees e1 JOIN employees e2 ON e1.department_id = e2.department_id WHERE e1.id = 1 AND e2.id != 1;`,
      expectedOutput: ``,
      hint: `Self-join the employees table on department, excluding the original employee.`,
    },
  ],
  'w8-d2': [
    {
      task: `Write a UNION query that combines the names of all employees and all departments into one list.`,
      language: 'sql',
      code: `SELECT name FROM employees UNION SELECT name FROM departments;`,
      expectedOutput: ``,
      hint: `UNION combines results from two SELECT statements.`,
    },
  ],
  'w8-d3': [
    {
      task: `Write a query that shows employee names in uppercase and the length of each name.`,
      language: 'sql',
      code: `SELECT UPPER(name) AS name_upper, LENGTH(name) AS name_length FROM employees;`,
      expectedOutput: ``,
      hint: `Use UPPER() and LENGTH() string functions.`,
    },
  ],
  'w8-d4': [
    {
      task: `Write a query using CASE to label employees as "High" (salary > 80000), "Medium" (salary > 50000), or "Low".`,
      language: 'sql',
      code: `SELECT name, salary, CASE WHEN salary > 80000 THEN 'High' WHEN salary > 50000 THEN 'Medium' ELSE 'Low' END AS pay_grade FROM employees;`,
      expectedOutput: ``,
      hint: `CASE creates conditional columns.`,
    },
  ],
  'w8-d5': [
    {
      task: `Write a query that shows each employee name and their department budget using a join.`,
      language: 'sql',
      code: `SELECT e.name, d.budget FROM employees e JOIN departments d ON e.department_id = d.id;`,
      expectedOutput: ``,
      hint: `Join employees to departments on the department name column.`,
    },
  ],
  'w9-d1': [
    {
      task: `Write a subquery to find employees who earn more than the average salary.`,
      language: 'sql',
      code: `SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`,
      expectedOutput: ``,
      hint: `Use a subquery in the WHERE clause with > comparison.`,
    },
  ],
  'w9-d2': [
    {
      task: `Write a query using IN with a subquery to find employees in departments located in "New York".`,
      language: 'sql',
      code: `SELECT e.name, e.department_id FROM employees e WHERE e.department_id IN (SELECT d.id FROM departments d WHERE d.name = 'Engineering');`,
      expectedOutput: ``,
      hint: `Use IN (subquery) where the subquery returns department names.`,
    },
  ],
  'w9-d3': [
    {
      task: `Write a query using a subquery in FROM to find the average salary by department, then show departments above the overall average.`,
      language: 'sql',
      code: `SELECT department_id, avg_salary FROM (SELECT e.department_id, AVG(e.salary) AS avg_salary FROM employees e GROUP BY e.department_id) WHERE avg_salary > (SELECT AVG(salary) FROM employees);`,
      expectedOutput: ``,
      hint: `The FROM subquery acts as a temporary table.`,
    },
  ],
  'w9-d4': [
    {
      task: `Write a CTE (WITH clause) that finds the top 2 highest-paid employees per department.`,
      language: 'sql',
      code: `WITH ranked AS (SELECT name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees) SELECT name, department_id, salary FROM ranked WHERE rn <= 2;`,
      expectedOutput: ``,
      hint: `CTEs use WITH ... AS (...) before the main query.`,
    },
  ],
  'w9-d5': [
    {
      task: `Write a query using EXISTS to find departments that have at least one employee.`,
      language: 'sql',
      code: `SELECT d.name FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);`,
      expectedOutput: ``,
      hint: `EXISTS returns true if the subquery returns any rows.`,
    },
  ],
  'w10-d1': [
    {
      task: `Write a query using ROW_NUMBER() to number all employees ordered by salary descending.`,
      language: 'sql',
      code: `SELECT ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank, name, salary FROM employees;`,
      expectedOutput: ``,
      hint: `ROW_NUMBER() OVER (ORDER BY ...) assigns sequential numbers.`,
    },
  ],
  'w10-d2': [
    {
      task: `Write a query using RANK() to rank employees by salary within each department.`,
      language: 'sql',
      code: `SELECT name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank FROM employees;`,
      expectedOutput: ``,
      hint: `RANK() with PARTITION BY groups ranking within each department.`,
    },
  ],
  'w10-d3': [
    {
      task: `Write a query using NTILE(4) to group employees into 4 salary quartiles.`,
      language: 'sql',
      code: `SELECT name, salary, NTILE(4) OVER (ORDER BY salary DESC) AS quartile FROM employees;`,
      expectedOutput: ``,
      hint: `NTILE(n) divides rows into n buckets.`,
    },
  ],
  'w10-d4': [
    {
      task: `Write a query using LAG() to show each employee salary alongside the previous employee salary (ordered by salary).`,
      language: 'sql',
      code: `SELECT name, salary, LAG(salary) OVER (ORDER BY salary) AS previous_salary FROM employees;`,
      expectedOutput: ``,
      hint: `LAG(column) accesses the previous row value.`,
    },
  ],
  'w10-d5': [
    {
      task: `Write a query using LEAD() to show each employee and the salary of the next higher-paid employee.`,
      language: 'sql',
      code: `SELECT name, salary, LEAD(salary) OVER (ORDER BY salary) AS next_salary FROM employees;`,
      expectedOutput: ``,
      hint: `LEAD(column) accesses the next row value.`,
    },
  ],
  'w11-d1': [
    {
      task: `Write a query showing employees with a running total of salaries ordered by salary ascending.`,
      language: 'sql',
      code: `SELECT name, salary, SUM(salary) OVER (ORDER BY salary) AS running_total FROM employees;`,
      expectedOutput: ``,
      hint: `SUM() OVER (ORDER BY ...) creates a running total.`,
    },
  ],
  'w11-d2': [
    {
      task: `Write a query showing a 3-row moving average of salaries.`,
      language: 'sql',
      code: `SELECT name, salary, AVG(salary) OVER (ORDER BY salary ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS moving_avg FROM employees;`,
      expectedOutput: ``,
      hint: `Use ROWS BETWEEN with PRECEDING and FOLLOWING.`,
    },
  ],
  'w11-d3': [
    {
      task: `Write a query that finds the salary at the 50th percentile using PERCENTILE_CONT or NTILE.`,
      language: 'sql',
      code: `SELECT name, salary, NTILE(100) OVER (ORDER BY salary) AS percentile FROM employees;`,
      expectedOutput: ``,
      hint: `NTILE(100) divides into 100 percentile groups.`,
    },
  ],
  'w11-d4': [
    {
      task: `Write a query that shows the difference between each employee salary and the average salary of their department using window functions.`,
      language: 'sql',
      code: `SELECT name, department_id, salary, salary - AVG(salary) OVER (PARTITION BY department_id) AS diff_from_dept_avg FROM employees;`,
      expectedOutput: ``,
      hint: `Combine AVG() OVER (PARTITION BY ...) with arithmetic.`,
    },
  ],
  'w11-d5': [
    {
      task: `Write a query using FIRST_VALUE to show each employee and the highest salary in their department.`,
      language: 'sql',
      code: `SELECT name, department_id, salary, FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_max FROM employees;`,
      expectedOutput: ``,
      hint: `FIRST_VALUE() OVER (PARTITION BY ... ORDER BY ... DESC) finds the top value.`,
    },
  ],
  'w12-d1': [
    {
      task: `What is database normalization? Explain the difference between 1NF, 2NF, and 3NF.`,
      language: 'text',
      code: ``,
      expectedOutput: `normalization||redundancy||1nf||2nf||3nf||dependency`,
      hint: `Normalization reduces data redundancy. 1NF removes duplicate columns, 2NF removes partial dependencies, 3NF removes transitive dependencies.`,
    },
  ],
  'w12-d2': [
    {
      task: `Write a CREATE TABLE statement for a new table called "projects" with columns: id (INTEGER PRIMARY KEY), name (TEXT), budget (REAL), and department_id (INTEGER).`,
      language: 'sql',
      code: `CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT, budget REAL, department_id INTEGER);`,
      expectedOutput: ``,
      hint: `Use CREATE TABLE with column names and data types.`,
    },
  ],
  'w12-d3': [
    {
      task: `Write an INSERT statement to add a new employee named "David" in the Engineering department with salary 75000.`,
      language: 'sql',
      code: `SELECT id, name, department_id, salary FROM employees WHERE id = 1;`,
      expectedOutput: ``,
      hint: `INSERT INTO ... VALUES ... adds a new row.`,
    },
  ],
  'w12-d4': [
    {
      task: `Write an UPDATE statement that gives all employees in Engineering a 10% raise.`,
      language: 'sql',
      code: `SELECT name, salary, salary * 1.1 AS new_salary FROM employees WHERE department_id = 1;`,
      expectedOutput: ``,
      hint: `Use UPDATE ... SET ... WHERE to modify specific rows.`,
    },
  ],
  'w12-d5': [
    {
      task: `Write a DELETE statement to remove all orders with an amount less than 100.`,
      language: 'sql',
      code: `SELECT id, customer, amount FROM orders WHERE amount < 100;`,
      expectedOutput: ``,
      hint: `DELETE FROM ... WHERE ... removes matching rows.`,
    },
  ],
  'w13-d3': [
    {
      task: `Create a list called "fruits" containing "apple", "banana", and "cherry". Then print the first item.`,
      language: 'python',
      code: `fruits = ['apple', 'banana', 'cherry']
print(fruits[0])`,
      expectedOutput: `apple`,
      hint: `List indexes start at 0.`,
    },
  ],
  'w13-d4': [
    {
      task: `Write a for loop that prints each number from 1 to 5.`,
      language: 'python',
      code: `for i in range(1, 6):
    print(i)`,
      expectedOutput: ``,
      hint: `Use range(start, stop) — stop is exclusive.`,
    },
  ],
  'w13-d5': [
    {
      task: `Write a function called "square" that takes a number and returns its square. Then call it with 5 and print the result.`,
      language: 'python',
      code: `def square(x):
    return x * x

print(square(5))`,
      expectedOutput: `25`,
      hint: `Define functions with def and use return.`,
    },
  ],
  'w14-d1': [
    {
      task: `Create a dictionary with keys "name" and "age", and values ["Alice", "Bob"] and [25, 30]. Then convert it to a pandas DataFrame and print it.`,
      language: 'python',
      code: `import pandas as pd
data = {'name': ['Alice', 'Bob'], 'age': [25, 30]}
df = pd.DataFrame(data)
print(df)`,
      expectedOutput: ``,
      hint: `Use pd.DataFrame(dict) to create DataFrames.`,
    },
  ],
  'w14-d2': [
    {
      task: `Write code to read a CSV file called "sales.csv" into a pandas DataFrame and show the first 5 rows.`,
      language: 'python',
      code: `import pandas as pd
df = pd.read_csv('sales.csv')
print(df.head())`,
      expectedOutput: ``,
      hint: `Use pd.read_csv() and .head().`,
    },
  ],
  'w14-d3': [
    {
      task: `Create a DataFrame with columns "product" and "price", then select only the "product" column and print it.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'product': ['A', 'B'], 'price': [10, 20]})
print(df['product'])`,
      expectedOutput: ``,
      hint: `Use df[column_name] to select a column.`,
    },
  ],
  'w14-d4': [
    {
      task: `Write code to check for null values in a DataFrame called "df" and then drop any rows with null values.`,
      language: 'python',
      code: `print(df.isnull().sum())
df_clean = df.dropna()
print(df_clean)`,
      expectedOutput: ``,
      hint: `Use isnull().sum() to find nulls, dropna() to remove them.`,
    },
  ],
  'w14-d5': [
    {
      task: `Create a DataFrame and fill null values in column "age" with the average age.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'age': [25, None, 30, None, 35]})
df['age'] = df['age'].fillna(df['age'].mean())
print(df)`,
      expectedOutput: ``,
      hint: `Use fillna(value) where value is df[column].mean().`,
    },
  ],
  'w15-d1': [
    {
      task: `Create a DataFrame with columns "department" and "salary", then group by department and find the average salary.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'department': ['Eng', 'Sales', 'Eng'], 'salary': [70000, 50000, 90000]})
print(df.groupby('department')['salary'].mean())`,
      expectedOutput: ``,
      hint: `Use groupby() followed by the aggregation function.`,
    },
  ],
  'w15-d2': [
    {
      task: `Create two DataFrames and merge them on a common column "id".`,
      language: 'python',
      code: `import pandas as pd
df1 = pd.DataFrame({'id': [1, 2], 'name': ['Alice', 'Bob']})
df2 = pd.DataFrame({'id': [1, 2], 'salary': [70000, 80000]})
merged = pd.merge(df1, df2, on='id')
print(merged)`,
      expectedOutput: ``,
      hint: `Use pd.merge(df1, df2, on=column).`,
    },
  ],
  'w15-d3': [
    {
      task: `Create a DataFrame with columns "date", "product", "sales". Then create a pivot table showing total sales by product.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'date': ['Jan', 'Feb', 'Jan'], 'product': ['A', 'A', 'B'], 'sales': [100, 200, 150]})
pivot = df.pivot_table(values='sales', index='product', aggfunc='sum')
print(pivot)`,
      expectedOutput: ``,
      hint: `Use pivot_table with values, index, and aggfunc.`,
    },
  ],
  'w15-d4': [
    {
      task: `Use a lambda function with apply() to convert a list of temperatures in Celsius to Fahrenheit: F = C * 9/5 + 32.`,
      language: 'python',
      code: `celsius = [0, 10, 20, 30, 100]
fahrenheit = list(map(lambda c: c * 9/5 + 32, celsius))
print(fahrenheit)`,
      expectedOutput: ``,
      hint: `Use lambda c: c * 9/5 + 32 with map().`,
    },
  ],
  'w15-d5': [
    {
      task: `Create a DataFrame and add a new column "bonus" that is 10% of the "salary" column using a lambda.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'name': ['A', 'B'], 'salary': [50000, 70000]})
df['bonus'] = df['salary'].apply(lambda x: x * 0.1)
print(df)`,
      expectedOutput: ``,
      hint: `Use .apply(lambda x: ...) on a column.`,
    },
  ],
  'w16-d1': [
    {
      task: `Create a DataFrame and print summary statistics (count, mean, std, min, max) for all numeric columns.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'age': [25, 30, 35, 28, 40], 'salary': [50000, 60000, 70000, 55000, 80000]})
print(df.describe())`,
      expectedOutput: ``,
      hint: `Use df.describe() for summary statistics.`,
    },
  ],
  'w16-d2': [
    {
      task: `Create a list of numbers and find values that are more than 2 standard deviations from the mean (potential outliers).`,
      language: 'python',
      code: `import statistics as st
nums = [10, 12, 11, 13, 45, 10, 11, 12, 9]
mean = st.mean(nums)
sd = st.stdev(nums)
outliers = [x for x in nums if abs(x - mean) > 2 * sd]
print(outliers)`,
      expectedOutput: ``,
      hint: `Use st.mean() and st.stdev() from the statistics module.`,
    },
  ],
  'w16-d3': [
    {
      task: `Create a DataFrame with two numeric columns and calculate the correlation between them.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'x': [1, 2, 3, 4, 5], 'y': [2, 4, 6, 8, 10]})
print(df.corr())`,
      expectedOutput: ``,
      hint: `Use df.corr() to get pairwise correlation matrix.`,
    },
  ],
  'w16-d4': [
    {
      task: `Create a DataFrame and print information about it including column names, non-null counts, and dtypes.`,
      language: 'python',
      code: `import pandas as pd
df = pd.DataFrame({'name': ['A', 'B', None], 'age': [25, 30, 35], 'salary': [50000, None, 70000]})
print(df.info())`,
      expectedOutput: ``,
      hint: `Use df.info() to get DataFrame metadata.`,
    },
  ],
  'w16-d5': [
    {
      task: `Write code to visualize a simple line chart of [1, 3, 2, 5, 4] using matplotlib.`,
      language: 'python',
      code: `import matplotlib.pyplot as plt
plt.plot([1, 3, 2, 5, 4])
plt.title('Sample Line Chart')
plt.show()`,
      expectedOutput: ``,
      hint: `Use plt.plot(data) and plt.show().`,
    },
  ],
  'w17-d1': [
    {
      task: `Create a simple bar chart showing the values [5, 7, 3, 8] with labels ["A", "B", "C", "D"].`,
      language: 'python',
      code: `import matplotlib.pyplot as plt
plt.bar(['A', 'B', 'C', 'D'], [5, 7, 3, 8])
plt.title('Bar Chart')
plt.show()`,
      expectedOutput: ``,
      hint: `Use plt.bar(labels, values).`,
    },
  ],
  'w17-d2': [
    {
      task: `Create a line chart with two lines: y1 = [1, 4, 9, 16] and y2 = [1, 2, 3, 4]. Add a legend.`,
      language: 'python',
      code: `import matplotlib.pyplot as plt
x = [1, 2, 3, 4]
plt.plot(x, [1, 4, 9, 16], label='Squared')
plt.plot(x, [1, 2, 3, 4], label='Linear')
plt.legend()
plt.title('Two Lines')
plt.show()`,
      expectedOutput: ``,
      hint: `Use plt.plot() twice and plt.legend().`,
    },
  ],
  'w17-d3': [
    {
      task: `Create a scatter plot with 10 random x and y values using matplotlib.`,
      language: 'python',
      code: `import matplotlib.pyplot as plt
import random
x = [random.randint(1, 100) for _ in range(10)]
y = [random.randint(1, 100) for _ in range(10)]
plt.scatter(x, y)
plt.title('Scatter Plot')
plt.show()`,
      expectedOutput: ``,
      hint: `Use plt.scatter(x, y).`,
    },
  ],
  'w17-d4': [
    {
      task: `Create a histogram of the values [1, 2, 2, 3, 3, 3, 4, 4, 5] with 5 bins.`,
      language: 'python',
      code: `import matplotlib.pyplot as plt
data = [1, 2, 2, 3, 3, 3, 4, 4, 5]
plt.hist(data, bins=5)
plt.title('Histogram')
plt.show()`,
      expectedOutput: ``,
      hint: `Use plt.hist(data, bins=N).`,
    },
  ],
  'w17-d5': [
    {
      task: `Create a pie chart showing sales by region: North=40, South=25, East=20, West=15.`,
      language: 'python',
      code: `import matplotlib.pyplot as plt
plt.pie([40, 25, 20, 15], labels=['North', 'South', 'East', 'West'], autopct='%1.1f%%')
plt.title('Sales by Region')
plt.show()`,
      expectedOutput: ``,
      hint: `Use plt.pie(values, labels=labels).`,
    },
  ],
  'w18-d1': [
    {
      task: `What is Business Intelligence (BI)? List three benefits of using BI tools for data analysis.`,
      language: 'text',
      code: ``,
      expectedOutput: `business intelligence||data||insights||decision||visualization||reporting`,
      hint: `BI transforms raw data into actionable insights for decision-making.`,
    },
  ],
  'w18-d2': [
    {
      task: `Describe the steps to connect a data source (like a CSV or SQL database) to a BI tool like Power BI or Tableau.`,
      language: 'text',
      code: ``,
      expectedOutput: `connect||data source||get data||import||power bi||tableau||csv||sql`,
      hint: `Use Get Data in Power BI or Connect in Tableau.`,
    },
  ],
  'w18-d3': [
    {
      task: `What is a star schema in data modeling? Explain the difference between fact tables and dimension tables.`,
      language: 'text',
      code: ``,
      expectedOutput: `star schema||fact table||dimension table||central||foreign key`,
      hint: `A central fact table connects to multiple dimension tables.`,
    },
  ],
  'w18-d4': [
    {
      task: `Write a DAX formula to create a calculated column that calculates total price = quantity * unit price.`,
      language: 'text',
      code: ``,
      expectedOutput: `total price||quantity||unit price||dax||calculated column`,
      hint: `DAX: Total Price = [Quantity] * [Unit Price]`,
    },
  ],
  'w18-d5': [
    {
      task: `Describe the key elements of an effective BI dashboard report. What should it include?`,
      language: 'text',
      code: ``,
      expectedOutput: `kpi||filter||chart||label||interactive||dashboard`,
      hint: `Include KPIs, filters, charts, and clear labels.`,
    },
  ],
  'w19-d1': [
    {
      task: `What is DAX (Data Analysis Expressions)? Write a DAX formula for a measure that calculates total sales.`,
      language: 'text',
      code: ``,
      expectedOutput: `dax||data analysis expressions||measure||total sales||sum`,
      hint: `DAX: Total Sales = SUM(Sales[Amount])`,
    },
  ],
  'w19-d2': [
    {
      task: `Write a DAX measure that calculates year-over-year sales growth as a percentage.`,
      language: 'text',
      code: ``,
      expectedOutput: `dax||year-over-year||growth||percentage||sameperiodlastyear||calculate`,
      hint: `Use CALCULATE with SAMEPERIODLASTYEAR.`,
    },
  ],
  'w19-d3': [
    {
      task: `What are interactive filters (slicers) in Power BI? How do they improve user experience?`,
      language: 'text',
      code: ``,
      expectedOutput: `slicer||filter||interactive||visual||user experience||power bi`,
      hint: `Slicers let users filter data visually with buttons or dropdowns.`,
    },
  ],
  'w19-d4': [
    {
      task: `List three best practices for data visualization. Why is choosing the right chart type important?`,
      language: 'text',
      code: ``,
      expectedOutput: `appropriate chart||avoid clutter||consistent color||visualization||best practice`,
      hint: `Use appropriate charts, avoid clutter, use consistent colors.`,
    },
  ],
  'w19-d5': [
    {
      task: `Describe how you would design an interactive dashboard for monitoring sales performance across regions.`,
      language: 'text',
      code: ``,
      expectedOutput: `dashboard||interactive||sales||region||kpi||map||slicer`,
      hint: `Include maps, KPI cards, trend lines, and region slicers.`,
    },
  ],
  'w19-d6': [
    {
      task: `Write a DAX measure using CALCULATE to filter sales for only the "Technology" product category.`,
      language: 'text',
      code: ``,
      expectedOutput: `calculate||sum||sales||technology||filter||dax`,
      hint: `CALCULATE(SUM(Sales[Amount]), Product[Category] = "Technology")`,
    },
  ],
  'w19-d7': [
    {
      task: `What is the Power BI service and how does it differ from Power BI Desktop?`,
      language: 'text',
      code: ``,
      expectedOutput: `power bi service||cloud||desktop||build||share||publish`,
      hint: `Service is cloud-based sharing; Desktop is for building reports.`,
    },
  ],
  'w19-d8': [
    {
      task: `Describe row-level security (RLS) in Power BI. Why would you use it?`,
      language: 'text',
      code: ``,
      expectedOutput: `row-level security||rls||restrict||access||role||filter`,
      hint: `RLS restricts data access to specific users based on roles.`,
    },
  ],
  'w19-d9': [
    {
      task: `What are some ways to optimize slow Power BI reports? List at least three optimization techniques.`,
      language: 'text',
      code: ``,
      expectedOutput: `optimize||performance||reduce columns||aggregation||dax||power bi`,
      hint: `Reduce columns, use aggregations, optimize DAX.`,
    },
  ],
  'w20-d1': [
    {
      task: `Why is it important to understand your audience before creating a data presentation?`,
      language: 'text',
      code: ``,
      expectedOutput: `audience||understand||level of detail||context||tailor||communication`,
      hint: `Different audiences need different levels of detail and context.`,
    },
  ],
  'w20-d2': [
    {
      task: `Which chart type is best for showing the relationship between two numeric variables?`,
      language: 'text',
      code: ``,
      expectedOutput: `scatter plot||relationship||correlation||numeric||variables`,
      hint: `A scatter plot shows relationships between two numeric variables.`,
    },
  ],
  'w20-d3': [
    {
      task: `What is chart junk and why should you avoid it in data visualization?`,
      language: 'text',
      code: ``,
      expectedOutput: `chart junk||unnecessary||decorative||distract||clutter||visualization`,
      hint: `Chart junk is unnecessary decorative elements that distract from data.`,
    },
  ],
  'w20-d4': [
    {
      task: `List the key elements of a compelling data story. How does narrative differ from raw data?`,
      language: 'text',
      code: ``,
      expectedOutput: `context||narrative||insight||audience||story||data`,
      hint: `A story has context, conflict, and resolution — not just numbers.`,
    },
  ],
  'w20-d5': [
    {
      task: `Outline the structure of a 5-minute data presentation. What slides would you include?`,
      language: 'text',
      code: ``,
      expectedOutput: `hook||context||insight||recommendation||qa||presentation`,
      hint: `Include: hook, context, key insights, recommendations, Q&A.`,
    },
  ],
  'w21-d1': [
    {
      task: `Write Python code to calculate the mean, median, and mode of the list [4, 8, 6, 5, 3, 8, 7].`,
      language: 'python',
      code: `import statistics as st
data = [4, 8, 6, 5, 3, 8, 7]
print('Mean:', st.mean(data))
print('Median:', st.median(data))
print('Mode:', st.mode(data))`,
      expectedOutput: ``,
      hint: `Use st.mean(), st.median(), st.mode().`,
    },
  ],
  'w21-d2': [
    {
      task: `Use Python to calculate the probability of rolling a 6 on a fair six-sided die (simulate 10000 rolls).`,
      language: 'python',
      code: `import random
rolls = [random.randint(1, 6) for _ in range(10000)]
prob = rolls.count(6) / len(rolls)
print(f'Probability of 6: {prob:.3f}')`,
      expectedOutput: ``,
      hint: `Use random.randint(1, 6) to simulate die rolls.`,
    },
  ],
  'w21-d3': [
    {
      task: `What is a null hypothesis? Give an example of a null and alternative hypothesis for an A/B test.`,
      language: 'text',
      code: ``,
      expectedOutput: `null hypothesis||h0||no difference||alternative hypothesis||h1||ab test`,
      hint: `H0: no difference between groups. H1: there is a difference.`,
    },
  ],
  'w21-d4': [
    {
      task: `What is a p-value and how is it used in hypothesis testing? What does p < 0.05 mean?`,
      language: 'text',
      code: ``,
      expectedOutput: `p-value||probability||null hypothesis||evidence||0.05||statistically significant`,
      hint: `A p-value < 0.05 means strong evidence against the null hypothesis.`,
    },
  ],
  'w21-d5': [
    {
      task: `Write Python code using scipy.stats to perform a t-test comparing two sample groups.`,
      language: 'python',
      code: `from scipy import stats
group1 = [23, 25, 29, 32, 28]
group2 = [30, 35, 33, 31, 36]
t_stat, p_value = stats.ttest_ind(group1, group2)
print(f't-statistic: {t_stat:.3f}, p-value: {p_value:.3f}')`,
      expectedOutput: ``,
      hint: `Use stats.ttest_ind(group1, group2).`,
    },
  ],
  'w22-d1': [
    {
      task: `What are the 3 most important projects you should include in a data analytics portfolio?`,
      language: 'text',
      code: ``,
      expectedOutput: `sql||python||visualization||portfolio||project||dashboard`,
      hint: `Include projects that show SQL, Python/Pandas, and visualization skills.`,
    },
  ],
  'w22-d2': [
    {
      task: `What sections should a good README file include for a data analysis project?`,
      language: 'text',
      code: ``,
      expectedOutput: `title||description||installation||usage||results||readme`,
      hint: `Include: title, description, installation, usage, data sources, results, and license.`,
    },
  ],
  'w22-d3': [
    {
      task: `How can GitHub Pages be used to host a data analytics portfolio?`,
      language: 'text',
      code: ``,
      expectedOutput: `github pages||host||portfolio||repository||static site`,
      hint: `Use GitHub Pages to host a portfolio site from a repository.`,
    },
  ],
  'w22-d4': [
    {
      task: `Describe how you would build a personal brand as a data analyst on LinkedIn.`,
      language: 'text',
      code: ``,
      expectedOutput: `linkedin||brand||profile||share||project||network||post`,
      hint: `Share projects, write posts about data, engage with the analytics community.`,
    },
  ],
  'w22-d5': [
    {
      task: `List 3 portfolio projects that demonstrate SQL, Python, and BI skills respectively.`,
      language: 'text',
      code: ``,
      expectedOutput: `sql||python||bi||portfolio||project||dashboard||analysis`,
      hint: `SQL: sales analysis. Python: customer segmentation. BI: executive dashboard.`,
    },
  ],
  'w23-d1': [
    {
      task: `How should you tailor your resume for a data analyst job application? What keywords would you include?`,
      language: 'text',
      code: ``,
      expectedOutput: `resume||tailor||keywords||sql||python||tableau||job description`,
      hint: `Use keywords from the job description like SQL, Python, Tableau, etc.`,
    },
  ],
  'w23-d2': [
    {
      task: `List 5 strong action verbs to use in a data analyst resume bullets.`,
      language: 'text',
      code: ``,
      expectedOutput: `analyzed||built||designed||optimized||automated||action verbs`,
      hint: `Analyzed, Built, Designed, Optimized, Automated.`,
    },
  ],
  'w23-d3': [
    {
      task: `What sections should a strong LinkedIn profile for a data analyst include?`,
      language: 'text',
      code: ``,
      expectedOutput: `headline||about||experience||skills||recommendations||featured`,
      hint: `Headline, About, Experience, Skills, Recommendations, Featured projects.`,
    },
  ],
  'w23-d4': [
    {
      task: `Describe an effective strategy for networking with data professionals on LinkedIn.`,
      language: 'text',
      code: ``,
      expectedOutput: `network||engage||connect||linkedin||data||professional||message`,
      hint: `Engage with posts, join data groups, send personalized connection requests.`,
    },
  ],
  'w23-d5': [
    {
      task: `Create a list of 5 common data analyst interview questions and brief answers.`,
      language: 'text',
      code: ``,
      expectedOutput: `sql||join||missing data||project||interview||question`,
      hint: `Questions: Explain a SQL join, describe a project, how to handle missing data, etc.`,
    },
  ],
  'w24-d1': [
    {
      task: `Describe the STAR method for answering behavioral interview questions. Give an example.`,
      language: 'text',
      code: ``,
      expectedOutput: `star||situation||task||action||result||behavioral||interview`,
      hint: `STAR: Situation, Task, Action, Result.`,
    },
  ],
  'w24-d2': [
    {
      task: `Write a SQL query to find the second highest salary from an employees table.`,
      language: 'sql',
      code: `SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`,
      expectedOutput: ``,
      hint: `Use a subquery to exclude the max salary, then find the new max.`,
    },
  ],
  'w24-d3': [
    {
      task: `Write a Python function that checks if a string is a palindrome (reads the same forwards and backwards).`,
      language: 'python',
      code: `def is_palindrome(s):
    s = s.lower().replace(' ', '')
    return s == s[::-1]

print(is_palindrome('racecar'))
print(is_palindrome('hello'))`,
      expectedOutput: ``,
      hint: `Use slicing [::-1] to reverse a string.`,
    },
  ],
  'w24-d4': [
    {
      task: `How would you explain a complex technical concept (like a SQL join) to a non-technical stakeholder?`,
      language: 'text',
      code: ``,
      expectedOutput: `analogy||simple||non-technical||join||stakeholder||explain`,
      hint: `Use analogies — a join is like matching up information from two different filing cabinets.`,
    },
  ],
  'w24-d5': [
    {
      task: `What questions should you ask the interviewer during a data analyst job interview?`,
      language: 'text',
      code: ``,
      expectedOutput: `team structure||tools||data sources||career growth||interviewer||question`,
      hint: `Ask about team structure, tools used, data sources, career growth.`,
    },
  ],
  'w25-d1': [
    {
      task: `List the top 5 skills you learned in this course and how each prepares you for a data analyst role.`,
      language: 'text',
      code: ``,
      expectedOutput: `sql||python||bi||statistics||storytelling||data analyst`,
      hint: `SQL for querying, Python for analysis, BI for dashboards, Statistics for inference, Storytelling for communication.`,
    },
  ],
  'w25-d2': [
    {
      task: `Review your portfolio projects. What improvements could you make to each one?`,
      language: 'text',
      code: ``,
      expectedOutput: `readme||visualization||clean code||improvement||portfolio||documentation`,
      hint: `Add better READMEs, include visualizations, ensure code is clean.`,
    },
  ],
  'w25-d3': [
    {
      task: `Conduct a self-mock interview: answer "Tell me about a time you used data to solve a problem."`,
      language: 'text',
      code: ``,
      expectedOutput: `star||situation||task||action||result||data||problem`,
      hint: `Use STAR: Situation, Task, Action, Result.`,
    },
  ],
  'w25-d4': [
    {
      task: `Create a 30-day job application plan. How many applications per week? How will you track them?`,
      language: 'text',
      code: ``,
      expectedOutput: `applications||week||track||spreadsheet||plan||30-day`,
      hint: `Aim for 5-10 applications per week. Track in a spreadsheet.`,
    },
  ],
  'w25-d5': [
    {
      task: `Which data analytics certification will you pursue first: Google Data Analytics, IBM Data Analyst, or Microsoft PL-300? Why?`,
      language: 'text',
      code: ``,
      expectedOutput:       `certification||google data analytics||ibm data analyst||pl-300||power bi||beginner`,
      hint: `Google is best for beginners, Microsoft PL-300 is best for Power BI roles.`,
    },
  ],
  'w_adv1-d1': [
    {
      task: `Write a SUMIFS formula that sums sales in column C where category in column B is "Electronics" and region in column E is "North".`,
      language: 'text',
      code: ``,
      expectedOutput: `sumifs||c:c||b:b||"electronics"||e:e||"north"`,
      hint: `=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)`,
    },
  ],
  'w_adv1-d2': [
    {
      task: `Write an INDEX-MATCH formula to look up the price of "Widget C" from a table where A2:A6 contains product names and B2:B6 contains prices.`,
      language: 'text',
      code: ``,
      expectedOutput: `index||match||"widget c"||a2:a6||b2:b6||0`,
      hint: `=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))`,
    },
  ],
  'w_adv1-d3': [
    {
      task: `What is the difference between a traditional array formula (Ctrl+Shift+Enter) and a dynamic array formula in modern Excel?`,
      language: 'text',
      code: ``,
      expectedOutput: `ctrl+shift+enter||dynamic array||spill||traditional||modern||excel 365`,
      hint: `Dynamic arrays auto-spill; traditional require CSE.`,
    },
  ],
  'w_adv1-d4': [
    {
      task: `Explain when you would use Goal Seek vs. Scenario Manager for what-if analysis.`,
      language: 'text',
      code: ``,
      expectedOutput: `goal seek||one input||target value||scenario manager||multiple inputs||compare`,
      hint: `Goal Seek changes one input for a target; Scenario Manager compares multiple input sets.`,
    },
  ],
  'w_adv1-d5': [
    {
      task: `Describe the structure of a financial model that projects revenue over 5 years. What key sections should it include?`,
      language: 'text',
      code: ``,
      expectedOutput: `historical data||assumptions||projections||scenarios||summary||metrics`,
      hint: `Include: historical data, growth assumptions, projections, scenarios, summary.`,
    },
  ],
  'w_pwr1-d1': [
    {
      task: `What does ETL stand for and why is it important in data analysis?`,
      language: 'text',
      code: ``,
      expectedOutput: `extract||transform||load||etl||data pipeline||clean||reshape`,
      hint: `Extract, Transform, Load — it's the foundation of data pipelines.`,
    },
  ],
  'w_pwr1-d2': [
    {
      task: `When would you use Flash Fill instead of formulas like LEFT or MID? Give an example.`,
      language: 'text',
      code: ``,
      expectedOutput: `flash fill||pattern||ctrl+e||quick||formula||example`,
      hint: `Flash Fill is faster for one-time tasks; formulas are better for repeatable processes.`,
    },
  ],
  'w_pwr1-d3': [
    {
      task: `List 5 essential Excel keyboard shortcuts and describe when you would use each one.`,
      language: 'text',
      code: ``,
      expectedOutput: `shortcut||ctrl+arrow||f2||alt+=||ctrl+shift+l||f4||productivity`,
      hint: `Think navigation, editing, and formula shortcuts.`,
    },
  ],
  'w_pwr1-d4': [
    {
      task: `Describe three strategies for handling missing values in a dataset and when each is appropriate.`,
      language: 'text',
      code: ``,
      expectedOutput: `delete row||fill mean||fill median||fill unknown||interpolate||missing||strategy`,
      hint: `Delete if few missing, fill with mean if numeric, use 'Unknown' for text.`,
    },
  ],
  'w_pwr1-d5': [
    {
      task: `Outline the steps in a complete data pipeline from raw data to final analysis.`,
      language: 'text',
      code: ``,
      expectedOutput: `extract||clean||transform||analyze||visualize||document||pipeline`,
      hint: `Steps: Extract → Clean → Transform → Analyze → Visualize → Document.`,
    },
  ],
};
