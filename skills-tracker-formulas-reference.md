# Skills Tracker - Formula Quick Reference

## Summary Sheet Formulas

### All Skills by Person
Shows each person with all their skills, sorted by person and skill level.
```
=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE A is not null ORDER BY A, C DESC, B", 1)
```

### All People by Skill
Shows each skill with all people who have it, sorted by skill and level.
```
=QUERY(Person_Skills!A:C, "SELECT B, A, C WHERE B is not null ORDER BY B, C DESC, A", 1)
```

### Skill Coverage Statistics
Shows each skill, how many people have it, and average proficiency.
```
=QUERY(Person_Skills!B:C, "SELECT B, COUNT(B), AVG(C) WHERE B is not null GROUP BY B ORDER BY COUNT(B) DESC", 0)
```

### Experts Only (Level 4-5)
Shows only people with expert-level skills.
```
=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE C >= 4 ORDER BY C DESC, B, A", 1)
```

## Additional Useful Queries

### Find All Skills for a Specific Person
Replace "Alice Johnson" with actual name:
```
=QUERY(Person_Skills!A:C, "SELECT B, C WHERE A = 'Alice Johnson' ORDER BY C DESC", 1)
```

### Find All People with a Specific Skill
Replace "Python" with actual skill:
```
=QUERY(Person_Skills!A:C, "SELECT A, C WHERE B = 'Python' ORDER BY C DESC", 1)
```

### Count Total Skills per Person
```
=QUERY(Person_Skills!A:A, "SELECT A, COUNT(A) WHERE A is not null GROUP BY A ORDER BY COUNT(A) DESC LABEL COUNT(A) 'Total Skills'")
```

### Find Skills Only One Person Has (Rare Skills)
```
=QUERY(Person_Skills!B:B, "SELECT B, COUNT(B) WHERE B is not null GROUP BY B HAVING COUNT(B) = 1 LABEL COUNT(B) 'Count'")
```

### Average Skill Level per Person
```
=QUERY(Person_Skills!A:C, "SELECT A, AVG(C) WHERE A is not null GROUP BY A ORDER BY AVG(C) DESC LABEL AVG(C) 'Avg Level'")
```

### Skills in High Demand (3+ People)
```
=QUERY(Person_Skills!B:B, "SELECT B, COUNT(B) WHERE B is not null GROUP BY B HAVING COUNT(B) >= 3 ORDER BY COUNT(B) DESC LABEL COUNT(B) 'People Count'")
```

### Beginner Skills Only (Level 1-2)
```
=QUERY(Person_Skills!A:C, "SELECT A, B, C WHERE C <= 2 ORDER BY A, B", 1)
```

### Skills by Category (requires Category in Skills sheet)
```
=QUERY({Person_Skills!A:C, ARRAYFORMULA(VLOOKUP(Person_Skills!B:B, Skills!B:C, 2, FALSE))}, "SELECT Col1, Col2, Col3, Col4 WHERE Col1 is not null ORDER BY Col4, Col1", 1)
```

## Helper Formulas

### Detect Duplicate Person-Skill Entries
Put in column E of Person_Skills sheet:
```
=IF(COUNTIFS($A$2:$A, A2, $B$2:$B, B2) > 1, "DUPLICATE", "")
```

### Auto-increment Person ID
Put in A2 of People sheet, then drag down:
```
=IF(B2="", "", ROW()-1)
```

### Auto-increment Skill ID
Put in A2 of Skills sheet, then drag down:
```
=IF(B2="", "", ROW()-1)
```

### Skill Name Lookup from ID
```
=VLOOKUP(skill_id, Skills!A:B, 2, FALSE)
```

### Person Name Lookup from ID
```
=VLOOKUP(person_id, People!A:B, 2, FALSE)
```

## Data Validation Formulas

### Dynamic Skill Dropdown (only shows unused skills for selected person)
For cell B2 in Person_Skills (requires named range for person in A2):
```
=FILTER(Skills!B:B, NOT(ISERROR(MATCH(Skills!B:B, FILTER(Person_Skills!B:B, Person_Skills!A:A=A2), 0))))
```
Note: This is complex - easier to just use simple dropdown from Skills!B:B

## Conditional Formatting Formulas

### Highlight if Person-Skill combo already exists
Custom formula for Person_Skills data range:
```
=COUNTIFS($A$2:$A, $A2, $B$2:$B, $B2) > 1
```

### Highlight skills below average for that skill
Custom formula for Level column:
```
=$C2 < AVERAGEIF(Person_Skills!$B:$B, $B2, Person_Skills!$C:$C)
```

### Highlight people with fewer than 3 skills
Custom formula for Person_Skills rows:
```
=COUNTIF($A:$A, $A2) < 3
```

## Tips for Using QUERY Function

**Basic Syntax:**
```
=QUERY(data_range, "SELECT columns WHERE condition ORDER BY columns", headers)
```

**Common WHERE Conditions:**
- `WHERE A is not null` - exclude empty rows
- `WHERE C >= 4` - numeric comparison
- `WHERE B = 'Python'` - exact text match
- `WHERE B contains 'Script'` - partial text match
- `WHERE C >= 3 AND B = 'Python'` - multiple conditions

**Common SELECT Aggregations:**
- `COUNT(A)` - count rows
- `AVG(C)` - average of column
- `SUM(C)` - sum of column
- `MAX(C)` - maximum value
- `MIN(C)` - minimum value

**Headers Parameter:**
- `1` - include header row from data
- `0` - exclude header row, start with data
- `-1` - auto-generate headers

**LABEL Clause:**
Use to rename columns:
```
LABEL COUNT(A) 'Total Skills', AVG(C) 'Average Level'
```
