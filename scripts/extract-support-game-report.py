"""Read a saved club/union workbook into the existing game-report sync schema."""
import argparse
import json
import re
from pathlib import Path
from openpyxl import load_workbook

parser = argparse.ArgumentParser()
parser.add_argument('--input', required=True)
parser.add_argument('--output', required=True)
args = parser.parse_args()
source = Path(args.input)
match = re.search(r'(20\d{2}-\d{2}-\d{2})_(20\d{2}-\d{2}-\d{2})', source.name)
if match:
    start, end = match.groups()
else:
    match = re.search(r'(20\d{6})-(20\d{6})', source.name)
    if not match:
        raise ValueError('No report date range in filename')
    start, end = (f'{d[:4]}-{d[4:6]}-{d[6:]}' for d in match.groups())
book = load_workbook(source, read_only=True, data_only=True)
if 'Полные данные' in book.sheetnames:
    sheet, header_row = book['Полные данные'], 1
else:
    name = next((name for name in ['Union Member Statistics', 'Union Member Statistics(Only)'] if name in book.sheetnames), None)
    if not name:
        raise ValueError('No detailed union member sheet')
    sheet, header_row = book[name], 5
rows = sheet.iter_rows(min_row=header_row, values_only=True)
headers = list(next(rows))
players = [list(row) for row in rows if str(row[0]) in ['758417', '758417.0']]
if not players:
    raise ValueError('No Two Aces rows in this report')
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps({'startDate': start, 'endDate': end, 'headers': headers, 'clubs': [{'id': '758417', 'rows': players}]}, ensure_ascii=False, separators=(',', ':')))
print(json.dumps({'from': start, 'to': end, 'rows': len(players)}))
