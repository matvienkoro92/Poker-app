#!/usr/bin/env python3
"""Decode Poker21's bulk CSV hand payload into the existing JSONL hand format."""
import argparse
import csv
import json
from pathlib import Path


# The per-session JSON export omits these transport-only action codes.
JSON_ACTIONS = {
    '2', '3', '5', '10', '17', '18', '19', '20', '30', '92', '93',
    '94', '95', '96', '97', '98', '99', '100', '111', '112',
}


def split_array(value):
    return value.split('*') if value else []


def decode(row):
    parts = row['Data'].split('|')
    if len(parts) != 7:
        raise ValueError('Expected seven packed sections')
    header = parts[0].split(',')
    if len(header) != 19:
        raise ValueError('Unexpected packed header')
    users = split_array(parts[1].split(',')[0])
    balances = parts[3].split(',')
    scores = split_array(balances[1])
    coins = split_array(balances[5])
    fees = split_array(balances[6])
    bets = split_array(balances[7])
    if not (len(users) == len(scores) == len(coins) == len(fees) == len(bets) == 10):
        raise ValueError('Expected ten player slots')
    if (row['Id'] != header[0] or row['EndTime'] != header[9]
            or row['GroupId'] != header[6]):
        raise ValueError('CSV and packed identity mismatch')
    cards = [split_array(entry) for entry in parts[4].split(',') if entry]
    actions = {}
    for entry in parts[6].split(';'):
        fields = entry.split(',')
        if len(fields) < 2 or fields[1] not in JSON_ACTIONS:
            continue
        seat, kind = fields[:2]
        if seat == '-1':
            user = '-1'
        elif seat.isdigit() and int(seat) < 10:
            user = users[int(seat)]
        else:
            raise ValueError('Invalid action seat')
        if len(fields) < 5:
            raise ValueError('Incomplete action')
        amount = int(fields[3])
        card = split_array(fields[4]) if kind == '94' and fields[4] else ''
        actions[str(len(actions))] = {
            'userId': user, 'type': kind,
            'bet': amount // 100 if amount % 100 == 0 else amount / 100,
            'card': card,
        }
    raw = {
        'Id': row['Id'], 'RecordId': row['RecordId'], 'DeskId': header[1],
        'DeskType': header[2], 'PlayMode': header[4], 'PlayType': header[3],
        'CompetitionId': header[5], 'LeagueId': row['LeagueId'],
        'GroupId': row['GroupId'], 'StartTime': str(int(header[8]) // 1000),
        'EndTime': row['EndTime'], 'CurRound': header[15], 'MaxRound': header[16],
        'fee_list': ''.join(f'{user}:{fee},' for user, fee in zip(users, fees)
                            if user != '0' and int(fee) > 0),
        'bet_list': ''.join(f'{user}:{bet},' for user, bet in zip(users, bets)
                            if user != '0' and int(bet) > 0),
        'base_data': {
            'UserIds': users, 'card': cards,
            'userCoin': {user: coins[i] for i, user in enumerate(users)},
            'opt': actions,
        },
    }
    for i, (user, score) in enumerate(zip(users, scores), 1):
        raw['UserId' + str(i)] = user
        raw['Score' + str(i)] = score
    return raw


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('destination', type=Path)
    args = parser.parse_args()
    args.destination.parent.mkdir(parents=True, exist_ok=True)
    count = 0
    with args.source.open(newline='', encoding='utf-8-sig') as source, args.destination.open('w') as destination:
        for row in csv.DictReader(source):
            try:
                raw = decode(row)
            except (ValueError, IndexError, KeyError) as error:
                raise ValueError(f"Hand {row.get('Id', '?')}: {error}") from error
            destination.write(json.dumps(raw, ensure_ascii=False, separators=(',', ':')) + '\n')
            count += 1
    print(json.dumps({'hands': count, 'destination': str(args.destination)}))


if __name__ == '__main__':
    main()
