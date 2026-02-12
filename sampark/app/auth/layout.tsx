import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen overflow-hidden bg-transparent">

        {/* Background Image */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.ytimg.com/vi/uDbKtpIezfQ/maxresdefault.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#9929EA]/40 via-[#FF5FCF]/30 to-black/60" />

        <main className="relative z-10 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}
