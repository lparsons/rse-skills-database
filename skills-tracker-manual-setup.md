# Skills Tracker - Manual Setup Guide

If you prefer to set up manually instead of using the Apps Script, follow these instructions.

## Sheet 1: People

**Columns:**
- A: Person ID (1, 2, 3...)
- B: Name
- C: Email

**Sample Data:**
```
1 | Alice Johnson | alice@example.com
2 | Bob Smith     | bob@example.com
3 | Carol Davis   | carol@example.com
```

## Sheet 2: Skills

**Columns:**
- A: Skill ID (1, 2, 3...)
- B: Skill Name
- C: Category (optional)

**Sample Data:**
```
1  | Python              | Programming
2  | JavaScript          | Programming
3  | SQL                 | Database
4  | Docker              | DevOps
5  | Git                 | Version Control
6  | AWS                 | Cloud
7  | Machine Learning    | Data Science
8  | React               | Programming
9  | Communication       | Soft Skills
10 | Project Management  | Soft Skills
```

## Sheet 3: Person_Skills

**Columns:**
- A: Person Name
- B: Skill
- C: Level (1-5)
- D: Notes (optional)

**Data Validation Setup:**

### Column A - Person Name Dropdown:
1. Select cells A2:A1000
2. Data → Data validation
3. Criteria: "List from a range"
4. Range: `People!B:B`
5. Check "Show dropdown list in cell"
6. Check "Reject input"

### Column B - Skill Dropdown:
1. Select cells B2:B1000
2. Data → Data validation
3. Criteria: "List from a range"
4. Range: `Skills!B:B`
5. Check "Show dropdown list in cell"
6. Check "Reject input"

### Column C - Level Dropdown:
1. Select cells C2:C1000
2. Data → Data validation
3. Criteria: "List of items"
4. Items: `1,2,3,4,5`
5. Check "Show dropdown list in cell"
6. Check "Reject input"

**Conditional Formatting for Levels:**
1. Select C2:C1000
2. Format → Conditional formatting
3. Add 5 rules:
   - If text is exactly "5" → Background: #00ff00 (green)
   - If text is exactly "4" → Background: #93c47d (light green)
   - If text is exactly "3" → Background: #ffd966 (yellow)
   - If text is exactly "2" → Background: #f6b26b (orange)
   - If text is exactly "1" → Background: #e06666 (red)

## Sheet 4: Summary

This sheet uses QUERY formulas to automatically generate different views of the data.

### Section 1: Skills by Person (Cell A4)
```
=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE A is not null ORDER BY A, C DESC, B", 1)
```
Shows all people with their skills, sorted by person name and skill level.

### Section 2: People by Skill (Cell E4)
```
=QUERY(Person_Skills!A:C, "SELECT B, A, C WHERE B is not null ORDER BY B, C DESC, A", 1)
```
Shows all skills with people who have them, sorted by skill name and level.

### Section 3: Skill Coverage (Cell I5)
First add headers in I4:K4:
- I4: "Skill"
- J4: "Total People"
- K4: "Avg Level"

Then in I5:
```
=QUERY(Person_Skills!B:C, "SELECT B, COUNT(B), AVG(C) WHERE B is not null GROUP BY B ORDER BY COUNT(B) DESC", 0)
```
Shows how many people have each skill and the average proficiency level.

### Section 4: Experts (Cell M4)
```
=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE C >= 4 ORDER BY C DESC, B, A", 1)
```
Shows only people with expert-level skills (level 4-5).

## Additional Tips

### Prevent Duplicate Person-Skill Combinations
Add a helper column in Person_Skills sheet (Column E) with this formula:
```
=A2&"|"&B2
```
Then use conditional formatting to highlight duplicates:
1. Select E2:E1000
2. Format → Conditional formatting
3. "Custom formula is": `=COUNTIF($E$2:$E,E2)>1`
4. Set background color to red

### Search for Experts in a Specific Skill
Add this formula to any cell (e.g., on Summary sheet):
```
=QUERY(Person_Skills!A:C, "SELECT A, C WHERE B = 'Python' AND C >= 4 ORDER BY C DESC", 1)
```
Change 'Python' to any skill name.

### Count Total Skills per Person
In a new column on the Summary sheet:
```
=QUERY(Person_Skills!A:A, "SELECT A, COUNT(A) WHERE A is not null GROUP BY A LABEL COUNT(A) 'Total Skills'")
```

## Usage Workflow

1. **Admin**: Pre-fill People sheet with all team members
2. **Everyone**: Browse Skills sheet to see existing skills
3. **Adding New Skills**: 
   - Check if skill exists in Skills sheet first
   - If not, add it to Skills sheet
   - Use consistent naming (e.g., "Python" not "python")
4. **Adding Your Skills**:
   - Go to Person_Skills sheet
   - Add new row
   - Select your name from dropdown
   - Select skill from dropdown
   - Select your level (1-5)
   - Optionally add notes
5. **View Results**: Check Summary sheet for various views

## Skill Level Guidelines

- **1 - Beginner**: Aware of the skill, minimal experience
- **2 - Basic**: Can complete simple tasks with guidance
- **3 - Intermediate**: Can work independently on most tasks
- **4 - Advanced**: Can handle complex problems, mentor others
- **5 - Expert**: Deep expertise, go-to person for this skill
