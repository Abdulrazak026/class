export interface SpreadsheetPreset {
  data: Record<string, string>;
  cols: number;
  rows: number;
  highlightCells?: string[];
  readOnlyCells?: string[];
}

const presets: Record<string, SpreadsheetPreset> = {};

function d(records: [string, string][]): Record<string, string> {
  const obj: Record<string, string> = {};
  for (const [k, v] of records) obj[k] = v;
  return obj;
}

// Week 1: Spreadsheets 101
presets['w1-d1'] = {
  cols: 5, rows: 10,
  data: d([
    ['A1', 'Item'], ['B1', 'Jan'], ['C1', 'Feb'], ['D1', 'Mar'], ['E1', 'Q1 Total'],
    ['A2', 'Rent'], ['B2', '1500'], ['C2', '1500'], ['D2', '1500'],
    ['A3', 'Utilities'], ['B3', '200'], ['C3', '210'], ['D3', '195'],
    ['A4', 'Internet'], ['B4', '80'], ['C4', '80'], ['D4', '80'],
    ['A5', 'Supplies'], ['B5', '120'], ['C5', '95'], ['D5', '140'],
    ['E2', '=SUM(B2:D2)'], ['E3', '=SUM(B3:D3)'], ['E4', '=SUM(B4:D4)'], ['E5', '=SUM(B5:D5)'],
  ]),
  readOnlyCells: ['E2', 'E3', 'E4', 'E5'],
};

presets['w1-d2'] = {
  cols: 4, rows: 12,
  data: d([
    ['A1', 'Employee ID'], ['B1', 'Name'], ['C1', 'Department'], ['D1', 'Salary'],
    ['A2', '101'], ['B2', 'Alice Johnson'], ['C2', 'Sales'], ['D2', '55000'],
    ['A3', '102'], ['B3', 'Bob Smith'], ['C3', 'Marketing'], ['D3', '62000'],
    ['A4', '103'], ['B4', 'Carol Lee'], ['C4', 'Engineering'], ['D4', '78000'],
    ['A5', '104'], ['B5', 'David Brown'], ['C5', 'Sales'], ['D5', '51000'],
    ['A6', '105'], ['B6', 'Eva Martinez'], ['C6', 'HR'], ['D6', '48000'],
    ['A7', '106'], ['B7', 'Frank Wilson'], ['C7', 'Marketing'], ['D7', '59000'],
    ['A8', '107'], ['B8', 'Grace Kim'], ['C8', 'Engineering'], ['D8', '85000'],
    ['A10', 'Total Salary'], ['B10', '=SUM(D2:D8)'],
    ['A11', 'Average Salary'], ['B11', '=AVERAGE(D2:D8)'],
    ['A12', 'Employee Count'], ['B12', '=COUNTA(B2:B8)'],
  ]),
  readOnlyCells: ['B10', 'B11', 'B12'],
};

presets['w1-d3'] = {
  cols: 6, rows: 12,
  data: d([
    ['A1', 'Category'], ['B1', 'Budgeted'], ['C1', 'Actual'], ['D1', 'Difference'], ['E1', 'Status'],
    ['A2', 'Income'], ['B2', '5000'], ['C2', '5200'],
    ['A3', 'Rent'], ['B3', '1500'], ['C3', '1500'],
    ['A4', 'Food'], ['B4', '500'], ['C4', '420'],
    ['A5', 'Transport'], ['B5', '300'], ['C5', '350'],
    ['A6', 'Entertainment'], ['B6', '200'], ['C6', '150'],
    ['A7', 'Savings'], ['B7', '500'], ['C7', '200'],
    ['D2', '=C2-B2'], ['D3', '=C3-B3'], ['D4', '=C4-B4'], ['D5', '=C5-B5'], ['D6', '=C6-B6'], ['D7', '=C7-B7'],
    ['B9', 'Total Budgeted'], ['C9', '=SUM(B2:B7)'],
    ['B10', 'Total Actual'], ['C10', '=SUM(C2:C7)'],
  ]),
  highlightCells: ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'C9', 'C10'],
  readOnlyCells: ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'C9', 'C10'],
};

presets['w1-d4'] = {
  cols: 6, rows: 16,
  data: d([
    ['A1', 'Salesperson'], ['B1', 'Sales'], ['C1', 'Region'],
    ['A2', 'Alice'], ['B2', '12000'], ['C2', 'North'],
    ['A3', 'Bob'], ['B3', '5000'], ['C3', 'South'],
    ['A4', 'Charlie'], ['B4', '18000'], ['C4', 'East'],
    ['A5', 'Diana'], ['B5', '9500'], ['C5', 'West'],
    ['A6', 'Eve'], ['B6', '14000'], ['C6', 'North'],
    ['B8', 'Total'], ['B9', '=SUM(B2:B6)'],
    ['B10', 'Average'], ['B11', '=AVERAGE(B2:B6)'],
    ['B12', 'Best (Max)'], ['B13', '=MAX(B2:B6)'],
    ['B14', 'Worst (Min)'], ['B15', '=MIN(B2:B6)'],
  ]),
  highlightCells: ['B2', 'B3', 'B4', 'B5', 'B6', 'B9', 'B11', 'B13', 'B15'],
  readOnlyCells: ['B9', 'B11', 'B13', 'B15'],
};

presets['w1-d5'] = {
  cols: 5, rows: 12,
  data: d([
    ['A1', 'Category'], ['B1', 'Budgeted'], ['C1', 'Actual'], ['D1', 'Difference'], ['E1', 'Status'],
    ['A2', ''], ['B2', ''], ['C2', ''], ['D2', ''], ['E2', ''],
    ['A3', ''], ['B3', ''], ['C3', ''], ['D3', ''], ['E3', ''],
    ['A4', ''], ['B4', ''], ['C4', ''], ['D4', ''], ['E4', ''],
    ['A5', ''], ['B5', ''], ['C5', ''], ['D5', ''], ['E5', ''],
    ['A6', ''], ['B6', ''], ['C6', ''], ['D6', ''], ['E6', ''],
    ['A7', ''], ['B7', ''], ['C7', ''], ['D7', ''], ['E7', ''],
  ]),
};

// Week 2: Data Manipulation
presets['w2-d1'] = {
  cols: 6, rows: 12,
  data: d([
    ['A1', 'Original Name'], ['B1', 'First Name'], ['C1', 'Last Name'], ['D1', 'Clean Name'], ['E1', 'Product Code'], ['F1', 'Phone'],
    ['A2', 'SMITH, JOHN'], ['E2', 'PRD-001-XL'], ['F2', '(555) 123-4567'],
    ['A3', 'JONES, MARY'], ['E3', 'PRD-002-M'], ['F3', '555.987.6543'],
    ['A4', 'LEE, DAVID'], ['E4', 'PRD-003-LG'], ['F4', '5552223333'],
    ['A5', 'GARCIA, ANNA'], ['E5', 'PRD-004-SM'], ['F5', '555-111-2222'],
    ['A6', 'BROWN, CHRIS'], ['E6', 'PRD-005-XL'], ['F6', '555.444.5555'],
    ['B2', '=PROPER(MID(A2,FIND(",",A2)+2,99))'],
    ['C2', '=PROPER(LEFT(A2,FIND(",",A2)-1))'],
    ['D2', '=CONCATENATE(B2," ",C2)'],
  ]),
  highlightCells: ['A2', 'A3', 'A4', 'A5', 'A6'],
};

presets['w2-d2'] = {
  cols: 6, rows: 14,
  data: d([
    ['A1', 'Customer'], ['B1', 'Order Total'], ['C1', 'Quantity'], ['D1', 'Customer Type'], ['E1', 'Order Flag'], ['F1', 'Priority'],
    ['A2', 'Alice'], ['B2', '1200'], ['C2', '5'], ['D2', 'New'],
    ['A3', 'Bob'], ['B3', '400'], ['C3', '12'], ['D3', 'Returning'],
    ['A4', 'Charlie'], ['B4', '2500'], ['C4', '3'], ['D4', 'New'],
    ['A5', 'Diana'], ['B5', '150'], ['C5', '1'], ['D5', 'Returning'],
    ['A6', 'Eve'], ['B6', '800'], ['C6', '15'], ['D6', 'New'],
    ['E2', '=IF(AND(B2>500,D2="New"),"VIP",IF(B2>1000,"High","Standard"))'],
    ['F2', '=IF(OR(C2>10,B2>1000),"Bulk Review","Normal")'],
  ]),
  highlightCells: ['A2', 'B2', 'C2', 'D2'],
};

presets['w2-d3'] = {
  cols: 8, rows: 14,
  data: d([
    ['A1', 'Product ID'], ['B1', 'Product Name'], ['C1', 'Price'],
    ['A2', 'P001'], ['B2', 'Widget A'], ['C2', '25'],
    ['A3', 'P002'], ['B3', 'Widget B'], ['C3', '35'],
    ['A4', 'P003'], ['B4', 'Widget C'], ['C4', '50'],
    ['A5', 'P004'], ['B5', 'Widget D'], ['C5', '15'],
    ['A6', 'P005'], ['B6', 'Widget E'], ['C6', '60'],
    ['E1', 'Sale ID'], ['F1', 'Product ID'], ['G1', 'Qty'], ['H1', 'Price'],
    ['E2', 'S001'], ['F2', 'P003'], ['G2', '10'],
    ['E3', 'S002'], ['F3', 'P001'], ['G3', '5'],
    ['E4', 'S003'], ['F4', 'P005'], ['G4', '3'],
    ['E5', 'S004'], ['F5', 'P002'], ['G5', '8'],
    ['H2', '=VLOOKUP(F2,$A$2:$C$6,3,FALSE)*G2'],
    ['H3', '=VLOOKUP(F3,$A$2:$C$6,3,FALSE)*G3'],
    ['H4', '=VLOOKUP(F4,$A$2:$C$6,3,FALSE)*G4'],
    ['H5', '=VLOOKUP(F5,$A$2:$C$6,3,FALSE)*G5'],
  ]),
  highlightCells: ['F2', 'F3', 'F4', 'F5', 'H2', 'H3', 'H4', 'H5'],
  readOnlyCells: ['H2', 'H3', 'H4', 'H5'],
};

presets['w2-d4'] = {
  cols: 4, rows: 14,
  data: d([
    ['A1', 'Salesperson'], ['B1', 'Monthly Sales'], ['C1', 'Target'], ['D1', 'Achievement %'],
    ['A2', 'Alice'], ['B2', '12000'], ['C2', '10000'],
    ['A3', 'Bob'], ['B3', '4500'], ['C3', '10000'],
    ['A4', 'Charlie'], ['B4', '18500'], ['C4', '10000'],
    ['A5', 'Diana'], ['B5', '7200'], ['C5', '10000'],
    ['A6', 'Eve'], ['B6', '15000'], ['C6', '10000'],
    ['A7', 'Frank'], ['B7', '3200'], ['C7', '10000'],
    ['A8', 'Grace'], ['B8', '11000'], ['C8', '10000'],
    ['D2', '=B2/C2*100'], ['D3', '=B3/C3*100'], ['D4', '=B4/C4*100'],
    ['D5', '=B5/C5*100'], ['D6', '=B6/C6*100'], ['D7', '=B7/C7*100'], ['D8', '=B8/C8*100'],
  ]),
  highlightCells: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
};

presets['w2-d5'] = {
  cols: 6, rows: 14,
  data: d([
    ['A1', 'Name'], ['B1', 'Email'], ['C1', 'Phone'], ['D1', 'City'], ['E1', 'Status'],
    ['A2', 'JOHN SMITH'], ['B2', 'john@email.com'], ['C2', '555-123-4567'], ['D2', '  New York  '], ['E2', 'Active'],
    ['A3', 'MARY JONES'], ['B3', ''], ['C3', '555.987.6543'], ['D3', 'Los Angeles'], ['E3', 'Active'],
    ['A4', 'david lee'], ['B4', 'david@email.com'], ['C4', '(555)222-3333'], ['D4', '  Chicago  '], ['E4', 'Inactive'],
    ['A5', 'ANNA GARCIA'], ['B5', 'anna@email.com'], ['C5', '5551112222'], ['D5', 'Houston'], ['E5', 'Active'],
    ['A6', 'chris brown'], ['B6', ''], ['C6', '555-444-5555'], ['D6', '  Phoenix  '], ['E6', 'Active'],
    ['A7', 'JESSICA WONG'], ['B7', 'jessica@email.com'], ['C7', '555.777.8888'], ['D7', 'Philadelphia'], ['E7', 'Inactive'],
    ['A8', 'JOHN SMITH'], ['B8', 'john@email.com'], ['C8', '555-123-4567'], ['D8', '  New York  '], ['E8', 'Active'],
  ]),
  highlightCells: ['A2', 'A3', 'B3', 'B6', 'A8'],
};

// Week 3: Data Analysis
presets['w3-d1'] = {
  cols: 6, rows: 25,
  data: d([
    ['A1', 'Region'], ['B1', 'Product'], ['C1', 'Month'], ['D1', 'Sales'], ['E1', 'Quantity'], ['F1', 'Salesperson'],
    ['A2', 'North'], ['B2', 'Widget A'], ['C2', 'Jan'], ['D2', '12000'], ['E2', '100'], ['F2', 'Alice'],
    ['A3', 'North'], ['B3', 'Widget B'], ['C3', 'Jan'], ['D3', '8000'], ['E3', '60'], ['F3', 'Alice'],
    ['A4', 'South'], ['B4', 'Widget A'], ['C4', 'Jan'], ['D4', '5000'], ['E4', '40'], ['F4', 'Bob'],
    ['A5', 'East'], ['B5', 'Widget C'], ['C5', 'Jan'], ['D5', '15000'], ['E5', '120'], ['F5', 'Charlie'],
    ['A6', 'West'], ['B6', 'Widget B'], ['C6', 'Jan'], ['D6', '7000'], ['E6', '55'], ['F6', 'Diana'],
    ['A7', 'North'], ['B7', 'Widget C'], ['C7', 'Feb'], ['D7', '14000'], ['E7', '110'], ['F7', 'Alice'],
    ['A8', 'South'], ['B8', 'Widget B'], ['C8', 'Feb'], ['D8', '6000'], ['E8', '45'], ['F8', 'Bob'],
    ['A9', 'East'], ['B9', 'Widget A'], ['C9', 'Feb'], ['D9', '11000'], ['E9', '90'], ['F9', 'Charlie'],
    ['A10', 'West'], ['B10', 'Widget C'], ['C10', 'Feb'], ['D10', '9000'], ['E10', '70'], ['F10', 'Diana'],
    ['A11', 'North'], ['B11', 'Widget A'], ['C11', 'Mar'], ['D11', '16000'], ['E11', '130'], ['F11', 'Eve'],
    ['A12', 'South'], ['B12', 'Widget C'], ['C12', 'Mar'], ['D12', '4500'], ['E12', '35'], ['F12', 'Bob'],
    ['A13', 'East'], ['B13', 'Widget B'], ['C13', 'Mar'], ['D13', '13000'], ['E13', '100'], ['F13', 'Charlie'],
    ['A14', 'West'], ['B14', 'Widget A'], ['C14', 'Mar'], ['D14', '10000'], ['E14', '80'], ['F14', 'Diana'],
    ['A15', 'North'], ['B15', 'Widget B'], ['C15', 'Apr'], ['D15', '10000'], ['E15', '78'], ['F15', 'Eve'],
    ['A16', 'South'], ['B16', 'Widget A'], ['C16', 'Apr'], ['D16', '5500'], ['E16', '42'], ['F16', 'Bob'],
    ['A17', 'East'], ['B17', 'Widget C'], ['C17', 'Apr'], ['D17', '18000'], ['E17', '140'], ['F17', 'Charlie'],
    ['A18', 'West'], ['B18', 'Widget B'], ['C18', 'Apr'], ['D18', '8000'], ['E18', '62'], ['F18', 'Frank'],
    ['A19', 'North'], ['B19', 'Widget C'], ['C19', 'May'], ['D19', '11000'], ['E19', '88'], ['F19', 'Eve'],
    ['A20', 'South'], ['B20', 'Widget B'], ['C20', 'May'], ['D20', '7000'], ['E20', '50'], ['F20', 'Grace'],
  ]),
  highlightCells: ['A2', 'D2'],
};

presets['w3-d2'] = presets['w3-d1'];

presets['w3-d3'] = {
  cols: 5, rows: 14,
  data: d([
    ['A1', 'Respondent'], ['B1', 'Age'], ['C1', 'Rating (1-5)'], ['D1', 'Department'], ['E1', 'Feedback Date'],
    ['A2', ''], ['B2', ''], ['C2', ''], ['D2', ''], ['E2', ''],
    ['A3', ''], ['B3', ''], ['C3', ''], ['D3', ''], ['E3', ''],
    ['A4', ''], ['B4', ''], ['C4', ''], ['D4', ''], ['E4', ''],
    ['A5', ''], ['B5', ''], ['C5', ''], ['D5', ''], ['E5', ''],
    ['A6', ''], ['B6', ''], ['C6', ''], ['D6', ''], ['E6', ''],
  ]),
  highlightCells: [],
};

presets['w3-d4'] = {
  cols: 3, rows: 14,
  data: d([
    ['A1', 'Month'], ['B1', 'Revenue'], ['C1', 'Profit'],
    ['A2', 'Jan'], ['B2', '42000'], ['C2', '11000'],
    ['A3', 'Feb'], ['B3', '38000'], ['C3', '9800'],
    ['A4', 'Mar'], ['B4', '51000'], ['C4', '14000'],
    ['A5', 'Apr'], ['B5', '47000'], ['C5', '12500'],
    ['A6', 'May'], ['B6', '55000'], ['C6', '16000'],
    ['A7', 'Jun'], ['B7', '49000'], ['C7', '13200'],
    ['A8', 'Jul'], ['B8', '58000'], ['C8', '17000'],
    ['A9', 'Aug'], ['B9', '53000'], ['C9', '14500'],
    ['A10', 'Sep'], ['B10', '61000'], ['C10', '18000'],
    ['A11', 'Oct'], ['B11', '48000'], ['C11', '12800'],
    ['A12', 'Nov'], ['B12', '64000'], ['C12', '19000'],
    ['A13', 'Dec'], ['B13', '72000'], ['C13', '21000'],
  ]),
  highlightCells: ['B2', 'B13'],
};

presets['w3-d5'] = presets['w3-d1'];

// Week 4: Advanced Formulas (new)
presets['w_adv1-d1'] = {
  cols: 5, rows: 16,
  data: d([
    ['A1', 'Product'], ['B1', 'Category'], ['C1', 'Sales'], ['D1', 'Quantity'], ['E1', 'Region'],
    ['A2', 'Widget A'], ['B2', 'Electronics'], ['C2', '1200'], ['D2', '10'], ['E2', 'North'],
    ['A3', 'Widget B'], ['B3', 'Electronics'], ['C3', '800'], ['D3', '5'], ['E3', 'South'],
    ['A4', 'Widget C'], ['B4', 'Clothing'], ['C4', '1500'], ['D4', '20'], ['E4', 'East'],
    ['A5', 'Widget D'], ['B5', 'Clothing'], ['C5', '600'], ['D5', '8'], ['E5', 'North'],
    ['A6', 'Widget E'], ['B6', 'Food'], ['C6', '2000'], ['D6', '50'], ['E6', 'South'],
    ['A7', 'Widget F'], ['B7', 'Food'], ['C7', '900'], ['D7', '15'], ['E7', 'East'],
    ['A8', 'Widget G'], ['B8', 'Electronics'], ['C8', '300'], ['D8', '2'], ['E8', 'West'],
    ['A9', 'Widget H'], ['B9', 'Clothing'], ['C9', '1100'], ['D9', '12'], ['E9', 'West'],
    ['A10', 'Widget I'], ['B10', 'Food'], ['C10', '400'], ['D10', '6'], ['E10', 'North'],
    ['C12', '=SUMIF(B2:B10,"Electronics",C2:C10)'],
    ['C13', '=COUNTIF(B2:B10,"Food")'],
    ['C14', '=SUMIFS(C2:C10,B2:B10,"Clothing",E2:E10,"East")'],
    ['C15', '=AVERAGEIFS(C2:C10,B2:B10,"Electronics",E2:E10,"North")'],
  ]),
  highlightCells: ['C12', 'C13', 'C14', 'C15'],
  readOnlyCells: ['C12', 'C13', 'C14', 'C15'],
};

presets['w_adv1-d2'] = {
  cols: 4, rows: 14,
  data: d([
    ['A1', 'Product'], ['B1', 'Price'], ['C1', 'Category'], ['D1', 'Region'],
    ['A2', 'Widget A'], ['B2', '25'], ['C2', 'Electronics'], ['D2', 'North'],
    ['A3', 'Widget B'], ['B3', '35'], ['C3', 'Electronics'], ['D3', 'South'],
    ['A4', 'Widget C'], ['B4', '50'], ['C4', 'Clothing'], ['D4', 'East'],
    ['A5', 'Widget D'], ['B5', '15'], ['C5', 'Clothing'], ['D5', 'North'],
    ['A6', 'Widget E'], ['B6', '60'], ['C6', 'Food'], ['D6', 'South'],
    ['A7', 'Widget F'], ['B7', '45'], ['C7', 'Food'], ['D7', 'East'],
    ['E1', 'Product ID'], ['F1', 'Category ID'],
    ['E2', 'P001'], ['F2', 'CAT-ELEC'],
    ['E3', 'P002'], ['F3', 'CAT-ELEC'],
    ['E4', 'P003'], ['F4', 'CAT-CLTH'],
    ['E5', 'P004'], ['F5', 'CAT-CLTH'],
    ['G1', 'Lookup Product'], ['H1', 'Price'],
    ['G2', 'Widget C'],
    ['H2', '=INDEX(B2:B6,MATCH(G2,A2:A6,0))'],
  ]),
  highlightCells: ['H2'],
  readOnlyCells: ['H2'],
};

presets['w_adv1-d3'] = {
  cols: 4, rows: 12,
  data: d([
    ['A1', 'Month'], ['B1', 'Revenue'], ['C1', 'Growth %'], ['D1', 'Running Total'],
    ['A2', 'Jan'], ['B2', '42000'],
    ['A3', 'Feb'], ['B3', '38000'],
    ['A4', 'Mar'], ['B4', '51000'],
    ['A5', 'Apr'], ['B5', '47000'],
    ['A6', 'May'], ['B6', '55000'],
    ['A7', 'Jun'], ['B7', '49000'],
    ['A8', 'Jul'], ['B8', '58000'],
    ['A9', 'Aug'], ['B9', '53000'],
    ['C3', '=(B3-B2)/B2*100'], ['C4', '=(B4-B3)/B3*100'],
    ['C5', '=(B5-B4)/B4*100'], ['C6', '=(B6-B5)/B5*100'],
    ['C7', '=(B7-B6)/B6*100'], ['C8', '=(B8-B7)/B7*100'],
    ['D2', '=B2'], ['D3', '=D2+B3'], ['D4', '=D3+B4'], ['D5', '=D4+B5'],
    ['D6', '=D5+B6'], ['D7', '=D6+B7'], ['D8', '=D7+B8'], ['D9', '=D8+B9'],
  ]),
  highlightCells: ['C3', 'D2', 'D3'],
  readOnlyCells: ['C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
};

presets['w_adv1-d4'] = {
  cols: 5, rows: 14,
  data: d([
    ['A1', 'Scenario'], ['B1', 'Price'], ['C1', 'Quantity'], ['D1', 'Revenue'], ['E1', 'Profit'],
    ['A2', 'Current'], ['B2', '50'], ['C2', '1000'],
    ['A3', 'Optimistic'], ['B3', '60'], ['C3', '1500'],
    ['A4', 'Pessimistic'], ['B4', '40'], ['C4', '700'],
    ['A5', 'Break Even'], ['B5', '45'], ['C5', '900'],
    ['D2', '=B2*C2'], ['D3', '=B3*C3'], ['D4', '=B4*C4'], ['D5', '=B5*C5'],
    ['E2', '=D2*0.25'], ['E3', '=D3*0.3'], ['E4', '=D4*0.2'], ['E5', '=D5*0.22'],
  ]),
  highlightCells: ['D2', 'E2'],
  readOnlyCells: ['D2', 'D3', 'D4', 'D5', 'E2', 'E3', 'E4', 'E5'],
};

presets['w_adv1-d5'] = {
  cols: 6, rows: 16,
  data: d([
    ['A1', 'Year'], ['B1', 'Revenue'], ['C1', 'COGS'], ['D1', 'Gross Profit'], ['E1', 'Margin %'], ['F1', 'YoY Growth'],
    ['A2', '2020'], ['B2', '500000'], ['C2', '300000'],
    ['A3', '2021'], ['B3', '550000'], ['C3', '320000'],
    ['A4', '2022'], ['B4', '620000'], ['C4', '360000'],
    ['A5', '2023'], ['B5', '700000'], ['C5', '400000'],
    ['A6', '2024'], ['B6', '780000'], ['C6', '430000'],
    ['D2', '=B2-C2'], ['D3', '=B3-C3'], ['D4', '=B4-C4'], ['D5', '=B5-C5'], ['D6', '=B6-C6'],
    ['E2', '=D2/B2*100'], ['E3', '=D3/B3*100'], ['E4', '=D4/B4*100'], ['E5', '=D5/B5*100'], ['E6', '=D6/B6*100'],
    ['F3', '=(B3-B2)/B2*100'], ['F4', '=(B4-B3)/B3*100'], ['F5', '=(B5-B4)/B4*100'], ['F6', '=(B6-B5)/B5*100'],
    ['B8', 'Total Revenue'], ['C8', '=SUM(B2:B6)'],
    ['B9', 'Total COGS'], ['C9', '=SUM(C2:C6)'],
    ['B10', 'Gross Profit'], ['C10', '=SUM(D2:D6)'],
    ['B11', 'Avg Margin'], ['C11', '=AVERAGE(E2:E6)'],
  ]),
  readOnlyCells: ['D2', 'D3', 'D4', 'D5', 'D6', 'E2', 'E3', 'E4', 'E5', 'E6', 'F3', 'F4', 'F5', 'F6', 'C8', 'C9', 'C10', 'C11'],
};

// Week 5: Power Tools & Productivity (new)
presets['w_pwr1-d1'] = {
  cols: 5, rows: 14,
  data: d([
    ['A1', 'Full Name'], ['B1', 'Department'], ['C1', 'Salary'], ['D1', 'Start Date'], ['E1', 'Email'],
    ['A2', 'John A. Smith Jr.'], ['B2', 'Sales'], ['C2', '55000'], ['D2', '01/15/2020'], ['E2', 'john.smith@company.com'],
    ['A3', 'Mary-Ann Jones'], ['B3', 'Marketing'], ['C3', '62000'], ['D3', '03/22/2021'], ['E3', 'mjones@company.com'],
    ['A4', 'Dr. David Lee, PhD'], ['B4', 'Engineering'], ['C4', '85000'], ['D4', '11/02/2019'], ['E4', 'dlee@company.com'],
    ['A5', 'Anna Marie Garcia'], ['B5', 'HR'], ['C5', '48000'], ['D5', '06/10/2022'], ['E5', 'agarcia@company.com'],
    ['A6', 'Chris O\'Brien'], ['B6', 'IT'], ['C6', '72000'], ['D6', '09/05/2021'], ['E6', 'cobrien@company.com'],
    ['A7', 'Jessica Wong'], ['B7', 'Engineering'], ['C7', '78000'], ['D7', '02/28/2020'], ['E7', 'jwong@company.com'],
    ['A8', 'Robert Johnson III'], ['B8', 'Sales'], ['C8', '59000'], ['D8', '07/14/2023'], ['E8', 'rjohnson@company.com'],
  ]),
  highlightCells: ['A2', 'A3', 'A4', 'D2'],
};

presets['w_pwr1-d2'] = {
  cols: 4, rows: 20,
  data: d([
    ['A1', 'Product ID'], ['B1', 'Product Name'], ['C1', 'Price'], ['D1', 'Category'],
    ['A2', 'PRD001'], ['B2', 'Widget A (Basic)'], ['C2', '25.99'], ['D2', 'Electronics'],
    ['A3', 'PRD002'], ['B3', 'Widget B - Premium'], ['C3', '49.99'], ['D3', 'Electronics'],
    ['A4', 'PRD003'], ['B4', 'Widget_C_Deluxe'], ['C4', '79.99'], ['D4', 'Clothing'],
    ['A5', 'PRD004'], ['B5', 'Widget D (Pro) v2'], ['C5', '129.99'], ['D5', 'Clothing'],
    ['A6', 'PRD005'], ['B6', 'Widget E - Lite'], ['C6', '15.99'], ['D6', 'Food'],
    ['A7', 'PRD006'], ['B7', 'Widget F (Eco)'], ['C7', '34.99'], ['D7', 'Food'],
    ['A8', 'PRD007'], ['B8', 'Widget G - Ultra Max+'], ['C8', '199.99'], ['D8', 'Electronics'],
    ['A9', 'PRD008'], ['B9', 'Widget_H_Standard'], ['C9', '12.99'], ['D9', 'Office Supplies'],
    ['A10', 'PRD009'], ['B10', 'Widget I - Mini'], ['C10', '9.99'], ['D10', 'Office Supplies'],
    ['A11', 'PRD010'], ['B11', 'Widget J Deluxe Kit'], ['C11', '89.99'], ['D11', 'Clothing'],
  ]),
  highlightCells: ['B2', 'B3', 'B4', 'B5'],
};

presets['w_pwr1-d4'] = {
  cols: 6, rows: 16,
  data: d([
    ['A1', 'Order ID'], ['B1', 'Customer'], ['C1', 'Product'], ['D1', 'Qty'], ['E1', 'Price'], ['F1', 'Total'],
    ['A2', 'ORD001'], ['B2', 'Acme Corp'], ['C2', 'Widget A'], ['D2', '100'], ['E2', '25'],
    ['A3', 'ORD002'], ['B3', 'Beta Inc'], ['C3', 'Widget B'], ['D3', '50'], ['E3', '35'],
    ['A4', 'ORD003'], ['B4', 'Gamma LLC'], ['C4', 'Widget C'], ['D4', '200'], ['E4', '50'],
    ['A5', 'ORD004'], ['B5', 'Acme Corp'], ['C5', 'Widget A'], ['D5', '150'], ['E5', '25'],
    ['A6', 'ORD005'], ['B6', 'Delta Co'], ['C6', 'Widget D'], ['D6', '75'], ['E6', '15'],
    ['A7', 'ORD006'], ['B7', 'Echo Ltd'], ['C7', 'Widget B'], ['D7', '120'], ['E7', '35'],
    ['A8', 'ORD007'], ['B8', 'Beta Inc'], ['C8', 'Widget C'], ['D8', '80'], ['E8', '50'],
    ['A9', 'ORD008'], ['B9', 'Gamma LLC'], ['C9', 'Widget D'], ['D9', '60'], ['E9', '15'],
    ['A10', 'ORD009'], ['B10', 'Acme Corp'], ['C10', 'Widget E'], ['D10', '90'], ['E10', '60'],
    ['A11', 'ORD010'], ['B11', 'Delta Co'], ['C11', 'Widget A'], ['D11', '110'], ['E11', '25'],
    ['F2', '=D2*E2'], ['F3', '=D3*E3'], ['F4', '=D4*E4'], ['F5', '=D5*E5'],
    ['F6', '=D6*E6'], ['F7', '=D7*E7'], ['F8', '=D8*E8'], ['F9', '=D9*E9'], ['F10', '=D10*E10'], ['F11', '=D11*E11'],
    ['A13', 'Total Orders'], ['B13', '=COUNTA(A2:A11)'],
    ['A14', 'Grand Total'], ['B14', '=SUM(F2:F11)'],
    ['A15', 'Avg Order Value'], ['B15', '=AVERAGE(F2:F11)'],
  ]),
  readOnlyCells: ['F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'B13', 'B14', 'B15'],
};

presets['w_pwr1-d5'] = {
  cols: 5, rows: 18,
  data: d([
    ['A1', 'Transaction ID'], ['B1', 'Date'], ['C1', 'Product'], ['D1', 'Amount'], ['E1', 'Category'],
    ['A2', 'T001'], ['B2', '2024-01-15'], ['C2', 'Widget A'], ['D2', '2500'], ['E2', 'Electronics'],
    ['A3', 'T002'], ['B3', '2024-01-15'], ['C3', 'Widget B'], ['D3', '1750'], ['E3', 'Electronics'],
    ['A4', 'T003'], ['B4', '2024-02-01'], ['C4', 'Widget C'], ['D4', '3000'], ['E4', 'Clothing'],
    ['A5', 'T005'], ['B5', '2024-02-15'], ['C5', 'Widget A'], ['D5', '2200'], ['E5', 'Electronics'],
    ['A6', 'T006'], ['B6', '2024-03-01'], ['C6', 'Widget D'], ['D6', '900'], ['E6', 'Food'],
    ['A7', 'T007'], ['B7', '2024-03-15'], ['C7', 'Widget B'], ['D7', '2100'], ['E7', 'Electronics'],
    ['A8', 'T008'], ['B8', '2024-04-01'], ['C8', 'Widget C'], ['D8', '1500'], ['E8', 'Clothing'],
    ['A9', 'T009'], ['B9', '2024-04-15'], ['C9', 'Widget A'], ['D9', '1800'], ['E9', 'Electronics'],
    ['A10', 'T010'], ['B10', '2024-05-01'], ['C10', 'Widget E'], ['D10', '4500'], ['E10', 'Electronics'],
    ['A11', 'T011'], ['B11', '2024-05-15'], ['C11', 'Widget D'], ['D11', '1200'], ['E11', 'Food'],
    ['A12', 'T012'], ['B12', '2024-06-01'], ['C12', 'Widget B'], ['D12', '1900'], ['E12', 'Electronics'],
    ['A13', 'T013'], ['B13', '2024-06-15'], ['C13', 'Widget C'], ['D13', '2800'], ['E13', 'Clothing'],
    ['A14', 'T014'], ['B14', '2024-07-01'], ['C14', 'Widget A'], ['D14', '1600'], ['E14', 'Electronics'],
  ]),
  highlightCells: ['A2', 'B2', 'D2'],
};

// Week 6: Excel Capstone (formerly w4-d5)
presets['w6-d5'] = {
  cols: 6, rows: 25,
  data: d([
    ['A1', 'Sheet 1: Raw Data - Start here'],
    ['A2', 'Order ID'], ['B2', 'Date'], ['C2', 'Customer'], ['D2', 'Product'], ['E2', 'Qty'], ['F2', 'Amount'],
    ['A3', ''], ['B3', ''], ['C3', ''], ['D3', ''], ['E3', ''], ['F3', ''],
  ]),
  highlightCells: [],
};

presets['w4-d5'] = {
  cols: 7, rows: 20,
  data: d([
    ['A1', 'Order ID'], ['B1', 'Date'], ['C1', 'Customer'], ['D1', 'Product'], ['E1', 'Category'], ['F1', 'Qty'], ['G1', 'Amount'],
    ['A2', 'ORD001'], ['B2', '2024-01-05'], ['C2', 'Acme Corp'], ['D2', 'Widget A'], ['E2', 'Electronics'], ['F2', '10'], ['G2', '250'],
    ['A3', 'ORD002'], ['B3', '2024-01-12'], ['C3', 'Beta Inc'], ['D3', 'Widget B'], ['E3', 'Electronics'], ['F3', '5'], ['G3', '175'],
    ['A4', 'ORD003'], ['B4', '2024-01-20'], ['C4', 'Gamma LLC'], ['D4', 'Widget C'], ['E4', 'Clothing'], ['F4', '20'], ['G4', '300'],
    ['A5', 'ORD004'], ['B5', '2024-02-02'], ['C5', 'Delta Co'], ['D5', 'Widget D'], ['E5', 'Food'], ['F5', '15'], ['G5', '90'],
    ['A6', 'ORD005'], ['B6', '2024-02-10'], ['C6', 'Acme Corp'], ['D6', 'Widget A'], ['E6', 'Electronics'], ['F6', '8'], ['G6', '200'],
    ['A7', 'ORD007'], ['B7', '2024-02-18'], ['C7', 'Beta Inc'], ['D7', 'Widget C'], ['E7', 'Clothing'], ['F7', '12'], ['G7', '180'],
    ['A8', 'ORD008'], ['B8', '2024-03-01'], ['C8', 'Gamma LLC'], ['D8', 'Widget B'], ['E8', 'Electronics'], ['F8', '6'], ['G8', '210'],
    ['A9', 'ORD009'], ['B9', '2024-03-10'], ['C9', 'Echo Ltd'], ['D9', 'Widget E'], ['E9', 'Food'], ['F9', '25'], ['G9', '125'],
    ['A10', 'ORD010'], ['B10', '2024-03-15'], ['C10', 'Acme Corp'], ['D10', 'Widget B'], ['E10', 'Electronics'], ['F10', '14'], ['G10', '490'],
    ['A11', ''], ['B11', ''], ['C11', ''], ['D11', ''], ['E11', ''], ['F11', ''], ['G11', ''],
    ['A13', 'Total Sales'], ['G13', '=SUM(G2:G10)'],
    ['A14', 'Electronics Total'], ['G14', '=SUMIF(E2:E10,"Electronics",G2:G10)'],
    ['A15', 'Clothing Total'], ['G15', '=SUMIF(E2:E10,"Clothing",G2:G10)'],
    ['A16', 'Food Total'], ['G16', '=SUMIF(E2:E10,"Food",G2:G10)'],
    ['A17', 'Category Breakdown'],
    ['A18', '=VLOOKUP(E2,$A$2:$G$10,7,FALSE)'],
  ]),
  highlightCells: ['A2', 'G2', 'G13', 'G18'],
  readOnlyCells: ['G13', 'G14', 'G15', 'G16', 'G18'],
};

presets['w19-d1'] = {
  cols: 5, rows: 12,
  data: d([
    ['A1', 'Product'], ['B1', 'Category'], ['C1', 'Sales'], ['D1', 'Month'], ['E1', 'Region'],
    ['A2', 'Widget A'], ['B2', 'Electronics'], ['C2', '1200'], ['D2', 'Jan'], ['E2', 'North'],
    ['A3', 'Widget B'], ['B3', 'Electronics'], ['C3', '800'], ['D3', 'Jan'], ['E3', 'South'],
    ['A4', 'Widget C'], ['B4', 'Clothing'], ['C4', '1500'], ['D4', 'Jan'], ['E4', 'East'],
    ['A5', 'Widget D'], ['B5', 'Food'], ['C5', '600'], ['D5', 'Feb'], ['E5', 'North'],
    ['A6', 'Widget E'], ['B6', 'Clothing'], ['C6', '2000'], ['D6', 'Feb'], ['E6', 'South'],
    ['A7', 'Widget A'], ['B7', 'Electronics'], ['C7', '900'], ['D7', 'Mar'], ['E7', 'West'],
    ['A8', 'Widget C'], ['B8', 'Clothing'], ['C8', '1100'], ['D8', 'Mar'], ['E8', 'North'],
    ['A10', 'Sum of Sales'], ['C10', '=SUM(C2:C8)'],
    ['A11', 'Avg Sales'], ['C11', '=AVERAGE(C2:C8)'],
  ]),
  highlightCells: ['C2', 'C10', 'C11'],
  readOnlyCells: ['C10', 'C11'],
};

export function getPreset(topicId: string): SpreadsheetPreset | null {
  return presets[topicId] || null;
}

export function getAllPresetKeys(): string[] {
  return Object.keys(presets);
}
