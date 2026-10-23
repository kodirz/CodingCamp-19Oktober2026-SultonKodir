# To-Do List Life Dashboard

A simple and elegant life dashboard to help organize your day with a focus timer, to-do list, and quick links.

## 🎯 Features

### Required Features (MVP)
✅ **Greeting Section**
- Real-time clock display
- Current date display
- Dynamic greeting based on time of day (Good Morning/Afternoon/Evening/Night)

✅ **Focus Timer (Pomodoro)**
- 25-minute default timer
- Start, Stop, and Reset controls
- Visual countdown display

✅ **To-Do List**
- Add new tasks
- Edit existing tasks
- Mark tasks as complete
- Delete tasks
- Data persistence with Local Storage

✅ **Quick Links**
- Add favorite website links
- Click to open in new tab
- Remove links
- Data persistence with Local Storage

### 🌟 Challenges Implemented (3/5)

1. ✅ **Light / Dark Mode** - Toggle between light and dark themes with icon indicator
2. ✅ **Custom Name in Greeting** - Personalize greeting with your name
3. ✅ **Change Pomodoro Time** - Customize focus timer duration (1-120 minutes)
4. ✅ **Prevent Duplicate Tasks** - Alert when trying to add existing task
5. ✅ **Sort Tasks** - Sort by default order, alphabetical (A-Z), or status (incomplete/complete)

## 🛠️ Technology Stack

- **HTML** - Structure
- **CSS** - Styling with CSS Variables for theming
- **Vanilla JavaScript** - Functionality
- **Local Storage API** - Client-side data persistence

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Single CSS file
├── js/
│   └── app.js         # Single JavaScript file
└── README.md          # Documentation
```

## 🚀 How to Use

1. **Open** `index.html` in a modern browser (Chrome, Firefox, Edge, Safari)
2. **Set your name** in the greeting section for personalized experience
3. **Add tasks** to your to-do list
4. **Start the focus timer** when you need to concentrate
5. **Add quick links** to your frequently visited websites
6. **Toggle theme** using the moon/sun icon in the top-right corner

## 💾 Data Persistence

All data is stored in your browser's Local Storage:
- Tasks list
- Quick links
- User name
- Theme preference
- Timer duration

## 🎨 Features Breakdown

### Greeting Section
- Updates every second with current time
- Shows full date
- Dynamic greeting changes based on hour:
  - 5:00 - 11:59: Good Morning
  - 12:00 - 16:59: Good Afternoon
  - 17:00 - 20:59: Good Evening
  - 21:00 - 4:59: Good Night

### Focus Timer
- Customizable duration (1-120 minutes)
- Countdown display in MM:SS format
- Alert when timer completes
- Persists duration setting

### To-Do List
- Real-time add/edit/delete
- Checkbox to mark complete
- Inline editing on "Edit" button
- Duplicate prevention
- Multiple sort options
- Strike-through for completed tasks

### Quick Links
- Simple URL management
- Auto-prepends https:// if missing
- Opens in new tab
- Visual hover effects

### Theme Toggle
- Light and dark mode support
- Smooth transitions
- Icon changes (🌙/☀️)
- Persists preference

## 🌐 Browser Compatibility

Works on all modern browsers:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## 📝 Notes

- No backend server required
- No external dependencies
- No frameworks (React, Vue, etc.)
- 100% client-side application
- Can be used offline after first load

## 👨‍💻 Development

This project follows the technical constraints:
- TC-1: HTML, CSS, Vanilla JavaScript only
- TC-2: Local Storage for data persistence
- TC-3: Cross-browser compatible
- NFR-1: Simple, minimal, clean interface
- NFR-2: Fast and responsive
- NFR-3: User-friendly design with clear hierarchy

## 📦 Deployment

To deploy on GitHub Pages:
1. Push code to GitHub repository
2. Go to repository Settings
3. Navigate to Pages section
4. Select main branch as source
5. Save and wait for deployment

## 🎓 Project Info

Created for AWS Coding Camp CCSE Course
- Batch: 24 August 2026
- Duration: 5-day software engineering course
- Focus: Building web applications from start to finish

---

Made with ❤️ using Kiro AI
