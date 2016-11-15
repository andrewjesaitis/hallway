#! /usr/bin/env python3

if __name__ == '__main__':
    option_template = "  - option_name: {}\n    value: {}\n"

    with open('.ebextensions/env.config', 'w') as envfile:
        envfile.write('option_settings:\n')
        with open('secrets.env', 'r') as f:
            for line in f.readlines():
                line = line.strip()
                if not line: continue
                key, val = line.split('=')
                envfile.write(option_template.format(key, val))
