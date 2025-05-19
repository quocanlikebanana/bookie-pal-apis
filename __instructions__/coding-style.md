# Coding Style Guide

## Features

The application follows a feature-based architecture where each major feature has its own directory within the `features/` folder. Each feature has a consistent internal structure to organize related code.

### Features Folder Structure

```
features/
  booking/                   // Booking feature
    apis/                    // API integration for booking
    hooks/                   // Custom React hooks for booking functionality
    stores/                  // State management for booking
    types/                   // TypeScript type definitions for booking
  profile/                   // User profile feature
    apis/                    // API integration for profiles
    stores/                  // State management for profiles
    types/                   // TypeScript type definitions for profiles
```

### Feature Organization Principles

- Each feature is isolated and contains its own API calls, state management, and types
- Features should be as self-contained as possible
- Shared logic between features should be elevated to the app-level utilities
- Features can be composed of reusable components from the components/ directory

## Pages and Routing (react-router)

The application uses React Router for navigation and follows a specific folder structure that aligns with the routing pattern.

### Folder Structure Pattern

The project follows a feature-based approach for page organization:

```
pages/
  layout.tsx                 // Main application layout wrapper
  auth/                      // Authentication related pages
    layout.tsx               // Layout for auth pages
    login/
      page.tsx               // Login page component
    register/
      page.tsx               // Registration page component
  stores/                    // Store related pages
    index/                   // Main stores listing page
      page.tsx
      components/            // Components specific to stores listing
    [id]/                    // Dynamic route for specific store
      layout.tsx             // Layout for store pages
      index/                 // Store details page
        page.tsx
        components/          // Components specific to store details
      booking/               // Booking flow for a specific store
        page.tsx
        components/          // Components for booking workflow
        context/             // Context providers for booking state
```

### Routing Convention

Routes are defined in `Router.tsx` and path constants are stored in `paths.ts`. The routing structure follows a nested pattern:

1. All routes are contained within a main `Layout` component
2. Features have their own layout components (e.g., `AuthLayout`, `StoreLayout`)
3. Dynamic routes use the pattern `[paramName]` in folder names
4. Sub-routes are nested within their parent route in the router configuration

### Current Routes

- `/` - Root route (redirects to stores)
- `/stores` - Stores listing page
- `/stores/:storeId` - Individual store details
- `/stores/:storeId/booking` - Booking flow for a specific store
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Source of documentation

- All paging and routes are defined in the routers/paths.ts file.
