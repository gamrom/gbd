export default function ContentSizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-[650px] mx-auto px-4 min-h-screen mt-[100px]">
      {children}
    </div>
  )
}