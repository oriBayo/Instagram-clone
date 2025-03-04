# Instagram Clone

This project is a full-stack Instagram clone built using Next.js. It allows users to share posts, follow other users, like and comment on posts, and manage their profiles.

## Features

-   **Authentication:** User authentication is handled using NextAuth.js with Google as the provider.
-   **Profile Management:** Users can create and update their profiles, including avatar, username, name, subtitle, and bio.
-   **Post Creation:** Users can create and upload posts with descriptions. Images are stored using Pinata.
-   **Browsing:** Users can browse posts from other users.
-   **Liking and Commenting:** Users can like posts and add comments.
-   **Following:** Users can follow other users.
-   **Bookmarks:** Users can bookmark posts.
-   **Search:** Users can search for other users and posts.
-   **Responsive Design:** The application is designed to be responsive and work on different devices.
-   **Dark Mode:** The application supports dark mode.

## Technologies Used

-   **Frontend:**
    -   Next.js
    -   React
    -   Tailwind CSS
    -   Radix UI
    -   Lucide React
    -   react-masonry-css
    -   react-spinners
    -   next-auth
-   **Backend:**
    -   Next.js API routes
    -   Prisma
    -   MongoDB
    -   Pinata SDK
-   **Other:**
    -   lodash
    -   date-fns

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd instagram-clone
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up environment variables:**

    Create a [.env.local](http://_vscodecontentref_/0) file in the root directory and add the following environment variables:

    ```
    DATABASE_URL=<Your MongoDB Connection String>
    AUTH_SECRET=<A Secret Key for NextAuth>
    NEXT_PUBLIC_PINATA_GATEWAY_URL=<Your Pinata Gateway URL>
    PINATA_JWT=<Your Pinata JWT>
    GOOGLE_CLIENT_ID=<Your Google Client ID>
    GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
    NEXTAUTH_URL=http://localhost:3000 # or your deployed URL
    ```

    Make sure to replace the placeholder values with your actual credentials.

4.  **Run Prisma migrations:**

    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

5.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
