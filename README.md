# Shadow hunters
The project contains two server:

- the main app: 3000
- the api server: 8090

## Manual:
### Installation:

- download the repository files
- move the **build_api** folder into another source folder
- install packages inside **both folders**: `npm i`
- start api server: `node server.js`
- start main app: `npm start`

### Functionalities:
#### Slidertab:
Let's you change simulation settings: date of the year, start and end hour of the simulation, location, angle offset of your model to the South and interval between shadows. 

If you don't know the exact location, you can open the pop-up window and search in our database, you are free to add extra cities to our database.

You can both upload an .gltf or .glb model or paste the url to your own repository or solid pod. 

A **live change** toggle lets you change the settings without live change in the viewport.

#### Viewport:
This is, a this point in the project, more of a preview feature to approve the settings. 

#### Export speeddial:
Your scene setup can be exported to an image, which donwloads your viewport as a png. Your main focus is probably to create a beautiful, presention-ready document, therefore you get the possibility to export the whole scene, inclusive lights positions, as a gltf, localy or upload is to an adress. The last option is currently under development and only creates POST requests without authentification settings. (was tested on a solid pod)

The **resources** folder contains a blender test file with a cell-shading texture if you want to experiment.

## production

### create production build:

`npm run build`

### deployment in FreeBSD-**jail**:

in root mounting point:

1. `pkg install www/npm`
1. move build folder to server
1. move **build-api** folder in a second folder
1. `npm i` inside the buil-api folder
1. `node server` in buil-api folder
1. `serve` in WebUI folder

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

## Further improvement en research
- a blender server to bake a cell-shading based texture onto the mesh
- a solid pod identification system with file explorer
- openlayer-map implementation in the location finder to pick and visualise database
