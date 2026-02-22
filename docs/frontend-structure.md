These are the example structure but not final.

fwd-frontend/
├── app/                     
│   ├── layout.tsx           # Global layout (header/footer, providers)
│   ├── page.tsx             # Landing page
│   ├── signup/page.tsx    # Registration page
│   └── dashboard/
│       ├── admin/page.tsx   # Admin dashboard
│       └── employee/page.tsx # Employee dashboard
|       |__ superadmin/page.tsx # SuperAdmin dashboard
│
├── components/              # Generic, reusable UI components
│   ├── Button.tsx           # Generic button component
│   ├── InputField.tsx       # Generic input field component
│   ├── Modal.tsx            # Generic modal component
│   └── Header.tsx           # Reusable header UI
│
├── features/                # Feature-specific components or modules
│   └── auth/
│       ├── LoginForm.tsx    # Login form (used only on login page)
│       ├── RegisterForm.tsx # Registration form
│       └── ConfirmEmail.tsx # Email confirmation UI
│
├── api/                     # API calls to NestJS backend
│   ├── auth.ts              # Auth-related API calls (login, register)
│   ├── user.ts              # User-related API calls
│   └── index.ts             # Axios/fetch wrapper with base URL
│
├── hooks/                   # Custom React hooks
│   └── useAuth.ts           # Auth state management
│
├── utils/                   # Constants and helper functions
│   ├── validators.ts        # Form validations
│   └── constants.ts         # App-wide constants (roles, routes, etc.)
│
├── public/                  # Static assets
│   ├── logo.png
│   └── favicon.ico
│
├── .env.local               # Environment variables (API URLs, secrets)
├── next.config.js
├── package.json
├── tsconfig.json
└── FRONTEND_STRUCTURE.md    # This documentation