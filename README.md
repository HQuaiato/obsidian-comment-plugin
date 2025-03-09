# Comment Plugin for Obsidian

This plugin allows you to add and manage comments to your text in Obsidian. You can highlight sections of text and associate comments with them, which appear in a tooltip when you hover over the text. Additionally, you can easily edit or remove comments.

---

## Features

- **Add Comments**: Select text and add a comment to it.
- **View Comments**: Hover over commented text to view the comment in a tooltip.
- **Edit Comments**: Click the "Edit" button in the tooltip to modify the comment.
- **Remove Comments**: Use the command to remove comments from a section of text.
- **Customizable Hotkeys**: Use keyboard shortcuts to quickly add and remove comments.

---

## Installation

1. **Download the Plugin**:
   - Clone this repository or download the `.zip` file and extract its contents.

2. **Install in Obsidian**:
   - Open Obsidian and go to `Settings > Community plugins`.
   - Disable "Safe mode" if it’s enabled.
   - Click `Open plugins folder` to open the plugins directory.
   - Create a new folder for the plugin (e.g., `comment-plugin`).
   - Copy the plugin files (`main.js`, `manifest.json`, `styles.css`) into the folder you created.

3. **Enable the Plugin**:
   - Go back to Obsidian and click `Reload plugins`.
   - Find "Comment Plugin" in the list and enable it.

---

## Usage

### Add a Comment
1. Select a section of text in your file.
2. Use the shortcut `Ctrl + +` (or go to `Command Palette` and search for "Add Comment").
3. Type your comment in the modal that appears and click "Save".

### View a Comment
- Hover over the text that contains a comment. A tooltip will appear with the comment.

### Edit a Comment
1. Hover over the commented text to see the tooltip.
2. Click the "Edit" button in the tooltip.
3. Modify the comment and click "Save".

### Remove a Comment
1. Place your cursor on the text that contains the comment.
2. Use the shortcut `Ctrl + -` (or go to `Command Palette` and search for "Remove Comment").

---

## Customization

### Modify Hotkeys
1. Go to `Settings > Hotkeys`.
2. Search for the commands "Add Comment" and "Remove Comment".
3. Click the keyboard icon next to the command and set a new hotkey.

### Custom Styles
If you want to change the appearance of comments or the tooltip, edit the `main.ts` file in the plugin directory. Here are the main classes:

- `.comment`: Style for commented text.
- `.comment-tooltip`: Style for the tooltip that displays the comment.
- `.comment-button`: Style for buttons in the tooltip.

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project!

## Credits

This project was developed by **[HQuaiato](https://github.com/HQuaiato)**. Special thanks to:

- **[Obsidian](https://obsidian.md)** for creating an amazing note-taking tool.
- **[Community Plugins](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)** for inspiration and support.
