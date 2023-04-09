import Head from "next/head";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Your Company Name</title>
      </Head>
      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900">Privacy Policy</h1>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-base leading-6 text-gray-500">
              You are responsible for complying with the laws of the jurisdiction from which you are accessing
              this site and you agree that you will not access or use the information on this site in
              violation of such laws. Unless expressly stated otherwise herein, any information submitted by
              you through this site shall be deemed non-confidential and non-proprietary. You represent that
              you have the lawful right to submit such information and agree that you will not submit any
              information unless you are legally entitled to do so. Because of the open nature of the
              Internet, we recommend that you not submit information you consider confidential.
            </p>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-base leading-6 text-gray-500">
              The User’s right to privacy is of paramount importance to OneHash. Any information provided by
              the User will not be shared with any third party unless identified as such elsewhere. OneHash
              reserves the right to use the information to provide the User a more personalized online
              experience. We host your data at international data centersand the service levels offered by
              them will be applicable to you. We willreasonably put all effort to ensure that the servers
              managed by us are up andrunning 24x7. The Site may provide links to web sites and access to
              content, products and services from third parties, including users, advertisers, affiliates and
              sponsors of the Site. You agree that OneHash is not responsible for the availability of, and
              content provided on, third party web sites. The User is requested to peruse the policies posted
              by other web sites regarding privacy and other topics before use. OneHash is not responsible for
              third party content accessible through the Site, including opinions, advice, statements and
              advertisements, and User shall bear all risks associated with the use of such content. OneHash
              is not responsible for any loss or damage of any sort User may incur from dealing with any third
              party This Terms of Use constitutes the entire agreement between you and OneHash with respect to
              the Site. OneHash maintains this site in India with some information stored in servers located
              outside India and you agree with these terms of use. The foregoing is subject to the laws of the
              Republic of India, India shall have the exclusive jurisdiction on any dispute that may arise out
              of the use of this site.
            </p>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-base leading-6 text-gray-500">
              YOU ACKNOWLEDGE THAT YOU HAVE READ THIS TERMS OF USE, UNDERSTAND IT, AND AGREE TO BE BOUND BY
              IT.YOU FURTHER AGREE THAT IT IS THE COMPLETE AND EXCLUSIVE STATEMENT OF THEAGREEMENT BETWEEN YOU
              AND OneHash WHICH SUPERSEDES ANY PROPOSED OR PRIORAGREEMENT, ORAL OR WRITTEN, AND ANY OTHER
              COMMUNICATIONS BETWEEN YOU AND OneHash RELATING TO YOUR USE OF THE SITE. If you have any
              questions or comments about our Terms of Use, You can contact us at support@onehash.ai
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="mb-4 text-2xl font-medium text-gray-900">Changes to this Policy</h2>
            <p className="text-base leading-6 text-gray-500">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new policy on our website. You are advised to review this policy periodically for
              any changes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
