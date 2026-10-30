import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

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
          These Terms are general terms for the website and for pre-contract enquiries. Services for a specific project
          are provided under a separate written proposal or agreement signed by both parties (a &quot;Project
          Agreement&quot;). A Project Agreement may add to or change these Terms for that project. Where a Project
          Agreement conflicts with these Terms, the Project Agreement applies to that project.
        </p>
      </>
    ),
  },
  {
    id: "company-identity",
    title: "About us",
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
      </ul>
    ),
  },
  {
    id: "website-usage",
    title: "Acceptable use",
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
    title: "Eligibility and responsibilities",
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
    title: "Scope of services",
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
          A proposal is valid for 14 calendar days from its date, unless the proposal states otherwise. A proposal is an
          offer only once it is issued in writing by BAI. It becomes binding when the client accepts it in an agreed
          written form, such as a signed Project Agreement or an explicit written acceptance.
        </p>
        <p>
          Work begins only after the acceptance conditions and the initial payment have been met, unless both parties
          agree otherwise in writing.
        </p>
      </>
    ),
  },
  {
    id: "scope-deliverables",
    title: "Project scope and deliverables",
    content: (
      <p>
        The scope of work, deliverables, technical requirements, and exclusions for each project are set out in the
        Project Agreement. Anything not listed there is outside the scope unless we agree in writing to add it. Acceptance
        criteria are set out in the Project Agreement.</p>
    ),
  },
  {
    id: "milestones-timelines",
    title: "Milestones and delivery timelines",
    content: (
      <p>
        Timelines and milestones are estimates unless the Project Agreement states otherwise. Delays caused by the client,
        such as late feedback, missing content or access, or late payment, extend the timeline by the period of the
        delay. We will tell you as soon as we expect a timeline to change.
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
        confirm it in writing as a change request. Work on a change starts only after the change request is approved.</p>
    ),
  },
  {
    id: "pricing-payment",
    title: "Pricing and payment arrangements",
    content: (
      <>
        <p>
          Unless a written proposal specifies another currency, prices are in Indian Rupees (INR) for projects based in
          India. The following is the standard payment structure, which each proposal or Project Agreement may vary:
        </p>
        <ul>
          <li>
            <strong>Initial payment:</strong> 40% of the project fee in advance.
          </li>
          <li>
            <strong>Milestone payment:</strong> 40% on the agreed intermediate milestone.
          </li>
          <li>
            <strong>Final payment:</strong> 20% before final handover or production deployment, as specified in the
            proposal.
          </li>
        </ul>
        <p>Prices shown on the website, if any, are indicative only.</p>
      </>
    ),
  },
  {
    id: "invoices-late-payment",
    title: "Invoices and late payments",
    content: (
      <>
        <p>
          We issue invoices for each payment. Each invoice is due within 7 calendar days of its date, unless the parties
          agree otherwise in writing.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property ownership and licensing",
    content: (
      <>
        <p>
          Upon receipt of full payment, ownership of the specifically commissioned deliverables transfers to the client, to
          the extent agreed in the applicable Project Agreement and permitted by law.
        </p>
        <p>
          BAI keeps ownership of its pre-existing tools, reusable libraries, frameworks, general know-how, and any materials
          not specifically assigned to the client.
        </p>
        <p>
          Third-party software, open-source components, stock assets, and external AI services remain subject to their own
          licences and terms.
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
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <>
        <p>
          Each party will protect the other party&apos;s confidential information during the engagement and for 3 years
          after it ends. Confidential information is non-public information that the other party shares for the purpose of
          an enquiry or project and marks as confidential, or that a reasonable person would treat as confidential.
        </p>
        <p>
          Trade secrets remain protected for as long as they qualify as trade secrets under applicable law.
        </p>
        <p>
          These obligations do not apply to information that is public, that the receiving party independently developed,
          that the receiving party already lawfully knew, or that must be disclosed by law.
        </p>
      </>
    ),
  },
  {
    id: "privacy-data",
    title: "Privacy and data handling",
    content: (
      <p>
        We handle personal data as described in our <Link href="/privacy-policy/">Privacy Policy</Link>. Where we process a
        client&apos;s customer or end-user data for a project, the Project Agreement will set out the roles of each party
        and the data handling terms.</p>
    ),
  },
  {
    id: "cancellation-termination",
    title: "Project cancellations and termination",
    content: (
      <>
        <p>
          Either party may end an ongoing engagement by giving 14 calendar days&apos; written notice, subject to the
          applicable Project Agreement.
        </p>
        <p>
          Either party may terminate immediately for a material breach by the other party, where the Project Agreement
          allows it and after any notice and cure period it requires.
        </p>
        <p>
          On termination, the client pays for completed work, committed expenses, and work in progress up to the termination
          date. We remove the client&apos;s access where appropriate, and we deliver the work the client has paid for.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    content: (
      <>
        <p>
          Payments for completed and accepted work are generally non-refundable, subject to applicable law and the Project
          Agreement.
        </p>
        <p>
          If a project is cancelled, the amount due is calculated from completed work, agreed milestones, non-cancellable
          expenses, and any refund rights that apply by law. We refund any undisputed balance after that calculation. The
          proposal states how advance payments and unfinished milestones are handled.
        </p>
      </>
    ),
  },
  {
    id: "warranties-liability",
    title: "Warranties and limitations of liability",
    content: (
      <>
        <p>
          The website is provided as it is, and its information may change without notice. We do not warrant that the
          website will always be available or error-free.
        </p>
        <p>
          For delivered work, we warrant for 30 days after final delivery that reproducible defects do not cause the
          deliverable to materially fail to meet the written specifications in the Project Agreement. This warranty does not
          cover new features, changes to third-party services, client modifications, or issues outside the agreed scope,
          where the law allows.
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
        Post-launch support and ongoing maintenance are not included unless the proposal or Project Agreement expressly
        states them. Where support is included, the agreement specifies the support period, covered services, communication
        channel, response targets, exclusions, and fees. We do not promise round-the-clock availability or fixed resolution
        times unless the agreement says so.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "Dispute resolution",
    content: (
      <>
        <p>If a dispute arises, the parties will try to resolve it in the following order:</p>
        <ol>
          <li>good-faith written discussions between the parties&apos; representatives;</li>
          <li>mediation, if both parties agree to it;</li>
          <li>
            arbitration, but only where the parties have signed an arbitration agreement that is legally enforceable.</li>
        </ol>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    content: (
      <p>
        These Terms are governed by the laws of India. Subject to applicable law and a valid jurisdictional connection, the
        courts in Bengaluru, Karnataka, India, have jurisdiction.</p>
    ),
  },
  {
    id: "updates",
    title: "Terms updates",
    content: (
      <p>
        We may update these Terms. The &quot;Last updated&quot; date at the top shows the latest version. Updated Terms
        apply to use of the website from the date they are published. A Project Agreement signed before an update continues
        to be governed by the Terms that applied when it was signed, unless it says otherwise.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>
          For questions about these Terms, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="30 October 2026"
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
