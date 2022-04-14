# Shadow hunters

The project contains two server:

- the main app: 3000
- the api server: 8090

## use:

```bash
cd lbdserver-api-demo-react
```

start main app: `npm start`

start api server: `node server.js`

start **ALL**:

```
npm run all
```

## production

### create production build:

`npm run build`

### deployment in FreeBSD-**jail**:

in root mounting point:

1. `pkg install www/npm`
1. move build folder to server
1. move build-**api files** to server
1. `npm i`
1. `npm run all` -> standard start command

### terminal tweaks
#### quick intro:

in shell: |  to:
--- | ---
``tmux`` | new session
``bash tmux new <name>`` | new session with name
``tmux ls`` | list sessions
``tmux a -f <session number>`` | open session ..
``tmux a -t <session name>`` | open session ..

in session: | to:
--- | ---
``exit`` | end and close session
``ctrl+b  d`` | **close** session and keep it alive

