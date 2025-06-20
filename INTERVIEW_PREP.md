# Interview Prep Notes

## Accessibility & Responsive Design

- **Semantic HTML5:** Use semantic elements for structure and meaning, improving accessibility, SEO, and maintainability.
- **ARIA Attributes:** Fill in accessibility gaps left by semantic HTML using ARIA attributes to clarify roles and states for assistive technologies.
- **Keyboard Navigation:** Ensure all interactive elements are accessible via keyboard, supporting tab order and focus management.
- **Testing:** Use automated tools (Axe, Lighthouse) and manual device testing to identify and resolve accessibility issues.
- **Additional Strategies:**
  - **Ensure sufficient color contrast and avoid color-only cues:** Use tools like Axe or Lighthouse to check contrast ratios. Never rely solely on color to convey information—use icons, text, or patterns as well.
  - **Manage focus programmatically:** After UI changes such as opening/closing modals, drawers, or navigating between views, set focus to the most relevant element (e.g., the first input in a modal, or a heading in a new page) using `element.focus()`. This helps keyboard and screen reader users stay oriented and improves usability. Use React refs or libraries like `focus-trap-react` to manage focus containment and restoration. Always return focus to the triggering element when closing overlays.
  - **Provide skip links and use landmark roles for easier navigation:** Add skip-to-content links at the top of the page for keyboard users. Use landmark elements (`<nav>`, `<main>`, `<aside>`, `<footer>`) and ARIA landmark roles to help screen readers navigate sections efficiently.
  - **Design touch targets for accessibility on all devices:** Ensure interactive elements (buttons, links) are at least 44x44px and have sufficient spacing to prevent accidental taps, especially on mobile.
  - **Use proper labels and error handling in forms:** Always associate `<label>` elements with form controls. Provide clear, descriptive error messages and use ARIA attributes like `aria-invalid` and `aria-describedby` for additional context.
  - **Collaborate with design and QA to integrate accessibility early:** Involve accessibility considerations from the design phase. Review wireframes and prototypes for potential issues, and include accessibility checks in QA processes to catch problems before release.

## State Management in React

- **Local State (React hooks):** Use for data that is only relevant to a single component. Keeps logic simple and encapsulated.
- **Context Providers:** Use for static or infrequently changing state that needs to be shared across a subtree. Be cautious of unnecessary re-renders, as all consumers re-render on context value change.
- **Global State Libraries (e.g., Zustand, Redux, Jotai, Recoil):** Use for complex, frequently changing, or widely shared state. Choose a library based on project needs (simplicity, performance, ecosystem, dev tools).
- **Performance Optimization:**
  - Use selector functions to subscribe only to the specific state slices a component needs, reducing unnecessary re-renders.
  - Memoize expensive computations and derived data with `useMemo` or selectors.
  - Use `React.memo` or `useCallback` to prevent unnecessary re-renders of child components and functions.
  - Split large stores into smaller, focused stores or state slices to localize updates.
  - In global state libraries, prefer shallow comparison or custom equality checks to further minimize re-renders.
  - Profile and measure performance using React DevTools and browser profiling tools to identify bottlenecks.
- **Server State vs. Client State:**
  - *Client state* refers to UI state managed entirely on the client, such as form inputs, modal visibility, and local component state. This is typically handled with React state, context, or global state libraries.
  - *Server state* is data fetched from a backend or external source (e.g., user profiles, product lists) that can change outside the client’s control. Managing server state involves fetching, caching, synchronizing, and updating remote data.
  - Use libraries like React Query, SWR, or Apollo Client to handle server state. These tools provide features like caching, background updates, optimistic updates, and automatic refetching, which reduce boilerplate and improve UX.
  - Keep client state and server state separate to avoid unnecessary complexity and bugs. Use global state only for client-side concerns, and let server state libraries manage remote data lifecycle.
  - Example: Use React Query to fetch and cache a list of items from an API, while using local state to manage which item is currently selected in the UI.
- **Testing and Debugging:**
  - Choose state management patterns that make it easy to write unit and integration tests. Local state and context are straightforward to test with React Testing Library or Enzyme.
  - For global state libraries (like Redux or Zustand), mock or provide test stores to isolate component logic in tests.
  - Use tools like Redux DevTools or Zustand Devtools to inspect state changes, time-travel, and debug issues interactively during development.
  - **Prefer pure functions and selectors for state derivation:** Pure functions are functions that always produce the same output for the same input and have no side effects. Using pure functions for state updates and selectors for deriving computed data from state makes your code more predictable, easier to test, and simpler to debug. Selectors can be unit tested in isolation, reused across components, and memoized for performance. Avoid embedding complex logic or side effects directly in components or reducers; instead, extract them into pure utility functions or selectors.
  - Write tests for reducers, actions, and selectors in global state libraries to ensure predictable state transitions.
  - For server state, use tools like MSW (Mock Service Worker) to mock API responses and test UI behavior under different data conditions.
  - Ensure error states, loading states, and edge cases are covered in tests to improve reliability and user experience.
- **Scalability and Team Collaboration:**
  - Choose state management patterns that are easy to reason about and maintain as the codebase grows.
  - Modularize state by splitting large stores or reducers into smaller, domain-focused slices or modules, making it easier to scale and onboard new team members.
  - Use clear naming conventions, documentation, and code comments to help others understand state structure and flow.
  - Prefer colocating state with the components that use it, unless it truly needs to be global, to reduce unnecessary complexity.
  - Establish and enforce best practices for state updates, side effects, and data flow (e.g., using middleware or hooks for async logic).
  - Leverage TypeScript for type safety and to catch errors early as the application and team scale.
  - Regularly review and refactor state logic to avoid technical debt and ensure the architecture remains flexible for future features.
  - Encourage code reviews and knowledge sharing to maintain consistency and quality across the team.

## React Performance Optimization Case Study

**Tools & Techniques Used to Identify Bottlenecks:**

- **Chrome DevTools Performance Profiler:** Recorded user interactions to find long scripting tasks and frequent re-renders.
- **React DevTools Profiler:** Measured component render times and identified excessive re-renders.
- **Lighthouse Audits:** Assessed metrics like TTI, FCP, and TBT for overall performance insights.
- **Bundle Analysis:** Used webpack-bundle-analyzer to inspect bundle sizes and chunk splitting.

**Bottlenecks Identified:**

- Unnecessary re-renders from new object/array literals as props.
- Heavy computations inside render methods without memoization.
- Large bundles delaying initial load.
- Inefficient data fetching causing redundant API calls.
- Rendering large tables without virtualization, causing UI lag.

**Specific Optimizations Implemented:**

- **Memoization:** Used React.memo, useMemo, and useCallback to prevent unnecessary re-renders and memoize expensive calculations.
- **Avoid Inline Object/Function Props:** Moved or memoized inline objects/functions to prevent prop identity changes.
- **Code Splitting & Lazy Loading:** Implemented React.lazy, Suspense, and route-based chunking to speed up initial load.
- **Virtualized Lists & Tables:** Used react-window to render only visible rows in large lists/tables.
- **Optimized Data Fetching:** Used React Query for request deduplication, caching, and batched API requests.
- **Improved Asset Loading:** Compressed images and added lazy loading for below-the-fold assets.

**Summary:**

- Used profiling tools to identify and measure performance issues.
- Applied memoization and code splitting to reduce re-renders and speed up load times.
- Virtualized large lists and optimized data fetching for smoother UI and less network overhead.
- Improved asset handling for faster rendering and better user experience.

## Advocacy for Accessibility & Code Quality

- **Raising Awareness:** Organized brown-bag sessions to demonstrate the real-world impact of accessibility, legal/business benefits, and common pitfalls, using concrete examples from the app.
- **Introducing Tools:** Integrated eslint-plugin-jsx-a11y for linting, axe-core for automated accessibility tests, and enforced code quality with Prettier and ESLint rules.
- **Establishing Processes:** Created an accessibility checklist for PRs, added code review guidelines, and recommended regular accessibility audits with Lighthouse or axe DevTools.
- **Collaborative Support:** Paired with team members to implement best practices and encouraged open discussions about accessibility and code quality in retrospectives.

## Frontend Testing Strategy

- **Testing Pyramid:** Emphasize a layered approach—unit tests for isolated logic, integration tests for component interactions, and end-to-end (E2E) tests for full user flows.
- **Behavior-Driven:** Write tests that focus on user behavior and outcomes, not implementation details, to ensure maintainability and real-world value.
- **Continuous Integration (CI):** Run tests automatically in CI pipelines to catch regressions early and maintain code quality.
- **Code Reviews for Tests:** Review tests as part of the PR process to ensure clarity, coverage, and alignment with requirements.
- **Refactor Tests with Code:** Update and refactor tests alongside production code changes to keep them relevant and reliable.
- **Clear Failure Reporting:** Ensure test failures provide actionable feedback for quick diagnosis and resolution.
- **Coverage Reporting:** Use coverage tools to monitor and improve test completeness, focusing on critical paths and edge cases.

## Staying Up to Date in Frontend Development

- **Authoritative Blogs & Newsletters:** Regularly read CSS-Tricks, Smashing Magazine, Frontend Focus, Overreacted, JavaScript Weekly, React Status, and Frontend Weekly for curated, up-to-date content.
- **Active Community Participation:** Engage on Twitter, Mastodon, Discord (Reactiflux), Slack, Reddit (r/reactjs, r/javascript), and GitHub to follow influencers, join discussions, and track trending projects.
- **Continuous Learning & Experimentation:** Build side projects, join hackathons, and explore official docs to gain hands-on experience with new tools and APIs.
- **Following Official Channels & RFCs:** Monitor release notes, RFCs, and talks from core contributors to stay ahead of framework and language changes.
- **Conferences & Meetups:** Attend (virtually or in-person) events like ReactConf, JSConf, and local meetups; watch recorded talks on YouTube or Frontend Masters.
- **Structured Learning Platforms:** Take courses on Udemy, Egghead.io, Frontend Masters, Pluralsight, and read books to reinforce and expand knowledge.
- **Sharing Knowledge:** Write blog posts, mentor others, participate in code reviews, and present talks or workshops to solidify and share understanding.
- **Learning Habits:** Dedicate daily time to learning, keep a backlog of topics to explore, and regularly refactor projects to apply new best practices.