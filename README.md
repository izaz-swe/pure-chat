# LuxeHaven Estates - Real Estate Website with Hotjar & PureChat Integration

A modern, high-converting 3-page luxury real estate website built with HTML5, Tailwind CSS, custom modern typography, and pre-configured integration for:
- **Hotjar**: Heatmaps, session recordings, scroll depth, and customer conversion tracking.
- **PureChat**: Live chat widget to engage website visitors in real-time, generate leads, and capture contact information.

---

## 📁 Project Structure

```
pure-chat/
├── index.html           # Homepage (Hero with search, featured listings, value props, testimonials)
├── properties.html      # Listings Directory (Live keyword search, category filter, price slider, modal)
├── contact.html         # Inquiries & Advisory (Lead capture form, PureChat launcher, FAQs, contact info)
├── css/
│   └── styles.css       # Custom luxury typography, glassmorphism, animations & scrollbar styles
├── js/
│   ├── analytics.js     # Centralized Hotjar & PureChat configuration, tracking events & status badge
│   └── main.js          # Interactive property filtering, modals, form handlers & analytics triggers
└── README.md            # Setup guide & integration instructions
```

---

## ⚡ How to Add Your Hotjar & PureChat Keys

All tracking scripts are centralized in [`js/analytics.js`](file:///mnt/shejan/agy-test/pure-chat/js/analytics.js).

Open [`js/analytics.js`](file:///mnt/shejan/agy-test/pure-chat/js/analytics.js) and update the `ANALYTICS_CONFIG` object:

```javascript
const ANALYTICS_CONFIG = {
  // 1. Hotjar Site ID:
  // Found in your Hotjar dashboard: Insights -> Sites & Organizations
  hotjarSiteId: 'YOUR_HOTJAR_SITE_ID_HERE', // e.g., '3819482'

  // 2. PureChat Widget ID:
  // Found in PureChat dashboard: Account -> Websites -> Widget Code
  // Look for the code inside: new PCWidget({ c: 'YOUR_WIDGET_ID', ... })
  pureChatId: 'YOUR_PURECHAT_WIDGET_ID_HERE', // e.g., 'f93d39bb-8157-4184-a13a-xxxxxxxx'

  // Toggle debug messages in browser console
  debugMode: true
};
```

### Alternative: Direct Script Paste
If you prefer pasting the raw snippets provided by Hotjar or PureChat directly:
- **Hotjar**: Paste the `<script>` tag inside the `<head>` of [`index.html`](file:///mnt/shejan/agy-test/pure-chat/index.html), [`properties.html`](file:///mnt/shejan/agy-test/pure-chat/properties.html), and [`contact.html`](file:///mnt/shejan/agy-test/pure-chat/contact.html).
- **PureChat**: Paste the PureChat snippet right before `</body>` in the HTML files.

---

## 🚀 Running the Website Locally

You can run a local development server using any of the following:

### Option 1: Python (Built-in)
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## 📊 Analytics & Customer Behavior Events

The website is already instrumented to send events to Hotjar and tag visitors in PureChat:
1. `view_property_details`: Triggered when a user opens the detail modal for any property (with property ID, title, and price).
2. `property_filtered`: Triggered when visitors search or filter listings by price range or property category.
3. `lead_form_submitted`: Fires when a user submits the consultation form on the Contact page, saving visitor details.
4. `mobile_menu_toggled`: Tracks mobile navigation engagement.

---

## 💡 Status Indicator
While `debugMode: true` is enabled in `js/analytics.js`, a floating indicator badge appears in the bottom-left corner of the website. Clicking it lets you inspect whether Hotjar and PureChat are currently connected or running in preview mode.
# pure-chat
