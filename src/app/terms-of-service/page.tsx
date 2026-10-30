import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Placeholder, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Bharath Aadhya Intelligence",
  description:
    "Terms governing use of the Bharath Aadhya Intelligence website and the enquiry process for software development and AI services.",
};

const CONTACT_EMAIL = "bharathaadhyaintelligence@gmail.com";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the website of Bharath Aadhya Intelligence
          (&quot;BAI&quot;, &quot;we&quot;, &quot;us&quot;) and the enquiry process described on it. By using the
          website, you agree to these Terms. If you do not agree, please do not use the website.
        </p>
        <p>
          These Terms are general terms for the website. Services for a specific project are provided under a separate
          written proposal or agreement signed by both parties (a &quot;Project Agreement&quot;). A Project Agreement may
          add to or change these Terms for that project. Where a Project Agreement conflicts with these Terms, the Project
          Agreement applies to that project.
        </p>
      </>
    ),
  },
  {
    id: "company-identity",
    title: "Company identity",
    content: (
      <ul>
        <li>
          <strong>Business name:</strong> Bharath Aadhya Intelligence
        </li>
        <li>
          <strong>Location:</strong> Bengaluru, India
        </li>
        <li>
          <strong>Contact:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
        <li>
          <strong>Legal entity name, type, and registration number:</strong>{" "}
          <Placeholder>[TO CONFIRM: registered legal name and entity type. Do not publish a registration number unless it is verified]</Placeholder>
        </li>
        <li>
          <strong>Registered or business address:</strong>{" "}
          <Placeholder>[TO CONFIRM: address]</Placeholder>
        </li>
        <li>
          <strong>GST registration number:</strong>{" "}
          <Placeholder>[TO CONFIRM: GST registration number, if registered]</Placeholder>
        </li>
      </ul>
    ),
  },
  {
    id: "website-usage",
    title: "Website usage",
    content: (
      <>
        <p>You may use the website for lawful purposes. You must not:</p>
        <ul>
          <li>try to disrupt, overload, or gain unauthorised access to the website or its hosting services;</li>
          <li>submit false, misleading, or abusive information, or automated submissions to the enquiry form;</li>
          <li>copy or scrape the website in a way that harms it or breaks the law;</li>
          <li>use the website to send unsolicited messages or to infringe anyone else&apos;s rights.</li>
        </ul>
        <p>
          The website content, including text, design, logos, and graphics, belongs to BAI or its licensors. You may
          view and print it for personal or internal reference. You may not reproduce it for commercial use without our
          written permission.
        </p>
        <p>
          The information on the website is general. It is not a proposal, a quotation, or a promise about any specific
          project.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and user responsibilities",
    content: (
      <>
        <p>
          The website and our services are intended for businesses, startups, and adults. If you submit an enquiry on
          behalf of a company, you confirm that you are authorised to do so.
        </p>
        <p>
          You are responsible for the accuracy of the information you provide, including your contact details, and for
          keeping any access details that we give you confidential.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Description of services",
    content: (
      <>
        <p>BAI provides software services to businesses and startups, including:</p>
        <ul>
          <li>website development;</li>
          <li>mobile application development;</li>
          <li>AI development and integration;</li>
          <li>AI automation;</li>
          <li>custom software development.</li>
        </ul>
        <p>
          The descriptions on the website are summaries only. The scope of each service is set out in the proposal or
          Project Agreement for that project.
        </p>
      </>
    ),
  },
  {
    id: "enquiries-proposals",
    title: "Project enquiries and proposals",
    content: (
      <>
        <p>
          Sending an enquiry through the website does not create a contract, and it does not oblige either party to
          proceed. We may reply, ask questions, arrange a call, or send a proposal.
        </p>
        <p>
          A proposal is an offer only once it is issued in writing by BAI. It is binding only after both parties sign a
          Project Agreement, or confirm acceptance in writing.{" "}
          <Placeholder>[TO CONFIRM: acceptance method and the validity period of proposals]</Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "scope-deliverables",
    title: "Project scope and deliverables",
    content: (
      <p>
        The scope of work, deliverables, technical requirements, and any exclusions for each project are set out in the
        Project Agreement. Anything not listed there is outside the scope unless we agree in writing to add it. We will
        describe the deliverables in terms you can verify. Acceptance criteria will be set out in the Project Agreement.{" "}
        <Placeholder>[TO CONFIRM: acceptance procedure, including testing and sign-off]</Placeholder>
      </p>
    ),
  },
  {
    id: "milestones-timelines",
    title: "Milestones and delivery timelines",
    content: (
      <p>
        Timelines and milestones are estimates unless the Project Agreement states otherwise. Delays caused by the
        client, such as late feedback, missing content or access, or late payment, extend the timeline by the period of
        the delay. We will tell you as soon as we expect a timeline to change.{" "}
        <Placeholder>[TO CONFIRM: any delay remedies or penalties to be included, if any]</Placeholder>
      </p>
    ),
  },
  {
    id: "client-responsibilities",
    title: "Client responsibilities",
    content: (
      <>
        <p>Unless the Project Agreement says otherwise, the client is responsible for:</p>
        <ul>
          <li>giving timely decisions, feedback, and approvals;</li>
          <li>providing content, materials, data, and access to systems and third-party accounts when we need them;</li>
          <li>making sure that the materials it provides do not infringe any third party&apos;s rights;</li>
          <li>paying third-party fees, such as hosting, licences, and API usage, unless the Project Agreement says otherwise.</li>
        </ul>
      </>
    ),
  },
  {
    id: "scope-changes",
    title: "Scope changes and additional work",
    content: (
      <p>
        Either party may request a change to the scope. We will assess the effect on the scope, cost, and timeline and
        confirm it in writing as a change request. Work on a change starts only after the change request is approved.{" "}
        <Placeholder>[TO CONFIRM: change request process and any pricing rates for additional work]</Placeholder>
      </p>
    ),
  },
  {
    id: "pricing-payment",
    title: "Pricing and payment arrangements",
    content: (
      <>
        <p>
          Prices, currency, payment schedule, and any taxes are set out in each Project Agreement. Prices shown on the
          website, if any, are indicative only.
        </p>
        <p>
          <Placeholder>
            [TO CONFIRM: standard payment structure, for example any advance payment, milestone payments, and the payment
            method. Also confirm how GST is shown]
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "invoices-late-payment",
    title: "Invoices and late payments",
    content: (
      <p>
        We issue invoices as set out in the Project Agreement. Payment is due by the date stated on the invoice.{" "}
        <Placeholder>
          [TO CONFIRM: payment due period, late payment charges or interest, and any right to pause work until payment is
          received]
        </Placeholder>
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property ownership and licensing",
    content: (
      <>
        <p>
          BAI keeps ownership of its pre-existing tools, frameworks, libraries, templates, know-how, and general skills.
          Nothing in these Terms transfers them.
        </p>
        <p>
          <Placeholder>
            [TO CONFIRM: ownership of project-specific deliverables. Options include transfer on full payment, a licence
            to the client, or a split. State the trigger, for example full payment, and any exceptions]
          </Placeholder>
        </p>
        <p>
          <Placeholder>[TO CONFIRM: rights to use BAI&apos;s name and portfolio description of the project]</Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party software, APIs, and open-source components",
    content: (
      <>
        <p>
          Our deliverables may include or rely on third-party software, cloud services, APIs, and open-source components.
          Each is governed by its own licence and terms, which the client must accept where required. We are not
          responsible for the availability, pricing, or changes to third-party services, except as the Project Agreement
          provides.
        </p>
        <p>
          <Placeholder>[TO CONFIRM: how open-source licences are documented, and who holds the third-party accounts]</Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "ai-services",
    title: "AI services, external dependencies, and limitations",
    content: (
      <>
        <p>
          AI systems can produce incorrect, incomplete, or biased output. Outputs from AI models must be reviewed by the
          client before they are relied on. We do not guarantee the accuracy of any model output or a specific level of
          model performance unless the Project Agreement states it.
        </p>
        <p>
          Some AI features depend on external model providers. Their availability, pricing, rate limits, and terms can
          change without notice. Their terms apply to any use of their services.
        </p>
        <p>
          <Placeholder>
            [TO CONFIRM: which data is sent to third-party AI providers, whether the client may opt out, and how training
            on client data is excluded]
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <p>
        Each party will keep confidential any non-public information that the other party shares for the purpose of an
        enquiry or project and marks as confidential, or that a reasonable person would treat as confidential. They will
        use it only for that purpose. This does not apply to information that is public, already known to the receiving
        party, independently developed, or that must be disclosed by law.{" "}
        <Placeholder>[TO CONFIRM: duration of confidentiality obligations]</Placeholder>
      </p>
    ),
  },
  {
    id: "privacy-data",
    title: "Privacy and data handling",
    content: (
      <p>
        We handle personal data as described in our{" "}
        <Link href="/privacy-policy/">Privacy Policy</Link>. Where we process a client&apos;s customer or end-user data for a
        project, the Project Agreement will set out the roles of each party and the data handling terms.{" "}
        <Placeholder>[TO CONFIRM: data processing terms to be used in Project Agreements]</Placeholder>
      </p>
    ),
  },
  {
    id: "cancellation-termination",
    title: "Project cancellations and termination",
    content: (
      <p>
        Either party may end a Project Agreement as its terms provide. If a project is cancelled, the client pays for the
        work completed up to the date of cancellation, and for any non-refundable commitments made at the client&apos;s
        request.{" "}
        <Placeholder>[TO CONFIRM: notice period for termination and the handling of work in progress]</Placeholder>
      </p>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    content: (
      <p>
        These Terms do not provide a general refund. Refunds, if any, are governed by the Project Agreement.{" "}
        <Placeholder>[TO CONFIRM: refund policy, including any non-refundable deposits]</Placeholder>
      </p>
    ),
  },
  {
    id: "warranties-liability",
    title: "Warranties and limitations of liability",
    content: (
      <>
        <p>
          The website is provided on an as-is basis, and information on it may change without notice. We do not warrant
          that the website will always be available or error-free.
        </p>
        <p>
          <Placeholder>
            [TO CONFIRM: warranties given for delivered work, the warranty period, and any limit on liability and how it
            is calculated]
          </Placeholder>
        </p>
        <p>
          Nothing in these Terms excludes or limits any liability or right that cannot be excluded or limited under
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: "maintenance-support",
    title: "Maintenance and support",
    content: (
      <p>
        Maintenance and support are not included in a project unless the Project Agreement says so.{" "}
        <Placeholder>[TO CONFIRM: support hours, response times, and maintenance fees, if offered]</Placeholder>
      </p>
    ),
  },
  {
    id: "disputes",
    title: "Dispute resolution",
    content: (
      <p>
        If a dispute arises, the parties will first try to resolve it by good-faith discussion between their
        representatives.{" "}
        <Placeholder>
          [TO CONFIRM: escalation steps, time limits, and whether disputes go to arbitration under the Arbitration and
          Conciliation Act, 1996, including the seat and language]
        </Placeholder>
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    content: (
      <p>
        These Terms are governed by the laws of India.{" "}
        <Placeholder>[TO CONFIRM: courts with jurisdiction, for example the courts in Bengaluru, Karnataka]</Placeholder>
      </p>
    ),
  },
  {
    id: "updates",
    title: "Terms updates",
    content: (
      <p>
        We may update these Terms. The &quot;Last updated&quot; date at the top shows the latest version. Updated Terms
        apply to use of the website from the date they are published. A Project Agreement signed before an update
        continues to be governed by the Terms that applied when it was signed, unless it says otherwise.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact information",
    content: (
      <>
        <p>
          For questions about these Terms, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          <Placeholder>[TO CONFIRM: postal address for formal notices]</Placeholder>
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="30 October 2026 (draft)"
      intro={
        <p>
          These terms explain the rules for using our website and how project enquiries are handled. Each project is
          governed by its own written agreement.
        </p>
      }
      sections={sections}
    />
  );
}
