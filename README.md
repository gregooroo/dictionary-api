<h1 align="center">
    Dictionary API
</h1>

<details open>
    <summary>Table of Contents</summary>
    
- [1. About the project](#1-about-the-project)
- [2. Prerequisites](#2-prerequisites)
- [3. Installation](#3-installation)
- [6. License](#6-license)
- [7. Author](#7-author)
- [8. Built with](#8-built-with)

</details>

### 1. About the project

In this introduction I want to share with you my motivations behind this project. There are two main goals I want to present:

1. I believe when it comes to learning foreign languages vocabulary is an important factor, so I want to have one central place where I can store all new English vocabulary (that's the language I want to improve my skills in) I come across on a daily basis when reading articles, listening to music or watching TV. Before I decided to start this project I've tried multiple different solutions to collect all this new vocabulary, for example: spreadsheets, simple paper and pen approach, apps like Notion and so on. In all this cases I either lost a file (I know, I know... backups XD) or I didn't like a tool. Now, when I have this API I can build whatever I want (cli app, electron app, website etc.)

2. This is also a "learning project" and I want it to be part of my portfolio that I can show in my CV. Here I want to present my skills when it comes to backend side of JavaScript world. If you're curious about used technologies please check section [Build with](#8-built-with).

### 2. Prerequisites

-   Node.js (>= 14.16.0) https://nodejs.org
-   MongoDB (>= 4.4.0) https://www.mongodb.com
-   Yarn (>= 1.22.5) https://yarnpkg.com/
-   Redis (>= 6.2.0) https://redis.io/

### 3. Installation

1. Clone the repository

```sh
git clone https://gitlab.com/gregooroo/dictionary-api.git
cd ./dictionary-api
```

2. Rename .env.example file to .env and fill it with right data.

### 4. Running

#### Development

1. With "Remote Containers"

    1. I you've [Docker](https://www.docker.com/) installed on your computer and you're using [VSCode](https://code.visualstudio.com/) as your main code editor you can use extension called [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) to run this project.
    2. When you have all tools mentioned above installed and configured, open Command Pallette in VSCode (Ctrl + Shift + P) and run "Remote Containers: Reopen in Container". It will take some time on a first run but after that you'll have the exact came environment as I have.
    3. Open Integrated Terminal inside VSCode (Ctrl + \`) and start dev server by running `yarn dev`

2. Without "Remote Containers"
    1. Make sure you've installed all software mentioned in [Prerequisites](#2-prerequisites)
    2. Install project dependencies
    ```sh
    yarn install
    ```
    3. Run dev server
    ```sh
    yarn dev
    ```

#### Production

This project is not production ready yet.

### 5. Documentation

Please refer to [DOCUMENTATION](DOCUMENTATION.md) to see endpoints documentation.

### 6. License

This project is distributed under the AGPL-3.0 License. See [LICENSE](./LICENSE) for more information.

### 7. Author

-   Mateusz Gregorczyk - gregooroo@gmail.com

### 8. Built with

-   [TypeScript](https://www.typescriptlang.org/) - Syntactical superset of JavaScript and adds optional static typing to the language.
-   [Mongoose](https://mongoosejs.com/) - MongoDB ODM for Node.js
-   [Express](https://expressjs.com/) - Web framework for Node.js
-   [Node Redis](https://github.com/NodeRedis/node-redis) - A high performance Node.js Redis client.
