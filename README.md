This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

DEMO - [Click here](https://evolent-assignment.now.sh)

## Folder Structure
```bash
├── README.md - This file.
├── package.json
├── package-lock.json
├── public
│   └── index.html
└── src
    ├── actions
    │   └── index.js # actions to add/edit/fetch/delete contacts
    │   └── types.js # action type constants
    ├── reducers
    │   └── index.js # to combine multiple reducers.
    │   └── contacts.js # reducers for contact actions like add/delete/edit/fetch etc..
    │   └── request.js # reducers for request action like start/success/fail.
    ├── components
    |   ├── contact-list.jsx # contains add button and contact list
    │   ├── add-edit-contact.jsx # common form component to add and edit contact
    │   └── header.jsx # containing header jsx
    │   └── main.jsx # parent component containing header and contact-list component
    │   └── modal.jsx # common modal component used for add and edit form
    │   └── spinner.jsx # common component used for showing spinner and full screen overlay
    │   └── toaster.jsx # common component used for showing toaster 
    ├── constants
    |   ├── index.jsx # contains all string constants
    ├── styles
    |   ├── index.css # root style file contains all style files
    |   ├── header.css # header styles
    |   ├── contacts.css # contact list styles
    |   ├── toaster.css # toaster styles
    |   ├── spinner.css # spinner styles
    |   ├── modal.css # modal styles
    ├── tests
    |   ├── action-creators.test.js # contains test cases for action creators
    |   ├── main.test.js # contains test case inital rendering
    |   ├── reducer.test.js # contains test cases for reducer
    ├── index.js # Root of app.

```