# Frontend - Inventory Intelligence System

Complete React-based frontend for the smart inventory management system.

## Features Implemented

### ✅ Authentication
- **Login Page**: Email/username and password authentication
- Demo credentials: `admin` / `admin123`
- Token-based JWT authentication

### ✅ Main Layout
- **Responsive Sidebar**: Collapsible navigation (desktop & mobile)
- **Top Header**: Global search, notifications, user profile menu
- **Protected Routes**: Automatic redirection to login for unauthorized access

### ✅ Dashboard (Home Page)
- Welcome message with user name
- **Key Performance Indicators (KPIs)**:
  - Items to Reorder (with alert threshold)
  - Current Inventory Value (total stock worth)
  - Sales (Today) with trend indicator
  - Stockouts (This Week)
- Quick Action Buttons: "Receive New Stock", "Record a Sale"
- Interactive Chart: Sales vs. Forecasted Demand (Last 30 Days)

### ✅ Inventory Management
**Tab 1: All Products**
- Master product database
- Search & filter functionality
- Data table with columns:
  - Product Name
  - SKU (with color-coded quantity alerts)
  - Category
  - Supplier
  - Current Quantity
  - Reorder Point
- Action buttons: Edit, View History
- "Add New Product" button with modal form

**Tab 2: Categories**
- Simple category management list
- Add/Edit/Delete categories
- Grid view with action buttons

**Tab 3: Suppliers**
- Supplier database management
- Columns: Name, Contact Email, Phone
- Add/Edit/Delete functionality

### ✅ Stock Management (Warehouse Operations)
**Tab 1: Receive Stock**
- Barcode/SKU scanner input
- Purchase Order selection (optional)
- Quantity input field
- Real-time item list (scanned products)
- Submit shipment button with item count
- Auto-focus on scan input for continuous scanning

**Tab 2: Record Sale (POS)**
- Simple point-of-sale interface
- Scanner functionality for quick transactions
- Cart view of items

**Tab 3: Inventory Count**
- Physical stock-take functionality
- Scan products and enter actual counts
- Compare with expected quantities

**Tab 4: Stock Transfers**
- Move inventory between locations
- From/To location selection
- Scanner for product selection
- Quantity adjustment

### ✅ Purchase Orders (Ordering)
- PO list with sortable columns:
  - PO Number
  - Supplier name
  - Status (Draft, Sent, Confirmed, Shipped, Received)
  - Item count
  - Creation date
- Status-based action buttons
- Create New PO modal with:
  - Supplier selection
  - Destination location
  - Product search/scan
  - Quantity input
  - Save as Draft & Send to Supplier options

### ✅ Analytics & Reports
**Report 1: Forecast vs. Actual Sales**
- Line chart comparing predicted vs. actual sales
- Accuracy metric display

**Report 2: Shrinkage Report**
- Table showing:
  - Product name & SKU
  - Expected vs. Actual count
  - Difference & Loss value
- Export to CSV

**Report 3: Overstock Report**
- High-stock, low-sales products
- Cards showing:
  - Product details
  - Last sale date
  - Tied-up inventory value
  - "Create Promotion" button

**Report 4: Profitability**
- Bar chart showing profit margins by category
- Color-coded visualization

**Filters & Export**
- Date range selector (7, 30, 90 days, 1 year)
- Location filter (All, Warehouse 1, 2, Store 1)
- Export each report as CSV

### ✅ Settings
**Tab 1: My Profile**
- Profile picture upload
- Full name & email edit
- Change password section with validation

**Tab 2: Company Settings** (Admin only)
- Company name
- Company logo upload
- Branding settings

**Tab 3: Users & Roles** (Admin only)
- User list with email, role, status
- Invite new user button
- Edit/Delete user actions
- Role management (Admin, Manager, Staff)

**Tab 4: Locations** (Admin only)
- All warehouse/store locations
- Add new location
- Edit/Delete location
- Location details

**Tab 5: Billing**
- Current subscription plan display
- Plan details and renewal date
- Manage subscription button
- Billing history (placeholder for future use)

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx                  # Main app with routing
│   ├── index.jsx                # Entry point
│   ├── index.css                # Global styles
│   ├── features/
│   │   ├── auth/
│   │   │   └── pages/
│   │   │       ├── LoginPage.jsx
│   │   │       └── SettingsPage.jsx
│   │   ├── analytics/
│   │   │   └── pages/
│   │   │       ├── Dashboard.jsx
│   │   │       └── AnalyticsPage.jsx
│   │   ├── inventory/
│   │   │   └── pages/
│   │   │       └── InventoryPage.jsx
│   │   ├── scanning/
│   │   │   └── pages/
│   │   │       └── StockManagementPage.jsx
│   │   └── orders/
│   │       └── pages/
│   │           └── OrdersPage.jsx
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopHeader.jsx
│   │   └── utils/
│   │       └── api.js
│   └── store/
│       └── index.js
├── public/
│   └── index.html
└── package.json
```

## Technologies Used

- **React 18**: UI framework
- **React Router v6**: Client-side routing
- **Redux Toolkit**: State management
- **Axios**: HTTP client
- **Chart.js & react-chartjs-2**: Data visualization
- **Tailwind CSS**: Utility-first styling
- **React Hook Form**: Form management
- **Zod**: Schema validation

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

The app runs on `http://localhost:3000`

### Default Login Credentials

```
Username: admin
Password: admin123
```

## API Integration

The frontend expects a Django backend running on `http://localhost:8000` with these endpoints:

### Authentication
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Get current user

### Inventory
- `GET /api/inventory/products/` - List products
- `POST /api/inventory/products/` - Create product
- `GET /api/inventory/products/{id}/` - Get product detail
- `PUT /api/inventory/products/{id}/` - Update product
- `DELETE /api/inventory/products/{id}/` - Delete product

### Stock Management
- `POST /api/inventory/stock-in/` - Receive stock
- `POST /api/inventory/stock-out/` - Record sale
- `POST /api/inventory/transfer/` - Transfer between locations
- `POST /api/inventory/count/` - Record inventory count

### Orders
- `GET /api/orders/purchase-orders/` - List POs
- `POST /api/orders/purchase-orders/` - Create PO
- `PUT /api/orders/purchase-orders/{id}/` - Update PO
- `DELETE /api/orders/purchase-orders/{id}/` - Delete PO

### Analytics
- `GET /api/analytics/forecast/` - Get forecasts
- `GET /api/analytics/shrinkage/` - Get shrinkage report
- `GET /api/analytics/overstock/` - Get overstock report
- `GET /api/analytics/profitability/` - Get profitability data

## Styling

The app uses Tailwind CSS for styling. All components follow a consistent design system:

- **Colors**: Blue (primary), Green (success), Red (danger), Yellow (warning)
- **Typography**: Clear hierarchy with semantic sizing
- **Spacing**: Consistent padding and margins
- **Responsive**: Mobile-first design with breakpoints at 768px (md) and 1024px (lg)

## Features to Implement

- [ ] Real API integration
- [ ] Form validation with Zod
- [ ] Toast notifications for user feedback
- [ ] Loading states and error handling
- [ ] Pagination for large datasets
- [ ] Advanced filtering and search
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Accessibility improvements (WCAG 2.1)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Smart Inventory System
