# Technical Documentation

## Architecture Overview

This is a client-side single-page application (SPA) built with vanilla web technologies. No build tools or bundlers required.

### File Structure
```
camp/
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # All styles (light/dark themes)
├── js/
│   └── app.js             # All JavaScript functionality
├── .kiro/
│   ├── constraints.md      # Project constraints
│   ├── features.md         # Features documentation
│   ├── testing-checklist.md # Testing guide
│   └── technical-documentation.md # This file
├── .gitignore             # Git ignore rules
├── README.md              # User documentation
└── DEPLOYMENT.md          # Deployment guide
```

## Technology Stack

### HTML5
- Semantic markup
- Accessibility considerations
- Form elements for user input

### CSS3
- CSS Variables for theming
- Flexbox and Grid layouts
- Transitions and animations
- Media queries for responsiveness
- Custom scrollbar styling

### Vanilla JavaScript (ES6+)
- No frameworks or libraries
- Modern JavaScript features:
  - Arrow functions
  - Template literals
  - Array methods (map, filter, find, some)
  - Destructuring
  - Spread operator
  - LocalStorage API

## Data Storage Architecture

### Local Storage Keys
```javascript
localStorage.setItem('theme', 'light' | 'dark')
localStorage.setItem('userName', 'string')
localStorage.setItem('timerDuration', 'number')
localStorage.setItem('tasks', 'JSON string')
localStorage.setItem('quickLinks', 'JSON string')
```

### Data Structures

#### Task Object
```javascript
{
  id: number,           // Timestamp-based unique ID
  text: string,         // Task description
  completed: boolean,   // Completion status
  createdAt: number     // Timestamp for default sorting
}
```

#### Link Object
```javascript
{
  id: number,      // Timestamp-based unique ID
  name: string,    // Display name
  url: string      // Full URL with protocol
}
```

## Component Breakdown

### 1. Theme Management
**Location**: Lines 1-20 in app.js

**Features**:
- Toggle between light/dark themes
- CSS custom properties for theming
- Icon updates (🌙/☀️)
- Persistence via Local Storage

**Key Functions**:
- `initTheme()` - Load saved theme on page load
- `toggleTheme()` - Switch between themes
- `updateThemeIcon()` - Update button icon

### 2. Greeting Section
**Location**: Lines 22-85 in app.js

**Features**:
- Real-time clock (HH:MM:SS)
- Current date display
- Time-based greeting
- Custom name support

**Key Functions**:
- `updateDateTime()` - Update time every second
- `loadUserName()` - Load saved name
- `saveUserName()` - Save custom name
- `displayUserGreeting()` - Show personalized greeting

**Time Ranges**:
- 05:00-11:59: Good Morning
- 12:00-16:59: Good Afternoon
- 17:00-20:59: Good Evening
- 21:00-04:59: Good Night

### 3. Focus Timer
**Location**: Lines 87-157 in app.js

**Features**:
- Customizable duration (1-120 minutes)
- Start/Stop/Reset controls
- Countdown display
- Alert on completion
- Duration persistence

**Key Functions**:
- `loadTimerDuration()` - Load saved duration
- `setTimerDuration()` - Apply custom duration
- `updateTimerDisplay()` - Update MM:SS display
- `startTimer()` - Begin countdown
- `stopTimer()` - Pause countdown
- `resetTimer()` - Reset to set duration

**Timer Logic**:
```javascript
// Interval runs every 1000ms (1 second)
timerInterval = setInterval(() => {
  if (timerSeconds > 0) {
    timerSeconds--;
    updateTimerDisplay();
  } else {
    stopTimer();
    alert('Focus timer completed!');
  }
}, 1000);
```

### 4. To-Do List
**Location**: Lines 159-323 in app.js

**Features**:
- Add tasks
- Edit tasks (inline)
- Mark complete/incomplete
- Delete tasks
- Duplicate prevention
- Multiple sort options
- Data persistence

**Key Functions**:
- `loadTasks()` - Load from Local Storage
- `saveTasks()` - Save to Local Storage
- `addTask()` - Add new task with duplicate check
- `deleteTask()` - Remove task
- `toggleTaskComplete()` - Toggle completion status
- `editTask()` - Enable inline editing
- `getSortedTasks()` - Sort tasks by criteria
- `renderTasks()` - Display tasks in DOM

**Duplicate Prevention**:
```javascript
const isDuplicate = tasks.some(task => 
  task.text.toLowerCase() === taskText.toLowerCase()
);
```

**Sort Options**:
1. **Default**: By creation time (oldest first)
2. **Alphabetical**: A-Z by task text
3. **Status**: Incomplete first, completed last

### 5. Quick Links
**Location**: Lines 325-398 in app.js

**Features**:
- Add links with name and URL
- Auto-prepend https://
- Open in new tab
- Remove links
- Data persistence

**Key Functions**:
- `loadLinks()` - Load from Local Storage
- `saveLinks()` - Save to Local Storage
- `addLink()` - Add new link with URL validation
- `deleteLink()` - Remove link
- `openLink()` - Open URL in new tab
- `renderLinks()` - Display links in DOM

**URL Validation**:
```javascript
let finalUrl = url;
if (!url.startsWith('http://') && !url.startsWith('https://')) {
  finalUrl = 'https://' + url;
}
```

## CSS Architecture

### CSS Variables (Custom Properties)
Defined in `:root` for light theme and `[data-theme="dark"]` for dark theme:

```css
:root {
  --bg-primary: #f5f7fa;
  --bg-secondary: #ffffff;
  --text-primary: #2d3748;
  --accent: #667eea;
  /* ... more variables */
}
```

### Layout Strategy
1. **Mobile-first approach** with media queries
2. **CSS Grid** for main content layout
3. **Flexbox** for component layouts
4. **Fixed positioning** for theme toggle

### Responsive Breakpoints
- Desktop: Default (> 768px)
- Mobile: 768px and below

## Performance Considerations

### Optimizations
1. **Debounced DOM updates** - Only re-render when data changes
2. **Event delegation** - Efficient event handling
3. **CSS transitions** - Hardware-accelerated animations
4. **Minimal repaints** - Batch DOM updates

### Potential Bottlenecks
1. **Large task lists** (100+ items) - Consider virtualization
2. **Frequent localStorage writes** - Already optimized to write only on changes
3. **Timer accuracy** - JavaScript timers not perfect, acceptable for this use case

## Browser Compatibility

### Supported Features
- ✅ CSS Grid (all modern browsers)
- ✅ CSS Custom Properties (all modern browsers)
- ✅ ES6+ JavaScript (all modern browsers)
- ✅ Local Storage API (all modern browsers)
- ✅ Template literals (all modern browsers)

### Tested Browsers
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

### Fallbacks
Not implemented as all target browsers support required features.

## Security Considerations

### XSS Prevention
- User input sanitized via `textContent` (not `innerHTML`)
- URL validation before opening links

### Data Privacy
- All data stored locally (no server)
- No external API calls
- No tracking or analytics

### Limitations
- Local Storage can be cleared by user
- Not suitable for sensitive data
- No encryption

## Future Enhancements

Potential features for v2:
1. Task categories/tags
2. Task priorities
3. Task due dates
4. Export/import functionality
5. Multiple timer presets
6. Statistics and analytics
7. Keyboard shortcuts
8. Drag-and-drop reordering
9. Task search/filter
10. Background images

## Known Issues

None currently identified. All features working as expected.

## Version History

### v1.0.0 (October 21, 2026)
- Initial release
- All MVP features implemented
- 5/5 challenges completed
- Full documentation

---

**Developed with**: Kiro AI  
**Project Type**: Educational  
**License**: Free to use and modify
