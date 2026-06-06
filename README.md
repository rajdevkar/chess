# Chess Tournament Arena
A modern, responsive Chess Tournament List built with Next.js (App Router), TypeScript, and Tailwind CSS.

**Live Demo:** https://chess.rajdevkar.dev/

## Key Decisions
### 1. Data Layer: Next.js Route Handlers vs. Direct JSON
Instead of importing the raw dummy JSON file directly into the components, I chose to expose the data via Next.js Route Handlers (`/api/tournaments`).

* **Why:** In a real-world production application, decoupling the data layer from frontend component logic is vital. Mocking the API route handler mirrors a real production setup where data is fetched asynchronously over the wire. This approach allowed me to build realistic states (loading, disabled, empty) around network boundaries.

### 2. UI/UX Architecture
Since I didn't have strict design mockups, I aimed for a clean, Linear-inspired dashboard design. The goal was to make everything readable at a glance and foolproof to use.

* **Clear Visuals:** Bolded tournament names and color-coded badges (e.g., Green for Upcoming, Yellow for Live) make the list super easy to scan.
* **Quick Navigation:** Added real-time search, a global status filter, and distinct icons for Blitz, Rapid, and Classical matches so players can find games instantly.
* **Smart Buttons:** The primary action button is state-aware. Clicking "Join" triggers a confirmation modal to prevent accidental entries, and if an arena is full, the button visually updates and shows a "not-allowed" cursor on hover.

## Setup Instructions

Follow these steps to configure and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/rajdevkar/chess.git
cd chess
```

### 2. Install Dependencies
```bash
npm install
# or yarn install
```

### 3. Configure Environment Variables
Create a .env.local file in the root directory of your project to manage the base API loop:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
# or yarn dev
```
Open http://localhost:3000 in your browser to view the application.

### 5. Build for Production
To test production minification, type-safety validation, and serverless bundling compilation, execute:
```bash
npm run build
# or yarn build
```