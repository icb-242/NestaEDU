import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <Container className="prose prose-gray dark:prose-invert mx-auto">
          <h1>Privacy Policy</h1>
          <p className="lead">
            At Nesta Education, we take your privacy seriously. This policy outlines how we collect,
            use, and protect your personal information.
          </p>
          
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Academic records and progress</li>
            <li>Usage data and learning analytics</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Provide and improve our educational services</li>
            <li>Personalize your learning experience</li>
            <li>Track your academic progress</li>
            <li>Communicate with you about your account</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our privacy policy, please contact us.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}