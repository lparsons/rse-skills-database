# RSE Skills Tracker

A simple, collaborative Google Sheets-based system for tracking team members' skills and proficiency levels. Perfect for research software engineering teams, development groups, or any organization wanting to map their collective expertise.

## Features

- **Centralized skill management** - Master skills list prevents duplicates (e.g., "Python" vs "python")
- **Self-service skill entry** - Team members add their own skills and proficiency levels
- **Multiple summary views** - Automatically generated reports show skills by person, people by skill, coverage statistics, and experts
- **Visual proficiency indicators** - Color-coded skill levels (1-5 scale) for quick assessment
- **Easy setup** - Automated Apps Script setup or detailed manual instructions
- **No coding required** - Pure Google Sheets solution with formulas and data validation

## Quick Start

### Option 1: Automated Setup (Recommended)

1. Create a new Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete the default code
4. Copy the contents of `skills-tracker-setup.gs` and paste it
5. Click the save icon
6. Select the `setupSkillsTracker` function from the dropdown
7. Click **Run** and grant permissions when prompted
8. Return to your spreadsheet - all sheets are now configured!

### Option 2: Manual Setup

Follow the step-by-step instructions in `skills-tracker-manual-setup.md` to create and configure each sheet manually.

## How It Works

The tracker consists of four sheets:

### 1. People Sheet
Contains the roster of team members with their basic information:
- Person ID (auto-numbered)
- Name
- Email

**Admin pre-fills this sheet** before distributing to the team.

### 2. Skills Sheet
Master list of all available skills:
- Skill ID (auto-numbered)
- Skill Name
- Category (optional - e.g., Programming, DevOps, Soft Skills)

Team members **browse this sheet first** to see existing skills before adding new ones. This ensures consistency (everyone refers to "Python" not "python", "py", etc.).

### 3. Person_Skills Sheet
Where team members add their skill assessments:
- Person Name (dropdown - validated against People sheet)
- Skill (dropdown - validated against Skills sheet)
- Level (1-5 dropdown with color coding)
- Notes (optional - e.g., "5 years experience", "Used in Production")

**Dropdowns prevent typos** and ensure data quality.

### 4. Summary Sheet
Auto-generated views using `QUERY()` formulas:
- **Skills by Person** - See all skills for each team member
- **People by Skill** - See who has each skill
- **Skill Coverage** - How many people have each skill + average proficiency
- **Experts** - Filter for only Level 4-5 (Advanced/Expert) skills

## Skill Level Guidelines

- **Level 1 - Beginner**: Aware of the skill, minimal hands-on experience
- **Level 2 - Basic**: Can complete simple tasks with guidance or documentation
- **Level 3 - Intermediate**: Can work independently on most tasks
- **Level 4 - Advanced**: Can handle complex problems, mentor others
- **Level 5 - Expert**: Deep expertise, recognized go-to person for this skill

## Usage Workflow

1. **Admin**: Pre-fill the **People** sheet with all team members
2. **Admin**: Add common skills to the **Skills** sheet (or let team members add as needed)
3. **Team Members**:
   - Browse the **Skills** sheet to see what already exists
   - If your skill isn't listed, add it to the **Skills** sheet first (use consistent naming!)
   - Go to **Person_Skills** sheet and add rows for each of your skills:
     - Select your name from dropdown
     - Select skill from dropdown
     - Select your proficiency level (1-5)
     - Optionally add notes
4. **Everyone**: Check the **Summary** sheet to see team capabilities

## Additional Resources

- **`skills-tracker-formulas-reference.md`** - Library of useful formulas including:
  - Find all skills for a specific person
  - Find all people with a specific skill
  - Identify rare skills (only one person has)
  - Calculate average skill level per person
  - Detect duplicate entries
  - And many more!

- **`skills-tracker-manual-setup.md`** - Detailed setup instructions including:
  - Sheet structure and formatting
  - Data validation configuration
  - Conditional formatting rules
  - All formulas with explanations

## Preventing Duplicate Skills

The system prevents duplicates through:
1. **Skills sheet as source of truth** - Everyone must select from this list
2. **Data validation dropdowns** - Can't type free-form text in Person_Skills
3. **Visual browsing** - People see existing skills before adding new ones

**Best Practice**: Before adding a new skill, search the Skills sheet (Ctrl+F) to make sure it doesn't already exist under a different name.

## Customization Ideas

- **Add skill categories** - Group skills by domain (Programming, Cloud, Databases, etc.)
- **Track certifications** - Add a column for certification dates or credential IDs
- **Years of experience** - Add numeric column alongside proficiency level
- **Interest vs. proficiency** - Separate "want to learn" from "currently proficient"
- **Project tracking** - Link skills to specific projects where they were used
- **Skill gaps** - Identify skills needed but not present in the team

## Exporting and Sharing

- **Share the Google Sheet** directly with view or edit access
- **Export to CSV** for import into other systems
- **Create public view** for read-only access (remove email addresses first!)
- **Periodic snapshots** - Duplicate the sheet quarterly to track skill growth over time

## License

MIT License - See LICENSE file for details.

## Contributing

Contributions welcome! If you develop useful formulas, improved automation scripts, or additional features, please share them.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Note**: This is a pure Google Sheets solution with no external dependencies, databases, or server requirements. All data lives in your Google Sheet, giving you full control over privacy and access.