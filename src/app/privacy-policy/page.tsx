import type { Metadata } from "next";
import LegalPage, { Placeholder, type LegalSection } from "@/components/legal/LegalPage";

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
          phases.{" "}
          <Placeholder>
            [TO CONFIRM: the commencement dates of the DPDP Act and Rules that apply, and whether any other Indian law
            (for example, the Information Technology Act, 2000 and its rules) requires changes to this policy]
          </Placeholder>{" "}
          Preparing this policy does not mean we have verified compliance with any law.
        </p>
      </>
    ),
  },
  {
    id: "identity",
    title: "Business identity and contact details",
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
            <strong>Legal entity name and type:</strong>{" "}
            <Placeholder>[TO CONFIRM: registered legal name, entity type, and registration number, if any]</Placeholder>
          </li>
          <li>
            <strong>Postal address:</strong>{" "}
            <Placeholder>[TO CONFIRM: registered or business postal address for privacy correspondence]</Placeholder>
          </li>
          <li>
            <strong>Grievance contact:</strong>{" "}
            <Placeholder>[TO CONFIRM: name and contact details of the person who handles privacy grievances]</Placeholder>
          </li>
        </ul>
        <p>
          For personal data you submit through the Project Inquiry form, BAI decides why and how the data is used, so
          BAI is responsible for it.{" "}
          <Placeholder>[TO CONFIRM: this role description under the DPDP Act terms]</Placeholder>
        </p>
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

        <h3>6. Other data</h3>
        <p>
          The footer has a &quot;Stay Updated&quot; email box.{" "}
          <Placeholder>
            [TO CONFIRM: this box is not connected to any mailing list or service. Either connect it and describe the
            service here, or remove it before publishing this policy]
          </Placeholder>{" "}
          We do not currently send marketing emails based on addresses collected through the Website.
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
          To keep records that the law requires, if you become a client.{" "}
          <Placeholder>[TO CONFIRM: records required and their retention period]</Placeholder>
        </li>
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
          rely on your consent, given by sending the form, and on the purpose for which you provided the information.{" "}
          <Placeholder>
            [TO CONFIRM with counsel: the legal ground under sections 6 and 7 of the DPDP Act. Also confirm whether a
            notice must be shown before the form is sent. At present the form does not link to this policy]
          </Placeholder>
        </p>
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
          record of an inquiry.{" "}
          <Placeholder>
            [TO CONFIRM: whether inquiries are also tracked in any other system, such as a spreadsheet or CRM, and if so,
            which]
          </Placeholder>
        </p>
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
            embedded tracking. The Website does not set any cookies.{" "}
            <Placeholder>[TO CONFIRM: re-check this statement against the live site before publication]</Placeholder>
          </li>
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
              <th scope="col">Where data is processed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GitHub Pages (GitHub)</td>
              <td>Hosts the Website as static files</td>
              <td>Standard request data, such as IP address, browser type, and pages requested</td>
              <td>
                <Placeholder>[TO CONFIRM]</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Runs the inquiry service</td>
              <td>The inquiry details and request data while the service processes a request</td>
              <td>
                <Placeholder>[TO CONFIRM: deployment region]</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Delivers the notification email</td>
              <td>The inquiry details, your email address, and our mailbox address</td>
              <td>
                <Placeholder>[TO CONFIRM]</Placeholder>
              </td>
            </tr>
            <tr>
              <td>Google (Gmail)</td>
              <td>Hosts our business mailbox, where inquiries are received</td>
              <td>The inquiry email and any replies</td>
              <td>
                <Placeholder>[TO CONFIRM]</Placeholder>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          The Website loads its fonts and images from our own hosting. It does not load content from other websites, such
          as embedded videos, maps, or social media widgets. Fonts are added during the build, so visitors&apos; browsers
          do not contact a font service.{" "}
          <Placeholder>[TO CONFIRM: re-check this statement against the live site before publication]</Placeholder>
        </p>
        <p>
          <Placeholder>
            [TO CONFIRM: that each provider&apos;s data processing terms have been reviewed and accepted, and that they
            restrict use of the data to providing their service]
          </Placeholder>
        </p>
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
          <Placeholder>
            [TO CONFIRM: how long inquiries are kept, for example until the enquiry is closed plus a set period, and how
            deletion is carried out in the mailbox and at each provider]
          </Placeholder>
        </p>
        <p>
          The cookie choice record expires after 365 days or when you clear your browser storage, whichever happens
          first.{" "}
          <Placeholder>[TO CONFIRM: renewal period]</Placeholder>
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
          No online service can guarantee security.{" "}
          <Placeholder>
            [TO CONFIRM: encryption in transit and at rest provided by each hosting provider, and the rate-limit
            behaviour on the hosting platform. Do not describe encryption until this is verified]
          </Placeholder>
        </p>
        <h3>Personal data breaches</h3>
        <p>
          <Placeholder>
            [TO CONFIRM: breach response procedure, including notice to affected people and to the Data Protection Board
            of India where the DPDP Act requires it]
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Data sharing and disclosure",
    content: (
      <>
        <p>
          We do not sell personal data collected through the Website.{" "}
          <Placeholder>[TO CONFIRM: this commitment]</Placeholder> We share personal data only:
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
        Some of our providers are based outside India or process data outside India. Their data locations are listed in
        the providers table.{" "}
        <Placeholder>
          [TO CONFIRM: the transfer arrangements, and whether any country restriction notified under the DPDP Act
          applies]
        </Placeholder>
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights and privacy requests",
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
          We may ask you to verify your identity before we act.{" "}
          <Placeholder>[TO CONFIRM: response timeline]</Placeholder>
        </p>
        <p>
          You may also raise a grievance with us. If you are not satisfied with our response,{" "}
          <Placeholder>
            [TO CONFIRM: the complaint route to the Data Protection Board of India and when it applies under the DPDP
            Act]
          </Placeholder>
        </p>
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
          are required by law to keep.{" "}
          <Placeholder>[TO CONFIRM: process and timeline for withdrawal]</Placeholder>
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
        from children under 18. If you believe a child has sent us information, email us and we will delete it.{" "}
        <Placeholder>[TO CONFIRM: approach to verifiable parental consent under the DPDP Act, if any]</Placeholder>
      </p>
    ),
  },
  {
    id: "updates",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy. The &quot;Last updated&quot; date at the top shows when it last changed. For
        significant changes, we will{" "}
        <Placeholder>[TO CONFIRM: how changes are notified, for example a banner on the Website]</Placeholder>.
      </p>
    ),
  },
  {
    id: "privacy-contact",
    title: "Privacy contact information",
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
          <li>
            <Placeholder>[TO CONFIRM: postal address and grievance contact]</Placeholder>
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
      lastUpdated="30 October 2026 (draft)"
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
