import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Bharath Aadhya Intelligence",
  description:
    "How Bharath Aadhya Intelligence collects, uses, stores and protects personal data submitted through its website and inquiry form.",
};

const PRIVACY_EMAIL = "bharathaadhyaintelligence@gmail.com";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          This Privacy Policy explains how Bharath Aadhya Intelligence (&quot;BAI&quot;, &quot;we&quot;,
          &quot;us&quot;) handles personal data when you visit our website at
          https://bharath-aadhya-intelligence.github.io/Bharath-Aadhya-Intellignce/ (the &quot;Website&quot;) and when
          you send us a Project Inquiry through the Website.
        </p>
        <p>
          The policy describes the Website as it currently operates. We will update it when our practices change. We
          have prepared it with reference to the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and
          the Digital Personal Data Protection Rules, 2025 (&quot;DPDP Rules&quot;). Parts of the DPDP Act take effect in
          phases.
          Preparing this policy does not mean we have verified compliance with any law.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "Interpretation and definitions",
    content: (
      <>
        <p>
          The words in this policy that begin with a capital letter have the meanings below, whether they are used in the
          singular or the plural.
        </p>
        <ul>
          <li>
            <strong>Company</strong> (&quot;BAI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) means Bharath
            Aadhya Intelligence, based in Bengaluru, India.
          </li>
          <li>
            <strong>Website</strong> means the BAI website at https://bharath-aadhya-intelligence.github.io/Bharath-Aadhya-Intellignce/.
          </li>
          <li>
            <strong>Inquiry</strong> means a Project Inquiry that you send through the contact form on the Website.
          </li>
          <li>
            <strong>Personal Data</strong> means any information that relates to an identified or identifiable individual.
          </li>
          <li>
            <strong>Technical Data</strong> means information that is collected automatically when a request reaches the
            Website or the inquiry service, such as an IP address, browser type, the page requested, and the time of the
            request.
          </li>
          <li>
            <strong>Cookies</strong> are small files that a website stores in your browser. Local storage is a similar
            browser feature. Both are described in the section on cookies.
          </li>
          <li>
            <strong>Service Provider</strong> means a third party that processes Personal Data on our behalf to run the
            Website or the inquiry service.
          </li>
          <li>
            <strong>You</strong> means the individual using the Website or sending an Inquiry, or the company on whose
            behalf that individual acts.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "identity",
    title: "Who we are",
    content: (
      <>
        <ul>
          <li>
            <strong>Business name:</strong> Bharath Aadhya Intelligence
          </li>
          <li>
            <strong>Location:</strong> Bengaluru, India
          </li>
          <li>
            <strong>Website:</strong> https://bharath-aadhya-intelligence.github.io/Bharath-Aadhya-Intellignce/
          </li>
          <li>
            <strong>Privacy contact:</strong>{" "}
            <a href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20request`}>{PRIVACY_EMAIL}</a>
          </li>
          <li>
            <strong>Grievance and privacy contact:</strong> <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></li>
        </ul>
        <p>
          For personal data you submit through the Project Inquiry form, BAI decides why and how the data is used, so
          BAI is responsible for it.</p>
      </>
    ),
  },
  {
    id: "data-collected",
    title: "Personal data we collect",
    content: (
      <>
        <h3>1. Project Inquiry form</h3>
        <p>When you choose to send an inquiry, you provide the following information:</p>
        <ul>
          <li>Full name</li>
          <li>Business email address</li>
          <li>Phone number</li>
          <li>Project type (one of our listed services)</li>
          <li>Project details: a free-text description, limited to a fixed number of characters</li>
        </ul>
        <p>
          Please do not include sensitive personal data in your project details, such as bank account or card numbers,
          passwords, or government identification numbers. We do not need them to respond to an inquiry.
        </p>

        <h3>2. Technical data when an inquiry is sent</h3>
        <p>
          To deliver your inquiry, the inquiry service receives your device&apos;s IP address, the website address your
          browser reports as the sender (its origin), and the time of the request. The service uses the IP address to
          limit repeated submissions. Our application code does not write these values to a database or file. Our
          hosting providers may keep request logs (see the section on third-party service providers).
        </p>

        <h3>3. Technical data when the Website is loaded</h3>
        <p>
          Like any website, the Website is served by our hosting provider, GitHub Pages. The provider receives standard
          request information, such as your IP address, browser type, the page requested, and the time. We do not run
          our own analytics on the Website.
        </p>

        <h3>4. Cookie choice record</h3>
        <p>
          If you use the cookie banner or Cookie Settings, your choice is stored in your browser&apos;s local storage.
          It contains only the version of the consent wording, the time you saved the choice, and your on or off choice
          for each optional category. It is not sent to us. See the section on cookies.
        </p>

        <h3>5. Hidden anti-spam field</h3>
        <p>
          The inquiry form has a hidden field that people do not see. Automated programs often fill it in. If the field
          has a value, the inquiry is discarded and nothing is sent to us. The value is not stored.
        </p>

        <h3>6. Newsletters and marketing emails</h3>
        <p>
          The Website does not collect email addresses for a newsletter or mailing list. We do not send marketing emails
          based on addresses collected through the Website. If we introduce a mailing list later, we will give notice and
          obtain any consent the law requires before collecting addresses for it.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "Why we use personal data",
    content: (
      <ul>
        <li>To read your inquiry, reply to you, and discuss whether and how we can help with your project.</li>
        <li>To prepare a proposal or pre-contract information at your request.</li>
        <li>To protect the inquiry service from spam and abuse, including rate limiting and the hidden field.</li>
        <li>To remember your cookie choice so that we do not ask you again on every visit.</li>
        <li>
          To keep records that the law requires, if you become a client.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal grounds and consent",
    content: (
      <>
        <p>
          <strong>Inquiries.</strong> You send your inquiry voluntarily, for the purpose of getting a reply from us. We
          rely on your consent, given by sending the form, and on the purpose for which you provided the information.</p>
        <p>
          <strong>Withdrawing consent.</strong> You may withdraw your consent at any time, as described in the section on
          withdrawing consent. Withdrawing does not affect processing that happened before you withdrew.
        </p>
        <p>
          <strong>Cookie choice record.</strong> We store your cookie choice so that we can respect it. Optional
          categories are used only after you allow them.
        </p>
      </>
    ),
  },
  {
    id: "inquiry-processing",
    title: "How Project Inquiries are processed and delivered",
    content: (
      <>
        <p>When you click Send Inquiry, your browser sends the form values to our inquiry service. The service:</p>
        <ul>
          <li>accepts the request only from the Website&apos;s address (origin);</li>
          <li>checks each field and limits the size of the request;</li>
          <li>limits how often one address can send inquiries;</li>
          <li>
            sends an email to our business mailbox, {PRIVACY_EMAIL}, using the email delivery provider Resend. The
            email contains the information you entered. Its reply address is your email address, so replying in your
            mail app goes to you;
          </li>
          <li>returns a reference number (for example BAI-20261030-3F9A1C2B) that is shown to you.</li>
        </ul>
        <p>
          We do not use a customer database or a CRM for inquiries. The email in our mailbox is currently the main
          record of an inquiry.</p>
        <p>
          Application logs record the reference number, the outcome (sent or failed), a failure type where relevant, and
          the email provider&apos;s message identifier. The logs do not record your name, email address, phone number,
          or project details.
        </p>
        <p>
          If sending fails, the form asks you to try again. Your entries stay on the page until you leave it, and they
          are not saved in your browser.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    content: (
      <>
        <h3>What the Website uses today</h3>
        <ul>
          <li>
            <strong>Strictly necessary:</strong> the cookie choice record described above. It is stored in your
            browser&apos;s local storage under the name <code>bai-cookie-consent</code>. It is needed to remember your
            choice and is not used for tracking.
          </li>
          <li>
            <strong>Analytics and marketing:</strong> none. The Website does not use analytics, advertising pixels, or
            embedded tracking. The Website does not set any cookies.</li>
        </ul>
        <h3>If optional technologies are added later</h3>
        <p>
          If we add analytics, advertising, or other optional tracking, we will update this policy and the Cookie
          Settings categories first. Those technologies will not run until you allow the category. Withdrawing consent
          prevents future loading. Where possible, we also delete the cookies those technologies set. Deleting a cookie
          does not delete data that a third party has already received.
        </p>
        <h3>Controlling storage</h3>
        <p>
          You can change your choice at any time from the Cookie Settings link in the footer. You can also delete the
          stored choice in your browser settings. If you do, the cookie banner will appear again on your next visit.
        </p>
      </>
    ),
  },
  {
    id: "providers",
    title: "Third-party service providers",
    content: (
      <>
        <p>We use the following providers to run the Website and the inquiry service:</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Provider</th>
              <th scope="col">What it does</th>
              <th scope="col">Personal data it handles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GitHub Pages (GitHub)</td>
              <td>Hosts the Website as static files</td>
              <td>Standard request data, such as IP address, browser type, and pages requested</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Runs the inquiry service</td>
              <td>The inquiry details and request data while the service processes a request</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Delivers the notification email</td>
              <td>The inquiry details, your email address, and our mailbox address</td>
            </tr>
            <tr>
              <td>Google (Gmail)</td>
              <td>Hosts our business mailbox, where inquiries are received</td>
              <td>The inquiry email and any replies</td>
            </tr>
          </tbody>
        </table>
        <p>
          The inquiry function runs on Vercel&apos;s edge runtime, and the repository does not pin a processing region.
        </p>
        <p>
          The Website loads its fonts and images from our own hosting. It does not load content from other websites, such
          as embedded videos, maps, or social media widgets. Fonts are added during the build, so visitors&apos; browsers
          do not contact a font service.</p>
      </>
    ),
  },
  {
    id: "storage-retention",
    title: "Data storage, retention, deletion, and security",
    content: (
      <>
        <h3>Where inquiry data is kept</h3>
        <ul>
          <li>Our business mailbox, which holds the inquiry email and any replies.</li>
          <li>The email provider&apos;s sending records, kept under the provider&apos;s retention policy.</li>
          <li>The inquiry service&apos;s platform logs, which do not record inquiry content by design.</li>
        </ul>
        <h3>Retention and deletion</h3>
        <p>
          We keep inquiry information only for as long as reasonably necessary to respond to inquiries, manage business
          relationships, document projects, resolve disputes, and meet legal obligations. We review stored inquiry emails
          periodically and delete information that is no longer required, subject to legal obligations and legitimate
          recordkeeping needs.
        </p>
        <p>
          The cookie choice record expires after 365 days, or sooner when you clear your browser storage. We ask for
          your choice again when it expires.
        </p>
        <h3>Security</h3>
        <p>The inquiry service is designed to:</p>
        <ul>
          <li>accept requests only from the Website&apos;s address;</li>
          <li>check each field on the server and limit request sizes;</li>
          <li>limit how often one address can send inquiries;</li>
          <li>keep the email provider&apos;s secret key on the server only, never in the Website&apos;s code;</li>
          <li>avoid writing inquiry content to logs.</li>
        </ul>
        <p>
          No online service can guarantee security.</p>
        <h3>Personal data breaches</h3>
        <p>If we become aware of a personal data breach affecting personal data we hold, we intend to:</p>
        <ul>
          <li>identify and contain the incident;</li>
          <li>investigate its scope and the information affected;</li>
          <li>preserve relevant evidence and document our response;</li>
          <li>assess applicable notification requirements and deadlines;</li>
          <li>notify affected individuals and authorities where the applicable law requires it;</li>
          <li>remediate the underlying issue and review our preventive measures.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Data sharing and disclosure",
    content: (
      <>
        <p>
          We do not sell personal data collected through the Website.
           We share personal data only:
        </p>
        <ul>
          <li>with the service providers listed above, to run the Website and the inquiry service;</li>
          <li>when the law requires it, or when a court or authority makes a valid request;</li>
          <li>to protect our rights, property, or safety, or those of others, where the law allows.</li>
        </ul>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    content: (
      <p>
        Some of our service providers may process personal data outside India.</p>
    ),
  },
  {
    id: "rights",
    title: "Delete your personal data and your rights",
    content: (
      <>
        <p>Subject to the DPDP Act, you may ask us to:</p>
        <ul>
          <li>confirm whether we process your personal data, and give you a summary of it and of the processing;</li>
          <li>correct or update inaccurate or incomplete data;</li>
          <li>erase data that is no longer needed for the purpose it was collected for, or that you have withdrawn consent for;</li>
          <li>nominate another person to exercise your rights if you are unable to do so.</li>
        </ul>
        <p>
          To make a request, email{" "}
          <a href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20request`}>{PRIVACY_EMAIL}</a> with the subject
          &quot;Privacy request&quot;. Give enough detail for us to find your inquiry, such as the reference number.
          We may ask you to verify your identity before we act, in proportion to the request. We aim to acknowledge
          requests within 7 calendar days, and we will respond within the time that applicable law requires.
        </p>
        <p>
          You may also raise a grievance with us. If you are not satisfied with our response, you may approach the Data
          Protection Board of India as the DPDP Act provides.</p>
      </>
    ),
  },
  {
    id: "withdrawal",
    title: "Withdrawing consent",
    content: (
      <>
        <p>
          You can withdraw consent for the use of your personal data at any time, by emailing{" "}
          <a href={`mailto:${PRIVACY_EMAIL}?subject=Withdraw%20consent`}>{PRIVACY_EMAIL}</a>. You can change your cookie
          choice at any time from the Cookie Settings link in the footer.
        </p>
        <p>
          After you withdraw consent, we stop using the data for the purpose you withdrew from. We may keep records we
          are required by law to keep.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        The Website and our services are intended for businesses and adults. We do not knowingly collect personal data
        from children under 18. If you believe a child has sent us information, email us and we will delete it.</p>
    ),
  },
  {
    id: "links",
    title: "Links to other websites",
    content: (
      <p>
        The Website does not currently link to other websites. If we add such links, those websites are not covered by this
        policy, and we recommend that you read the privacy policy of each site you visit.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy. The &quot;Last updated&quot; date at the top shows when it last changed. We
        publish each revised version on the Website. For material changes, we will give additional notice through an
        appropriate channel where the law requires it or where it is reasonably necessary. Continuing to browse the
        Website does not by itself count as consent where the law requires a specific affirmative consent.
      </p>
    ),
  },
  {
    id: "privacy-contact",
    title: "Contact us",
    content: (
      <>
        <p>
          For any privacy question, request, or complaint, contact us at{" "}
          <a href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20question`}>{PRIVACY_EMAIL}</a>.
        </p>
        <ul>
          <li>
            Bharath Aadhya Intelligence, Bengaluru, India
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="30 October 2026"
      intro={
        <p>
          This page explains what personal data we handle when you use our website and send us a project inquiry, why we
          handle it, who helps us, and what choices you have.
        </p>
      }
      sections={sections}
    />
  );
}
