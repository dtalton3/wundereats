## Release Notes: GrubTrak v1.0
### New Features 
- Successful registration/login to application with their credentials
- Create new hatcheries and have them display on hatchery dashboard 
- Created hatcheries can be edited or deleted
- Navigation panels all route to their respective pages
- Impact report generates using hatchery data from existing user hatcheries
- Impact report downloads to user’s system; can be printed/shared

### Bug Fixes
- Fixed layout formatting problems
- Fixed issue where a new user was not able to login after creating an account
- Fixed issue where backend was not retrieving hatchery data for impact report generation
-	Fixed bug where impact reports would download all at once when reloading the page
-	Fixed bug where clicking ‘edit hatchery’ and filling out the form would actually just create a new hatchery instead of updating the existing one

### Known Bugs
- The My Hatcheries and Impact Report pages do not update in real time. 
  - The user must click “refresh/reload hatcheries” whenever they create, edit, delete, or want to generate an impact report
- When editing a hatchery that is not the most recently created, the pop-up window is blocked by some of the elements on the hatchery dashboard

## Installation Guide
### Prerequisites to Install
- Node Package Manager: https://node.js.org/en/download/
- Virtual Studio Code(VScode) Installation: https://code.visualstudio.com/download
- VScode extensions (accessible inside VScode)
    - Azure Tools
    - Azure Account
	- Azure Resources
	- (may have to restart VScode after installing)
### Recommended Installs
- GitBash: https://git-scm.com/downloads
### Dependent Libraries to Install
- Jspdf: https://www.npmjs.com/package/jspdf
- QuickChart: https://quickchart.io/documentation/ 
- React: https://reactjs.org/docs/getting-started.html
- Node.js/Express: https://nodejs.org/en/download/

### Download Instructions
- Navigate to the GrubTrak repo: https://github.com/dtalton3/wundereats 
- Select the green ‘Code’ button
- Download zip file

### Installation of Application
- Navigate to the location of your downloaded zip file
- Open and extract the zip file to reveal the project folder
- Open your command line terminal or GitBash
- Navigate to the backend directory by running `cd ~/wundereats/backend`
    - `~` refers to any folders/directories that hold the project folder
    - Run the command `npm install`
- Navigate back to the project root folder, `~/wundereats`, by running `cd ..` in the terminal
- Run the command `cd grubtrak` to get to the app directory, `~/wundereats/grubtrak`
    - Run the command `npm install`
   
### Run Instruction 
- Launching backend: 
    - Navigate to backend by running `cd ~/wundereats/backend` in the terminal
    - Type `npm start`
    - wait for console to say 'connected to server'
- Launching app: 
    - Open a different command line terminal or GitBash   
    - Navigate to app by running `cd ~/wundereats/grubtrak` in the terminal
    - Type `npm start`
    - app will eventually launch in browser window at `localhost:3000`
### Troubleshooting
- Make sure you are in ‘wundereats/backend’ and not ‘wundereats/grubtrak/backend’ when launching backend
- Run `npm install` before `npm start`
    - this applies to both backend and app
