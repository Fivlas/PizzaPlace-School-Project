# John Pizza - Modern Pizza Ordering Platform

A modern, full-stack pizza ordering platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Authentication**: Secure authentication using BetterAuth
- **Payment Processing**: Integrated Stripe payment processing
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **3D Visualizations**: Interactive 3D pizza builder using Three.js
- **Real-time Updates**: Dynamic order tracking and status updates
- **Admin Dashboard**: Comprehensive analytics and order management
- **Email Notifications**: Automated order confirmations and updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: BetterAuth
- **Database**: Prisma ORM
- **Payment**: Stripe
- **3D Graphics**: Three.js, React Three Fiber
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Email**: Nodemailer
- **File Upload**: UploadThing
- **Animations**: Framer Motion
- **Charts**: Recharts

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/john-pizza.git
cd john-pizza
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

```
john-pizza/
├── app/                 # Next.js app router pages
├── components/          # React components
├── actions/            # Server actions
├── lib/                # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── schema/             # Zod validation schemas
├── store/              # Zustand store
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── constants/          # Application constants
```

## 🎨 UI Components

The project uses Shadcn UI components with custom styling. All components are located in the `components/ui` directory and follow a consistent naming convention:

- Button components: `Button*.tsx`
- Card components: `Card*.tsx`
- Form components: `Form*.tsx`
- Modal components: `Modal*.tsx`

## 🔒 Authentication

Authentication is handled by BetterAuth, providing:
- Email/password authentication
- OAuth providers (Google, GitHub)
- Protected routes
- Role-based access control

## 💳 Payment Processing

Stripe integration for secure payment processing:
- Credit card payments
- Payment intents
- Webhook handling
- Order status updates

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS:
- Responsive layouts
- Adaptive components
- Optimized images
- Performance-focused

## 🚀 Performance Optimization

- Server Components by default
- Dynamic imports for heavy components
- Image optimization
- Code splitting
- Caching strategies

## 📝 Code Style

- Functional components
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful UI components
- BetterAuth for the authentication solution
- Stripe for payment processing
- The open-source community for their contributions 