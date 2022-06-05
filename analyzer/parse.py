import json
import os
import csv
import re

features = [
    'exec_functions',
    'write_functions',
    'params_length',
    'params_danger',
    'page_redirections',
    'script_redirections',
    'iframe_redirections',
    'files_got_size',
    'files_got_num',
    'failed_http_res',
    'https_protos',
    'url_avg_len',
    'http_redirect_len'
]

danger_params = [
    'iframe',
    'script',
    'frame',
    'embed',
    'link',
    'applet',
    'object'
]


def check_if_danger(s: str):
    count = 0
    ls = s.lower()
    for danger in danger_params:
        if danger in ls:
            count += 1
    return count


def get_num_and_size(start_path):
    total_num = 0
    total_size = 0

    for dir_path, dir_names, file_names in os.walk(start_path):
        if 'image' in dir_path or 'analysis' in dir_path:
            continue
        for fn in file_names:
            fp = os.path.join(dir_path, fn)
            if not os.path.islink(fp):
                total_num += 1
                total_size += os.path.getsize(fp)

    return total_num, total_size


def get_feature_vec(analyzed_jsons):
    vec = dict(zip(features, [0 for _ in features]))
    url_count = 0
    for analyzed_json in analyzed_jsons['behavior']:
        s: str = analyzed_json['description']
        # print(s)
        if not s.startswith('['):
            continue
        if s.startswith('[eval]'):
            vec['exec_functions'] += 1
            arg = re.compile(r'Deobfuscated\sargument:\s(.*)').findall(s)
            if len(arg) > 0:
                vec['params_length'] += len(arg[0])
                vec['params_danger'] += check_if_danger(arg[0])

        if s.startswith('[document.write]'):
            vec['write_functions'] += 1
            arg = re.compile(r'Deobfuscated\sargument:\s(.*)').findall(s)
            if len(arg) > 0:
                vec['params_length'] += len(arg[0])
                vec['params_danger'] += check_if_danger(arg[0])

        if s.startswith('[HTTP]'):
            stat = re.compile(r'\(Status:\s(\d+?),').findall(s)
            if len(stat) == 0:
                continue

            url = re.compile(r'URL:\s(\S+?)\s').findall(s)
            if len(url) > 0:
                url_count += 1
                vec['url_avg_len'] += len(url[0])
            if len(url) > 0 and url[0].startswith('https://'):
                vec['https_protos'] += 1
            if len(stat) > 0 and (stat[0].startswith('4') or stat[0].startswith('5')):
                vec['failed_http_res'] += 1

        if s.startswith('[script src redirection]'):
            vec['script_redirections'] += 1
        elif s.startswith('[iframe redirection]'):
            vec['iframe_redirections'] += 1
        elif s.startswith('[HTTP Redirection'):
            vec['http_redirect_len'] += (len(s.split('-->')) - 1)
        else:
            if 'redirection' in s.lower():
                vec['page_redirections'] += 1

    if url_count != 0:
        vec['url_avg_len'] /= url_count
    return vec


if __name__ == '__main__':
    pairs = []
    with open('logs/thug.csv', 'r') as f:
        table = csv.reader(f)
        for row in table:
            pairs.append((row[1], row[0]))

    print(pairs)
    result = []
    for pair in pairs:
        d = os.path.join('logs', pair[1])
        dirs = sorted(os.listdir(d), reverse=True)
        d = os.path.join(d, dirs[0])

        with open(d + '/analysis/json/analysis.json', 'r') as f:
            analyzed = json.load(f)
            analyzed = get_feature_vec(analyzed)

            analyzed['files_got_num'], analyzed['files_got_size'] = get_num_and_size(d)
            analyzed = {
                'target': pair[0],
                'label': 1 if pair[0].startswith('/') else 0,
                'features': analyzed
            }
            result.append(analyzed)
            print(analyzed)

    result = json.dumps(result)
    with open('results/result.json', 'w') as f:
        f.write(result)
