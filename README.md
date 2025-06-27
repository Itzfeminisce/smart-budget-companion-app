
# Smart Budget Tracker 💰

A modern, responsive web application for personal finance management built with React, TypeScript, and Tailwind CSS. Track your income and expenses, visualize your spending patterns, and maintain better financial health.

## 🌐 Live Demo

Visit the live application: [https://react-budget-tracker-app.vercel.app/](https://react-budget-tracker-app.vercel.app/)

## ✨ Features

### 📊 Dashboard
- **Financial Overview**: View total balance, income, expenses, and transaction count at a glance
- **Interactive Charts**: 
  - Pie chart showing spending breakdown by category
  - Bar chart displaying 7-day income vs expense trends
- **Real-time Updates**: All statistics update automatically as you add transactions

### 💸 Transaction Management
- **Add Transactions**: Easy form to record income and expenses
- **Categorization**: Pre-defined categories for better organization
- **Transaction History**: Complete list of all your financial activities
- **Edit & Delete**: Modify or remove transactions as needed

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clean, modern interface with easy-to-use navigation
- **Data Persistence**: All data is stored locally in your browser
- **Real-time Charts**: Dynamic visualizations using Recharts library

## 🛠️ Technologies Used

### Frontend Framework
- **[React 18](https://react.dev/)** - Modern UI library with hooks and functional components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for better development experience
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Modern icon library

### State Management & Data
- **[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)** - Lightweight state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation

### Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library for React
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality checks
- **[Class Variance Authority](https://cva.style/)** - Type-safe component variants

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── Dashboard.tsx   # Main dashboard with charts
│   ├── Layout.tsx      # App layout and navigation
│   ├── TransactionForm.tsx    # Add/edit transaction form
│   └── TransactionsList.tsx   # Transaction history display
├── stores/             # Zustand state management
│   ├── useTransactionsStore.ts # Transaction data and operations
│   └── useCategoriesStore.ts   # Category management
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── pages/              # Route components
│   └── Index.tsx       # Main application page
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
└── hooks/              # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd smart-budget-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist/` directory.

## 📖 How to Use

### Adding Transactions
1. Click on "Add Transaction" in the navigation
2. Fill in the transaction details:
   - Title (e.g., "Grocery Shopping")
   - Amount (positive number)
   - Category (select from dropdown)
   - Type (Income or Expense)
   - Date (defaults to today)
3. Click "Add Transaction" to save

### Viewing Dashboard
- The dashboard automatically updates with your transaction data
- View your financial overview in the stat cards
- Analyze spending patterns with the category pie chart
- Track daily trends with the 7-day bar chart

### Managing Transactions
- Navigate to "Transactions" to view all your records
- Use the search and filter options to find specific transactions
- Edit or delete transactions as needed

## 🎨 Design System

The application uses a consistent design system built with:

- **Color Palette**: Professional blue and gray tones with semantic colors for income (green) and expenses (red)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable UI components following design system principles
- **Responsive**: Mobile-first approach with breakpoints for tablet and desktop

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. All data is stored locally using browser's localStorage.

### Customization
- **Categories**: Modify default categories in `src/stores/useCategoriesStore.ts`
- **Colors**: Update color scheme in `src/index.css` and `tailwind.config.ts`
- **Sample Data**: Adjust initial sample data in `src/pages/Index.tsx`

## 📚 Learning Resources

This project demonstrates modern React development practices:

- **State Management**: Learn Zustand for simple, effective state management
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Creating interactive charts with Recharts
- **TypeScript**: Type-safe development with proper interfaces
- **Component Design**: Building reusable, accessible components
- **Responsive Design**: Mobile-first CSS with Tailwind

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-username/smart-budget-tracker/issues) page
2. Create a new issue with detailed information
3. Refer to the documentation of the technologies used

## 🔮 Future Enhancements

Potential features for future development:
- Data export/import functionality
- Budget goals and alerts
- Multiple account support
- Cloud synchronization
- Advanced reporting and analytics
- Receipt photo attachment
- Recurring transaction templates

---

Built with ❤️ using modern web technologies. Happy budgeting! 🎯