# React + Vite
# This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project features
- Real-time weather data based on user's geolocation
- Clothing suggestions taiored to the current weather
- Add clothing items via a modal form
- View items details in  a dedicated modal
- Responsive layout and intuitive UI
- Built using Vite for fast development and hot module reloading

## Project Notes
- Weather data is fetched from a public API
- Clothing items are filtered by temperature thresholds
- All clothing items are displayed in a scrollable card layout
- React hooks are used for state and side effects
- Modal visibility is managed via centralized state (activeModal or isOpen flags) 

## Project description
- Retrieves the user's current weather conditions
- Displays a curated list of clothing options suitable for those conditions
- Allows users to add their own items via a modal with a simple form
- Enables users to click any item it in detail within another modal

## Plan on imporving the project
- Add validation for incorrect use of textbox
- Support manual location search in addition to geolocation
- Improve mobile responsiveness and performance

### WTWR home page
- Displays the current temperature and weather conditions
- Highlights relevant clothing options with images and labels
- Responsive card layout with scrollable container
- Includes a button to open the Add Clothing modal

### Modals 
- Triggered by clicking on a card or the "+ Add Clothes" button
- Clicking on clothes enhances the image with description
- Clicking on "+ Add Clothes" brings up a form with "Name, Image URL, Weather Type.

### System Requirements
- Node.js
- npm or yarn
- Modern web browser
- Internet connection

### GitHub 
"https://RolanBykovIT1025.github.io/se_project_react"

Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



