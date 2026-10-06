// =========================================================================
// Real Estate Analytics & Live Chat Integration
// Hotjar (Heatmaps & Session Recording) + PureChat (Live Visitor Chat)
// =========================================================================

const ANALYTICS_CONFIG = {
  // 1. Hotjar Site ID:
  // Get this from your Hotjar dashboard: Insights -> Sites & Organizations
  // Example: '3819482'
  hotjarSiteId: '', 

  // 2. PureChat Widget ID:
  // Get this from PureChat: Account -> Websites -> Widget Code (Look for value in 'c: "..."')
  // Example: 'f93d39bb-8157-4184-a13a-xxxxxxxxxxxx'
  pureChatId: '',

  // Set to true to see tracker activity & helper notifications in console & UI
  debugMode: true
};

// -------------------------------------------------------------------------
// Hotjar Integration
// -------------------------------------------------------------------------
function initHotjar() {
  if (!ANALYTICS_CONFIG.hotjarSiteId) {
    if (ANALYTICS_CONFIG.debugMode) {
      console.warn(
        '[Analytics] Hotjar Site ID not set. Update ANALYTICS_CONFIG.hotjarSiteId in js/analytics.js to enable Hotjar recordings & heatmaps.'
      );
    }
    return false;
  }

  // Official Hotjar Tracking Code
  (function(h, o, t, j, a, r) {
    h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments); };
    h._hjSettings = { hjid: ANALYTICS_CONFIG.hotjarSiteId, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

  if (ANALYTICS_CONFIG.debugMode) {
    console.log(`[Analytics] Hotjar initialized with Site ID: ${ANALYTICS_CONFIG.hotjarSiteId}`);
  }
  return true;
}

// -------------------------------------------------------------------------
// PureChat Integration
// -------------------------------------------------------------------------
function initPureChat() {
  if (!ANALYTICS_CONFIG.pureChatId) {
    if (ANALYTICS_CONFIG.debugMode) {
      console.warn(
        '[Live Chat] PureChat ID not set. Update ANALYTICS_CONFIG.pureChatId in js/analytics.js to enable PureChat widget.'
      );
    }
    return false;
  }

  // Official PureChat Snippet
  window.purechatApi = { l: [], t: [], on: function () { this.l.push(arguments); } };
  (function () {
    var done = false;
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript';
    document.getElementsByTagName('HEAD').item(0).appendChild(script);
    script.onreadystatechange = script.onload = function () {
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        var w = new PCWidget({ c: ANALYTICS_CONFIG.pureChatId, f: true });
        done = true;
        if (ANALYTICS_CONFIG.debugMode) {
          console.log(`[Live Chat] PureChat widget initialized with ID: ${ANALYTICS_CONFIG.pureChatId}`);
        }
      }
    };
  })();
  return true;
}

// -------------------------------------------------------------------------
// Custom Tracking Helper for Customer Behavior
// -------------------------------------------------------------------------
window.trackCustomerAction = function(eventName, eventDetails = {}) {
  if (ANALYTICS_CONFIG.debugMode) {
    console.log(`[Tracking Event] ${eventName}:`, eventDetails);
  }

  // Trigger Hotjar event if available
  if (window.hj) {
    try {
      window.hj('event', eventName);
      if (ANALYTICS_CONFIG.debugMode) {
        console.log(`[Hotjar Event Sent] ${eventName}`);
      }
    } catch (e) {
      console.error('[Hotjar] Error sending event:', e);
    }
  }

  // If PureChat API is loaded, you can also tag visitors or trigger chat triggers
  if (window.purechatApi && typeof window.purechatApi.set === 'function') {
    try {
      if (eventDetails.email) {
        window.purechatApi.set('visitor:email', eventDetails.email);
      }
      if (eventDetails.name) {
        window.purechatApi.set('visitor:name', eventDetails.name);
      }
    } catch (err) {
      console.warn('[PureChat] Could not set visitor data', err);
    }
  }
};

// -------------------------------------------------------------------------
// Helper Widget for Testing & Setup Status
// -------------------------------------------------------------------------
function initAnalyticsStatusBadge() {
  if (!ANALYTICS_CONFIG.debugMode) return;

  const badge = document.createElement('div');
  badge.id = 'analytics-dev-badge';
  badge.className = 'fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-700/60 shadow-xl text-xs font-medium cursor-pointer transition-all hover:bg-slate-800';
  
  const hotjarOk = Boolean(ANALYTICS_CONFIG.hotjarSiteId);
  const purechatOk = Boolean(ANALYTICS_CONFIG.pureChatId);

  badge.innerHTML = `
    <span class="flex h-2 w-2 rounded-full ${hotjarOk && purechatOk ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}"></span>
    <span>Analytics: ${hotjarOk ? '🔥 Hotjar Active' : '🔥 Hotjar (Demo)'} | ${purechatOk ? '💬 PureChat Active' : '💬 PureChat (Demo)'}</span>
    <span class="text-slate-400 hover:text-white ml-1">⚙️</span>
  `;

  badge.addEventListener('click', () => {
    alert(
      `📊 Analytics & PureChat Status:\n\n` +
      `• Hotjar Site ID: ${ANALYTICS_CONFIG.hotjarSiteId || 'Not configured yet (placeholder active)'}\n` +
      `• PureChat ID: ${ANALYTICS_CONFIG.pureChatId || 'Not configured yet (placeholder active)'}\n\n` +
      `👉 To connect your live scripts:\n` +
      `Open 'js/analytics.js' and set your hotjarSiteId and pureChatId in the ANALYTICS_CONFIG object.`
    );
  });

  document.body.appendChild(badge);
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initHotjar();
  initPureChat();
  initAnalyticsStatusBadge();
});
