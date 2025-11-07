export default function Privacy() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-8">Privacy Policy</h1>

          <p className="text-slate-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">1. Introduction</h2>
          <p className="text-slate-600 mb-6">
            Welcome to The Drinks Map ("we," "our," or "us"). This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website thedrinksmap.com
            (the "Service").
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-slate-700 mb-3">2.1 Information You Provide</h3>
          <p className="text-slate-600 mb-4">
            We may collect information you provide directly to us, such as:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-6">
            <li>Contact information when you email us</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-700 mb-3">2.2 Automatically Collected Information</h3>
          <p className="text-slate-600 mb-4">
            When you access our Service, we may automatically collect:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-6">
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-slate-600 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-slate-600 mb-6">
            <li>Provide and maintain our Service</li>
            <li>Improve user experience</li>
            <li>Respond to your inquiries</li>
            <li>Analyze usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">4. Information Sharing</h2>
          <p className="text-slate-600 mb-6">
            We do not sell, trade, or otherwise transfer your personal information to third parties without
            your consent, except as described in this Privacy Policy or as required by law.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">5. Data Security</h2>
          <p className="text-slate-600 mb-6">
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">6. Cookies</h2>
          <p className="text-slate-600 mb-6">
            Our website may use cookies to enhance user experience. You can choose to disable cookies
            through your browser settings, though this may affect website functionality.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">7. Third-Party Links</h2>
          <p className="text-slate-600 mb-6">
            Our Service may contain links to third-party websites. We are not responsible for the privacy
            practices of these external sites and encourage you to review their privacy policies.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">8. Your Rights</h2>
          <p className="text-slate-600 mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">9. Changes to This Policy</h2>
          <p className="text-slate-600 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page with an updated "Last updated" date.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">10. Contact Us</h2>
          <p className="text-slate-600 mb-6">
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a
              href="mailto:thedrinksmap@weltodigital.com"
              className="text-amber-700 hover:text-amber-600 transition-colors"
            >
              thedrinksmap@weltodigital.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}