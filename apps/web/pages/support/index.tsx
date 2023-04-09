import Head from "next/head";

const SupportPage = () => {
  return (
    <>
      <Head>
        <title>OneHash | Support</title>
      </Head>
      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Support</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">How do I contact support?</h2>
              <p className="text-base leading-6 text-gray-500">
                You can contact our support team by sending an email to admin@onehash.ai or by filling out our
                online support form.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                What is your response time for support requests?
              </h2>
              <p className="text-base leading-6 text-gray-500">
                We strive to respond to all support requests within 24 hours. However, during periods of high
                volume, it may take longer to receive a response.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Do you offer phone support?</h2>
              <p className="text-base leading-6 text-gray-500">
                No, we do not currently offer phone support. However, you can contact our support team by
                email or by filling out our online support form.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                What information should I include when submitting a support request?
              </h2>
              <p className="text-base leading-6 text-gray-500">
                To help us address your support request as quickly as possible, please include the following
                information:
              </p>
              <ul className="mt-4 list-inside list-disc text-base leading-6 text-gray-500">
                <li>Your name and email address</li>
                <li>A detailed description of the issue you are experiencing</li>
                <li>Screenshots or error messages, if applicable</li>
                <li>The steps you have already taken to try and resolve the issue</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
