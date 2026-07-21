import os
import re

workspace_dir = "/Users/henrychia/Desktop/PB design/Public Mutual/PMO corporate"
source_file = os.path.join(workspace_dir, "unit-trust/settings.html")

# 1. Read settings.html to extract the new consolidated sidebar template
with open(source_file, "r", encoding="utf-8") as f:
    source_content = f.read()

# Using the robust lookahead regex that matches up to Bootstrap Bundle with Popper script tag
match = re.search(r'(<div id="pmoShellSidebarMount">[\s\S]*?)(?=\s*<!-- Bootstrap Bundle with Popper -->)', source_content)
if not match:
    print("Error: Could not find sidebar mount in settings.html")
    exit(1)

template_sidebar_html = match.group(1)
print("Successfully extracted consolidated sidebar template!")

# Target subdirectories
target_dirs = ["unit-trust", "eop", "analytics"]

updated_count = 0

# 2. Iterate and update files with customized IDs
for t_dir in target_dirs:
    dir_path = os.path.join(workspace_dir, t_dir)
    if not os.path.exists(dir_path):
        continue
    
    for filename in os.listdir(dir_path):
        if filename.endswith(".html"):
            file_path = os.path.join(dir_path, filename)
            
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Find the existing sidebar mount section using the same robust lookahead
            existing_match = re.search(r'(<div id="pmoShellSidebarMount">[\s\S]*?)(?=\s*<!-- Bootstrap Bundle with Popper -->)', content)
            
            if existing_match:
                # Customize IDs based on folder
                customized_sidebar = template_sidebar_html
                
                if t_dir == "eop":
                    customized_sidebar = customized_sidebar.replace('id="sidebarMenu"', 'id="eopSidebarOffcanvas"')
                    customized_sidebar = customized_sidebar.replace('aria-labelledby="sidebarMenuLabel"', 'aria-labelledby="eopSidebarUserName"')
                    customized_sidebar = customized_sidebar.replace('id="sidebarMenuLabel"', 'id="eopSidebarUserName"')
                elif t_dir == "analytics":
                    customized_sidebar = customized_sidebar.replace('id="sidebarMenu"', 'id="analyticsSidebarOffcanvas"')
                    customized_sidebar = customized_sidebar.replace('aria-labelledby="sidebarMenuLabel"', 'aria-labelledby="analyticsSidebarUserName"')
                    customized_sidebar = customized_sidebar.replace('id="sidebarMenuLabel"', 'id="analyticsSidebarUserName"')
                
                # Replace in file content
                new_content = content.replace(existing_match.group(1), customized_sidebar)
                
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                
                print(f"Updated sidebar in: {t_dir}/{filename}")
                updated_count += 1
            else:
                print(f"Sidebar mount not found in: {t_dir}/{filename}")

print(f"Done! Successfully updated {updated_count} files with robust lookahead mapping.")
