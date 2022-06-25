# Teeworlds Masterserver Overview Page

Simple overview page to run as a website on the masterserver to show servers hosted on it.  
The corresponding data is provided by api.status.tw.

## Setup
Create an .env file and add the values as described
```dotenv
VITE_MASTER=masterX.teeworlds.com       # hostname of the masterserver
VITE_HOSTER=status.tw                   # hoster of this masterserver
```

## Run
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
