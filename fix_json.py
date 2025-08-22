import re

with open('data/platforms.json', 'r') as f:
    content = f.read()

# Fix pattern: ]\n      "fieldname" should be ],\n      "fieldname"
content = re.sub(r'\]\n(\s*)"', r'],\n\1"', content)

# Fix pattern: }\n  ]\n  " should be }\n  ],\n  "
content = re.sub(r'}\n(\s*)\]\n(\s*)"', r'}\n\1],\n\2"', content)

with open('data/platforms.json', 'w') as f:
    f.write(content)

print("Fixed JSON formatting")