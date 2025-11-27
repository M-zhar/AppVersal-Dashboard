# Team Pulse Dashboard

A fully responsive productivity dashboard built with **React (Vite)**, **Redux Toolkit**,  
**Tailwind CSS**, **Recharts**, and **LocalStorage persistence**.

This project provides **role-based views** (Team Lead & Team Member),  
**dark/light theme**, **smooth toggle**, **charts**, **task management**, and  
**status tracking**, all without any backend (100% client-side).

---

##  Features

###  Role-Based System
- **Team Lead View**
  - View list of all team members
  - Monitor their status (Working / Meeting / Break / Offline)
  - Assign tasks
  - View pie chart of team status distribution
  - View bar chart of active tasks per member

- **Team Member View**
  - Update personal status (Working / Break / Meeting / Offline)
  - View and update assigned tasks
  - Change progress in steps of 10% until 100%

---

##  Dark / Light Theme
- Smooth toggle UI
- Fully Tailwind-powered (`darkMode: "class"`)
- Auto-applying theme on page load
- Saves theme in `localStorage`

---

##  Charts (Recharts)
### Included:
- **Pie Chart** → Status Distribution
- **Bar Chart** → Active Tasks Per Member

Both charts auto-update based on Redux state.

---

## State Management (Redux Toolkit)
- `membersSlice` → status + tasks  
- `roleSlice` → current role + active user  
- `themeSlice` → dark/light theme (persisted)

All slices persist automatically using `localStorage`.

---

## 🗂 Folder Structure




