export default function Terms() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-8">Terms of Service</h1>

          <p className="text-slate-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">1. Agreement to Terms</h2>
          <p className="text-slate-600 mb-6">
            By accessing and using The Drinks Map website (thedrinksmap.com), you accept and agree to be
            bound by the terms and provision of this agreement. These Terms of Service govern your use
            of our Service operated by The Drinks Map.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">2. Description of Service</h2>
          <p className="text-slate-600 mb-6">
            The Drinks Map is a directory website that provides information about breweries, distilleries,
            and vineyards in the United Kingdom. We aggregate publicly available information to help users
            discover drinks establishments across the UK.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">3. Use License</h2>
          <p className="text-slate-600 mb-4">
            Permission is granted to temporarily access the materials on The Drinks Map for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
            and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-6">
            <li>Modify or copy the materials</li>
            <li>Use the materials for commercial purposes or for public display</li>
            <li>Remove copyright or proprietary notations from the materials</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">4. Content Accuracy</h2>
          <p className="text-slate-600 mb-6">
            While we strive to provide accurate and up-to-date information about establishments, we cannot
            guarantee the completeness, accuracy, or timeliness of all information displayed. Users should
            verify information directly with establishments before making plans or decisions.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">5. External Links</h2>
          <p className="text-slate-600 mb-6">
            Our Service may contain links to third-party websites or services. We are not responsible for
            the content, privacy policies, or practices of any third-party websites or services. You acknowledge
            and agree that we shall not be responsible for any damages or loss caused by use of such content.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">6. Prohibited Uses</h2>
          <p className="text-slate-600 mb-4">You may not use our Service:</p>
          <ul className="list-disc pl-6 text-slate-600 mb-6">
            <li>For any unlawful purpose or to solicit others to unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To collect or track the personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">7. Disclaimer</h2>
          <p className="text-slate-600 mb-6">
            The information on this website is provided on an 'as is' basis. To the fullest extent permitted
            by law, this Company excludes all representations, warranties, conditions and terms whether
            express, implied, statutory or otherwise.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">8. Limitations of Liability</h2>
          <p className="text-slate-600 mb-6">
            In no event shall The Drinks Map or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of
            the use or inability to use the materials on The Drinks Map website.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">9. Revisions and Errata</h2>
          <p className="text-slate-600 mb-6">
            The materials appearing on The Drinks Map website could include technical, typographical, or
            photographic errors. The Drinks Map does not warrant that any of the materials on its website
            are accurate, complete, or current.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">10. Governing Law</h2>
          <p className="text-slate-600 mb-6">
            These terms and conditions are governed by and construed in accordance with the laws of England
            and Wales, and you irrevocably submit to the exclusive jurisdiction of the courts in that state
            or location.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">11. Changes to Terms</h2>
          <p className="text-slate-600 mb-6">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
            If a revision is material, we will try to provide at least 30 days notice prior to any new
            terms taking effect.
          </p>

          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">12. Contact Information</h2>
          <p className="text-slate-600 mb-6">
            If you have any questions about these Terms of Service, please contact us at:{" "}
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