# Fillout Engineering Assessment

## Project Overview

This repository contains my solution for the Fillout Engineering Assessment. The project is a React-based page navigation editor component that allows users to manage, reorder, and customize pages in a web application interface.

This project has been deployed here: https://fillout-assessment.fred-e6e.workers.dev

## Core Functionality

The Page Navigation Editor includes the following features:

- **Interactive Page Management**: Add, rename, and delete pages
- **Drag-and-Drop Reordering**: Rearrange pages using intuitive drag-and-drop functionality
- **Context Menu Actions**: Access page-specific actions through a context menu
- **Visual Feedback**: Clear visual cues for active, dragging, and new states
- **Smooth Animations**: Motion animations for improved user experience

## Technical Implementation

### Architecture

The project follows a modern React architecture using:

- **React 19**: Leveraging the latest React features and optimizations
- **TypeScript**: Full type safety throughout the codebase
- **Zustand**: Lightweight state management with selectors pattern
- **CSS Modules**: Component-scoped styling with PostCSS
- **Motion Library**: Animation framework for smooth transitions
- **DnD Kit**: Accessible drag-and-drop functionality

### Code Organization

The codebase demonstrates several best practices:

- **Component Composition**: Separation of concerns with focused components
- **Custom Hooks**: Logic extraction into reusable hooks
- **State Selectors**: Optimized state access with selector functions
- **Memoization**: Performance optimization with React.memo, useMemo, and useCallback
- **Sanitization**: Security measures for user inputs

## Development Approach

My development approach focused on:

1. **Performance**: Optimized rendering with proper memoization and state management
2. **Maintainability**: Clean code architecture with clear separation of concerns
3. **Accessibility**: Progressive improvements for keyboard navigation and screen readers
4. **Type Safety**: Comprehensive TypeScript usage to prevent runtime errors
5. **User Experience**: Smooth animations and intuitive interactions

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory: `cd fillout-assessment`
3. Install dependencies: `npm install` or `yarn`

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Future Improvements

Given additional time, I would enhance the project with:

- Complete ARIA attributes implementation for improved accessibility
- Fully functional context menu actions 
- Comprehensive test coverage
- Enhanced keyboard navigation
- More responsive design for various screen sizes

## Conclusion

This assessment demonstrates my approach to building interactive UI components with modern React practices. The implementation showcases my focus on code quality, performance optimization, and maintainable architecture.
