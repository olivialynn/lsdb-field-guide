# LSDB Field Guide

A quick reference for [LSDB](https://github.com/astronomy-commons/lsdb), aimed at people
meeting it for the first time at a conference hack day.

**Live site:** https://olivialynn.github.io/lsdb-field-guide/

## What this is

A field guide, not documentation. It is deliberately short, and it does not try to cover
the API — [docs.lsdb.io](https://docs.lsdb.io) already does that well. This exists for the
person who sat down an hour ago wanting to do some science, and would rather not spend
that hour reading.

Three pages:

- **Start** (`index.html`) — what this is, and one snippet that gets a plot on screen
- **Do** (`do.html`) — copy-pasteable recipes, phrased as "I want to…"
- **Ask** (`ask.html`) — short answers to foundational questions, phrased as questions

Start exists so that Do can open straight into "I want to…" items. When the starter
lived on Do, you had to scroll past it before seeing anything that completed the
sentence in the heading.

It is also distinct from the [per-event tutorial repos](https://docs.lsdb.io/en/stable/tutorials.html):
those are event-scoped and disposable, this one outlives them.

## Working on it

Plain HTML, CSS, and JavaScript. No build step, no framework, no dependencies.

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Edit the HTML directly and reload. That's the whole workflow.

### Conventions worth keeping

- **Every section has a hand-written `id`.** Links get pasted into Slack during hack days
  and should keep working. Never let an anchor be auto-generated.
- **Snippets that trigger computation carry the `⚡ triggers computation` badge**, and
  nothing else carries a badge. There is deliberately no `lazy` badge: when almost every
  snippet is lazy, saying so on each one is noise, and the loud badge stops being loud.
  Check the badge whenever you touch a snippet — `.head()`, `.compute()`, `len()`, and
  the `plot_*` methods all execute.
- **Snippets have no `>>>` prompts**, so selecting one gives you runnable code.
- **Snippets carry `data-setup` and `data-verify` attributes** for the verification
  harness. `data-verify="skip"` requires a `data-skip-reason`.

## License

BSD 3-Clause, matching LSDB.
