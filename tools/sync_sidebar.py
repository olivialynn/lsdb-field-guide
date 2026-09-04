"""Rebuild each page's sidebar from its own headings.

The sidebar must list every section and subsection, in document order, with the
same words as the heading it points at. Hand-maintaining that drifts the moment
a subsection is added, so generate it instead and let check_markup.py enforce it.

Run: python3 tools/sync_sidebar.py
"""

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent


def headings(html: str) -> list[tuple[str, str, str]]:
    """Return (level, id, text) for every section heading, in document order."""
    found = []
    for match in re.finditer(
        r'<section class="section" id="([^"]+)">\s*<h2>(.*?)(?:<a class="anchor".*?</a>)?</h2>'
        r'|<h3 id="([^"]+)">(.*?)</h3>',
        html,
        re.S,
    ):
        if match.group(1):
            found.append(("h2", match.group(1), match.group(2).strip()))
        else:
            found.append(("h3", match.group(3), match.group(4).strip()))
    return found


def build(html: str) -> str:
    items = []
    for level, anchor, text in headings(html):
        css = "" if level == "h2" else ' class="is-sub"'
        items.append(f'      <li{css}><a href="#{anchor}">{text}</a></li>')
    return "\n".join(items)


def sync(write: bool = True) -> list[str]:
    stale = []
    for path in sorted(ROOT.glob("*.html")):
        html = path.read_text()
        match = re.search(r'(  <nav class="sidebar".*?<ol>\n)(.*?)(\n    </ol>)', html, re.S)
        if not match:
            continue
        wanted = build(html)
        if match.group(2) != wanted:
            stale.append(path.name)
            if write:
                path.write_text(html[: match.start(2)] + wanted + html[match.end(2) :])
    return stale


if __name__ == "__main__":
    changed = sync()
    print(f"sidebar rebuilt: {', '.join(changed)}" if changed else "sidebars already in sync")
