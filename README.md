# Info_sec-BC_malice_url_detect

Install:

+ global:
    ```shell
    sudo apt install docker.io
    docker pull remnux/thug
    ```
    The python 3.8+ and the nodejs 16.14+ are also needed.

+ in `./BC`:

    ```shell
    npm install
    sudo npm install ganache -g
    ```

+ in `./analyzer`:

    ```shell
    pip3 install sklearn
    ```

Usage:
```shell
ganache-cli
cd BC
node monitor.js
node attacker.js
cd ../analyzer
sudo ruby analyse.rb [-f] [local file path] [-u] [url] [-l] [log path]
python3 parse.py
python3 classify.py
```
