Prompt 1: We're building Night Sky Log, a small web app that suggests what to look at in the night sky each month. Create two folders: server, with a small Node Express app, and web, with a Vite page. The server will serve a list of sky targets at /api/targets and the web page will read it. Only set up the two folders so they start; don't add features yet.

Prompt 2: Start a background subagent to build the server part. In the server folder, make GET /api/targets return 24 bright night sky targets as JSON: planets, star clusters, nebulae and galaxies. Each target has an id, a name, a type, a bestMonth from 1 to 12, a difficulty from 1 to 3, and a one-line tip. Have it finish with a short summary.

Prompt 3: Now build the web page in the web folder. It reads /api/targets and shows each target as a card with its name, type, difficulty and tip. Add a month picker at the top that filters the cards to targets whose bestMonth matches. Use a dark night-sky look. Targets have id, name, type, bestMonth (1 to 12), difficulty (1 to 3) and tip.

Prompt 4: Install the dependencies in both folders, then start the server and the web page so I can open the site. Make sure both build. Don't click through it in the browser; I'll check it myself.

Prompt 5: Use Context7 to read the current docs for Express, Vite and Chart.js. Save a short setup note for each in a docs folder, one markdown file per library. When you're done, tell me how many tool calls it took.

Prompt 6: Add a bar chart to the top of the web page showing how many targets are best in each month, using Chart.js and the setup note in docs. Make sure the web page builds.

Prompt 7: I want a Seen It button on every card that remembers what I've already spotted. Create a worktree called seen-it for this, move this chat into it, and then build the button in the web page. Save the seen targets in the browser, and make sure the web page builds.

Prompt 8: Read the terminal plugin docs at opencode.ai/v2/docs/build/plugins/cli. Then write me a terminal plugin in this project with a slash command called /sky that shows a message saying "Clear skies tonight". Load it so I can use it right away.