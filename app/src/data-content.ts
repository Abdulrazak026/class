import { Module } from "./data";

export const curriculum: Module[] = [
  {
    id: "week1",
    title: "Week 1: Orientation & Spreadsheets 101 (Month 1)",
    durationText: "WEEK 1",
    focus: "Excel, Google Sheets, Fundamentals",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w1-d1",
        title: "Day 1: What is Data Analysis?",
        description:
          "Understand what data analysis really means, what data analysts do daily, and why this career pays well",
        type: "learn",
        duration: "45-60 mins",
        content:
          'Welcome to the Data Analyst Accelerator. By the time you finish this program, you will be able to take raw data and turn it into insights that drive real business decisions. But first: what exactly is data analysis, and what does a data analyst actually do?\n\n## What is Data Analysis?\n\nData analysis is the practice of examining raw data to answer questions, solve problems, and make better decisions. Every company on Earth collects data: sales numbers, customer feedback, website clicks, inventory levels, support tickets, employee records. That data is worthless sitting in a database. It only becomes valuable when someone analyzes it and finds meaning.\n\nThink of data analysis as a **translation process**:\n- Raw data -> Cleaned data -> Patterns and insights -> Business decisions\n\nA data analyst sits at this critical intersection: they speak both the language of data (SQL, Python, spreadsheets) and the language of business (revenue, costs, customers, strategy). They are **translators between the database and the boardroom**.\n\n## The 4 Types of Data Analysis\n\nEvery data analysis task falls into one of four categories:\n\n### 1. Descriptive Analysis: "What happened?"\nThis is the most basic type. You summarize historical data to understand what occurred. Examples: *"Sales were $1.2M last quarter."* *"Customer satisfaction dropped 5% in March."* Tools: Excel pivot tables, SQL aggregations, dashboards.\n\n### 2. Diagnostic Analysis: "Why did it happen?"\nYou dig deeper to find the root cause. Examples: *"Sales dropped because our top-selling product went out of stock."* *"Satisfaction fell because response times increased."* Tools: SQL filtering, drill-down queries, correlation analysis.\n\n### 3. Predictive Analysis: "What will happen?"\nYou use historical patterns to forecast future outcomes. Examples: *"Based on current trends, Q4 revenue will hit $1.5M."* *"Customer churn is predicted to increase 10% next quarter."* Tools: Python statistics, regression models, time series forecasting.\n\n### 4. Prescriptive Analysis: "What should we do?"\nThe most advanced type. You recommend specific actions based on data. Examples: *"Discount winter jackets by 30% to clear inventory before spring."* *"Increase server capacity by 50% next month based on traffic projections."* Tools: Python optimization, scenario modeling, A/B testing.\n\n**Most analysts start with descriptive and diagnostic, then level up to predictive and prescriptive as they gain experience.** This course covers all four.\n\n## What Does a Data Analyst Do Every Day?\n\nA data analyst\'s day-to-day work varies by industry and company size, but the core activities are always the same:\n\n**1. Answer Questions with Data**\nA manager asks: *"Why did sales drop last month?"* The analyst pulls the data, finds that a key product went out of stock, quantifies the revenue loss, and presents the finding in a clear chart.\n\n**2. Build Reports and Dashboards**\nAnalysts create dashboards that executives check daily: showing KPIs like revenue, customer count, conversion rate. These dashboards are the company\'s vital signs.\n\n**3. Find Opportunities and Problems**\nBefore anyone asks, a good analyst proactively looks for patterns. *"I noticed our email campaign open rate dropped 15% when we changed the subject line format. Let me run an A/B test to confirm."*\n\n**4. Clean and Prepare Data**\nThis is the least glamorous but most important part. Real-world data is messy: missing values, inconsistent formats, duplicate records. Analysts spend 40-60% of their time just getting data ready for analysis.\n\n**5. Communicate Findings**\nThe analysis is useless if nobody understands it. Analysts present findings in meetings, write reports, and build visualizations that tell a clear story.\n\n## Real-World Example: Meet Sarah\n\nSarah is a data analyst at an e-commerce company. Here is her typical week:\n\n- **Monday morning:** Checks the weekly dashboard. Notices the cart abandonment rate jumped from 60% to 75% over the weekend.\n- **Monday afternoon:** Runs a SQL query to find when the spike started. Discovers a new checkout page was deployed Friday night.\n- **Tuesday:** Analyzes session data. Finds the new checkout has an extra required field that frustrates users.\n- **Wednesday:** Presents findings to the product team with a recommendation: revert the checkout change or make the extra field optional.\n- **Thursday:** The team reverts the change. Abandonment drops back to 60%. Sarah documents the analysis.\n- **Friday:** Starts a new project: analyzing customer reviews to find the most requested product features.\n\n**Sarah\'s toolkit:** SQL (querying data), Python (analysis), Excel (quick lookups), Power BI (dashboards), Slack and email (communication).\n\n## Types of Data Analyst Roles\n\nData analysis is a broad field. Here are the most common specializations:\n\n- **Business Analyst**  Focuses on business operations, financial data, and strategy. Heavy Excel and SQL, less Python.\n- **Data Analyst**  The generalist. Works across SQL, Python, and BI tools. Answers questions from all departments.\n- **Marketing Analyst**  Analyzes campaign performance, customer behavior, and market trends. Uses Google Analytics, SQL, A/B testing.\n- **Financial Analyst**  Budgets, forecasts, investment data. Excel-heavy with financial modeling.\n- **Operations Analyst**  Supply chains, logistics, internal processes. Looks for efficiency gains.\n- **Product Analyst**  User behavior, feature adoption, retention metrics. Works closely with product managers.\n- **BI Analyst**  Builds and maintains dashboards and reports. Specializes in Power BI, Tableau, or Looker.\n\n**This course prepares you for ALL of these roles.** The foundations are the same: SQL, spreadsheets, Python, statistics, and communication.\n\n## Data Team Roles\n\nAnalysts rarely work alone. Understanding the broader team helps you collaborate effectively.\n\n**Data Engineer:** Builds and maintains data pipelines → extracting data from sources, cleaning it, and loading it into databases/warehouses. They create the infrastructure analysts query. If the data isn\'t available or is slow to query, the data engineer fixes it.\n\n**Data Analyst:** Queries the data engineers provide, answers business questions, builds dashboards, and communicates findings.\n\n**Data Scientist:** Builds predictive models and runs experiments using advanced statistics and ML.\n\n**Data Steward:** Governs data quality, defines standards, and ensures compliance with regulations.\n\nIn small companies, one person might do all of these. In large companies, each is a specialized role.\n\n## Skills You Will Learn\n\nBy the end of this course, you will have these marketable skills:\n\n| Skill | What You Will Be Able To Do |\n|-------|------------------------------|\n| **Spreadsheets (Excel/Sheets)** | VLOOKUP, pivot tables, conditional formatting, data cleaning, dashboards |\n| **SQL** | Query databases, JOIN tables, aggregate data, window functions, subqueries |\n| **Python** | Analyze data with Pandas, create charts with Matplotlib/Seaborn, run statistical tests |\n| **BI Tools** | Build interactive dashboards with Power BI/Tableau, write DAX measures |\n| **Statistics** | Hypothesis testing, p-values, probability, A/B testing, regression |\n| **Communication** | Present data findings clearly, tell stories with data, build a portfolio |\n\n## Key Distinctions\n\n### Data Analysis vs Data Mining vs Data Science\n\n**Data Analysis:** Testing hypotheses and answering specific business questions using data. Focuses on interpreting existing data to drive decisions. *Example: "Why did sales drop in Q3?"*\n\n**Data Mining:** Discovering unknown patterns and relationships in data without predefined questions. Uses automated methods to find hidden insights. *Example: Finding that customers who buy diapers also tend to buy beer.*\n\n**Data Science:** A broader field that combines statistics, machine learning, and software engineering to build predictive models and systems. Includes data analysis and mining but adds ML engineering, experimentation, and often works with larger, more complex datasets.\n\n### KPI vs Metric\n\nThese terms are related but not interchangeable.\n\n**Metric:** Any quantifiable measurement. *Examples: page views, support tickets closed, server uptime.*\n\n**KPI (Key Performance Indicator):** A metric tied directly to a business objective. Not all metrics are KPIs → a KPI is a metric that *matters* for strategic goals.\n\n**Example:**\n- Metric: Number of website visitors (interesting but not strategic on its own)\n- KPI: Conversion rate (visitors who purchase) → directly tied to the revenue goal\n\n**Test to tell them apart:** If this number stays flat for a month, would the CEO care? If yes, it\'s probably a KPI. If no, it\'s just a metric.\n\n### Data Sources: Primary vs Secondary\n\n**Primary data:** Collected firsthand for your specific analysis. Examples: surveys you conduct, A/B test results you run, user interviews.\n\n**Secondary data:** Already collected by someone else for another purpose. Examples: government census data, company databases, public datasets (Kaggle, WHO, World Bank).\n\nMost data analyst work uses secondary data (existing company databases), but understanding the distinction matters for data quality and limitations.\n\n### Data Types by Structure\n\n**Structured data:** Organized in rows and columns with a fixed schema. Easy to analyze with SQL. Examples: Excel tables, SQL databases.\n\n**Unstructured data:** No predefined format. Harder to analyze with traditional tools. Examples: emails, social media posts, images, videos, audio files.\n\n**Semi-structured data:** Has some organizational properties but not a rigid table structure. Examples: JSON, XML, CSV files with headers, log files.\n\nUnderstanding data types helps you choose the right tools and approaches for each problem.\n\n## What This Career Offers\n\nData analysis is one of the fastest-growing careers in the world:\n- **High demand:** Nearly every company needs data analysts\n- **Good salary:** Entry-level analysts earn $60K-$80K; senior analysts $90K-$130K+\n- **Remote-friendly:** Most data work can be done from anywhere\n- **No degree required:** Skills and portfolio matter more than diplomas\n- **Growth path:** Analyst -> Senior Analyst -> Analytics Manager -> Director of Analytics, or pivot to Data Science\n\n## The Data Analysis Process (Ask -> Prepare -> Process -> Analyze -> Share -> Act)\n\nEvery analysis follows these 6 steps. This is the industry-standard framework used by Google, Meta, and every top company:\n\n### 1. Ask: Define the Problem\nBefore looking at any data, understand what problem you are solving. A vague question like *"How are we doing?"* leads to a vague answer. A sharp question like *"Which product category had the lowest profit margin last quarter, and why?"* leads to actionable insights.\n\n### 2. Prepare: Collect the Data\nWhere does the data live? In a database (SQL query), a spreadsheet, a CSV export, or an API? Knowing where to get data is half the battle.\n\n### 3. Process: Clean the Data\nRemove duplicates, fix missing values, standardize formats, and validate accuracy. This step takes the longest but is the most important.\n\n### 4. Analyze: Find Patterns\nRun calculations, build models, test hypotheses, and identify trends. This is where the magic happens.\n\n### 5. Share: Communicate Results\nBuild charts, dashboards, and reports. Present your findings so others can understand and act on them.\n\n### 6. Act: Drive Decisions\nThe whole point. Your analysis leads to a business decision: launch a product, change a price, fix a bug, adjust a budget.\n\n## Let\'s Get Started\n\nYou already have everything you need: this platform provides interactive playgrounds for SQL, Python, and spreadsheets right in your browser. Nothing to install. Let\'s begin your data analyst journey.\n\n:::checkpoint\nWhat is the primary job of a data analyst?\nA) Write code all day\nB) Find patterns in data to help businesses make better decisions\nC) Manage company servers\nD) Build websites\nCorrect: B\n\n:::checkpoint\nWhich type of analysis answers "Why did it happen?"\nA) Descriptive\nB) Diagnostic\nC) Predictive\nD) Prescriptive\nCorrect: B\n\n:::checkpoint\nWhat percentage of an analyst\'s time is typically spent cleaning data?\nA) 5-10%\nB) 40-60%\nC) 80-90%\nD) 100%\nCorrect: B\n\n:::checkpoint\nWhat is the first step in the data analysis process?\nA) Clean the data\nB) Ask the right question\nC) Build a chart\nD) Collect the data\nCorrect: B\n\n:::checkpoint\nWhat quality matters most for a data analyst?\nA) A PhD in statistics\nB) 10 years of coding experience\nC) Relentless curiosity\nD) An expensive computer\nCorrect: C',
        quiz: [
          {
            question: "What is the primary job of a data analyst?",
            options: [
              "Write code all day",
              "Find patterns in data to help businesses make better decisions",
              "Manage company servers",
              "Build websites",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which type of analysis answers 'Why did it happen?'",
            options: [
              "Descriptive",
              "Diagnostic",
              "Predictive",
              "Prescriptive",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What percentage of an analyst's time is typically spent cleaning data?",
            options: ["5-10%", "40-60%", "80-90%", "100%"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the first step in the data analysis process?",
            options: [
              "Clean the data",
              "Ask the right question",
              "Build a chart",
              "Collect the data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What quality matters most for a data analyst?",
            options: [
              "A PhD in statistics",
              "10 years of coding experience",
              "Relentless curiosity",
              "An expensive computer",
            ],
            correctAnswerIndex: 2,
          },
        ],
      },
      {
        id: "w1-d2",
        title: "Day 2: Data Lifecycle",
        description: "Understand the 5 stages data goes through",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Data analysis follows a structured lifecycle. Think of it like cooking: you need a recipe first, then ingredients, then prep work, then cooking, then tasting, then serving. The data lifecycle has **6 phases**:\n\n1. **Ask**  Define the question or problem. What are we trying to solve? What decision will this inform?\n2. **Prepare**  Gather the data. Find sources, collect raw data, understand what's available.\n3. **Process**  Clean and transform the data. Fix errors, handle missing values, get it ready for analysis.\n4. **Analyze**  Run calculations, find patterns, test hypotheses. This is where the actual analysis happens.\n5. **Share**  Communicate the results. Charts, dashboards, reports, presentations for stakeholders.\n6. **Act**  Make a decision based on the findings. Put insights into action.\n\nA pizza chain wanted to know which topping to feature in their next ad. They **asked** which topping drives most profit, **prepared** 50,000 order records, **processed** out 500 test records, **analyzed** the data (pepperoni most ordered, Hawaiian most profitable), **shared** the findings with the marketing team, and **acted** by featuring Hawaiian in the ad. Profit went up 12%.\n\n:::checkpoint\nWhat's the correct order of the Data Lifecycle?\nA) Prepare, Ask, Process, Analyze, Share, Act\nB) Ask, Prepare, Process, Analyze, Share, Act\nC) Collect, Analyze, Clean, Visualize, Decide\nCorrect: B\n\n:::checkpoint\nWhat does Garbage in, garbage out mean?\nA) Throw away bad data\nB) Bad input data = bad results\nC) Data analysis is a waste\nCorrect: B\n\nSkipping the Process step is the #1 mistake beginners make. Dirty data leads to wrong conclusions and bad business decisions.",
        quiz: [
          {
            question: "What is the correct order of the Data Lifecycle?",
            options: [
              "Prepare, Ask, Process, Analyze, Share, Act",
              "Ask, Prepare, Process, Analyze, Share, Act",
              "Process, Prepare, Ask, Analyze, Share, Act",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does Garbage in, garbage out mean?",
            options: [
              "Throw away bad data",
              "Bad input data leads to bad results",
              "Data analysis is useless",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What happens in the Ask stage of the data lifecycle?",
            options: [
              "Create charts and dashboards",
              "Define the question or problem to solve",
              "Make a business decision",
              "Run calculations",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What happens in the Process stage of the data lifecycle?",
            options: [
              "Delete all data",
              "Fix errors, fill blanks, and remove duplicates",
              "Collect more data",
              "Present findings to stakeholders",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does a data analyst do in the Decide stage?",
            options: [
              "Build a database",
              "Make a business decision based on insights",
              "Delete the dataset",
              "Run more SQL queries",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w1-d3",
        title: "Day 3: Spreadsheet UI",
        description: "Navigate cells, rows, columns, sheets, and named ranges",
        type: "learn",
        duration: "45-60 mins",
        content:
          "A spreadsheet is a giant grid. **Rows** go side to side (numbered 1, 2, 3...), **columns** go up and down (lettered A, B, C...). A **cell** is where a row and column meet  B3 means Column B, Row 3. **Sheets** are separate pages in one file (the tabs at the bottom).\n\n**Named Ranges** let you give cells friendly names like 'Sales' instead of B2:B100.\n\nSee the spreadsheet below? It already has a budget example loaded. Click on cell D2  you'll see the formula `=C2-B2` which calculates the difference between actual and budgeted amounts. Cell D3 does the same for Food.\n\nTry changing the value in C3 from 420 to 500. Watch D3 update instantly  that's a live formula at work.\n\nClick any cell and type to edit it. Press Enter when done.\n\n:::checkpoint\nWhat does cell reference C4 mean?\nA) Column 4, Row C\nB) Column C, Row 4\nC) Sheet C, Cell 4\nCorrect: B\n\n:::checkpoint\nWhat is a Named Range?\nA) A password-protected range\nB) Friendly name for cells like 'Sales' instead of B2:B100\nC) A named chart\nCorrect: B",
        quiz: [
          {
            question: "What does cell reference C4 mean?",
            options: ["Column 4, Row C", "Column C, Row 4", "Sheet C, Cell 4"],
            correctAnswerIndex: 1,
          },
          {
            question: "What advantage does a Named Range give you?",
            options: [
              "Password protection",
              "Formulas become readable (e.g., SUM(Sales) instead of SUM(B2:B100))",
              "Faster calculations",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a cell in a spreadsheet?",
            options: [
              "The entire file",
              "The intersection of a row and a column",
              "A type of chart",
              "A formula",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What are columns labeled with in a spreadsheet?",
            options: [
              "Numbers (1, 2, 3)",
              "Letters (A, B, C)",
              "Colors",
              "Dates",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What are sheets in a spreadsheet?",
            options: [
              "Formulas that calculate values",
              "Separate pages or tabs in one file",
              "Types of charts",
              "Cell styles",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w1-d4",
        title: "Day 4: Basic Formulas",
        description: "Master SUM, AVERAGE, MIN, MAX and cell references",
        type: "practice",
        duration: "45-60 mins",
        content:
          "A formula is a command: add up this column, find the smallest number, average these values. Every formula starts with `=`.\n\nThe spreadsheet below already has a sales team loaded. **B9** contains `=SUM(B2:B6)` which adds up all sales. **B11** has `=AVERAGE(B2:B6)` for the average, **B13** has `=MAX(B2:B6)` for the top performer, and **B15** has `=MIN(B2:B6)` for the lowest.\n\nTry changing Bob's sales from 5000 to 8000. Watch B9 (Total) and B13 (Best) update immediately.\n\n**Relative vs Absolute references:** When you copy a formula, relative references (A1) adjust to the new row. Absolute references ($A$1) stay locked. Try typing `=A1` in C2, then copy it to C3 and C4  notice how it changes to A2, A3. Now try `=$A$1`  it stays locked on A1.\n\n:::checkpoint\nWhat does =AVERAGE(A1:A5) do?\nA) Adds up A1 through A5\nB) Finds the average of A1 through A5\nC) Finds the largest number\nCorrect: B\n\n:::checkpoint\nCell B1 has =$A$1*2. Copy to B2. What does B2 show?\nA) A2*2 (adjusted)\nB) $A$1*2 (still points to A1)\nC) Error\nCorrect: B",
        quiz: [
          {
            question: "What does =AVERAGE(A1:A5) do?",
            options: [
              "Adds up A1:A5",
              "Finds the average of A1:A5",
              "Finds the largest number",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Cell B1 has =$A$1*2. Copy to B2. What does B2 show?",
            options: [
              "A2*2 (adjusted)",
              "$A$1*2 (still points to A1)",
              "Error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a cell in a spreadsheet?",
            options: [
              "The entire spreadsheet file",
              "The intersection of a row and a column",
              "A type of chart",
              "A formula",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does 'C4' refer to in a spreadsheet?",
            options: [
              "Row C, Column 4",
              "Column C, Row 4",
              "Sheet 4, Cell C",
              "A formula",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What are sheets in a spreadsheet?",
            options: [
              "Formulas that calculate values",
              "Separate pages or tabs in one file",
              "Types of charts",
              "Cell styles",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w1-d5",
        title: "Day 5: Mini-Project: Simple Budget",
        description: "Build a personal monthly budget tracker",
        type: "project",
        duration: "1-2 hrs",
        content:
          'Build a monthly budget tracker from scratch in the spreadsheet below. Track planned vs actual spending and flag when you\'ve overspent.\n\n**Requirements:**\n- Column headers: Category, Budgeted, Actual, Difference, Status\n- At least 5 spending categories\n- Budgeted and Actual amounts for each\n- Formula to calculate Difference for each row\n- IF formula for Status (Overspent / On Track / Under)\n- SUM formulas for totals\n\n**Hints:**\n- Difference = Actual minus Budgeted\n- Status: IF(Difference>0,"Overspent",IF(Difference=0,"On Track","Under"))\n- Use the fill handle to copy formulas down\n\n:::checkpoint\nWhat does `=C2-B2` calculate?\nA) Total of C2 and B2\nB) Actual minus Budgeted (how much over or under)\nC) Budgeted minus Actual\nCorrect: B\n\n:::checkpoint\nIn the IF formula, what does `D2>0` mean?\nA) D2 is empty\nB) The difference is positive  overspent\nC) The difference is zero\nCorrect: B',
        quiz: [
          {
            question:
              "What formula shows the difference between Actual and Budgeted?",
            options: ["=B2+C2", "=C2-B2", "=SUM(B2:C2)"],
            correctAnswerIndex: 1,
          },
          {
            question: "Positive difference for an expense means what?",
            options: ["Under budget", "Overspent", "On target"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What does 'Garbage In, Garbage Out' mean in data analysis?",
            options: [
              "Throw away old data",
              "Bad input data leads to bad results",
              "Data analysts clean trash",
              "Computers produce garbage",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the purpose of the Process stage in the data lifecycle?",
            options: [
              "To delete all data",
              "To fix errors, fill blanks, and remove duplicates",
              "To create charts",
              "To collect more data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "The Decide stage of the data lifecycle involves:",
            options: [
              "Collecting more data",
              "Making a business decision based on insights",
              "Deleting the dataset",
              "Building a database",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "5+ categories",
          "SUM formulas",
          "Difference column",
          "Status labels",
          "Currency formatting",
          "Bold headers",
        ],
      },
    ],
  },
  {
    id: "week2",
    title: "Week 2: Data Manipulation (Month 1)",
    durationText: "WEEK 2",
    focus: "Excel, Google Sheets, Fundamentals",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w2-d1",
        title: "Day 1: Text Functions",
        description:
          "Use LEFT, RIGHT, MID, CONCATENATE and more to manipulate text",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Use text functions to manipulate names, addresses, product codes, and other text data in spreadsheets.\n\nText functions are like scissors, tape, and label makers for your data. Need to split 'John Smith' into first and last name? Extract the area code from a phone number? Clean up messy product codes? Text functions do that in seconds.\n\n- **=LEFT(text, n)**  Grabs the first n characters. =LEFT('Hello', 2) = 'He'\n- **=RIGHT(text, n)**  Grabs the last n characters. =RIGHT('Hello', 2) = 'lo'\n- **=MID(text, start, n)**  Grabs from the middle. =MID('Hello', 2, 3) = 'ell'\n- **=LEN(text)**  Counts characters. =LEN('Hello') = 5\n- **=CONCATENATE(a, b)**  Joins text. =CONCATENATE('John', ' ', 'Smith') = 'John Smith'\n- **=TRIM(text)**  Removes extra spaces. =TRIM('  Hi  ') = 'Hi'\n- **=UPPER/LOWER/PROPER**  Changes case. =UPPER('john') = 'JOHN'\n\nYou have a column of full names like 'SMITH, JOHN' and need to convert them to 'John Smith'.\n\nWith text functions:\n1. =PROPER(LEFT(A2, FIND(',', A2) - 1)) extracts 'Smith'\n2. =PROPER(MID(A2, FIND(',', A2) + 2, 99)) extracts 'John'\n3. =CONCATENATE(step2, ' ', step1) gives 'John Smith'\n\nAll done with formulas  no manual typing!\n\n:::checkpoint\nWhich function extracts the first 3 characters from 'Banana'?\nA) =RIGHT('Banana', 3)\nB) =LEFT('Banana', 3)\nC) =MID('Banana', 3, 3)\nD) =TRIM('Banana')\nCorrect: B\n\n:::checkpoint\nWhat does =CONCATENATE('Data', ' ', 'Analyst') produce?\nA) DataAnalyst\nB) Data Analyst\nC) Data_Analyst\nD) Error\nCorrect: B\n\nNote: UPPER and LOWER only affect letters, not numbers. If you apply them to a cell containing 123, the value stays 123.\n\n- LEFT, RIGHT, MID extract parts of text\n- CONCATENATE joins text together\n- TRIM removes spaces, UPPER/LOWER/PROPER change case\n- FIND locates a character's position inside text",
        quiz: [
          {
            question:
              "Which function extracts the first 3 characters of 'Banana'?",
            options: [
              "=RIGHT('Banana',3)",
              "=LEFT('Banana',3)",
              "=MID('Banana',3,3)",
              "=TRIM('Banana')",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which function removes extra spaces from text?",
            options: ["=LEFT()", "=TRIM()", "=LEN()", "=UPPER()"],
            correctAnswerIndex: 1,
          },
          {
            question: "Which function joins text strings together?",
            options: ["=LEFT()", "=CONCATENATE()", "=TRIM()", "=LEN()"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does =MID('Analyst', 3, 3) return?",
            options: ["Ana", "aly", "yst", "lys"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does =LEN('Data') return?",
            options: ["3", "4", "5", "Error"],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w2-d2",
        title: "Day 2: Logical Functions",
        description: "Build IF, AND, OR, NOT conditions",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Build logical tests with IF, AND, OR, NOT to make your spreadsheets think for themselves.\n\nLogical functions are like decision-makers. Think of IF as: 'If this is true, do X; otherwise do Y.' AND says: 'All conditions must be true.' OR says: 'At least one condition must be true.'\n\n**=IF(test, value_if_true, value_if_false)**\nExample: =IF(A1>100, 'High', 'Low')  if A1 is over 100, show 'High'; otherwise 'Low'.\n\n- **=AND(condition1, condition2, ...)**  Returns TRUE only if ALL conditions are true.\n- **=OR(condition1, condition2, ...)**  Returns TRUE if ANY condition is true.\n- **=NOT(condition)**  Flips TRUE to FALSE and vice versa.\n\nA store wants to flag orders that need special attention:\n- Orders over $500 that are from new customers get a 'VIP' flag\n- Orders with quantity > 10 OR value > $1,000 get 'Bulk Review'\n\nFormula: =IF(AND(A2>500, B2='New'), 'VIP', 'Standard')\n\nFormula: =IF(OR(C2>10, A2>1000), 'Bulk Review', 'Normal')\n\nNested IF: =IF(A1>90, 'A', IF(A1>80, 'B', IF(A1>70, 'C', 'F')))\n\n:::checkpoint\nWhat does =IF(5>10, 'Yes', 'No') return?\nA) Yes\nB) No\nC) TRUE\nD) Error\nCorrect: B\n\n:::checkpoint\nWhen does =AND(A1>10, B1<5) return TRUE?\nA) When A1 is over 10 OR B1 is under 5\nB) When A1 is over 10 AND B1 is under 5\nC) Always\nD) Never\nCorrect: B\n\nA common mistake: writing =IF(A1='Yes') without the value_if_false argument. When the condition is false, IF returns FALSE by default  which looks confusing in a report. Always provide both the true and false values.\n\n- IF makes decisions: IF(test, true, false)\n- AND: all conditions must be true\n- OR: at least one condition must be true\n- Nest IFs inside each other for multiple conditions",
        quiz: [
          {
            question: "What does =IF(5>10,'Yes','No') return?",
            options: ["Yes", "No", "TRUE", "Error"],
            correctAnswerIndex: 1,
          },
          {
            question: "When does =AND(A1>10,B1<5) return TRUE?",
            options: [
              "When A1>10 OR B1<5",
              "When A1>10 AND B1<5",
              "Always",
              "Never",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              'In the budget project, what does =IF(D2>0,"Overspent","OK") do?',
            options: [
              "Calculates total spending",
              "Shows 'Overspent' if D2 is positive, 'OK' otherwise",
              "Creates a chart",
              "Formats cell colors",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does =OR(A1>10, B1<5) return if A1=12 and B1=8?",
            options: [
              "TRUE because A1>10 is true",
              "FALSE because neither is true",
              "TRUE because both are true",
              "Error",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does =NOT(TRUE) return?",
            options: ["TRUE", "FALSE", "Error", "Blank"],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w2-d3",
        title: "Day 3: VLOOKUP & XLOOKUP",
        description: "Find matching data across tables",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Use VLOOKUP and XLOOKUP to find matching data across different tables  like a GPS for your spreadsheet.\n\nImagine you have two tables: one with employee IDs and names, another with employee IDs and salaries. You want to combine them so you can see each person's name next to their salary. Doing this manually for 500 employees would take hours. VLOOKUP does it in one second.\n\n**=VLOOKUP(lookup_value, table_array, col_index, [range_lookup])**\nIt looks for lookup_value in the first column of table_array, then returns the value from col_index columns to the right.\n\nTable 1: Products with prices. Table 2: Sales with product names only. You need to add prices.\n\n=VLOOKUP(A2, $E$2:$F$100, 2, FALSE)\n\n- A2: the product name we're looking up\n- $E$2:$F$100: the price table (locked with $)\n- 2: return the 2nd column of that table (the price)\n- FALSE: require exact match\n\n**XLOOKUP** is the newer, better version: =XLOOKUP(lookup_value, lookup_array, return_array)\nIt's simpler and can look in any direction (not just right).\n\n:::checkpoint\nWhat does the FALSE at the end of VLOOKUP mean?\nA) Return approximate match\nB) Return exact match only\nC) Return the 4th column\nD) Sort the data first\nCorrect: B\n\n:::checkpoint\nWhat advantage does XLOOKUP have over VLOOKUP?\nA) It's faster\nB) It can look left or right, not just right\nC) It's easier to type\nD) All of the above\nCorrect: B\n\nVLOOKUP only searches the FIRST column of your table. If your lookup value is in column B but your table starts at column A, VLOOKUP won't find it. Make sure the lookup column is the leftmost column.\n\n- VLOOKUP finds a value and returns info from the same row\n- Always use FALSE for exact match (unless you know you need approximate)\n- The lookup column must be the LEFTmost column of the table\n- XLOOKUP is newer and more flexible",
        quiz: [
          {
            question: "What does FALSE at the end of VLOOKUP mean?",
            options: [
              "Approximate match",
              "Exact match only",
              "Return 4th column",
              "Sort data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "VLOOKUP can only search which column of the table?",
            options: [
              "Any column",
              "The rightmost column",
              "The leftmost column",
              "The middle column",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What does the 3rd argument in VLOOKUP represent?",
            options: [
              "The lookup value",
              "The column index number to return",
              "The table array",
              "Whether to use exact match",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How is XLOOKUP different from VLOOKUP?",
            options: [
              "XLOOKUP can only search right",
              "XLOOKUP can search in any direction (left or right)",
              "XLOOKUP is slower",
              "XLOOKUP doesn't need a lookup value",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Why should you use absolute references ($A$1) for the table array in VLOOKUP?",
            options: [
              "To make the formula faster",
              "So the reference doesn't change when you copy the formula down",
              "To hide the formula",
              "To get approximate matches",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w2-d4",
        title: "Day 4: Conditional Formatting",
        description: "Make patterns visible with automatic cell coloring",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Use conditional formatting to make patterns and problems visually jump out of your data.\n\nConditional formatting is like having a highlighter that automatically colors cells based on rules. Sales below target? Red. Above target? Green. Duplicate entries? Yellow. This turns a boring grid into an instant visual dashboard.\n\n- **Highlight Cells Rules:** Greater than, less than, between, equal to, text contains, dates, duplicates.\n- **Top/Bottom Rules:** Top 10 items, bottom 10%, above average.\n- **Data Bars:** A bar chart inside each cell  longer bar = bigger number.\n- **Color Scales:** Gradient from red (low) to yellow (mid) to green (high).\n- **Icon Sets:** Traffic lights, flags, stars that change based on value.\n\nYou track monthly sales targets:\n\n1. Select the sales column\n2. Add rule: 'Greater than' 10000 ? green fill\n3. Add rule: 'Less than' 5000 ? red fill\n4. Add rule: 'Between' 5000 and 10000 ? yellow fill\n\nNow you can instantly see which months were good, bad, or average.\n\n:::checkpoint\nWhich conditional formatting option shows colored bars inside cells?\nA) Color Scales\nB) Data Bars\nC) Icon Sets\nD) Highlight Cells\nCorrect: B\n\n:::checkpoint\nYou want to see which salespeople are in the top 10%. Which rule do you use?\nA) Highlight Cells > Greater Than\nB) Top/Bottom Rules > Top 10%\nC) Data Bars\nD) Color Scales\nCorrect: B\n\nWatch out: it's easy to apply conditional formatting to the wrong range. Always double-check the 'Applies to' range  a common mistake is formatting just one cell when you meant to format the whole column.\n\n- Conditional formatting applies colors/icons/bars based on rules\n- Use it to instantly spot problems, trends, and outliers\n- Data bars create mini charts inside cells\n- Rules re-apply automatically when data changes",
        quiz: [
          {
            question: "Which shows colored bars inside cells?",
            options: [
              "Color Scales",
              "Data Bars",
              "Icon Sets",
              "Highlight Cells",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "To see top 10% performers, use:",
            options: [
              "Greater Than",
              "Top/Bottom Rules",
              "Data Bars",
              "Color Scales",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which conditional formatting shows a gradient from red to green?",
            options: [
              "Data Bars",
              "Color Scales",
              "Icon Sets",
              "Highlight Cells",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which conditional formatting adds traffic light icons to cells?",
            options: [
              "Data Bars",
              "Color Scales",
              "Icon Sets",
              "Highlight Cells",
            ],
            correctAnswerIndex: 2,
          },
          {
            question:
              "What happens when you change data that has conditional formatting rules?",
            options: [
              "The formatting stays the same until you manually update it",
              "The formatting updates automatically based on the new values",
              "The formatting is deleted",
              "An error appears",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w2-d5",
        title: "Day 5: Mini-Project: Cleaning Data",
        description: "Clean a messy real-world dataset",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Clean a messy real-world customer dataset using Excel functions.\n\nYou receive a CSV with 1,000 customer records with issues:\n- Names in all caps\n- Phone numbers in inconsistent formats\n- Some missing email addresses\n- Duplicate rows\n- Extra spaces everywhere\n\n**Requirements:**\n- Convert names to proper case\n- Standardize phone number format\n- Flag missing email addresses\n- Identify and mark duplicate rows\n- Remove extra spaces from all text\n\n**Hints:**\n- PROPER() converts text to title case\n- TRIM() removes extra spaces\n- SUBSTITUTE() can strip characters from phone numbers\n- IF(A2=\"\",\"Missing\",A2) flags blanks\n- Conditional formatting has a highlight duplicates rule\n\n:::checkpoint\nWhich function converts 'JOHN SMITH' to 'John Smith'?\nA) =UPPER()\nB) =LOWER()\nC) =PROPER()\nD) =TRIM()\nCorrect: C\n\n:::checkpoint\nWhat's the first step when cleaning a dataset?\nA) Delete everything and start over\nB) Make a backup copy of the original data\nC) Color the cells\nD) Email your boss\nCorrect: B",
        quiz: [
          {
            question: "Which converts 'JOHN SMITH' to 'John Smith'?",
            options: ["=UPPER()", "=LOWER()", "=PROPER()", "=TRIM()"],
            correctAnswerIndex: 2,
          },
          {
            question: "First step when cleaning data?",
            options: [
              "Delete everything",
              "Make a backup",
              "Color cells",
              "Email boss",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which function helps find duplicate rows in a dataset?",
            options: [
              "=VLOOKUP()",
              "Conditional formatting Highlight Duplicates",
              "=SUM()",
              "=PROPER()",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does the TRIM function do?",
            options: [
              "Deletes cells",
              "Removes extra spaces from text",
              "Rounds numbers",
              "Changes text color",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "How should you handle missing email addresses in a customer list?",
            options: [
              "Delete the entire row",
              "Flag them with a formula like =IF(A2='','Missing',A2)",
              "Ignore them completely",
              "Type 'unknown' in every blank cell manually",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Names in Proper Case",
          "Phones formatted consistently",
          "Duplicates flagged",
          "Missing emails handled",
          "Extra spaces removed",
        ],
      },
    ],
  },
  {
    id: "week3",
    title: "Week 3: Data Analysis (Month 1)",
    durationText: "WEEK 3",
    focus: "Excel, Google Sheets, Fundamentals",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w3-d1",
        title: "Day 1: Intro to Pivot Tables",
        description: "Summarize thousands of rows in seconds",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Pivot tables let you summarize thousands of rows into one clear table in seconds.\n\nA pivot table is like saying 'show me the total sales by region, broken down by month' and getting the answer instantly. No formulas needed. Just drag and drop.\n\n1. Select your data (headers included)\n2. Go to Insert > Pivot Table (or Data > Pivot Table in Sheets)\n3. Drag fields to four areas:\n   - **Rows:** What you want to group by (e.g., Region)\n   - **Columns:** Secondary grouping (e.g., Month)\n   - **Values:** What you want to calculate (e.g., Sum of Sales)\n   - **Filters:** What to exclude (e.g., only 2024 data)\n\nYou have 10,000 sales records. Your boss wants to know: Which product category earned the most profit each quarter last year?\n\nWith a pivot table:\n- Rows: Product Category\n- Columns: Quarter\n- Values: Sum of Profit\n- Filter: Year = 2024\n\nAnswer appears in 10 seconds. Without it, you'd spend hours writing formulas.\n\n:::checkpoint\nWhich area of a pivot table holds the numbers you want to calculate (like Sum of Sales)?\nA) Rows\nB) Columns\nC) Values\nD) Filters\nCorrect: C\n\n:::checkpoint\nWhat's the best use case for a pivot table?\nA) Creating charts\nB) Summarizing large datasets by categories\nC) Writing formulas\nD) Formatting cells\nCorrect: B\n\nPivot tables don't update automatically when the source data changes  you need to refresh them. Right-click anywhere in the pivot table and select Refresh to pull in the latest data.\n\n## Structured Excel Tables (Insert > Table)\n\nBefore creating a pivot table, convert your data range into a **structured table** (Ctrl+T or Insert > Table). This gives you automatic benefits:\n- New rows are automatically included when you refresh the pivot table\n- Formulas copy down automatically when you add a new row\n- Column headers stay visible when scrolling\n- Filters are added automatically\n\nTo create one: select any cell in your data, press Ctrl+T, and confirm. The table gets a name (like Table1) that you can use in formulas instead of cell ranges like $A$1:$D$100.\n\nStructured tables make your spreadsheets more professional and less error-prone.\n\n- Pivot tables summarize data without formulas\n- Drag fields to Rows, Columns, Values, Filters\n- Values area contains the numbers to calculate (sum, count, average)\n- Always refresh after source data changes\n- Convert ranges to tables (Ctrl+T) before creating pivot tables",
        quiz: [
          {
            question: "Which pivot table area holds the numbers to calculate?",
            options: ["Rows", "Columns", "Values", "Filters"],
            correctAnswerIndex: 2,
          },
          {
            question: "Best use case for a pivot table?",
            options: [
              "Creating charts",
              "Summarizing large datasets",
              "Writing formulas",
              "Formatting cells",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does a pivot table calculate by default?",
            options: ["Average", "Sum", "Count", "Max"],
            correctAnswerIndex: 1,
          },
          {
            question: "What area of a pivot table would you drag 'Region' to?",
            options: ["Values", "Rows", "Filters", "Columns"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What happens when source data changes for a pivot table?",
            options: [
              "The pivot table updates automatically",
              "You need to right-click and refresh the pivot table",
              "The source data is deleted",
              "The pivot table breaks",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w3-d2",
        title: "Day 2: Advanced Pivot Tables",
        description: "Calculated fields, slicers, and timelines",
        type: "practice",
        duration: "45-60 mins",
        content:
          'Go beyond basic pivot tables  add calculated fields, slicers, and timelines for interactive reports.\n\n**Calculated Fields  Custom Formulas Inside Pivot Tables**\n\nSometimes the data you need isn\'t in your source spreadsheet. Example: you have Revenue and Cost columns but no Profit column. Instead of editing the source data, add a calculated field directly inside the pivot table.\n\n**How to add a calculated field:**\n1. Click anywhere in your pivot table\n2. Go to Analyze > Fields, Items & Sets > Calculated Field\n3. Name it (e.g., \'Profit\')\n4. Write the formula: `=Revenue - Cost`\n5. Click Add, then OK\n\nThe new field appears in the pivot table just like any other field  it recalculates automatically as you filter or rearrange.\n\n**Common calculated field formulas:**\n- `=Revenue - Cost`  profit amount\n- `=Profit / Revenue`  profit margin percentage\n- `=Price * Quantity`  total sales per product\n- `=IF(Revenue > 10000, "High", "Low")`  conditional categories\n\n**Slicers  One-Click Visual Filters**\n\nA slicer is a visual filter button. Instead of using a dropdown filter arrow, you get big clickable buttons showing every value.\n\n**To add a slicer:**\n1. Click the pivot table\n2. Insert > Slicer\n3. Select the field to filter by (Region, Product, Category, etc.)\n4. Click any button to filter  immediately. Hold Ctrl to select multiple.\n\n**Timelines  Drag-to-Filter Dates**\n\nA timeline is a date-specific slicer. It shows a scrollable time bar you can drag to select months, quarters, or years.\n\n**To add a timeline:**\n1. Click the pivot table\n2. Insert > Timeline\n3. Select the date field\n4. Switch between Months, Quarters, or Years using the dropdown\n\nCombine calculated fields + slicers + timelines for interactive, real-time dashboards right inside Excel.',
        quiz: [
          {
            question: "What's a calculated field?",
            options: [
              "Manual entry",
              "Custom formula in pivot",
              "Hardcoded value",
              "A filter",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does a slicer do in a pivot table?",
            options: [
              "Splits data into multiple tables",
              "Provides a clickable visual filter",
              "Formats cell colors",
              "Creates calculated fields",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does a timeline do in a pivot table?",
            options: [
              "Sorts data by date",
              "Filters dates with a slider control",
              "Creates a Gantt chart",
              "Calculates time differences",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "If you want to add 'Profit = Revenue - Cost' to a pivot table, what do you create?",
            options: [
              "A new column in the source data",
              "A calculated field inside the pivot table",
              "A slicer",
              "A timeline",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the difference between Rows and Values in a pivot table?",
            options: [
              "Rows group data, Values calculate numbers",
              "Rows calculate numbers, Values group data",
              "They are the same thing",
              "Rows filter data, Values sort data",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w3-d3",
        title: "Day 3: Data Validation",
        description: "Prevent bad data from entering your sheets",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Use data validation to prevent bad data from ever entering your spreadsheets.\n\nData validation is like a bouncer at a club. Only data that meets your rules gets in. Wrong format? Rejected. Out of range? Rejected. This stops errors before they happen.\n\n## Common Validations\n- **Dropdown List:** Force a cell to only accept specific values (e.g., 'Yes', 'No', 'Maybe')\n- **Number Range:** Only accept numbers between X and Y\n- **Date Range:** Only accept dates within a period\n- **Text Length:** Limit character count\n- **Custom Formula:** Any rule you can write with a formula\n\nYou're collecting survey responses. Use data validation to:\n- Age column: must be between 18 and 120\n- Rating column: dropdown with 1-5 only\n- Email column: must contain '@'\n- Date column: must be in 2024\n\n:::checkpoint\nData validation can create a dropdown list. What's the benefit?\nA) It looks nice\nB) It prevents typos by limiting choices\nC) It speeds up calculations\nD) It adds color to cells\nCorrect: B\n\n- Data validation prevents bad data at the source\n- Create dropdown lists, number ranges, date limits\n- Use custom formulas for complex rules",
        quiz: [
          {
            question: "Benefit of dropdown validation?",
            options: [
              "Looks nice",
              "Prevents typos",
              "Speeds calculations",
              "Adds color",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What type of validation would you use for an Age column (18-120)?",
            options: [
              "Text length",
              "Number range (between 18 and 120)",
              "Dropdown list",
              "Custom formula",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What validation type forces a cell to accept only specific values like 'Yes', 'No', 'Maybe'?",
            options: [
              "Number range",
              "Date range",
              "Dropdown list",
              "Text length",
            ],
            correctAnswerIndex: 2,
          },
          {
            question:
              "You need to ensure an email column contains '@'. What validation do you use?",
            options: [
              "Dropdown list",
              "Number range",
              "Date range",
              "Custom formula",
            ],
            correctAnswerIndex: 3,
          },
          {
            question:
              "What happens when someone enters invalid data into a validated cell?",
            options: [
              "Excel crashes",
              "Excel shows an error message and rejects the entry",
              "The data is accepted but highlighted red",
              "Excel automatically corrects it",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w3-d4",
        title: "Day 4: Basic Charting",
        description: "Choose the right chart and build visuals",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Choose the right chart type and build your first visualizations.\n\nA chart is worth a thousand rows of data. Your brain processes images 60,000x faster than text. A good chart makes patterns obvious instantly.\n\n**Bar Chart** Compare categories (sales by region, top products):\n```\nNorth  ||||||||||||||||||||||||||||||||||||  $45K\nSouth  ||||||||||||||||||||||||||||||        $38K\nEast   ||||||||||||||||||||||||||||||||||||||||||||  $52K\nWest   |||||||||||||||||||||||||||||||||         $41K\n```\n\n**Line Chart** Show trends over time (revenue by month, stock prices):\n```\n$50K |        /\n$45K |      /  \\    /\\n$40K |    /     \\  /  \\n$35K |  /        \\/     \\n$30K |/                  \\n     +---J---F---M---A---M---J---J---A---S---O---N---D\n```\n\n**Pie Chart** Show parts of a whole (market share, budget allocation) - use sparingly:\n```\n     _______\n   /  *****  \\       * Widget A: 22%\n  |  **  ..   |      . Widget B: 28%\n  | *  ..,,   |      , Widget C: 18%\n   \\  ..,,  /       Other: 32%\n     -------\n```\n\n**Scatter Plot** Show relationship between two variables (ad spend vs sales):\n```\nSales\n  |          *\n  |       *  * *\n  |     * * *\n  |   * * *\n  | * *\n  +------------------ Ad Spend\n```\n\n**Histogram** Show distribution (age ranges, income brackets):\n```\nCount\n 20|     ####\n 15|  ##########\n 10|##############\n  5|################\n   +----+----+----+----+----\n     20   30   40   50   60  Age\n```\n\nMonthly sales data for 2024:\n- Bar chart: Compare which month had highest sales December ($50K)\n- Line chart: See the trend sales grow from Jan to Dec\n- Both use the same data but tell different stories\n\n:::checkpoint\nWhich chart type is best for showing a trend over time?\nA) Pie chart\nB) Bar chart (vertical)\nC) Line chart\nD) Scatter plot\nCorrect: C\n\nA common mistake: using pie charts with too many categories. Stick to 5 slices or fewer  anything more becomes cluttered and hard to read. When you have many categories, a bar chart is almost always the better choice.\n\n- Bar charts compare, line charts show trends, pie charts show parts of a whole\n- Choose the chart that makes your point clearest\n- Less is more  avoid chartjunk",
        quiz: [
          {
            question: "Best chart for trends over time?",
            options: ["Pie", "Bar", "Line", "Scatter"],
            correctAnswerIndex: 2,
          },
          {
            question: "Pie charts work best with how many categories?",
            options: ["10+", "As many as needed", "5 or fewer", "Exactly 3"],
            correctAnswerIndex: 2,
          },
          {
            question:
              "Which chart type is best for showing the relationship between two variables (like ad spend vs sales)?",
            options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"],
            correctAnswerIndex: 3,
          },
          {
            question:
              "Which chart type is best for comparing sales across multiple regions?",
            options: ["Bar chart", "Line chart", "Pie chart", "Scatter plot"],
            correctAnswerIndex: 0,
          },
          {
            question:
              "Which chart type is best for showing distribution of ages in a population?",
            options: ["Scatter plot", "Histogram", "Line chart", "Pie chart"],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w3-d5",
        title: "Day 5: Mini-Project: Sales Dashboard",
        description: "Build an interactive one-page dashboard",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Build a sales summary report using the Live Sheet's Pivot feature and summary formulas.\n\n**Requirements:**\n- Enter sample sales data with Region, Month, Product, and Sales columns\n- Create a pivot table by Region for total sales per region\n- Create a pivot table by Month to see monthly trends\n- Create a pivot table by Product to find top products\n- Add formulas for total sales, average sale, and order count\n\n**Hints:**\n- Use the Pivot button in the toolbar to configure each pivot\n- Set the Row field to the dimension you want to group by\n- Set Value to Sales and choose SUM as aggregation\n- Use SUM, AVERAGE, and COUNT on the Sales column for summary stats\n\n:::checkpoint\nWhat's the minimum you need for a useful data summary?\nA) Multiple sheets with random data\nB) Organized data plus a pivot table or formula to answer a question\nC) Lots of colors\nD) At least 10 charts\nCorrect: B",
        quiz: [
          {
            question: "Minimum needed for a dashboard?",
            options: [
              "Multiple sheets",
              "A clear question it answers",
              "Many colors",
              "10 charts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What components make up an interactive dashboard?",
            options: [
              "Only charts",
              "Pivot tables, charts, slicers, and conditional formatting",
              "Only formulas",
              "Only text labels",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you make a dashboard interactive?",
            options: [
              "Add more sheets",
              "Add slicers and timelines that filter data",
              "Use more colors",
              "Add more formulas",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the purpose of conditional formatting in a dashboard?",
            options: [
              "To make the sheet look pretty",
              "To visually highlight important data like top performers or issues",
              "To replace charts",
              "To sort data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What's the best way to show total sales by region in a dashboard?",
            options: [
              "List all sales in a single column",
              "A pivot table with Region in Rows and Sum of Sales in Values",
              "A pie chart with 20 slices",
              "A text box describing each region",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Pivot table by region",
          "Pivot table by month",
          "Top products list",
          "Conditional formatting",
          "Year slicer",
        ],
      },
    ],
  },
  {
    id: "week_excel_adv",
    title: "Week 4: Advanced Formulas (Month 1)",
    durationText: "WEEK 4",
    focus: "Excel, Google Sheets, Fundamentals",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w_adv1-d1",
        title: "Day 1: SUMIFS, COUNTIFS, AVERAGEIFS",
        description:
          "Sum, count, and average data that meets multiple conditions",
        type: "learn",
        duration: "45-60 mins",
        content:
          'Basic SUM adds everything. But what if you only want to add sales for Electronics? Or count only Food products? Or average Clothing sales in the East region? That\'s where **SUMIF**, **COUNTIF**, **SUMIFS**, **COUNTIFS**, and **AVERAGEIFS** come in.\n\n**=SUMIF(range, criteria, sum_range)**\nSum cells that match one condition.\n\n**=COUNTIF(range, criteria)**\nCount cells that match one condition.\n\n**=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)**\nSum cells that match ALL conditions.\n\n**=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)**\nAverage cells that match ALL conditions.\n\nIn the spreadsheet below, you have a product table. Try these formulas already in the sheet:\n\nC12: =SUMIF(B2:B10,"Electronics",C2:C10) → total sales of all Electronics products = 2300\n\nC13: =COUNTIF(B2:B10,"Food") → counts how many products are Food = 3\n\nC14: =SUMIFS(C2:C10,B2:B10,"Clothing",E2:E10,"East") → adds sales where category is Clothing AND region is East = 1500\n\nC15: =AVERAGEIFS(C2:C10,B2:B10,"Electronics",E2:E10,"North") → average sales of Electronics in the North region = 733\n\n:::checkpoint\nWhat does SUMIFS do that SUMIF cannot?\nA) Nothing, they\'re the same\nB) SUMIFS handles multiple conditions, SUMIF handles only one\nC) SUMIFS is faster\nD) SUMIFS works with text only\nCorrect: B\n\n:::checkpoint\nHow many conditions can COUNTIFS handle?\nA) Only 1\nB) Up to 127 pairs of ranges and criteria\nC) Unlimited\nD) Only 2\nCorrect: B',
        quiz: [
          {
            question: "What does SUMIFS do that SUMIF cannot?",
            options: [
              "Nothing",
              "Handle multiple conditions",
              "Is faster",
              "Works with text",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How many range/criteria pairs can COUNTIFS handle?",
            options: ["Only 1", "Up to 127", "Unlimited", "Only 2"],
            correctAnswerIndex: 1,
          },
          {
            question: "Which function counts non-empty cells?",
            options: ["COUNT", "COUNTA", "COUNTIF", "COUNTBLANK"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does AVERAGEIFS return if no cells match?",
            options: ["#DIV/0!", "0", "Blank", "Error"],
            correctAnswerIndex: 0,
          },
          {
            question: "In SUMIFS, which argument is the sum_range?",
            options: [
              "The last argument",
              "The first argument",
              "The second argument",
              "Any argument",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_adv1-d2",
        title: "Day 2: INDEX-MATCH",
        description: "Look up values in any direction with INDEX-MATCH",
        type: "learn",
        duration: "45-60 mins",
        content:
          'VLOOKUP is great but it has a fatal flaw: it can only look to the right. **INDEX-MATCH** is the power user\'s alternative that can look in any direction.\n\nThink of it as two tools working together:\n- **MATCH** finds the position of a value in a row or column (returns a number like 3)\n- **INDEX** returns the value at a given position in a range\n\n**=MATCH(lookup_value, lookup_array, [match_type])**\nReturns the position of lookup_value in lookup_array. Use 0 for exact match.\n\n**=INDEX(array, row_num, [column_num])**\nReturns the value at position (row_num, column_num) in array.\n\n**Together: =INDEX(return_range, MATCH(lookup_value, lookup_range, 0))**\n\nWhy use INDEX-MATCH over VLOOKUP?\n- Lookup column can be anywhere (not just the first)\n- Can look left or right\n- Faster on large datasets\n- Inserting columns doesn\'t break your formulas\n\nIn the sheet below, try:\n=INDEX(B2:B6, MATCH(G2, A2:A6, 0))\nThis finds the product name for the product ID in G2.\n\n:::checkpoint\nWhat does MATCH("Widget C", A2:A10, 0) return?\nA) "Widget C"\nB) The row number where Widget C is found\nC) An error\nD) 0\nCorrect: B\n\n:::checkpoint\nWhat advantage does INDEX-MATCH have over VLOOKUP?\nA) It\'s easier to type\nB) It can look in any direction, not just right\nC) It requires fewer arguments\nCorrect: B',
        quiz: [
          {
            question: "What does MATCH return?",
            options: [
              "The value itself",
              "The position number",
              "A boolean",
              "An array",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "INDEX-MATCH advantage over VLOOKUP?",
            options: [
              "Easier to type",
              "Looks in any direction",
              "Fewer arguments",
              "Prettier output",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does =INDEX(A1:B5, 3, 2) return?",
            options: [
              "The value in row 3, column 2",
              "The value in column 3, row 2",
              "The sum of row 3",
              "An error",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What match_type should you use for exact match in MATCH?",
            options: ["1", "0", "-1", "Leave blank"],
            correctAnswerIndex: 1,
          },
          {
            question: "What happens if MATCH doesn't find the value?",
            options: [
              "Returns 0",
              "Returns #N/A",
              "Returns blank",
              "Returns FALSE",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_adv1-d3",
        title: "Day 3: Array Formulas & Dynamic Arrays",
        description: "Perform multiple calculations with single formulas",
        type: "practice",
        duration: "45-60 mins",
        content:
          'Multi-condition formulas let you answer complex questions: \'Total sales for Electronics in the North region above $500.\' The Live Sheet supports SUMIFS, COUNTIFS, AVERAGEIFS, and INDEX+MATCH for these scenarios.\n\n**Multi-condition functions available:**\n- `=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)` → sum with multiple conditions\n- `=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)` → count with multiple conditions\n- `=AVERAGEIFS(avg_range, criteria_range1, criteria1, ...)` → average with multiple conditions\n\n**Example with the sample data:**\nEnter this data in columns A-D:\n| Product | Category | Region | Sales |\n|---------|----------|--------|-------|\n| Widget A | Electronics | North | 500 |\n| Widget B | Clothing | South | 300 |\n| Widget C | Electronics | North | 750 |\n| Widget D | Food | East | 200 |\n\nThen try:\n- `=SUMIFS(D2:D5, B2:B5, "Electronics", C2:C5, "North")` ? 1250 (sum of Electronics in North)\n- `=COUNTIFS(B2:B5, "Electronics")` ? 2 (how many Electronics products)\n- `=AVERAGEIFS(D2:D5, B2:B5, "Electronics")` ? 625 (average Electronics sale)\n\n**INDEX+MATCH (two-step lookup):**\n- `=MATCH("Widget C", A2:A5, 0)` ? 3 (Widget C is in row 3 of the range)\n- `=INDEX(D2:D5, 3)` ? 750 (the 3rd value in the Sales column)\n- Combined: `=INDEX(D2:D5, MATCH("Widget C", A2:A5, 0))` ? 750 (lookup Widget C\'s sales without VLOOKUP\'s right-only limitation)\n\nINDEX+MATCH is more flexible than VLOOKUP: it can look left, right, up, or down.\n\n:::checkpoint\nWhat does =SUMIFS do?\nA) Sums all values\nB) Sums values that match multiple conditions\nC) Counts values\nD) Averages values\nCorrect: B\n\n:::checkpoint\nWhat advantage does INDEX+MATCH have over VLOOKUP?\nA) It\'s faster\nB) It can look in any direction, not just right\nC) It uses less memory\nD) It\'s easier to type\nCorrect: B',
        quiz: [
          {
            question: "What does Ctrl+Shift+Enter do?",
            options: [
              "Saves file",
              "Enters array formula",
              "Deletes cell",
              "New sheet",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does UNIQUE do?",
            options: [
              "Removes duplicates",
              "Sorts values",
              "Counts unique",
              "Filters data",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a dynamic array spilling?",
            options: [
              "Water damage",
              "Results flowing into adjacent cells",
              "Cell deletion",
              "Formula error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does SEQUENCE(5,1) create?",
            options: [
              "5 rows of 1 column numbered 1-5",
              "1 row of 5 columns",
              "A 5x5 grid",
              "An error",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What advantage do dynamic arrays have?",
            options: [
              "No manual dragging of formulas",
              "Faster CPU",
              "Prettier colors",
              "Easier printing",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w_adv1-d4",
        title: "Day 4: What-If Analysis",
        description: "Forecast scenarios with Goal Seek and Data Tables",
        type: "practice",
        duration: "45-60 mins",
        content:
          "What-if analysis lets you ask 'What happens if...?' questions. Excel has three powerful tools for this:\n\n**Goal Seek:** You know the answer you want. Tell Excel which input to change to get there. 'I want profit to be $100,000. What should sales be?'\n\n**Data Tables:** See how changing one or two inputs affects a formula. 'How does profit change if price ranges from $40 to $60 AND quantity from 800 to 1500?'\n\n**Scenario Manager:** Create and compare different sets of inputs. 'What's our best case, worst case, and most likely case?'\n\nIn the spreadsheet below, try changing the Price or Quantity cells and watch Revenue and Profit update instantly.\n\nThink of these tools as your crystal ball for business forecasting.\n\n:::checkpoint\nWhen would you use Goal Seek?\nA) When you know the input and want the output\nB) When you know the desired output and want to find the input\nC) To create charts\nD) To sort data\nCorrect: B\n\n:::checkpoint\nA Data Table shows how changing how many variables affects a formula?\nA) Only 1\nB) Up to 2\nC) Unlimited\nD) None\nCorrect: B",
        quiz: [
          {
            question: "When to use Goal Seek?",
            options: [
              "Know input want output",
              "Know output want input",
              "Create charts",
              "Sort data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How many variables can a Data Table handle?",
            options: ["1", "Up to 2", "Unlimited", "None"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does Scenario Manager do?",
            options: [
              "Creates charts",
              "Compares different input sets",
              "Formats cells",
              "Validates data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the first step in what-if analysis?",
            options: [
              "Make a chart",
              "Identify the goal variable",
              "Delete old data",
              "Email stakeholders",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Goal Seek changes how many input cells?",
            options: [
              "As many as needed",
              "Exactly one",
              "Exactly two",
              "None",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_adv1-d5",
        title: "Day 5: Mini-Project: Financial Model",
        description: "Build a 5-year financial projection model",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Build a financial model that projects revenue, costs, and profit over 5 years with scenario analysis.\n\n**Requirements:**\n- Use the provided data (Revenue, COGS, Gross Profit, Margin %, YoY Growth for 2020-2024)\n- Project Year 2025 revenue using historical growth rates\n- Add Best Case, Expected Case, and Worst Case scenarios\n- Add conditional formatting on projections\n- Add a summary section with totals, averages, max, min\n\n**Hints:**\n- Use =AVERAGE() of previous YoY growth rates to estimate 2025 revenue\n- Best Case could be +10%, Worst Case -5% from Expected\n- Conditional formatting: highlight best year green, worst year red\n\n:::checkpoint\nWhat's the best way to project future revenue?\nA) Guess randomly\nB) Use historical growth rates to estimate\nC) Pick the highest number\nD) Use the lowest number\nCorrect: B",
        quiz: [
          {
            question: "Best way to project revenue?",
            options: [
              "Guess randomly",
              "Use historical growth rates",
              "Pick highest",
              "Pick lowest",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does goal seek help with in financial models?",
            options: [
              "Find input to hit target",
              "Create charts",
              "Delete data",
              "Format cells",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How many scenarios should a good model include?",
            options: ["1", "At least 3 (best/expected/worst)", "10", "None"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does YoY growth tell you?",
            options: [
              "Month-over-month change",
              "Year-over-year percentage change",
              "Total revenue",
              "Employee count",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why add conditional formatting to projections?",
            options: [
              "Looks pretty",
              "Highlights best/worst cases instantly",
              "Speeds up calculation",
              "Required by Excel",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Historical data projection",
          "Three scenarios",
          "Summary metrics",
          "Conditional formatting",
        ],
      },
    ],
  },
  {
    id: "week_excel_power",
    title: "Week 5: Power Tools & Productivity (Month 1)",
    durationText: "WEEK 5",
    focus: "Excel, Google Sheets, Fundamentals",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w_pwr1-d1",
        title: "Day 1: Power Query & Get & Transform",
        description: "Clean and reshape data without formulas",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Power Query (also called Get & Transform) is Excel's built-in ETL tool. **ETL = Extract, Transform, Load.** It lets you import data from any source and clean it up before loading into your spreadsheet. The best part: no formulas needed. Every click records a step you can replay later.\n\nThink of Power Query as a recipe book:\n1. **Extract**  Get data from a file, database, or website\n2. **Transform**  Remove columns, split text, change data types, merge tables\n3. **Load**  Put the cleaned data into your sheet\n\n**Common Power Query transformations:**\n- Remove columns you don't need\n- Split a full name column into first and last name\n- Replace values (e.g., 'N/A' with blank)\n- Pivot and unpivot data\n- Merge queries (like VLOOKUP but visual)\n- Group and aggregate rows\n\nIn the sheet below, practice using TEXT functions to mimic what Power Query does visually:\n- Split full names into first/last\n- Extract departments from email addresses\n- Standardize date formats\n\nPower Query records every step. If you get new data next month, just refresh  all transformations replay automatically.\n\n:::checkpoint\nWhat does ETL stand for?\nA) Extract, Transform, Load\nB) Edit, Type, List\nC) Enter, Tab, Leave\nD) Error, Try, Log\nCorrect: A\n\n:::checkpoint\nWhat's the main advantage of Power Query?\nA) It's faster than formulas\nB) Transformations replay automatically on new data\nC) It creates charts\nD) It formats cells\nCorrect: B",
        quiz: [
          {
            question: "What does ETL stand for?",
            options: [
              "Extract Transform Load",
              "Edit Type List",
              "Enter Tab Leave",
              "Error Try Log",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Main advantage of Power Query?",
            options: [
              "Faster than formulas",
              "Replays on new data",
              "Creates charts",
              "Formats cells",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What can Power Query do?",
            options: [
              "Import and clean data",
              "Only create charts",
              "Only sort data",
              "Only print",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does Unpivot do in Power Query?",
            options: [
              "Removes data",
              "Converts wide tables to tall tables",
              "Deletes columns",
              "Merges tables",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Where do you find Power Query in Excel?",
            options: [
              "Data tab > Get & Transform Data",
              "Home tab",
              "Insert tab",
              "Formulas tab",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w_pwr1-d2",
        title: "Day 2: Flash Fill & Text-to-Columns",
        description: "Split and transform text data instantly",
        type: "practice",
        duration: "45-60 mins",
        content:
          'Real-world data is messy: inconsistent formatting, extra spaces, mixed case, embedded delimiters. The Live Sheet\'s text formulas let you clean it up.\n\nThe table below has product names in various formats. Use text formulas to normalize them:\n\n**Available formulas in the Live Sheet:**\n- `=UPPER(text)` / `=LOWER(text)` / `=PROPER(text)` change case\n- `=TRIM(text)` removes extra spaces\n- `=LEFT(text, n)` / `=RIGHT(text, n)` / `=MID(text, start, n)` extract characters\n- `=FIND(substring, text)` finds position\n- `=LEN(text)` returns length\n- `=SUBSTITUTE(text, old, new)` replaces text\n- `=CONCATENATE(text1, text2)` joins text\n\n**Exercises with the sample data:**\n1. Extract product name before the first space: `=LEFT(A2, FIND(" ", A2) - 1)`\n2. Extract category after the hyphen: `=MID(A2, FIND("-", A2) + 2, LEN(A2))`\n3. Convert to proper case: `=PROPER(A2)`\n4. Remove special characters: `=SUBSTITUTE(SUBSTITUTE(A2, "(", ""), ")", "")`\n5. Create email format: `=LOWER(CONCATENATE(LEFT(A2, 1), MID(A2, FIND(" ", A2) + 1, LEN(A2)), "@company.com"))`\n\nType each formula in a new column and watch the transformed result appear instantly.\n\n:::checkpoint\nWhich formula extracts the leftmost 5 characters?\nA) =RIGHT(A1, 5)\nB) =LEFT(A1, 5)\nC) =MID(A1, 1, 5)\nD) both B and C\nCorrect: D\n\n:::checkpoint\nWhat does =TRIM(A1) do?\nA) Removes the first character\nB) Removes extra spaces (leading, trailing, and between words)\nC) Removes numbers\nD) Trims the cell height\nCorrect: B',
        quiz: [
          {
            question: "Which formula extracts the leftmost 5 characters?",
            options: ["RIGHT", "LEFT", "MID", "Both B and C"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does TRIM do?",
            options: [
              "Removes first character",
              "Removes extra spaces",
              "Removes numbers",
              "Trims cell height",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which formula finds the position of a substring?",
            options: ["LEFT", "FIND", "SUBSTITUTE", "LEN"],
            correctAnswerIndex: 1,
          },
          {
            question: "How to extract text after a hyphen?",
            options: ["LEFT + FIND", "MID + FIND + LEN", "UPPER", "TRIM"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does PROPER do?",
            options: [
              "Removes spaces",
              "Capitalizes first letter of each word",
              "Converts to uppercase",
              "Finds position",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_pwr1-d3",
        title: "Day 3: Keyboard Shortcuts & Productivity",
        description: "Navigate Excel like a pro with essential shortcuts",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Speed matters in data analysis. Knowing keyboard shortcuts saves you hours and makes you look like a pro.\n\n**Navigation shortcuts:**\n- Ctrl + Arrow Key  Jump to edge of data region\n- Ctrl + Shift + Arrow  Select to edge of data\n- Ctrl + Space  Select entire column\n- Shift + Space  Select entire row\n- Ctrl + Home  Go to cell A1\n- Ctrl + End  Go to last used cell\n\n**Editing shortcuts:**\n- F2  Edit active cell\n- Ctrl + D  Fill down (copy from above)\n- Ctrl + R  Fill right (copy from left)\n- Ctrl + Enter  Fill multiple selected cells with same value\n- Ctrl + ;  Insert today's date\n- Ctrl + Shift + ;  Insert current time\n- Alt + =  Insert SUM formula\n- F4  Toggle absolute/relative reference\n- Ctrl + Shift + L  Toggle filter\n- Alt + F1  Create chart\n\n**Pro tip:** The Alt key reveals ribbon keyboard hints. Press Alt, then the letter for each tab.\n\n:::checkpoint\nWhich shortcut jumps to the edge of a data region?\nA) Ctrl + Home\nB) Ctrl + Arrow Key\nC) Ctrl + End\nD) Alt + F1\nCorrect: B\n\n:::checkpoint\nWhat does F4 do in a formula?\nA) Opens help\nB) Toggles between absolute and relative references\nC) Saves the file\nD) Calculates the sheet\nCorrect: B",
        quiz: [
          {
            question: "Jump to edge of data region?",
            options: ["Ctrl+Home", "Ctrl+Arrow", "Ctrl+End", "Alt+F1"],
            correctAnswerIndex: 1,
          },
          {
            question: "F4 in formula does what?",
            options: [
              "Opens help",
              "Toggles $ references",
              "Saves file",
              "Calculates",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Alt+= inserts what?",
            options: ["SUM formula", "Today's date", "Chart", "Filter"],
            correctAnswerIndex: 0,
          },
          {
            question: "Ctrl+Shift+L toggles:",
            options: ["Filters", "Bold", "Charts", "Pivot tables"],
            correctAnswerIndex: 0,
          },
          {
            question: "F2 edits which cell?",
            options: [
              "The active cell",
              "Cell A1",
              "The last cell",
              "All cells",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w_pwr1-d4",
        title: "Day 4: Advanced Data Cleaning",
        description:
          "Handle duplicates, outliers, missing values, and inconsistencies",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Real-world data is never clean. You'll encounter missing values, duplicates, outliers, formatting inconsistencies, and data type mismatches. Knowing how to handle each is critical.\n\n**Missing Values:**\n- Delete the row (if too many missing)\n- Fill with mean/median (for numeric data)\n- Fill with 'Unknown' or 'N/A' (for text)\n- Interpolate from neighboring values (for time series)\n\n**Duplicates:**\n- Use Remove Duplicates (Data tab)\n- Use conditional formatting to highlight duplicates first\n- Always verify which duplicate to keep\n\n**Outliers:**\n- Sort data and check extremes\n- Use quartiles: anything below Q1 - 1.5*IQR or above Q3 + 1.5*IQR\n- Investigate before deleting  outliers might be valuable\n\n**Inconsistencies:**\n- 'NY', 'New York', 'new york' are all the same city\n- Use TRIM, PROPER, UPPER, or LOWER to standardize\n- Create a lookup table for aliases\n\nThe spreadsheet below has real messy data: practice identifying and flagging issues.\n\n:::checkpoint\nWhat's the first step when handling missing values?\nA) Delete everything\nB) Understand WHY the data is missing\nC) Fill with zeros\nD) Ignore them\nCorrect: B\n\n:::checkpoint\nAn outlier should always be deleted. True or False?\nA) True\nB) False  outliers may contain valuable signals\nCorrect: B",
        quiz: [
          {
            question: "First step for missing values?",
            options: ["Delete all", "Understand why", "Fill zeros", "Ignore"],
            correctAnswerIndex: 1,
          },
          {
            question: "Should outliers always be deleted?",
            options: [
              "Yes",
              "No, they may contain signals",
              "Always keep",
              "Depends on file size",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Best way to find duplicates?",
            options: [
              "Manual check",
              "Conditional formatting or Remove Duplicates",
              "Random deletion",
              "Sort alphabetically",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How to standardize 'NY' and 'New York'?",
            options: [
              "Use VLOOKUP with alias table",
              "Delete both",
              "Use SUMIF",
              "Create pivot table",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What's the IQR method used for?",
            options: [
              "Finding outliers",
              "Sorting data",
              "Creating charts",
              "Cleaning text",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w_pwr1-d5",
        title: "Day 5: Mini-Project: Data Pipeline",
        description: "Clean, transform, and analyze a real dataset end-to-end",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Build a complete data pipeline: take raw transaction data, clean it, transform it, and produce a summary report.\n\nYou receive raw transaction data with issues:\n- Missing transaction IDs\n- Inconsistent dates\n- Special characters and extra spaces in product names\n- Text values mixed in amount column\n- Duplicate rows\n\n**Requirements:**\n- Document all data quality issues\n- Clean the data using appropriate formulas\n- Remove duplicate rows\n- Create a pivot table summary (sales by category and month)\n- Apply conditional formatting\n\n**Hints:**\n- TRIM removes extra spaces, PROPER fixes capitalization\n- SUBSTITUTE removes unwanted characters\n- IF can flag or fix missing values\n- Always keep a backup of original data before cleaning\n\n:::checkpoint\nWhat's the most important rule of data cleaning?\nA) Delete all nulls immediately\nB) Always keep a backup of the original data\nC) Use the most complex formula possible\nD) Clean as fast as you can\nCorrect: B",
        quiz: [
          {
            question: "Most important data cleaning rule?",
            options: [
              "Delete nulls",
              "Keep original backup",
              "Use complex formulas",
              "Clean fast",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What tool summarizes cleaned data?",
            options: ["Pivot table", "Flash Fill", "Goal Seek", "Power Query"],
            correctAnswerIndex: 0,
          },
          {
            question: "What function removes extra spaces?",
            options: ["TRIM", "CLEAN", "SUBSTITUTE", "REPLACE"],
            correctAnswerIndex: 0,
          },
          {
            question: "When should you delete a row?",
            options: [
              "When most values are missing",
              "When one cell is empty",
              "When data looks wrong",
              "Never",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does a data pipeline do?",
            options: [
              "Takes raw data through cleaning to analysis",
              "Creates charts",
              "Writes SQL queries",
              "Formats cells",
            ],
            correctAnswerIndex: 0,
          },
        ],
        requirements: [
          "Issues documented",
          "Clean formulas",
          "Duplicates removed",
          "Pivot table summary",
          "Conditional formatting",
        ],
      },
    ],
  },
  {
    id: "week4",
    title: "Week 6: Version Control for Analysts (Month 2)",
    durationText: "WEEK 6",
    focus: "Version Control, Git, GitHub",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w4-d1",
        title: "Day 1: What is Git",
        description: "Understand Git as a time machine for files",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Understand Git  the tool that tracks every change to your files like a time machine.\n\n## What is a Terminal / Command Line?\n\nBefore we talk about Git, you need to know what a **terminal** is. The terminal is a text-based window where you type commands instead of clicking buttons. Think of it as talking directly to your computer.\n\n- **Windows:** Open \"Command Prompt\" (search for `cmd`) or better, install **Git Bash** (comes with Git)\n- **Mac:** Open \"Terminal\" (Finder > Applications > Utilities > Terminal)\n- **Linux:** Open \"Terminal\" (Ctrl+Alt+T)\n\nDon't worry  you don't need to be a terminal expert. You just need to know a few commands:\n- `cd folder-name`  change directory (go into a folder)\n- `ls`  list files in the current folder (Windows: `dir`)\n- `mkdir project-name`  create a new folder\n\nEverything you type goes into the **Git Terminal** simulator below. Try typing `help` and pressing Enter to see available commands.\n\n## Installing Git\n\nGit does NOT come installed by default. Here's how to get it:\n\n- **Windows:** Download from https://git-scm.com  run the installer (default options are fine)\n- **Mac:** Open Terminal and type `xcode-select --install` (or `brew install git` if you have Homebrew)\n- **Linux:** `sudo apt-get install git` (Ubuntu/Debian) or `sudo dnf install git` (Fedora)\n\nAfter installing, open a terminal and type `git --version`. You should see something like `git version 2.40.0`. If you see that, Git is ready.\n\n## What is Git?\n\nGit is like save points in a video game. Remember playing Zelda and saving before a boss fight? If you die, you reload and try again. Git does that for your files. Every time you **commit** (save), you create a point you can return to forever.\n\n- **Repository (repo):** Your project folder that Git is watching\n- **Commit:** A saved snapshot of your files at a moment in time\n- **Stage:** Choose which changes to include in the next commit (like picking which items to pack)\n- **Branch:** A separate timeline to work on new features without breaking the main project\n- **Merge:** Combine changes from one branch into another\n\n## Your First Git Workflow\n\nThe **Git Terminal** below simulates a real Git environment. No need to install anything right now  just use the simulator. Try this:\n\n**Step 1: Initialize a repo**\nType: `git init`\nYou'll see: `Initialized empty Git repository in workspace/.git/`\nThis tells Git to start watching this folder.\n\n**Step 2: Check what's happening**\nType: `git status`\nYou'll see: `On branch main` and `nothing to commit, working tree clean`\nThis means no files have changed since the last save.\n\n**Step 3: Make a change**\nType: `edit index.html`\nThis modifies the file. Now type `git status` again  you'll see `modified: index.html` in red.\n\n**Step 4: Stage the change**\nType: `git add index.html` or just `git add .` (the dot means \"all changed files\")\nThe file moves to the staging area  ready to be committed.\n\n**Step 5: Commit (save the snapshot)**\nType: `git commit -m \"Initial commit\"`\nYou'll see a confirmation with a hash (like `[main abc12] Initial commit`). That hash is your save point ID.\n\n**Step 6: View your history**\nType: `git log`\nYou'll see your commit listed with its hash, branch, and message. Every time you commit, a new entry appears.\n\nThis is the core Git workflow: **edit > add > commit > repeat**. Master these four commands and you know 80% of what you need.\n\n:::checkpoint\nWhat's a Git commit?\nA) A saved snapshot of your files\nB) The final version of your project\nC) A bug report\nD) A deleted file\nCorrect: A\n\n:::checkpoint\nWhat does git add . do?\nA) Deletes all files\nB) Stages all changed files for commit\nC) Creates a new branch\nD) Shows commit history\nCorrect: B\n\n- Git is a time machine for your files\n- Commits are save points you can return to\n- Workflow: edit file > git add > git commit\n- Use the Git Terminal below to practice every command",
        quiz: [
          {
            question: "What's a Git commit?",
            options: [
              "Saved snapshot",
              "Final version",
              "Bug report",
              "Language",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is .gitignore used for?",
            options: [
              "Ignores all files",
              "Specifies files Git should not track",
              "Deletes untracked files",
              "Hides files from explorer",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does git pull do?",
            options: [
              "Sends commits to GitHub",
              "Fetches and merges changes from remote",
              "Creates a new branch",
              "Deletes local changes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of branching?",
            options: [
              "To create independent lines of development",
              "To delete old code",
              "To merge files",
              "To backup code",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you resolve a merge conflict?",
            options: [
              "Delete the conflicting file",
              "Manually edit the conflicted file and commit",
              "Git resolves it automatically",
              "Create a new branch",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w4-d2",
        title: "Day 2: GitHub Basics",
        description: "Store code online and collaborate",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Use GitHub to store your code online and collaborate with others.\n\nYou finish your Excel Portfolio project. You want to:\n1. Share it with employers\n2. Keep it backed up online\n3. Get feedback from other analysts\n\nGitHub solves all three. It's like Google Drive for Git repositories.\n\n## Create a GitHub Account\n\nGo to https://github.com and sign up (free). Choose the Free plan. Your username becomes part of your portfolio URL, so pick something professional like `yourname-data` or `yourname-analyst`.\n\n## Key Concepts\n\n- **Push:** Send your local commits to GitHub (upload)\n- **Pull:** Download changes from GitHub to your computer (download)\n- **Clone:** Make a copy of someone else's repo on your computer\n- **Fork:** Copy someone's repo to your own GitHub account (like \"save a copy to my drive\")\n\n## Your First Push Workflow\n\nThe **Git Terminal** below simulates the local side. On a real computer, you'd do this:\n\n```bash\n# Step 1: Create a repo on GitHub first (click the + button, name it)\n# Step 2: Connect your local repo to GitHub\ngit remote add origin https://github.com/your-username/your-repo.git\n\n# Step 3: Push your commits\ngit push -u origin main\n```\n\nIn the simulator below, practice the local side: init a repo, make a change, commit it. Then run `git log` to see your history  that's what you'd push to GitHub.\n\n## What to Put on GitHub\n\nEvery project you build in this course should go on GitHub:\n- Excel workbooks (.xlsx files)\n- SQL queries (.sql files)\n- Python notebooks (.ipynb files)\n- README.md files explaining each project\n\nEmployers WILL check your GitHub. A clean profile with 3-5 projects is worth more than a degree.\n\n## Git Diff  See What Actually Changed\n\nBefore committing, always check what you're about to save. `git diff` shows every line that changed since the last commit → additions in green, removals in red.\n\n```bash\ngit diff                  # shows unstaged changes\ngit diff --staged         # shows staged (but not yet committed) changes\ngit diff filename.csv     # shows changes in a specific file only\n```\n\nThis is your safety net. Never commit without running `git diff` first → it catches accidental changes (like accidentally editing a file) before they become permanent.\n\n:::checkpoint\nWhat does git push do?\nA) Deletes your code\nB) Sends your commits to GitHub\nC) Downloads changes from GitHub\nD) Creates a new repository\nCorrect: B\n\n:::checkpoint\nWhat is the difference between clone and fork?\nA) Clone copies to your computer, fork copies to your GitHub account\nB) They are the same thing\nC) Clone is for public repos only\nD) Fork is for private repos only\nCorrect: A\n\n- GitHub stores repos online for free\n- Push = upload, Pull = download\n- Every project goes on GitHub for your portfolio",
        quiz: [
          {
            question: "What does git push do?",
            options: [
              "Deletes code",
              "Sends commits to GitHub",
              "Downloads changes",
              "Creates repo",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does git pull do?",
            options: [
              "Sends commits to GitHub",
              "Fetches and merges changes from remote",
              "Creates a new branch",
              "Deletes local changes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does 'git add .' do?",
            options: [
              "Stages all changes for commit",
              "Adds a remote",
              "Adds a new file",
              "Updates all files",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you resolve a merge conflict?",
            options: [
              "Delete the conflicting file",
              "Manually edit the conflicted file and commit",
              "Git resolves it automatically",
              "Create a new branch",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of branching?",
            options: [
              "To create independent lines of development",
              "To delete old code",
              "To merge files",
              "To backup code",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w4-d3",
        title: "Day 3: Commits & Branches",
        description: "Create branches to work safely",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Create branches to work on changes safely without breaking your main project.\n\nImagine you're writing a report. You want to try a different ending, but you're not sure if it's better. Instead of deleting the original, you make a copy (branch), edit the copy, and if it's better, you merge it back. If not, you delete the copy. That's exactly what Git branches do.\n\n## Why Branches Matter\n\nIn real data analysis work, you'll use branches constantly:\n- Experiment with a new chart type without ruining your dashboard\n- Try a different data cleaning approach side by side\n- Fix a bug in an urgent hotfix while keeping your main work separate\n- Collaborate with teammates without stepping on each other's changes\n\n## Branch Commands\n\nThe **Git Terminal** below supports all of these:\n\n- `git branch`  List all branches (the * shows which one you're on)\n- `git branch feature-name`  Create a new branch called \"feature-name\"\n- `git checkout feature-name`  Switch to that branch\n- `git merge feature-name`  Merge your feature branch back into main\n\n## Practice in the Git Terminal\n\nTry this complete workflow:\n\n```bash\n# Step 1: Initialize\ngit init\nedit index.html\ngit add .\ngit commit -m \"Initial commit\"\n\n# Step 2: Create and switch to a new branch\ngit branch experiment\ngit checkout experiment\n\n# Step 3: Make changes on the branch\ngit branch  # notice the * is now on \"experiment\"\nedit style.css\ngit add .\ngit commit -m \"Try new styles\"\n\n# Step 4: Switch back to main and merge\ngit checkout main\ngit merge experiment\ngit log  # you'll see commits from both branches\n```\n\nNotice how the branches stayed isolated. The experiment branch had its own changes, but main stayed clean until you decided to merge. If the experiment had failed, you could have deleted the branch with no harm.\n\n:::checkpoint\nWhy would you create a branch in Git?\nA) To permanently delete files\nB) To work on a new feature without risking the main project\nC) To share your code online\nD) To undo the last commit\nCorrect: B\n\n:::checkpoint\nWhat does git merge do?\nA) Deletes a branch\nB) Combines changes from one branch into another\nC) Creates a new repository\nD) Shows commit history\nCorrect: B\n\n- Branches let you experiment safely\n- Create with git branch, switch with git checkout, merge with git merge\n- Practice the full workflow in the Git Terminal below",
        quiz: [
          {
            question: "Why create a branch?",
            options: [
              "Delete files",
              "Experiment safely without breaking main",
              "Share online",
              "Undo commit",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does 'git add .' do?",
            options: [
              "Stages all changes for commit",
              "Adds a remote",
              "Adds a new file",
              "Updates all files",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a pull request?",
            options: [
              "A request to pull data from database",
              "A proposal to merge changes into a branch",
              "A command to update local repo",
              "A type of branch",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between Git and GitHub?",
            options: [
              "Git is the version control tool, GitHub is a cloud hosting service",
              "GitHub is a version of Git",
              "Git is for code, GitHub is for documents",
              "They are the same",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you resolve a merge conflict?",
            options: [
              "Delete the conflicting file",
              "Manually edit the conflicted file and commit",
              "Git resolves it automatically",
              "Create a new branch",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w4-d4",
        title: "Day 4: Publishing Projects",
        description: "Use READMEs and GitHub Pages to share your work",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Share your work professionally using README files and GitHub Pages.\n\nYour code is only as good as your documentation. A README is like a welcome sign for your project. It tells people what this project is, how to use it, and why they should care.\n\n## README Template\n\nEvery project on GitHub needs a README.md file. Here's a template you can copy:\n\n```markdown\n# Project Title\n\n**What this project does:** A brief description of the analysis.\n\n**Tools used:** Excel, SQL, Python (Pandas, Matplotlib)\n\n## Data Source\nWhere the data came from and how to access it.\n\n## Key Findings\n- Finding 1 with a chart/screenshot\n- Finding 2 with a chart/screenshot\n- Finding 3 with a chart/screenshot\n\n## Files\n- `analysis.ipynb`  Main notebook\n- `data/`  Raw data (if shareable)\n- `charts/`  Output visualizations\n\n## How to Run\n1. Clone this repo: `git clone https://github.com/yourname/project`\n2. Install dependencies: `pip install -r requirements.txt`\n3. Run the notebook: `jupyter notebook analysis.ipynb`\n\n## Contact\nYour Name  [LinkedIn](https://linkedin.com/in/yourname)  [Email](mailto:you@email.com)\n```\n\n## GitHub Pages  Portfolio Site for Free\n\nGitHub Pages lets you host a free website directly from your repo. Perfect for a data portfolio.\n\n**Setup in 3 steps:**\n1. Create a repo named `yourusername.github.io` (must be exactly this)\n2. Create an `index.html` file (or use a Jekyll theme)\n3. Go to Settings > Pages > select branch \"main\" > Save\n\nYour site is live at `https://yourusername.github.io` within minutes.\n\nThe **Git Terminal** below lets you practice the local side  init a repo, add files, commit, and check your log. On your real computer, you'd then push to GitHub and turn on Pages.\n\n:::checkpoint\nWhat's the purpose of a README file?\nA) It runs your code\nB) It explains what your project is and how to use it\nC) It stores your password\nD) It deletes old files\nCorrect: B\n\n:::checkpoint\nWhat URL does a GitHub Pages site use?\nA) github.com/yourname\nB) yourusername.github.io\nC) yourname.com\nD) pages.github.com\nCorrect: B\n\n- README is your project's front door  always include one\n- GitHub Pages hosts free portfolio sites\n- Repo name must be yourusername.github.io",
        quiz: [
          {
            question: "Purpose of a README?",
            options: [
              "Runs code",
              "Explains your project",
              "Stores passwords",
              "Deletes files",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does 'git add .' do?",
            options: [
              "Stages all changes for commit",
              "Adds a remote",
              "Adds a new file",
              "Updates all files",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is .gitignore used for?",
            options: [
              "Ignores all files",
              "Specifies files Git should not track",
              "Deletes untracked files",
              "Hides files from explorer",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a pull request?",
            options: [
              "A request to pull data from database",
              "A proposal to merge changes into a branch",
              "A command to update local repo",
              "A type of branch",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does git pull do?",
            options: [
              "Sends commits to GitHub",
              "Fetches and merges changes from remote",
              "Creates a new branch",
              "Deletes local changes",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w4-d5",
        title: "Day 5: Month 1 Capstone: Excel Portfolio",
        description: "Combine everything into a polished portfolio",
        type: "project",
        duration: "2-3 hrs",
        content:
          "Combine everything from Month 1 into a polished Excel portfolio project.\n\nYou're applying for a junior data analyst role. Build a complete Excel workbook that demonstrates:\n- Data cleaning skills\n- Formula knowledge\n- Pivot table ability\n- Conditional formatting and professional presentation\n\n**Requirements:**\n- At least 500 rows of data (sales, inventory, or survey)\n- 5 sheets: Raw Data, Clean Data, Analysis, Dashboard, Documentation\n- At least 3 different formulas\n- At least 1 pivot table\n- Conditional formatting on key metrics\n- Professional formatting (headers, colors, alignment)\n\n**Hints:**\n- Use PROPER, TRIM, SUBSTITUTE for cleaning\n- Use SUM, IF, VLOOKUP in your formulas\n- Your documentation sheet should explain your process step by step\n\n:::checkpoint\nWhy should you include a documentation sheet in your portfolio?\nA) It takes up space\nB) It shows employers you can communicate your process clearly\nC) It's required by Excel\nD) It makes the file bigger\nCorrect: B",
        quiz: [
          {
            question: "Why include a documentation sheet?",
            options: [
              "Takes up space",
              "Shows you can communicate clearly",
              "Required by Excel",
              "Makes file bigger",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between Git and GitHub?",
            options: [
              "Git is the version control tool, GitHub is a cloud hosting service",
              "GitHub is a version of Git",
              "Git is for code, GitHub is for documents",
              "They are the same",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you resolve a merge conflict?",
            options: [
              "Delete the conflicting file",
              "Manually edit the conflicted file and commit",
              "Git resolves it automatically",
              "Create a new branch",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does git pull do?",
            options: [
              "Sends commits to GitHub",
              "Fetches and merges changes from remote",
              "Creates a new branch",
              "Deletes local changes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a pull request?",
            options: [
              "A request to pull data from database",
              "A proposal to merge changes into a branch",
              "A command to update local repo",
              "A type of branch",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "5 sheets",
          "3+ formulas",
          "Pivot table",
          "Conditional formatting",
          "Professional formatting",
        ],
      },
    ],
  },
  {
    id: "week5",
    title: "Week 7: Intro to Databases (Month 2)",
    durationText: "WEEK 7",
    focus: "Relational Databases, Queries",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w5-d1",
        title: "Day 1: What is a Relational DB?",
        description: "Understand tables, keys, and relational databases",
        type: "learn",
        duration: "45-60 mins",
        content:
          "A **relational database** is like a set of connected spreadsheets. Instead of putting everything in one giant sheet, you split data into smaller tables and link them with keys.\n\n**Tables** = spreadsheets (employees, orders, products)\n\n**Rows** = records (one employee, one order)\n\n**Columns** = fields (name, salary, date)\n\n**Primary Key** = unique ID for each row (employee #1, #2, #3)\n\n**Foreign Key** = a column in one table that points to a primary key in another  like orders.employee_id linking to employees.id\n\nThe SQL Playground below has three tables: **employees**, **departments**, and **orders**. Click Run to see what's in each.\n\nStart with the simplest query:\n\n```sql\nSELECT * FROM employees;\n```\n\n`*` means 'all columns'. This returns every row and column from the employees table.\n\nTo pick specific columns:\n```sql\nSELECT name, salary FROM employees;\n```\n\nTo filter rows:\n```sql\nSELECT * FROM employees WHERE department = 'Engineering';\n```\n\n`WHERE` is like a sieve  only rows matching the condition pass through.\n\n```sql\nSELECT * FROM employees WHERE salary > 70000;\n```\n\n`ORDER BY` sorts results:\n```sql\nSELECT name, salary FROM employees ORDER BY salary DESC;\n```\n\n`LIMIT` chops the results:\n```sql\nSELECT * FROM employees ORDER BY salary DESC LIMIT 3;\n```\n\nTry each of these queries in the SQL Playground below. Change the column names, try different WHERE conditions, and see what happens.\n\n:::checkpoint\nWhat does SELECT * FROM employees do?\nA) Deletes the employees table\nB) Returns all columns and all rows from the employees table\nC) Returns only the first row\nD) Shows the table structure\nCorrect: B\n\n:::checkpoint\nWhat does WHERE do in a SQL query?\nA) Sorts the results\nB) Filters rows based on a condition\nC) Limits the number of rows\nD) Joins two tables\nCorrect: B",
        quiz: [
          {
            question: "What does SELECT * FROM employees do?",
            options: [
              "Deletes the table",
              "Returns all columns and rows",
              "Returns first row",
              "Shows table structure",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does WHERE do?",
            options: [
              "Sorts results",
              "Filters rows by condition",
              "Limits rows",
              "Joins tables",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does ORDER BY do?",
            options: [
              "Deletes columns",
              "Sorts results by a column",
              "Filters rows",
              "Creates a new table",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does LIMIT do in a SQL query?",
            options: [
              "Limits the number of rows returned",
              "Limits the number of columns",
              "Limits the table size",
              "Limits the database size",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a primary key?",
            options: [
              "The most important column in a table",
              "A unique identifier for each row in a table",
              "A column that links to another table",
              "A type of index",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w5-d2",
        title: "Day 2: Setting up PostgreSQL",
        description: "Explore the sample data in the SQL Playground",
        type: "practice",
        duration: "45-60 mins",
        content:
          "You don't need to install PostgreSQL  the SQL Playground has sample data built in. Just open it and start writing queries.\n\nThe three tables available are:\n- **employees**  7 employees with id, name, department, salary, hire_date\n- **departments**  3 departments with id, name, budget\n- **orders**  6 orders with id, customer, amount, status, order_date\n\nBefore writing queries, explore the data. Run these to see what's in each table:\n\n```sql\nSELECT * FROM departments;\nSELECT * FROM orders;\n```\n\nNow practice basic filtering:\n- Find employees who make more than 70,000\n- Find orders where the amount is less than 500\n- Find departments with a budget over 350,000\n\nThen sorting:\n- List employees by salary from highest to lowest\n- List orders by date, oldest first\n- List the top 3 most expensive orders\n\nThe playground runs mock SQL against in-memory data. It supports SELECT, WHERE, ORDER BY, LIMIT, GROUP BY, and JOINs. Try breaking a query and see the error messages  that's how you learn.\n\n:::checkpoint\nWhy explore data before analyzing it?\nA) It's a waste of time\nB) You need to understand what columns and values exist to write correct queries\nC) To make the database faster\nD) To delete unused data\nCorrect: B",
        quiz: [
          {
            question: "Why explore data before analyzing?",
            options: [
              "Waste of time",
              "Understand columns and values to write correct queries",
              "Make database faster",
              "Delete unused data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What three tables are available in the SQL Playground?",
            options: [
              "Employees, Departments, Orders",
              "Students, Courses, Grades",
              "Products, Categories, Sales",
              "Customers, Payments, Shipments",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "How do you select only distinct (unique) department names?",
            options: [
              "SELECT UNIQUE department FROM employees",
              "SELECT DISTINCT department FROM employees",
              "SELECT department DISTINCT FROM employees",
              "SELECT * FROM employees",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does LIMIT 2 OFFSET 1 do?",
            options: [
              "Skips 1 row, then returns the next 2 rows",
              "Returns rows 1 through 2",
              "Skips 2 rows, then returns 1 row",
              "Returns the first 2 rows",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the SQL Playground support?",
            options: [
              "Only SELECT statements",
              "SELECT, WHERE, ORDER BY, LIMIT, GROUP BY, and JOINs",
              "Only CREATE TABLE statements",
              "Only INSERT statements",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w5-d3",
        title: "Day 3: SELECT & WHERE",
        description: "Filter and select data with precision",
        type: "learn",
        duration: "45-60 mins",
        content:
          "`SELECT` picks columns, `WHERE` filters rows. Together they're the most common SQL pattern.\n\nMultiple conditions with AND and OR:\n```sql\nSELECT * FROM employees WHERE department = 'Engineering' AND salary > 90000;\n```\n\n`IN` checks against a list:\n```sql\nSELECT * FROM employees WHERE department IN ('Engineering', 'Sales');\n```\n\n`BETWEEN` checks a range:\n```sql\nSELECT * FROM employees WHERE salary BETWEEN 60000 AND 90000;\n```\n\n`LIKE` matches patterns:\n```sql\nSELECT * FROM employees WHERE name LIKE '%a%';\n```\n`%` means 'any characters'. This finds names containing the letter 'a'.\n\nPractice combining these in the Playground below.\n\n:::checkpoint\nWhat does `%` mean in a LIKE pattern?\nA) Percent sign literally\nB) Match any sequence of characters\nC) Match exactly one character\nD) Match a number\nCorrect: B\n\n:::checkpoint\nWhich finds employees in Engineering OR Sales?\nA) WHERE department = 'Engineering' AND department = 'Sales'\nB) WHERE department IN ('Engineering', 'Sales')\nC) WHERE department BETWEEN 'Engineering' AND 'Sales'\nD) WHERE department LIKE 'Engineering%'\nCorrect: B",
        quiz: [
          {
            question: "What does % mean in LIKE?",
            options: [
              "Percent sign",
              "Match any characters",
              "Match one char",
              "Match a number",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which finds Engineering or Sales?",
            options: ["AND", "IN", "BETWEEN", "LIKE"],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you find duplicate records in a table?",
            options: [
              "SELECT * GROUP BY duplicates",
              "SELECT column, COUNT(*) GROUP BY column HAVING COUNT(*) > 1",
              "WHERE duplicate = true",
              "FIND DUPLICATES",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does a LEFT JOIN return?",
            options: [
              "Only matching rows",
              "All rows from left table and matching from right",
              "All rows from both tables",
              "Only non-matching rows",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w5-d4",
        title: "Day 4: ORDER BY & LIMIT",
        description: "Sort and paginate query results",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Dates and text need special handling in SQL.\n\n**Ordering by date:**\n```sql\nSELECT * FROM orders ORDER BY order_date;\n```\n\n**Filtering by date range:**\n```sql\nSELECT * FROM orders WHERE order_date >= '2024-02-01';\n```\n\n**LIMIT with OFFSET**  skip some rows, then take a limited number (great for pagination):\n```sql\nSELECT * FROM employees ORDER BY salary DESC LIMIT 2 OFFSET 1;\n```\nThis skips the top earner, then shows the next 2.\n\n**DISTINCT**  unique values only:\n```sql\nSELECT DISTINCT department FROM employees;\n```\n\nPractice in the Playground: find the 3 most recent orders, list all unique products, find employees hired after 2022.\n\n:::checkpoint\nWhat does SELECT DISTINCT department do?\nA) Deletes duplicate departments\nB) Returns each department name only once\nC) Returns departments in alphabetical order\nD) Counts the number of departments\nCorrect: B\n\n:::checkpoint\nWhat does LIMIT 5 OFFSET 10 do?\nA) Shows 5 rows starting from row 10\nB) Shows 10 rows starting from row 5\nC) Shows rows 5 through 10\nD) Limits total to 15 rows\nCorrect: A",
        quiz: [
          {
            question: "What does DISTINCT do?",
            options: [
              "Deletes duplicates",
              "Returns unique values only",
              "Sorts alphabetically",
              "Counts rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does LIMIT 5 OFFSET 10 do?",
            options: [
              "5 rows from row 10",
              "10 rows from row 5",
              "Rows 5-10",
              "15 rows total",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you sort results in descending order?",
            options: [
              "ORDER BY column ASC",
              "ORDER BY column DESC",
              "SORT BY column DOWN",
              "ORDER column DESCENDING",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does ORDER BY order_date do?",
            options: [
              "Orders rows by date oldest first",
              "Orders rows by date newest first",
              "Filters by date",
              "Groups by date",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What does SELECT * FROM employees ORDER BY salary DESC LIMIT 1 return?",
            options: [
              "The lowest paid employee",
              "The highest paid employee",
              "All employees sorted by salary",
              "An error",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w5-d5",
        title: "Day 5: Mini-Project: Basic Queries",
        description: "Answer business questions with SQL",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Your turn. Use the SQL Playground to answer these questions:\n\n1. **How many employees are in each department?**\n2. **Which employee has the highest salary?**\n3. **List all orders sorted by amount (highest first)**\n4. **Find employees hired before 2022**\n5. **What products have been ordered? (no duplicates)**\n\nWrite each query, run it in the Playground, and note the answer. This is how real analysts work  asking questions and writing queries to answer them.\n\n:::checkpoint\nWhich query counts employees per department?\nA) SELECT * FROM employees WHERE department = 'Engineering'\nB) SELECT department, COUNT(*) FROM employees GROUP BY department\nC) SELECT COUNT(department) FROM employees\nD) SELECT department FROM employees ORDER BY department\nCorrect: B",
        quiz: [
          {
            question: "Which query counts employees per department?",
            options: [
              "SELECT *",
              "SELECT department, COUNT(*) GROUP BY department",
              "COUNT(department)",
              "SELECT department ORDER BY department",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: [
              "WHERE filters rows, HAVING filters groups",
              "WHERE filters groups, HAVING filters rows",
              "Same thing",
              "HAVING comes before WHERE",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you find duplicate records in a table?",
            options: [
              "SELECT * GROUP BY duplicates",
              "SELECT column, COUNT(*) GROUP BY column HAVING COUNT(*) > 1",
              "WHERE duplicate = true",
              "FIND DUPLICATES",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does UNION do?",
            options: [
              "Combines results of two queries removing duplicates",
              "Combines results keeping all rows",
              "Intersects two queries",
              "Subtracts queries",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "week6",
    title: "Week 8: Aggregations (Month 2)",
    durationText: "WEEK 8",
    focus: "Relational Databases, Queries",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w6-d1",
        title: "Day 1: COUNT, SUM, AVG",
        description: "Use aggregate functions to summarize data",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Aggregation functions do math across multiple rows and return a **single summary number**. Think of them as zooming out from individual rows to see the big picture.\n\nImagine you manage a small company with 7 employees. Your boss walks in and asks:\n\n- *\"How many people work here?\"* ? **COUNT**\n- *\"What's our total monthly payroll?\"* ? **SUM**\n- *\"What's the average salary?\"* ? **AVG**\n- *\"Who's the highest paid? Lowest paid?\"* ? **MAX / MIN**\n\nWithout aggregation, you'd have to export all 7 rows, open a calculator, and do the math yourself. With SQL, each answer is one line.\n\nLet's answer each question using the **employees** table in the Playground below. The table has 7 rows with columns: id, name, department, salary, hire_date.\n\n**COUNT  How many rows are in this table?**\n\n```sql\nSELECT COUNT(*) FROM employees;\n```\n\n`COUNT(*)` counts every row. The `*` means \"all columns\"  SQL just picks one to count. Run this and you'll get **7**, one for each employee.\n\nIf instead you want to know how many *different* departments exist, use `COUNT(DISTINCT department)`  that counts unique values only, ignoring duplicates.\n\n```sql\nSELECT COUNT(DISTINCT department) FROM employees;\n```\n\n**Try it**: Replace `COUNT(*)` with `COUNT(DISTINCT department)` in the Playground and see the difference.\n\n**SUM  Add up all values in a column**\n\nYour boss wants to know the total payroll:\n\n```sql\nSELECT SUM(salary) FROM employees;\n```\n\nSQL takes all 7 salary values, adds them together, and returns one number. This is the total you pay everyone each year before taxes.\n\n**MIN / MAX  Find the smallest and largest values**\n\nWho's the lowest paid? The highest paid?\n\n```sql\nSELECT MIN(salary), MAX(salary) FROM employees;\n```\n\n`MIN(salary)` finds the smallest salary in the column. `MAX(salary)` finds the largest. Together they show the **range**  from $58,000 to $110,000.\n\n**Combine multiple aggregations in one query**\n\nYou don't need to run five separate queries. SQL lets you ask everything at once:\n\n```sql\nSELECT\n  COUNT(*) AS total_employees,\n  SUM(salary) AS total_payroll,\n  AVG(salary) AS avg_salary,\n  MIN(salary) AS lowest_salary,\n  MAX(salary) AS highest_salary\nFROM employees;\n```\n\n`AS` gives each result column a friendly name (an **alias**). Without it, the column would just say `COUNT(*)` instead of `total_employees`.\n\nRun this query in the Playground. You'll get a single row with 5 numbers  a complete summary of your company's salary data in one command.\n\n**Pro tip**: Aggregations ignore NULL values (except `COUNT(*)` which counts rows regardless). If a salary column had missing data, `AVG(salary)` would only average the non-null values.\n\n:::checkpoint\nWhat does COUNT(*) count?\nA) Only non-null values in a column\nB) The total number of rows in the result\nC) The sum of all values\nD) Unique values only\nCorrect: B\n\n:::checkpoint\nWhat does AS do in a query?\nA) Sorts the results\nB) Gives a column or table an alias (friendly name)\nC) Filters rows\nD) Adds a new column\nCorrect: B",
        quiz: [
          {
            question: "What does COUNT(*) count?",
            options: [
              "Non-null values",
              "Total rows",
              "Sum of values",
              "Unique values",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does AS do?",
            options: ["Sorts", "Creates alias", "Filters", "Adds column"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does SUM(salary) do?",
            options: [
              "Finds the average salary",
              "Adds up all salary values",
              "Counts employees with that salary",
              "Finds the highest salary",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does AVG(salary) return?",
            options: [
              "The total of all salaries",
              "The average of all salary values",
              "The highest salary",
              "The lowest salary",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does MIN(salary) return?",
            options: [
              "The highest salary",
              "The lowest salary",
              "The average salary",
              "The total salary",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w6-d2",
        title: "Day 2: GROUP BY",
        description: "Group rows and aggregate per group",
        type: "practice",
        duration: "45-60 mins",
        content:
          "`GROUP BY` groups rows that share a value, then runs aggregations on each group.\n\nWithout GROUP BY, COUNT gives you one number for the whole table. With GROUP BY, you get one number per group.\n\n**Total salary per department:**\n```sql\nSELECT department, SUM(salary) FROM employees GROUP BY department;\n```\n\n**Average salary per department:**\n```sql\nSELECT department, AVG(salary) FROM employees GROUP BY department;\n```\n\n**Employee count per department:**\n```sql\nSELECT department, COUNT(*) FROM employees GROUP BY department;\n```\n\nAny column in SELECT must either be in GROUP BY or wrapped in an aggregate function. Otherwise SQL doesn't know which row's value to show.\n\nTry in the Playground: total orders per customer, average amount per product.\n\n:::checkpoint\nWhat does GROUP BY do?\nA) Sorts rows alphabetically\nB) Groups rows with the same value so aggregations run per group\nC) Limits the number of rows\nD) Joins two tables\nCorrect: B\n\n:::checkpoint\nIf you SELECT department, SUM(salary) and GROUP BY department, what happens?\nA) Error  can't use SUM with GROUP BY\nB) Total salary for each department\nC) Average salary for the whole company\nD) List of all salaries sorted by department\nCorrect: B",
        quiz: [
          {
            question: "What does GROUP BY do?",
            options: [
              "Sorts",
              "Groups rows for per-group aggregations",
              "Limits rows",
              "Joins tables",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "SELECT department, SUM(salary) GROUP BY department gives?",
            options: [
              "Error",
              "Total salary per dept",
              "Average salary",
              "Sorted salaries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you find duplicate records in a table?",
            options: [
              "SELECT * GROUP BY duplicates",
              "SELECT column, COUNT(*) GROUP BY column HAVING COUNT(*) > 1",
              "WHERE duplicate = true",
              "FIND DUPLICATES",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "If you SELECT name, department FROM employees GROUP BY department, what happens?",
            options: [
              "It works normally",
              "Error: name is not in GROUP BY and not an aggregate function",
              "It returns one name per department",
              "It lists all names grouped by department",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w6-d3",
        title: "Day 3: HAVING Clause",
        description: "Filter grouped results after aggregation",
        type: "learn",
        duration: "45-60 mins",
        content:
          "`HAVING` is like WHERE but for grouped data. WHERE filters rows BEFORE grouping. HAVING filters groups AFTER grouping.\n\n**Find departments with total salary over 150,000:**\n```sql\nSELECT department, SUM(salary) AS total_salary\nFROM employees\nGROUP BY department\nHAVING SUM(salary) > 150000;\n```\n\n**Find products with more than 2 orders:**\n```sql\nSELECT product, COUNT(*) AS order_count\nFROM orders\nGROUP BY product\nHAVING COUNT(*) > 1;\n```\n\nThink of the order of operations:\n1. FROM  get the table\n2. WHERE  filter rows\n3. GROUP BY  group rows\n4. HAVING  filter groups\n5. SELECT  pick columns\n6. ORDER BY  sort\n\nTry in the Playground: find customers who spent over 1000 total.\n\n:::checkpoint\nWhat's the difference between WHERE and HAVING?\nA) They're the same thing\nB) WHERE filters rows before grouping; HAVING filters groups after\nC) HAVING filters rows; WHERE filters groups\nD) WHERE only works with SELECT\nCorrect: B\n\n:::checkpoint\nWhich runs first: WHERE or GROUP BY?\nA) GROUP BY\nB) WHERE\nC) They run simultaneously\nD) ORDER BY runs before both\nCorrect: B",
        quiz: [
          {
            question: "WHERE vs HAVING difference?",
            options: [
              "Same",
              "WHERE before GROUP BY, HAVING after",
              "HAVING filters rows",
              "WHERE filters groups",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which runs first?",
            options: ["GROUP BY", "WHERE", "Simultaneous", "ORDER BY"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does HAVING COUNT(*) > 1 do?",
            options: [
              "Keeps only groups with more than 1 row",
              "Keeps only rows with count > 1",
              "Filters rows before grouping",
              "Returns an error",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Can you use HAVING without GROUP BY?",
            options: [
              "Yes, HAVING works on any query",
              "No, HAVING only works after GROUP BY",
              "Yes, but only with WHERE",
              "No, HAVING is deprecated",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the correct order of SQL clause execution?",
            options: [
              "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
              "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
              "FROM -> SELECT -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
              "WHERE -> FROM -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w6-d4",
        title: "Day 4: Date & Time Functions",
        description: "Work with dates and text in SQL",
        type: "practice",
        duration: "45-60 mins",
        content:
          "SQL has several ways to work with dates. Since dates are stored as 'YYYY-MM-DD' strings, you can both filter by ranges and extract parts using string functions.\n\n**Filtering by date range:**\n```sql\n-- All orders in 2024\nSELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';\n\n-- Orders in February 2024 or later\nSELECT * FROM orders WHERE order_date >= '2024-02-01';\n\n-- BETWEEN is shorter for ranges\nSELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-06-30';\n```\n\n**Extracting date parts with SUBSTR:**\nSince order_date is 'YYYY-MM-DD', you can extract year, month, or day:\n```sql\n-- Extract year (first 4 chars)\nSELECT SUBSTR(order_date, 1, 4) AS year FROM orders;\n\n-- Extract month (chars 6-7)\nSELECT SUBSTR(order_date, 6, 2) AS month FROM orders;\n\n-- Group orders by month\nSELECT SUBSTR(order_date, 1, 7) AS month, SUM(amount)\nFROM orders GROUP BY month;\n```\nSUBSTR works like Excel's MID function: `SUBSTR(text, start_position, length)` starts at position 1, not 0.\n\n**Real databases have dedicated date functions** like `YEAR()`, `MONTH()`, `DATE_PART()`, or `EXTRACT()`. Our Playground uses SUBSTR because the dates are stored as text, but the concept is the same  pull out the part of the date you care about.\n\n**String functions you'll use daily:**\n- `UPPER(name)`  convert to uppercase\n- `LOWER(name)`  convert to lowercase\n- `LENGTH(name)`  count characters\n- `SUBSTR(name, 1, 3)`  extract part of text\n\nTry in the Playground: find employee names longer than 5 characters, convert all department names to uppercase, or group orders by year.\n\n:::checkpoint\nWhat does SUBSTR(order_date, 1, 7) do?\nA) Returns the first 7 characters of order_date\nB) Returns characters from position 1 to 7\nC) Returns the first 7 orders by date\nD) Converts order_date to uppercase\nCorrect: A\n\n:::checkpoint\nWhat does SUBSTR(order_date, 6, 2) extract?\nA) The year\nB) The month\nC) The day\nD) The first 6 characters\nCorrect: B",
        quiz: [
          {
            question: "What does SUBSTR(order_date, 1, 7) do?",
            options: [
              "First 7 chars",
              "Chars 1-7",
              "First 7 orders",
              "Uppercase",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does UPPER(name) do?",
            options: [
              "Converts to lowercase",
              "Converts to uppercase",
              "Counts characters",
              "Extracts part of text",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does LENGTH(name) return?",
            options: [
              "The number of characters in the name",
              "The length of the column",
              "The width of the cell",
              "The number of words",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you find all orders from 2024?",
            options: [
              "SELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'",
              "SELECT * FROM orders WHERE order_date = 2024",
              "SELECT * FROM orders WHERE YEAR = 2024",
              "SELECT * FROM orders IN 2024",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What does SUBSTR(order_date, 6, 2) extract from '2024-02-15'?",
            options: ["2024", "02 (the month)", "15 (the day)", "-02"],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w6-d5",
        title: "Day 5: Mini-Project: Aggregating Sales",
        description: "Use aggregation queries to analyze orders",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use aggregation queries to answer these:\n\n1. **Total revenue from all orders**\n2. **Average order amount**\n3. **Number of orders per customer**\n4. **Customers with total spending over 1000**\n5. **Most expensive product (by average order amount)**\n\nWrite each query in the Playground. For #4 you'll need HAVING. For #5 you'll need GROUP BY and ORDER BY.\n\n:::checkpoint\nTo find the most expensive product by average amount, you need:\nA) SELECT product, amount FROM orders\nB) SELECT product, AVG(amount) FROM orders GROUP BY product ORDER BY AVG(amount) DESC\nC) SELECT product, MAX(amount) FROM orders\nD) SELECT * FROM orders ORDER BY amount\nCorrect: B",
        quiz: [
          {
            question: "To find most expensive product by avg amount?",
            options: [
              "SELECT product, amount",
              "SELECT product, AVG(amount) GROUP BY product ORDER BY AVG(amount) DESC",
              "SELECT product, MAX(amount)",
              "SELECT * ORDER BY amount",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does HAVING do in a SQL query?",
            options: [
              "Filters rows before grouping",
              "Filters groups after aggregation",
              "Sorts the results",
              "Limits the number of rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "If you need total revenue per customer, which clause do you need?",
            options: ["ORDER BY", "GROUP BY", "WHERE", "LIMIT"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does COUNT(DISTINCT department) do?",
            options: [
              "Counts all rows including duplicates",
              "Counts unique department values only",
              "Counts departments with more than one employee",
              "Returns an error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which of these is an aggregate function?",
            options: ["UPPER", "AVG", "LENGTH", "SUBSTR"],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week7",
    title: "Week 9: Joins I (Month 2)",
    durationText: "WEEK 9",
    focus: "Relational Databases, Queries",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w7-d1",
        title: "Day 1: Primary & Foreign Keys",
        description: "Understand how tables connect",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Primary keys** uniquely identify each row in a table. In employees, `id` is the primary key: each employee has a unique number.\n\n**Foreign keys** are columns in one table that reference a primary key in another table. This is how tables connect.\n\n## How Foreign Keys Work (With Example Data)\n\nLook at the `employees` table in the Playground:\n```\nid | name   | department\n---|--------|-----------\n1  | Alice  | Engineering\n2  | Bob    | Marketing\n3  | Charlie| Engineering\n```\n\nIf this were a real database, `department` would be a foreign key referencing `departments.id`: you'd store `department_id = 1` instead of `'Engineering'`. Then:\n- `departments.id` = primary key (1, 2, 3 for Engineering, Marketing, Sales)\n- `employees.department_id` = foreign key referencing `departments.id`\n\n**Try this query in the Playground to see the relationship:**\n```sql\nSELECT e.name, d.name AS department, d.budget\nFROM employees e\nJOIN departments d ON e.department = d.name;\n```\nThis JOIN connects each employee to their department details using the department name as the linking column.\n\nIn a fully normalized database, `orders` would have `customer_id` (pointing to `customers.id`) and `employee_id` (pointing to `employees.id`). The sample data is simplified for learning, but the JOIN concept is the same.\n\nWhy split into tables? Without normalization, you'd repeat the same department name 'Engineering' for every employee in that department. If someone renamed it, you'd need to update hundreds of rows. With a departments table and a foreign key, you change it once.\n\n:::checkpoint\nWhat's a primary key?\nA) The most important column\nB) A column (or columns) that uniquely identifies each row\nC) The first column in a table\nD) A key that opens the database\nCorrect: B\n\n:::checkpoint\nWhat does a foreign key do?\nA) It's the same as a primary key\nB) It references a primary key in another table to connect related data\nC) It encrypts the data\nD) It creates a new table\nCorrect: B\n\n:::checkpoint\nWhat's the benefit of splitting data into multiple tables?\nA) Makes queries slower\nB) Avoids repeating the same data (reduces redundancy)\nC) Uses more storage\nD) Makes the database harder to use\nCorrect: B",
        quiz: [
          {
            question: "What's a primary key?",
            options: [
              "Most important column",
              "Uniquely identifies each row",
              "First column",
              "Database password",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Benefit of splitting into multiple tables?",
            options: [
              "Slower queries",
              "Reduces redundancy",
              "More storage",
              "Harder to use",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a foreign key?",
            options: [
              "A key from another country",
              "A column that references a primary key in another table",
              "A key that opens a foreign database",
              "A duplicate primary key",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "In the Playground tables, which column is the primary key of employees?",
            options: ["name", "id", "department", "salary"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "If Engineering is renamed to Engineering Dept, with a departments table how many changes?",
            options: [
              "One change in the departments table",
              "One change per employee in Engineering",
              "Hundreds of changes",
              "The name cannot be changed",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w7-d2",
        title: "Day 2: INNER JOIN",
        description: "Combine matching rows from two tables",
        type: "learn",
        duration: "45-60 mins",
        content:
          "`JOIN` combines rows from two tables based on a related column. `INNER JOIN` returns only rows where there's a match in both tables.\n\n**Find employees with their department info:**\n```sql\nSELECT employees.name, employees.department, departments.location, departments.budget\nFROM employees\nINNER JOIN departments ON employees.department = departments.name;\n```\n\nThis matches each employee's `department` column to the department's `name` column and brings in the department's location and budget.\n\nWhat's happening step by step:\n1. Start with every row in employees\n2. For each employee, find the department row WHERE employees.department = departments.name\n3. Combine the matching rows into one result row\n4. If no department matches, that employee is excluded (INNER JOIN)\n\nTry it in the Playground. What changes if you switch to LEFT JOIN?\n\n:::checkpoint\nWhat does INNER JOIN return?\nA) All rows from both tables\nB) Only rows where there's a match in both tables\nC) All rows from the first table, with NULLs where there's no match\nD) A single merged table\nCorrect: B",
        quiz: [
          {
            question: "What does INNER JOIN return?",
            options: [
              "All rows from both",
              "Only matching rows",
              "All from left table",
              "Merged table",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "In an INNER JOIN, what happens to employees whose department doesn't exist in the departments table?",
            options: [
              "They appear with NULL budget",
              "They are excluded from the results",
              "They appear with 0 budget",
              "An error is thrown",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What keyword follows the table names in a JOIN?",
            options: ["WHERE", "ON", "USING", "WITH"],
            correctAnswerIndex: 1,
          },
          {
            question: "How are rows matched in an INNER JOIN?",
            options: [
              "By row position (row 1 matches row 1)",
              "By a condition in the ON clause (usually matching column values)",
              "By alphabetical order",
              "By the first column in each table",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w7-d3",
        title: "Day 3: LEFT & RIGHT JOIN",
        description: "Keep all rows from one side even without matches",
        type: "practice",
        duration: "45-60 mins",
        content:
          "`LEFT JOIN` keeps all rows from the left (first) table, even if there's no match in the right table. Unmatched columns show as NULL.\n\n```sql\nSELECT employees.name, departments.budget\nFROM employees\nLEFT JOIN departments ON employees.department = departments.name;\n```\n\nEvery employee appears. If their department doesn't exist in the departments table, budget shows as NULL.\n\n`RIGHT JOIN` is the opposite  keeps all rows from the right table. It's less common because you can usually just swap the table order and use LEFT JOIN.\n\n**Real use case:** Find employees who are in a department that doesn't exist in the departments table (data quality check):\n```sql\nSELECT employees.name, employees.department\nFROM employees\nLEFT JOIN departments ON employees.department = departments.name\nWHERE departments.id IS NULL;\n```\n\nTry this in the Playground  are all employees matched to a department?\n\n:::checkpoint\nWhat does LEFT JOIN return for rows with no match?\nA) Deletes those rows\nB) NULL values for the right table's columns\nC) 0 instead of NULL\nD) An error\nCorrect: B",
        quiz: [
          {
            question: "LEFT JOIN fills missing matches with?",
            options: ["Deletes them", "NULL values", "Zeros", "Error"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does RIGHT JOIN return?",
            options: [
              "Only matching rows",
              "All rows from right table and matching from left",
              "All rows from both tables",
              "Only non-matching rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "How do you find employees whose department doesn't exist in the departments table?",
            options: [
              "Use INNER JOIN and check for NULL",
              "Use LEFT JOIN and check departments.id IS NULL",
              "Use RIGHT JOIN and check employees.id IS NULL",
              "Use FULL OUTER JOIN",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What's a common alternative to RIGHT JOIN?",
            options: [
              "Swap table order and use LEFT JOIN",
              "Use INNER JOIN instead",
              "Use FULL OUTER JOIN",
              "Use CROSS JOIN",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "When would you use LEFT JOIN instead of INNER JOIN?",
            options: [
              "When you need all rows from the left table, even without matches",
              "When you only want exact matches",
              "When you want to filter data",
              "When you want to sort data",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w7-d4",
        title: "Day 4: FULL OUTER JOIN",
        description: "Keep all rows from both sides",
        type: "practice",
        duration: "45-60 mins",
        content:
          "`FULL OUTER JOIN` returns all rows from both tables, with NULLs where there's no match. It's useful for finding mismatches in both directions.\n\nThe Playground supports INNER and LEFT joins. FULL OUTER JOIN is shown here conceptually:\n\n```sql\n-- Conceptual example (not all databases support FULL JOIN syntax)\nSELECT employees.name, departments.name\nFROM employees\nFULL OUTER JOIN departments ON employees.department = departments.name;\n```\n\n**Which join to use?**\n- Need matching data only? ? INNER JOIN\n- Need all from table A, plus whatever matches in B? ? LEFT JOIN\n- Need all from both sides? ? FULL OUTER JOIN\n\nPractice in the Playground: write a LEFT JOIN query, then swap the table order and write a LEFT JOIN that simulates a RIGHT JOIN.\n\n:::checkpoint\nWhich join keeps all rows from both tables?\nA) INNER JOIN\nB) LEFT JOIN\nC) FULL OUTER JOIN\nD) CROSS JOIN\nCorrect: C",
        quiz: [
          {
            question: "Which join keeps all rows from both tables?",
            options: ["INNER", "LEFT", "FULL OUTER", "CROSS"],
            correctAnswerIndex: 2,
          },
          {
            question: "When does FULL OUTER JOIN show NULL values?",
            options: [
              "When there are no matches on either side",
              "Only on the left side",
              "Only on the right side",
              "Never",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "Which join would you use to find rows in BOTH tables that have no match in the other?",
            options: [
              "INNER JOIN",
              "LEFT JOIN",
              "FULL OUTER JOIN",
              "CROSS JOIN",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What does INNER JOIN return?",
            options: [
              "All rows from both tables",
              "Only rows with matching keys in both tables",
              "All rows from left table",
              "All rows from right table",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does CROSS JOIN do?",
            options: [
              "Returns matching rows only",
              "Returns every combination of rows from both tables",
              "Returns all rows from left table",
              "Returns all rows from right table",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w7-d5",
        title: "Day 5: Mini-Project: Multi-table Query",
        description: "Combine joins with aggregations",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use joins to answer:\n\n1. **List each employee with their department's budget**\n2. **Find employees whose department has a budget over 400,000**\n3. **Which departments have no employees? (use LEFT JOIN + WHERE NULL)**\n4. **Count employees per department location**\n\nHint for #4: join employees to departments, then GROUP BY location.\n\n:::checkpoint\nTo count employees per department location, you need:\nA) SELECT location, COUNT(*) FROM employees GROUP BY location\nB) JOIN employees to departments, then GROUP BY location\nC) SELECT * FROM employees WHERE location = 'Building A'\nD) SELECT location FROM departments\nCorrect: B",
        quiz: [
          {
            question: "To count employees per location, you need?",
            options: [
              "SELECT location FROM employees",
              "JOIN employees to departments, GROUP BY location",
              "SELECT * WHERE location",
              "SELECT location FROM departments",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "To find departments with no employees, what pattern do you use?",
            options: [
              "INNER JOIN + WHERE NULL",
              "LEFT JOIN + WHERE right table key IS NULL",
              "RIGHT JOIN + WHERE left table key IS NULL",
              "FULL OUTER JOIN",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What type of join do you need to add a department budget column to each employee?",
            options: [
              "No join needed",
              "A join on the department name column",
              "A subquery",
              "A UNION",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "After joining employees to departments, how do you count employees per location?",
            options: [
              "SELECT location, COUNT(*) FROM employees GROUP BY location",
              "SELECT location, COUNT(*) FROM employees JOIN departments ON ... GROUP BY location",
              "SELECT * FROM employees WHERE location IS NOT NULL",
              "SELECT location FROM departments",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does JOIN do?",
            options: [
              "Combines two tables by matching a column they share",
              "Stacks results from two queries",
              "Creates a new table",
              "Deletes duplicate rows",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "week8",
    title: "Week 10: Joins II (Month 2)",
    durationText: "WEEK 10",
    focus: "Relational Databases, Queries",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w8-d1",
        title: "Day 1: Self Joins",
        description: "Join a table to itself",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Sometimes you need to join a table to itself. This is called a **self join**. You use table aliases to distinguish the two copies.\n\nConceptual example (employees who work in the same department):\n```sql\nSELECT A.name AS employee, B.name AS colleague, A.department\nFROM employees A\nINNER JOIN employees B ON A.department = B.department AND A.id < B.id;\n```\n\n`A` and `B` are aliases for the same table. `A.id < B.id` prevents duplicate pairs (Alice-Bob and Bob-Alice).\n\n**Real use:** Find employees who earn more than the average in their department, or find pairs of employees in the same department.\n\nTry it in the Playground!\n\n:::checkpoint\nWhat is a self join?\nA) Joining a table to another copy of itself\nB) Joining a table to itself without a condition\nC) A join that automatically creates indexes\nD) A join with no matching condition\nCorrect: A",
        quiz: [
          {
            question: "What is a self join?",
            options: [
              "Joining a table to itself",
              "Automatic indexing",
              "Join without condition",
              "Join with itself",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: [
              "WHERE filters rows, HAVING filters groups",
              "WHERE filters groups, HAVING filters rows",
              "Same thing",
              "HAVING comes before WHERE",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you find duplicate records in a table?",
            options: [
              "SELECT * GROUP BY duplicates",
              "SELECT column, COUNT(*) GROUP BY column HAVING COUNT(*) > 1",
              "WHERE duplicate = true",
              "FIND DUPLICATES",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why do you use table aliases in a self join?",
            options: [
              "To rename the table permanently",
              "To distinguish the two copies of the same table",
              "To make the query faster",
              "To avoid using JOIN",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does A.id < B.id do in a self join?",
            options: [
              "Filters employees by id",
              "Prevents duplicate pairs (Alice-Bob and Bob-Alice)",
              "Sorts results by id",
              "Creates a new id column",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w8-d2",
        title: "Day 2: UNION & UNION ALL",
        description: "Stack query results vertically",
        type: "practice",
        duration: "45-60 mins",
        content:
          "`UNION` stacks results from two queries vertically (row-wise). Both queries must have the same number of columns.\n\n**List all names from both employees and departments:**\n```sql\nSELECT name FROM employees\nUNION\nSELECT name FROM departments;\n```\n\n`UNION ALL` keeps duplicates. `UNION` removes them.\n\n```sql\nSELECT department FROM employees\nUNION ALL\nSELECT name FROM departments;\n```\n\nTry both in the Playground. Notice the difference between UNION and UNION ALL.\n\n:::checkpoint\nWhat's the difference between UNION and UNION ALL?\nA) UNION removes duplicates, UNION ALL keeps them\nB) UNION is faster\nC) UNION ALL removes duplicates\nD) They're the same\nCorrect: A",
        quiz: [
          {
            question: "UNION vs UNION ALL difference?",
            options: [
              "UNION removes duplicates",
              "UNION is faster",
              "UNION ALL removes dupes",
              "Same",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What must be true about two queries used with UNION?",
            options: [
              "They must query the same table",
              "They must have the same number of columns",
              "They must have the same WHERE clause",
              "They must be sorted",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which operator would you use to combine employee names with department names into one list?",
            options: ["JOIN", "UNION", "GROUP BY", "HAVING"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between UNION and JOIN?",
            options: [
              "UNION stacks rows vertically; JOIN combines columns horizontally",
              "They are the same thing",
              "UNION combines columns; JOIN stacks rows",
              "UNION is only for text",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "If two queries both return 'Alice' and you use UNION ALL, how many times does Alice appear?",
            options: [
              "Once (duplicates removed)",
              "Twice (all rows kept)",
              "An error",
              "Zero times",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w8-d3",
        title: "Day 3: String Functions",
        description: "Manipulate text with SQL functions",
        type: "learn",
        duration: "45-60 mins",
        content:
          "SQL text functions work similarly to Excel:\n\n```sql\nSELECT UPPER(name) FROM employees;  -- uppercase\nSELECT LOWER(department) FROM employees;  -- lowercase\nSELECT SUBSTR(name, 1, 3) FROM employees;  -- first 3 chars\nSELECT LENGTH(name) FROM employees;  -- character count\n```\n\n**Combine columns:**\n```sql\nSELECT name || ' - ' || department AS employee_dept FROM employees;\n```\n`||` is the concatenation operator (some databases use CONCAT()).\n\nTry these in the Playground. Create a formatted list like 'Alice works in Engineering'.\n\n:::checkpoint\nWhat does || do in SQL?\nA) Logical OR\nB) Concatenates strings\nC) Adds numbers\nD) Creates a new column\nCorrect: B",
        quiz: [
          {
            question: "What does || do?",
            options: [
              "Logical OR",
              "Concatenates strings",
              "Adds numbers",
              "Creates column",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does UPPER(name) do?",
            options: [
              "Converts to lowercase",
              "Converts to uppercase",
              "Counts characters",
              "Extracts part of text",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does LENGTH('Hello') return?",
            options: ["4", "5", "6", "Error"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does name || ' - ' || department do?",
            options: [
              "Adds name and department numbers",
              "Concatenates name, dash, and department into one string",
              "Compares name to department",
              "Creates a new column",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does SUBSTR('Hello World', 7, 5) return?",
            options: ["Hello", "World", "lo Wo", "ello "],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w8-d4",
        title: "Day 4: Month 2 Review",
        description: "Review key SQL concepts from month 2",
        type: "review",
        duration: "45-60 mins",
        content:
          "`CASE` is like IF in Excel  it creates new columns based on conditions:\n\n```sql\nSELECT name, salary,\n  CASE\n    WHEN salary > 90000 THEN 'High'\n    WHEN salary > 60000 THEN 'Medium'\n    ELSE 'Low'\n  END AS salary_level\nFROM employees;\n```\n\n**CASE with GROUP BY  count how many employees in each salary level:**\n```sql\nSELECT\n  CASE\n    WHEN salary > 90000 THEN 'High'\n    WHEN salary > 60000 THEN 'Medium'\n    ELSE 'Low'\n  END AS salary_level,\n  COUNT(*) AS count\nFROM employees\nGROUP BY salary_level;\n```\n\n**COALESCE  handle NULL values with a default:**\n\n`COALESCE` returns the first non-NULL value from a list. It's perfect for replacing NULLs with a meaningful default:\n\n```sql\nSELECT name, COALESCE(department, 'Unassigned') AS department\nFROM employees;\n```\n\nIf department is NULL, it shows 'Unassigned'. You can chain multiple values:\n\n```sql\nSELECT COALESCE(middle_name, nickname, 'No name') FROM users;\n```\n\nCOALESCE is used constantly in real-world SQL  reports, dashboards, and export files should never show NULL to end users.\n\nTry creating your own CASE expressions. Flag orders as 'Small' (< 100), 'Medium' (100-500), or 'Large' (> 500).\n\n:::checkpoint\nWhat does CASE do in SQL?\nA) Creates a new table\nB) Returns different values based on conditions\nC) Joins tables conditionally\nD) Orders results randomly\nCorrect: B",
        quiz: [
          {
            question: "What does CASE do?",
            options: [
              "Creates table",
              "Returns values based on conditions",
              "Conditional join",
              "Random sort",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you label salaries as 'High', 'Medium', 'Low'?",
            options: [
              "Use IF-THEN",
              "Use CASE with WHEN conditions",
              "Use WHERE with labels",
              "Use GROUP BY with labels",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What comes after WHEN in a CASE expression?",
            options: [
              "A condition that evaluates to true/false",
              "A column name",
              "A table name",
              "A join condition",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does ELSE do in a CASE expression?",
            options: [
              "Specifies the default value if no condition matches",
              "Adds another condition",
              "Ends the CASE block",
              "Creates an error",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does COALESCE(department, 'Unassigned') do?",
            options: [
              "Returns 'Unassigned' if department is NULL, otherwise department value",
              "Replaces all text with 'Unassigned'",
              "Deletes rows with NULL department",
              "Creates a new column named Unassigned",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w8-d5",
        title: "Day 5: Month 2 Capstone: SQL Sales Analysis",
        description: "Combine all SQL skills in a capstone project",
        type: "project",
        duration: "2-3 hrs",
        content:
          "Your Month 2 Capstone: analyze the sample data using everything you've learned about SQL.\n\n**Deliverable:** Write SQL queries to answer these questions:\n\n1. Total revenue (sum of all order amounts)\n2. Average salary by department, sorted highest to lowest\n3. Top 2 highest-paid employees\n4. Customers with 2+ orders\n5. Each employee's name alongside their department budget\n6. Categorize salaries into levels (High / Mid / Low)\n7. Count employees per salary level\n8. **Bonus:** Pivot monthly sales by product category using CASE inside SUM\n\n**Hints:**\n- #2: GROUP BY with AVG and ORDER BY DESC\n- #3: ORDER BY with LIMIT\n- #4: GROUP BY with HAVING COUNT(*) >= 2\n- #5: JOIN employees with departments\n- #6: CASE WHEN salary > threshold THEN 'High' WHEN salary > threshold THEN 'Mid' ELSE 'Low' END\n- #8: SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) pattern\n\nRun each query in the Playground. Copy your queries somewhere safe.\n\n:::checkpoint\nFor #5 (employees with department budget), which join type?\nA) INNER JOIN  only employees whose department exists in departments table\nB) LEFT JOIN  all employees, with budget if available\nC) RIGHT JOIN  all departments\nD) Either A or B, depending on whether you want all employees or only matched ones\nCorrect: D",
        quiz: [
          {
            question: "For employee + department budget query, which join?",
            options: [
              "INNER",
              "LEFT",
              "RIGHT",
              "Either INNER or LEFT depending on needs",
            ],
            correctAnswerIndex: 3,
          },
          {
            question: "What does a LEFT JOIN return?",
            options: [
              "Only matching rows",
              "All rows from left table and matching from right",
              "All rows from both tables",
              "Only non-matching rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you label salary values using conditions?",
            options: [
              "Use IF",
              "Use CASE with WHEN/THEN/ELSE",
              "Use WHERE",
              "Use GROUP BY",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What skill is needed for query #4 (count per salary level)?",
            options: [
              "CASE + GROUP BY",
              "JOIN + WHERE",
              "ORDER BY + LIMIT",
              "UNION + subquery",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does INNER JOIN do?",
            options: [
              "Combines results of two queries removing duplicates",
              "Returns only rows with matching keys in both tables",
              "All rows from left table and matching from right",
              "All rows from both tables",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "SUM/AVG aggregations",
          "GROUP BY + HAVING",
          "INNER JOIN",
          "CASE statement",
          "ORDER BY",
        ],
      },
    ],
  },
  {
    id: "week9",
    title: "Week 11: Subqueries (Month 3)",
    durationText: "WEEK 11",
    focus: "Advanced SQL, Window Functions",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w9-d1",
        title: "Day 1: Intro to Subqueries",
        description: "Learn what subqueries are and how to use them in SELECT",
        type: "learn",
        duration: "45-60 mins",
        content:
          "A **subquery** is a query inside another query  a question inside a question. SQL runs the inner query first, gets the answer, then passes it to the outer query.\n\nImagine you're the HR manager. Your CEO walks in and says: *\"I want to see every employee's salary  and right next to it, show me how it compares to the company average.\"*\n\nYou could run two separate queries: one to get the average ($78,714) and another to list all employees. But that means manually copying a number  error-prone and slow.\n\nWith a subquery, you do it in one shot:\n\n```sql\nSELECT name, salary,\n  (SELECT AVG(salary) FROM employees) AS avg_salary\nFROM employees;\n```\n\nHere's what happens:\n1. SQL runs the inner query first: `(SELECT AVG(salary) FROM employees)` ? returns one number: 78714\n2. The outer query lists every employee, and for each row, plugs in that number as `avg_salary`\n3. You get a table where every row shows their salary AND the company average in one glance\n\n**Why this is powerful:**\n- Instead of running 5 queries and stitching results together in a spreadsheet, you write ONE query\n- Subqueries break complex problems into manageable pieces\n- They're like asking a question twice: *\"First, find the average. Then, show me everyone compared to it.\"*\n\nSubqueries can appear in SELECT, WHERE, or FROM  each with a different purpose. We'll explore all three this week.\n\n**One rule:** Subqueries run first (innermost first). The outer query waits for their result.\n\n:::checkpoint\nWhat is a subquery?\nA) A query that runs after the main query\nB) A nested query inside another query (a question inside a question)\nC) A query that deletes data\nD) A type of join\nCorrect: B",
        quiz: [
          {
            question: "What is a subquery?",
            options: [
              "A query after the main query",
              "A nested query inside another query",
              "A query that deletes data",
              "A type of join",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Where can subqueries appear?",
            options: [
              "Only in SELECT",
              "Only in WHERE",
              "Only in FROM",
              "In SELECT, WHERE, or FROM",
            ],
            correctAnswerIndex: 3,
          },
          {
            question: "Which runs first: the subquery or the outer query?",
            options: [
              "The outer query",
              "The subquery (inner query)",
              "They run simultaneously",
              "It depends on the query",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does (SELECT AVG(salary) FROM employees) return?",
            options: [
              "A list of all salaries",
              "A single number: the average salary",
              "A list of employee names",
              "An error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Why use a subquery instead of manually running two queries?",
            options: [
              "Subqueries are slower",
              "Avoid manually copying results between queries",
              "Subqueries delete unused data",
              "Subqueries don't need a database",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w9-d2",
        title: "Day 2: Subqueries in WHERE",
        description: "Use subqueries to filter rows based on calculations",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Yesterday you learned that subqueries let you ask a question inside a question. Today you'll use them in `WHERE`  the most practical place for them.\n\nBack when I was a junior analyst, my manager asked me a question I couldn't answer with a simple query: *\"Which employees earn more than the company average?\"*\n\nI froze. I knew how to find the average: `SELECT AVG(salary) FROM employees`. And I knew how to filter: `WHERE salary > X`. But I didn't know X until I ran the first query. A subquery solves this perfectly:\n\n```sql\nSELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n```\n\nHere's the execution order:\n1. **Inner query first:** `(SELECT AVG(salary) FROM employees)` ? returns 78,714\n2. **Outer query uses that result:** `WHERE salary > 78714` ? filters the 7 rows down to 3\n\nYou never see the intermediate number. SQL handles it internally.\n\n**Using IN with subqueries  when the inner query returns MULTIPLE values:**\n\nAnother real scenario: *\"Which employees work in departments that have a budget over $300,000?\"*\n\n```sql\nSELECT name FROM employees\nWHERE department IN (\n  SELECT name FROM departments WHERE budget > 300000\n);\n```\n\nThe subquery returns a list: `['Engineering', 'Sales']`. The outer query then checks: is this employee's department IN that list?\n\nThis is like asking: *\"First, find me the well-funded departments. Then, give me everyone who works in one of those.\"*\n\n**EXISTS  a more efficient alternative to IN:**\n\n`EXISTS` checks whether a subquery returns ANY rows. It's often faster than `IN` for large datasets:\n\n```sql\nSELECT name FROM employees e\nWHERE EXISTS (\n  SELECT 1 FROM departments d\n  WHERE d.name = e.department AND d.budget > 300000\n);\n```\n\nEXISTS stops scanning as soon as it finds the first match. Use it when:\n- The subquery could return many rows (EXISTS is faster)\n- You're checking for existence, not comparing values\n- The subquery references the outer query (correlated subquery)\n\n**Challenge:** Write a query that finds employees whose salary is above THEIR OWN department's average (not the company average). This needs something called a **correlated subquery**  one that references the outer query's values. Give it a try!\n\n:::checkpoint\nWhen does the subquery in WHERE execute?\nA) After the outer query\nB) At the same time\nC) Before the outer query (it runs first, then the outer query uses its result)\nD) Only when there's an index\nCorrect: C\n\n:::checkpoint\nWhat does IN do with a subquery?\nA) Checks if a value matches any value returned by the subquery\nB) Joins two tables\nC) Adds two numbers\nD) Creates a new column\nCorrect: A",
        quiz: [
          {
            question: "When does the subquery in WHERE execute?",
            options: [
              "After outer query",
              "Same time",
              "Before outer query",
              "Only with index",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What does IN do with a subquery?",
            options: [
              "Checks if value matches subquery result",
              "Joins tables",
              "Adds numbers",
              "Creates column",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does EXISTS check in a subquery?",
            options: [
              "Whether the subquery returns any rows at all",
              "Whether the subquery returns exactly one row",
              "Whether the subquery has no errors",
              "Whether the subquery returns NULL",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Why is EXISTS often faster than IN for large datasets?",
            options: [
              "EXISTS uses less memory",
              "EXISTS stops scanning as soon as it finds the first match",
              "EXISTS doesn't need a WHERE clause",
              "EXISTS is always the same speed as IN",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a subquery?",
            options: [
              "A query inside another query",
              "A partial query",
              "A stored procedure",
              "A database view",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w9-d3",
        title: "Day 3: Subqueries in FROM",
        description: "Use derived tables in FROM for multi-step analysis",
        type: "learn",
        duration: "45-60 mins",
        content:
          "A subquery in `FROM` acts like a temporary table  you compute some data first, then query the results as if they were a real table sitting in your database.\n\nThink back to Week 6 when you used `GROUP BY` + `HAVING`. You grouped employees by department, calculated the average salary, then filtered groups where the average exceeded a threshold. But what if you wanted to compare those department averages against the company average in the same query?\n\nThat's where a FROM subquery shines. You create a temporary summary table, then run another query on top of it:\n\n```sql\nSELECT dept_avg.department, dept_avg.avg_salary\nFROM (\n  SELECT department, AVG(salary) AS avg_salary\n  FROM employees GROUP BY department\n) AS dept_avg\nWHERE dept_avg.avg_salary > (SELECT AVG(salary) FROM employees);\n```\n\n**Step-by-step:**\n1. The inner query runs first: `SELECT department, AVG(salary)... GROUP BY department`\n2. This produces a temporary result (a derived table) with columns `department` and `avg_salary`  three rows, one per department\n3. You give it an alias `dept_avg` so the outer query can reference it\n4. The outer query selects from `dept_avg` and filters using WHERE\n\nThe subquery inside FROM creates an intermediate dataset that doesn't exist in your database  it exists only for the duration of your query. Think of it like a scratchpad: you do some math on a scrap of paper, then type the final answer into the report.\n\n**When to use this pattern instead of HAVING:**\n- When you need to build up a result in stages\n- When you need to reuse the same aggregated data in multiple conditions\n- When the filtering logic is complex and hard to express in HAVING\n\n:::checkpoint\nWhat does a subquery in FROM act as?\nA) A filter on columns\nB) A temporary table or derived table that exists only during the query\nC) A join condition\nD) An index\nCorrect: B",
        quiz: [
          {
            question: "What does a subquery in FROM act as?",
            options: [
              "A column filter",
              "A temporary/derived table",
              "A join condition",
              "An index",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: [
              "WHERE filters rows, HAVING filters groups",
              "WHERE filters groups, HAVING filters rows",
              "Same thing",
              "HAVING comes before WHERE",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does a LEFT JOIN return?",
            options: [
              "Only matching rows",
              "All rows from left table and matching from right",
              "All rows from both tables",
              "Only non-matching rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why do you give an alias to a subquery in FROM?",
            options: [
              "To make it run faster",
              "So the outer query can reference its columns",
              "To create a permanent table",
              "To sort the results",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "When should you use a FROM subquery instead of HAVING?",
            options: [
              "When you need to build up results in stages",
              "When you want faster queries",
              "When you only need simple filtering",
              "When you don't have GROUP BY",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w9-d4",
        title: "Day 4: CTEs",
        description: "Write readable queries using Common Table Expressions",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**CTE (Common Table Expression)**  a named subquery you define before the main query using `WITH`. It makes complex queries much more readable.\n\n```sql\nWITH dept_stats AS (\n  SELECT department, AVG(salary) AS avg_salary, COUNT(*) AS emp_count\n  FROM employees GROUP BY department\n)\nSELECT * FROM dept_stats WHERE emp_count > 2;\n```\n\nCTEs are like variables for SQL. You define them once, then reference them by name:\n\n**Multiple CTEs in one query:**\n```sql\nWITH\n  high_salary AS (SELECT * FROM employees WHERE salary > 80000),\n  dept_budgets AS (SELECT name, budget FROM departments)\nSELECT high_salary.name, dept_budgets.budget\nFROM high_salary\nLEFT JOIN dept_budgets ON high_salary.department = dept_budgets.name;\n```\n\nCTEs make SQL read like a story  define, then use. They're the preferred way to write complex queries.\n\n:::checkpoint\nWhat keyword starts a CTE?\nA) CTE\nB) WITH\nC) DEFINE\nD) LET\nCorrect: B\n\n:::checkpoint\nWhy use CTEs instead of subqueries in FROM?\nA) CTEs are faster\nB) CTEs are more readable, reusable, and can be referenced multiple times\nC) Subqueries don't work in FROM\nD) CTEs require less memory\nCorrect: B",
        quiz: [
          {
            question: "What keyword starts a CTE?",
            options: ["CTE", "WITH", "DEFINE", "LET"],
            correctAnswerIndex: 1,
          },
          {
            question: "Why use CTEs over subqueries in FROM?",
            options: [
              "Faster",
              "More readable and reusable",
              "Subqueries don't work in FROM",
              "Less memory",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Can you reference a CTE multiple times in the same query?",
            options: [
              "No, CTEs can only be used once",
              "Yes, you can reference a CTE by name anywhere in the main query",
              "Only in WHERE clauses",
              "Only in SELECT clauses",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does WITH do in a CTE?",
            options: [
              "Creates a temporary table",
              "Begins the CTE definition before the main query",
              "Joins two tables",
              "Filters rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you define multiple CTEs in one query?",
            options: [
              "WITH CTE1 AS (...), CTE2 AS (...)",
              "WITH CTE1 AS (...) WITH CTE2 AS (...)",
              "CTE1: (...), CTE2: (...)",
              "DEFINE CTE1 (...), CTE2 (...)",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w9-d5",
        title: "Day 5: Mini-Project: Complex CTEs",
        description: "Solve multi-step data problems with CTEs",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use CTEs to solve multi-step data problems:\n\n1. **Create a CTE** that calculates total orders per customer\n2. **Create another CTE** that ranks customers by total spent\n3. **Join them** to show customer name, total orders, and rank\n4. **Find top 3 customers** by total spend\n5. **Find departments** where average salary exceeds the overall average (using CTEs)\n\nWrite all queries using CTEs. No nested subqueries allowed  practice the CTE syntax until it's natural.\n\n:::checkpoint\nWhat's the best reason to use a CTE?\nA) It makes the query run faster\nB) It breaks a complex query into readable, named steps\nC) It uses less disk space\nD) It automatically creates indexes\nCorrect: B",
        quiz: [
          {
            question: "Best reason to use a CTE?",
            options: [
              "Makes query faster",
              "Breaks complex query into readable steps",
              "Uses less disk",
              "Auto-creates indexes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a subquery?",
            options: [
              "A query inside another query",
              "A partial query",
              "A stored procedure",
              "A database view",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you reference a CTE?",
            options: [
              "By calling it with CALL",
              "By using its name in the main query after the CTE definition",
              "By selecting from a special CTE table",
              "CTEs cannot be referenced",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Can you use multiple CTEs in one query?",
            options: [
              "No, only one CTE per query",
              "Yes, separate them with commas after WITH",
              "Yes, but only in subqueries",
              "No, CTEs cannot be combined",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What makes CTEs better than nested subqueries for complex queries?",
            options: [
              "CTEs are faster",
              "CTEs break complex logic into named steps that are easier to read and debug",
              "CTEs use less memory",
              "Nested subqueries don't support ORDER BY",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week10",
    title: "Week 12: Window Functions I (Month 3)",
    durationText: "WEEK 12",
    focus: "Advanced SQL, Window Functions",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w10-d1",
        title: "Day 1: Over & Partition By",
        description: "Understand window functions and how to partition data",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Window functions** are like GROUP BY's smarter sibling. GROUP BY collapses rows (one output per group). Window functions keep every row AND add a calculated value alongside it.\n\nPicture this: You're a district manager at a retail chain with 50 stores. You need to send each store a report showing:\n\n- Their sales this month\n- The average sales for their region\n- How they compare to the region average\n\nWithout window functions, you'd compute the averages separately, then manually join them back to the store data. With window functions, it's one query:\n\n```sql\nSELECT store_name, region, sales,\n  AVG(sales) OVER (PARTITION BY region) AS region_avg\nFROM store_sales;\n```\n\n`PARTITION BY region` creates a window for each region. `AVG(sales)` calculates the average within that window. And crucially  every store row survives, with the region average added as a new column.\n\n**Compare that to GROUP BY:**\n\n```sql\nSELECT region, AVG(sales) FROM store_sales GROUP BY region;\n```\n\nGROUP BY returns one row per region  you lose individual store data. Window functions give you BOTH the detail AND the summary in the same result.\n\n**The magic keyword is OVER()**  it defines the 'window' of rows the function operates on:\n\n```sql\nSELECT name, salary,\n  AVG(salary) OVER () AS overall_avg\nFROM employees;\n```\n\nWithout PARTITION BY, the window is the ENTIRE table. Every row shows the same overall average next to their individual salary. You can instantly see: *\"I make $85,000 and the company average is $78,714  I'm above average.\"*\n\nWindow functions unlock a whole new level of SQL power. They're essential for rankings, running totals, moving averages, and 'top N per group' queries.\n\n:::checkpoint\nWhat does OVER() do in SQL?\nA) Ends the query\nB) Defines the window of rows for the function\nC) Overwrites existing data\nD) Sorts results\nCorrect: B\n\n:::checkpoint\nWhat does PARTITION BY do inside OVER()?\nA) Splits data into groups for the window function (but keeps all rows)\nB) Sorts the rows\nC) Filters rows\nD) Creates a new table\nCorrect: A",
        quiz: [
          {
            question: "What does OVER() do?",
            options: [
              "Ends query",
              "Defines window of rows for function",
              "Overwrites data",
              "Sorts results",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does PARTITION BY do?",
            options: [
              "Splits data into groups",
              "Sorts rows",
              "Filters rows",
              "Creates table",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does GROUP BY do?",
            options: [
              "Sorts results",
              "Groups rows that have same values into summary rows",
              "Filters rows",
              "Orders by group",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a window function?",
            options: [
              "A function that operates on a set of rows related to the current row",
              "A function that creates a window",
              "A type of subquery",
              "A join type",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does a LEFT JOIN return?",
            options: [
              "Only matching rows",
              "All rows from left table and matching from right",
              "All rows from both tables",
              "Only non-matching rows",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w10-d2",
        title: "Day 2: Row_Number & Rank",
        description: "Assign row numbers and ranks within partitions",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**ROW_NUMBER()** assigns a unique number to each row within a partition, starting at 1.\n\n```sql\nSELECT name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank\nFROM employees;\n```\n\n**RANK()** gives the same number to ties, then skips numbers:\n```sql\nSELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS rank\nFROM employees;\n```\nIf two people earn 90,000, both get rank 1, and the next rank is 3.\n\n**Partitioned ranking  rank within each department:**\n```sql\nSELECT name, department, salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;\n```\n\nThis is incredibly useful for 'top N per group' queries.\n\n:::checkpoint\nWhat's the difference between ROW_NUMBER and RANK?\nA) They're identical\nB) RANK gives ties the same number and skips; ROW_NUMBER always gives unique numbers\nC) ROW_NUMBER skips numbers; RANK doesn't\nD) RANK only works with PARTITION BY\nCorrect: B",
        quiz: [
          {
            question: "ROW_NUMBER vs RANK difference?",
            options: [
              "Same",
              "RANK gives ties same number and skips; ROW_NUMBER always unique",
              "ROW_NUMBER skips",
              "RANK only with PARTITION BY",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does GROUP BY do?",
            options: [
              "Sorts results",
              "Groups rows that have same values into summary rows",
              "Filters rows",
              "Orders by group",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does PARTITION BY do in a window function?",
            options: [
              "Splits data into groups before ranking within each group",
              "Splits data into separate tables",
              "Orders the entire result set",
              "Filters rows before ranking",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does OVER do in a window function?",
            options: [
              "Ends the query",
              "Defines the window of rows the function operates on",
              "Overrides the default sort order",
              "Creates a new table",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w10-d3",
        title: "Day 3: Dense_Rank & Ntile",
        description: "Use dense ranking and bucketing functions",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**DENSE_RANK()** is like RANK but without gaps  ties get the same number, but the next number isn't skipped.\n\n```sql\nSELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS rank,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank\nFROM employees;\n```\nIf salaries are 100k, 90k, 90k, 80k: RANK gives 1, 2, 2, 4; DENSE_RANK gives 1, 2, 2, 3.\n\n**NTILE(N)** splits rows into N roughly equal buckets:\n```sql\nSELECT name, salary,\n  NTILE(4) OVER (ORDER BY salary DESC) AS quartile\nFROM employees;\n```\n\nUse NTILE to segment data  quartiles, deciles, or any equal-sized groups. Great for customer segmentation or performance bands.\n\nPractice all three on the sample data. Try NTILE(3) to create high/medium/low groups.\n\n:::checkpoint\nWhat does NTILE(4) do?\nA) Splits rows into 4 equal groups\nB) Returns 4 rows\nC) Shows the top 4 salaries\nD) Creates 4 new columns\nCorrect: A\n\n:::checkpoint\nHow does DENSE_RANK differ from RANK?\nA) DENSE_RANK is faster\nB) DENSE_RANK has no gaps after ties\nC) DENSE_RANK only works with integers\nD) They're the same\nCorrect: B",
        quiz: [
          {
            question: "What does NTILE(4) do?",
            options: [
              "4 equal groups",
              "4 rows",
              "Top 4 salaries",
              "4 new columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "DENSE_RANK vs RANK difference?",
            options: [
              "DENSE_RANK faster",
              "DENSE_RANK has no gaps after ties",
              "DENSE_RANK only with ints",
              "Same",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "If salaries are 100k, 90k, 90k, 80k, what does RANK give for the third employee (90k)?",
            options: ["2", "3", "4", "Error"],
            correctAnswerIndex: 0,
          },
          {
            question:
              "If salaries are 100k, 90k, 90k, 80k, what does DENSE_RANK give for the third employee (90k)?",
            options: ["1", "2", "3", "4"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does NTILE(3) do to a table with 9 rows?",
            options: [
              "Returns 3 rows",
              "Splits rows into 3 groups of 3 rows each",
              "Shows top 3 salaries",
              "Creates 3 new columns",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w10-d4",
        title: "Day 4: Lead & Lag",
        description: "Access previous and next row values for comparisons",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**LAG()** peeks at the previous row's value. **LEAD()** peeks at the next row's value.\n\n**Compare each employee's salary to the previous employee (by salary order):**\n```sql\nSELECT name, salary,\n  LAG(salary, 1) OVER (ORDER BY salary) AS prev_salary,\n  salary - LAG(salary, 1) OVER (ORDER BY salary) AS diff_from_prev\nFROM employees;\n```\n\nThe second argument (1) says 'look 1 row back'. The default is 1 if omitted.\n\n**Find the next higher salary:**\n```sql\nSELECT name, salary,\n  LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary\nFROM employees;\n```\n\nLAG and LEAD are essential for time series  compare today's value to yesterday's, calculate day-over-day change, etc.\n\n## Month-over-Month Growth with LAG\n\nA classic business question: \"How much did revenue grow this month compared to last month?\"\n\n```sql\nSELECT\n  month,\n  revenue,\n  LAG(revenue, 1) OVER (ORDER BY month) AS prev_month_revenue,\n  ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY month)) \n    / LAG(revenue, 1) OVER (ORDER BY month) * 100, 2) AS mom_growth_pct\nFROM monthly_revenue\nORDER BY month;\n```\n\nThis uses LAG to fetch the previous month's revenue, then calculates the percentage change. The first row will show NULL for prev_month_revenue (no previous month to compare).\n\n**Common variations:**\n- Day-over-day: LAG(value) OVER (ORDER BY date)\n- Year-over-year: LAG(value, 12) OVER (ORDER BY year_month)\n- With PARTITION BY: LAG(value) OVER (PARTITION BY product ORDER BY month)\n\n:::checkpoint\nWhat does LAG(salary, 1) OVER (ORDER BY salary) do?\nA) Returns the next row's salary\nB) Returns the previous row's salary\nC) Returns the average salary\nD) Returns the highest salary\nCorrect: B",
        quiz: [
          {
            question: "What does LAG(salary, 1) do?",
            options: [
              "Next row salary",
              "Previous row salary",
              "Average salary",
              "Highest salary",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does LEAD(salary, 1) OVER (ORDER BY salary) do?",
            options: [
              "Returns the previous row's salary",
              "Returns the next row's salary",
              "Returns the first salary",
              "Returns the last salary",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "When would you use LAG and LEAD?",
            options: [
              "To filter rows by value",
              "To compare a row's value with the previous or next row",
              "To group rows together",
              "To sort results",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What does LAG(salary) OVER (ORDER BY date) do in a time series?",
            options: [
              "Compares today's salary to yesterday's",
              "Shows the highest salary ever",
              "Averages all salaries",
              "Shows only future salaries",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a window function?",
            options: [
              "A function that operates on a set of rows related to the current row",
              "A function that creates a window",
              "A type of subquery",
              "A join type",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w10-d5",
        title: "Day 5: Mini-Project: Ranking Data",
        description: "Use window functions to rank and compare data",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use window functions to rank and compare data within departments.\n\n**Requirements:**\n- Rank employees by salary within each department\n- Find top 2 earners in each department\n- Divide employees into 3 salary tiers\n- Show each employee's salary alongside the previous employee's salary\n- Calculate the difference between each salary and the department average\n\n**Hints:**\n- RANK() OVER (PARTITION BY department ORDER BY salary DESC) for ranking\n- ROW_NUMBER() with a CTE to filter top N per group\n- NTILE(3) divides into 3 tiers\n- LAG(salary) OVER (ORDER BY salary) shows previous salary\n- AVG(salary) OVER (PARTITION BY department) for dept average\n\n:::checkpoint\nTo find the top 2 earners per department, the best approach is:\nA) ORDER BY salary DESC LIMIT 2\nB) ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) in a CTE, then filter WHERE rank <= 2\nC) GROUP BY department\nD) MAX(salary) with GROUP BY\nCorrect: B",
        quiz: [
          {
            question: "Best way to find top 2 per department?",
            options: [
              "ORDER BY LIMIT 2",
              "ROW_NUMBER in CTE then filter rank <= 2",
              "GROUP BY",
              "MAX with GROUP BY",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a CTE?",
            options: [
              "A Common Table Expression, a temporary named result set",
              "A category of joins",
              "A column type",
              "A constraint",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does NTILE(3) do in a window function?",
            options: [
              "Splits rows into 3 equal groups",
              "Returns 3 rows",
              "Shows top 3 salaries",
              "Creates 3 new columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does LAG(salary) OVER (ORDER BY id) do?",
            options: [
              "Returns the next employee's salary",
              "Returns the previous employee's salary",
              "Returns the average salary",
              "Returns the maximum salary",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What do OVER and PARTITION BY do together?",
            options: [
              "Create a new table",
              "Define a window of rows to operate on, optionally grouped by partitions",
              "Filter rows before the window function runs",
              "Sort the results after the query",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week11",
    title: "Week 13: Window Functions II (Month 3)",
    durationText: "WEEK 13",
    focus: "Advanced SQL, Window Functions",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w11-d1",
        title: "Day 1: Running Totals",
        description: "Calculate cumulative sums with window functions",
        type: "learn",
        duration: "45-60 mins",
        content:
          "A **running total** adds up values sequentially. Each row shows the sum of all previous rows plus the current row.\n\n```sql\nSELECT order_date, amount,\n  SUM(amount) OVER (ORDER BY order_date) AS running_total\nFROM orders;\n```\n\nThe ORDER BY inside OVER() defines the sequence. SUM accumulates as it goes down the ordered rows.\n\n**Running total per customer:**\n```sql\nSELECT customer, order_date, amount,\n  SUM(amount) OVER (PARTITION BY customer ORDER BY order_date) AS customer_running_total\nFROM orders;\n```\n\nRunning totals answer questions like 'How much revenue have we made so far this year?' or 'What's our cumulative sales by month?'\n\n:::checkpoint\nWhat does SUM(amount) OVER (ORDER BY date) do?\nA) Sums all amounts\nB) Computes a running total as rows progress by date\nC) Groups amounts by date\nD) Returns the maximum amount\nCorrect: B",
        quiz: [
          {
            question: "What does SUM OVER (ORDER BY date) do?",
            options: [
              "Sum all amounts",
              "Running total by date",
              "Group amounts by date",
              "Max amount",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What keyword inside OVER() defines the order of accumulation?",
            options: ["PARTITION BY", "ORDER BY", "GROUP BY", "HAVING"],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you compute a running total per customer?",
            options: [
              "SUM(amount) OVER (ORDER BY customer)",
              "SUM(amount) OVER (PARTITION BY customer ORDER BY date)",
              "GROUP BY customer",
              "HAVING SUM(amount)",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does the first row of a running total show?",
            options: [
              "Zero",
              "The amount of just that first row",
              "The sum of all rows",
              "The average amount",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What question does a running total answer?",
            options: [
              "What is the average value?",
              "How much have we accumulated so far up to each point?",
              "What is the maximum value?",
              "How many rows are in the table?",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w11-d2",
        title: "Day 2: Moving Averages",
        description: "Smooth fluctuations with moving average calculations",
        type: "practice",
        duration: "45-60 mins",
        content:
          "A **moving average** smooths out fluctuations by averaging a fixed number of previous rows.\n\n**3-order moving average of amount:**\n```sql\nSELECT order_date, amount,\n  AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3\nFROM orders;\n```\n\n`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` defines a frame  the 2 previous rows plus the current row (3 total).\n\n**Frame options:**\n- `ROWS BETWEEN 1 PRECEDING AND CURRENT ROW`  2-row moving average\n- `ROWS BETWEEN 5 PRECEDING AND CURRENT ROW`  6-row moving average\n- `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`  running total (all rows)\n\nMoving averages are essential for trend analysis  they remove daily noise and show the underlying direction.\n\n:::checkpoint\nWhat does ROWS BETWEEN 3 PRECEDING AND CURRENT ROW do?\nA) Looks at 3 rows total\nB) Looks at 4 rows (3 previous + current)\nC) Looks at all rows\nD) Looks at 3 rows after the current row\nCorrect: B",
        quiz: [
          {
            question:
              "ROWS BETWEEN 3 PRECEDING AND CURRENT ROW = how many rows?",
            options: ["3", "4", "All", "After current"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What does AVG(amount) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) compute?",
            options: [
              "The average of all amounts",
              "A 3-row moving average centered on each row",
              "A running total of amounts",
              "The maximum amount in each window",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "For a 5-row moving average, what frame clause do you use?",
            options: [
              "ROWS BETWEEN 5 PRECEDING AND CURRENT ROW",
              "ROWS BETWEEN 4 PRECEDING AND CURRENT ROW",
              "ROWS BETWEEN 1 PRECEDING AND 5 FOLLOWING",
              "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why use a moving average instead of a plain average?",
            options: [
              "Moving averages are faster to compute",
              "Moving averages smooth out fluctuations to show trends",
              "Moving averages use less memory",
              "Moving averages are the only type allowed in SQL",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What does ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW do?",
            options: [
              "Act as a running total (sum of all rows from start to current)",
              "Act as a moving average of all rows",
              "Returns only the first row",
              "Returns an error",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w11-d3",
        title: "Day 3: Percentiles",
        description: "Calculate percent rank and cumulative distribution",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**PERCENT_RANK()** gives the relative rank of each row as a value between 0 and 1:\n```sql\nSELECT name, salary,\n  PERCENT_RANK() OVER (ORDER BY salary) AS percentile\nFROM employees;\n```\n\n**CUME_DIST()** (cumulative distribution) gives the proportion of rows with values <= the current row:\n```sql\nSELECT name, salary,\n  CUME_DIST() OVER (ORDER BY salary) AS cum_dist\nFROM employees;\n```\n\n**PERCENTILE_CONT and PERCENTILE_DISC** are aggregate window functions that find the value at a given percentile (conceptual in this environment):\n\nThese are useful for benchmarking  'what salary is at the 90th percentile?' or 'what order amount is in the top 10%?'\n\n:::checkpoint\nWhat does PERCENT_RANK() return?\nA) The rank as a percentage of total rows (0 to 1)\nB) The rank as an integer\nC) The percentile of a specific value\nD) The cumulative sum\nCorrect: A",
        quiz: [
          {
            question: "What does PERCENT_RANK() return?",
            options: [
              "Rank as % of total (0-1)",
              "Integer rank",
              "Value percentile",
              "Cumulative sum",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does CUME_DIST() OVER (ORDER BY salary) show?",
            options: [
              "The percentage of rows with salary <= the current row",
              "The rank of each employee",
              "The sum of all salaries up to the current row",
              "The average salary",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "If an employee is at PERCENT_RANK = 0.9, what does that mean?",
            options: [
              "They earn 90% of the highest salary",
              "They earn more than 90% of employees",
              "They earn 90% less than average",
              "They are in the bottom 10%",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does PERCENT_RANK return for the lowest salary?",
            options: ["0", "0.5", "1", "A negative number"],
            correctAnswerIndex: 0,
          },
          {
            question: "What real-world question does PERCENT_RANK help answer?",
            options: [
              "What is the total revenue?",
              "How does each employee's salary rank compared to others?",
              "Which department has the most employees?",
              "What is the average order amount?",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w11-d4",
        title: "Day 4: Performance Tuning",
        description: "Optimize window function queries for speed",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Window functions can be slow on large datasets. Here's how to keep them fast:\n\n**1. Index the columns used in PARTITION BY and ORDER BY**\n- Indexes help the database sort and partition quickly\n\n**2. Avoid unnecessary ROWS frames**\n- The default frame (RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) is fine for most cases\n- Explicit frames with large ranges can be expensive\n\n**3. Use CTEs to filter first, then apply window functions**\n```sql\nWITH filtered AS (SELECT * FROM orders WHERE amount > 0)\nSELECT *, ROW_NUMBER() OVER (ORDER BY amount DESC) FROM filtered;\n```\n\n**4. Pre-aggregate before windowing when possible**\n\nPerformance tuning is a real-world skill  you'll often need to make queries run in seconds instead of minutes.\n\n:::checkpoint\nWhat helps window functions run faster?\nA) Using more subqueries\nB) Indexing columns used in PARTITION BY and ORDER BY\nC) Adding more columns to SELECT\nD) Removing indexes\nCorrect: B",
        quiz: [
          {
            question: "What helps window functions run faster?",
            options: [
              "More subqueries",
              "Index PARTITION BY/ORDER BY columns",
              "More columns",
              "Remove indexes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Why should you filter data BEFORE applying window functions?",
            options: [
              "It reduces the number of rows the window function processes",
              "Window functions require filtered data",
              "It changes the window frame",
              "It makes the results more accurate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the default frame for a window function?",
            options: [
              "ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING",
              "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
              "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
              "No default frame",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How can CTEs help with window function performance?",
            options: [
              "CTEs are always faster than subqueries",
              "Filter data first in a CTE, then apply window functions on the reduced set",
              "CTEs cache results permanently",
              "CTEs eliminate the need for indexes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What indexing strategy helps window functions?",
            options: [
              "Index every column in the table",
              "Index columns used in PARTITION BY and ORDER BY",
              "Remove all indexes",
              "Use only composite indexes",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w11-d5",
        title: "Day 5: Mini-Project: Rolling Metrics",
        description: "Calculate running totals and moving averages",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use window functions to calculate rolling metrics:\n\n1. **Running total** of orders by date\n2. **3-order moving average** of order amounts\n3. **Rank orders** by amount within each month\n4. **Running total per customer**  how much has each customer spent cumulatively?\n5. **Percent rank** of salaries\n\nWrite each query. For the running total and moving average, use the frame clause explicitly.\n\n:::checkpoint\nTo compute a running total per customer, you need:\nA) SUM(amount) OVER (ORDER BY date)\nB) SUM(amount) OVER (PARTITION BY customer ORDER BY date)\nC) SUM(amount) GROUP BY customer\nD) ROW_NUMBER() OVER (PARTITION BY customer)\nCorrect: B",
        quiz: [
          {
            question: "Running total per customer needs?",
            options: [
              "SUM OVER (ORDER BY date)",
              "SUM OVER (PARTITION BY customer ORDER BY date)",
              "SUM GROUP BY customer",
              "ROW_NUMBER",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "To rank orders by amount within each month, you use:",
            options: [
              "RANK() OVER (ORDER BY amount)",
              "RANK() OVER (PARTITION BY month ORDER BY amount DESC)",
              "ROW_NUMBER() OVER (ORDER BY month)",
              "SUM() OVER (PARTITION BY amount)",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "A 3-order moving average uses what frame clause?",
            options: [
              "ROWS BETWEEN 3 PRECEDING AND CURRENT ROW",
              "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
              "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
              "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the output of SUM(amount) OVER (ORDER BY date) on row 3?",
            options: [
              "The amount of row 3 only",
              "The sum of amounts from rows 1, 2, and 3",
              "The sum of all amounts in the table",
              "The average amount up to row 3",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which window function gives each row a unique sequential number?",
            options: ["SUM()", "ROW_NUMBER()", "AVG()", "RANK()"],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week12",
    title: "Week 14: Database Design (Month 3)",
    durationText: "WEEK 14",
    focus: "Advanced SQL, Window Functions",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w12-d1",
        title: "Day 1: Normalization Basics",
        description: "Learn 1NF, 2NF, 3NF and why they matter",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Normalization** is the process of organizing data to reduce redundancy. The goal: each piece of data lives in exactly one place.\n\n**First Normal Form (1NF):** Each column has atomic (indivisible) values. No lists or arrays in a single cell.\n- Bad: 'Apples, Bananas' in one cell\n- Good: separate rows for Apple and Banana\n\n**Second Normal Form (2NF):** 1NF + every non-key column depends on the whole primary key (relevant for composite keys).\n\n**Third Normal Form (3NF):** 2NF + no transitive dependencies. A non-key column shouldn't depend on another non-key column.\n- Bad: employees table with department_name AND department_location (location depends on department, not employee)\n- Good: separate departments table\n\nIn practice, most databases aim for 3NF. Sometimes you denormalize for performance (read speed over write efficiency).\n\n## Surrogate Keys\n\nA **surrogate key** is an artificial primary key (usually an auto-incrementing integer or UUID) with no business meaning. It exists purely to uniquely identify each row.\n\n**Surrogate vs natural key:**\n- **Natural key**: a real-world identifier (SSN, email, product code). Problem: they can change or be reused.\n- **Surrogate key**: an arbitrary unique ID (customer_id INT AUTO_INCREMENT). Never changes.\n\n```sql\nCREATE TABLE customers (\n    customer_id INT PRIMARY KEY AUTO_INCREMENT,  -- surrogate\n    email VARCHAR(255) UNIQUE,                    -- natural, but can change\n    name VARCHAR(100)\n);\n```\n\n**Best practice:** Always use surrogate keys as your primary key. Keep natural keys as unique constraints if needed. This protects your database from changes in the real world.\n\n:::checkpoint\nWhat problem does normalization solve?\nA) Slow queries\nB) Data redundancy and update anomalies\nC) Missing indexes\nD) Large file size\nCorrect: B\n\n:::checkpoint\nWhat's a sign of denormalized data?\nA) Every table has a primary key\nB) The same department name is repeated across many employee rows\nC) All tables use foreign keys\nD) Data types are consistent\nCorrect: B",
        quiz: [
          {
            question: "What problem does normalization solve?",
            options: [
              "Slow queries",
              "Data redundancy and update anomalies",
              "Missing indexes",
              "Large file size",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Sign of denormalized data?",
            options: [
              "Primary key exists",
              "Same department repeated across rows",
              "Foreign keys used",
              "Consistent types",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: [
              "WHERE filters rows, HAVING filters groups",
              "WHERE filters groups, HAVING filters rows",
              "Same thing",
              "HAVING comes before WHERE",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a window function?",
            options: [
              "A function that operates on a set of rows related to the current row",
              "A function that creates a window",
              "A type of subquery",
              "A join type",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does UNION do?",
            options: [
              "Combines results of two queries removing duplicates",
              "Combines results keeping all rows",
              "Intersects two queries",
              "Subtracts queries",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w12-d2",
        title: "Day 2: Creating Tables (DDL)",
        description: "Write CREATE TABLE statements with constraints",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**DDL (Data Definition Language)**  commands that define the structure of your database.\n\n**CREATE TABLE  define a new table:**\n```sql\nCREATE TABLE projects (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  budget REAL,\n  start_date TEXT\n);\n```\n\n**Data types in SQLite (what the Playground uses):**\n- `INTEGER`  whole numbers\n- `REAL`  decimal numbers\n- `TEXT`  strings\n- `BLOB`  binary data\n\n**Constraints:**\n- `PRIMARY KEY`  unique identifier\n- `NOT NULL`  column must have a value\n- `UNIQUE`  no duplicates allowed\n- `DEFAULT value`  default if not specified\n\nThink of DDL as the blueprint. Get the blueprint right before adding data.\n\n:::checkpoint\nWhat does CREATE TABLE do?\nA) Adds data to a table\nB) Defines a new table structure\nC) Deletes a table\nD) Modifies existing data\nCorrect: B",
        quiz: [
          {
            question: "What does CREATE TABLE do?",
            options: [
              "Adds data",
              "Defines new table structure",
              "Deletes table",
              "Modifies data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a window function?",
            options: [
              "A function that operates on a set of rows related to the current row",
              "A function that creates a window",
              "A type of subquery",
              "A join type",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does GROUP BY do?",
            options: [
              "Sorts results",
              "Groups rows that have same values into summary rows",
              "Filters rows",
              "Orders by group",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does UNION do?",
            options: [
              "Combines results of two queries removing duplicates",
              "Combines results keeping all rows",
              "Intersects two queries",
              "Subtracts queries",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w12-d3",
        title: "Day 3: Insert/Update/Delete (DML)",
        description: "Modify data with INSERT, UPDATE, DELETE",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**DML (Data Manipulation Language)**  commands that modify the data inside tables.\n\n**INSERT  add new rows:**\n```sql\nINSERT INTO employees (name, department, salary, hire_date)\nVALUES ('Kate Smith', 'Engineering', 85000, '2024-06-01');\n```\n\n**UPDATE  modify existing rows:**\n```sql\nUPDATE employees SET salary = 95000 WHERE name = 'Alice Johnson';\n```\nAlways use WHERE with UPDATE unless you want to change every row!\n\n**DELETE  remove rows:**\n```sql\nDELETE FROM employees WHERE name = 'Kate Smith';\n```\n\n**Key rule:** Always test your WHERE condition with SELECT first before running UPDATE or DELETE:\n```sql\nSELECT * FROM employees WHERE name = 'Kate Smith';  -- confirm the rows\nDELETE FROM employees WHERE name = 'Kate Smith';    -- now safe to delete\n```\n\n**TRUNCATE vs DELETE  quickly removing all rows:**\n\n```sql\nTRUNCATE TABLE employees;   -- removes ALL rows instantly, cannot be rolled back\nDELETE FROM employees;       -- removes ALL rows row-by-row, can be rolled back\n```\n\n- `TRUNCATE` is faster (DDL, minimal logging) but cannot use WHERE\n- `DELETE` is slower (DML, row-by-row) but supports WHERE and transactions\n- Use TRUNCATE when you want to clear an entire table (e.g., staging tables)\n- Use DELETE when you need to remove specific rows or need rollback ability\n\n**Transactions: COMMIT and ROLLBACK**\n\nA transaction groups multiple operations into a single unit. Either ALL succeed or ALL are undone.\n\n```sql\nBEGIN TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If both succeeded:\nCOMMIT;\n\n-- If something went wrong:\nROLLBACK;  -- undoes both updates, balances stay unchanged\n```\n\nTransactions are essential for money transfers, order processing, and any operation where partial changes would corrupt data.\n\n:::checkpoint\nWhat should you always do before UPDATE or DELETE?\nA) Create a backup of the whole database\nB) Test the WHERE condition with SELECT first\nC) Drop the table\nD) Add an index\nCorrect: B\n\n:::checkpoint\nWhat happens if you run UPDATE without WHERE?\nA) Nothing\nB) Updates all rows in the table\nC) Returns an error\nD) Updates only the first row\nCorrect: B\n\n:::checkpoint\nWhat's the difference between TRUNCATE and DELETE?\nA) TRUNCATE is faster and removes all rows without WHERE; DELETE can filter and be rolled back\nB) They are identical\nC) DELETE is faster\nD) TRUNCATE supports WHERE\nCorrect: A",
        quiz: [
          {
            question:
              "Which SQL pattern safely loads new rows from a staging table without creating duplicates?",
            options: [
              "Plain INSERT INTO ... SELECT (no check)",
              "INSERT WHERE NOT EXISTS or LEFT JOIN ... WHERE target IS NULL",
              "TRUNCATE the target first, then INSERT",
              "UPDATE the staging table first",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What to do before UPDATE or DELETE?",
            options: [
              "Backup entire DB",
              "Test WHERE with SELECT first",
              "Drop table",
              "Add index",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "UPDATE without WHERE does what?",
            options: ["Nothing", "Updates all rows", "Error", "First row only"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between TRUNCATE and DELETE?",
            options: [
              "TRUNCATE removes all rows instantly without rollback; DELETE can filter and be rolled back",
              "They are identical",
              "DELETE is faster than TRUNCATE",
              "TRUNCATE supports WHERE filtering",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does BEGIN TRANSACTION ... COMMIT do?",
            options: [
              "Runs a query and returns results immediately",
              "Groups operations so all succeed together or all are undone",
              "Deletes the table structure",
              "Creates a new database",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does ROLLBACK do in a transaction?",
            options: [
              "Saves all changes permanently",
              "Undoes all changes since BEGIN TRANSACTION",
              "Removes the table",
              "Closes the database connection",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w12-d4",
        title: "Day 4: Month 3 Review",
        description: "Review key database design concepts from month 3",
        type: "review",
        duration: "45-60 mins",
        content:
          "An **index** is like a book's index  it helps the database find rows faster without scanning the entire table.\n\n**Creating an index:**\n```sql\nCREATE INDEX idx_salary ON employees(salary);\n```\n\n**When indexes help:**\n- Columns used in WHERE clauses frequently\n- Columns used in JOIN conditions\n- Columns used in ORDER BY\n- Large tables (thousands+ rows)\n\n**When indexes hurt:**\n- They slow down INSERT/UPDATE/DELETE (index must be updated)\n- They take up disk space\n- On small tables, a full scan is faster than using an index\n\n**Composite index**  multiple columns:\n```sql\nCREATE INDEX idx_dept_salary ON employees(department, salary);\n```\n\nThink of indexes as a trade-off: read speed vs. write speed.\n\n## SQL Views vs Materialized Views\n\nA **view** is a saved SQL query that acts like a virtual table. It doesn't store data → it runs the underlying query each time you access it.\n\n```sql\n-- Create a view\nCREATE VIEW high_salary AS\nSELECT name, department, salary\nFROM employees\nWHERE salary > 80000;\n\n-- Query it like a table\nSELECT * FROM high_salary;\n```\n\n**Materialized view** stores the query result physically (like a snapshot). It must be refreshed to see new data.\n\n```sql\nCREATE MATERIALIZED VIEW monthly_sales_summary AS\nSELECT month, SUM(amount) as total\nFROM sales\nGROUP BY month;\n\n-- Refresh to get latest data\nREFRESH MATERIALIZED VIEW monthly_sales_summary;\n```\n\n**Key differences:**\n| View | Materialized View |\n|------|-------------------|\n| No storage (runs query each time) | Stores result on disk |\n| Always up to date | Needs refresh |\n| Slower for complex queries | Faster for reads |\n| No indexes needed | Can have indexes |\n\nUse views for security (hide columns), simplify complex queries. Use materialized views for performance-critical dashboards.\n\n:::checkpoint\nWhat does an index do?\nA) Sorts data permanently\nB) Speeds up data retrieval at the cost of slower writes\nC) Deletes duplicate data\nD) Encrypts the table\nCorrect: B",
        quiz: [
          {
            question:
              "What does EXPLAIN ANALYZE help you do during query optimization?",
            options: [
              "Automatically fix slow queries",
              "Show the query execution plan so you can spot Seq Scans and missing indexes",
              "Delete duplicate rows",
              "Encrypt table data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does an index do?",
            options: [
              "Sorts permanently",
              "Speeds reads at cost of slower writes",
              "Deletes dupes",
              "Encrypts table",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a subquery?",
            options: [
              "A query inside another query",
              "A partial query",
              "A stored procedure",
              "A database view",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a primary key?",
            options: [
              "A unique identifier for each row in a table",
              "An index on the first column",
              "A foreign key reference",
              "A constraint on all columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: [
              "WHERE filters rows, HAVING filters groups",
              "WHERE filters groups, HAVING filters rows",
              "Same thing",
              "HAVING comes before WHERE",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does a LEFT JOIN return?",
            options: [
              "Only matching rows",
              "All rows from left table and matching from right",
              "All rows from both tables",
              "Only non-matching rows",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w12-d5",
        title: "Day 5: Month 3 Capstone: Full DB Project",
        description: "Design and build a small library database from scratch",
        type: "project",
        duration: "2-3 hrs",
        content:
          "Design and build a small library database from scratch.\n\n**Scenario:** A library needs to track books, members, and loans.\n\n**Deliverable:** Write SQL statements for:\n\n1. Design tables for books, members, and loans\n2. CREATE TABLE statements with data types and constraints\n3. INSERT sample data (minimum ~3 books, 3 members, 5 loans)\n4. UPDATE a loan to mark it as returned\n5. JOIN query to show which books are loaned out and to whom\n6. CREATE INDEX on foreign key columns\n\n**Hints:**\n- loans table needs foreign keys linking to books and members\n- Use INTEGER PRIMARY KEY for ids, TEXT for names/dates\n- The JOIN will connect loans -> members and loans -> books\n- Index foreign key columns used in JOIN conditions\n\n:::checkpoint\nFor the library database, which columns should be indexed?\nA) title and author\nB) book_id and member_id in the loans table (foreign keys used in JOINs)\nC) id in all tables\nD) loan_date\nCorrect: B",
        quiz: [
          {
            question: "Which columns to index in library DB?",
            options: [
              "title/author",
              "book_id/member_id in loans (foreign keys)",
              "id in all tables",
              "loan_date",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does GROUP BY do?",
            options: [
              "Sorts results",
              "Groups rows that have same values into summary rows",
              "Filters rows",
              "Orders by group",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between WHERE and HAVING?",
            options: [
              "WHERE filters rows, HAVING filters groups",
              "WHERE filters groups, HAVING filters rows",
              "Same thing",
              "HAVING comes before WHERE",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a CTE?",
            options: [
              "A Common Table Expression, a temporary named result set",
              "A category of joins",
              "A column type",
              "A constraint",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does UNION do?",
            options: [
              "Combines results of two queries removing duplicates",
              "Combines results keeping all rows",
              "Intersects two queries",
              "Subtracts queries",
            ],
            correctAnswerIndex: 0,
          },
        ],
        requirements: [
          "CREATE TABLE with constraints",
          "INSERT sample data",
          "UPDATE for returned loans",
          "SELECT with JOIN",
          "CREATE INDEX on foreign keys",
          "Multi-table query",
        ],
      },
    ],
  },
  {
    id: "week13",
    title: "Week 15: Python Basics (Month 4)",
    durationText: "WEEK 15",
    focus: "Python Basics, Pandas",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w13-d1",
        title: "Day 1: Setup & Jupyter",
        description: "Install Python and start using Jupyter Notebook",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Imagine a warehouse filled with 50,000 boxes. Each box contains sales records, customer feedback, inventory counts  all the data your company has collected over the past decade.\n\nYour manager walks in and says: *\"We need to know which products are losing money. And we need it by tomorrow morning.\"*\n\nYou could open Excel and start clicking. But that many rows would crash your spreadsheet. You could write SQL  but the data isn't in a database. You need something more powerful: a way to write instructions that the computer follows automatically, handling any amount of data without breaking a sweat.\n\nThat's **Python**. It's the Swiss Army knife of data analysis  and the skill that separates good analysts from great ones.\n\n**Why Python for data analysis?**\n- It can process millions of rows without crashing\n- It automates repetitive tasks so you don't have to\n- It has a huge collection of free tools (libraries) built specifically for data work\n- It's readable  the code looks almost like English\n\n**Install Python on your computer.** You'll need it for the Python weeks ahead. The Playground below works in-browser, but for real analysis you want Python installed locally.\n\n### Windows\n1. Go to [python.org](https://python.org) and click Downloads (it will suggest the latest version)\n2. Run the installer  **check the box** that says \"Add Python to PATH\"\n3. Click \"Install Now\" and wait for it to finish\n4. Open **Command Prompt** (search \"cmd\" in Start menu) and type: `python --version`  you should see something like `Python 3.12.x`\n\n### Mac\n1. Open **Terminal** (Finder > Applications > Utilities > Terminal)\n2. Install Homebrew if you don't have it: `/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"`\n3. Run: `brew install python@3.12`\n4. Verify: `python3 --version`\n\n### Linux (Ubuntu/Debian)\n1. Open Terminal\n2. Run: `sudo apt update && sudo apt install python3 python3-pip -y`\n3. Verify: `python3 --version`\n\n**Install Jupyter Notebook** (all platforms):\n```bash\npip install jupyter\n```\nThen launch it:\n```bash\njupyter notebook\n```\nA browser window will open with the Jupyter dashboard. Click \"New > Python 3 (ipykernel)\" to create a notebook. The **Python Notebook** playground below works the same way  you write code on the left, run it, and see results on the right.\n\n**Virtual environments  keep projects isolated:**\n\nA virtual environment (venv) is a self-contained directory for each project's dependencies. Never install packages globally  always use a venv.\n\n```bash\n# Create a virtual environment (one time per project)\npython -m venv .venv\n\n# Activate it\n# Windows\n.venv\\Scripts\\activate\n# Mac/Linux\nsource .venv/bin/activate\n\n# Now install packages inside the venv\npip install pandas matplotlib jupyter\n\n# When done, deactivate\ndeactivate\n```\n\nAlways create a venv before installing packages. This prevents version conflicts between projects.\n\n**Your first Python code  say hello:**\n```python\nprint('Hello, Data World!')\n```\n\n`print()` is a command that displays text. Think of it as the 'show me' button  whatever you put inside the parentheses gets printed to the screen. Type the code in the playground below and click Run.\n\n**How the notebook works:**\n- Each block of code is called a **cell**\n- Press the Run button (or Ctrl+Enter) to execute the cell\n- The result appears below the cell\n- You can edit a cell and re-run it as many times as you want\n\nCode, run, see result, repeat. That's the data analyst's workflow.\n\n:::checkpoint\nWhat does print() do in Python?\nA) Saves the file to disk\nB) Displays text or values on the screen\nC) Opens a new file\nD) Deletes a variable\nCorrect: B",
        quiz: [
          {
            question: "Shift+Enter in Jupyter does what?",
            options: [
              "Saves file",
              "Runs cell and moves to next",
              "Opens notebook",
              "Closes notebook",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does print() do in Python?",
            options: [
              "Displays text on the screen",
              "Saves a file",
              "Defines a function",
              "Creates a variable",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a cell in the Python Notebook?",
            options: [
              "A saved file",
              "A block of code you can run individually",
              "A type of data",
              "A Python function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the Python Notebook workflow?",
            options: [
              "Write, save, close, reopen",
              "Code, run, see result, repeat",
              "Install, configure, deploy",
              "Plan, design, test, release",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why use Python for data analysis instead of Excel?",
            options: [
              "Python can handle millions of rows without crashing",
              "Python is harder to learn",
              "Excel is always faster",
              "Python only works on Linux",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w13-d2",
        title: "Day 2: Data Types",
        description: "Master int, float, string, and boolean types",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Every piece of data in Python has a **type**  like telling the computer what kind of thing it's dealing with. Think of types as labeled boxes:\n\n- **Numbers go in the number box**  you can do math on them\n- **Text goes in the text box**  you can search, split, and join it\n- **True/False goes in the boolean box**  you can use it for decisions\n\nIf you try to do math on text, Python complains. If you try to capitalize a number, Python complains. Types keep things organized.\n\n**Numbers  int and float:**\n```python\nage = 25          # int (whole number  no decimal)\nprice = 19.99     # float (number with decimal point)\nresult = 3 + 5 * 2  # 13 (Python follows math order of operations)\n```\n\n`int` = integer (like 1, 42, -7). `float` = floating-point number (like 3.14, 99.99, -0.5). Python handles the math exactly as you'd expect  multiplication before addition, parentheses override.\n\n**Strings  text data:**\n```python\nname = 'Alice'\ngreeting = 'Hello, ' + name  # 'Hello, Alice' (joining text with +)\nlength = len(name)           # 5 (len() counts characters)\n```\n\nA string is any text surrounded by quotes  'Alice' or \"Sales Report\". The `+` operator joins strings together (called **concatenation**). `len()` counts how many characters are in the string.\n\n**Booleans  True or False:**\n```python\nis_active = True\nhas_data = False\ncomparison = 10 > 5  # True (because 10 IS greater than 5)\n```\n\nBooleans are the answer to yes/no questions. `10 > 5` evaluates to `True` because the statement is correct. `5 > 10` would be `False`. You'll use booleans constantly in IF statements and filters.\n\n**Checking and converting types:**\n```python\ntype(age)          # <class 'int'>  Python tells you what type it is\nstr(age)           # '25'  converts the number 25 into the text '25'\nint('100')         # 100  converts the text '100' into the number 100\n```\n\nYou'll often need to convert types. A CSV file might store numbers as text ('100'), but you need them as actual numbers to do math. `int()` and `float()` convert text to numbers. `str()` converts anything to text.\n\nIn the Python Notebook below, create a variable of each type, convert between them, and print the results. Experiment!\n\n:::checkpoint\nWhat type is the value 3.14 in Python?\nA) int\nB) float (a number with a decimal point)\nC) string\nD) bool\nCorrect: B",
        quiz: [
          {
            question: "What type is 3.14?",
            options: ["int", "float", "string", "bool"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does str(age) do if age is the number 25?",
            options: [
              "Returns the number 25",
              "Converts 25 to the text '25'",
              "Deletes the variable age",
              "Multiplies age by 2",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is string concatenation?",
            options: [
              "Dividing two strings",
              "Joining strings together with +",
              "Converting text to numbers",
              "Removing characters from a string",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does len('Alice') return?",
            options: ["5", "4", "6", "Error"],
            correctAnswerIndex: 0,
          },
          {
            question: "What type does the expression 10 > 5 evaluate to?",
            options: ["int", "float", "bool", "string"],
            correctAnswerIndex: 2,
          },
        ],
      },
      {
        id: "w13-d3",
        title: "Day 3: Lists & Dictionaries",
        description: "Store and organize data with lists and dicts",
        type: "learn",
        duration: "45-60 mins",
        content:
          "In real data work, you rarely deal with single values. You deal with **collections**  lists of sales figures, rows of customer data, inventory counts. Python has two essential tools for this: lists and dictionaries.\n\n**Lists  ordered collections (like a numbered list):**\n\nA list is like a row of numbered lockers. Each locker holds an item, and you open it by knowing its position (index).\n\n```python\nfruits = ['apple', 'banana', 'cherry']\nfruits.append('date')        # Add to end: ['apple', 'banana', 'cherry', 'date']\nfruits[0]                    # 'apple'  indexing starts at 0! This trips everyone up\nfruits[-1]                   # 'date'  negative index counts from the end\nfruits[1:3]                  # ['banana', 'cherry']  slicing: from index 1 up to (not including) 3\nlen(fruits)                  # 4  how many items are in the list\n```\n\n**Indexing starts at 0, not 1.** This confuses every beginner. `fruits[0]` is the first item. `fruits[1]` is the second. Think of it as 'how many steps from the start'  the first item is 0 steps away.\n\n**Dictionaries  labeled collections (like a filing cabinet):**\n\nA dictionary stores data as **key-value pairs**. The key is the label (like a file drawer name), and the value is the data inside. Unlike lists where you ask 'what's at position 3?', with dictionaries you ask 'what's the value for this key?'\n\n```python\nperson = {\n  'name': 'Alice',\n  'age': 25,\n  'city': 'New York'\n}\nperson['name']               # 'Alice'  look up by key\nperson.keys()                # dict_keys(['name', 'age', 'city'])\nperson.values()              # dict_values(['Alice', 25, 'New York'])\n```\n\nDictionaries are everywhere in data analysis. A CSV row becomes a dictionary (column name ? value). A JSON API response is a nest of dictionaries. They're the natural way to represent labeled data.\n\n**List vs. Dictionary  when to use which:**\n- Use a **list** when order matters and items are the same kind of thing (list of employee names, list of daily sales totals)\n- Use a **dictionary** when you need to look things up by name (employee record ? lookup by 'salary')\n\n:::checkpoint\nIn Python, what index does the first element of a list have?\nA) 1\nB) 0 (counting from the start, the first item is 0 steps away)\nC) -1\nD) It depends\nCorrect: B\n\n:::checkpoint\nWhat's a dictionary?\nA) A list of words\nB) A collection of key-value pairs (look up by label, not position)\nC) A type of loop\nD) A function\nCorrect: B",
        quiz: [
          {
            question: "First element index in Python?",
            options: ["1", "0", "-1", "Depends"],
            correctAnswerIndex: 1,
          },
          {
            question: "What's a dictionary?",
            options: [
              "Word list",
              "Key-value pairs",
              "Type of loop",
              "Function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you add an item to an existing list?",
            options: [
              "Using append()",
              "Using add()",
              "Using insert()",
              "Using push()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does fruits[-1] return?",
            options: [
              "The first item",
              "The last item",
              "An error",
              "The second item",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "When should you use a dictionary instead of a list?",
            options: [
              "When you need to look up values by a label or key",
              "When order is all that matters",
              "When all items are the same type",
              "When you need a sequence of numbers",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w13-d4",
        title: "Day 4: Loops & Functions",
        description: "Write loops and reusable functions",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Imagine you have 500 CSV files that all need the same cleaning: remove blank rows, fix date formats, and calculate totals. Doing this manually would take days. That's where loops and functions come in  they let you write the instruction ONCE and apply it automatically.\n\n**For loops  repeat an action for every item:**\n\nA `for` loop says: 'For each thing in this collection, do something.' It's like an assembly line  each item passes through and gets processed.\n\n```python\nfruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit)\n```\n\nPython reads this as: 'Take the first fruit ('apple'), print it. Take the next fruit ('banana'), print it. Take the last fruit ('cherry'), print it.' The variable `fruit` changes each iteration.\n\n**Functions  package logic so you never repeat yourself:**\n\nA function is a named recipe. You define it once, then call it by name whenever you need it. This is the single most important programming principle: **Don't Repeat Yourself (DRY)**.\n\n```python\ndef calculate_discount(price, discount_pct):\n    return price * (1 - discount_pct / 100)\n\nfinal_price = calculate_discount(100, 20)  # 80.0  20% off $100 = $80\nfinal_price = calculate_discount(250, 15)  # 212.5  15% off $250 = $212.50\n```\n\n`def` tells Python 'I'm defining a function.' The function has a name (`calculate_discount`), parameters (`price, discount_pct`), and a body that computes and returns the result. Once defined, you can call it a thousand times with different inputs.\n\n**List comprehensions  compact loops in one line:**\n\nPython has a shorthand for creating lists with loops. This is a 'Pythonic' style  it's concise once you get used to it:\n\n```python\n# Long way:\nsquares = []\nfor x in range(10):\n    squares.append(x**2)\n\n# Short way (list comprehension):\nsquares = [x**2 for x in range(10)]  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n```\n\nRead it as: 'Create a list where each element is `x**2`, for every `x` in the range 0 through 9.'\n\nFunctions and loops together form the backbone of every data pipeline. Write a function once with a loop inside, and you can process millions of data points with a single command.\n\n**File I/O  reading and writing files:**\n\nPython can read and write files with the built-in `open()` function:\n\n```python\n# Read an entire file\nwith open('data.csv', 'r') as f:\n    content = f.read()\n\n# Read line by line (memory efficient for large files)\nwith open('data.csv', 'r') as f:\n    for line in f:\n        print(line.strip())\n\n# Write to a file\nwith open('output.txt', 'w') as f:\n    f.write('Hello, file!')\n\n# Append to existing file\nwith open('output.txt', 'a') as f:\n    f.write('\\nAnother line')\n```\n\nThe `with` statement automatically closes the file when done. Mode `'r'` = read, `'w'` = write (overwrites), `'a'` = append.\n\n**Error handling with try/except:**\n\nReal-world data is messy. Files may not exist, values may be invalid, network requests may fail. Handle errors gracefully:\n\n```python\ntry:\n    with open('missing_file.csv', 'r') as f:\n        data = f.read()\nexcept FileNotFoundError:\n    print('File not found. Creating a new one.')\n    # Create the file or use default data\nexcept Exception as e:\n    print(f'An error occurred: {e}')\nfinally:\n    print('Cleanup: closing connections if any')\n\n# Practical: safe number conversion\ndef safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Cannot divide by zero'\n    except TypeError:\n        return 'Invalid input type'\n```\n\nAlways use try/except around operations that can fail: file access, network requests, user input parsing.\n\n:::checkpoint\nWhat does `def` do in Python?\nA) Defines a variable\nB) Defines a function (a reusable block of code)\nC) Deletes a value\nD) Defines a loop\nCorrect: B",
        quiz: [
          {
            question: "What does def do?",
            options: [
              "Defines variable",
              "Defines function",
              "Deletes value",
              "Defines loop",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does a for loop do?",
            options: [
              "Repeats an action for every item in a collection",
              "Defines a new function",
              "Checks if a condition is true",
              "Creates a new variable",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does return do inside a function?",
            options: [
              "Saves the function to a file",
              "Outputs a value from the function back to the caller",
              "Stops the entire program",
              "Prints the result on screen",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does DRY stand for in programming?",
            options: [
              "Don't Repeat Yourself",
              "Do Run Your code",
              "Delete Random YAML",
              "Define Return Yield",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: 'What does \'with open("file.txt", "r") as f\' do?',
            options: [
              "Creates a new file named file.txt",
              "Opens file.txt for reading and auto-closes it when done",
              "Deletes file.txt",
              "Writes data to file.txt",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w13-d5",
        title: "Day 5: Mini-Project: Python Logic",
        description: "Solve logic problems with Python functions",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Write Python functions to solve these logic problems:\n\n1. **Temperature converter**  function that converts Fahrenheit to Celsius\n2. **Even number filter**  given a list of numbers, return only the even ones\n3. **Word counter**  given a sentence (string), return a dictionary of word counts\n4. **List average**  function that computes the average of a list of numbers\n5. **FizzBuzz**  print numbers 1-100, but 'Fizz' for multiples of 3, 'Buzz' for 5, 'FizzBuzz' for both\n\nTest each function with sample inputs. Put your code in a Jupyter notebook cell and run it.\n\n:::checkpoint\nWhich function correctly returns even numbers from a list?\nA) `def evens(lst): return [x for x in lst if x % 2 == 0]`\nB) `def evens(lst): return [x for x in lst if x / 2 == 0]`\nC) `def evens(lst): return lst[::2]`\nD) `def evens(lst): return [x for x in lst if x % 2 != 0]`\nCorrect: A",
        quiz: [
          {
            question: "Which returns even numbers correctly?",
            options: [
              "[x for x in lst if x % 2 == 0]",
              "[x for x in lst if x / 2 == 0]",
              "lst[::2]",
              "[x for x in lst if x % 2 != 0]",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the % operator do in Python?",
            options: [
              "Returns the remainder of division (modulo)",
              "Calculates a percentage",
              "Concatenates strings",
              "Creates a list",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a function parameter?",
            options: [
              "An input value the function receives when called",
              "A measurement of how fast a function runs",
              "The output of a function",
              "A type of loop",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the FizzBuzz problem teach you?",
            options: [
              "How to combine conditionals and loops",
              "How to install Python packages",
              "How to create CSV files",
              "How to define classes",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you define a function in Python?",
            options: [
              "Using the def keyword followed by the function name",
              "Using the function keyword",
              "Using the define keyword",
              "Using the lambda keyword",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "weekNP",
    title: "Week 15.5: NumPy Fundamentals (Month 4)",
    durationText: "WEEK 15.5",
    focus: "NumPy, Arrays, Vectorized Computing",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w_np-d1",
        title: "Day 1: What is NumPy? Arrays vs Lists",
        description:
          "Understand why NumPy exists and how arrays beat Python lists for data work",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## Why NumPy?\n\nPython lists are flexible but slow for math. If you want to multiply every value in a 1-million-row list by 2, a Python loop takes seconds. NumPy does it in milliseconds using **vectorized operations** — the same math applied to every element at once, powered by compiled C code under the hood.\n\nPandas is built on NumPy. Every column in a DataFrame is a NumPy array. Understanding NumPy makes you faster at both data analysis and debugging.\n\n## Creating Arrays\n\n```python\nimport numpy as np\n\n# From a Python list\narr = np.array([10, 20, 30, 40, 50])\nprint(arr)          # [10 20 30 40 50]\nprint(arr.dtype)    # int64\nprint(arr.shape)    # (5,) — 5 elements, 1 dimension\n\n# 2D array (matrix)\nmatrix = np.array([[1, 2, 3], [4, 5, 6]])\nprint(matrix.shape)  # (2, 3) — 2 rows, 3 columns\n```\n\n## Convenient Creation Functions\n\n```python\nnp.zeros(5)           # [0. 0. 0. 0. 0.]\nnp.ones(4)            # [1. 1. 1. 1.]\nnp.arange(0, 10, 2)   # [0 2 4 6 8]  like range() but returns array\nnp.linspace(0, 1, 5)  # [0.   0.25 0.5  0.75 1.]  evenly spaced\nnp.random.seed(42)\nnp.random.randint(1, 100, size=10)  # 10 random integers\n```\n\n## List vs Array — Side by Side\n\n```python\n# Python list  — elementwise math requires a loop\nmy_list = [1, 2, 3, 4, 5]\ndoubled_list = [x * 2 for x in my_list]  # [2, 4, 6, 8, 10]\n\n# NumPy array — elementwise math in one expression\nmy_arr = np.array([1, 2, 3, 4, 5])\ndoubled_arr = my_arr * 2  # [2 4 6 8 10] — no loop needed!\n\n# And it is dramatically faster on large data\nimport time\nbig_list = list(range(1_000_000))\nbig_arr  = np.array(big_list)\n\nstart = time.time()\n_ = [x * 2 for x in big_list]\nprint('List:', round(time.time()-start, 3), 's')\n\nstart = time.time()\n_ = big_arr * 2\nprint('Array:', round(time.time()-start, 3), 's')\n# Array is ~10-100x faster\n```\n\n:::checkpoint\nWhy is a NumPy array faster than a Python list for math operations?\nA) NumPy uses more memory\nB) NumPy uses vectorized operations in compiled C code instead of Python loops\nC) NumPy lists are smaller\nD) Python lists are always slower regardless\nCorrect: B\n\n:::checkpoint\nWhat does np.arange(2, 10, 2) produce?\nA) [2, 4, 6, 8, 10]\nB) [2, 4, 6, 8]\nC) [0, 2, 4, 6, 8]\nD) Error\nCorrect: B",
        quiz: [
          {
            question: "Why is NumPy faster than Python lists for math?",
            options: [
              "NumPy uses more memory",
              "Vectorized operations in compiled C code — no Python loop needed",
              "NumPy compresses data",
              "Python lists are always the same speed",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.zeros(3) produce?",
            options: ["[1, 1, 1]", "[0, 0, 0]", "[0, 1, 2]", "Error"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does arr.shape tell you?",
            options: [
              "The data type of the array",
              "The dimensions and size of the array",
              "The sum of all values",
              "The memory used",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.arange(0, 6, 2) produce?",
            options: [
              "[0, 2, 4, 6]",
              "[0, 2, 4]",
              "[2, 4, 6]",
              "[0, 1, 2, 3, 4, 5]",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Pandas DataFrames are built on top of:",
            options: [
              "Python lists",
              "NumPy arrays",
              "Dictionaries",
              "SQL tables",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_np-d2",
        title: "Day 2: Array Operations & Broadcasting",
        description:
          "Apply math to entire arrays at once and understand broadcasting rules",
        type: "practice",
        duration: "45-60 mins",
        content:
          "## Vectorized Arithmetic\n\nWith NumPy, any arithmetic operation on an array applies to every element — no loop required.\n\n```python\nimport numpy as np\n\nprices  = np.array([100, 200, 150, 80, 300])\ntax     = 0.1\n\ntotal   = prices * (1 + tax)   # [110. 220. 165.  88. 330.]\ndiscount = prices * 0.8        # [80. 160. 120.  64. 240.]\n\n# Operations between two arrays (element-by-element)\nrevenue = np.array([5000, 8000, 3000])\ncost    = np.array([2000, 5000, 1500])\nprofit  = revenue - cost  # [3000 3000 1500]\nmargin  = profit / revenue  # [0.6  0.375 0.5]\n```\n\n## Broadcasting — Arrays of Different Sizes\n\nBroadcasting lets NumPy perform operations on arrays with different shapes by 'stretching' the smaller one.\n\n```python\nmatrix = np.array([[1, 2, 3],\n                   [4, 5, 6],\n                   [7, 8, 9]])\n\n# Add 10 to every element (scalar broadcast)\nmatrix + 10\n# array([[11, 12, 13],\n#        [14, 15, 16],\n#        [17, 18, 19]])\n\n# Add a row vector [1, 0, -1] to every row\nmatrix + np.array([1, 0, -1])\n# array([[ 2,  2,  2],\n#        [ 5,  5,  5],\n#        [ 8,  8,  8]])\n```\n\n## Useful Universal Functions (ufuncs)\n\n```python\narr = np.array([1, 4, 9, 16, 25])\n\nnp.sqrt(arr)   # [1. 2. 3. 4. 5.]  square root of each\nnp.log(arr)    # natural log of each\nnp.abs(arr)    # absolute value\nnp.round(arr, 2)  # round each to 2 decimal places\n```\n\n## Aggregations\n\n```python\ndata = np.array([10, 20, 30, 40, 50])\n\nnp.sum(data)    # 150\nnp.min(data)    # 10\nnp.max(data)    # 50\nnp.cumsum(data) # [10 30 60 100 150] — running total\n```\n\n:::checkpoint\nWhat does np.sqrt(np.array([4, 9, 16])) return?\nA) [2. 3. 4.]\nB) [2, 3, 4]\nC) Error\nD) [16, 81, 256]\nCorrect: A",
        quiz: [
          {
            question: "What does prices * 1.1 do when prices is a NumPy array?",
            options: [
              "Multiplies only the first element",
              "Multiplies every element by 1.1 at once",
              "Creates an error",
              "Appends 1.1 to the list",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is broadcasting in NumPy?",
            options: [
              "Sending arrays over a network",
              "Applying an operation across arrays of different sizes by stretching the smaller one",
              "A type of loop",
              "Copying an array",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.cumsum([1, 2, 3, 4]) return?",
            options: ["[1, 2, 3, 4]", "[1, 3, 6, 10]", "10", "[0, 1, 3, 6]"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which NumPy function returns the square root of each element?",
            options: ["np.power()", "np.sqrt()", "np.root()", "np.sqr()"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.sum(arr) return?",
            options: [
              "A running total for each element",
              "The sum of all elements in the array",
              "The maximum value",
              "The number of elements",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_np-d3",
        title: "Day 3: NumPy for Statistics (Z-Scores & More)",
        description:
          "Use NumPy for statistical analysis including z-scores and percentiles",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## NumPy Statistical Functions\n\nNumPy has a full set of statistical functions that work on arrays — faster and more memory-efficient than Python's statistics module.\n\n```python\nimport numpy as np\n\ndata = np.array([12, 15, 14, 10, 18, 22, 13, 16, 19, 25])\n\nprint(np.mean(data))    # 16.4  — average\nprint(np.median(data))  # 15.5  — middle value\nprint(np.std(data))     # 4.2   — standard deviation\nprint(np.var(data))     # 17.84 — variance\nprint(np.min(data))     # 10\nprint(np.max(data))     # 25\nprint(np.percentile(data, 25))   # Q1 = 13.25\nprint(np.percentile(data, 75))   # Q3 = 19.25\nprint(np.percentile(data, [25, 50, 75]))  # all at once\n```\n\n## Z-Scores — How Far From the Mean?\n\nA **z-score** measures how many standard deviations a value is from the mean.\n\n**Formula:** z = (x - mean) / std\n\n- z = 0: exactly at the mean\n- z = 1: one std above the mean\n- z = -2: two stds below the mean\n- |z| > 3: likely an outlier\n\n```python\nimport numpy as np\n\ndata = np.array([50, 55, 52, 60, 48, 100, 53, 57])\n\nmean = np.mean(data)\nstd  = np.std(data)\n\nz_scores = (data - mean) / std\nprint(z_scores.round(2))\n# [ -0.6  -0.19 -0.45  0.36 -0.9   3.37 -0.3   0.07]\n# The value 100 has z=3.37 — a clear outlier!\n\n# Identify outliers (|z| > 2)\noutliers = data[np.abs(z_scores) > 2]\nprint('Outliers:', outliers)  # [100]\n```\n\n**When to use z-scores:**\n- Detecting outliers (|z| > 2 or 3)\n- Comparing values from different scales (e.g. height in cm vs weight in kg)\n- Standardizing features before ML models\n- Understanding where a data point sits relative to the distribution\n\n## Frequency Distributions\n\nA frequency distribution shows how often each value (or range of values) appears.\n\n```python\nimport numpy as np\n\nages = np.array([22, 25, 28, 22, 30, 35, 25, 28, 40, 22, 28, 35])\n\n# Count exact values\nuniques, counts = np.unique(ages, return_counts=True)\nfor val, cnt in zip(uniques, counts):\n    print(f'Age {val}: {cnt} times')\n\n# Bin into ranges (histogram-style)\nbins = [20, 25, 30, 35, 40, 45]\nfreq, edges = np.histogram(ages, bins=bins)\nfor i in range(len(freq)):\n    print(f'{edges[i]}-{edges[i+1]}: {freq[i]} people')\n\n# Relative frequency (proportions)\nrelative = freq / freq.sum()\nprint(relative.round(2))  # [0.33 0.25 0.17 0.17 0.08]\n\n# Cumulative frequency\ncumulative = np.cumsum(freq)\nprint(cumulative)  # [4 7 9 11 12]\n```\n\n:::checkpoint\nIf a value has a z-score of -2.5, what does that mean?\nA) The value is 2.5 times the mean\nB) The value is 2.5 standard deviations BELOW the mean\nC) The value is an error in the data\nD) The value equals zero\nCorrect: B\n\n:::checkpoint\nWhat does np.percentile(data, 75) return?\nA) The 75th largest value\nB) The value below which 75% of the data falls (Q3)\nC) 75% of the mean\nD) The value at position 75 in the array\nCorrect: B",
        quiz: [
          {
            question: "What is a z-score?",
            options: [
              "The rank of a value in the dataset",
              "How many standard deviations a value is from the mean",
              "The percentage of values below a point",
              "The probability of a value occurring",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "If |z| > 3, the data point is likely:",
            options: [
              "The mean",
              "An outlier",
              "A median value",
              "A mode value",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.percentile(data, 50) return?",
            options: [
              "The mean",
              "The median (50th percentile)",
              "The maximum value",
              "50% of the sum",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is relative frequency?",
            options: [
              "The count of each value",
              "The proportion of each value relative to total (count / total)",
              "The difference between max and min",
              "The running total",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why standardize data using z-scores before ML models?",
            options: [
              "It makes the data look cleaner",
              "It puts features on the same scale so no single feature dominates",
              "It removes all outliers automatically",
              "It is required by Python",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_np-d4",
        title: "Day 4: Indexing, Boolean Masks & np.where",
        description:
          "Select and filter array data with powerful boolean indexing",
        type: "practice",
        duration: "45-60 mins",
        content:
          "## Array Indexing & Slicing\n\nJust like Python lists, but also works on 2D arrays.\n\n```python\nimport numpy as np\n\narr = np.array([10, 20, 30, 40, 50])\n\narr[0]     # 10  — first element\narr[-1]    # 50  — last element\narr[1:4]   # [20, 30, 40]  — slice\narr[:3]    # [10, 20, 30]  — first 3\narr[::2]   # [10, 30, 50]  — every other element\n\n# 2D indexing\nmatrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nmatrix[0, :]   # [1 2 3]  — first row\nmatrix[:, 1]   # [2 5 8]  — second column\nmatrix[1, 2]   # 6        — row 1, col 2\n```\n\n## Boolean Masks — The Most Powerful Indexing\n\nBroadcast a condition across an array to get a True/False mask, then use it to select elements.\n\n```python\nscores = np.array([78, 92, 65, 88, 55, 97, 73])\n\nmask = scores > 80           # [F  T  F  T  F  T  F]\nhigh_scores = scores[mask]   # [92 88 97]\n\n# In one line:\nscores[scores > 80]          # [92 88 97]\n\n# Multiple conditions\nscores[(scores >= 70) & (scores < 90)]  # [78, 88, 73]\n\n# Count how many passed\nprint(np.sum(scores > 80))   # 3\nprint(np.mean(scores > 80))  # 0.43 — 43% of scores are above 80\n```\n\n## np.where — Conditional Replacement\n\n`np.where(condition, value_if_true, value_if_false)` is the NumPy equivalent of CASE WHEN in SQL or IF in Excel.\n\n```python\nscores = np.array([78, 92, 65, 88, 55, 97, 73])\n\n# Label each score as Pass or Fail\nlabels = np.where(scores >= 70, 'Pass', 'Fail')\n# ['Pass', 'Pass', 'Fail', 'Pass', 'Fail', 'Pass', 'Pass']\n\n# Multi-level with nested np.where\ngrades = np.where(scores >= 90, 'A',\n         np.where(scores >= 80, 'B',\n         np.where(scores >= 70, 'C', 'F')))\nprint(grades)  # ['C', 'A', 'F', 'B', 'F', 'A', 'C']\n\n# Conditional fill: replace negatives with 0\ndata = np.array([5, -3, 8, -1, 12])\ncleaned = np.where(data < 0, 0, data)  # [5 0 8 0 12]\n```\n\n:::checkpoint\nWhat does scores[scores > 80] do?\nA) Returns the indices where scores > 80\nB) Returns the values from scores where the condition is True\nC) Returns a boolean array\nD) Modifies the original array\nCorrect: B\n\n:::checkpoint\nWhat does np.where(arr > 0, arr, 0) do?\nA) Deletes negative values\nB) Returns arr values where positive, 0 where negative\nC) Counts positive values\nD) Sorts the array\nCorrect: B",
        quiz: [
          {
            question: "How do you select all elements > 5 from arr?",
            options: [
              "arr.filter(5)",
              "arr[arr > 5]",
              "arr.where(> 5)",
              "np.filter(arr, 5)",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.where(x > 0, 1, -1) return?",
            options: [
              "Count of positive values",
              "1 where x > 0, -1 elsewhere",
              "The indices of positive values",
              "Error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "How do you select row 0 from a 2D NumPy array called matrix?",
            options: [
              "matrix[0]",
              "matrix[:, 0]",
              "matrix.row(0)",
              "matrix.head(1)",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does np.sum(scores > 70) calculate?",
            options: [
              "The sum of all scores above 70",
              "The count of scores above 70 (True = 1)",
              "The percentage above 70",
              "Error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How is np.where similar to SQL's CASE WHEN?",
            options: [
              "Both filter rows from a table",
              "Both return different values based on a condition",
              "Both are used for sorting",
              "They are not similar at all",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_np-d5",
        title: "Day 5: Mini-Project: NumPy Data Analysis",
        description: "Apply NumPy skills to analyze a sales dataset end-to-end",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use NumPy to analyze a sales dataset from scratch.\n\n**Scenario:** You have daily sales figures for 30 days. Analyze performance.\n\n**Requirements:**\n1. Create a NumPy array of 30 random sales values (use np.random.randint(500, 5000, 30))\n2. Calculate: mean, median, std, min, max, Q1, Q3\n3. Calculate z-scores for every day\n4. Identify which days were outliers (|z| > 1.5)\n5. Create a frequency distribution with np.histogram using 5 bins\n6. Use np.where to label each day as 'Above Average' or 'Below Average'\n7. Count how many days were above average\n\n**Hints:**\n- z = (arr - arr.mean()) / arr.std()\n- outlier_days = np.where(np.abs(z_scores) > 1.5)[0]  — returns indices\n- freq, edges = np.histogram(sales, bins=5)\n- labels = np.where(sales > sales.mean(), 'Above', 'Below')\n- np.sum(sales > sales.mean()) counts True values\n\n:::checkpoint\nTo find the indices of outliers (|z| > 2), you would use:\nA) z_scores > 2\nB) np.where(np.abs(z_scores) > 2)\nC) z_scores.filter(2)\nD) np.abs(z_scores) == 2\nCorrect: B",
        quiz: [
          {
            question: "What does np.random.randint(100, 500, 30) produce?",
            options: [
              "One random integer between 100 and 500",
              "30 random integers between 100 and 500",
              "A range from 100 to 500",
              "Error",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you calculate z-scores for an entire array?",
            options: [
              "Loop through each element manually",
              "(arr - arr.mean()) / arr.std() — fully vectorized",
              "np.zscore(arr)",
              "arr / arr.sum()",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "np.where(np.abs(z_scores) > 2) returns:",
            options: [
              "The z-score values above 2",
              "A tuple of arrays containing indices where condition is True",
              "True/False for each element",
              "The count of outliers",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Why use np.histogram instead of just np.unique for frequency distributions?",
            options: [
              "np.unique is deprecated",
              "np.histogram groups continuous data into bins (ranges), not just exact values",
              "np.histogram is faster",
              "They do the same thing",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does np.mean(sales > sales.mean()) tell you?",
            options: [
              "The average of above-average sales",
              "The proportion of days that were above average",
              "The count of above-average days",
              "Nothing useful",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Create sales array with np.random",
          "Calculate all 7 descriptive statistics",
          "Calculate z-scores",
          "Identify outlier days",
          "Build frequency distribution",
          "Label days Above/Below Average",
        ],
      },
    ],
  },
  {
    id: "week14",
    title: "Week 16: Intro to Pandas (Month 4)",
    durationText: "WEEK 16",
    focus: "Python Basics, Pandas",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w14-d1",
        title: "Day 1: Series & DataFrames",
        description: "Understand Pandas' core data structures",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Remember the spreadsheet you built in Week 1  categories, budgeted amounts, actual spending, formulas? Now imagine that spreadsheet, but capable of holding 10 million rows without crashing, and controllable entirely through code so you can automate everything.\n\nThat's **Pandas**. It's the most important Python library for data analysis  period.\n\n**Pandas has two core objects that mirror a spreadsheet:**\n\n- **Series** = a single column of data (like column B in Excel), with a label and row numbers as index\n- **DataFrame** = the whole spreadsheet  rows, columns, labels, the complete table\n\n**Creating a Series  one column of data:**\n```python\nimport pandas as pd\ns = pd.Series([10, 20, 30, 40], name='scores')\nprint(s)\n```\nA Series is like a list with a name. It has labels on the left (0, 1, 2, 3  the index) and values on the right (10, 20, 30, 40).\n\n**Creating a DataFrame  the full spreadsheet:**\n```python\ndata = {\n  'name': ['Alice', 'Bob', 'Charlie'],\n  'salary': [70000, 80000, 90000]\n}\ndf = pd.DataFrame(data)\nprint(df)\n```\n\nYou pass a dictionary where each key becomes a column name, and each value is a list of row data. Pandas arranges it into a neat table  just like a spreadsheet.\n\n**First things to do with any new DataFrame  explore it:**\n```python\ndf.head()       # first 5 rows  is the data loaded correctly?\ndf.info()       # column types and non-null counts  any missing data?\ndf.shape        # (rows, columns)  how big is this dataset?\ndf.columns      # list of column names  what are we working with?\n```\n\nEvery time you load data, run these four commands. They're the data analyst's equivalent of a pilot's pre-flight checklist  quick, automatic, and catches problems before they become disasters.\n\n:::checkpoint\nWhat's the difference between Series and DataFrame?\nA) Series is a single column; DataFrame is a table with multiple columns\nB) They're the same thing\nC) Series is for numbers only\nD) DataFrame is for Excel files only\nCorrect: A",
        quiz: [
          {
            question: "Series vs DataFrame?",
            options: [
              "Series single column, DataFrame table",
              "Same thing",
              "Series numbers only",
              "DataFrame Excel only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you create a DataFrame from a dictionary?",
            options: [
              "pd.DataFrame(dict)",
              "pd.Series(dict)",
              "pd.read_dict(dict)",
              "dict.to_frame()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does df.head() return?",
            options: [
              "Last 5 rows",
              "First 5 rows",
              "First 5 columns",
              "All rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does df.info() tell you?",
            options: [
              "Column types and non-null counts",
              "All data in the DataFrame",
              "Summary statistics",
              "The index",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does df.shape return?",
            options: [
              "A single number",
              "A tuple of (rows, columns)",
              "A list of column names",
              "The data types",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w14-d2",
        title: "Day 2: Reading CSV/Excel",
        description: "Load data from files into DataFrames",
        type: "practice",
        duration: "45-60 mins",
        content:
          "In real data analysis, you rarely type data manually. It comes from files  CSV exports from databases, Excel reports from accounting, JSON from web APIs. Pandas can read almost anything.\n\nDay 1 of my first data job: my boss dropped a folder with 12 CSV files on my desk and said *\"I need the Q3 summary by Friday.\"* I'd never used Pandas before. I learned fast  and so will you.\n\n**The most common command you'll ever use  reading a CSV:**\n```python\nimport pandas as pd\ndf = pd.read_csv('sales.csv')\n```\n\nThat's it. One line, and your entire CSV file is loaded into a DataFrame, ready to analyze. Whether the file has 100 rows or 10 million, `pd.read_csv()` handles it.\n\n**Reading Excel files (yes, Pandas can do that too):**\n```python\ndf = pd.read_excel('sales.xlsx', sheet_name='Sheet1')\n```\n\n**Common adjustments when reading files:**\n\nReal-world files are rarely perfect. You'll need these parameters constantly:\n\n```python\ndf = pd.read_csv('data.csv', encoding='utf-8')     # fix encoding issues (garbled text)\ndf = pd.read_csv('data.csv', header=0)             # first row IS the column names\ndf = pd.read_csv('data.csv', index_col=0)          # use first column as row index\ndf = pd.read_csv('data.csv', skiprows=2)           # skip first 2 rows (metadata)\ndf = pd.read_csv('data.csv', na_values=['NA', '']) # treat 'NA' and blanks as null\n```\n\n**After loading  the 4-second inspection:**\n\n```python\ndf.head(10)       # look at first 10 rows  does it look right?\ndf.tail()         # last 5 rows  any weirdness at the end?\ndf.sample(5)      # random 5 rows  catch surprises in the middle\ndf.dtypes         # data type of each column  numbers stored as text?\n```\n\nThis four-command inspection takes 4 seconds and catches 90% of data-loading problems. Make it a habit.\n\n:::checkpoint\nHow do you read a CSV file into a DataFrame?\nA) pd.read_excel('file.csv')\nB) pd.read_csv('file.csv')\nC) pd.open('file.csv')\nD) pd.load('file.csv')\nCorrect: B",
        quiz: [
          {
            question: "How to read a CSV?",
            options: ["pd.read_excel", "pd.read_csv", "pd.open", "pd.load"],
            correctAnswerIndex: 1,
          },
          {
            question: "What parameter skips rows when reading a CSV?",
            options: ["header", "skiprows", "index_col", "encoding"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does df.sample(5) do?",
            options: [
              "Returns the first 5 rows",
              "Returns 5 random rows",
              "Returns the last 5 rows",
              "Returns every 5th row",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What encoding parameter is commonly used for CSV files?",
            options: ["utf-8", "base64", "hex", "binary"],
            correctAnswerIndex: 0,
          },
          {
            question: "What does df.dtypes show?",
            options: [
              "The number of rows",
              "The data type of each column",
              "The column names",
              "The index values",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w14-d3",
        title: "Day 3: Selecting Data",
        description: "Use .loc, .iloc, and boolean indexing",
        type: "learn",
        duration: "45-60 mins",
        content:
          "You've loaded your data. Now what? You need to grab specific rows and columns  just like selecting cells in a spreadsheet, but way more powerful.\n\n**Selecting columns  grab one or more:**\n```python\ndf['name']                  # single column (returns a Series)\ndf[['name', 'salary']]      # multiple columns (returns a DataFrame)\n```\nSingle brackets with one column name ? Series (one column). Double brackets with a list ? DataFrame. This distinction matters for some operations.\n\n**Selecting rows by POSITION (.iloc)  'I Locate by position':**\n\n`.iloc` uses row/column numbers, like cell references in Excel (A1, B2). Remember: Python starts counting at 0.\n\n```python\ndf.iloc[0]            # first row (row 0)\ndf.iloc[1:4]          # rows at positions 1, 2, 3 (4 is exclusive  not included)\ndf.iloc[0:3, 0:2]     # first 3 rows, first 2 columns (like selecting A1:B3)\n```\n\n**Selecting rows by LABEL (.loc)  'I Locate by label':**\n\n`.loc` uses names or conditions. This is what you'll use 90% of the time for filtering:\n\n```python\ndf.loc[df['salary'] > 75000]                       # everyone earning > $75K\ndf.loc[df['department'] == 'Engineering']           # only Engineering folks\ndf.loc[df['salary'] > 75000, ['name', 'salary']]   # filtered rows, specific columns\n```\n\n**Boolean indexing  the most common filter pattern:**\n\nPython lets you put a condition directly inside the brackets. Think of it as: 'Give me the rows WHERE this condition is True':\n\n```python\nhigh_earners = df[df['salary'] > 80000]               # WHERE salary > 80000\nengineering = df[df['department'].isin(['Engineering', 'Sales'])]  # WHERE department IN (...)\n```\n\nThis `df[condition]` pattern is the Pandas equivalent of SQL's `WHERE`. Master it, and you can answer any filtering question in seconds.\n\n:::checkpoint\nWhat does df.iloc[0] return?\nA) The row with index label 0\nB) The first row by position (row 0, since counting starts at 0)\nC) The column named '0'\nD) The first column\nCorrect: B\n\n:::checkpoint\nWhat does df[df['salary'] > 75000] do?\nA) Returns all rows where salary > 75000 (the Pandas equivalent of SQL WHERE)\nB) Returns the salary column values > 75000\nC) Creates a new column\nD) Sorts by salary\nCorrect: A",
        quiz: [
          {
            question: "df.iloc[0] returns?",
            options: [
              "Index label 0 row",
              "First row by position",
              "Column '0'",
              "First column",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "df[df['salary'] > 75000] does what?",
            options: [
              "Rows with salary > 75000",
              "Salary column > 75000",
              "Creates column",
              "Sorts by salary",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does df['name'] return?",
            options: ["A DataFrame", "A Series", "A list", "A string"],
            correctAnswerIndex: 1,
          },
          {
            question: "What does df[['name', 'salary']] return?",
            options: [
              "A Series",
              "A DataFrame with selected columns",
              "A list",
              "A tuple",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between iloc and loc?",
            options: [
              "iloc uses integer position, loc uses label",
              "Same thing",
              "loc uses position, iloc uses label",
              "iloc is for rows, loc for columns",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w14-d4",
        title: "Day 4: Handling Missing Data",
        description: "Find and handle null values in DataFrames",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Real-world data is almost never clean. Missing values are common:\n\n**Checking for missing data:**\n```python\ndf.isnull().sum()       # count of nulls per column\ndf.isna().sum()         # same as isnull\n```\n\n**Handling missing data:**\n```python\ndf.dropna()              # drop rows with ANY null (use carefully!)\ndf.dropna(subset=['name'])  # drop rows where name is null\ndf.fillna(0)             # replace nulls with 0\ndf['salary'].fillna(df['salary'].mean())  # fill with average\n```\n\n**Strategy depends on context:**\n- Numerical columns ? fill with mean or median\n- Categorical columns ? fill with mode (most common value)\n- Critical columns ? drop the row (if few missing)\n- Time series ? forward fill (use previous valid value)\n\nNever ignore missing data. Decide how to handle each column deliberately.\n\n:::checkpoint\nWhat does df.fillna(0) do?\nA) Deletes all null values\nB) Replaces all null values with 0\nC) Finds null values\nD) Counts null values\nCorrect: B",
        quiz: [
          {
            question: "df.fillna(0) does what?",
            options: [
              "Deletes nulls",
              "Replaces nulls with 0",
              "Finds nulls",
              "Counts nulls",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between a list and a tuple?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Tuples are mutable, lists are immutable",
              "Same",
              "Lists are faster",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you read a CSV file in Pandas?",
            options: [
              "pd.read_csv()",
              "pd.load_csv()",
              "pd.open_csv()",
              "csv.read()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a Series in Pandas?",
            options: [
              "A one-dimensional labeled array",
              "A table with rows and columns",
              "A type of DataFrame",
              "A function",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What strategy should you use for missing numerical data?",
            options: [
              "Always delete the row",
              "Fill with mean or median",
              "Fill with zero always",
              "Leave them empty",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w14-d5",
        title: "Day 5: Mini-Project: Pandas Cleaning",
        description: "Clean messy data using Pandas techniques",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Clean a messy dataset with Pandas.\n\n**Requirements:**\n- Create a DataFrame with missing values and inconsistent data\n- Find and document all missing values\n- Fill missing salaries (hint: use the average)\n- Drop rows where critical data is missing\n- Fill remaining missing values with appropriate defaults\n- Verify no nulls remain\n\n**Hints:**\n- Use df.isnull().sum() to find missing values\n- Use df['column'].fillna(value) to fill missing values\n- Use df.dropna(subset=['column']) to drop rows\n- Document each choice with markdown explanations\n\n:::checkpoint\nWhat's the first step when handling missing data?\nA) Delete everything\nB) Find where the nulls are with isnull().sum()\nC) Fill everything with zeros\nD) Ignore the problem\nCorrect: B",
        quiz: [
          {
            question: "First step with missing data?",
            options: [
              "Delete everything",
              "Find nulls with isnull().sum()",
              "Fill with zeros",
              "Ignore",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you check for missing values in a DataFrame?",
            options: [
              "df.head()",
              "df.isnull().sum()",
              "df.shape",
              "df.dtypes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a Series in Pandas?",
            options: [
              "A one-dimensional labeled array",
              "A table with rows and columns",
              "A type of DataFrame",
              "A function",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "When should you use dropna() vs fillna()?",
            options: [
              "dropna removes rows, fillna replaces nulls with a value",
              "They do the same thing",
              "dropna replaces, fillna removes",
              "Neither handles missing data",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What is the best way to fill missing values in a salary column?",
            options: [
              "Fill with 0",
              "Fill with the average salary",
              "Delete all rows with missing salary",
              "Leave them as NaN",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week15",
    title: "Week 17: Data Manipulation (Month 4)",
    durationText: "WEEK 17",
    focus: "Python Basics, Pandas",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w15-d1",
        title: "Day 1: Groupby",
        description: "Group data and apply aggregations per group",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Remember SQL's GROUP BY from Week 6? You asked questions like *\"What's the average salary per department?\"* and got one row per department with the average. Pandas `groupby` does the same thing  but with way more flexibility.\n\nHere's a common scenario: You're the HR analyst. The CEO sends an email: *\"I need a breakdown of our workforce. Average salary by department, employee count by department, and the hire date of the earliest employee in each department. By lunch.\"*\n\nIn Pandas, this is one operation:\n\n```python\nimport pandas as pd\n\n# Average salary by department\ndf.groupby('department')['salary'].mean()\n\n# Multiple statistics at once  mean, median, and count\ndf.groupby('department')['salary'].agg(['mean', 'median', 'count'])\n```\n\n**Groupby works in three steps: Split ? Apply ? Combine**\n1. **Split**  Pandas splits the DataFrame into groups based on 'department' (Engineering, Marketing, Sales)\n2. **Apply**  For each group, it runs the function you specified (mean, sum, count, etc.)\n3. **Combine**  It merges the group results back into a single output\n\n**Grouping by multiple columns  e.g., department AND manager:**\n```python\ndf.groupby(['department', 'manager'])['salary'].sum()\n```\n\n**Different functions for different columns  answering the CEO's full request:**\n```python\ndf.groupby('department').agg({\n  'salary': 'mean',     # average salary for each dept\n  'name': 'count',      # number of employees in each dept\n  'hire_date': 'min'    # earliest hire date in each dept\n})\n```\n\nOne line of code. Three questions answered. Lunch saved.\n\nGroupby is the most powerful Pandas operation for summary analysis. If you master only one Pandas feature, make it this one.\n\n:::checkpoint\nWhat does groupby do?\nA) Sorts the data\nB) Splits data into groups, applies a function to each, and combines the results\nC) Filters rows\nD) Joins two DataFrames\nCorrect: B",
        quiz: [
          {
            question: "What does groupby do?",
            options: [
              "Sorts data",
              "Groups rows and applies function per group",
              "Filters rows",
              "Joins DataFrames",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a Series in Pandas?",
            options: [
              "A one-dimensional labeled array",
              "A table with rows and columns",
              "A type of DataFrame",
              "A function",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the apply() function do in Pandas?",
            options: [
              "Applies a function along an axis of DataFrame",
              "Creates a new column",
              "Applies formatting",
              "Updates values",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a lambda function in Python?",
            options: [
              "A named function",
              "A small anonymous function defined with lambda keyword",
              "A recursive function",
              "A built-in function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you merge two DataFrames in Pandas?",
            options: [
              "Using pd.concat()",
              "Using pd.merge()",
              "Using df.join()",
              "All of the above depending on use case",
            ],
            correctAnswerIndex: 3,
          },
        ],
      },
      {
        id: "w15-d2",
        title: "Day 2: Merging DataFrames",
        description: "Join DataFrames like SQL tables",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Real data is never in one table. Sales are in one file, product details in another, customer info in a third. To answer real questions, you need to combine them  just like SQL JOINs.\n\nScenario: You have two files. One lists employees with their department IDs. Another has department names and budgets. Your boss wants: *\"Give me each employee's name with their department name and budget.\"*\n\n```python\nemployees = pd.DataFrame({\n  'emp_id': [1, 2, 3],\n  'name': ['Alice', 'Bob', 'Charlie'],\n  'dept_id': [101, 102, 101]\n})\nprint(employees)\nprint()\n\ndepartments = pd.DataFrame({\n  'dept_id': [101, 102],\n  'dept_name': ['Engineering', 'Sales']\n})\nprint(departments)\nprint()\n\n# INNER JOIN  only employees whose department exists in departments\nmerged = pd.merge(employees, departments, on='dept_id', how='inner')\nprint('INNER JOIN:')\nprint(merged)\nprint()\n\n# LEFT JOIN  all employees, with department name if available\nmerged = pd.merge(employees, departments, on='dept_id', how='left')\nprint('LEFT JOIN:')\nprint(merged)\n```\n\n`pd.merge()` finds rows where the `dept_id` matches in both tables and combines them into one. The `how` parameter works exactly like SQL joins:\n\n- `how='inner'`  only rows that match in BOTH tables\n- `how='left'`  all rows from the LEFT table, NULLs where no match in right\n- `how='right'`  all rows from the RIGHT table\n- `how='outer'`  all rows from BOTH tables\n\n**What if the key columns have different names?**\n\nSometimes the employee table has `dept_id` and the department table has `id`. Use `left_on` and `right_on`:\n\n```python\nresult = pd.merge(employees, departments, left_on='dept_id', right_on='id')\nprint(result)\n```\n\nMerge is the Pandas superpower that makes you look like a wizard  combining scattered data into a unified answer in one line.\n\n:::checkpoint\nWhat Pandas function merges two DataFrames?\nA) df.concat()\nB) pd.merge()  combines tables based on a common column, like SQL JOIN\nC) df.join_all()\nD) pd.combine()\nCorrect: B",
        quiz: [
          {
            question: "Which function merges DataFrames?",
            options: [
              "df.concat()",
              "pd.merge()",
              "df.join_all()",
              "pd.combine()",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a lambda function in Python?",
            options: [
              "A named function",
              "A small anonymous function defined with lambda keyword",
              "A recursive function",
              "A built-in function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does groupby() do in Pandas?",
            options: [
              "Groups data and applies aggregate functions per group",
              "Sorts data by column",
              "Filters rows by condition",
              "Creates a pivot table",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you read a CSV file in Pandas?",
            options: [
              "pd.read_csv()",
              "pd.load_csv()",
              "pd.open_csv()",
              "csv.read()",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w15-d3",
        title: "Day 3: Pivot Tables",
        description: "Reshape data with pivot tables in Pandas",
        type: "learn",
        duration: "45-60 mins",
        content:
          "You have sales data across multiple regions, products, and months. Your boss wants: *\"Show me average sales by region, with products as columns, and give me the grand total.\"* Excel pivot tables do this. Pandas `pivot_table` does it better.\n\n**The classic pivot  average salary by department AND manager:**\n```python\npivot = df.pivot_table(\n  values='salary',\n  index='department',\n  columns='manager',\n  aggfunc='mean'\n)\n```\n\nThis creates a table where each row is a department, each column is a manager, and the cells show the average salary. Empty cells = no data for that combination.\n\n**Parameters explained (they're the same 4 questions every pivot answers):**\n- `values`  which numbers do we summarize? (salary)\n- `index`  what goes in the rows? (department)\n- `columns`  what goes in the columns? (manager, optional)\n- `aggfunc`  how do we combine? ('mean', 'sum', 'count', etc.)\n\n**Add a Grand Total row/column (like Excel's margins):**\n```python\npivot = df.pivot_table(\n  values='salary',\n  index='department',\n  aggfunc='mean',\n  margins=True\n)\n```\n\nPivot tables turn raw data into boardroom-ready summaries in seconds.\n\n:::checkpoint\nWhat does index in pivot_table specify?\nA) The values to aggregate\nB) The rows of the output table\nC) The columns of the output table\nD) The aggregation function\nCorrect: B",
        quiz: [
          {
            question: "What does index in pivot_table specify?",
            options: [
              "Values to aggregate",
              "Rows of output",
              "Columns of output",
              "Agg function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does the apply() function do in Pandas?",
            options: [
              "Applies a function along an axis of DataFrame",
              "Creates a new column",
              "Applies formatting",
              "Updates values",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you merge two DataFrames in Pandas?",
            options: [
              "Using pd.concat()",
              "Using pd.merge()",
              "Using df.join()",
              "All of the above depending on use case",
            ],
            correctAnswerIndex: 3,
          },
          {
            question: "What is a Series in Pandas?",
            options: [
              "A one-dimensional labeled array",
              "A table with rows and columns",
              "A type of DataFrame",
              "A function",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w15-d4",
        title: "Day 4: Lambda Functions",
        description: "Use inline anonymous functions for transformations",
        type: "practice",
        duration: "45-60 mins",
        content:
          "You need to classify 10,000 customers into 'High spender' or 'Low spender' based on their total purchase amount. Writing a full function feels like overkill. You just want a quick 'if-this-then-that' rule applied across a column.\n\nThat's exactly what **lambda functions** are for  tiny, one-line functions you write inline without a formal `def` statement.\n\n```python\n# Regular function (verbose for simple logic):\ndef double(x): return x * 2\n\n# Lambda (same thing, one line):\ndouble = lambda x: x * 2\n```\n\nRead `lambda x: x * 2` as: 'A function that takes x and returns x times 2.'\n\n**Where lambdas shine  inside Pandas .apply():**\n\nThis is the most common use case. You have a column and want to transform each value:\n\n```python\n# Classify salaries as 'High' or 'Low'  one line, no def needed\ndf['salary_level'] = df['salary'].apply(lambda x: 'High' if x > 80000 else 'Low')\n\n# Make all names uppercase\ndf['name'] = df['name'].apply(lambda x: x.upper())\n\n# Apply to multiple columns at once\ndf[['salary', 'bonus']].apply(lambda col: col.max() - col.min())\n```\n\n**When to use a lambda vs. a regular function:**\n- **Lambda**  simple one-liner that fits in a single expression (no loops, no complex logic)\n- **Regular def**  anything more complex (multi-step logic, loops, reusable across projects)\n\nIf you find yourself writing a lambda that's longer than one line or has nested conditions, switch to a `def` function. Readability matters.\n\n:::checkpoint\nWhat's a lambda function?\nA) A named function defined with def\nB) A small anonymous function defined with the lambda keyword, useful for one-liners\nC) A type of loop\nD) A data structure\nCorrect: B",
        quiz: [
          {
            question: "What's a lambda function?",
            options: [
              "Named function with def",
              "Small anonymous function",
              "Type of loop",
              "Data structure",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a lambda function in Python?",
            options: [
              "A named function",
              "A small anonymous function defined with lambda keyword",
              "A recursive function",
              "A built-in function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you read a CSV file in Pandas?",
            options: [
              "pd.read_csv()",
              "pd.load_csv()",
              "pd.open_csv()",
              "csv.read()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does groupby() do in Pandas?",
            options: [
              "Groups data and applies aggregate functions per group",
              "Sorts data by column",
              "Filters rows by condition",
              "Creates a pivot table",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w15-d5",
        title: "Day 5: Mini-Project: Transformations",
        description: "Combine groupby, merge, pivot, and lambdas",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Use Pandas to transform data with groupby, merge, pivot, and lambdas.\n\n**Requirements:**\n1. Create sales and products DataFrames with a common product_id\n2. Merge them to add product names to sales data\n3. Group by product, compute total sales and quantity sold\n4. Create a pivot table showing sales by product and month\n5. Add a column categorizing sales as 'Low', 'Medium', or 'High' using apply + lambda\n\n**Hints:**\n- Use pd.merge(sales, products, on='product_id') to join\n- Use df.groupby('product')['sales'].sum() for aggregation\n- Use pd.pivot_table() with index='product', columns='month', values='sales'\n- Use df['category'] = df['sales'].apply(lambda x: 'High' if x > threshold else ...)\n- pd.melt() converts wide to long format for visualization\n\n:::checkpoint\nTo add product names to a sales DataFrame, you would use:\nA) groupby()\nB) merge()\nC) pivot_table()\nD) apply()\nCorrect: B",
        quiz: [
          {
            question: "To add product names to sales, use:",
            options: ["groupby()", "merge()", "pivot_table()", "apply()"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a Series in Pandas?",
            options: [
              "A one-dimensional labeled array",
              "A table with rows and columns",
              "A type of DataFrame",
              "A function",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does df.describe() show?",
            options: [
              "First 5 rows",
              "Summary statistics for numerical columns",
              "Column names and types",
              "Missing values",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you read a CSV file in Pandas?",
            options: [
              "pd.read_csv()",
              "pd.load_csv()",
              "pd.open_csv()",
              "csv.read()",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "weekOOP",
    title: "Week 17.5: Object-Oriented Python (Month 4)",
    durationText: "WEEK 17.5",
    focus: "OOP, Classes, Inheritance",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w_oop-d1",
        title: "Day 1: Classes & Objects",
        description:
          "Define classes, create objects, and understand attributes and methods",
        type: "learn",
        duration: "45-60 mins",
        content:
          '## What is Object-Oriented Programming?\n\nOOP is a way of organizing code around **objects** — bundles of data (attributes) and behavior (methods) that belong together. Instead of writing separate variables and functions, you group them into a single reusable blueprint called a **class**.\n\nYou already use OOP every day without realizing it: a Pandas DataFrame is a class. When you write `df.head()`, you\'re calling a method on a DataFrame object. When you check `df.shape`, you\'re reading an attribute. Understanding OOP helps you read library documentation, write reusable code, and pass technical interviews.\n\n## Defining a Class\n\n```python\nclass Customer:\n    """Represents a customer in an e-commerce system."""\n\n    def __init__(self, customer_id, name, email):\n        # __init__ runs automatically when you create a new object\n        self.customer_id = customer_id  # attribute\n        self.name = name                # attribute\n        self.email = email              # attribute\n        self.orders = []                # starts empty\n\n    def add_order(self, amount):\n        """Record a new order for this customer."""\n        self.orders.append(amount)\n\n    def total_spent(self):\n        """Return the customer\'s total spending."""\n        return sum(self.orders)\n\n    def is_high_value(self, threshold=1000):\n        return self.total_spent() > threshold\n\n    def __repr__(self):\n        """What prints when you type the object name."""\n        return f\'Customer({self.customer_id}, {self.name})\'\n```\n\n## Creating and Using Objects\n\n```python\n# Create objects (instances) from the class\nc1 = Customer(101, \'Alice\', \'alice@email.com\')\nc2 = Customer(102, \'Bob\',   \'bob@email.com\')\n\n# Use methods\nc1.add_order(250)\nc1.add_order(800)\nc2.add_order(150)\n\n# Read attributes\nprint(c1.name)           # Alice\nprint(c1.orders)         # [250, 800]\nprint(c1.total_spent())  # 1050\nprint(c1.is_high_value()) # True\nprint(c2.is_high_value()) # False\nprint(c1)                # Customer(101, Alice)\n```\n\n## Key Terms\n\n| Term | Meaning | Example |\n|---|---|---|\n| **Class** | Blueprint / template | `class Customer:` |\n| **Object / Instance** | A specific thing created from the blueprint | `c1 = Customer(...)` |\n| **Attribute** | Data stored on the object | `self.name` |\n| **Method** | Function that belongs to the class | `def total_spent(self):` |\n| **`self`** | Reference to the current object | Always first parameter |\n| **`__init__`** | Constructor — runs when object is created | Sets up attributes |\n\n:::checkpoint\nWhat does __init__ do?\nA) Deletes an object\nB) Runs automatically when a new object is created, setting up its attributes\nC) Returns the object to a function\nD) It is optional and rarely used\nCorrect: B\n\n:::checkpoint\nWhat is the difference between a class and an object?\nA) They are the same thing\nB) A class is the blueprint; an object is a specific instance created from it\nC) A class contains data; an object contains methods\nD) An object is always empty\nCorrect: B',
        quiz: [
          {
            question: "What is a class in Python?",
            options: [
              "A built-in function",
              "A blueprint that defines attributes and methods for objects",
              "A type of loop",
              "A file that stores data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does self refer to inside a method?",
            options: [
              "The class itself",
              "The current object instance",
              "The parent class",
              "The return value",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does __init__ do?",
            options: [
              "Deletes the object",
              "Runs automatically when a new object is created",
              "Prints the object",
              "Imports a module",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "How do you create an object from a class called Customer?",
            options: [
              "Customer.new()",
              "c = Customer(101, 'Alice', 'alice@email.com')",
              "create Customer()",
              "Customer.init()",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "A Pandas DataFrame is an example of:",
            options: [
              "A plain Python list",
              "An object (instance of a class)",
              "A SQL table",
              "A function",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_oop-d2",
        title: "Day 2: Inheritance, Encapsulation & Special Methods",
        description:
          "Extend classes with inheritance and understand OOP principles",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## Inheritance — Reusing and Extending Classes\n\nInheritance lets a new class (child) take all the attributes and methods of an existing class (parent) and add or change behavior. This follows the DRY principle — you write shared code once.\n\n```python\nclass Customer:\n    def __init__(self, customer_id, name, email):\n        self.customer_id = customer_id\n        self.name = name\n        self.email = email\n        self.orders = []\n\n    def add_order(self, amount):\n        self.orders.append(amount)\n\n    def total_spent(self):\n        return sum(self.orders)\n\n\n# PremiumCustomer INHERITS from Customer\nclass PremiumCustomer(Customer):\n    def __init__(self, customer_id, name, email, discount_rate):\n        super().__init__(customer_id, name, email)  # call parent __init__\n        self.discount_rate = discount_rate\n\n    def discounted_total(self):\n        return self.total_spent() * (1 - self.discount_rate)\n\n    # Override parent method\n    def add_order(self, amount):\n        discounted = amount * (1 - self.discount_rate)\n        self.orders.append(discounted)\n        print(f'Discount applied: ${amount:.2f} -> ${discounted:.2f}')\n\n\np = PremiumCustomer(201, 'Carol', 'carol@email.com', 0.10)\np.add_order(500)   # Discount applied: $500.00 -> $450.00\np.add_order(200)   # Discount applied: $200.00 -> $180.00\nprint(p.total_spent())       # 630.0\nprint(p.discounted_total())  # 630.0 (already discounted)\nprint(p.name)                # Carol (inherited from Customer)\n```\n\n## Encapsulation — Protecting Data\n\nEncapsulation hides the internal details of a class. In Python, use a single underscore (`_attr`) as a convention for 'private' attributes.\n\n```python\nclass BankAccount:\n    def __init__(self, balance):\n        self._balance = balance  # underscore = private by convention\n\n    def deposit(self, amount):\n        if amount > 0:\n            self._balance += amount\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            print('Insufficient funds')\n        else:\n            self._balance -= amount\n\n    def get_balance(self):\n        return self._balance  # controlled access\n\nacc = BankAccount(1000)\nacc.deposit(500)\nacc.withdraw(200)\nprint(acc.get_balance())  # 1300\n```\n\n## Special (Dunder) Methods\n\n```python\nclass Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\n    def __repr__(self):\n        return f'Product({self.name}, ${self.price})'\n\n    def __str__(self):\n        return f'{self.name}: ${self.price}'\n\n    def __lt__(self, other):   # enables < comparison\n        return self.price < other.price\n\np1 = Product('Widget', 10)\np2 = Product('Gadget', 25)\nprint(p1)            # Widget: $10\nprint(p1 < p2)       # True\nproducts = [p2, p1]\nprint(sorted(products))  # [Product(Widget, $10), Product(Gadget, $25)]\n```\n\n:::checkpoint\nWhat does super().__init__() do in a child class?\nA) Deletes the parent class\nB) Calls the parent class constructor to set up inherited attributes\nC) Creates a new object\nD) Skips the parent class entirely\nCorrect: B",
        quiz: [
          {
            question: "What is inheritance in OOP?",
            options: [
              "Copying code between files",
              "A child class reusing and extending a parent class",
              "A way to delete methods",
              "A type of loop",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does super().__init__() do?",
            options: [
              "Creates a new instance",
              "Calls the parent class constructor",
              "Deletes inherited attributes",
              "Prints the parent class",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does encapsulation mean?",
            options: [
              "Making all attributes public",
              "Hiding internal data and controlling access through methods",
              "Copying a class",
              "Combining two classes",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does __repr__ do?",
            options: [
              "Deletes the object",
              "Defines how the object looks when printed or inspected",
              "Creates a copy of the object",
              "Runs when the object is created",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is method overriding?",
            options: [
              "Deleting a method from the parent class",
              "The child class redefining a method from the parent class",
              "Calling two methods at once",
              "Adding a method to the parent class",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w_oop-d3",
        title: "Day 3: OOP in Data Science — Real Patterns",
        description: "Apply OOP to build reusable data analysis pipelines",
        type: "practice",
        duration: "45-60 mins",
        content:
          "## Why OOP Matters for Data Analysts\n\nYou use OOP every time you work with Pandas, Matplotlib, or Scikit-learn. Every `pd.DataFrame`, every `plt.Figure`, every `sklearn` model is an object. Understanding OOP helps you:\n- Read library documentation faster\n- Write reusable analysis pipelines\n- Build custom data tools\n- Answer Python interview questions confidently\n\n## OOP Pattern: Data Pipeline Class\n\nInstead of writing the same data cleaning steps in every script, package them in a class:\n\n```python\nimport pandas as pd\nimport numpy as np\n\nclass DataPipeline:\n    \"\"\"A reusable pipeline for loading, cleaning, and summarizing data.\"\"\"\n\n    def __init__(self, filepath):\n        self.filepath = filepath\n        self.df = None\n        self.is_clean = False\n\n    def load(self):\n        self.df = pd.read_csv(self.filepath)\n        print(f'Loaded {len(self.df)} rows, {len(self.df.columns)} columns')\n        return self  # enables method chaining\n\n    def clean(self, required_cols):\n        missing = [c for c in required_cols if c not in self.df.columns]\n        if missing:\n            raise ValueError(f'Missing columns: {missing}')\n        self.df = self.df.dropna(subset=required_cols)\n        self.df = self.df.drop_duplicates()\n        self.is_clean = True\n        print(f'After cleaning: {len(self.df)} rows remain')\n        return self\n\n    def summary(self):\n        if not self.is_clean:\n            print('Warning: data not cleaned yet')\n        return self.df.describe()\n\n    def top_n(self, column, n=5):\n        return self.df.nlargest(n, column)\n\n\n# Usage with method chaining\npipeline = DataPipeline('sales.csv')\nresult = (pipeline\n          .load()\n          .clean(required_cols=['customer_id', 'amount'])\n          .top_n('amount'))\nprint(result)\n```\n\n## OOP Pattern: Scikit-learn Estimators\n\nEvery ML model in Scikit-learn follows the same OOP interface:\n\n```python\nfrom sklearn.linear_model import LinearRegression\n\n# Create an object (instance of LinearRegression class)\nmodel = LinearRegression()\n\n# Call methods on the object\nmodel.fit(X_train, y_train)   # trains the model\npredictions = model.predict(X_test)  # makes predictions\n\n# Read attributes set by fit()\nprint(model.coef_)     # coefficients\nprint(model.intercept_) # intercept\n```\n\nAll Scikit-learn models are objects with `.fit()` and `.predict()` methods. Understanding OOP lets you use ANY model with the same pattern.\n\n## Polymorphism — Same Interface, Different Behavior\n\n```python\nclass CSVLoader:\n    def load(self, path):\n        return pd.read_csv(path)\n\nclass ExcelLoader:\n    def load(self, path):\n        return pd.read_excel(path)\n\ndef process_data(loader, path):\n    df = loader.load(path)  # same call, different behavior\n    return df.describe()\n\n# Works with any loader\nprocess_data(CSVLoader(), 'sales.csv')\nprocess_data(ExcelLoader(), 'sales.xlsx')\n```\n\n:::checkpoint\nWhy is understanding OOP useful when working with Pandas?\nA) Pandas does not use OOP\nB) DataFrames are objects; knowing OOP helps you read docs, understand methods, and build reusable tools\nC) OOP makes Pandas run faster\nD) OOP is only needed for web development\nCorrect: B",
        quiz: [
          {
            question: "In Scikit-learn, what does model.fit(X, y) do?",
            options: [
              "Creates a new model class",
              "Trains the model by calling a method on the model object",
              "Deletes the previous model",
              "Predicts output values",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is polymorphism in OOP?",
            options: [
              "Having two classes with different names",
              "Different objects responding to the same method call in different ways",
              "Copying a class to a new variable",
              "Deleting inherited methods",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is method chaining?",
            options: [
              "Calling multiple functions in nested parentheses",
              "Calling multiple methods in sequence on the same object by returning self",
              "Linking two classes together",
              "Repeating the same method call in a loop",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What are the 4 main principles of OOP?",
            options: [
              "Lists, Dicts, Loops, Functions",
              "Encapsulation, Inheritance, Polymorphism, Abstraction",
              "Variables, Classes, Objects, Files",
              "Import, Define, Return, Print",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "How does building a DataPipeline class improve your workflow?",
            options: [
              "It runs faster than plain functions",
              "It packages reusable cleaning/analysis steps so you don't rewrite them for every project",
              "It is required by Pandas",
              "It makes files smaller",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week16",
    title: "Week 18: EDA (Month 4)",
    durationText: "WEEK 18",
    focus: "Python Basics, Pandas",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w16-d1",
        title: "Day 1: Summary Statistics",
        description: "Use describe() and other stats to understand data",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Exploratory Data Analysis (EDA)** is the process of investigating data to discover patterns, spot anomalies, and test hypotheses  before formal modeling.\n\n**Summary statistics with describe():**\n```python\ndf.describe()              # count, mean, std, min, 25%, 50%, 75%, max\ndf.describe(include='object')  # stats for text columns\n```\n\n**Individual statistics:**\n```python\ndf['salary'].mean()\ndf['salary'].median()\ndf['salary'].std()\ndf['salary'].min()\ndf['salary'].max()\ndf['salary'].quantile([0.25, 0.5, 0.75])\n```\n\n**Value counts (for categorical data):**\n```python\ndf['department'].value_counts()\ndf['department'].value_counts(normalize=True)  # percentages\n```\n\nSummary statistics give you a high-level understanding of each column in seconds.\n\n:::checkpoint\nWhat does df.describe() show?\nA) The first 5 rows\nB) Summary statistics for numerical columns\nC) The column names\nD) Missing value counts\nCorrect: B",
        quiz: [
          {
            question: "What does df.describe() show?",
            options: [
              "First 5 rows",
              "Summary stats for numerical columns",
              "Column names",
              "Missing counts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does groupby() do in Pandas?",
            options: [
              "Groups data and applies aggregate functions per group",
              "Sorts data by column",
              "Filters rows by condition",
              "Creates a pivot table",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the apply() function do in Pandas?",
            options: [
              "Applies a function along an axis of DataFrame",
              "Creates a new column",
              "Applies formatting",
              "Updates values",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you merge two DataFrames in Pandas?",
            options: [
              "Using pd.concat()",
              "Using pd.merge()",
              "Using df.join()",
              "All of the above depending on use case",
            ],
            correctAnswerIndex: 3,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w16-d2",
        title: "Day 2: Outliers Detection",
        description: "Find outliers using IQR and z-score methods",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Outliers** are data points that differ significantly from other observations. They can skew your analysis.\n\n**Visual method  boxplot (conceptual for now):**\nPoints outside the whiskers (1.5 * IQR) are potential outliers.\n\n**Statistical method  IQR:**\n```python\nQ1 = df['salary'].quantile(0.25)\nQ3 = df['salary'].quantile(0.75)\nIQR = Q3 - Q1\nlower = Q1 - 1.5 * IQR\nupper = Q3 + 1.5 * IQR\noutliers = df[(df['salary'] < lower) | (df['salary'] > upper)]\n```\n\n**Z-score method:**\n```python\nfrom scipy import stats\nz_scores = stats.zscore(df['salary'])\noutliers = df[abs(z_scores) > 3]\n```\n\n**What to do with outliers:**\n- Investigate  are they data errors or genuine extremes?\n- Cap/winsorize  replace with threshold values\n- Remove  if clearly erroneous\n- Keep  if they represent real phenomena\n\n## Date Handling with pd.to_datetime()\n\nReal-world data often has dates stored as strings (like '2024-01-15'). Always convert them before analysis:\n\n```python\nimport pandas as pd\ndf = pd.read_csv('sales.csv')\n\n# Convert string column to datetime\ndf['date'] = pd.to_datetime(df['date'])\n\n# Extract date parts\ndf['year'] = df['date'].dt.year\ndf['month'] = df['date'].dt.month\ndf['weekday'] = df['date'].dt.day_name()\n\n# Filter by date range\nq1 = df[(df['date'] >= '2024-01-01') & (df['date'] <= '2024-03-31')]\n```\n\nWithout datetime dtype, sorting and filtering dates won't work correctly.\n\n:::checkpoint\nWhat's the IQR method for outlier detection?\nA) Points above mean + std\nB) Points below Q1 - 1.5*IQR or above Q3 + 1.5*IQR\nC) Points below 0\nD) Points with z-score < 3\nCorrect: B",
        quiz: [
          {
            question: "IQR outlier detection formula?",
            options: [
              "Above mean+std",
              "Below Q1-1.5*IQR or above Q3+1.5*IQR",
              "Below 0",
              "z-score < 3",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you merge two DataFrames in Pandas?",
            options: [
              "Using pd.concat()",
              "Using pd.merge()",
              "Using df.join()",
              "All of the above depending on use case",
            ],
            correctAnswerIndex: 3,
          },
          {
            question: "What is a Series in Pandas?",
            options: [
              "A one-dimensional labeled array",
              "A table with rows and columns",
              "A type of DataFrame",
              "A function",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the apply() function do in Pandas?",
            options: [
              "Applies a function along an axis of DataFrame",
              "Creates a new column",
              "Applies formatting",
              "Updates values",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does groupby() do in Pandas?",
            options: [
              "Groups data and applies aggregate functions per group",
              "Sorts data by column",
              "Filters rows by condition",
              "Creates a pivot table",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w16-d3",
        title: "Day 3: Correlation",
        description: "Measure relationships between numerical variables",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Correlation** measures how two variables move together  from -1 to +1.\n\n+1 = perfect positive correlation (both go up together)\n0 = no relationship\n-1 = perfect negative correlation (one goes up, other goes down)\n\n```python\n# Correlation matrix for all numerical columns\ncorr_matrix = df.corr()\n\n# Correlation between two specific columns\ndf['salary'].corr(df['years_experience'])\n```\n\n**Important:** Correlation does NOT imply causation. Ice cream sales and drowning incidents both rise in summer  they're correlated but one doesn't cause the other.\n\n**Heatmap visualization (conceptual):**\n```python\nimport seaborn as sns\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\n```\n\nUse correlation to find relationships worth investigating further.\n\n:::checkpoint\nWhat does a correlation of -0.8 mean?\nA) Strong positive relationship\nB) Strong negative relationship\nC) No relationship\nD) Weak relationship\nCorrect: B\n\n:::checkpoint\nDoes correlation imply causation?\nA) Yes, always\nB) No, never automatically  investigate further\nC) Yes, if > 0.9\nD) Only for negative correlations\nCorrect: B",
        quiz: [
          {
            question: "Correlation of -0.8 means?",
            options: [
              "Strong positive",
              "Strong negative",
              "No relationship",
              "Weak",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Does correlation imply causation?",
            options: [
              "Always",
              "No, investigate further",
              "Yes if > 0.9",
              "Only negative",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between a list and a tuple?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Tuples are mutable, lists are immutable",
              "Same",
              "Lists are faster",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the purpose of iloc vs loc in Pandas?",
            options: [
              "iloc uses integer position, loc uses label",
              "Same thing",
              "loc uses position, iloc uses label",
              "iloc is for rows, loc for columns",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w16-d4",
        title: "Day 4: Month 4 Review",
        description: "Review key Python and Pandas concepts from month 4",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Pandas Profiling** (ydata-profiling) generates a comprehensive EDA report with one line of code:\n\n```python\nfrom ydata_profiling import ProfileReport\nprofile = ProfileReport(df, title='EDA Report')\nprofile.to_file('eda_report.html')\n```\n\nThe report includes:\n- **Overview**  number of variables, rows, missing values, duplicates\n- **Each variable**  statistics, histogram, common values, extreme values\n- **Correlations**  heatmap of all variable relationships\n- **Missing values**  matrix and bar chart of nulls\n- **Sample**  first and last rows of the dataset\n\n**Manual EDA checklist:**\n1. Check shape and data types\n2. Check for missing values\n3. Summary statistics with describe()\n4. Value counts for categorical columns\n5. Correlation matrix\n6. Check for outliers\n7. Look for duplicates\n\nAlways do EDA before any analysis or modeling.\n\n## Rolling Averages in Pandas\n\nA **rolling average** (moving average) smooths short-term fluctuations to reveal trends. It's the Pandas equivalent of SQL's window function running average.\n\n```python\n# 7-day rolling average of daily sales\ndf['sales_7day_avg'] = df['sales'].rolling(window=7).mean()\n\n# 30-day rolling average\ndf['sales_30day_avg'] = df['sales'].rolling(window=30).mean()\n\n# Rolling sum (trailing 7-day total)\ndf['sales_7day_total'] = df['sales'].rolling(window=7).sum()\n\n# Rolling with min_periods (allow partial windows at start)\ndf['sales_7day_avg'] = df['sales'].rolling(window=7, min_periods=1).mean()\n```\n\nThe `.rolling(window=N)` method creates a window of N rows, then `.mean()`, `.sum()`, `.std()` etc. compute over each window. The first N-1 rows will be NaN unless you set `min_periods=1`.\n\n**Use case:** Monthly sales reports often compare this month's rolling average vs last month's to filter out day-of-week effects.\n\n:::checkpoint\nWhat does ydata-profiling generate?\nA) A machine learning model\nB) A comprehensive EDA report\nC) Cleaned data\nD) A visualization\nCorrect: B",
        quiz: [
          {
            question:
              "When writing a reusable data validation function, which checks should it perform?",
            options: [
              "Only check for null values",
              "Check required columns exist, null percentages, value ranges, date validity, and duplicates",
              "Only check column names",
              "Only check the row count",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does ydata-profiling generate?",
            options: [
              "ML model",
              "Comprehensive EDA report",
              "Cleaned data",
              "Visualization",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you read a CSV file in Pandas?",
            options: [
              "pd.read_csv()",
              "pd.load_csv()",
              "pd.open_csv()",
              "csv.read()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the difference between a list and a tuple?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Tuples are mutable, lists are immutable",
              "Same",
              "Lists are faster",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the purpose of iloc vs loc in Pandas?",
            options: [
              "iloc uses integer position, loc uses label",
              "Same thing",
              "loc uses position, iloc uses label",
              "iloc is for rows, loc for columns",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w16-d5",
        title: "Day 5: Month 4 Capstone: EDA Notebook",
        description: "Create a complete EDA notebook on a dataset",
        type: "project",
        duration: "2-3 hrs",
        content:
          "Your Month 4 Capstone: create a complete EDA notebook on a dataset.\n\n**Deliverable:** A Jupyter notebook with sections for:\n1. Load a sample dataset\n2. Summary statistics (describe numerical columns, count categorical)\n3. Missing value analysis\n4. Correlation analysis with written observations\n5. Outlier detection\n6. Summary of key insights (3-5 sentences)\n\n**Hints:**\n- df.describe() for numerical stats, df['col'].value_counts() for categorical\n- df.isnull().sum() for missing values\n- df.corr() for correlation matrix; use sns.heatmap() to visualize\n- IQR method: Q3 - Q1, outliers are below Q1-1.5*IQR or above Q3+1.5*IQR\n- z-score method: outliers have |z| > 3\n- Each section should have markdown headers explaining your approach\n\n:::checkpoint\nWhat is the purpose of EDA?\nA) To build a machine learning model\nB) To understand data patterns, spot issues, and generate hypotheses\nC) To clean all data\nD) To export data to CSV\nCorrect: B",
        quiz: [
          {
            question: "Purpose of EDA?",
            options: [
              "Build ML model",
              "Understand patterns, spot issues, generate hypotheses",
              "Clean data",
              "Export CSV",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the difference between a list and a tuple?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Tuples are mutable, lists are immutable",
              "Same",
              "Lists are faster",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you handle missing values in Pandas?",
            options: [
              "Using dropna() or fillna()",
              "Delete the column",
              "Use replace()",
              "Use apply()",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does groupby() do in Pandas?",
            options: [
              "Groups data and applies aggregate functions per group",
              "Sorts data by column",
              "Filters rows by condition",
              "Creates a pivot table",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the apply() function do in Pandas?",
            options: [
              "Applies a function along an axis of DataFrame",
              "Creates a new column",
              "Applies formatting",
              "Updates values",
            ],
            correctAnswerIndex: 0,
          },
        ],
        requirements: [
          "Load and inspect data",
          "Summary statistics",
          "Missing value analysis",
          "Correlation matrix",
          "Outlier detection",
          "Written summary of findings",
        ],
      },
    ],
  },
  {
    id: "week17",
    title: "Week 19: Python Viz (Month 5)",
    durationText: "WEEK 19",
    focus: "Data Visualization & BI",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w17-d1",
        title: "Day 1: Matplotlib Basics",
        description: "Create basic plots with the foundation viz library",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Matplotlib** is the foundation of data visualization in Python. It gives you full control over every element of a plot.\n\n**Basic line plot:**\n```python\nimport matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [10, 15, 13, 18, 20]\n\nplt.plot(x, y)\nplt.title('Monthly Revenue')\nplt.xlabel('Month')\nplt.ylabel('Revenue ($)')\nplt.show()\n```\n\n**Subplots  multiple charts in one figure:**\n```python\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\naxes[0].plot(x, y)\naxes[1].bar(x, y)\nplt.tight_layout()\nplt.show()\n```\n\nMatplotlib can feel low-level, but it's powerful. Most other viz libraries (Seaborn, Plotly) build on it.\n\n:::checkpoint\nWhich function displays a plot in Matplotlib?\nA) plt.display()\nB) plt.show()\nC) plt.render()\nD) plt.output()\nCorrect: B",
        quiz: [
          {
            question: "Which function displays a Matplotlib plot?",
            options: [
              "plt.display()",
              "plt.show()",
              "plt.render()",
              "plt.output()",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does plt.subplots() return?",
            options: [
              "A single plot",
              "A figure and an array of axes",
              "A list of figures",
              "A single axis",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which Matplotlib function creates a bar chart?",
            options: ["plt.plot()", "plt.bar()", "plt.scatter()", "plt.hist()"],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w17-d2",
        title: "Day 2: Line & Bar Charts",
        description: "Build trend lines and comparison bars",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Line charts** show trends over time. **Bar charts** compare categories.\n\n**Line chart  sales trend:**\n```python\nmonths = ['Jan', 'Feb', 'Mar', 'Apr']\nsales = [12000, 15000, 13000, 18000]\nplt.plot(months, sales, marker='o', linestyle='-', color='blue')\nplt.title('Monthly Sales Trend')\nplt.show()\n```\n\n**Bar chart  sales by product:**\n```python\nproducts = ['Widget A', 'Widget B', 'Widget C']\nquantities = [150, 230, 180]\nplt.bar(products, quantities, color=['red', 'blue', 'green'])\nplt.title('Sales by Product')\nplt.show()\n```\n\n**Best practices:**\n- Line charts for continuous data (time series)\n- Bar charts for categorical comparisons\n- Always label axes and add a title\n- Use color intentionally, not randomly\n\n:::checkpoint\nWhen should you use a line chart vs a bar chart?\nA) Line for categories, bar for time\nB) Line for trends over time, bar for comparing categories\nC) They're interchangeable\nD) Line for small data, bar for large data\nCorrect: B",
        quiz: [
          {
            question: "Line vs bar chart?",
            options: [
              "Line for categories, bar for time",
              "Line for trends, bar for categories",
              "Same",
              "Line for small data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What marker parameter adds dots to a line chart?",
            options: [
              "marker='o'",
              "style='dotted'",
              "dot=True",
              "points=True",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What is the best chart type for comparing sales across products?",
            options: ["Line chart", "Bar chart", "Pie chart", "Scatter plot"],
            correctAnswerIndex: 1,
          },
          {
            question: "What should every chart include?",
            options: [
              "3D effects",
              "Labeled axes and a title",
              "At least 10 data points",
              "A legend even for single series",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w17-d3",
        title: "Day 3: Seaborn Introduction",
        description: "Make beautiful statistical plots with less code",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Seaborn** is built on Matplotlib and makes beautiful statistical plots with less code.\n\n```python\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Built-in dataset\ntips = sns.load_dataset('tips')\n\n# Bar plot with confidence intervals\nsns.barplot(x='day', y='total_bill', data=tips)\nplt.title('Average Bill by Day')\nplt.show()\n```\n\n**Common Seaborn plots:**\n```python\nsns.scatterplot(x='total_bill', y='tip', data=tips)       # scatter plot\nsns.boxplot(x='day', y='total_bill', data=tips)           # box plot\nsns.countplot(x='day', data=tips)                         # count plot\nsns.heatmap(df.corr(), annot=True)                        # correlation heatmap\n```\n\nSeaborn defaults are much prettier than plain Matplotlib. Use it for exploratory and presentation-ready plots.\n\n:::checkpoint\nWhat advantage does Seaborn have over Matplotlib?\nA) It's faster\nB) It makes statistical plots with less code and better defaults\nC) It can make 3D plots\nD) It doesn't need data\nCorrect: B",
        quiz: [
          {
            question: "Seaborn advantage over Matplotlib?",
            options: [
              "Faster",
              "Statistical plots with less code and better defaults",
              "3D plots",
              "No data needed",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which Seaborn function creates a scatter plot?",
            options: [
              "sns.lineplot()",
              "sns.scatterplot()",
              "sns.barplot()",
              "sns.countplot()",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does sns.heatmap(df.corr(), annot=True) show?",
            options: [
              "A heatmap of raw data values",
              "A correlation matrix with numeric labels",
              "A bar chart of correlations",
              "A line chart of correlations",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w17-d4",
        title: "Day 4: Histograms & Boxplots",
        description: "Visualize distributions and compare groups",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Histograms** show the distribution of a single numerical variable:\n\n```python\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Matplotlib histogram\nplt.hist(df['salary'], bins=10, edgecolor='black')\nplt.title('Salary Distribution')\nplt.show()\n\n# Seaborn histogram (better default style)\nsns.histplot(df['salary'], bins=10, kde=True)\nplt.title('Salary Distribution with KDE')\nplt.show()\n```\n\n**Boxplots** show distribution through quartiles and highlight outliers:\n```python\nsns.boxplot(x='department', y='salary', data=df)\nplt.title('Salary Distribution by Department')\nplt.show()\n```\n\n**What boxplots tell you:**\n- The box = middle 50% (Q1 to Q3)\n- The line inside = median\n- Whiskers = range (excluding outliers)\n- Dots beyond whiskers = potential outliers\n\nTry both on the employees dataset.\n\n:::checkpoint\nWhat does a boxplot show?\nA) Data trend over time\nB) Distribution through quartiles, median, and outliers\nC) Relationship between two variables\nD) Proportions of categories\nCorrect: B",
        quiz: [
          {
            question: "What does a boxplot show?",
            options: [
              "Trend over time",
              "Distribution via quartiles, median, outliers",
              "Two-variable relationship",
              "Category proportions",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does the 'bins' parameter in plt.hist() control?",
            options: [
              "The width of bars",
              "The number of intervals the data is divided into",
              "The color of bars",
              "The chart title",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does kde=True add to a Seaborn histogram?",
            options: [
              "A color legend",
              "A smooth density curve over the histogram",
              "Grid lines",
              "Data labels",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "In a boxplot, what does the box represent?",
            options: [
              "The full data range",
              "The middle 50% of data (Q1 to Q3)",
              "The top 25% of data",
              "The bottom 25% of data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What do dots beyond the whiskers in a boxplot indicate?",
            options: [
              "Data errors",
              "Potential outliers",
              "Missing values",
              "The median",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w17-d5",
        title: "Day 5: Mini-Project: Python Dashboards",
        description: "Create a dashboard with multiple chart types",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Create a small dashboard of charts using Matplotlib and Seaborn:\n\n1. **Line chart**  a simple time series trend\n2. **Bar chart**  compare categories (e.g., sales by product)\n3. **Histogram**  distribution of a numerical column\n4. **Boxplot**  compare distributions across groups\n5. **Scatter plot**  relationship between two numerical columns\n\nArrange them in a 2x3 subplot grid. Add titles and labels to every chart.\n\n:::checkpoint\nWhat is a subplot?\nA) A small plot inside a larger plot\nB) Multiple charts arranged in a grid within one figure\nC) A plot with two y-axes\nD) A plot without labels\nCorrect: B",
        quiz: [
          {
            question: "What is a subplot?",
            options: [
              "Plot inside larger plot",
              "Multiple charts in one figure grid",
              "Plot with two y-axes",
              "Plot without labels",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does plt.tight_layout() do?",
            options: [
              "Makes the figure smaller",
              "Adjusts subplot spacing to prevent overlap",
              "Locks the aspect ratio",
              "Removes empty space from the figure",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What type of chart shows the relationship between two numerical variables?",
            options: ["Bar chart", "Scatter plot", "Histogram", "Pie chart"],
            correctAnswerIndex: 1,
          },
          {
            question: "Which function creates a count plot in Seaborn?",
            options: [
              "sns.countplot()",
              "sns.barplot()",
              "sns.histplot()",
              "sns.boxplot()",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "week18",
    title: "Week 20: BI Tools (Month 5)",
    durationText: "WEEK 20",
    focus: "Data Visualization & BI",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w18-d1",
        title: "Day 1: What is BI?",
        description: "Understand Business Intelligence and the BI workflow",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Business Intelligence (BI)** transforms raw data into actionable insights through dashboards, reports, and visualizations.\n\n**BI tools:** Power BI, Tableau, Looker, Metabase\n\n**The BI workflow:**\n1. **Connect**  pull data from databases, files, or cloud services\n2. **Transform**  clean and shape the data\n3. **Model**  define relationships between tables\n4. **Visualize**  build charts and dashboards\n5. **Share**  publish reports for stakeholders\n\n**BI vs. Python:**\n- Python is better for complex analysis and custom automation\n- BI tools are better for interactive dashboards and self-service reporting\n- Most data teams use both: Python for back-end, BI for front-end\n\nThink of BI as the 'presentation layer'  making insights accessible to non-technical decision-makers.\n\n:::checkpoint\nWhat's the main purpose of BI tools?\nA) Writing code\nB) Turning data into interactive dashboards and reports for decision-makers\nC) Storing data\nD) Cleaning data\nCorrect: B",
        quiz: [
          {
            question: "Main purpose of BI tools?",
            options: [
              "Write code",
              "Turn data into dashboards for decisions",
              "Store data",
              "Clean data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the first step in the BI workflow?",
            options: [
              "Visualize",
              "Connect to data sources",
              "Share reports",
              "Model data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is cross-filtering in BI?",
            options: [
              "Selecting one visual filters related visuals",
              "Deleting multiple filters",
              "Filtering across data sources",
              "A drill-through action",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w18-d2",
        title: "Day 2: Connecting Data",
        description: "Connect BI tools to various data sources",
        type: "practice",
        duration: "45-60 mins",
        content:
          "The first step in any BI tool is connecting to your data source.\n\n**Common data sources:**\n- Databases (SQL Server, PostgreSQL, MySQL)\n- Files (Excel, CSV, JSON)\n- Cloud services (Google Analytics, Salesforce, Azure)\n- Web APIs\n\n**In Power BI  Get Data:**\n1. Click 'Get Data' ? choose source type\n2. Enter connection details (server, database, file path)\n3. Preview the data\n4. Click 'Load' or 'Transform Data'\n\n**In Tableau  Connect:**\n1. Click 'Connect to Data' ? choose source\n2. Drag tables onto the canvas\n3. Define relationships between tables\n\n**Best practice:** Always do a quick data check after connecting  verify row counts, column names, and data types.\n\n:::checkpoint\nWhat's the first step in building a BI dashboard?\nA) Create a chart\nB) Connect to a data source\nC) Format colors\nD) Share with stakeholders\nCorrect: B",
        quiz: [
          {
            question: "First step in building a BI dashboard?",
            options: [
              "Create chart",
              "Connect to data source",
              "Format colors",
              "Share",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is cross-filtering in BI?",
            options: [
              "Selecting one visual filters related visuals",
              "Deleting multiple filters",
              "Filtering across data sources",
              "A drill-through action",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is pre-attentive processing in visualization?",
            options: [
              "How the brain processes information before conscious attention",
              "A chart animation technique",
              "Data preprocessing",
              "A color theory",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w18-d3",
        title: "Day 3: Data Modeling in BI",
        description: "Design star schemas with fact and dimension tables",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Data modeling** in BI means defining how your tables relate to each other  like setting up foreign keys in a database.\n\n**Star schema  the standard BI model:**\n- **Fact table**  the central table with measurable data (sales, orders, transactions)\n- **Dimension tables**  descriptive data around the facts (customers, products, dates)\n\n```\n    customers ─── sales ─── products\n                      │\n                    dates\n```\n\n**In Power BI  Model view:**\n- Drag and drop to connect tables\n- Define relationships (one-to-many, many-to-many)\n- Set cross-filter direction\n\nA good data model makes building reports much easier. A bad model makes everything harder.\n\n:::checkpoint\nIn a star schema, what's the fact table?\nA) A table with descriptive attributes\nB) The central table with measurable data\nC) A table of dates\nD) A table with formatting rules\nCorrect: B",
        quiz: [
          {
            question: "In star schema, the fact table is?",
            options: [
              "Descriptive attributes",
              "Central measurable data",
              "Date table",
              "Formatting rules",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a star schema?",
            options: [
              "A fact table surrounded by dimension tables",
              "A five-pointed table",
              "A type of chart",
              "A database management system",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the role of dimension tables in a star schema?",
            options: [
              "Store the measurable data",
              "Store descriptive attributes about the facts",
              "Store calculated measures",
              "Store raw transactions",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w18-d4",
        title: "Day 4: Calculated Columns",
        description: "Create new columns with formulas in BI tools",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Calculated columns** are new columns you create in your BI tool using formulas  like adding a column in Excel.\n\n**In Power BI (DAX):**\n```\nProfit = Sales[Revenue] - Sales[Cost]\n```\n\n**In Tableau (Calculated Fields):**\n```\nProfit = [Revenue] - [Cost]\n```\n\n**Common calculated columns:**\n- Profit = Revenue - Cost\n- Age = DATEDIFF(birth_date, TODAY(), YEAR)\n- Category = IF [Amount] > 1000 THEN 'High' ELSE 'Low'\n- Full Name = [First Name] & ' ' & [Last Name]\n\n**Calculated columns vs. measures:**\n- Calculated columns = row-by-row (like a new column in a table)\n- Measures = aggregate (like SUM, AVERAGE for the whole report)\n\nStart with calculated columns; they're more intuitive.\n\n:::checkpoint\nWhat's a calculated column in BI?\nA) A column imported from a database\nB) A new column created with a formula\nC) A chart type\nD) A filter\nCorrect: B",
        quiz: [
          {
            question: "What's a calculated column?",
            options: [
              "Imported column",
              "New column created with formula",
              "Chart type",
              "Filter",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does DAX stand for?",
            options: [
              "Data Analysis Expressions",
              "Dynamic Analysis XML",
              "Data Application Extension",
              "Direct Access XLS",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is cross-filtering in BI?",
            options: [
              "Selecting one visual filters related visuals",
              "Deleting multiple filters",
              "Filtering across data sources",
              "A drill-through action",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w18-d5",
        title: "Day 5: Mini-Project: First Report",
        description: "Build a simple BI report with charts and filters",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Build your first BI report using any tool (Power BI, Tableau, Google Looker Studio).\n\n**Requirements:**\n- Create or load sample sales data (date, product, region, amount)\n- Add a calculated column for profit margin\n- Create a bar chart showing sales by product\n- Create a line chart showing sales over time\n- Add a slicer/filter for region\n- Arrange into a one-page report and export\n\n**Hints:**\n- Start with a small dataset (50-100 rows)\n- Profit = Amount * margin percentage (typical margin ~30-40%)\n- A slicer lets users filter interactively\n- Keep it simple: one clear question answered per chart\n\n:::checkpoint\nWhat's the minimum needed for a useful BI report?\nA) 10 charts and lots of colors\nB) Connected data, a meaningful chart, and a filter\nC) Real-time data connection\nD) A published dashboard online\nCorrect: B",
        quiz: [
          {
            question: "Minimum for a useful BI report?",
            options: [
              "10 charts",
              "Connected data, chart, and filter",
              "Real-time connection",
              "Published online",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a calculated column in a BI report?",
            options: [
              "A column that exists in the source data",
              "A new column created by a formula, evaluated per row",
              "A column that filters data",
              "A column from a related table",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a star schema?",
            options: [
              "A fact table surrounded by dimension tables",
              "A five-pointed table",
              "A type of chart",
              "A database management system",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "week19",
    title: "Week 21: Advanced BI (Month 5)",
    durationText: "WEEK 21",
    focus: "Data Visualization & BI",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w19-d1",
        title: "Day 1: DAX Basics",
        description: "Learn Power BI's formula language for measures",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**DAX (Data Analysis Expressions)** is Power BI's formula language. It's similar to Excel formulas but works with tables and filters.\n\n**Basic DAX measures:**\n```\nTotal Sales = SUM(Sales[Amount])\nAverage Sale = AVERAGE(Sales[Amount])\nNumber of Orders = COUNTROWS(Sales)\n```\n\n**FILTER context  DAX calculates in context:**\nIf you put 'Total Sales' next to a product name, DAX automatically sums only that product's sales. This is called filter context.\n\n**CALCULATE  change the filter context:**\n```\nHigh Value Sales = CALCULATE(SUM(Sales[Amount]), Sales[Amount] > 1000)\n```\n\nDAX can be tricky at first. Start with simple SUM and COUNT measures, then gradually explore CALCULATE.\n\n## Tableau: Filters, Parameters, and Sets\n\nIn Tableau, these three concepts serve different filtering needs:\n\n**Filter:** Directly includes or excludes data from the view. Applied to dimensions or measures. *Example: Filter to show only 2024 data.*\n\n**Parameter:** A user-controlled input (dropdown, slider) that drives calculations, filters, or reference lines. Unlike filters, parameters can be used in formulas. *Example: Slider to set a revenue threshold, then color bars green/red based on it.*\n\n**Set:** A custom subset of data based on conditions. Unlike a filter, a set can be used in calculations (IN/OUT) and can be dynamic (top N) or fixed. *Example: Create a set of the top 10 customers by revenue, then compare them to everyone else.*\n\n**Key difference:** Filters remove data. Parameters enable what-if analysis. Sets define groups usable in calculations.\n\n:::checkpoint\nWhat is DAX used for?\nA) Cleaning data\nB) Writing formulas in Power BI\nC) Connecting to databases\nD) Creating charts\nCorrect: B",
        quiz: [
          {
            question: "What is DAX used for?",
            options: [
              "Cleaning data",
              "Writing formulas in Power BI",
              "Connecting databases",
              "Creating charts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d2",
        title: "Day 2: Calculated Fields",
        description: "Create aggregated measures for reports",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Calculated fields/measures** aggregate data across rows, unlike calculated columns which work row-by-row.\n\n**Key measures every report needs:**\n```\nTotal Revenue = SUM(Sales[Amount])\nTotal Cost = SUM(Sales[Cost])\nProfit = [Total Revenue] - [Total Cost]\nProfit Margin = DIVIDE([Profit], [Total Revenue])\nYoY Growth = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(Date[Date]))\n```\n\n**Measure vs. column  when to use which:**\n- Need a value per row (e.g., profit per product)? ? Calculated column\n- Need an aggregated value (e.g., total profit across all products)? ? Measure\n\n**Time intelligence measures** are powerful for business reporting:\n- Total sales this month vs. last month\n- Same period last year comparison\n- Running total YTD (Year to Date)\n\nStart with simple measures and build up to time intelligence.\n\n:::checkpoint\nWhat's the difference between a calculated column and a measure?\nA) They're the same thing\nB) Column works per row; measure works on aggregated data\nC) Column is faster\nD) Measure works per row\nCorrect: B",
        quiz: [
          {
            question: "Column vs measure difference?",
            options: [
              "Same",
              "Column per row, measure on aggregates",
              "Column faster",
              "Measure per row",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a star schema?",
            options: [
              "A fact table surrounded by dimension tables",
              "A five-pointed table",
              "A type of chart",
              "A database management system",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is cross-filtering in BI?",
            options: [
              "Selecting one visual filters related visuals",
              "Deleting multiple filters",
              "Filtering across data sources",
              "A drill-through action",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d3",
        title: "Day 3: Interactive Filters",
        description: "Add slicers and cross-filtering to dashboards",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Filters and slicers** let users interact with dashboards  filtering data to explore specific segments.\n\n**Slicers**  visual filter controls on the report canvas:\n- Dropdown slicer  select from a list\n- Date slicer  choose a date range\n- Timeline slicer  brush across time\n\n**Page-level and report-level filters:**\n- Page filter  applies to one page only\n- Report filter  applies to all pages\n- Drill-through  click a data point to see detailed view\n\n**Cross-filtering:**\nClick a bar in Chart A and Chart B automatically updates to show only that segment's data.\n\n**Best practice:**\n- Put the most important filters as slicers at the top\n- Use clear labels\n- Let users explore without breaking the layout\n\nInteractive filters turn a static report into a data exploration tool.\n\n:::checkpoint\nWhat does a slicer do in a BI report?\nA) Adds a new chart\nB) Lets users interactively filter data\nC) Deletes data\nD) Formats the report\nCorrect: B",
        quiz: [
          {
            question: "What does a slicer do?",
            options: [
              "Adds chart",
              "Lets users filter data interactively",
              "Deletes data",
              "Formats report",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What's the difference between a bar chart and a histogram?",
            options: [
              "Bar compares categories, histogram shows distribution of a continuous variable",
              "Same chart",
              "Bar is for time data",
              "Histogram compares categories",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d4",
        title: "Day 4: Visual Best Practices",
        description: "Design clean, accessible, effective dashboards",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Visual best practices**  the difference between a dashboard that's useful and one that's confusing.\n\n**1. Choose the right chart:**\n- Trends over time ? line chart\n- Category comparison ? bar chart\n- Part of a whole ? donut/treemap (but use sparingly)\n- Distribution ? histogram/boxplot\n- Relationship ? scatter plot\n\n**2. Less is more:**\n- Remove gridlines, borders, legends if not essential\n- Use color to highlight, not decorate\n- 3-5 colors max per dashboard\n\n**3. Design principles:**\n- Most important metric top-left (reading order)\n- Consistent fonts and colors\n- White space is not wasted space\n- Mobile-first or screen-size aware\n\n**4. Accessibility:**\n- Colorblind-friendly palettes (avoid red/green alone)\n- Clear labels and tooltips\n- Adequate font sizes\n\nGood design makes insights obvious at a glance.\n\n:::checkpoint\nHow many colors should a typical dashboard use?\nA) As many as possible\nB) 3-5 maximum, used intentionally\nC) Exactly 2\nD) At least 10\nCorrect: B",
        quiz: [
          {
            question: "How many colors for a dashboard?",
            options: [
              "As many as possible",
              "3-5 used intentionally",
              "Exactly 2",
              "At least 10",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is pre-attentive processing in visualization?",
            options: [
              "How the brain processes information before conscious attention",
              "A chart animation technique",
              "Data preprocessing",
              "A color theory",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is cross-filtering in BI?",
            options: [
              "Selecting one visual filters related visuals",
              "Deleting multiple filters",
              "Filtering across data sources",
              "A drill-through action",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d5",
        title: "Day 5: Mini-Project: Interactive Dashboard",
        description: "Build an interactive BI dashboard with measures",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Build an interactive dashboard.\n\n**Requirements:**\n- Create or connect to sales data (date, product, region, amount)\n- Create 3 measures (e.g., Total Sales, Average Sale, Profit Margin)\n- Build 3 visualizations (line chart for trends, bar chart for comparison, map or bar for regions)\n- Add slicers for date range and product category\n- Apply design best practices (consistent colors, clear labels, minimal clutter)\n- Test cross-filtering between charts\n\n**Hints:**\n- Profit Margin = (Sales - Cost) / Sales, assume ~30-40% margin\n- Slicers should filter all visuals on the dashboard\n- Cross-filtering: clicking a bar should filter the line chart\n\n:::checkpoint\nWhat should you test before sharing a dashboard?\nA) Cross-filtering  do interactions work correctly?\nB) That all colors are different\nC) That it has at least 10 charts\nD) That no filters are available\nCorrect: A",
        quiz: [
          {
            question: "Test before sharing a dashboard?",
            options: [
              "Cross-filtering works correctly",
              "All colors different",
              "10 charts minimum",
              "No filters available",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w19-d6",
        title: "Day 6: Advanced DAX",
        description: "Master CALCULATE, filter context, and time intelligence",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**CALCULATE** is the most important DAX function for Power BI. It changes the filter context of a calculation.\n\n**Basic CALCULATE syntax:**\n```dax\nTotal Sales = CALCULATE(SUM(Sales[Amount]))  // same as SUM, no change\nHigh Value Sales = CALCULATE(SUM(Sales[Amount]), Sales[Amount] > 1000)  // filter added\n```\n\nThe second argument (filter) tells DAX: 'Calculate this, but ONLY for rows that match this condition.'\n\n**Filter context vs Row context:**\n- **Row context**  'which row am I on?' (like Excel cell reference)\n- **Filter context**  'which rows are visible after filters are applied?'\n- **CALCULATE**  the only way to change filter context in a measure\n\n**Time intelligence with DAX:**\n```dax\nSales LY = CALCULATE(SUM(Sales[Amount]), SAMEPERIODLASTYEAR(Date[Date]))\nYTD Sales = TOTALYTD(SUM(Sales[Amount]), Date[Date])\n```\n\nTime intelligence functions make 'this month vs last month' or 'YTD' calculations trivial.\n\n:::checkpoint\nWhat does CALCULATE do in DAX?\nA) Deletes data\nB) Changes the filter context to calculate with different filters\nC) Creates a new table\nD) Formats numbers\nCorrect: B",
        quiz: [
          {
            question: "What does CALCULATE do in DAX?",
            options: [
              "Deletes data",
              "Changes filter context to calculate with different filters",
              "Creates a new table",
              "Formats numbers",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is cross-filtering in BI?",
            options: [
              "Selecting one visual filters related visuals",
              "Deleting multiple filters",
              "Filtering across data sources",
              "A drill-through action",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d7",
        title: "Day 7: Power BI Service",
        description: "Publish, share, and manage workspaces in the cloud",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Power BI Service** is the cloud platform where you publish, share, and manage reports.\n\n**Workspaces:**\n- **My Workspace**  personal area, only you see it\n- **Shared Workspaces**  team areas where multiple people collaborate\n- **Premium Workspaces**  enterprise features, larger datasets\n\n**Publishing from Power BI Desktop:**\n1. Click 'Publish' in Desktop\n2. Select workspace (or 'My Workspace')\n3. Open Power BI Service in browser to see your report\n\n**Sharing and permissions:**\n- **Share report**  give specific people access\n- **Publish to web**  public link (be careful  anyone can see it!)\n- **App**  bundle multiple reports for a department\n\n**Scheduled refresh:**\nSet your dataset to refresh automatically (daily, weekly) so reports stay current.\n\n:::checkpoint\nWhere do you publish a Power BI report to?\nA) Excel file\nB) Power BI Service (cloud)\nC) Local hard drive only\nD) PowerPoint\nCorrect: B",
        quiz: [
          {
            question: "Where do you publish a Power BI report to?",
            options: [
              "Excel file",
              "Power BI Service (cloud)",
              "Local hard drive only",
              "PowerPoint",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is pre-attentive processing in visualization?",
            options: [
              "How the brain processes information before conscious attention",
              "A chart animation technique",
              "Data preprocessing",
              "A color theory",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d8",
        title: "Day 8: Power BI Security",
        description:
          "Row-level security and gateways for enterprise deployment",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Row-Level Security (RLS)** restricts data access per user  one report, different data per viewer.\n\n**Scenario:** A regional manager should only see their region's data, not other regions.\n\n**Setting up RLS in Power BI:**\n1. Go to Modeling view in Desktop\n2. Create a role (e.g., 'East Region Manager')\n3. Define filter: [Region] = 'East'\n4. Test the role (View as Role)\n5. Publish to Service  security travels with the report\n\n**Gateways  bridge on-premises data to the cloud:**\n- **Personal gateway**  for one user, personal use\n- **On-premises data gateway**  for organizations, shared by many users\n\nWithout a gateway, Power BI Service cannot reach your on-prem SQL Server or file shares.\n\n:::checkpoint\nWhat does Row-Level Security do?\nA) Encrypts the entire report\nB) Shows different data to different users based on their role\nC) Makes the report read-only\nD) Deletes unused rows\nCorrect: B",
        quiz: [
          {
            question: "What does Row-Level Security do?",
            options: [
              "Encrypts the entire report",
              "Shows different data to different users based on their role",
              "Makes the report read-only",
              "Deletes unused rows",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the difference between a calculated column and a measure in BI?",
            options: [
              "Calculated column is per row, measure is aggregated",
              "Same",
              "Measure is per row, calculated column is aggregated",
              "Calculated column is for filters only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does DAX stand for?",
            options: [
              "Data Analysis Expressions",
              "Dynamic Analysis XML",
              "Data Application Extension",
              "Direct Access XLS",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How do you choose the right chart type?",
            options: [
              "Always use pie charts",
              "Depends on data type and the story you want to tell",
              "Use the most complex chart",
              "Use bar charts always",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w19-d9",
        title: "Day 9: Performance Optimization",
        description: "Reduce model size and optimize DAX for faster reports",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Performance optimization** makes reports load faster and feel snappier.\n\n**Reduce model size:**\n- Remove unused columns (hide or delete them)\n- Remove unused rows (filter at source if possible)\n- Choose appropriate data types (use Whole Number instead of Decimal when possible)\n\n**Optimize DAX measures:**\n- Avoid using CALCULATE in a loop (measure branching is better)\n- Use variables (VAR) to store intermediate results\n- Test with Performance Analyzer (View tab > Performance Analyzer)\n\n**Example of measure branching:**\n```dax\nTotal Sales = SUM(Sales[Amount])\nAvg Sales = AVERAGE(Sales[Amount])\nSales vs Target = [Total Sales] > 1000000  // reuse measure, don't recalculate\n```\n\n**Quick wins:**\n- Mark date tables as 'Date Table' (improves time intelligence)\n- Use Import mode instead of DirectQuery when possible\n- Limit visuals on a page (under 10 is ideal)\n\n:::checkpoint\nWhat's a quick way to reduce model size?\nA) Add more columns\nB) Remove unused columns and rows\nC) Use DirectQuery for everything\nD) Add more visuals to the page\nCorrect: B\n\n## Common Causes of Slow Dashboards\n\nA dashboard that takes 30+ seconds to load frustrates users. The most common causes:\n\n**1. Querying live data with no aggregation**\nEvery visual sends a raw query to the database. Without pre-aggregation, the database scans millions of rows for each chart.\n- Fix: Pre-aggregate in SQL or use Import mode instead of DirectQuery\n\n**2. Too many visuals on one page**\nEach visual is a separate query. 20+ visuals = 20+ queries competing for resources.\n- Fix: Limit to 5-10 visuals per page, use drill-through pages for detail\n\n**3. Complex DAX measures**\nHeavy CALCULATE chains, nested filters, and row-by-row iteration (SUMX) slow things down.\n- Fix: Simplify measures, pre-calculate columns, use variables\n\n**4. Large uncompressed datasets**\nImporting every column and row without filtering bloats the model.\n- Fix: Remove unused columns, filter rows at the source query\n\n**5. Missing or incorrect indexes**\nIf the source database lacks indexes on filtered/joined columns, queries run full table scans.\n- Fix: Add indexes on columns used in WHERE and JOIN (database-side)\n\nThe first step in fixing a slow dashboard is identifying the bottleneck: is it the database query, the DAX calculation, or the number of visuals?\n\n## Dashboard vs Report\n\nThese terms are often used interchangeably but they serve different purposes.\n\n**Dashboard:** A real-time or near-real-time view of key metrics. Designed for monitoring → glance at it daily to spot changes. Interactive (filters, drill-down). Usually limited to one page. *Example: Executive KPI dashboard showing revenue, users, churn rate.*\n\n**Report:** A structured document that answers specific questions with analysis and context. Designed for deep reading → includes narrative, methodology, and recommendations. Can be many pages. Usually static or with limited interactivity. *Example: Monthly marketing performance report with 10 pages of analysis.*\n\n**When to use which:**\n- Use a dashboard when someone needs to monitor metrics daily\n- Use a report when someone needs to understand *why* something happened\n- Both are valid → know your audience\n\n:::checkpoint\nWhat's the difference between a dashboard and a report?\nA) They're the same thing\nB) A dashboard is for monitoring key metrics at a glance; a report is for in-depth analysis and context\nC) Reports are always interactive\\D) Dashboards can only have one chart\nCorrect: B",
        quiz: [
          {
            question: "What's a quick way to reduce model size?",
            options: [
              "Add more columns",
              "Remove unused columns and rows",
              "Use DirectQuery for everything",
              "Add more visuals to the page",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a dashboard?",
            options: [
              "To display all possible data",
              "To communicate key metrics and insights at a glance",
              "To store raw data",
              "To run SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the data-ink ratio?",
            options: [
              "Ratio of ink used for data vs total ink in a chart",
              "Amount of data stored",
              "Chart size",
              "Color scheme ratio",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does DAX stand for?",
            options: [
              "Data Analysis Expressions",
              "Dynamic Analysis XML",
              "Data Application Extension",
              "Direct Access XLS",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a slicer in Power BI?",
            options: [
              "A visual filter that lets users filter data interactively",
              "A chart type",
              "A data connection",
              "A formula",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "week20",
    title: "Week 22: Storytelling (Month 5)",
    durationText: "WEEK 22",
    focus: "Data Visualization & BI",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w20-d1",
        title: "Day 1: Audience & Context",
        description: "Tailor data presentations to your audience",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Data storytelling** is the skill of communicating insights so your audience understands and acts on them. Charts alone aren't enough  you need context, narrative, and a clear message.\n\n**Three elements of data storytelling:**\n- **Data**  the facts and numbers\n- **Narrative**  the story connecting the facts\n- **Visuals**  charts that make the story clear\n\n**Know your audience:**\n- **Executives**  want the bottom line, key metrics, recommendations\n- **Analysts**  want detail, methodology, raw numbers\n- **Clients**  want clear value proposition, simple charts\n\n**Before you present, ask:**\n- What decision will this inform?\n- What does my audience already know?\n- What's the one thing they should remember?\n\nGreat data storytelling turns numbers into action.\n\n:::checkpoint\nWhat are the three elements of data storytelling?\nA) Data, code, and deployment\nB) Data, narrative, and visuals\nC) Charts, tables, and dashboards\nD) Questions, answers, and reports\nCorrect: B",
        quiz: [
          {
            question: "Three elements of data storytelling?",
            options: [
              "Data, code, deployment",
              "Data, narrative, visuals",
              "Charts, tables, dashboards",
              "Questions, answers, reports",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What should an executive get first in a data presentation?",
            options: [
              "Raw data tables",
              "The bottom line and key metrics",
              "Code snippets",
              "Technical methodology",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the one question to ask before presenting data?",
            options: [
              "What color scheme should I use?",
              "What decision will this inform?",
              "How many slides should I have?",
              "Which font is best?",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the narrative element in data storytelling?",
            options: [
              "The chart type chosen",
              "The story connecting the facts",
              "The dataset size",
              "The presentation software",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you present to analysts vs executives?",
            options: [
              "Same approach for both",
              "Executives want the bottom line, analysts want detail",
              "Analysts want less detail",
              "Executives want raw data",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w20-d2",
        title: "Day 2: Choosing Charts",
        description: "Select the right chart for your data and message",
        type: "practice",
        duration: "45-60 mins",
        content:
          "Choosing the wrong chart confuses your audience. Choosing the right one makes your point instantly.\n\n**Chart selection guide:**\n\n| Goal | Best Chart |\n|---|---|\n| Show trend over time | Line chart |\n| Compare categories | Bar chart (horizontal or vertical) |\n| Show part of whole | Donut / Treemap (sparingly) |\n| Show distribution | Histogram / Boxplot |\n| Show relationship | Scatter plot |\n| Show ranking | Sorted bar chart |\n| Show geographic data | Map |\n| Show change over two variables | Slope chart |\n\n**Rule of thumb:** If you need to explain how to read the chart, it's the wrong chart.\n\n**Avoid:**\n- Pie charts with >5 slices\n- 3D charts (distorts proportions)\n- Dual y-axes (misleading!)\n- Radar charts (hard to read)\n\n:::checkpoint\nWhat's the best chart for showing a trend over time?\nA) Pie chart\nB) Line chart\nC) Bar chart\nD) Scatter plot\nCorrect: B",
        quiz: [
          {
            question: "Best chart for trends over time?",
            options: ["Pie", "Line", "Bar", "Scatter"],
            correctAnswerIndex: 1,
          },
          {
            question: "What chart type is best for comparing categories?",
            options: ["Line chart", "Bar chart", "Pie chart", "Scatter plot"],
            correctAnswerIndex: 1,
          },
          {
            question: "Which chart is best for showing distribution?",
            options: [
              "Line chart",
              "Bar chart",
              "Histogram or boxplot",
              "Pie chart",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What is wrong with using a dual y-axis?",
            options: [
              "It uses too much ink",
              "It can distort relationships and mislead viewers",
              "It requires too much data",
              "It only works with bar charts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "When should you avoid pie charts?",
            options: [
              "When showing parts of a whole",
              "When you have more than 5 slices",
              "When data changes over time",
              "Never, pie charts are always appropriate",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w20-d3",
        title: "Day 3: Decluttering Graphs",
        description: "Remove chart junk and simplify visuals",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Chart junk**  visual elements that don't add information and distract the viewer.\n\n**Examples of clutter:**\n- Heavy gridlines\n- Decorative 3D effects\n- Excessive colors\n- Fancy fonts\n- Unnecessary borders\n\n**Before and after example:**\n- Before: 3D pie chart with 8 slices, rainbow colors, heavy grid, shadow effects\n- After: Simple horizontal bar chart, 2 colors (one highlighted), clean background\n\n**How to declutter:**\n1. Remove default borders and gridlines\n2. Use color only for the data point you want to highlight\n3. Label data directly instead of using separate legends\n4. Remove decimal places where not meaningful\n\nThe best visualization is invisible  it communicates without the viewer thinking about how it works.\n\n:::checkpoint\nWhat is chart junk?\nA) Data that's incorrect\nB) Visual elements that don't add information\nC) Charts with missing data\nD) Old charts\nCorrect: B",
        quiz: [
          {
            question: "What is chart junk?",
            options: [
              "Incorrect data",
              "Visual elements without information",
              "Missing data",
              "Old charts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is chart junk?",
            options: [
              "Incorrect data",
              "Visual elements without information",
              "Missing data",
              "Old charts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How can you declutter a chart effectively?",
            options: [
              "Add more colors",
              "Remove default borders and gridlines",
              "Use 3D effects",
              "Add decorative fonts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should you replace separate legends with?",
            options: [
              "Nothing, legends are required",
              "Direct data labels on the chart",
              "A footnote",
              "More colors",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the goal of decluttering a visualization?",
            options: [
              "Make charts look more complex",
              "Remove elements that distract from the data",
              "Add more decorative elements",
              "Use every color in the palette",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w20-d4",
        title: "Day 4: Month 5 Review",
        description: "Review key visualization and BI concepts from month 5",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Guiding your audience's attention is a design superpower. Use pre-attentive attributes  things the brain processes instantly:**\n\n**1. Color  the strongest attention-getter:**\n- Make the key data point a bright color, everything else gray\n- Your audience's eye goes to color first\n\n**2. Position  top-left gets most attention:**\n- Put the most important metric top-left (reading order)\n\n**3. Size  bigger implies more important:**\n- Key numbers should be larger\n- Secondary data should be smaller\n\n**4. Annotations  tell them what to see:**\n- Add callout boxes for key insights\n- 'Sales jumped 20% in March'\n\n**The one-chart test:** If your audience sees only one chart, what should it be? Make that chart the star.\n\n:::checkpoint\nWhat's the strongest pre-attentive attribute for focusing attention?\nA) Font size\nB) Color\nC) Position\nD) Shape\nCorrect: B",
        quiz: [
          {
            question: "Strongest pre-attentive attribute?",
            options: ["Font size", "Color", "Position", "Shape"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which position on a slide gets the most visual attention?",
            options: ["Bottom-right", "Top-left", "Center", "Bottom-left"],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you highlight the most important data point?",
            options: [
              "Make it small and gray",
              "Use a bright color with everything else gray",
              "Put it in a footnote",
              "Hide it until asked",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an annotation in a chart?",
            options: [
              "A chart title",
              "A callout box that highlights a specific insight",
              "A data label on every point",
              "A footnote about the data source",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the one-chart test?",
            options: [
              "Use only one chart in the entire presentation",
              "Identify the one most important chart and make it the star",
              "Test each chart on one person",
              "Create only one type of chart",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w20-d5",
        title: "Day 5: Month 5 Capstone: Presentation",
        description: "Create a data-driven presentation for leadership",
        type: "project",
        duration: "2-3 hrs",
        content:
          "Your Month 5 Capstone: prepare a data-driven presentation.\n\n**Scenario:** You're presenting quarterly sales results to company leadership.\n\n**Deliverable:** A presentation (PowerPoint, Google Slides, or PDF) with:\n\n1. **Title slide**  clear title, your name, date\n2. **Key takeaway slide**  the one thing leadership should remember\n3. **Trend slide**  line chart showing revenue over 4 quarters\n4. **Comparison slide**  bar chart comparing performance across regions\n5. **Detail slide**  one additional chart with a callout annotation\n6. **Recommendation slide**  what action should be taken based on the data\n\nApply all the principles: know your audience, choose the right charts, declutter, and focus attention.\n\n:::checkpoint\nWhat's the most important slide in a data presentation?\nA) The first slide with lots of charts\nB) The key takeaway slide  the one message the audience should remember\nC) The last slide with references\nD) The slide with the most data\nCorrect: B",
        quiz: [
          {
            question: "Most important slide in a presentation?",
            options: [
              "First with many charts",
              "Key takeaway  one message to remember",
              "Last with references",
              "Most data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "In the capstone scenario, who is the target audience?",
            options: [
              "Technical developers",
              "Company leadership",
              "External customers",
              "Data analysts",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the purpose of a recommendation slide?",
            options: [
              "To show all data collected",
              "To propose actions based on the data insights",
              "To list technical details",
              "To display raw SQL queries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a presentation for executives?",
            options: [
              "Start with methodology, end with results",
              "Start with the key takeaway, then support with charts",
              "Include every data point collected",
              "Avoid charts entirely",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should the key takeaway slide contain?",
            options: [
              "Multiple charts and tables",
              "The one message the audience should remember",
              "Technical methodology",
              "A list of all findings",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Title slide with clear message",
          "Key takeaway slide",
          "Line chart showing trend",
          "Bar chart comparing categories",
          "Annotation callout on chart",
          "Recommendation slide",
        ],
      },
    ],
  },
  {
    id: "week21",
    title: "Week 23: Statistics (Month 6)",
    durationText: "WEEK 23",
    focus: "Statistics & Job Launch",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w21-d1",
        title: "Day 1: Descriptive Stat",
        description: "Calculate mean, median, mode, and standard deviation",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Descriptive statistics** summarize data with numbers. They're the foundation of any analysis.\n\n**Measures of central tendency (the 'center'):**\n- **Mean**  average (sum / count). Sensitive to outliers.\n- **Median**  middle value when sorted. Robust to outliers.\n- **Mode**  most frequent value. Good for categorical data.\n\n**Measures of dispersion (the 'spread'):**\n- **Range**  max - min\n- **Variance**  average squared distance from the mean\n- **Standard deviation**  square root of variance (same units as data)\n- **IQR**  Q3 - Q1 (middle 50% of data)\n\n```python\nimport pandas as pd\nimport numpy as np\n\ndata = [10, 12, 14, 15, 18, 22, 45]\nnp.mean(data)    # 19.4\nnp.median(data)  # 15.0\nnp.std(data)     # 11.3\n```\n\nAlways check both mean and median. If they differ significantly, outliers may be skewing your data.\n\n## Sampling Methods\n\nYou rarely have data on everyone. Sampling lets you draw conclusions about a population from a subset.\n\n**Simple Random Sampling:** Every member has equal chance. Use random number generator. Most basic.\n\n**Stratified Sampling:** Divide population into groups (strata), then sample from each group proportionally. Ensures representation of subgroups. Example: sample equal number of customers from each region.\n\n**Cluster Sampling:** Divide into clusters (naturally occurring groups), randomly select clusters, then survey everyone in those clusters. Cheaper but less precise. Example: randomly select 10 schools, survey all students in those schools.\n\n**Systematic Sampling:** Select every nth member. Simple but can introduce bias if data has periodic patterns.\n\nChoose your sampling method based on: data structure, budget, and whether subgroup representation matters. Stratified is best when subgroup differences matter; cluster is best for geographically dispersed populations.\n\n:::checkpoint\nWhich measure of central tendency is most affected by outliers?\nA) Median\nB) Mean\nC) Mode\nD) IQR\nCorrect: B",
        quiz: [
          {
            question: "Which measure is most affected by outliers?",
            options: ["Median", "Mean", "Mode", "IQR"],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the weighted mean and when would you use it instead of the regular mean?",
            options: [
              "The weighted mean is always the same as the regular mean",
              "The weighted mean assigns different importance to each value — use it when some values should count more (e.g. course grades with different credit hours, or a portfolio return where positions have different sizes)",
              "The weighted mean removes outliers automatically",
              "The weighted mean is only used in machine learning",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "A student scores 80 on a 3-credit course and 90 on a 1-credit course. What is their weighted GPA?",
            options: [
              "85 (simple average)",
              "82.5 (weighted: (80*3 + 90*1) / 4)",
              "90 (highest score)",
              "80 (lowest score)",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the Central Limit Theorem?",
            options: [
              "Sample means follow normal distribution for large sample sizes",
              "All data is normally distributed",
              "Mean equals median",
              "Variance is zero",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a p-value in hypothesis testing?",
            options: [
              "Probability of observing results assuming null hypothesis is true",
              "Probability the null is true",
              "The significance level",
              "The sample mean",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is correlation vs causation?",
            options: [
              "Correlation measures relationship, causation means one causes the other",
              "Same thing",
              "Correlation always implies causation",
              "Causation can be inferred from correlation",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is a confidence interval?",
            options: [
              "Range of values likely containing the true population parameter",
              "Range of all data values",
              "Where you are confident about data quality",
              "Fixed value estimate",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w21-d2",
        title: "Day 2: Probability Distributions",
        description: "Understand normal, uniform, and binomial distributions",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Probability distributions** describe how values are spread across possible outcomes.\n\n**Normal distribution (bell curve):**\n- Symmetrical, most values near the mean\n- 68% of data within 1 standard deviation\n- 95% within 2 standard deviations\n- 99.7% within 3 standard deviations (empirical rule)\n\n**In Python  generate normal data:**\n```python\nimport numpy as np\ndata = np.random.normal(loc=50, scale=10, size=1000)  # mean=50, std=10\n```\n\n**Other common distributions:**\n- **Uniform**  all values equally likely\n- **Binomial**  number of successes in fixed trials (e.g., coin flips)\n- **Poisson**  count of events in fixed time (e.g., website visits per hour)\n\nUnderstanding distributions helps you choose the right statistical test and interpret your data correctly.\n\n:::checkpoint\nWhat percentage of data falls within 2 standard deviations of the mean in a normal distribution?\nA) 68%\nB) 95%\nC) 99.7%\nD) 50%\nCorrect: B",
        quiz: [
          {
            question: "% of data within 2 std devs in normal dist?",
            options: ["68%", "95%", "99.7%", "50%"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a confidence interval?",
            options: [
              "Range of values likely containing the true population parameter",
              "Range of all data values",
              "Where you are confident about data quality",
              "Fixed value estimate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the Central Limit Theorem?",
            options: [
              "Sample means follow normal distribution for large sample sizes",
              "All data is normally distributed",
              "Mean equals median",
              "Variance is zero",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does a boxplot show?",
            options: [
              "Trend over time",
              "Distribution through quartiles, median, and outliers",
              "Correlation between variables",
              "Category comparison",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a p-value in hypothesis testing?",
            options: [
              "Probability of observing results assuming null hypothesis is true",
              "Probability the null is true",
              "The significance level",
              "The sample mean",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w21-d3",
        title: "Day 3: Hypothesis Testing",
        description: "Learn null hypothesis, p-values, and significance",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Hypothesis testing**  a structured way to decide if a result is statistically significant or just random chance.\n\n**The process:**\n1. **Null hypothesis (H₀)**  there's no effect/change (status quo)\n2. **Alternative hypothesis (H₁)**  there IS an effect/change\n3. **Choose significance level (α)**  usually 0.05\n4. **Calculate p-value**  probability of seeing this result if H₀ is true\n5. **Compare**  if p-value < α, reject H₀ (result is significant)\n\n**Example:** Testing if a new website design increases conversion rate.\n- H₀: New design has same conversion as old design\n- H₁: New design has higher conversion\n- p-value = 0.02 ? reject H₀ ? new design works!\n\n**Key concept:** 'Statistically significant' doesn't mean 'practically important.' A tiny effect can be significant with enough data.\n\n**Type I and Type II Errors:**\n- **Type I error (false positive):** Rejecting H₀ when it's actually true. Probability = α (0.05).\n- **Type II error (false negative):** Failing to reject H₀ when it's actually false. Probability = α.\n- **Power = 1 - β:** Probability of detecting a real effect when it exists.\n\n**T-Tests  comparing two groups:**\n\n```python\nfrom scipy import stats\n\n# Independent t-test: compare two separate groups (e.g., control vs variant)\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\n\n# Paired t-test: same group before/after (e.g., pre-test vs post-test)\nt_stat, p_value = stats.ttest_rel(before, after)\n\n# One-sample t-test: compare group to a known value\nt_stat, p_value = stats.ttest_1samp(sample, population_mean)\n```\n\nThe t-test tells you if the difference between groups is statistically significant. Use it for comparing means of two groups.\n\n## Parametric vs Non-Parametric Tests\n\nStatistical tests fall into two categories based on their assumptions about the data.\n\n**Parametric tests** assume the data follows a known distribution (usually normal). They're more powerful but have stricter assumptions.\n- Examples: t-test, ANOVA, Pearson correlation, linear regression\n- Requirements: normally distributed data, similar variances (for some tests), continuous/interval data\n\n**Non-parametric tests** make no assumptions about the underlying distribution. They're safer when assumptions aren't met but less powerful.\n- Examples: Mann-Whitney U (alternative to t-test), Kruskal-Wallis (alternative to ANOVA), Spearman correlation\n- Requirements: none (work with ordinal data or non-normal distributions)\n\n**When to use which:**\n- Use parametric if data is normally distributed and sample is large enough\n- Use non-parametric if data is skewed, ordinal, or sample size is very small\n- When in doubt, run both \\u2014 if they agree, your conclusion is robust\n\n:::checkpoint\nWhat does a p-value of 0.03 mean at α = 0.05?\nA) There's a 3% chance the null hypothesis is true  fail to reject\nB) The result is statistically significant  reject the null hypothesis\nC) The alternative hypothesis is definitely true\nD) The test is invalid\nCorrect: B\n\n:::checkpoint\nWhat is a Type I error?\nA) Failing to reject H₀ when it's false\nB) Rejecting H₀ when it's actually true (false positive)\nC) A data entry mistake\nD) Using the wrong statistical test\nCorrect: B",
        quiz: [
          {
            question: "p-value 0.03 at α=0.05 means?",
            options: [
              "3% chance null is true  fail to reject",
              "Statistically significant  reject null",
              "Alternative true",
              "Invalid test",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a Type I error (false positive)?",
            options: [
              "Failing to reject the null when it's false",
              "Rejecting the null when it's actually true",
              "A data entry mistake",
              "Using the wrong test",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a Type II error (false negative)?",
            options: [
              "Failing to reject the null when it's actually false",
              "Rejecting the null when it's true",
              "A calculation error",
              "Too small a sample",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "When do you use an independent t-test?",
            options: [
              "To compare two independent groups (e.g., control vs variant)",
              "To compare three or more groups",
              "To compare a group to itself over time",
              "To measure correlation",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is statistical power?",
            options: [
              "The probability of detecting a real effect when it exists",
              "The probability of a Type I error",
              "The sample size",
              "The p-value threshold",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w21-d4",
        title: "Day 4: A/B Testing Concepts",
        description: "Design and analyze split tests",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**A/B testing** (split testing) compares two versions to see which performs better. It's the most common real-world application of hypothesis testing.\n\n**The A/B testing workflow:**\n1. **Define the metric**  what are you measuring? (click rate, conversion, revenue)\n2. **Split your audience**  randomly assign users to A (control) or B (variant)\n3. **Run the experiment**  collect data for a predetermined period\n4. **Analyze results**  calculate conversion rates and statistical significance\n5. **Make a decision**  implement B if it's significantly better\n\n**Common pitfalls:**\n- Stopping the test too early (peeking problem)\n- Too small sample size (low statistical power)\n- Not randomizing properly (selection bias)\n- Testing too many variations at once (multiple comparison problem)\n\n**Chi-square test  comparing categorical data:**\n\nUse chi-square when your data is categories (not numbers). Example: does gender affect product preference?\n\n```python\nfrom scipy.stats import chi2_contingency\nimport numpy as np\n\n# Contingency table: male/female x prefer A/prefer B\ntable = np.array([[30, 20], [15, 35]])\nchi2, p, dof, expected = chi2_contingency(table)\n```\n\n**ANOVA  comparing three or more groups:**\n\n```python\nfrom scipy.stats import f_oneway\n\n# Compare salaries across three departments\nf_stat, p_value = f_oneway(engineering, marketing, sales)\n```\n\nANOVA tells you if at least one group is different from the others (but not which one  use post-hoc tests for that).\n\n**Linear regression  modeling relationships:**\n\n```python\nfrom scipy.stats import linregress\n\nslope, intercept, r_value, p_value, std_err = linregress(x, y)\n```\n\nRegression quantifies the relationship between variables and can predict outcomes.\n\n## Simpson's Paradox\n\nSimpson's Paradox occurs when a trend appears in several groups of data but disappears or reverses when the groups are combined. It happens due to a **confounding variable** (lurking variable).\n\n**Classic example:**\n- University A accepts 80% of men and 60% of women. University B accepts 50% of men and 30% of women. University A seems biased against women, right?\n- But when you look by department: women mostly applied to competitive departments (low acceptance rate), while men mostly applied to easy departments (high acceptance rate). Within each department, acceptance rates are equal. The confounder is **department choice**.\n\n**How to avoid being tricked:**\n1. Always look for confounding variables\n2. Check disaggregated (grouped) data, not just aggregate\n3. Ask: 'Could a third variable explain this?'\n\nSimpson's Paradox is a reminder that correlation is not causation, and aggregated statistics can mislead.\n\nA/B testing is how data-driven companies make decisions  from button colors to pricing pages.\n\n:::checkpoint\nWhat's the 'peeking problem' in A/B testing?\nA) Looking at data before the test is complete and stopping early\nB) Not checking data at all\nC) Testing too many variables\nD) Having too large a sample size\nCorrect: A\n\n:::checkpoint\nWhen should you use ANOVA instead of a t-test?\nA) When comparing exactly two groups\nB) When comparing three or more groups\nC) When data is categorical\nD) When you have paired data\nCorrect: B",
        quiz: [
          {
            question: "Peeking problem in A/B testing?",
            options: [
              "Looking at data early and stopping",
              "Not checking data",
              "Too many variables",
              "Too large sample",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What type of data requires a chi-square test?",
            options: [
              "Numerical continuous data",
              "Categorical data (counts in categories)",
              "Time series data",
              "Geographic data",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does linear regression help you do?",
            options: [
              "Compare two group means",
              "Model the relationship between variables and make predictions",
              "Test for categorical association",
              "Rank data values",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does linregress return?",
            options: [
              "Just the p-value",
              "Slope, intercept, r-value, p-value, and standard error",
              "Only the slope and intercept",
              "The mean of x and y",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the multiple comparison problem?",
            options: [
              "Testing too many variations at once increases chance of false positives",
              "Comparing more than two groups is always invalid",
              "Having too many data points",
              "Running too few tests",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w21-d5",
        title: "Day 5: Mini-Project: A/B Test Analysis",
        description: "Analyze A/B test results with Python",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Analyze an A/B test using Python.\n\n**Scenario:** You're testing whether a website change improves conversion rate.\n\n**Requirements:**\n- Create sample data for control and variant groups\n- Calculate conversion rates for each group\n- Visualize with a bar chart\n- Run a statistical significance test\n- Interpret the result and make a recommendation\n\n**Hints:**\n- Typical sample: 1000 users per group with ~5-7% conversion\n- Use numpy.random.binomial() or manual arrays for sample data\n- Use scipy.stats.chi2_contingency or proportions_ztest\n- p-value < 0.05 is statistically significant\n\n:::checkpoint\nWhat's the minimum you need to analyze an A/B test?\nA) Only the control group's data\nB) Conversion data for both groups and a statistical test\nC) Just the conversion rates with no test\nD) At least 1 million users\nCorrect: B",
        quiz: [
          {
            question: "Minimum to analyze an A/B test?",
            options: [
              "Only control group",
              "Both groups' conversion data + statistical test",
              "Just conversion rates",
              "1M+ users",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is statistical power?",
            options: [
              "The probability of detecting a real effect when it exists (1 - beta)",
              "The significance level (alpha)",
              "The sample size",
              "The effect size",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does effect size measure?",
            options: [
              "The p-value of a test",
              "The magnitude of a difference, independent of sample size",
              "The sample size needed",
              "The significance level",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Before running an A/B test, what should you determine?",
            options: [
              "The p-value threshold",
              "The required sample size via power analysis",
              "The maximum possible conversion rate",
              "The cost of the experiment",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is a large sample size important?",
            options: [
              "It guarantees significance",
              "It increases statistical power and reduces the chance of Type II errors",
              "It makes the p-value smaller automatically",
              "It eliminates the need for hypothesis testing",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week22",
    title: "Week 24: Portfolio (Month 6)",
    durationText: "WEEK 24",
    focus: "Statistics & Job Launch",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w22-d1",
        title: "Day 1: Curating Projects",
        description: "Select your best work for a data portfolio",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Your **data portfolio** is your most powerful job-search tool. It shows employers what you can do  not just what you claim on your resume.\n\n**What to include:**\n- 3-5 projects showing different skills\n- At least one SQL project\n- At least one Python/Pandas project\n- At least one visualization/BI project\n- One capstone or comprehensive project\n\n**Project selection criteria:**\n- Does it demonstrate relevant skills?\n- Can you explain the business problem clearly?\n- Is the analysis thorough (not just one chart)?\n- Does it tell a story with data?\n\n**Quality over quantity**  3 excellent projects beat 10 mediocre ones.\n\nReview your work from Months 1-5. Select your strongest projects for the portfolio.\n\n## Pyramid Principle\n\nThe **Pyramid Principle** is a communication framework for structuring analysis findings. Start with the answer, then support it with grouped arguments.\n\n**Structure:**\n1. **Top**: Main conclusion/recommendation (1 sentence)\n2. **Middle**: 3-5 key supporting arguments\n3. **Bottom**: Evidence (data, charts, analysis) for each argument\n\n**Example (Sales decline analysis):**\n- **Top**: Sales declined 15% in Q3 due to customer churn in the SMB segment.\n- **Support**:\n  - SMB churn rate increased from 5% to 18% (data shows a pricing sensitivity issue)\n  - Enterprise segment remained flat (price increases had no effect)\n  - Competitor launched lower-priced alternative in August\n- **Evidence**: Churn charts, competitor pricing data, customer survey\n\nExecutives want the answer first, then supporting details. Never start with 'I looked at the data and here's what I found' → lead with your conclusion.\n\n## Analysis Memo Template\n\nAn **analysis memo** is a structured document that communicates findings to stakeholders.\n\n**Standard sections:**\n1. **Executive Summary**: Key finding + recommendation (3-5 sentences)\n2. **Background**: Why this analysis was done\n3. **Data & Methodology**: What data was used, how it was analyzed\n4. **Findings**: Charts + explanations, organized by question\n5. **Limitations**: Caveats, data gaps, assumptions\n6. **Recommendations**: Actionable next steps\n\nKeep it concise → stakeholders rarely read past page 2. Put detailed tables in an appendix.\n\n:::checkpoint\nHow many projects should a strong data portfolio include?\nA) 10-15\nB) 3-5 high-quality projects\nC) 1 project is enough\nD) As many as possible\nCorrect: B",
        quiz: [
          {
            question: "How many projects in a strong portfolio?",
            options: [
              "10-15",
              "3-5 high-quality",
              "1 is enough",
              "As many as possible",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should each portfolio project demonstrate?",
            options: [
              "Perfect code with no errors",
              "Real-world data skills and problem-solving ability",
              "The most complex algorithm possible",
              "At least 500 lines of code",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What tool is best for hosting a data portfolio?",
            options: [
              "Dropbox",
              "GitHub Pages",
              "Google Docs",
              "Microsoft Word",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should a project's description include?",
            options: [
              "Only the code",
              "The goal, tools used, and key findings",
              "The file size",
              "The date it was created",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should projects be organized in a portfolio?",
            options: [
              "Sorted by file size",
              "By relevance and quality, best projects first",
              "In alphabetical order",
              "By programming language",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w22-d2",
        title: "Day 2: Good READMEs",
        description: "Write clear documentation for each project",
        type: "practice",
        duration: "45-60 mins",
        content:
          "A **README** is the first thing people see when they open your project. A good README makes your project accessible and professional.\n\n**README template:**\n```\n# Project Title\n\n## Overview\nOne paragraph explaining the project and its goal.\n\n## Data Source\nWhere the data came from and how it was obtained.\n\n## Tools Used\nPython, Pandas, Matplotlib, SQL, etc.\n\n## Key Findings\n3-5 bullet points of what you discovered.\n\n## Files\n- analysis.ipynb  main notebook\n- data/  raw and cleaned data\n- visuals/  charts and images\n\n## How to Run\nInstructions to reproduce your analysis.\n```\n\n**README tips:**\n- Add screenshots of your work\n- Keep it concise but complete\n- Use proper markdown formatting\n- Include a link to your LinkedIn or portfolio site\n\n:::checkpoint\nWhat's the first section of a good README?\nA) Code\nB) Project title and overview\nC) License\nD) Installation instructions\nCorrect: B",
        quiz: [
          {
            question: "First section of a good README?",
            options: ["Code", "Title and overview", "License", "Installation"],
            correctAnswerIndex: 1,
          },
          {
            question: "What sections should a good README include?",
            options: [
              "Just the code and output",
              "Overview, data source, tools, key findings, how to run",
              "Only installation instructions",
              "A list of every function",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What should you add to a README to make it more engaging?",
            options: [
              "Animation",
              "Screenshots of the project output",
              "Background music",
              "A paywall",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is documentation important for portfolio projects?",
            options: [
              "It's optional for data projects",
              "It shows professionalism and helps others understand your work",
              "It replaces the need for code",
              "It's only for open source libraries",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What links should a README include?",
            options: [
              "Links to social media only",
              "Links to your LinkedIn or portfolio site",
              "Links to every source used",
              "Links to paid tools",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w22-d3",
        title: "Day 3: GitHub Pages",
        description: "Host a free portfolio site with GitHub Pages",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**GitHub Pages** lets you host a free personal website from a GitHub repository. Perfect for a portfolio site.\n\n**Setting up GitHub Pages:**\n1. Create a repository named `yourusername.github.io`\n2. Create an `index.html` or use a Jekyll theme\n3. Go to Settings ? Pages ? select branch (main)\n4. Your site is live at https://yourusername.github.io\n\n**Alternative: Portfolio templates:**\n- Use a simple HTML/CSS template\n- Or use GitHub's built-in Jekyll themes\n- Or use a no-code site builder with custom domain\n\n**What to include on your portfolio site:**\n- About section (who you are)\n- Projects (with screenshots and links)\n- Skills / tools\n- Contact info (LinkedIn, email)\n- Resume PDF download link\n\nA personal site makes you stand out from candidates who only have a resume.\n\n:::checkpoint\nWhat URL does a GitHub Pages site typically use?\nA) github.com/yourname\nB) yourusername.github.io\nC) yourname.com\nD) pages.github.com/yourname\nCorrect: B",
        quiz: [
          {
            question: "GitHub Pages URL format?",
            options: [
              "github.com/yourname",
              "yourusername.github.io",
              "yourname.com",
              "pages.github.com/name",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you set up GitHub Pages for a portfolio?",
            options: [
              "Pay for a hosting service",
              "Create a repo named username.github.io and enable Pages in settings",
              "Upload HTML files to Dropbox",
              "Use a code-sharing site",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What sections should a portfolio site include?",
            options: [
              "Only the resume",
              "About, projects, skills, contact, resume download",
              "Only project links",
              "A blog with daily updates",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is Jekyll used for with GitHub Pages?",
            options: [
              "Jekyll is a database management tool",
              "Jekyll is a static site generator with built-in themes",
              "Jekyll is a JavaScript framework",
              "Jekyll is a hosting provider",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What file format does a GitHub Pages site start with?",
            options: [
              "index.html or index.md",
              "style.css",
              "app.js",
              "config.php",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w22-d4",
        title: "Day 4: Personal Branding",
        description: "Build a consistent professional online presence",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Personal branding** is how you present yourself professionally online. It's what hiring managers see before they ever talk to you.\n\n**Branding checklist:**\n- Consistent profile photo across platforms (professional, friendly)\n- Consistent username/handle (ideally firstnamelastname)\n- Professional email signature\n- Clear value proposition (2-3 sentences about what you do)\n\n**Building credibility:**\n- Write a LinkedIn article about a data project\n- Comment thoughtfully on industry posts\n- Share your portfolio projects on Twitter/LinkedIn\n- Join data communities (Reddit r/datascience, DataTau, Discord servers)\n\n**Your professional summary template:**\n'Data analyst with skills in SQL, Python, and BI tools. I help businesses make data-driven decisions through clear analysis and compelling visualizations.'\n\nBranding is about being findable and memorable. Start building your presence now.\n\n:::checkpoint\nWhat's the first step in personal branding?\nA) Buy a domain name\nB) Be consistent across platforms with photo, handle, and bio\nC) Write a book\nD) Get 10,000 followers\nCorrect: B",
        quiz: [
          {
            question: "First step in personal branding?",
            options: [
              "Buy domain",
              "Be consistent across platforms",
              "Write a book",
              "10K followers",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should be consistent across your online profiles?",
            options: [
              "Nothing, every platform is different",
              "Profile photo, username, and professional summary",
              "Only the email address",
              "The background color",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a professional summary?",
            options: [
              "A list of every skill you have",
              "A 2-3 sentence value proposition about what you do",
              "A copy of your resume",
              "A list of jobs you've held",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How can you build credibility online?",
            options: [
              "Post as often as possible",
              "Share portfolio projects and comment thoughtfully on industry posts",
              "Only connect with people you know",
              "Avoid all social media",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Where should you engage with the data community?",
            options: [
              "Only on LinkedIn",
              "Data communities like Reddit, DataTau, and Discord servers",
              "Only in person",
              "Nowhere, just apply for jobs",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w22-d5",
        title: "Day 5: Mini-Project: Portfolio Launch",
        description: "Deploy your portfolio site with 3 projects",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Launch your portfolio site:\n\n1. **Select 3 projects** from your coursework\n2. **Write a README** for each project following the template\n3. **Set up GitHub Pages** with a personal site\n4. **Add your projects** to the site with screenshots and descriptions\n5. **Add an 'About Me' section** with your professional summary\n6. **Add links** to your LinkedIn and email\n\nShare the link with a friend or mentor for feedback before calling it done.\n\n:::checkpoint\nWhat should you do before launching your portfolio?\nA) Nothing, just launch\nB) Get feedback from someone you trust\nC) Wait until you have 10 projects\nD) Pay for a custom domain\nCorrect: B",
        quiz: [
          {
            question: "Before launching portfolio?",
            options: [
              "Nothing",
              "Get feedback from someone trusted",
              "Wait for 10 projects",
              "Buy domain",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How many projects should you feature in your portfolio?",
            options: [
              "As many as possible",
              "3-5 high-quality, well-documented projects",
              "1 project done perfectly",
              "10+ projects",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should you do before launching your portfolio?",
            options: [
              "Nothing, just publish it",
              "Get feedback from a trusted person",
              "Wait until you have 10 projects",
              "Only include SQL projects",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you order projects in your portfolio?",
            options: [
              "Chronologically by creation date",
              "By relevance and quality, best first",
              "Alphabetically",
              "By programming language alphabetically",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should a project description include?",
            options: [
              "Only the code",
              "Goal, tools, key findings, and how to reproduce",
              "The file structure",
              "The salary range",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week23",
    title: "Week 25: Resume & LinkedIn (Month 6)",
    durationText: "WEEK 25",
    focus: "Statistics & Job Launch",
    output: "Completed Daily Assignments",
    topics: [
      {
        id: "w23-d1",
        title: "Day 1: Tailoring Resume",
        description: "Customize your resume for each application",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Your resume is often the first impression you make. It needs to be tailored for each role you apply to.\n\n**The 6-second rule:** Recruiters spend ~6 seconds scanning a resume before deciding to read more.\n\n**Resume structure:**\n- **Header**  name, phone, email, LinkedIn, portfolio URL\n- **Professional summary**  2-3 sentences (not 'Objective')\n- **Skills**  technical tools and languages\n- **Experience**  bullet points with accomplishments, not just duties\n- **Projects**  2-3 key projects with results\n- **Education**  degrees, certifications\n\n**Tailoring for each job:**\n- Read the job description carefully\n- Match keywords from the posting\n- Highlight the skills they ask for\n- Move relevant experience higher\n\nOne generic resume sent to 100 jobs is less effective than 10 tailored resumes.\n\n:::checkpoint\nHow long does a recruiter typically scan a resume?\nA) 30 seconds\nB) 6 seconds\nC) 2 minutes\nD) 1 minute\nCorrect: B",
        quiz: [
          {
            question: "How long does a recruiter scan a resume?",
            options: ["30 sec", "6 sec", "2 min", "1 min"],
            correctAnswerIndex: 1,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w23-d2",
        title: "Day 2: Keywords & Verbs",
        description: "Use ATS-friendly keywords and strong action verbs",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Keywords** are the skills and terms recruiters and ATS (Applicant Tracking Systems) scan for.\n\n**Where to find keywords:**\n- Job descriptions for roles you want\n- Company career pages\n- LinkedIn profiles of people in your target role\n\n**Strong action verbs for bullet points:**\nAnalyzed, Built, Created, Designed, Developed, Implemented, Improved, Optimized, Reduced, Transformed, Visualized\n\n**Resume bullet formula:**\n'[Action verb] [what you did] using [tools] resulting in [measurable impact]'\n\n- Weak: 'Worked with sales data'\n- Strong: 'Analyzed sales data using Python and SQL, identifying $50K in cost-saving opportunities'\n\nEvery bullet should answer: 'So what?' If it doesn't show impact, rewrite it.\n\n:::checkpoint\nWhat should every resume bullet point include?\nA) A list of duties\nB) Action verb + what you did + tools used + measurable impact\nC) Only the tools used\nD) The project duration\nCorrect: B",
        quiz: [
          {
            question: "What should each bullet point include?",
            options: [
              "List of duties",
              "Action verb + what + tools + impact",
              "Only tools",
              "Duration",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w23-d3",
        title: "Day 3: LinkedIn Profile",
        description: "Optimize your LinkedIn for recruiter discovery",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Your **LinkedIn profile** is often the second thing recruiters check (after your resume).\n\n**LinkedIn optimization checklist:**\n- **Profile photo**  professional, well-lit, face visible\n- **Headline**  don't just put your current title. Say what you do: 'Data Analyst | SQL, Python, Power BI'\n- **About section**  3-4 paragraphs: who you are, key skills, what you're looking for\n- **Featured section**  pin your best projects and portfolio\n- **Experience**  same bullet points as resume\n- **Skills**  add all relevant skills, get endorsements\n- **Recommendations**  ask past colleagues/managers\n\n**LinkedIn activity:**\n- Follow companies you're interested in\n- Engage with posts (thoughtful comments, not just likes)\n- Post about your projects and learning journey\n- Connect with people in your target industry\n\nA complete LinkedIn profile is 40x more likely to be found in searches.\n\n:::checkpoint\nWhat's the most important section to optimize on LinkedIn?\nA) The 'Featured' section\nB) The headline  it's the first thing people see in search results\nC) The 'Interests' section\nD) The profile background image\nCorrect: B",
        quiz: [
          {
            question: "Most important LinkedIn section?",
            options: [
              "Featured",
              "Headline  first in search results",
              "Interests",
              "Background image",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w23-d4",
        title: "Day 4: Networking Strategies",
        description: "Build professional relationships that lead to jobs",
        type: "practice",
        duration: "45-60 mins",
        content:
          "**Networking** is how most jobs are found. Studies show 70-85% of jobs aren't publicly posted  they're filled through referrals.\n\n**Networking strategies:**\n- **The informational interview**  message someone in your target role: 'I'm exploring data analyst careers. Could I ask you 3 quick questions?'\n- **Attend events**  data meetups, webinars, conferences (many are free online)\n- **Join communities**  Data Twitter, Reddit r/datascience, Discord servers, Slack groups\n- **Give first**  share useful content, answer questions, help others before asking for help\n\n**Networking message template:**\n'Hi [Name], I saw your work at [Company] and I'm exploring a transition into data analytics. Would you have 10 minutes this week for a quick chat? I'd love to hear about your journey.'\n\nNetworking isn't about asking for a job. It's about building genuine professional relationships.\n\n:::checkpoint\nWhat's the goal of an informational interview?\nA) To ask for a job directly\nB) To learn about someone's career and build a relationship\nC) To get a referral immediately\nD) To show off your skills\nCorrect: B",
        quiz: [
          {
            question: "Goal of informational interview?",
            options: [
              "Ask for job",
              "Learn about career and build relationship",
              "Get referral",
              "Show off skills",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w23-d5",
        title: "Day 5: Mini-Project: Application Ready",
        description: "Tailor resume, optimize LinkedIn, send connections",
        type: "project",
        duration: "1-2 hrs",
        content:
          "Get application-ready:\n\n1. **Tailor your resume** for a specific target role (find a real job posting)\n2. **Update bullet points** using action verbs and measurable impact\n3. **Optimize your LinkedIn**  headline, about, featured, experience\n4. **Send 5 connection requests** to people in your target industry\n5. **Create an application tracker**  spreadsheet with role, company, date applied, status, follow-up\n\nApplying without tracking is like running an analysis without documenting your steps. A tracker keeps you organized.\n\n:::checkpoint\nWhat should you track in a job application tracker?\nA) Only the company name\nB) Role, company, date applied, status, and follow-up notes\nC) Just the salary\nD) Nothing  track in your head\nCorrect: B",
        quiz: [
          {
            question: "What to track in job app tracker?",
            options: [
              "Only company",
              "Role, company, date, status, follow-up",
              "Salary only",
              "Nothing",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week26",
    title: "Week 26: Machine Learning Fundamentals (Month 7)",
    durationText: "WEEK 26",
    focus: "ML Concepts, Evaluation, Cross-Validation",
    output: "Understand ML types, evaluation metrics, cross-validation",
    topics: [
      {
        id: "w26-d1",
        title: "Day 1: What is Machine Learning?",
        description: "Understand ML, its types, and real-world applications",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Machine Learning (ML)** is a subset of AI where computers learn patterns from data without being explicitly programmed for every rule.\n\nInstead of writing if-else rules, you show the algorithm examples and it figures out the patterns.\n\n## Three Types of Machine Learning\n\n### 1. Supervised Learning\nYou have labeled data (input + correct output). The model learns to map inputs to outputs.\n- **Classification**: Predict a category (spam/not spam, churn/no churn)\n- **Regression**: Predict a number (price, temperature, revenue)\n- Algorithms: Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, KNN, Naive Bayes\n\n### 2. Unsupervised Learning\nYou have unlabeled data (no correct answers). The model finds hidden patterns.\n- **Clustering**: Group similar items (customer segments, document topics)\n- **Dimensionality Reduction**: Simplify data while preserving information (PCA)\n- Algorithms: K-Means, Hierarchical Clustering, PCA\n\n### 3. Reinforcement Learning\nAn agent learns by interacting with an environment, receiving rewards/penalties.\n- Used in: game AI, robotics, recommendation systems\n- Algorithms: Q-Learning, Deep Q-Networks (DQN)\n\n**Real-world examples:**\n- Supervised: Email spam filter, house price prediction, medical diagnosis\n- Unsupervised: Customer segmentation, anomaly detection, topic modeling\n- Reinforcement: Self-driving cars, AlphaGo, dynamic pricing\n\nML vs Traditional Programming:\n- Traditional: Rules + Data = Answers\n- ML: Data + Answers = Rules (the model learns the rules)\n\n:::checkpoint\nWhich ML type uses labeled data?\nA) Supervised Learning\nB) Unsupervised Learning\nC) Reinforcement Learning\nD) All of the above\nCorrect: A\n\n:::checkpoint\nPredicting house prices is an example of:\nA) Classification\nB) Clustering\nC) Regression\nD) Reinforcement Learning\nCorrect: C",
        quiz: [
          {
            question: "What is supervised learning?",
            options: [
              "Learning without any data",
              "Learning from labeled data with known outputs",
              "Learning by interacting with an environment",
              "Learning without labels",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which is an example of unsupervised learning?",
            options: [
              "Spam detection",
              "Customer segmentation",
              "Price prediction",
              "Medical diagnosis",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does reinforcement learning use?",
            options: [
              "Labeled datasets",
              "Rewards and penalties from environment",
              "Unlabeled data only",
              "Predefined rules only",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w26-d2",
        title: "Day 2: Train/Test Split, Overfitting & Underfitting",
        description: "Learn how to evaluate ML models properly",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Train/Test Split** is the foundation of honest model evaluation. You split your data into:\n- **Training set** (70-80%): used to teach the model\n- **Test set** (20-30%): held back, used only for final evaluation\n\nNever evaluate on the same data you trained on the model will look perfect but fail on new data.\n\n## Overfitting\n\nThe model learns the training data too well including the noise. It memorizes rather than generalizes.\n\n**Signs of overfitting:**\n- High accuracy on training, low accuracy on test\n- Model is too complex (too many features, deep trees)\n\n**Solutions:**\n- Simplify the model (fewer features, shallower trees)\n- Regularization (L1/L2 penalty)\n- More training data\n- Cross-validation\n\n## Underfitting\n\nThe model is too simple to capture patterns in the data.\n\n**Signs of underfitting:**\n- Poor performance on BOTH training and test\n- Model is too simple (linear model on nonlinear data)\n\n**Solutions:**\n- Increase model complexity\n- Add more features (feature engineering)\n- Reduce regularization\n\n## Bias-Variance Tradeoff\n- **High Bias** (underfitting): Model makes strong assumptions, misses patterns\n- **High Variance** (overfitting): Model is too sensitive to training data fluctuations\n- **Goal**: Find the sweet spot where total error (bias^2 + variance + irreducible error) is minimized\n\n:::checkpoint\nWhat does overfitting mean?\nA) Model performs well on training but poorly on new data\nB) Model performs poorly on both training and test\nC) Model is too simple\nD) Model has high bias\nCorrect: A\n\n:::checkpoint\nWhat is a good solution for underfitting?\nA) Add regularization\nB) Use more training data only\nC) Increase model complexity or add features\nD) Reduce the number of features\nCorrect: C",
        quiz: [
          {
            question: "What is the purpose of a test set?",
            options: [
              "To train the model",
              "To evaluate final model performance on unseen data",
              "To select features",
              "To tune hyperparameters",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "High bias typically indicates:",
            options: [
              "Overfitting",
              "Underfitting",
              "Perfect model",
              "No training needed",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which is a sign of overfitting?",
            options: [
              "Training accuracy 99%, test accuracy 60%",
              "Training accuracy 70%, test accuracy 72%",
              "Both accuracies are low",
              "Model is linear",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w26-d3",
        title: "Day 3: Cross-Validation",
        description: "Learn robust model validation techniques",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Cross-Validation** gives a more reliable estimate of model performance than a single train/test split.\n\n## K-Fold Cross-Validation\n\nSplit data into K equal folds (typically 5 or 10):\n1. Train on K-1 folds, test on the remaining fold\n2. Repeat K times, each time using a different fold as test\n3. Average the K results\n\n**Why use it:**\n- Every data point gets to be in both training and test\n- More stable performance estimate\n- Reduces variance of the evaluation\n\n## Leave-One-Out Cross-Validation (LOOCV)\n\nK = N (number of samples). Train on N-1, test on 1. Repeat N times.\n- Very accurate estimate\n- Computationally expensive for large datasets\n\n## When to use what:\n- **K-fold (k=5 or 10)**: default choice for most problems\n- **LOOCV**: very small datasets (<100 samples)\n- **Stratified K-Fold**: preserves class proportions in each fold (good for imbalanced classification)\n\n## Common mistake: Data Leakage\n\nNever apply any data transformation (scaling, encoding, imputation) before splitting. Fit transformers ONLY on training data, then transform test data using training statistics.\n\nCorrect order:\n1. Split data into train/test\n2. Fit scaler/encoder on TRAINING data only\n3. Transform both training and test using that fitted scaler\n4. Train model on training data\n5. Evaluate on test data\n\n:::checkpoint\nWhat is K-fold cross-validation?\nA) Train on K samples, test on rest\nB) Split data into K folds, train on K-1, test on remaining, repeat K times\nC) Train K different models\nD) Use K features at a time\nCorrect: B\n\n:::checkpoint\nWhy use stratified K-fold?\nA) It's faster than regular K-fold\nB) It preserves class distribution in each fold\nC) It uses more data\nD) It doesn't require splitting\nCorrect: B",
        quiz: [
          {
            question: "What is the typical number of folds in K-fold CV?",
            options: ["2-3", "5 or 10", "100", "Equal to dataset size"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is data leakage?",
            options: [
              "Data being deleted accidentally",
              "Using test data information during training",
              "Using too much training data",
              "Not using enough features",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "When is LOOCV most appropriate?",
            options: [
              "Large datasets with millions of rows",
              "Very small datasets",
              "Image data only",
              "Text data only",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w26-d4",
        title: "Day 4: Classification Evaluation Metrics",
        description: "Learn how to evaluate classification models properly",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Classification evaluation** goes beyond just accuracy. Different metrics matter depending on the problem.\n\n## Confusion Matrix\n\nA 2x2 table showing correct and incorrect predictions:\n\n| | Predicted Positive | Predicted Negative |\n| Actual Positive | True Positive (TP) | False Negative (FN) |\n| Actual Negative | False Positive (FP) | True Negative (TN) |\n\n## Key Metrics\n\n**Accuracy** = (TP + TN) / (TP + TN + FP + FN)\n- Overall correctness. Misleading for imbalanced data.\n\n**Precision** = TP / (TP + FP)\n- Of all positive predictions, how many were correct?\n- High precision = few false positives\n- Use when false positives are costly (spam: don't mark real emails as spam)\n\n**Recall (Sensitivity)** = TP / (TP + FN)\n- Of all actual positives, how many did we catch?\n- High recall = few false negatives\n- Use when false negatives are costly (cancer detection: don't miss real cases)\n\n**F1 Score** = 2 * (Precision * Recall) / (Precision + Recall)\n- Harmonic mean of precision and recall\n- Good single metric when you care about both\n\n## ROC Curve and AUC\n\n**ROC curve** plots True Positive Rate (Recall) vs False Positive Rate at various thresholds.\n**AUC (Area Under the Curve)**:\n- AUC = 1.0: perfect model\n- AUC = 0.5: random guessing\n- AUC = 0.0: perfectly wrong\n\nAUC measures the model's ability to distinguish between classes regardless of threshold.\n\n**Which metric to use:**\n- Balanced classes: Accuracy\n- Imbalanced + FP costly: Precision\n- Imbalanced + FN costly: Recall\n- Balance both: F1 Score\n- Overall model quality: AUC\n\n:::checkpoint\nWhich metric is best for imbalanced classes when false positives are costly?\nA) Accuracy\nB) Precision\nC) Recall\nD) F1 Score\nCorrect: B\n\n:::checkpoint\nWhat does AUC measure?\nA) Model speed\nB) Ability to distinguish between classes across thresholds\nC) Number of features\nD) Dataset size\nCorrect: B",
        quiz: [
          {
            question: "What is True Positive?",
            options: [
              "Predicted positive, actual positive",
              "Predicted positive, actual negative",
              "Predicted negative, actual positive",
              "Predicted negative, actual negative",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "Which metric is the harmonic mean of precision and recall?",
            options: ["Accuracy", "AUC", "F1 Score", "Specificity"],
            correctAnswerIndex: 2,
          },
          {
            question: "AUC of 0.5 means:",
            options: [
              "Perfect model",
              "Random guessing",
              "Model is overfit",
              "Model has no data",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w26-d5",
        title: "Day 5: Regression Evaluation Metrics",
        description: "Learn how to evaluate regression models",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Regression evaluation** measures how close predictions are to actual values.\n\n## Key Metrics\n\n**Mean Absolute Error (MAE)** = (1/n) * sum(|actual - predicted|)\n- Average absolute error\n- Easy to interpret (same units as target)\n- Less sensitive to outliers\n\n**Mean Squared Error (MSE)** = (1/n) * sum((actual - predicted)^2)\n- Penalizes large errors more heavily\n- Not in original units (squared)\n\n**Root Mean Squared Error (RMSE)** = sqrt(MSE)\n- In same units as target\n- Penalizes large errors\n- Most commonly reported regression metric\n\n**R-squared (R², Coefficient of Determination)** = 1 - (SS_res / SS_tot)\n- Proportion of variance explained by the model\n- Ranges from 0 to 1 (can be negative for terrible models)\n- R² = 0.8 means the model explains 80% of the variance\n\n**Adjusted R-squared** = 1 - ((1 - R²) * (n - 1) / (n - k - 1))\n- Penalizes adding unnecessary features\n- Use when comparing models with different numbers of features\n\n## Which metric to use:\n- **MAE**: When outliers are not critical, easy interpretation needed\n- **RMSE**: When large errors are especially bad\n- **R²**: When you want to explain variance (percent of variation explained)\n- **Adjusted R²**: When comparing models with different feature counts\n\n## Worked Example: House Price Predictions\n\nLet's say we predicted prices for 3 houses. Actual vs predicted (in $100Ks):\n\n| House | Actual Price | Predicted Price | Error (Actual - Predicted) | Absolute Error | Squared Error |\n|-------|-------------|----------------|---------------------------|---------------|--------------|\n| A | $50K | $45K | 5 | 5 | 25 |\n| B | $30K | $35K | -5 | 5 | 25 |\n| C | $80K | $60K | 20 | 20 | 400 |\n\n**Calculating MAE:**\nMAE = (5 + 5 + 20) / 3 = 30 / 3 = **$10K**\nOn average, our predictions are off by $10K. House C's large error pulls this higher, but less than RMSE.\n\n**Calculating MSE:**\nMSE = (25 + 25 + 400) / 3 = 450 / 3 = **150**\nThe units are squared ($100Ks²), so MSE = 150. Hard to interpret directly.\n\n**Calculating RMSE:**\nRMSE = sqrt(150) = **$12.25K**\nBack in original units. Notice RMSE ($12.25K) is higher than MAE ($10K) because squaring penalizes House C's large error more.\n\n**Calculating R²:**\nFirst find the total sum of squares (SS_tot): how far each actual is from the mean actual.\nMean actual = (50 + 30 + 80) / 3 = 53.33\nSS_tot = (50 - 53.33)² + (30 - 53.33)² + (80 - 53.33)² = 11.09 + 544.29 + 711.09 = 1266.47\n\nSS_res (sum of squared residuals) = 25 + 25 + 400 = 450 (from squared errors above)\n\nR² = 1 - (450 / 1266.47) = 1 - 0.355 = **0.645**\nOur model explains 64.5% of the variance in house prices.\n\n## Which metric to use:\n- **MAE**: When outliers are not critical, easy interpretation needed\n- **RMSE**: When large errors are especially bad\n- **R²**: When you want to explain variance (percent of variation explained)\n- **Adjusted R²**: When comparing models with different feature counts\n\n:::checkpoint\nWhich metric is most sensitive to outliers?\nA) MAE\nB) MSE\nC) R-squared\nD) All are equally sensitive\nCorrect: B\n\n:::checkpoint\nR-squared measures:\nA) Average error\nB) Proportion of variance explained\nC) Number of features\nD) Model training time\nCorrect: B",
        quiz: [
          {
            question: "What does RMSE stand for?",
            options: [
              "Root Mean Squared Error",
              "Regular Mean Standard Error",
              "Relative Mean Squared Estimate",
              "Root Minimum Squared Error",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Why use Adjusted R-squared instead of R-squared?",
            options: [
              "It's always higher",
              "It penalizes adding unnecessary features",
              "It's faster to compute",
              "It works only with classification",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which metric is easiest to interpret for non-technical stakeholders?",
            options: [
              "MSE",
              "RMSE or MAE (same units as target)",
              "Squared error",
              "Log loss",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week27",
    title: "Week 27: Regression & Classification Models (Month 7)",
    durationText: "WEEK 27",
    focus: "Linear/Logistic Regression, Decision Trees, Random Forest, KNN",
    output: "Build and evaluate regression and classification models",
    topics: [
      {
        id: "w27-d1",
        title: "Day 1: Linear Regression → Deep Dive",
        description:
          "Understand linear regression assumptions, interpretation, and OLS",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Linear Regression** models the relationship between a dependent variable (Y) and one or more independent variables (X) by fitting a linear equation.\n\n**Equation:** Y = β0 + β1*X1 + β2*X2 + ... + βn*Xn + ε\n- β0: intercept (value of Y when all X = 0)\n- β1...βn: coefficients (change in Y per 1-unit change in X)\n- ε: error term (what the model can't explain)\n\n**Ordinary Least Squares (OLS):** The standard method to find the best coefficients by minimizing the sum of squared residuals.\n\n## Assumptions of Linear Regression\n1. **Linearity**: The relationship between X and Y is linear\n2. **Independence**: Observations are independent of each other\n3. **Homoscedasticity**: Constant variance of errors across all X values\n4. **Normality**: Errors are normally distributed (important for inference)\n5. **No multicollinearity**: Independent variables aren't highly correlated\n\n## Interpreting coefficients\nIf β1 = 5.2 and X1 is house size (sq ft), then: each additional sq ft increases price by $5.20 (assuming other variables constant).\n\n## p-values for coefficients\nA low p-value (<0.05) means the variable is statistically significant (likely has a real effect).\n\n## Cautions\n- Correlation ≠ causation. A regression coefficient shows association, not cause.\n- Extrapolating beyond the range of training data is dangerous.\n- Outliers can heavily influence the regression line.\n\n:::checkpoint\nWhat does the coefficient β1 represent in linear regression?\nA) The error term\nB) Change in Y per 1-unit change in X1, holding other variables constant\nC) The total variance explained\nD) The correlation coefficient\nCorrect: B\n\n:::checkpoint\nWhat is multicollinearity?\nA) When independent variables are highly correlated with each other\nB) When the dependent variable has multiple values\nC) When there are too many data points\nD) When errors are normally distributed\nCorrect: A",
        quiz: [
          {
            question:
              "What method is used to find the best coefficients in linear regression?",
            options: [
              "Maximum Likelihood",
              "Ordinary Least Squares",
              "Gradient Descent only",
              "Random Search",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which assumption requires constant variance of errors?",
            options: [
              "Linearity",
              "Independence",
              "Homoscedasticity",
              "Normality",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What does a low p-value for a coefficient indicate?",
            options: [
              "The variable is not important",
              "The variable is statistically significant",
              "The model is overfit",
              "The data is insufficient",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w27-d2",
        title: "Day 2: Multiple & Polynomial Regression, Feature Scaling",
        description:
          "Extend linear regression to multiple features and nonlinear relationships",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Multiple Linear Regression** extends simple regression to use multiple predictors: Y = β0 + β1*X1 + β2*X2 + ... + βn*Xn\n\nEach coefficient represents the partial effect of that variable, holding all others constant.\n\n**Polynomial Regression** captures curved relationships by adding powers of X: Y = β0 + β1*X + β2*X² + β3*X³\n- Degree 2: one bend (quadratic)\n- Degree 3: two bends (cubic)\n- Higher degrees = more flexible but risk overfitting\n\n**Interaction Terms** capture when the effect of one variable depends on another: Y = β0 + β1*X1 + β2*X2 + β3*(X1*X2)\n\nExample: The effect of advertising spend on sales might depend on the distribution channel.\n\n## Feature Scaling\n\nMany ML algorithms require features to be on similar scales.\n\n**Standardization (Z-score):** (x - mean) / std_dev\n- Centers at 0, scales to unit variance\n- No fixed range\n- Good for normally distributed data\n\n**Normalization (Min-Max):** (x - min) / (max - min)\n- Scales to [0, 1] range\n- Sensitive to outliers\n- Good for bounded features\n\n**Which algorithms need scaling:**\n- MUST scale: Linear/Logistic Regression, KNN, SVM, PCA, K-Means\n- DON'T need: Decision Trees, Random Forest, Gradient Boosting\n\nAlways fit scaler on TRAINING data only, then transform test data.\n\n:::checkpoint\nWhat does polynomial regression help with?\nA) Linear relationships only\nB) Capturing curved, nonlinear relationships\nC) Reducing the number of features\nD) Classification problems only\nCorrect: B\n\n:::checkpoint\nWhich ML algorithms do NOT need feature scaling?\nA) KNN and SVM\nB) Decision Trees and Random Forest\nC) Linear Regression and K-Means\nD) PCA and Logistic Regression\nCorrect: B",
        quiz: [
          {
            question: "Standardization transforms data using:",
            options: [
              "Min and max values",
              "Mean and standard deviation",
              "Median and IQR",
              "Mode and range",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why use interaction terms in regression?",
            options: [
              "To reduce model complexity",
              "To capture when effect of one variable depends on another",
              "To handle missing data",
              "To speed up training",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a risk of using a high-degree polynomial?",
            options: [
              "Underfitting",
              "Overfitting",
              "Slower training only",
              "No risk at all",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w27-d3",
        title: "Day 3: Logistic Regression for Classification",
        description:
          "Understand logistic regression, sigmoid function, and decision boundaries",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Logistic Regression** is used for binary classification problems (predict a yes/no outcome) despite the name it's a classification algorithm, not regression.\n\n## The Sigmoid Function\n\nInstead of fitting a straight line, logistic regression uses the sigmoid function to squeeze output between 0 and 1:\n\nσ(z) = 1 / (1 + e^(-z))\n\nWhere z = β0 + β1*X1 + ... + βn*Xn\n\n- As z ? +∞, σ(z) ? 1\n- As z ? -∞, σ(z) ? 0\n- When z = 0, σ(z) = 0.5\n\nThe output is interpreted as **probability** of the positive class.\n\n## Decision Boundary\n\n- If P(positive) >= 0.5, predict positive class\n- If P(positive) < 0.5, predict negative class\n- The threshold can be adjusted (e.g., 0.3 for high-recall scenarios)\n\n## Log Loss (Cross-Entropy Loss)\n\nLogistic regression minimizes log loss, not MSE: - (1/n) * sum(y*log(p) + (1-y)*log(1-p))\n\nLog loss heavily penalizes confident wrong predictions.\n\n## When to use Logistic Regression:\n- Binary classification problems\n- When you need interpretable probabilities\n- When decision boundary is roughly linear\n- Baseline model for classification\n\n## Comparison with Linear Regression:\n| Linear Regression | Logistic Regression |\n| Predicts continuous value | Predicts probability [0,1] |\n| Uses MSE loss | Uses Log Loss |\n| Output = linear equation | Output = sigmoid of linear equation |\n\n:::checkpoint\nWhat does the sigmoid function do?\nA) Maps values to range [0, 1] for probabilities\nB) Maps values to any range\nC) Removes outliers\nD) Increases model complexity\nCorrect: A\n\n:::checkpoint\nWhat loss function does logistic regression use?\nA) MSE\nB) MAE\nC) Log Loss (Cross-Entropy)\nD) Hinge Loss\nCorrect: C",
        quiz: [
          {
            question: "Logistic Regression is used for:",
            options: [
              "Predicting continuous values",
              "Binary classification with probability output",
              "Clustering data",
              "Dimensionality reduction",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "What is the default decision threshold for logistic regression?",
            options: ["0.25", "0.5", "0.75", "1.0"],
            correctAnswerIndex: 1,
          },
          {
            question: "Which statement is TRUE about logistic regression?",
            options: [
              "It predicts continuous values",
              "It uses a linear equation passed through sigmoid",
              "It always needs feature scaling",
              "It can only handle 2 features",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w27-d4",
        title: "Day 4: Decision Trees & Random Forest",
        description:
          "Learn tree-based models for classification and regression",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Decision Trees** are intuitive models that make predictions by asking a series of yes/no questions.\n\n## How Decision Trees Work\n\nThe tree splits data at each node using the feature that best separates the classes.\n\n**Splitting criteria for classification:**\n- **Gini Impurity**: 1 - sum(p_i^2). Lower is better. Range [0, 0.5].\n- **Entropy**: -sum(p_i * log2(p_i)). Lower is better. Range [0, 1].\n- **Information Gain**: Reduction in entropy after a split.\n\n**Splitting criteria for regression:**\n- **MSE reduction**: Minimize variance within each leaf.\n\n## Advantages of Decision Trees\n- Easy to interpret and visualize\n- Handle both numeric and categorical data\n- No feature scaling needed\n- Capture nonlinear relationships\n\n## Disadvantages\n- Prone to overfitting (deep trees)\n- Unstable: small data changes can produce very different trees\n- Greedy algorithm (may miss optimal splits)\n\n## Pruning\nReduce tree size to prevent overfitting:\n- **Pre-pruning**: Limit max depth, min samples per leaf\n- **Post-pruning**: Grow full tree, then remove branches\n\n## Random Forest\nAn **ensemble** of many decision trees, each trained on a random subset of data and features.\n\n**Key idea:** Bagging (Bootstrap Aggregating) + random feature selection.\n- Each tree sees a different bootstrap sample (sampled with replacement)\n- Each split considers a random subset of features\n- Final prediction: majority vote (classification) or average (regression)\n\n**Why Random Forest works:** Combining many slightly different trees reduces variance while keeping bias low. The random forest is more stable and accurate than any single tree.\n\n**Key hyperparameters:**\n- n_estimators: number of trees (more = better, diminishing returns)\n- max_depth: maximum tree depth\n- min_samples_split: minimum samples to split a node\n- max_features: number of features to consider at each split\n\n:::checkpoint\nWhat is Gini Impurity?\nA) A measure of data cleanliness\nB) A metric for evaluating split quality in decision trees\nC) A type of regression\nD) A feature scaling method\nCorrect: B\n\n:::checkpoint\nHow does Random Forest reduce overfitting compared to a single tree?\nA) By using more data\nB) By averaging many trees trained on different samples\nC) By using only one feature at a time\nD) By pruning more aggressively\nCorrect: B",
        quiz: [
          {
            question:
              "Which of the following is NOT an advantage of decision trees?",
            options: [
              "Easy to interpret",
              "Handle both numeric and categorical data",
              "Always more accurate than other models",
              "No feature scaling needed",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What does bagging stand for?",
            options: [
              "Backward Aggregation",
              "Bootstrap Aggregating",
              "Binary Aggregation",
              "Balanced Aggregation",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which is a key hyperparameter of Random Forest?",
            options: [
              "Learning rate",
              "Number of estimators (trees)",
              "Kernel type",
              "Number of neighbors",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w27-d5",
        title: "Day 5: KNN, Naive Bayes & SVM Overview",
        description: "Learn three more essential classification algorithms",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## K-Nearest Neighbors (KNN)\n\nKNN classifies a data point based on the majority class of its K closest neighbors.\n\n**How it works:**\n1. Choose K (number of neighbors)\n2. Calculate distance to all training points (usually Euclidean)\n3. Find K nearest neighbors\n4. For classification: majority vote. For regression: average of neighbors.\n\n**Choosing K:**\n- Small K (e.g., 1): overfitting, sensitive to noise\n- Large K (e.g., 50): smoother decision boundary, may underfit\n- Typical range: 3-20. Use cross-validation to find optimal K.\n\n**When to use KNN:**\n- Small to medium datasets\n- Decision boundary is irregular\n- When you need a simple, non-parametric model\n\n**KNN is Lazy:** It stores all training data and computes predictions on the fly. No real training phase.\n\n## Naive Bayes Classifier\n\nBased on Bayes' Theorem: P(A|B) = P(B|A) * P(A) / P(B)\n\n**Naive assumption:** All features are independent given the class. This is almost never true in reality, but the algorithm still works surprisingly well.\n\n**When to use:**\n- Text classification (spam filtering, sentiment analysis)\n- When features are conditionally independent\n- When you need a fast, scalable classifier\n\n## Support Vector Machine (SVM)\n\nSVM finds the hyperplane that best separates classes by maximizing the margin between them.\n\n**Key concepts:**\n- **Support Vectors**: The data points closest to the decision boundary (most influential)\n- **Kernel Trick**: Map data to higher dimensions to find nonlinear boundaries (RBF, polynomial kernels)\n- **Margin**: The distance between the hyperplane and the nearest points\n\n**When to use SVM:**\n- High-dimensional data (more features than samples)\n- Clear margin of separation\n- Text classification, image recognition\n\n## Choosing the Right Algorithm\n| Algorithm | Best For | Pros | Cons |\n| KNN | Small data, irregular boundaries | Simple, no training | Slow prediction, needs scaling |\n| Naive Bayes | Text, fast classification | Very fast, works with little data | Naive assumption limits accuracy |\n| SVM | High-dim data, clear margins | Powerful with kernels | Slow training, hard to tune |\n\n:::checkpoint\nWhat is the main assumption of Naive Bayes?\nA) All features are dependent\nB) All features are independent given the class\nC) Data is normally distributed\nD) There are at least 100 samples\nCorrect: B\n\n:::checkpoint\nWhat are support vectors in SVM?\nA) All training data points\nB) The data points closest to the decision boundary\nC) Randomly selected points\nD) The output predictions\nCorrect: B",
        quiz: [
          {
            question: "What does K represent in KNN?",
            options: [
              "Number of features",
              "Number of nearest neighbors to consider",
              "Number of classes",
              "Kernel size",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is KNN called a lazy learner?",
            options: [
              "It's slow to predict",
              "It stores all training data and does no real training",
              "It only works with small datasets",
              "It requires feature scaling",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which algorithm uses the kernel trick for nonlinear boundaries?",
            options: ["KNN", "Naive Bayes", "SVM", "Linear Regression"],
            correctAnswerIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: "week28",
    title:
      "Week 28: Regularization, Clustering & Feature Engineering (Month 7)",
    durationText: "WEEK 28",
    focus: "Ridge/Lasso, K-Means, PCA, Feature Engineering, Gradient Descent",
    output: "Apply regularization, clustering, dimensionality reduction",
    topics: [
      {
        id: "w28-d1",
        title: "Day 1: Regularization → Ridge, Lasso & ElasticNet",
        description:
          "Understand regularization techniques to prevent overfitting",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Regularization** adds a penalty to the loss function to prevent overfitting by discouraging large coefficients.\n\n## Why Regularization?\nA complex model might assign very large coefficients to some features, fitting noise in the training data. Regularization shrinks coefficients toward zero, making the model simpler and more generalizable.\n\n## Ridge Regression (L2 Regularization)\nLoss = MSE + λ * sum(β_j²)\n- Adds penalty proportional to the SQUARE of coefficients\n- Shrinks coefficients toward zero but never exactly to zero\n- All features stay in the model (just reduced influence)\n- Best when most features have some predictive power\n\n## Lasso Regression (L1 Regularization)\nLoss = MSE + λ * sum(|β_j|)\n- Adds penalty proportional to the ABSOLUTE VALUE of coefficients\n- Can shrink coefficients EXACTLY to zero\n- Performs automatic feature selection\n- Best when many features are irrelevant\n\n## ElasticNet\nLoss = MSE + λ1 * sum(|β_j|) + λ2 * sum(β_j²)\n- Combination of L1 and L2 penalties\n- Best of both worlds\n- Good when there are multiple correlated features\n\n## Lambda (λ) → The Regularization Parameter\n- λ = 0: No regularization (standard OLS)\n- λ ? ∞: All coefficients ? 0 (too simple, underfitting)\n- Optimal λ found via cross-validation\n\n## When to use which:\n- **Ridge**: Many features, all potentially relevant\n- **Lasso**: Feature selection needed, sparse solution desired\n- **ElasticNet**: Correlated features, uncertain which approach is best\n\n:::checkpoint\nWhat does Lasso (L1) regularization do differently from Ridge (L2)?\nA) It penalizes the square of coefficients\nB) It can shrink coefficients to exactly zero\nC) It only works with classification\nD) It doesn't require a loss function\nCorrect: B\n\n:::checkpoint\nWhat happens when λ (lambda) is very large?\nA) Model becomes very complex\nB) Coefficients shrink toward zero (underfitting risk)\nC) Model ignores regularization\nD) Training becomes faster\nCorrect: B",
        quiz: [
          {
            question: "Ridge regression uses which type of penalty?",
            options: [
              "L1 (absolute value)",
              "L2 (squared)",
              "Both L1 and L2",
              "No penalty",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "Which regularization technique performs automatic feature selection?",
            options: ["Ridge", "Lasso", "Neither", "Both equally"],
            correctAnswerIndex: 1,
          },
          {
            question: "ElasticNet combines:",
            options: [
              "L1 and L2 penalties",
              "Ridge and Logistic Regression",
              "K-Means and PCA",
              "Decision trees and linear regression",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w28-d2",
        title: "Day 2: K-Means Clustering & Hierarchical Clustering",
        description:
          "Learn unsupervised learning for grouping similar data points",
        type: "learn",
        duration: "45-60 mins",
        content:
          '**K-Means Clustering** is the most popular unsupervised learning algorithm for grouping similar data points.\n\n## How K-Means Works\n1. Choose K (number of clusters)\n2. Initialize K centroids randomly\n3. Assign each point to the nearest centroid\n4. Recalculate centroids as the mean of assigned points\n5. Repeat steps 3-4 until convergence (centroids stop changing)\n\n## Choosing K → The Elbow Method\n\nRun K-Means for K = 1 to 10. Plot inertia (within-cluster sum of squares) vs K.\nThe "elbow" point where inertia drops sharply is the optimal K.\n\n**Silhouette Score:** Measures how similar a point is to its own cluster vs other clusters. Range [-1, 1]. Higher = better separation. More objective than elbow method.\n\n## Limitations of K-Means\n- Need to specify K in advance\n- Sensitive to initial centroid placement (run multiple times)\n- Assumes spherical clusters of similar size\n- Not suitable for non-spherical or overlapping clusters\n- Sensitive to outliers\n\n## Hierarchical Clustering\nBuilds a tree (dendrogram) of clusters without specifying K in advance.\n\n**Agglomerative (bottom-up):** Start with each point as its own cluster, merge closest pairs.\n**Divisive (top-down):** Start with all points in one cluster, split recursively.\n\n**Linkage criteria:** How distance between clusters is measured:\n- Single linkage: minimum distance between points\n- Complete linkage: maximum distance between points\n- Average linkage: average distance\n- Ward\'s method: minimize variance increase\n\n## When to use:\n- **K-Means**: Large datasets, known or estimated K, spherical clusters\n- **Hierarchical**: Small datasets, unknown K, want to see cluster hierarchy\n\n:::checkpoint\nWhat does the elbow method help with?\nA) Choosing the number of clusters K\nB) Scaling the data\nC) Choosing the learning rate\nD) Evaluating regression models\nCorrect: A\n\n:::checkpoint\nWhat is a limitation of K-Means?\nA) It cannot handle large datasets\nB) It assumes spherical clusters of similar size\nC) It requires labeled data\nD) It always finds the global optimum\nCorrect: B',
        quiz: [
          {
            question: "What does K represent in K-Means?",
            options: [
              "Number of features",
              "Number of clusters",
              "Number of iterations",
              "Kernel size",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What does silhouette score measure?",
            options: [
              "How fast the algorithm runs",
              "How well-separated clusters are",
              "The number of data points",
              "The accuracy of predictions",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Hierarchical clustering builds:",
            options: [
              "A confusion matrix",
              "A dendrogram (tree of clusters)",
              "A regression line",
              "A decision boundary",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w28-d3",
        title: "Day 3: PCA → Dimensionality Reduction",
        description:
          "Learn Principal Component Analysis for simplifying high-dimensional data",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Principal Component Analysis (PCA)** is an unsupervised technique that reduces the number of features while preserving as much information (variance) as possible.\n\n## Why Reduce Dimensionality?\n- **Curse of Dimensionality**: As features increase, data becomes sparse, and models need exponentially more data to be effective\n- Reduces overfitting risk\n- Faster training\n- Easier visualization (2D or 3D)\n- Removes noise\n\n## How PCA Works\n1. **Standardize** the data (mean=0, std=1)\n2. Compute the **covariance matrix**\n3. Find **eigenvectors** and **eigenvalues**\n4. Sort eigenvectors by eigenvalues (highest = most important)\n5. Select top K eigenvectors as **Principal Components**\n6. Transform data by projecting onto these components\n\n**Principal Components**: New features that are linear combinations of original features, orthogonal to each other (uncorrelated).\n\n- PC1: direction of maximum variance\n- PC2: direction of second maximum variance (orthogonal to PC1)\n- And so on...\n\n## Explained Variance Ratio\nEach principal component explains a certain percentage of total variance. Use the cumulative explained variance to decide how many components to keep (e.g., keep enough to explain 95% of variance).\n\n## When to use PCA:\n- High-dimensional data (e.g., 100+ features)\n- Multicollinearity among features\n- Visualization (reduce to 2D or 3D)\n- Noise reduction\n- Preprocessing before other ML algorithms\n\n## Limitations:\n- Components are hard to interpret (they're combinations of original features)\n- Assumes linear relationships\n- Sensitive to feature scaling (always standardize first!)\n\n:::checkpoint\nWhat does PCA do?\nA) Increases the number of features\nB) Reduces dimensions while preserving variance\nC) Removes outliers\nD) Clusters data points\nCorrect: B\n\n:::checkpoint\nWhat does explained variance ratio tell you?\nA) How much data you have\nB) How much of total variance each PC captures\nC) The accuracy of the model\nD) The optimal number of clusters\nCorrect: B",
        quiz: [
          {
            question: "What is the first step before applying PCA?",
            options: [
              "Impute missing values",
              "Standardize the data",
              "Remove all outliers",
              "Normalize the labels",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Principal Components are:",
            options: [
              "Original features selected by importance",
              "New features that are linear combinations of original features",
              "Randomly generated features",
              "The average of all features",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "The first principal component captures:",
            options: [
              "The smallest amount of variance",
              "The maximum variance in the data",
              "No variance at all",
              "Only noise",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w28-d4",
        title: "Day 4: Feature Engineering & Feature Selection",
        description:
          "Learn how to create better features and select the most important ones",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Feature Engineering** is the process of creating new input features from existing data to improve model performance. Often cited as the most important factor in model success.\n\n## Feature Engineering Techniques\n\n### 1. Creating interaction features\nMultiply two features together: income * credit_score\n\n### 2. Binning (discretization)\nConvert continuous variables to categories: Age 0-18 = Child, 19-35 = Young Adult, etc.\n\n### 3. Date/Time features\nExtract day of week, month, hour, is_weekend, days_since_event\n\n### 4. Text features\n- Word count, character count\n- TF-IDF scores for important words\n\n### 5. Aggregated features\n- Per-customer: average order value, total orders, days since last order\n- Per-product: average rating, number of reviews\n\n### 6. Domain-specific features\nUse business knowledge: debt_to_income_ratio, profit_margin\n\n## Handling Categorical Variables\n\n**One-Hot Encoding:** Create binary columns for each category (except one to avoid dummy trap)\n- Good for: nominal categories (colors, countries)\n- Problem: creates many columns for high-cardinality features\n\n**Label Encoding:** Assign each category a number 0, 1, 2...\n- Good for: ordinal categories (small < medium < large)\n- Problem: implies order where none exists\n\n## Feature Selection\n\n### Filter Methods (before training)\n- **Correlation**: Remove highly correlated features (one of each pair)\n- **Variance Threshold**: Remove features with near-zero variance\n- **Chi-square test**: For categorical features vs target\n\n### Wrapper Methods (using model performance)\n- **Forward Selection**: Start with no features, add one at a time\n- **Backward Elimination**: Start with all features, remove one at a time\n- **Recursive Feature Elimination (RFE)**: Iteratively remove least important features\n\n### Embedded Methods (built into the model)\n- **Lasso Regression**: Automatically selects features (shrinks some to 0)\n- **Random Forest Feature Importance**: Measures how much each feature reduces impurity\n- **Tree-based feature importance**: Most widely used embedded method\n\n:::checkpoint\nWhat is feature engineering?\nA) Selecting the best features from existing ones\nB) Creating new features from existing data to improve models\nC) Removing irrelevant features\nD) Standardizing features\nCorrect: B\n\n:::checkpoint\nWhich encoding creates binary columns for categories?\nA) Label Encoding\nB) One-Hot Encoding\nC) Ordinal Encoding\nD) Binary Encoding\nCorrect: B",
        quiz: [
          {
            question:
              "Which feature selection method is built into Lasso regression?",
            options: [
              "Filter method",
              "Embedded method",
              "Wrapper method",
              "Manual selection",
            ],
            correctAnswerIndex: 1,
          },
          {
            question:
              "When should you use label encoding instead of one-hot encoding?",
            options: [
              "When categories have a natural order",
              "When there are only 2 categories",
              "Always prefer label encoding",
              "Never use label encoding",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "What is the risk of creating too many interaction features?",
            options: [
              "Underfitting",
              "Overfitting and increased complexity",
              "No risk at all",
              "Slower prediction only",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w28-d5",
        title: "Day 5: Gradient Descent & Ensemble Methods",
        description: "Understand optimization algorithms and ensemble learning",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## Gradient Descent\n\n**Gradient Descent** is an optimization algorithm that iteratively adjusts model parameters to minimize the loss function. It's how most ML models actually learn.\n\n**Analogy**: You're standing on a hill in the fog and need to reach the valley. You feel the slope of the ground and take a step downhill. You repeat until you reach the bottom.\n\n**How it works:**\n1. Start with random parameter values\n2. Calculate the gradient (slope) of the loss function\n3. Update parameters in the OPPOSITE direction of the gradient\n4. Repeat until convergence (loss stops decreasing)\n\n**Learning Rate (α):** Controls step size\n- Too large: overshoot the minimum, may diverge\n- Too small: very slow convergence\n- Typical values: 0.01, 0.001, 0.0001\n\n**Variants:**\n- **Batch GD**: Uses ALL data per step (accurate but slow)\n- **Stochastic GD (SGD)**: Uses ONE random sample per step (fast but noisy)\n- **Mini-Batch GD**: Uses a small batch (best of both, most common)\n\n## Ensemble Methods\n\n**Ensemble learning** combines multiple models to produce better predictions than any single model.\n\n### Bagging (Bootstrap Aggregating)\n- Train multiple models on different bootstrap samples of the data\n- Average (regression) or majority vote (classification)\n- Reduces variance without increasing bias\n- **Example**: Random Forest\n\n### Boosting\n- Train models sequentially, each one focusing on the mistakes of the previous\n- Reduces both bias and variance\n- **Examples**: AdaBoost, Gradient Boosting, XGBoost, LightGBM\n\n### Key Differences\n| Bagging | Boosting |\n| Parallel training (independent) | Sequential training (dependent) |\n| Reduces variance | Reduces bias and variance |\n| Less prone to overfitting | Can overfit if too many rounds |\n| Random Forest | XGBoost |\n\n### XGBoost (Extreme Gradient Boosting)\n- Optimized gradient boosting implementation\n- Handles missing values automatically\n- Built-in regularization\n- Often wins Kaggle competitions\n- Key hyperparameters: learning_rate, n_estimators, max_depth, subsample\n\n:::checkpoint\nWhat does the learning rate control in gradient descent?\nA) The number of features\nB) The step size for parameter updates\nC) The model complexity\nD) The dataset size\nCorrect: B\n\n:::checkpoint\nHow does boosting differ from bagging?\nA) Boosting trains models in parallel\nB) Boosting trains models sequentially, focusing on previous errors\nC) Boosting always uses fewer trees\nD) They are the same thing\nCorrect: B",
        quiz: [
          {
            question: "Which gradient descent variant is most commonly used?",
            options: [
              "Batch Gradient Descent",
              "Stochastic Gradient Descent",
              "Mini-Batch Gradient Descent",
              "Random Gradient Descent",
            ],
            correctAnswerIndex: 2,
          },
          {
            question: "What happens with too large a learning rate?",
            options: [
              "Training is very slow",
              "The model may overshoot and diverge",
              "The model becomes more accurate",
              "Feature scaling becomes optional",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which ensemble method is most prone to overfitting?",
            options: [
              "Random Forest (bagging)",
              "Gradient Boosting (boosting)",
              "Both equally prone",
              "Neither is prone to overfitting",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week29",
    title: "Week 29: Big Data & Advanced Concepts (Month 8)",
    durationText: "WEEK 29",
    focus: "Hadoop, Spark, Data Lakes, Time Series, Recommenders",
    output: "Understand big data ecosystem and advanced analytics concepts",
    topics: [
      {
        id: "w29-d1",
        title: "Day 1: Big Data → Hadoop, MapReduce & Gartner 3Vs",
        description:
          "Understand the big data ecosystem and its core technologies",
        type: "learn",
        duration: "45-60 mins",
        content:
          '**Big Data** refers to datasets too large or complex for traditional tools to handle. It\'s defined by the **3 Vs**:\n\n**1. Volume** → Massive quantity of data (terabytes, petabytes)\n**2. Variety** → Different data types (structured tables, text, images, video, sensor data)\n**3. Velocity** → Speed of data generation and need for real-time processing\n\nSome frameworks add more Vs: Veracity (data quality), Value (business value).\n\n## Hadoop\n\nApache Hadoop is the foundational big data framework, designed to store and process massive datasets across clusters of commodity computers.\n\n**Core components:**\n- **HDFS (Hadoop Distributed File System)**: Stores data across multiple machines with replication for fault tolerance\n- **MapReduce**: Processing framework that distributes computation across the cluster\n\n## MapReduce\n\nMapReduce has two phases:\n1. **Map**: Process input data in parallel across nodes, producing key-value pairs\n2. **Reduce**: Aggregate results from all mappers by key\n\n**Example**: Counting word frequency across millions of documents:\n- Map: Each node counts words in its chunk ? ("the", 1), ("data", 1)...\n- Shuffle: Group all counts by word\n- Reduce: Sum counts for each word ? ("the", 54312), ("data", 23491)\n\n## Modern Big Data Tools\n\n- **Apache Spark**: Faster than Hadoop MapReduce (in-memory processing). Used for data processing, ML, streaming\n- **Apache Hive**: SQL-like interface on top of Hadoop\n- **Apache Kafka**: Real-time data streaming platform\n- **Apache Flink**: Real-time stream processing\n\n## Data Lake vs Data Warehouse\n\n| Data Warehouse | Data Lake |\n| Structured, processed data | Raw data in native format |\n| Schema-on-write | Schema-on-read |\n| Expensive storage | Cheap storage (object stores) |\n| Business reporting, BI | Data science, ML, exploration |\n| Examples: Snowflake, Redshift | Examples: S3, Azure Data Lake |\n\n## Data Mart\n\nA **data mart** is a subset of a data warehouse focused on a specific business area (e.g., Sales Data Mart, Marketing Data Mart). Think of it as a department-specific slice of the warehouse.\n\n**Data Warehouse vs Data Lake vs Data Mart:**\n| Data Warehouse | Data Lake | Data Mart |\n| Enterprise-wide, structured | Raw data, any format | Department-specific subset |\n| Schema-on-write | Schema-on-read | Pre-aggregated for one use case |\n| All business areas | Everything raw | Single domain (sales, marketing, etc.) |\n| Example: company-wide Snowflake | Example: raw S3 bucket | Example: Tableau dashboard source |\n\nData marts are faster to query than full warehouses because they contain less data, pre-joined for specific needs.\n\n:::checkpoint\nWhat are Gartner\'s 3 Vs of Big Data?\nA) Volume, Variety, Velocity\nB) Volume, Value, Veracity\nC) Variety, Velocity, Value\nD) Volume, Value, Variety\nCorrect: A\n\n:::checkpoint\nHow does MapReduce work?\nA) One computer processes all data\nB) Map phase processes chunks in parallel, Reduce phase aggregates results\nC) Data is stored in a single location\nD) It only works with structured data\nCorrect: B',
        quiz: [
          {
            question: "HDFS stands for:",
            options: [
              "Hadoop Distributed File System",
              "High Density File Storage",
              "Hierarchical Data File System",
              "Hadoop Data File Storage",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Data Lake differs from Data Warehouse because:",
            options: [
              "It stores raw data in native format",
              "It requires schema before writing",
              "It's only for structured data",
              "It's more expensive",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the 'Velocity' V in big data refer to?",
            options: [
              "Data size",
              "Speed of data generation and processing needs",
              "Data types",
              "Data quality",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w29-d2",
        title: "Day 2: Apache Spark & Data Pipeline Concepts",
        description: "Understand Spark, ETL vs ELT, and cloud platforms",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Apache Spark** is a unified analytics engine for large-scale data processing. It's faster than Hadoop MapReduce because it processes data in-memory.\n\n**Key Spark components:**\n- **Spark SQL**: SQL queries on structured data\n- **Spark Streaming**: Real-time data processing\n- **MLlib**: Machine learning library\n- **GraphX**: Graph processing\n\n**RDD (Resilient Distributed Dataset)**: Core abstraction → a fault-tolerant collection of elements that can be processed in parallel.\n\n**DataFrame API**: Higher-level abstraction similar to Pandas but distributed. Most analysts use this.\n\n## Data Pipeline Concepts\n\n### ETL vs ELT\n\n**ETL (Extract, Transform, Load):**\n1. Extract data from sources\n2. Transform (clean, aggregate, join) in a staging area\n3. Load into target database/warehouse\n- Traditional approach, good for complex transformations on smaller data\n\n**ELT (Extract, Load, Transform):**\n1. Extract data from sources\n2. Load raw data into target (data lake/warehouse)\n3. Transform using the target's processing power\n- Modern approach for big data, leverages cloud warehouse power\n\n## Cloud Platforms for Data\n\n**AWS:** S3 (storage), Redshift (warehouse), EMR (Spark/Hadoop), Glue (ETL), Athena (ad-hoc SQL on S3), Kinesis (streaming)\n**GCP:** BigQuery (warehouse), Cloud Storage, Dataflow, Pub/Sub\n**Azure:** Blob Storage, Synapse Analytics, Data Factory, Event Hubs\n\n**Key concept: Medallion Architecture** (Databricks):\n- Bronze: Raw ingested data\n- Silver: Cleaned, validated data\n- Gold: Aggregated, business-ready data\n\n## Data Dictionary\n\nA **data dictionary** (or data catalog) is documentation describing every table and column in your database. It's essential for team collaboration.\n\n**What a data dictionary contains:**\n- Table name and description\n- Column names, data types, and constraints\n- Whether the column is nullable\n- Foreign key relationships\n- Business definitions (what does 'churned' mean?)\n- Ownership and update frequency\n\n**Example:**\n| Table | Column | Type | Description |\n|-------|--------|------|-------------|\n| customers | customer_id | INT PK | Unique customer identifier |\n| customers | email | VARCHAR | Customer email (used for login) |\n| orders | order_date | DATE | Date order was placed |\n\nWithout a data dictionary, analysts guess what columns mean → leading to incorrect analyses.\n\n## dbt (data build tool)\n\ndbt is a transformation tool that lets analysts write data transformations as SQL SELECT statements, then handles the DDL (CREATE TABLE, CREATE VIEW) automatically.\n\n**How dbt works:**\n1. Write a SQL file that SELECTs transformed data\n2. dbt wraps it in a CREATE TABLE or CREATE VIEW\n3. Run `dbt run` to execute all transformations in dependency order\n4. Run `dbt test` to validate data quality\n\n**Example (models/sales_summary.sql):**\n```sql\nSELECT\n    customer_id,\n    COUNT(*) as order_count,\n    SUM(amount) as total_spent\nFROM raw_orders\nGROUP BY customer_id\n```\n\ndbt enforces modularity, version control, and documentation → bringing software engineering best practices to data transformations.\n\n## Airflow\n\n**Apache Airflow** is a workflow orchestration tool that schedules and monitors data pipelines. While dbt handles the transformation logic, Airflow handles *when* things run and *what to do if they fail*.\n\n**Core concepts:**\n- **DAG (Directed Acyclic Graph)**: A pipeline defined as a Python script → each step is a task, arrows show dependencies\n- **Task**: A single unit of work (run a dbt model, execute a SQL query, send an email)\n- **Schedule**: When the DAG runs (daily at 9am, hourly, etc.)\n- **Operator**: The type of task (PythonOperator, BashOperator, EmailOperator)\n\n**Example DAG:**\n```python\nfrom airflow import DAG\nfrom airflow.operators.bash import BashOperator\n\ndag = DAG('data_pipeline', schedule_interval='@daily')\n\nextract = BashOperator(task_id='extract_data', bash_command='python extract.py')\ntransform = BashOperator(task_id='run_dbt', bash_command='dbt run')\nload = BashOperator(task_id='load_warehouse', bash_command='python load.py')\n\nextract >> transform >> load  # sets task order\n```\n\nAirflow is the industry standard for scheduling data pipelines. Knowing it exists and what it does is enough for junior roles → actual hands-on experience is a plus.\n\n:::checkpoint\nWhat makes Spark faster than Hadoop MapReduce?\nA) It uses a different programming language\nB) In-memory processing instead of disk-based\nC) It doesn't need data\nD) It uses more computers\nCorrect: B\n\n:::checkpoint\nIn ELT, when does transformation happen?\nA) Before loading\nB) After loading into the target system\nC) During extraction\nD) Transformation is not needed\nCorrect: B",
        quiz: [
          {
            question: "What does Spark SQL provide?",
            options: [
              "A NoSQL database",
              "SQL queries on structured data within Spark",
              "A replacement for Hadoop",
              "Only streaming capabilities",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "The Medallion Architecture consists of:",
            options: [
              "Gold, Silver, Platinum",
              "Bronze, Silver, Gold",
              "Raw, Cleaned, Aggregated",
              "Input, Process, Output",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which AWS service is a data warehouse?",
            options: ["S3", "Redshift", "Lambda", "EC2"],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w29-d3",
        title: "Day 3: OLTP vs OLAP, DW Schemas & Data Governance",
        description:
          "Understand database types, star/snowflake schemas, and data ethics",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## OLTP vs OLAP\n\n| OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |\n| Handles daily transactions | Handles complex queries for analysis |\n| Many small, fast queries | Fewer but complex queries |\n| Row-oriented storage | Column-oriented storage (often) |\n| Normalized tables | Denormalized (star/snowflake) |\n| Examples: order system, banking app | Examples: BI dashboards, reporting |\n| Optimized for writes | Optimized for reads |\n\n## Data Warehouse Schemas\n\n**Star Schema:**\n- One central **fact table** (metrics: sales amount, quantity)\n- Surrounding **dimension tables** (descriptive: customer, product, date)\n- Denormalized dimensions (fast queries)\n- Most common in data warehousing\n\n**Snowflake Schema:**\n- Like star schema but dimensions are normalized (split into sub-dimensions)\n- More storage efficient but slower queries due to more joins\n\n## Fuzzy Matching\n\nFuzzy matching finds strings that are similar but not identical. It's used for deduplication and record linkage when exact matches fail.\n\n**Common algorithms:**\n- **Levenshtein distance**: minimum edits (insert, delete, substitute) to turn one string into another. `'kitten'` ? `'sitting'` = 3 edits.\n- **Jaro-Winkler**: good for names → gives higher scores to strings that match at the beginning.\n- **Soundex**: matches strings that sound similar (e.g., 'Smith' and 'Smythe').\n\n**Python with fuzzywuzzy:**\n```python\nfrom fuzzywuzzy import fuzz\n\nfuzz.ratio('apple', 'aple')       # 89 (percent match)\nfuzz.partial_ratio('apple', 'applesauce')  # 100 (substring match)\nfuzz.token_sort_ratio('John Smith', 'Smith, John')  # 100 (same words, different order)\n```\n\n**Real-world use cases:**\n- Matching customer records across systems ('Bob Smith' vs 'Robert Smith')\n- Cleaning messy text data ('NY' vs 'New York')\n- Product name deduplication ('iPhone 14' vs 'Apple iPhone 14')\n\nSet a threshold score (e.g., 85/100) and manually review matches below it.\n\n## Data Governance & Ethics\n\n**Data Governance:** Framework for managing data availability, usability, integrity, and security.\n\n**Key concepts:**\n- **Data lineage**: Track data from source to destination → every transformation, join, and aggregation. When a dashboard shows a wrong number, data lineage tells you which upstream table or pipeline step caused it. Tools: dbt docs, Atlan, Alation, built-in lineage in modern warehouses.\n- **Data catalog**: Inventory of data assets\n- **Data quality**: Accuracy, completeness, consistency, timeliness\n- **Metadata management**: Data about data\n\n**Data Privacy & Compliance:**\n- **GDPR (General Data Protection Regulation)**: EU regulation protecting personal data. Key rights: access, erasure, portability\n- **PII (Personally Identifiable Information)**: Names, emails, SSN, IP addresses, etc.\n- **Data masking**: Hiding sensitive data (e.g., showing XXX-XX-1234)\n- **Data anonymization**: Removing PII so individuals can't be identified\n- **Data encryption**: Encoding data to prevent unauthorized access\n\n**Ethical data use principles:**\n- Transparency about data collection\n- Fairness (avoid algorithmic bias)\n- Accountability for data decisions\n- Privacy by design\n\n:::checkpoint\nWhat is the main difference between OLTP and OLAP?\nA) OLTP is for transactions, OLAP is for analysis\nB) OLTP is faster than OLAP\nC) OLTP uses column storage\nD) There is no difference\nCorrect: A\n\n:::checkpoint\nWhat does GDPR regulate?\nA) Data storage formats only\nB) Personal data protection and privacy for EU citizens\nC) SQL query standards\nD) Machine learning algorithms\nCorrect: B",
        quiz: [
          {
            question: "In a star schema, what contains the metrics?",
            options: [
              "Dimension table",
              "Fact table",
              "Both equally",
              "Neither",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is PII?",
            options: [
              "A SQL function",
              "Personally Identifiable Information",
              "A type of database",
              "A data warehouse schema",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which schema is more denormalized for faster queries?",
            options: [
              "Snowflake schema",
              "Star schema",
              "Both are equally normalized",
              "Neither",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w29-d4",
        title: "Day 4: Time Series Analysis Basics",
        description:
          "Learn time series concepts: stationarity, trend, seasonality, ARIMA",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Time Series Analysis** deals with data points collected or recorded at specific time intervals (daily sales, hourly website visits, monthly revenue).\n\n## Key Components\n\n**Trend**: Long-term upward or downward movement\n- Example: Annual revenue growing 10% each year\n\n**Seasonality**: Regular patterns that repeat at fixed periods\n- Example: Higher retail sales every December\n\n**Cyclical**: Patterns that repeat but not at fixed periods\n- Example: Economic boom/bust cycles lasting 5-10 years\n\n**Residual (Noise)**: Random variation that can't be explained\n\n## Stationarity\n\nA time series is **stationary** if its statistical properties (mean, variance) don't change over time. Most forecasting models require stationarity.\n\n**How to make a series stationary:**\n- Differencing: subtract previous value from current value (Y_t - Y_{t-1})\n- Log transformation: stabilize variance\n- Seasonal differencing: subtract value from same period last year\n\n## Autocorrelation\n\nCorrelation of a time series with its own past values:\n- **ACF (Autocorrelation Function)**: Correlation with lagged values\n- **PACF (Partial Autocorrelation Function)**: Correlation with lagged values after removing intermediate effects\n\n## ARIMA Model\n\n**ARIMA (AutoRegressive Integrated Moving Average)** → the most widely used time series forecasting model:\n- **AR (AutoRegressive)**: Uses past values to predict future (p = number of lag terms)\n- **I (Integrated)**: Differencing to make data stationary (d = number of differences)\n- **MA (Moving Average)**: Uses past forecast errors (q = number of error terms)\n\n**ARIMA(p,d,q)**: (p, d, q) are the three hyperparameters.\n\n## Evaluation\n\nUse the same metrics as regression: MAE, RMSE, but always evaluate on a **time-based split** (train on past, test on future) → NEVER random split!\n\n:::checkpoint\nWhat does stationarity mean in time series?\nA) Data doesn't change over time\nB) Statistical properties (mean, variance) are constant over time\nC) Data is perfectly predictable\nD) There is no seasonality\nCorrect: B\n\n:::checkpoint\nWhat does the 'I' in ARIMA stand for?\nA) Independent\nB) Integrated (differencing to make data stationary)\nC) Iterative\nD) Indexed\nCorrect: B",
        quiz: [
          {
            question: "Which time series component repeats at fixed periods?",
            options: ["Trend", "Seasonality", "Cyclical", "Noise"],
            correctAnswerIndex: 1,
          },
          {
            question: "How do you evaluate a time series forecast?",
            options: [
              "Random train/test split",
              "Time-based split (train on past, test on future)",
              "K-fold cross-validation with shuffle",
              "All of the above work equally",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the simplest way to make a series stationary?",
            options: [
              "Remove outliers",
              "Differencing (subtract previous value)",
              "Add more data",
              "Use a different model",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w29-d5",
        title: "Day 5: Recommendation Systems & Data Mining",
        description:
          "Learn recommendation approaches and core data mining concepts",
        type: "learn",
        duration: "45-60 mins",
        content:
          '**Recommendation Systems** suggest items to users based on their preferences.\n\n## Types of Recommendation Systems\n\n### 1. Collaborative Filtering\n"People like you also liked..."\n- **User-based**: Find similar users, recommend what they liked\n- **Item-based**: Find similar items to ones the user liked\n- Pros: No domain knowledge needed, serendipitous discoveries\n- Cons: Cold start problem (new users/items have no history)\n\n### 2. Content-Based Filtering\n"Because you liked this, try this similar item..."\n- Recommends items similar to what the user liked before (same genre, same category)\n- Pros: No cold start for new items, transparent recommendations\n- Cons: Limited serendipity, requires item features\n\n### 3. Hybrid Systems\nCombine collaborative and content-based approaches for best results.\n\n## Data Mining Concepts\n\n**Data Mining**: Discovering patterns and knowledge from large amounts of data. Different from Data Analysis (which tests hypotheses), data mining finds unexpected patterns.\n\n**Association Rule Learning** → Finding relationships between variables:\n- **Market Basket Analysis**: "Customers who bought X also bought Y"\n- **Support**: How often the rule applies\n- **Confidence**: How often the rule is true\n- **Lift**: How much better than random\n\n**Data Mining vs Data Analysis vs Data Profiling:**\n- **Data Mining**: Finding unknown patterns in data\n- **Data Analysis**: Testing hypotheses and answering questions\n- **Data Profiling**: Examining data to understand its structure, quality, and content\n\n**Web Scraping**: Automatically extracting data from websites using tools like BeautifulSoup (Python) or Scrapy. Important skill for collecting data when APIs aren\'t available.\n\n**In-memory Analytics**: Processing data in RAM rather than reading from disk, enabling much faster analysis. SAP HANA, Spark (in-memory processing).\n\n:::checkpoint\nWhich recommendation approach suffers from the cold start problem?\nA) Content-based filtering\nB) Collaborative filtering\nC) Both\nD) Neither\nCorrect: B\n\n:::checkpoint\nWhat does market basket analysis find?\nA) Optimal prices for products\nB) Items frequently purchased together\nC) Customer demographics\nD) Store layout optimization\nCorrect: B',
        quiz: [
          {
            question: "What is association rule learning used for?",
            options: [
              "Finding relationships between variables in data",
              "Building regression models",
              "Reducing dimensionality",
              "Clustering data",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "Which type of analytics processes data in RAM for speed?",
            options: [
              "Cloud analytics",
              "In-memory analytics",
              "Batch analytics",
              "Stream analytics",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Data Mining differs from Data Analysis because:",
            options: [
              "It finds unknown patterns rather than testing hypotheses",
              "It uses different tools",
              "It only works with big data",
              "There is no difference",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "week30",
    title: "Week 30: Product Analytics & Data Ecosystem (Month 8)",
    durationText: "WEEK 30",
    focus: "Funnel, Cohort, Attribution, Sentiment, NLP",
    output: "Apply product analytics frameworks to real business problems",
    topics: [
      {
        id: "w30-d1",
        title: "Day 1: Funnel Analysis",
        description: "Analyze user drop-off through conversion funnels",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Funnel Analysis** examines each step of a user journey to find where users drop off. It's critical for improving conversion rates.\n\n## A Typical Conversion Funnel\n\nFor a SaaS app:\n1. Visit website ? 100,000 users\n2. Sign up ? 10,000 (90% drop-off)\n3. Complete onboarding ? 3,000 (70% drop-off)\n4. First key action ? 1,500 (50% drop-off)\n5. Paid conversion ? 300 (80% drop-off)\n\n**Overall conversion rate**: 300 / 100,000 = 0.3%\n\n## Funnel Metrics\n\n- **Step conversion rate**: % of users who move from one step to the next\n- **Overall conversion rate**: % of users who complete the entire funnel\n- **Drop-off rate**: % of users who leave at each step\n\n## Identifying Funnel Problems\n\nLook for steps with abnormally high drop-off:\n- Step 2?3 (70% drop): Onboarding might be too complex\n- Step 4?5 (80% drop): Pricing might be too high\n\n## Funnel Analysis in SQL\n\n```sql\n-- Count users at each funnel step\nSELECT 'visit' AS step, COUNT(DISTINCT user_id) FROM events WHERE event = 'page_view'\nUNION ALL\nSELECT 'signup', COUNT(DISTINCT user_id) FROM events WHERE event = 'signup'\nUNION ALL\nSELECT 'onboarding', COUNT(DISTINCT user_id) FROM events WHERE event = 'onboarding_complete'\nUNION ALL\nSELECT 'purchase', COUNT(DISTINCT user_id) FROM events WHERE event = 'purchase';\n```\n\n## Segmentation Within Funnels\n\nFunnel performance often varies by segment:\n- Mobile vs Desktop users\n- New vs returning visitors\n- Traffic source (organic, paid, social, referral)\n\nAlways segment your funnel to find specific problem areas.\n\n:::checkpoint\nWhat is funnel analysis used for?\nA) Measuring revenue\nB) Identifying where users drop off in a multi-step process\nC) Predicting future sales\nD) Segmenting customers\nCorrect: B\n\n:::checkpoint\nIf 1000 users enter a funnel and 200 complete it, what is the overall conversion rate?\nA) 2%\nB) 20%\nC) 80%\nD) 200%\nCorrect: B",
        quiz: [
          {
            question: "What does step conversion rate measure?",
            options: [
              "Users who complete the entire funnel",
              "Users who move from one step to the next",
              "Total revenue generated",
              "Time spent in each step",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why segment funnels by traffic source?",
            options: [
              "Different sources may have different conversion patterns",
              "All sources convert the same way",
              "It's not useful",
              "To increase website traffic",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "A high drop-off between signup and onboarding suggests:",
            options: [
              "The pricing is wrong",
              "The onboarding is too complex or confusing",
              "Not enough users visit the site",
              "The product is too expensive",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w30-d2",
        title: "Day 2: Cohort Analysis & Advanced Segmentation",
        description: "Track user behavior over time using cohorts",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Cohort Analysis** groups users by a shared characteristic (usually signup month) and tracks their behavior over time. It reveals whether user behavior is improving or declining.\n\n## Types of Cohorts\n\n**Time-based cohorts** (most common): Group by when users signed up (Jan 2024 cohort, Feb 2024 cohort, etc.)\n\n**Behavior-based cohorts**: Group by what users did (users who completed onboarding vs those who didn't)\n\n**Size-based cohorts**: Group by account size, order value, etc.\n\n## Retention Cohort Table\n\nA retention table shows what percentage of each cohort is still active each month:\n\n| Cohort | Month 1 | Month 2 | Month 3 | Month 4 |\n| Jan 2024 | 100% | 45% | 32% | 28% |\n| Feb 2024 | 100% | 48% | 35% | 30% |\n| Mar 2024 | 100% | 42% | 30% | ✓ |\n| Apr 2024 | 100% | 40% | ✓ | ✓ |\n\n**Insight**: Feb 2024 has the best retention. Why? Maybe a product improvement was launched.\n\n## Cohort Analysis in SQL\n\n```sql\nWITH cohorts AS (\n  SELECT\n    user_id,\n    DATE_TRUNC('month', signup_date) AS cohort_month\n  FROM users\n),\nactivities AS (\n  SELECT\n    u.user_id,\n    c.cohort_month,\n    DATE_TRUNC('month', a.activity_date) AS activity_month,\n    EXTRACT('month' FROM a.activity_date) - EXTRACT('month' FROM c.cohort_month) AS month_offset\n  FROM users u\n  JOIN cohorts c ON u.user_id = c.user_id\n  JOIN user_activities a ON u.user_id = a.user_id\n)\nSELECT\n  cohort_month,\n  month_offset,\n  COUNT(DISTINCT user_id) AS active_users\nFROM activities\nGROUP BY cohort_month, month_offset\nORDER BY cohort_month, month_offset;\n```\n\n## Segmentation Deep Dive\n\n**RFM Analysis** (Recency, Frequency, Monetary):\n- **Recency**: How recently did the customer purchase?\n- **Frequency**: How often do they purchase?\n- **Monetary**: How much do they spend?\n\nSegment customers into groups:\n- Champions: high R, high F, high M\n- Loyal customers: high F, medium M\n- At risk: low R, medium F\n- Lost: low R, low F\n\nRFM is one of the most practical segmentation frameworks used in every industry.\n\n:::checkpoint\nA retention cohort table tracks:\nA) Total revenue each month\nB) How a group of users behaves over time after a shared event\nC) Daily active users\nD) Page views per session\nCorrect: B\n\n:::checkpoint\nWhat does RFM stand for?\nA) Revenue, Frequency, Margin\nB) Recency, Frequency, Monetary\nC) Reach, Frequency, Model\nD) Recency, Focus, Metric\nCorrect: B",
        quiz: [
          {
            question: "What is a time-based cohort?",
            options: [
              "Users grouped by signup period",
              "Users grouped by behavior",
              "Users grouped by geography",
              "Users grouped by device type",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What does the Recency metric in RFM measure?",
            options: [
              "How much the customer spends",
              "How recently the customer purchased",
              "How often the customer purchases",
              "How many products the customer buys",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Improving cohort retention over time indicates:",
            options: [
              "Product is getting worse",
              "Product or experience is improving",
              "More users are signing up",
              "Revenue is decreasing",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w30-d3",
        title: "Day 3: Attribution Modeling & Campaign Analysis",
        description:
          "Understand how credit is assigned to marketing touchpoints",
        type: "learn",
        duration: "45-60 mins",
        content:
          '**Attribution Modeling** determines which marketing channels get credit for a conversion. It answers: "Which ads, emails, or campaigns actually drove the sale?"\n\n## Common Attribution Models\n\n**1. First-Touch Attribution**\n100% credit goes to the first channel the customer interacted with.\n- Good for: understanding which channels drive initial awareness\n- Problem: ignores all subsequent touchpoints\n\n**2. Last-Touch Attribution**\n100% credit goes to the last channel before conversion.\n- Good for: understanding which channels close the deal\n- Problem: ignores awareness-building channels\n\n**3. Linear Attribution**\nEqual credit (1/n) to every touchpoint in the customer journey.\n- Fair distribution, but doesn\'t reflect different impact of each touchpoint\n\n**4. Time-Decay Attribution**\nMore credit to touchpoints closer to conversion.\n- Reflects that recent interactions are more influential\n\n**5. Position-Based (U-Shaped) Attribution**\n40% to first touch, 40% to last touch, 20% spread across middle touches.\n- Balances awareness and conversion influences\n\n**6. Data-Driven Attribution**\nUses ML algorithms to assign credit based on actual impact.\n- Most accurate but requires sufficient data\n\n## Campaign Performance Analysis\n\n**Key campaign metrics:**\n- **CTR** (Click-Through Rate): clicks / impressions\n- **CVR** (Conversion Rate): conversions / clicks\n- **CPA** (Cost Per Acquisition): total spend / conversions\n- **ROAS** (Return on Ad Spend): revenue / ad spend\n- **Impressions**: How many times the ad was shown\n\n**Analysis SQL example:**\n```sql\nSELECT\n  campaign_name,\n  channel,\n  SUM(spend) AS total_spend,\n  SUM(revenue) AS total_revenue,\n  SUM(revenue) / NULLIF(SUM(spend), 0) AS roas\nFROM marketing_spend\nGROUP BY campaign_name, channel\nORDER BY roas DESC;\n```\n\n**Pitfalls to watch for:**\n- Attribution is never perfectly accurate (users use multiple devices)\n- Last-touch overvalues bottom-of-funnel channels\n- First-touch overvalues top-of-funnel channels\n\n:::checkpoint\nWhich attribution model gives all credit to the first interaction?\nA) Last-touch\nB) First-touch\nC) Linear\nD) Time-decay\nCorrect: B\n\n:::checkpoint\nROAS measures:\nA) Clicks per impression\nB) Revenue generated per dollar spent on ads\nC) Total ad spend\nD) Number of campaigns\nCorrect: B',
        quiz: [
          {
            question:
              "Which attribution model spreads credit equally across touchpoints?",
            options: ["First-touch", "Last-touch", "Linear", "Position-based"],
            correctAnswerIndex: 2,
          },
          {
            question: "What is CPA?",
            options: [
              "Cost Per Acquisition",
              "Click Per Action",
              "Conversion Per Advertisement",
              "Campaign Performance Average",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Time-decay attribution gives more credit to:",
            options: [
              "Earliest touchpoints",
              "Touchpoints closest to conversion",
              "Middle touchpoints",
              "All touchpoints equally",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w30-d4",
        title: "Day 4: Sentiment Analysis & NLP Basics",
        description: "Learn natural language processing for text analytics",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Sentiment Analysis** determines the emotional tone behind text (positive, negative, neutral). It's one of the most common NLP applications.\n\n## NLP Pipeline\n\n1. **Text Cleaning**: Remove HTML tags, special characters, lowercase\n2. **Tokenization**: Split text into individual words/tokens\n3. **Stop Word Removal**: Remove common words (the, and, is, a)\n4. **Stemming/Lemmatization**: Reduce words to root form (running ? run, better ? good)\n5. **Vectorization**: Convert text to numbers\n\n## Bag of Words (BoW)\n\nSimple approach: Count how many times each word appears in a document.\n- Creates a sparse matrix where rows = documents, columns = words\n- Loses word order and context\n\n## TF-IDF (Term Frequency → Inverse Document Frequency)\n\nImprovement over Bag of Words. Weighs words by how important they are:\n- **TF**: How often a word appears in a document\n- **IDF**: How rare the word is across ALL documents (rare words get higher weight)\n- TF-IDF = TF * IDF\n\nCommon words like 'the' get low IDF (appear everywhere), so they get low weight.\nDomain-specific words get high weight.\n\n## Sentiment Analysis Approaches\n\n**Lexicon-based**: Use a dictionary of positive/negative words. Count sentiment words.\n- Pros: No training data needed\n- Cons: Doesn't understand context (\"not good\" vs \"good\")\n\n**Machine Learning**: Train a classifier on labeled data (positive/negative reviews).\n- Common: Naive Bayes, Logistic Regression, LSTM\n- Requires labeled training data\n\n## Common NLP Libraries\n\n- **NLTK (Natural Language Toolkit)**: Classic NLP library, education, research\n- **spaCy**: Modern, fast, production-ready NLP\n- **TextBlob**: Simple sentiment analysis API\n- **Transformers (Hugging Face)**: State-of-the-art deep learning models (BERT, GPT)\n\n## Applications in Business\n\n- Customer feedback analysis\n- Social media monitoring\n- Product review analysis\n- Brand reputation tracking\n- Support ticket categorization\n\n:::checkpoint\nWhat is tokenization in NLP?\nA) Converting text to numbers\nB) Splitting text into individual words or tokens\nC) Removing punctuation\nD) Translating text\nCorrect: B\n\n:::checkpoint\nTF-IDF gives higher weight to:\nA) Common words that appear everywhere\nB) Words that are rare but appear in specific documents\nC) The first word of each sentence\nD) Proper nouns only\nCorrect: B",
        quiz: [
          {
            question: "What is the simplest text vectorization method?",
            options: ["TF-IDF", "Bag of Words", "Word2Vec", "BERT embeddings"],
            correctAnswerIndex: 1,
          },
          {
            question: "Stemming reduces words to:",
            options: [
              "Their dictionary form",
              "Their root form (possibly not a real word)",
              "Their uppercase version",
              "The first 3 letters",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Which NLP library is best for production use?",
            options: [
              "NLTK",
              "spaCy",
              "TextBlob",
              "All are equally production-ready",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w30-d5",
        title: "Day 5: Kano Analysis, Monte Carlo & Data Wrangling",
        description: "Additional frameworks and essential data skills",
        type: "learn",
        duration: "45-60 mins",
        content:
          "## Kano Analysis\n\n**Kano Model** categorizes product features based on how they affect customer satisfaction.\n\n**Feature categories:**\n1. **Basic (Threshold) Features**: Expected by customers. If missing, extreme dissatisfaction. If present, no increased satisfaction. (Example: brakes on a car)\n2. **Performance Features**: More is better. Directly proportional to satisfaction. (Example: battery life)\n3. **Delighters (Excitement Features)**: Unexpected features that create delight. If present, high satisfaction. If missing, no dissatisfaction. (Example: heated seats in a car)\n4. **Indifferent**: Don't affect satisfaction either way.\n5. **Reverse**: Some customers prefer them, others don't.\n\n**Business implication**: Invest in performance features first, maintain basic features, add delighters strategically.\n\n## Monte Carlo Simulation\n\n**Monte Carlo** uses random sampling to model the probability of different outcomes. It's used for risk analysis, project timelines, financial forecasting.\n\n**How it works:**\n1. Define input variables with probability distributions\n2. Randomly sample from each distribution\n3. Calculate the outcome\n4. Repeat thousands of times\n5. Analyze the distribution of outcomes\n\n**Example: Project timeline**\n- Best case: 3 months\n- Most likely: 5 months\n- Worst case: 12 months\nRun 10,000 simulations ? 70% chance of finishing within 6 months.\n\n## Data Wrangling\n\n**Data Wrangling** (aka Data Munging) is the process of cleaning, transforming, and mapping raw data into a usable format. It's 60-80% of a data analyst's actual work.\n\n**Typical wrangling steps:**\n1. Discovery: Profile data to understand its shape\n2. Structuring: Reshape (pivot, melt, join)\n3. Cleaning: Fix missing values, outliers, duplicates\n4. Enriching: Add external data sources\n5. Validating: Check consistency and quality\n6. Publishing: Prepare for consumption\n\n**Tools**: Pandas (Python), dplyr (R), Power Query (Excel/BI), SQL\n\n## Agile & Scrum\n\nAn **agile sprint** is a fixed time period (usually 1-2 weeks) in which a team completes a defined set of tasks. It's the core unit of work in agile project management.\n\n**Sprint events:**\n- **Planning**: Team commits to tasks for the sprint\n- **Daily standup**: 15-min check-in on progress and blockers\n- **Review**: Demo completed work to stakeholders\n- **Retrospective**: Discuss improvements for next sprint\n\nData analysts participate in sprints by estimating task effort, reporting progress in standups, and delivering analysis by sprint end. Understanding sprints helps you integrate into any modern data team.\n\n**Web Scraping Tools**: BeautifulSoup (Python), Scrapy, Selenium, Octoparse\n\n**API Data Collection**: REST APIs, JSON parsing, authentication tokens\n\n:::checkpoint\nIn Kano Analysis, a missing basic feature causes:\nA) Slight annoyance\nB) Extreme dissatisfaction\nC) No reaction\nD) Delight\nCorrect: B\n\n:::checkpoint\nMonte Carlo simulation is used for:\nA) Predicting exact outcomes\nB) Modeling probability distributions of possible outcomes\nC) Removing outliers\nD) Cleaning data\nCorrect: B",
        quiz: [
          {
            question: "What are Delighters in the Kano Model?",
            options: [
              "Expected features",
              "Unexpected features that create high satisfaction",
              "Features proportional to satisfaction",
              "Features customers dislike",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What percentage of data work is data wrangling?",
            options: ["10-20%", "60-80%", "90-100%", "5-10%"],
            correctAnswerIndex: 1,
          },
          {
            question: "Monte Carlo repeats simulations to:",
            options: [
              "Find the exact answer",
              "Build a probability distribution of outcomes",
              "Eliminate randomness",
              "Speed up calculations",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "week24",
    title: "Week 31: Interview Prep (Month 8)",
    durationText: "WEEK 31",
    focus: "Job Launch Preparation",
    output: "Interview-ready candidate",
    topics: [
      {
        id: "w24-d1",
        title: "Day 1: Behavioral Setup",
        description: "Prepare STAR stories for behavioral interviews",
        type: "learn",
        duration: "45-60 mins",
        content:
          "**Behavioral interviews** assess soft skills: communication, teamwork, problem-solving, adaptability.\n\n**The STAR mmethod** → structure every answer:\n- **Situation** → set the context\n- **Task** → what needed to be done\n- **Action** → what YOU did (use 'I', not 'we')\n- **Result** → what happened (quantify if possible)\n\n**Common behavioral questions for data analysts:**\n- 'Tell me about a time you used data to solve a problem.'\n- 'Describe a project where you had to communicate a complex finding to a non-technical audience.'\n- 'Tell me about a time you made a mistake in your analysis. How did you handle it?'\n- 'How do you handle competing deadlines?'\n\n**Preparation:**\n- Prepare 5-6 STAR stories covering different skills\n- Practice out loud (record yourself)\n- Keep stories to 60-90 seconds\n\nBehavioral questions test if you're someone they want to work with → not just someone who can write queries.\n\n:::checkpoint\nWhat does STAR stand for in interview preparation?\nA) Start, Task, Action, Result\nB) Situation, Task, Action, Result\nC) Story, Task, Answer, Review\nD) Situation, Time, Action, Response\nCorrect: B",
        quiz: [
          {
            question: "What does STAR stand for?",
            options: [
              "Start, Task, Action, Result",
              "Situation, Task, Action, Result",
              "Story, Task, Answer, Review",
              "Situation, Time, Action, Response",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w24-d2",
        title: "Day 2: SQL Interviews",
        description: "Practice common SQL interview questions",
        type: "practice",
        duration: "45-60 mins",
        content:
          "SQL is the most commonly tested technical skill in data analyst interviews. Expect live coding or take-home exercises.\n\n**Common SQL interview questions:**\n- 'Write a query to find employees who earn more than their department average.' (correlated subquery or window function)\n- 'Find the top 3 products by revenue.' (GROUP BY + ORDER BY + LIMIT)\n- 'Find customers who haven't ordered in the last 90 days.' (date filtering + LEFT JOIN or NOT IN)\n- 'Calculate month-over-month revenue change.' (LAG or self join)\n\n**Interview tip → think out loud:**\n1. Restate the problem in your own words\n2. Describe your approach before writing code\n3. Write the query step by step\n4. Test with sample data mentally\n5. Refine if needed\n\n**Practice resources:**\n- LeetCode (SQL section)\n- HackerRank (SQL)\n- Stratascratch (real interview questions)\n\nPractice 2-3 SQL problems daily during your job search.\n\n:::checkpoint\nWhat's the most important thing to do during a SQL interview?\nA) Write perfect code immediately\nB) Think out loud and explain your approach\nC) Stay silent until you're done\nD) Use the most complex syntax possible\nCorrect: B",
        quiz: [
          {
            question: "Most important during SQL interview?",
            options: [
              "Perfect code immediately",
              "Think out loud and explain approach",
              "Stay silent",
              "Use complex syntax",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w24-d3",
        title: "Day 3: Python Interviews",
        description: "Practice common Python data analysis questions",
        type: "learn",
        duration: "45-60 mins",
        content:
          "Python interviews test your ability to manipulate data programmatically.\n\n**Common Python interview topics:**\n- **Pandas** → filter, group, merge, pivot\n- **Data cleaning** → handle missing values, outliers\n- **Lists and dictionaries** → comprehensions, sorting, filtering\n- **Functions** → write reusable code\n- **Basic stats** → mean, median, correlation\n\n**Sample Python question:**\n'Given a DataFrame of sales data, calculate the month-over-month growth rate for each product.'\n\n```python\ndef calculate_growth(df):\n    df = df.sort_values(['product', 'month'])\n    df['prev_sales'] = df.groupby('product')['sales'].shift(1)\n    df['growth'] = ((df['sales'] - df['prev_sales']) / df['prev_sales']) * 100\n    return df\n```\n\n**Preparation tips:**\n- Practice on LeetCode (Easy/Medium Pandas questions)\n- Know your .loc, .iloc, groupby, merge by heart\n- Be ready to explain your code and discuss alternatives\n\nEmphasize clean, readable code over clever one-liners.\n\n:::checkpoint\nWhat's the best way to prepare for Python data interviews?\nA) Read documentation\nB) Practice writing Pandas code on real or sample data\nC) Watch tutorial videos\nD) Memorize syntax\nCorrect: B",
        quiz: [
          {
            question: "Best way to prepare for Python interviews?",
            options: [
              "Read docs",
              "Practice Pandas on real data",
              "Watch videos",
              "Memorize syntax",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w24-d4",
        title: "Day 4: Mock Interview",
        description: "Simulate real interviews to build confidence",
        type: "practice",
        duration: "45-60 mins",
        content:
          "A **mock interview** is the best way to prepare → it exposes gaps in your knowledge and reduces anxiety before the real thing.\n\n**How to run a mock interview:**\n1. **Find a partner** → friend, mentor, or use services like Pramp or InterviewBuddy\n2. **Set a timer** → 30-45 minutes for behavioral + technical\n3. **Record yourself** → watch for nervous habits, rambling, unclear explanations\n4. **Get feedback** → what went well? What to improve?\n\n**Self-practice:**\n- Set a timer for 5 minutes per behavioral question\n- Record audio answers on your phone\n- Listen back and refine\n\n**Common mistakes to fix:**\n- Talking too fast (slow down!)\n- Not answering the actual question (listen carefully)\n- Rambling without structure (use STAR)\n- Not asking questions at the end (always prepare 2-3 questions)\n\nThe goal isn't perfection → it's confidence and clarity.\n\n:::checkpoint\nWhat's the best way to prepare for interview anxiety?\nA) Avoid thinking about it\nB) Do mock interviews and practice out loud\nC) Memorize answers\nD) Arrive early\nCorrect: B",
        quiz: [
          {
            question: "Best way to prepare for interview anxiety?",
            options: [
              "Avoid thinking",
              "Mock interviews and practice out loud",
              "Memorize answers",
              "Arrive early",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w24-d5",
        title: "Day 5: Final Milestone: Job Readiness",
        description: "Complete all pre-application preparation",
        type: "project",
        duration: "2-3 hrs",
        content:
          "Congratulations → you've completed the full curriculum! This final milestone ties everything together.\n\n**Final Checklist:**\n\n1. **Complete portfolio** → 3-5 projects on GitHub with good READMEs\n2. **Active LinkedIn** → optimized profile, posted about your journey\n3. **Resume ready** → tailored for your target role\n4. **STAR stories** → 5-6 prepared behavioral answers\n5. **SQL skills** → can solve LeetCode Medium SQL problems\n6. **Python skills** → comfortable with Pandas data manipulation\n7. **BI skills** → can build an interactive dashboard\n8. **Applications tracker** → organized job search spreadsheet\n\n**Next steps after this course:**\n- Apply to 5-10 jobs per week\n- Continue learning (advanced topics: machine learning, cloud)\n- Join data communities and network\n- Never stop building projects\n\nYou now have the skills to start a career as a data analyst. Go get it.\n\n:::checkpoint\nWhat's the most important thing after completing this course?\nA) Take a break\nB) Start applying and keep building projects to reinforce skills\nC) Buy more courses\nD) Forget everything and start over\nCorrect: B",
        quiz: [
          {
            question: "Most important after course completion?",
            options: [
              "Take break",
              "Start applying and keep building",
              "Buy more courses",
              "Forget everything",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Complete portfolio on GitHub",
          "Optimized LinkedIn profile",
          "Tailored resume for target role",
          "5-6 STAR stories prepared",
          "SQL/Python practice problems done",
          "Job application tracker created",
        ],
      },
    ],
  },
  {
    id: "week31",
    title: "Week 32: Portfolio Projects Capstone (Month 8)",
    durationText: "WEEK 32",
    focus: "End-to-End Portfolio Projects",
    output:
      "4 portfolio projects: Sales Dashboard, Customer Segmentation, Churn Prediction, A/B Test",
    topics: [
      {
        id: "w31-d1",
        title: "Day 1: Project Planning Framework & Sales Dashboard",
        description:
          "Learn the project workflow and build an e-commerce sales dashboard",
        type: "project",
        duration: "2-3 hrs",
        content:
          '## Project Planning Framework\n\nEvery data analysis project follows the same structure:\n\n1. **Business Question**: What problem are we solving? (e.g., "Why is revenue declining?")\n2. **Metric Definition**: What will we measure? (e.g., monthly revenue, AOV, conversion rate)\n3. **Data Collection**: Where is the data? (SQL queries, CSV files, APIs)\n4. **Data Cleaning**: Handle missing values, outliers, duplicates\n5. **Exploratory Analysis**: Visualize distributions, correlations, trends\n6. **Modeling / Deep Dive**: Statistical tests, ML models as needed\n7. **Insights & Recommendations**: What does the data say? What should we do?\n8. **Presentation**: Dashboard, report, or slide deck for stakeholders\n\n## Project 1: E-commerce Sales Dashboard\n\n**Business Question**: How is our online store performing across products, regions, and time?\n\n**Tools**: SQL + Power BI (or Tableau)\n\n**Steps:**\n1. Write SQL queries to extract: total revenue by month, top products by revenue, revenue by region, customer acquisition trends\n2. Load data into Power BI\n3. Create visuals: line chart for revenue over time, bar chart for top products, map for regional sales, KPI cards for totals\n4. Add slicers for date range, product category, region\n5. Add a drill-down page for product-level detail\n\n**Deliverable**: Interactive dashboard with 4-5 visuals, slicers, and at least one drill-down page.\n\n**Portfolio tip**: Take a screenshot and write a paragraph explaining: the business question, your approach, key insights (e.g., "Top 20% of products generate 68% of revenue").\n\n:::checkpoint\nWhat is the first step in any data analysis project?\nA) Collect data\nB) Define the business question\nC) Build a model\nD) Create visualizations\nCorrect: B\n\n:::checkpoint\nWhat makes a good portfolio project?\nA) Complex code\nB) Clear business question, process, insights, and recommendations\nC) Using every tool you know\nD) Longest possible analysis\nCorrect: B',
        quiz: [
          {
            question: "What should every portfolio project include?",
            options: [
              "Only code",
              "Business question, process, insights, recommendations",
              "At least 10 charts",
              "Machine learning model",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the first step in the data project framework?",
            options: [
              "Data cleaning",
              "Business question definition",
              "Data collection",
              "Model building",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Define a business question for your project",
          "Write SQL queries to extract data",
          "Build an interactive dashboard with 4+ visuals",
          "Include at least one slicer and one drill-down",
        ],
      },
      {
        id: "w31-d2",
        title: "Day 2: Project 2 → Customer Segmentation (RFM + K-Means)",
        description:
          "Segment customers using RFM analysis and K-Means clustering",
        type: "project",
        duration: "2-3 hrs",
        content:
          "## Project 2: Customer Segmentation\n\n**Business Question**: How can we group our customers to target them with different marketing strategies?\n\n**Tools**: Python (Pandas, Scikit-learn)\n\n**Dataset**: Online Retail dataset (UCI) or create synthetic customer data with: customer_id, purchase_date, amount, product_id\n\n**Steps:**\n1. **Calculate RFM metrics** for each customer:\n   - Recency: days since last purchase\n   - Frequency: number of purchases\n   - Monetary: total spend\n2. **Scale the features** using StandardScaler\n3. **Apply K-Means** (try K=3 to K=6, use elbow method + silhouette score)\n4. **Analyze clusters**: What defines each segment? (e.g., Cluster 0: high spenders who buy often, Cluster 1: infrequent small spenders)\n5. **Name the segments**: Champions, Loyal, At Risk, Lost, New\n\n**Hints:**\n- Use `groupby('customer_id')` to compute Recency, Frequency, Monetary\n- Import `StandardScaler` and `KMeans` from sklearn\n- Experiment with different K values and use the elbow method\n- Examine cluster means to label each segment\n\n**Deliverable**: Python notebook showing: RFM table, elbow plot, cluster characteristics (mean recency/frequency/monetary per cluster), and bar chart of segment sizes.\n\n**Business recommendation**: \"Send loyalty rewards to Champions, re-engagement emails to At Risk segment.\"\n\n:::checkpoint\nWhat does RFM stand for?\nA) Revenue, Frequency, Market\nB) Recency, Frequency, Monetary\nC) Reach, Frequency, Margin\nD) Recency, Focus, Model\nCorrect: B\n\n:::checkpoint\nWhy use K-Means for customer segmentation?\nA) It's supervised and gives exact labels\nB) It groups similar customers without predefined categories\nC) It predicts future purchases\nD) It's the only clustering algorithm available\nCorrect: B",
        quiz: [
          {
            question: "What does the elbow method help determine in K-Means?",
            options: [
              "The best features to use",
              "The optimal number of clusters",
              "The accuracy of the model",
              "The distance metric",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should you do after identifying customer segments?",
            options: [
              "Nothing, the analysis is done",
              "Make business recommendations for each segment",
              "Delete the lowest-value segment",
              "Only focus on the largest segment",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Calculate RFM metrics for customers",
          "Scale features and apply K-Means",
          "Create elbow plot and silhouette score",
          "Describe each segment with business recommendations",
        ],
      },
      {
        id: "w31-d3",
        title: "Day 3: Project 3 → Customer Churn Prediction",
        description: "Build an ML pipeline to predict customer churn",
        type: "project",
        duration: "2-3 hrs",
        content:
          '## Project 3: Customer Churn Prediction\n\n**Business Question**: Which customers are likely to leave, and what drives churn?\n\n**Tools**: Python (Pandas, Scikit-learn, Matplotlib)\n\n**Dataset**: Telco Customer Churn (Kaggle) or create synthetic data\n\n**The ML Pipeline:**\n\n### 1. Data Cleaning\n- Handle missing values (TotalCharges has blanks)\n- Encode categorical variables (one-hot encoding)\n- Convert target (Churn: Yes/No ? 1/0)\n\n### 2. Exploratory Data Analysis\n- Churn rate overall\n- Churn by contract type, payment method, tenure\n- Correlation heatmap\n\n### 3. Feature Engineering\n- Create new features: average monthly spend per year of tenure\n- Scale numerical features\n\n### 4. Model Building\nUse `train_test_split` from sklearn and try `RandomForestClassifier`. Experiment with `n_estimators` and `max_depth`.\n\n### 5. Evaluation\nPrint confusion matrix, accuracy, precision, recall, F1 score, AUC.\n\n### 6. Feature Importance\nUse `model.feature_importances_` to find which features predict churn best. Sort and plot the top 10.\n\n**Deliverable**: Python notebook with: EDA, data cleaning, model training, evaluation metrics, feature importance chart, and business recommendations.\n\n**Business recommendation**: "Customers with month-to-month contracts are 3x more likely to churn. Offer annual contract discounts."\n\n:::checkpoint\nWhat is the purpose of a train/test split?\nA) To make training faster\nB) To evaluate model performance on unseen data\nC) To reduce data size\nD) To balance classes\nCorrect: B\n\n:::checkpoint\nWhat does feature importance tell you?\nA) How fast the model trains\nB) Which features are most predictive of the target\nC) The accuracy of each feature\nD) The correlation between features\nCorrect: B',
        quiz: [
          {
            question:
              "Which metric is most important for an imbalanced churn problem?",
            options: [
              "Accuracy",
              "Precision, Recall, or F1 Score",
              "R-squared",
              "MAE",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should you do AFTER building a predictive model?",
            options: [
              "Deploy it immediately",
              "Evaluate it and translate results into business recommendations",
              "Delete the dataset",
              "Only report the accuracy",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Clean and preprocess the dataset",
          "Build at least one classification model",
          "Evaluate with confusion matrix and metrics",
          "Show feature importance chart",
          "Provide business recommendations",
        ],
      },
      {
        id: "w31-d4",
        title: "Day 4: Project 4 → A/B Test Analysis",
        description: "Design and analyze an A/B test end-to-end",
        type: "project",
        duration: "2-3 hrs",
        content:
          '## Project 4: A/B Test Analysis\n\n**Business Question**: Does a new website layout increase conversion rate?\n\n**Tools**: Python (stats, scipy) or SQL\n\n**Dataset**: Simulated A/B test data with: user_id, variant (A/B), converted (True/False), session_duration\n\n**The A/B Test Analysis Pipeline:**\n\n### 1. Define Metrics\n- **Primary metric**: Conversion rate (converted / total)\n- **Secondary metrics**: Average session duration, pages per session, bounce rate\n\n### 2. Check Sample Sizes\nUse `scipy.stats.norm` to calculate required sample size per variant given your baseline conversion rate, minimum detectable effect, alpha (0.05), and power (0.8).\n\n### 3. Calculate Results\nBuild a contingency table of converted vs not-converted for each variant. Use `scipy.stats.chi2_contingency` to test for statistical significance.\n\n### 4. Interpret Results\n- p < 0.05: Statistically significant difference\n- Report: conversion rate for each variant, absolute lift, relative lift, confidence interval\n\n### 5. Business Recommendation\n"Variant B increased conversion by 15% (p=0.003). Recommend rolling out to all users."\n\n**Deliverable**: Python notebook or report with: hypothesis definition, sample size calculation, results table, statistical test output, and clear business recommendation.\n\n**Portfolio tip**: Include caveats → "This test ran for 2 weeks. Results may not generalize to seasonal periods."\n\n:::checkpoint\nWhat is the purpose of A/A testing?\nA) Comparing two different variants\nB) Validating that the experiment setup has no bias\nC) Testing the same variant against itself\nD) Both B and C\nCorrect: D\n\n:::checkpoint\nWhat does p < 0.05 mean in A/B testing?\nA) Variant B is definitely better\nB) There\'s less than 5% chance the observed difference is due to random chance\nC) The sample size is too small\nD) The test is invalid\nCorrect: B',
        quiz: [
          {
            question: "What is the minimum detectable effect?",
            options: [
              "The smallest change worth detecting",
              "The maximum possible improvement",
              "The effect size of the control group",
              "The p-value threshold",
            ],
            correctAnswerIndex: 0,
          },
          {
            question:
              "Why calculate required sample size before running an A/B test?",
            options: [
              "To save server costs",
              "To ensure the test has enough statistical power",
              "To speed up the test",
              "Sample size doesn't matter",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Define null and alternative hypotheses",
          "Calculate required sample size",
          "Perform chi-square test for conversion",
          "Calculate lift and confidence intervals",
          "Write a clear business recommendation",
        ],
      },
      {
        id: "w31-d5",
        title: "Day 5: Portfolio Presentation & Interview Prep",
        description: "Package your projects for job applications",
        type: "review",
        duration: "45-60 mins",
        content:
          '## Portfolio Presentation\n\nYour projects are only valuable if people can find and understand them.\n\n### GitHub README Template\n\n```markdown\n# Project Title\n\n**Business Question**: [One sentence]\n\n**Tools Used**: [SQL, Python, Power BI, etc.]\n\n## Process\n1. Data collection: [source]\n2. Data cleaning: [what was done]\n3. Analysis: [approach]\n4. Results: [key findings]\n\n## Key Insights\n- Insight 1\n- Insight 2\n\n## Recommendations\n- Recommendation 1\n- Recommendation 2\n\n## Files\n- `analysis.ipynb`: Jupyter notebook\n- `dashboard.pbix`: Power BI file\n- `data/`: Sample data (if shareable)\n```\n\n### Publishing Options\n- **GitHub Pages**: Host notebooks as static sites\n- **Tableau Public**: Free dashboard hosting\n- **Power BI Service**: Share dashboards (free tier available)\n- **LinkedIn Articles**: Write about your process and insights\n- **Medium**: Blog about your projects\n\n### STAR Stories for Your Projects\n\nConvert each project into a STAR story:\n- **Situation**: "Our e-commerce company was losing customers..."\n- **Task**: "I needed to understand which customers were at risk..."\n- **Action**: "I built a churn prediction model using Random Forest..."\n- **Result**: "Identified top 3 churn drivers, leading to a 15% reduction in churn."\n\n### Case Study Interview Framework\n\nSome interviews give you a case study:\n1. Clarify the question (ask questions!)\n2. Define metrics\n3. Outline your approach\n4. Identify data needed\n5. Discuss potential insights\n6. Make a recommendation\n\n**Pro tip**: Think out loud. Interviewers want to see your thought process, not just the final answer.\n\n:::checkpoint\nWhat\'s the most important element of a portfolio project README?\nA) Long code snippets\nB) Clear business question, process, and results\nC) Colorful badges\nD) Multiple file attachments\nCorrect: B',
        quiz: [
          {
            question: "How should you present a project in a portfolio?",
            options: [
              "Just the code",
              "Business question, process, results, and code link",
              "Only the final dashboard",
              "Only the summary",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What's the best approach for a case study interview?",
            options: [
              "Give the answer immediately",
              "Ask clarifying questions and think out loud",
              "Stay silent while working",
              "Skip the data discussion",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is a STAR story for portfolio projects?",
            options: [
              "A story about stars",
              "Situation, Task, Action, Result → structured project narrative",
              "A technical specification",
              "A list of tools used",
            ],
            correctAnswerIndex: 1,
          },
        ],
        requirements: [
          "Write a README for each portfolio project",
          "Publish at least one dashboard publicly",
          "Prepare a STAR story for each project",
          "Practice explaining your projects in 2 minutes",
        ],
      },
    ],
  },
  {
    id: "week25",
    title: "Week 33: Final Review & Portfolio Polish (Month 9)",
    durationText: "WEEK 33",
    focus: "Course Recap & Portfolio Completion",
    output: "Published Portfolio, Job-Ready Profile",
    topics: [
      {
        id: "w25-d1",
        title: "Day 1: Full-Course Recap",
        description: "Review all key concepts across all 35 weeks",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Full-Course Recap** → This final week we review everything you've learned across the full curriculum.\n\n**Key areas covered:**\n- **Excel & Spreadsheets** → formulas, pivot tables, charts, Power Query\n- **Git & Version Control** → init, add, commit, branch, merge, push, pull, clone\n- **SQL & Databases** → queries, joins, aggregations, window functions, DML, database design\n- **Python & Pandas** → data manipulation, cleaning, analysis, EDA, automation\n- **Data Visualization & BI** → charts, dashboards, storytelling, Power BI, DAX\n- **Statistics** → descriptive stats, probability, distributions, hypothesis testing, t-tests, chi-square, ANOVA, regression, A/B testing\n- **Machine Learning** → supervised/unsupervised learning, regression, classification, clustering, evaluation, feature engineering\n- **Big Data & Cloud** → Hadoop, Spark, data lakes, ETL/ELT, OLTP/OLAP, star schema\n- **Product Analytics** → funnel analysis, cohort analysis, attribution, sentiment analysis\n- **Portfolio & Job Launch** → projects, READMEs, resume, LinkedIn, interview prep, STAR stories\n\n**Self-assessment checklist:**\n- Can you write a multi-table SQL query with window functions?\n- Can you clean, analyze, and visualize a dataset with Pandas?\n- Can you build and publish an interactive dashboard?\n- Can you explain the difference between supervised and unsupervised learning?\n- Can you build and evaluate a classification model?\n- Can you analyze a product funnel or A/B test?\n- Can you present your projects and STAR stories confidently?\n\nReview any weak areas before moving forward.\n\n:::checkpoint\nWhat should you do if you find a weak area during this review?\nA) Skip it and move on\nB) Review the relevant course materials and practice more\nC) Only focus on your strongest skills\nD) Start a new course immediately\nCorrect: B",
        quiz: [
          {
            question: "How should you handle weak areas found during review?",
            options: [
              "Skip them",
              "Review materials and practice more",
              "Focus only on strengths",
              "Start a new course",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
      {
        id: "w25-d2",
        title: "Day 2: Portfolio Polish",
        description: "Final touches on your portfolio projects",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Portfolio Polish** → Your portfolio is your most important job search asset.\n\n**Final polish checklist:**\n1. **Review each project** → Is the code clean and well-commented?\n2. **Update READMEs** → Clear title, overview, tech stack, results, and links\n3. **Check live demos** → GitHub Pages, dashboards, or hosted notebooks\n4. **Add project write-ups** → LinkedIn articles or blog posts explaining your process\n5. **Consistency** → Same formatting, same quality across all projects\n\n**Pro tip:** Ask someone to review your portfolio and give honest feedback.\n\nYour portfolio is never truly finished → keep updating it as you grow.\n\n:::checkpoint\nWhat's the most important quality check for your portfolio?\nA) All projects use the same dataset\nB) Consistent quality, clear documentation, and live demos work\nC) Every project must use machine learning\nD) Portfolio must have 10+ projects\nCorrect: B",
        quiz: [
          {
            question: "What is the most critical portfolio quality check?",
            options: [
              "Number of projects",
              "Consistent quality and working demos",
              "Using ML in every project",
              "10+ projects minimum",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w25-d3",
        title: "Day 3: Mock Interview Practice",
        description: "Simulate a full technical and behavioral interview",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Mock Interview Practice** → Simulate the real experience to build confidence.\n\n**Full mock interview structure (60 min):**\n\n**Part 1: Behavioral (15 min)**\n- 'Tell me about yourself' (2 min pitch)\n- 2-3 STAR questions (e.g., conflict, data-driven decision, failure)\n\n**Part 2: Technical SQL (15 min)**\n- Write a query with JOIN, GROUP BY, and a window function\n- Explain your approach out loud\n\n**Part 3: Technical Python (15 min)**\n- Solve a Pandas data manipulation problem\n- Discuss your code and alternatives\n\n**Part 4: ML/Statistics (15 min)**\n- Explain overfitting vs underfitting\n- Walk through how you'd evaluate a classification model\n\n**Part 5: Q&A (10 min)**\n- Ask 2-3 thoughtful questions about the role and team\n\n**Final tip:** Record yourself and review → then do it again.\n\n:::checkpoint\nWhat's the best way to improve after a mock interview?\nA) Forget about it and move on\nB) Review the recording, identify weak spots, and practice again\nC) Only focus on technical questions\nD) Memorize all answers\nCorrect: B",
        quiz: [
          {
            question: "Best way to improve after mock interview?",
            options: [
              "Forget it",
              "Review recording and practice weak areas",
              "Only retake technical portion",
              "Memorize answers",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What platforms are best for data analyst job search?",
            options: [
              "LinkedIn, Indeed, and data-specific job boards",
              "Only LinkedIn",
              "Only company websites",
              "General job boards only",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "Why is networking important for job search?",
            options: [
              "70-85% of jobs are filled through referrals",
              "It doesn't matter",
              "Only for senior roles",
              "It replaces applications",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w25-d4",
        title: "Day 4: Job Application Strategy",
        description: "Create a job application plan with targets",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Job Application Strategy** → An organized approach leads to better results.\n\n**Set weekly targets:**\n- Apply to 5-10 jobs per week\n- Customize resume and cover letter for each\n- Network with 3-5 people per week (LinkedIn, events, alumni)\n- Practice 2-3 SQL/Python problems daily\n\n**Application tracker columns:**\n- Company, Role, Date Applied, Status, Follow-up Date, Notes\n\n**Where to find jobs:**\n- LinkedIn, Indeed, Glassdoor, Otta, AngelList\n- Company career pages directly\n- Data-specific job boards (DataJobs, DataList)\n\n**Follow-up strategy:**\n- Wait 1 week after applying, then connect on LinkedIn\n- Send a polite message expressing interest\n\nStay consistent and don't get discouraged by rejections.\n\n:::checkpoint\nHow many applications per week is a reasonable target?\nA) 1-2\nB) 5-10\nC) 50+\nD) Only apply when you see the perfect role\nCorrect: B",
        quiz: [
          {
            question: "What is a reasonable weekly application target?",
            options: ["1-2", "5-10", "50+", "Apply only to perfect roles"],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
        ],
      },
      {
        id: "w25-d5",
        title: "Day 5: Certification & Next Steps",
        description: "Complete course evaluation and plan next learning steps",
        type: "review",
        duration: "45-60 mins",
        content:
          "**Certification & Next Steps** → Celebrate your progress and plan your future.\n\n**Course completion checklist:**\n- [ ] Complete all 35 weeks of curriculum\n- [ ] Published portfolio with 4+ projects\n- [ ] Optimized LinkedIn profile\n- [ ] Tailored resume for target role\n- [ ] STAR stories prepared\n- [ ] Job application tracker set up\n- [ ] SQL/Python skills interview-ready\n- [ ] ML concepts understood (supervised, unsupervised, evaluation)\n- [ ] Product analytics frameworks practiced (funnel, cohort, attribution)\n\n**Where to go from here:**\n- **Advanced topics:** Deep Learning, MLOps, Cloud Certifications (AWS, GCP, Azure)\n- **Certifications:** Google Data Analytics, CompTIA Data+, Tableau, Power BI PL-300, AWS Certified Data Analytics\n- **Community:** Join data meetups, Slack groups, and LinkedIn communities\n- **Keep building:** The best learning happens through real projects\n\n**Final reflection:**\nYou've completed an intensive 9-month journey covering Excel, SQL, Python, statistics, BI, machine learning, big data, and product analytics. The skills you've built are real and valuable. Now it's time to launch your career.\n\nGood luck → go get that job!\n\n:::checkpoint\nWhat's the most important thing after completing this course?\nA) Take a long break\nB) Start applying to jobs and continue learning through projects\nC) Enroll in another course immediately\nD) Wait for the perfect opportunity\nCorrect: B",
        quiz: [
          {
            question: "Most important next step after course completion?",
            options: [
              "Take a break",
              "Start applying and keep learning through projects",
              "Buy a new course",
              "Wait for opportunities",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What should a data analyst resume emphasize?",
            options: [
              "Soft skills only",
              "Quantifiable achievements and technical skills",
              "Education only",
              "Job titles only",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "How should you structure a data portfolio?",
            options: [
              "Just show code",
              "Include projects with problem statement, process, results, and code",
              "Only share dashboards",
              "Include all work ever done",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is an informational interview?",
            options: [
              "A job interview",
              "A conversation to learn about a career or company",
              "A formal interview process",
              "A technical screening",
            ],
            correctAnswerIndex: 1,
          },
          {
            question: "What is the STAR method for behavioral interviews?",
            options: [
              "Situation, Task, Action, Result",
              "Start, Think, Answer, Review",
              "Story, Topic, Answer, Response",
              "Structure, Task, Apply, Rate",
            ],
            correctAnswerIndex: 0,
          },
        ],
      },
    ],
  },
];
