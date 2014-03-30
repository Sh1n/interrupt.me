import sys
import csv
import json

CATEGORIES = {
    1: 'health',
    2: 'social',
    3: 'fun'
}

POUZES_TO_IGNORE = ['1.8', '1.10', '2.9', '3.16']

def main():
    if len(sys.argv) != 2:
        print "wrong number of arguments"
        print "usage: %s %s" % (sys.argv[0], '{tsv file with data}')
        sys.exit(1)

    client_data = {}
    server_data = []
    with open(sys.argv[1]) as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            pouz_id, title, descr1, descr2, descr3, hours_from, hours_to, days = row[:8]
            # print pouz_id, title, descr1, descr2, descr3, hours_from, hours_to, days
            if pouz_id not in POUZES_TO_IGNORE:
                category_number, number = map(int, pouz_id.split('.'))
                category = CATEGORIES[category_number]

                client_data[pouz_id] = {
                    'category': category,
                    'title': title,
                    'descriptions': [descr1, descr2, descr3],
                    'picture': 'img/pouz_icons/%d-%s.png' % (category_number, str(number).rjust(2, '0'))
                }

                server_data.append({
                    'label': pouz_id,
                    'time': {
                        'from': int(hours_from),
                        'to': int(hours_to)
                    },
                    'days': days
                })
    # print client data
    print json.dumps(client_data, indent=4, sort_keys=True)
    # print server data
    # print json.dumps(server_data, indent=4, sort_keys=True)


if __name__ == '__main__':
    main()