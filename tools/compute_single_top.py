#!/usr/bin/env python3
"""Симуляция getSingleTopWins — корректный разбор турниров по датам."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILES = [
    ROOT / "winter-rating-data.js",
    ROOT / "spring-rating-data-march.js",
    ROOT / "spring-rating-data-april.js",
]
text = "\n".join(p.read_text(encoding="utf-8") for p in DATA_FILES if p.exists())


def extract_object_after(marker: str) -> str:
    i = text.index(marker) + len(marker)
    while i < len(text) and text[i] in " \t\n":
        i += 1
    if text[i] != "{":
        raise ValueError(marker)
    depth = 0
    start = i
    for j in range(i, len(text)):
        c = text[j]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return text[start : j + 1]
    raise ValueError("unclosed")


def split_top_level_objects(arr_src: str) -> list[str]:
    """arr_src = '[ ... ]' — список объектов турниров."""
    inner = arr_src.strip()
    if not inner.startswith("[") or not inner.endswith("]"):
        return []
    s = inner[1:-1].strip()
    if not s:
        return []
    objs = []
    i = 0
    n = len(s)
    while i < n:
        while i < n and s[i] in ", \t\n":
            i += 1
        if i >= n:
            break
        if s[i] != "{":
            i += 1
            continue
        depth = 0
        start = i
        for j in range(i, n):
            if s[j] == "{":
                depth += 1
            elif s[j] == "}":
                depth -= 1
                if depth == 0:
                    objs.append(s[start : j + 1])
                    i = j + 1
                    break
        else:
            break
    return objs


def parse_tournament_obj(blob: str) -> dict:
    tm = re.search(r'time:\s*"([^"]*)"', blob)
    time_s = tm.group(1) if tm else ""
    bm = re.search(r"buyin:\s*([\d.]+)", blob)
    buyin = float(bm.group(1)) if bm else float("nan")
    lm = re.search(r"league:\s*(\d+)", blob)
    league = int(lm.group(1)) if lm else None
    players = []
    for pm in re.finditer(r'nick:\s*"((?:\\.|[^"\\])*)"[^}]*?reward:\s*([\d.]+)', blob):
        nick = pm.group(1).replace('\\"', '"')
        players.append({"nick": nick, "reward": float(pm.group(2))})
    return {"time": time_s, "buyin": buyin, "league": league, "players": players}


def parse_tournaments(obj_src: str) -> dict[str, list]:
    by_date: dict[str, list] = {}
    for m in re.finditer(r'"(\d{2}\.\d{2}\.\d{4})"\s*:\s*\[', obj_src):
        date = m.group(1)
        i = m.end() - 1
        depth = 0
        for j in range(i, len(obj_src)):
            c = obj_src[j]
            if c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    arr_src = obj_src[i : j + 1]
                    blobs = split_top_level_objects(arr_src)
                    by_date[date] = [parse_tournament_obj(b) for b in blobs]
                    break
    return by_date


winter_src = extract_object_after("var WINTER_RATING_TOURNAMENTS_BY_DATE =")
winter = parse_tournaments(winter_src)
spring = {}
for marker in (
    "var SPRING_RATING_TOURNAMENTS_MARCH_BY_DATE =",
    "var SPRING_RATING_TOURNAMENTS_APRIL_BY_DATE =",
):
    spring.update(parse_tournaments(extract_object_after(marker)))


def norm_nick(n: str) -> str:
    return (n or "").strip()


def consider(max_by, nick, reward, date_str, j, league, winter):
    if not reward or reward <= 0:
        return
    n = norm_nick(nick)
    if not n:
        return
    prev = max_by.get(n)
    if prev is None or reward > prev["reward"]:
        max_by[n] = {
            "nick": n,
            "reward": reward,
            "date": date_str,
            "j": j,
            "league": league,
            "winter": winter,
        }


max_by = {}

for d, lst in winter.items():
    if not re.search(r"\.2026$", d):
        continue
    for j, t in enumerate(lst):
        for p in t.get("players") or []:
            consider(max_by, p["nick"], p["reward"], d, j, None, True)

for d, lst in spring.items():
    if not re.search(r"\.2026$", d):
        continue
    l1 = l2 = 0
    for j, t in enumerate(lst):
        fl = t.get("league")
        fl = int(fl) if fl is not None else float("nan")
        bi = t.get("buyin")
        bi = float(bi) if bi == bi else float("nan")
        in1 = fl == 1 or (fl != fl and (bi >= 500 or bi != bi))
        in2 = fl == 2 or (fl != fl and 100 <= bi < 500)
        if in1 and not in2:
            ln, lb = 1, l1
            l1 += 1
        elif in2 and not in1:
            ln, lb = 2, l2
            l2 += 1
        elif in1 and in2:
            if fl == 2:
                ln, lb = 2, l2
                l2 += 1
            else:
                ln, lb = 1, l1
                l1 += 1
        else:
            ln, lb = 1, 0
        for p in t.get("players") or []:
            consider(max_by, p["nick"], p["reward"], d, lb, ln, False)

rows = sorted(max_by.values(), key=lambda r: -r["reward"])[:15]
for i, r in enumerate(rows):
    print(
        f"{i+1:2}. {r['nick']:16} {r['reward']:>12.0f}  {r['date']}  "
        f"j={r['j']} L={r['league']} winter={r['winter']}"
    )
