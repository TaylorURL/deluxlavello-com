"""List the visible English strings on the site, and what i18n/es.json still owes.

Run it from the project root. With no arguments it prints the strings that have
no Spanish yet; with --all it prints every string it found.

    python3 scripts/i18n-strings.py
    python3 scripts/i18n-strings.py --all
"""

import html as htmllib
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP_BLOCKS = re.compile(r'<(script|style|svg)\b.*?</\1>', re.S | re.I)
TAG = re.compile(r'<[^>]+>')
ATTRS = re.compile(r'(?:aria-label|alt|title)="([^"]*)"')
TITLE = re.compile(r'<title>(.*?)</title>', re.S | re.I)
DESC = re.compile(r'<meta\s+name="description"\s+content="([^"]*)"', re.S | re.I)

def tidy(text):
    # The browser resolves entities before the text ever reaches a text node, so
    # a key written against the raw source would never match at runtime.
    return re.sub(r'\s+', ' ', htmllib.unescape(text)).strip()


def pages():
    for path in sorted(ROOT.glob('**/*.html')):
        if any(part in {'node_modules', 'dist'} for part in path.parts):
            continue
        yield path


def strings(html):
    found = []
    for match in TITLE.findall(html) + DESC.findall(html):
        found.append(tidy(match))
    body = html.split('<body', 1)[-1] if '<body' in html else html
    for match in ATTRS.findall(body):
        found.append(tidy(match))
    for chunk in TAG.split(SKIP_BLOCKS.sub(' ', body)):
        text = tidy(chunk)
        # A bare number or a lone symbol reads the same in both languages.
        if text and not re.fullmatch(r'[\W\d]+', text):
            found.append(text)
    return found


def main():
    dictionary = {}
    words = ROOT / 'i18n' / 'es.json'
    if words.is_file():
        dictionary = json.loads(words.read_text())

    every = {}
    for path in pages():
        for text in strings(path.read_text()):
            every.setdefault(text, []).append(path.relative_to(ROOT).as_posix())

    show_all = '--all' in sys.argv
    missing = [text for text in every if text not in dictionary]
    for text in every if show_all else missing:
        print(json.dumps(text))
    stale = [text for text in dictionary if text not in every]
    print(
        f'\n{len(every)} strings, {len(every) - len(missing)} translated, '
        f'{len(missing)} missing, {len(stale)} no longer on any page',
        file=sys.stderr,
    )
    for text in stale:
        print(f'  stale: {text[:70]}', file=sys.stderr)


main()
