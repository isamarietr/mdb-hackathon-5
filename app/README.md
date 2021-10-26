# UI 


## Setup

Copy `sample.env.local` to `.env` to make this configuration accessible to client and/or server-side code.

Install dependencies
```
npm i
```

## Development

Start the server in development mode with hot-code reloading.

```bash
npm run dev
```

## Production 

Start the application in production mode. 

```bash
npm start
```
_The default Next.js `start` script has been updated to first build the application._

## Notes

In both development and production the application will start at http://localhost:3000 by default. The default port can be changed with `-p` in the `dev` and `start:prod` scripts in `package.json`, like:
```bash
...
"scripts": {
    "dev": "next -p 4000",
    ...
    "start:prod": "next start -p 4000",
    ...
  }
...
```
