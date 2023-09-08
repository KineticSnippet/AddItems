# Contributions

All Contributions are welcome!

If you have an idea that can improve the performance, user experience, expand the limits, or any other general improvements of any kind, report bugs, or something that isn't working, you can:

## Submit a issue on github

You can [create an issue](https://github.com/kineticSnippet/AddItems/issues) and include as much information as you can describing the issue, idea or contribution.

### Issues/bugs

If you are reporting a issue, make sure to:

- Include your Operating System (Linux/Windows/Mac)
- Describe and add as many details as you can
- Include information on how to replicate the issue
- A screenshot or a copy-paste version of the log window

Please make sure to include the log
> See [How to read the output log](#output-log)

Examples (not limited to)

- An uncaught exception
- Typos (How embarrassing 🫠)
- Something not working

### Improvements

If you are giving feedback or suggesting improvements

General feedback is always welcome, feel free to add a new issue just to say what you think, what I must do better, or improve.

In case of new features suggestions:

- Include the case-scenarios where your improvement would be useful.
- Make sure your improvement fits the `add-items` purpose.

Examples (not limited to):

- New functionality
- Add support for another language.
- Add more templates.
- Add context menu for another language.

## Create Pull Request

Feeling brave uh? I appreciate the effort!  
If you modified the extension, and want to contribute your modifications back to this project, make sure to:

- Format all files with 4 spaces (json, ts, or others, except markdown).
- Modify the [Changelog](/CHANGELOG.md) file and include all your modifications.
- Include your changes and change-description in your PR.

I will be happy to review your changes and approve them if they fit in the extension.

Examples (not limited to):

- Fix am issue
- Add support for another language
- Improve start-up time
- Add documentation

## Output log

To read the log, please

- Press `Ctrl + j` to open the panel
- Click `Output` and in the up-left side-
  - Alternatively you can press `Ctrl + Shit + U` on windows
- In the drop down menu search for `add-items`

You must be able to read this extension's log, that looks like exactly like this:

```markdown
>9/2/2023, 10:52:09 AM-[🟢]  Lumberjack initialized for add-items
>9/2/2023, 10:52:09 AM-[⚒️]  Initializing ConfigManager
>9/2/2023, 10:52:09 AM-[⚒️]  Applying startup configuration
>9/2/2023, 10:52:09 AM-[⚒️]  showCustoms: false, showCSharp: Dynamic, showRazor: Dynamic, showTypescript: Dynamic, showPython: Dynamic
>9/2/2023, 10:52:09 AM-[⚒️]  Registering configuration listener
>9/2/2023, 10:52:09 AM-[⚒️]  ConfigManager initialized
>9/2/2023, 10:52:09 AM-[🔎]  Watcher created
>9/2/2023, 10:52:09 AM-[🟢]  Activating extension add-items
>9/2/2023, 10:52:09 AM-[🟢]  Registered essential commands
>9/2/2023, 10:52:09 AM-[🟢]  Registered 39 commands
>9/2/2023, 10:52:09 AM-[🔎]  Watcher checking initial config in just a moment
>9/2/2023, 10:52:09 AM-[🥳🎉🎊]  Extension add-items activated

>9/2/2023, 10:52:09 AM-[🟢]  Initializing Warehouse
>9/2/2023, 10:52:09 AM-[🟢]  Warehouse initialized
>9/2/2023, 10:52:09 AM-[🔎]  Enabling watchers or setting context menu states
>9/2/2023, 10:52:09 AM-[🔎]  C# watcher enabled
>9/2/2023, 10:52:09 AM-[🔎]  Razor watcher enabled
>9/2/2023, 10:52:09 AM-[⚒️]  Request to show TypeScript context menu received 🫡
>9/2/2023, 10:52:09 AM-[🔎]  Python watcher enabled
>9/2/2023, 10:52:09 AM-[🔎]  All context menu states set
>9/2/2023, 10:52:09 AM-[😎]  Watcher is ready to go!
```

---

Thanks for using `add-items`.
