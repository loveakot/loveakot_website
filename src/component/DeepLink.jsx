import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/la_logo.png";
import GooglePlay from "../assets/GooglePlay.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.loveakot.android";
const APP_STORE_URL = "https://apps.apple.com/app/love-akot"; // update with real App Store link when live
const APP_SCHEME = "loveakot://";
const IOS_APP_AVAILABLE = false; // set to true once the iOS app is live

function getOS() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";
  return "other";
}

const DeepLink = () => {
  const os = getOS();
  const { pathname, search } = useLocation();
  // Strip leading slash and append any query string so deep links like
  // /gupshup, /news, /business map to loveakot://gupshup etc.
  const deepPath = pathname.replace(/^\//, "") + search;

  const [status, setStatus] = useState("trying"); // 'trying' | 'fallback'

  useEffect(() => {
    if (os === "android") {
      // Attempt to open the app via custom scheme
      const appUrl = deepPath
        ? `${APP_SCHEME}${deepPath}`
        : APP_SCHEME;

      const start = Date.now();
      window.location.href = appUrl;

      // If the app opens, the browser will background this page.
      // If it doesn't open within ~2s, show the fallback.
      const timer = setTimeout(() => {
        if (Date.now() - start >= 1800) {
          setStatus("fallback");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (os === "ios" && IOS_APP_AVAILABLE) {
      const appUrl = deepPath
        ? `${APP_SCHEME}${deepPath}`
        : APP_SCHEME;

      window.location.href = appUrl;

      const timer = setTimeout(() => {
        setStatus("fallback");
      }, 2000);

      return () => clearTimeout(timer);
    }

    // iOS (app not available) or desktop — show page immediately
    setStatus("fallback");
  }, [os, deepPath]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0eeff] to-white flex flex-col items-center justify-center px-4 py-12">
      <img src={logo} alt="Love Akot" className="w-36 mb-8" />

      {/* Android — trying to open app */}
      {os === "android" && status === "trying" && (
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6f40ff] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Opening Love Akot…
          </h1>
          <p className="text-gray-500">
            If the app doesn't open, we'll take you to the Play Store.
          </p>
        </div>
      )}

      {/* Android — app not installed fallback */}
      {os === "android" && status === "fallback" && (
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Get Love Akot on Android
          </h1>
          <p className="text-gray-500 mb-8">
            Looks like the app isn't installed yet. Download it free from the
            Play Store and connect with your community!
          </p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            <img
              src={GooglePlay}
              alt="Get it on Google Play"
              className="h-14 mx-auto hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {/* iOS — app available, trying to open */}
      {os === "ios" && IOS_APP_AVAILABLE && status === "trying" && (
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6f40ff] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Opening Love Akot…
          </h1>
          <p className="text-gray-500">
            If the app doesn't open, we'll take you to the App Store.
          </p>
        </div>
      )}

      {/* iOS — app available, not installed fallback */}
      {os === "ios" && IOS_APP_AVAILABLE && status === "fallback" && (
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Get Love Akot on iPhone
          </h1>
          <p className="text-gray-500 mb-8">
            Download Love Akot from the App Store for free and stay connected
            with your city.
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-14 mx-auto hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {/* iOS — app NOT available yet */}
      {os === "ios" && !IOS_APP_AVAILABLE && (
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-[#6f40ff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-[#6f40ff]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="inline-block bg-[#6f40ff]/10 text-[#6f40ff] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Coming Soon
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Love Akot is coming to iPhone!
          </h1>
          <p className="text-gray-500 mb-8">
            We're working hard to bring Love Akot to iOS very soon. Stay tuned!
            In the meantime, try us on Android.
          </p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            <img
              src={GooglePlay}
              alt="Get it on Google Play"
              className="h-14 mx-auto hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {/* Desktop / other */}
      {os === "other" && (
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Download Love Akot
          </h1>
          <p className="text-gray-500 mb-8">
            Love Akot is a mobile app. Scan the QR code or visit your device's
            app store to download it.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={GooglePlay}
                alt="Get it on Google Play"
                className="h-14 hover:opacity-90 transition-opacity"
              />
            </a>
            {IOS_APP_AVAILABLE && (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-14 hover:opacity-90 transition-opacity"
                />
              </a>
            )}
          </div>
        </div>
      )}

      <p className="mt-12 text-xs text-gray-400">
        Love Akot &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default DeepLink;
