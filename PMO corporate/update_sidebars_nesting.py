import os

workspace_dir = "/Users/henrychia/Desktop/PB design/Public Mutual/PMO corporate"
source_file = os.path.join(workspace_dir, "unit-trust/settings.html")

def extract_sidebar_mount_block(html_content):
    start_tag = '<div id="pmoShellSidebarMount"'
    start_idx = html_content.find(start_tag)
    if start_idx == -1:
        return None
        
    depth = 0
    i = start_idx
    n = len(html_content)
    
    while i < n:
        if html_content[i:i+4].lower() == '<div':
            if i+4 < n and html_content[i+4] in (' ', '>', '\n', '\r', '\t'):
                depth += 1
                i += 4
                continue
        elif html_content[i:i+6].lower() == '</div>':
            depth -= 1
            if depth == 0:
                return html_content[start_idx : i+6]
            i += 6
            continue
            
        i += 1
        
    return None

# 1. Read settings.html to extract the new consolidated sidebar template
with open(source_file, "r", encoding="utf-8") as f:
    source_content = f.read()

template_sidebar_html = extract_sidebar_mount_block(source_content)
if not template_sidebar_html:
    print("Error: Could not extract sidebar mount from settings.html")
    exit(1)

print("Successfully extracted consolidated sidebar template via nesting parser!")

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
            
            existing_sidebar = extract_sidebar_mount_block(content)
            
            if existing_sidebar:
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
                new_content = content.replace(existing_sidebar, customized_sidebar)
                
                # Clean up CORS site.webmanifest from the file
                import re
                manifest_tag_pattern = r'<link\s+rel="manifest"\s+href="[^"]*site\.webmanifest"[^>]*>'
                matches = re.findall(manifest_tag_pattern, new_content)
                if matches:
                    for match in matches:
                        commented_tag = f"<!-- {match} -->"
                        new_content = new_content.replace(match, commented_tag)
                
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                
                print(f"Updated sidebar in: {t_dir}/{filename}")
                updated_count += 1
            else:
                print(f"Sidebar mount not found in: {t_dir}/{filename}")

print(f"Done! Successfully updated {updated_count} files using tag nesting parser.")
