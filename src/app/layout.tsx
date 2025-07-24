import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont", 
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif"
  ],
  adjustFontFallback: false, // 禁用自动字体回退调整
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace"
  ],
  adjustFontFallback: false, // 禁用自动字体回退调整
});

export const metadata: Metadata = {
  title: "我的博客 - 技术分享与生活记录",
  description: "一个简洁的个人博客，支持 GitHub 登录和评论功能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gradient-mesh min-h-screen`}
      >
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 pointer-events-none"></div>
        <SessionProvider>
          <Navbar />
          <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
