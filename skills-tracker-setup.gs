/**
 * Skills Tracker Setup Script
 * 
 * Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Save and run the 'setupSkillsTracker' function
 * 5. Grant permissions when prompted
 */

function setupSkillsTracker() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Clear any existing sheets except the first one
  const sheets = ss.getSheets();
  if (sheets.length > 0) {
    ss.deleteSheet(sheets[0]);
  }
  
  // Create all sheets
  createPeopleSheet(ss);
  createSkillsSheet(ss);
  createPersonSkillsSheet(ss);
  createSummarySheet(ss);
  
  SpreadsheetApp.getUi().alert('Skills Tracker setup complete!');
}

function createPeopleSheet(ss) {
  const sheet = ss.insertSheet('People', 0);
  
  // Headers
  const headers = [['Person ID', 'Name', 'Email']];
  sheet.getRange(1, 1, 1, 3).setValues(headers)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // Sample data
  const sampleData = [
    [1, 'Alice Johnson', 'alice@example.com'],
    [2, 'Bob Smith', 'bob@example.com'],
    [3, 'Carol Davis', 'carol@example.com']
  ];
  sheet.getRange(2, 1, sampleData.length, 3).setValues(sampleData);
  
  // Format
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 3);
  
  // Protect Person ID column (auto-increment)
  const protection = sheet.getRange('A:A').protect();
  protection.setDescription('Person ID (auto-generated)');
  protection.setWarningOnly(true);
}

function createSkillsSheet(ss) {
  const sheet = ss.insertSheet('Skills', 1);
  
  // Headers
  const headers = [['Skill ID', 'Skill Name', 'Category']];
  sheet.getRange(1, 1, 1, 3).setValues(headers)
    .setFontWeight('bold')
    .setBackground('#34a853')
    .setFontColor('#ffffff');
  
  // Sample data
  const sampleData = [
    [1, 'Python', 'Programming'],
    [2, 'JavaScript', 'Programming'],
    [3, 'SQL', 'Database'],
    [4, 'Docker', 'DevOps'],
    [5, 'Git', 'Version Control'],
    [6, 'AWS', 'Cloud'],
    [7, 'Machine Learning', 'Data Science'],
    [8, 'React', 'Programming'],
    [9, 'Communication', 'Soft Skills'],
    [10, 'Project Management', 'Soft Skills']
  ];
  sheet.getRange(2, 1, sampleData.length, 3).setValues(sampleData);
  
  // Format
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 3);
  
  // Sort by Skill Name
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).sort(2);
}

function createPersonSkillsSheet(ss) {
  const sheet = ss.insertSheet('Person_Skills', 2);
  
  // Headers
  const headers = [['Person Name', 'Skill', 'Level', 'Notes']];
  sheet.getRange(1, 1, 1, 4).setValues(headers)
    .setFontWeight('bold')
    .setBackground('#fbbc04')
    .setFontColor('#000000');
  
  // Sample data
  const sampleData = [
    ['Alice Johnson', 'Python', 5, 'Expert - 10 years experience'],
    ['Alice Johnson', 'Machine Learning', 4, ''],
    ['Bob Smith', 'JavaScript', 3, ''],
    ['Bob Smith', 'React', 4, ''],
    ['Carol Davis', 'SQL', 5, ''],
    ['Carol Davis', 'Python', 3, '']
  ];
  sheet.getRange(2, 1, sampleData.length, 4).setValues(sampleData);
  
  // Data Validation for Person Name (Column A)
  const peopleRange = ss.getSheetByName('People').getRange('B2:B');
  const personRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(peopleRange, true)
    .setAllowInvalid(false)
    .setHelpText('Select a person from the People sheet')
    .build();
  sheet.getRange('A2:A1000').setDataValidation(personRule);
  
  // Data Validation for Skills (Column B)
  const skillsRange = ss.getSheetByName('Skills').getRange('B2:B');
  const skillRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(skillsRange, true)
    .setAllowInvalid(false)
    .setHelpText('Select a skill from the Skills sheet')
    .build();
  sheet.getRange('B2:B1000').setDataValidation(skillRule);
  
  // Data Validation for Level (Column C)
  const levelRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['1', '2', '3', '4', '5'], true)
    .setAllowInvalid(false)
    .setHelpText('1=Beginner, 2=Basic, 3=Intermediate, 4=Advanced, 5=Expert')
    .build();
  sheet.getRange('C2:C1000').setDataValidation(levelRule);
  
  // Conditional formatting for levels
  addLevelFormatting(sheet);
  
  // Format
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 4);
}

function addLevelFormatting(sheet) {
  const range = sheet.getRange('C2:C1000');
  
  // Level 5 - Dark Green
  const rule5 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('5')
    .setBackground('#00ff00')
    .setFontColor('#000000')
    .setRanges([range])
    .build();
  
  // Level 4 - Light Green
  const rule4 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('4')
    .setBackground('#93c47d')
    .setFontColor('#000000')
    .setRanges([range])
    .build();
  
  // Level 3 - Yellow
  const rule3 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('3')
    .setBackground('#ffd966')
    .setFontColor('#000000')
    .setRanges([range])
    .build();
  
  // Level 2 - Orange
  const rule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('2')
    .setBackground('#f6b26b')
    .setFontColor('#000000')
    .setRanges([range])
    .build();
  
  // Level 1 - Red
  const rule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('1')
    .setBackground('#e06666')
    .setFontColor('#ffffff')
    .setRanges([range])
    .build();
  
  sheet.setConditionalFormatRules([rule1, rule2, rule3, rule4, rule5]);
}

function createSummarySheet(ss) {
  const sheet = ss.insertSheet('Summary', 3);
  
  // Title
  sheet.getRange('A1').setValue('Skills Summary')
    .setFontSize(18)
    .setFontWeight('bold');
  
  // Section 1: Skills by Person
  sheet.getRange('A3').setValue('Skills by Person')
    .setFontWeight('bold')
    .setFontSize(14);
  
  sheet.getRange('A4').setFormula(
    '=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE A is not null ORDER BY A, C DESC, B", 1)'
  );
  
  // Section 2: People by Skill
  sheet.getRange('E3').setValue('People by Skill')
    .setFontWeight('bold')
    .setFontSize(14);
  
  sheet.getRange('E4').setFormula(
    '=QUERY(Person_Skills!A:C, "SELECT B, A, C WHERE B is not null ORDER BY B, C DESC, A", 1)'
  );
  
  // Section 3: Skill Coverage (how many people have each skill)
  sheet.getRange('I3').setValue('Skill Coverage')
    .setFontWeight('bold')
    .setFontSize(14);
  
  sheet.getRange('I4').setValue('Skill').setFontWeight('bold');
  sheet.getRange('J4').setValue('Total People').setFontWeight('bold');
  sheet.getRange('K4').setValue('Avg Level').setFontWeight('bold');
  
  sheet.getRange('I5').setFormula(
    '=QUERY(Person_Skills!B:C, "SELECT B, COUNT(B), AVG(C) WHERE B is not null GROUP BY B ORDER BY COUNT(B) DESC", 0)'
  );
  
  // Section 4: Expert Skills (Level 4-5)
  sheet.getRange('M3').setValue('Experts (Level 4-5)')
    .setFontWeight('bold')
    .setFontSize(14);
  
  sheet.getRange('M4').setFormula(
    '=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE C >= 4 ORDER BY C DESC, B, A", 1)'
  );
  
  // Format
  sheet.setFrozenRows(4);
  sheet.autoResizeColumns(1, 14);
}
