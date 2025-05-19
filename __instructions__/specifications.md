# Scheduler Web Application Specifications

## 1. Project Overview

The Scheduler is a web application that allows users to book appointments at various stores. It provides a seamless interface for users to discover stores, and book appointments. The application also includes features for users to manage their bookings of a stores and store-code connection through a personal dashboard. They can also view their booking history and upcomming bookings.

## 2. User Types

### 2.1 Unauthenticated Users

- Can browse stores and services
- Can view basic information about stores, services, and team members
- Can book appointments as anonymous users (must manually enter their information)
- Prompted to sign in or register for full functionality

### 2.2 Authenticated Users

- Full access to all application features
- Can book appointments with pre-filled personal information
- Can connect to stores via store code
- Can manage their bookings (view, reschedule, cancel) of a store
- Can access personal booking history

## 3. Core Features

### 3.1 Store Browsing and Discovery

- Does not require authentication
- Browse list of available stores
- Filter stores by industry, location, or other criteria
- View store details (description, address, contact info, operating hours)
- Search functionality to find specific stores
- View store ratings and reviews [*]

### 3.2 Store and Booking Management

- Connect to or remove existing stores by entering store code
- Add stores to personal management dashboard
- View all connected stores in a unified interface
- Manage store information and settings on the user side
- Receive notifications about store activities and bookings
- Manage store-specific bookings (view, reschedule, cancel)
- Filter and sort bookings by date, service, or team member within the store

### 3.3 Appointment Booking

- Select date and time for appointment
- View available time slots based on store hours, team member availability, and service duration
- Book appointments with preferred team members
- Add notes or special requests for appointments
- Receive booking notifications
- Automatically connect store to customer if authenticated

### 3.4 Booking History

- View past appointments and details of all bookings
- Sort and filter booking history
- Option to rebook previous services
- Access past booking details for reference

### 3.5 Upcoming Bookings

- View all scheduled future appointments across all connected stores
- Get reminders about upcoming appointments
- Quick access to appointment details (date, time, service, team member)
- One-click options to reschedule or cancel upcoming appointments
- Sort and filter upcoming bookings by date, store, or service type
- View booking details location and directions

## Routing Structure

Routes are based on the structure of path object in routers/paths.ts file. This is a general description on how the routes are aligned with the requirements.

### Authentication Routes

- `/auth/login/`: User login page
- `/auth/register/`: New user registration

### Store Routes

- `/stores`: Main store browsing and discovery page (supports filtering and searching)
- `/stores/:storeId`: Individual store detail page showing services, team members, and information
- `/stores/:storeId/booking`: Appointment booking page for a specific store

### Dashboard Routes (Authenticated)

- `/dashboard`: Main user dashboard with overview of connected stores and upcoming bookings
- `/dashboard/bookings`: View and manage all upcoming appointments
- `/dashboard/history`: Access booking history across all connected stores
- `/dashboard/stores`: Manage store connections and enter store codes

### Root Route

- `/`: Application landing page with featured stores and quick access to main functions
