import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <Container className="prose prose-gray dark:prose-invert mx-auto">
          <h1>Terms of Service</h1>
          <p className="lead">
            Welcome to Nesta Education. By using our service, you agree to these terms.
          </p>
          
          <h2>1. Account Terms</h2>
          <p>
            You are responsible for maintaining the security of your account and password.
            Nesta Education cannot and will not be liable for any loss or damage from your
            failure to comply with this security obligation.
          </p>

          <h2>2. Service Rules</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Share your account credentials</li>
            <li>Use the service for unauthorized purposes</li>
            <li>Upload malicious content</li>
            <li>Attempt to breach our security measures</li>
          </ul>

          <h2>3. Fair Usage</h2>
          <p>
            Our AI tutoring service is designed to help you learn. Excessive or automated
            usage that degrades the experience for other students is not permitted.
          </p>

          <h2>4. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify you
            of significant changes via email.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms should be sent to us for clarification.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}