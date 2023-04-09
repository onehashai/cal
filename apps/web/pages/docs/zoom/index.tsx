export default function ZoomDocs() {
  return (
    <div className="flex h-screen flex-col">
      <header className="bg-gray-900 py-4 px-6 text-white">
        <h1 className="text-2xl font-bold">OneCal.ai Documentaion | Connecting Zoom to your account</h1>
      </header>
      <main className="flex-1 bg-gray-100 p-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-lg font-bold">Connecting Zoom</h2>
          <ol className="mb-4 list-inside list-decimal">
            <li>Login to your account</li>
            <li>Go to https://app.onecal.ai/apps/zoom</li>
            <li>Click on &quot; Install App &quot; </li>
            <li>Login to your Zoom account if prompted</li>
            <li>Click on Allow and You are DONE!</li>
          </ol>
          <h2 className="mb-4 text-lg font-bold">Disconnecting Zoom</h2>
          <ol className="mb-4 list-inside list-decimal">
            <li>Login to your account</li>
            <li>Go to https://app.onecal.ai/apps/zoom</li>
            <li>Click on &quot; Uninstall App &quot; </li>
          </ol>
        </div>
      </main>
      <footer className="bg-gray-900 py-4 px-6 text-center text-white">© 2023 OneCal.ai</footer>
    </div>
  );
}
