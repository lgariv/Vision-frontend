# Vision Frontend

## About

Vision is a **web application** specifically built for monitoring and managing **cellular network systems**, with a focus on **eNodeB** equipment. This repository contains the **frontend** of the Vision platform, providing a robust, scalable, and user-friendly interface for overseeing critical telecommunications infrastructure. Built with **Next.js 14**, the frontend ensures seamless interaction and visualization of real-time data.

For the backend repository and API services, visit the [Vision Backend](backend-repo-link).

Key features include:

- **Real-time updates** on cellular network statuses.
- **Interactive interfaces** for managing and monitoring network nodes.

The frontend leverages modern technologies to deliver a dynamic and responsive user experience.

---

## Technologies

### Frontend

- **React 18** with **Next.js 14** for efficient server-side rendering and dynamic routing.
- **NextUI**, **shadcn/ui** and **Magic UI** for building accessible, customizable, and responsive UI components.
- **Zustand** for state management, enabling a simple and scalable solution for handling application state.
- **Leaflet** for rendering interactive maps, providing geospatial visualization of network nodes.
- **Tailwind CSS** for responsive and modern styling.

### Deployment

- Deployed on **Vercel** to ensure global availability and high performance.

### Additional Tools

- **Docker**: Provides consistent environments for both development and deployment.

---

## Features

1. **Dashboard View**

   - Displays real-time statistics and health metrics of network nodes.
   - Features an interactive map highlighting node statuses for quick identification.

2. **Alerts Management**

   - Allows users to configure custom alert rules.
   - Provides a user-friendly interface for tracking and resolving network issues.

3. **Node Management**

   - Supports adding, removing, and updating node information.
   - Implements role-based access control to secure sensitive operations.

4. **Real-time Data**

   - Automatically refreshes data at regular intervals to ensure accuracy.

---

## Setup and Installation

### Prerequisites

- **Node.js** (version 16 or later)
- **Docker** (for containerized development and deployment)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone <frontend-repo-link>
   ```

2. Install the required dependencies:

   ```bash
   cd vision-frontend
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser:

   - Navigate to `http://localhost:3000`.

For backend setup, refer to the [Vision Backend Repository](backend-repo-link).

---

## Contribution Guidelines

Contributions are highly encouraged! To contribute, follow these steps:

1. Fork this repository.
2. Create a new branch to work on your feature or fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**. For details on the terms and conditions, see the [LICENSE](LICENSE) file in the repository.

---

## Contact

For further information or inquiries, reach out to the development team:

**LinkedIn**: [Lavie Gariv](https://www.linkedin.com/in/lavie-g-3a66a21ba/)
