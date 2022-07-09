# Teeworlds Masterserver Overview Page

Simple overview page to run as a website on the masterserver to show servers hosted on it.  
The corresponding data is provided by api.status.tw.

## Requirements
- Node.js 16+

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
npm install
```

### Run preview
```
npm run preview
```

### Run dev server
```
npm run dev
```

### Run production build
```
npm run build
```
