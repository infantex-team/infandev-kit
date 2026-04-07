import os
import json
import argparse
from pathlib import Path

def get_agent_root():
    """Navigate to the .agent directory."""
    current_path = Path(__file__).resolve()
    for parent in current_path.parents:
        if (parent / ".agent").exists():
            return parent / ".agent"
    return None

def list_skills(agent_root):
    """Index all folders in the skills directory and parse their metadata."""
    skills_dir = agent_root / "skills"
    skills_map = {}
    if skills_dir.exists():
        for skill_folder in skills_dir.iterdir():
            if skill_folder.is_dir():
                skill_md = skill_folder / "SKILL.md"
                description = "No description available."
                if skill_md.exists():
                    try:
                        content = skill_md.read_text(encoding="utf-8")
                        # Basic YAML frontmatter parser for simplicity
                        if content.startswith("---"):
                            end_pos = content.find("---", 3)
                            if end_pos != -1:
                                frontmatter = content[3:end_pos]
                                for line in frontmatter.splitlines():
                                    if "description:" in line:
                                        description = line.split("description:", 1)[1].strip()
                                        break
                    except Exception:
                        pass
                
                scripts = []
                scripts_dir = skill_folder / "scripts"
                if scripts_dir.exists():
                    scripts = [f.name for f in scripts_dir.iterdir() if f.is_file()]
                
                skills_map[skill_folder.name] = {
                    "description": description,
                    "scripts": scripts
                }
    return skills_map

def list_workflows(agent_root):
    workflows_dir = agent_root / "workflows"
    workflows_map = {}
    if workflows_dir.exists():
        for workflow_file in workflows_dir.iterdir():
            if workflow_file.is_file() and workflow_file.suffix == ".md":
                name = workflow_file.stem
                description = "No description available."
                try:
                    content = workflow_file.read_text(encoding="utf-8")
                    if content.startswith("---"):
                        end_pos = content.find("---", 3)
                        if end_pos != -1:
                            frontmatter = content[3:end_pos]
                            for line in frontmatter.splitlines():
                                if "description:" in line:
                                    description = line.split("description:", 1)[1].strip()
                                    break
                except Exception:
                    pass
                workflows_map[name] = description
    return workflows_map

def list_master_scripts(agent_root):
    scripts_dir = agent_root / "scripts"
    master_scripts = []
    if scripts_dir.exists():
        master_scripts = [f.name for f in scripts_dir.iterdir() if f.is_file()]
    return master_scripts

def main():
    parser = argparse.ArgumentParser(description="Antigravity Tool Registry Discovery")
    parser.add_argument("command", choices=["map", "verify"], help="Command to run")
    parser.add_argument("--tool", help="Specific tool name to verify")
    args = parser.parse_args()

    agent_root = get_agent_root()
    if not agent_root:
        print("Error: Could not find .agent directory.")
        return

    if args.command == "map":
        results = {
            "skills": list_skills(agent_root),
            "workflows": list_workflows(agent_root),
            "master_scripts": list_master_scripts(agent_root)
        }
        print(json.dumps(results, indent=2))
    
    elif args.command == "verify":
        if not args.tool:
            print("Error: Please provide a tool name with --tool")
            return
        
        skills = list_skills(agent_root)
        workflows = list_workflows(agent_root)
        scripts = list_master_scripts(agent_root)
        
        found = False
        if args.tool in skills:
            print(f"Tool FOUND in SKILLS: {args.tool}")
            print(f"Description: {skills[args.tool]['description']}")
            print(f"Scripts: {skills[args.tool]['scripts']}")
            found = True
        elif args.tool in workflows:
            print(f"Tool FOUND in WORKFLOWS: {args.tool}")
            print(f"Description: {workflows[args.tool]}")
            found = True
        elif args.tool in scripts:
            print(f"Tool FOUND in MASTER SCRIPTS: {args.tool}")
            found = True
        
        if not found:
            print(f"Tool NOT FOUND: {args.tool}")

if __name__ == "__main__":
    main()
