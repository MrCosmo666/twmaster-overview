# Teeworlds Masterserver Overview Page

Simple overview page to run as a website on the masterserver to show all teeworlds servers.  
The corresponding data is provided by api.status.tw.

2024: Due to changes to the status.tw API and the lack of distribution of Teeworlds servers on the master servers, this page will now show all Teeworlds servers.

## Requirements
- Node.js 20+

## Setup
Create an .env file and add the values as described
```dotenv
VITE_MASTER=masterX.teeworlds.com               # hostname of the masterserver
VITE_HOSTER_NAME=status.tw                      # name of the hoster of this masterserver
VITE_HOSTER_URL=https://status.tw               # url to the website/server of the hoster
```

## Run
### Install
```
pnpm install
```

### Run preview
```
pnpm run preview
```

### Run dev server
```
pnpm run dev
```

### Run production build
```
pnpm run build
```
