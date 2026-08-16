/**
 * 通知通路 Service Worker（已添加 fetch 透传，满足 PWA 安装条件）
 *
 * 在原版 sw-notify-only.js 基础上增加了一个 fetch 事件透传处理器：
 * - 有 fetch 处理器 → 浏览器认定为可安装 PWA（显示「安装应用」而非「创建快捷方式」）
 * - fetch 纯透传不缓存 → 不会触发旧版「过期 precache → 白屏」问题
 * - 通知功能完全保留
 */

const SW_VERSION = 'notify-only-v2-pwa';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// PWA 安装必需：fetch 事件处理器（纯透传，不做任何缓存）
self.addEventListener('fetch', event => {
  // 只处理 GET，其他方法直接走默认
  if (event.request.method !== 'GET') return;
  // 纯网络透传，不缓存，避免白屏
  event.respondWith(fetch(event.request).catch(() => fetch(event.request)));
});

// 用户点击系统通知 → 把已有 tab 拉到前台；没 tab 就新开一个
self.addEventListener('notificationclick', event => {
  try { event.notification.close(); } catch (_) {}
  const fallback = '/';
  let targetUrl = fallback;
  try {
    targetUrl = (event.notification && event.notification.data && event.notification.data.url) || fallback;
  } catch (_) {}
  event.waitUntil((async () => {
    try {
      const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const c of list) {
        try {
          if (c && typeof c.focus === 'function') {
            await c.focus();
            try {
              if (typeof c.navigate === 'function' && targetUrl && c.url !== targetUrl) {
                await c.navigate(targetUrl);
              }
            } catch (_) {}
            return;
          }
        } catch (_) {}
      }
      if (typeof self.clients.openWindow === 'function') {
        await self.clients.openWindow(targetUrl);
      }
    } catch (_) {}
  })());
});

// Web Push 兜底
self.addEventListener('push', event => {
  let title = '新消息';
  let body = '';
  let data = {};
  try {
    if (event.data) {
      try {
        const payload = event.data.json();
        if (payload && typeof payload === 'object') {
          title = payload.title || title;
          body = payload.body || '';
          data = payload.data || {};
        }
      } catch (_) {
        try { body = event.data.text() || ''; } catch (_) {}
      }
    }
  } catch (_) {}
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: data.tag || 'chat-msg',
      renotify: true,
      data,
    }),
  );
});
