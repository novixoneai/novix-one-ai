import { useEffect } from "react";
import { setPageMetadata, generateArticleSchema, generateBreadcrumbSchema, ROUTE_META } from "../../lib/seo";

export default function MissedCallsCost() {
  useEffect(() => {
    const meta = ROUTE_META["/blog/missed-calls-cost"];
    setPageMetadata({
      ...meta,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          generateArticleSchema({
            headline: "How to Calculate the Cost of Missed Calls for Your Business",
            description: meta.description,
            url: meta.canonicalUrl!,
            datePublished: "2026-08-28",
          }),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://novixone.co/" },
            { name: "Blog", url: "https://novixone.co/blog/missed-calls-cost" },
            { name: "The Cost of Missed Calls", url: meta.canonicalUrl! },
          ]),
        ],
      },
    });
  }, []);

  return (
    <article className="min-h-screen" style={{ background: '#0d2c4e', color: '#f2f5f9', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
        .blog-header { background: linear-gradient(180deg, rgba(13,44,78,1) 0%, rgba(6,20,38,1) 100%); border-bottom: 1px solid rgba(216,228,241,.16); }
        .blog-h1 { font-family: "Libre Baskerville", serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; color: #f2f5f9; }
        .blog-h2 { font-family: "Libre Baskerville", serif; font-size: 2rem; font-weight: 400; letter-spacing: -0.005em; line-height: 1.2; color: #f2f5f9; margin-top: 2.5rem; margin-bottom: 1rem; }
        .blog-h3 { font-family: "Libre Baskerville", serif; font-size: 1.4rem; font-weight: 400; color: #9bc8ed; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .blog-meta { color: #99aabd; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; }
        .blog-intro { color: #c9d3df; font-size: 1.1rem; line-height: 1.8; max-width: 600px; }
        .blog-list li { color: #c9d3df; line-height: 1.7; }
        .blog-list strong { color: #9bc8ed; font-weight: 600; }
        .blog-box { background: linear-gradient(135deg, rgba(155,200,237,0.08) 0%, rgba(134,213,208,0.05) 100%); border: 1px solid rgba(155,200,237,0.25); border-radius: 8px; padding: 1.5rem; color: #e4c994; }
        .blog-cta { background: linear-gradient(135deg, #9bc8ed 0%, #86d5d0 100%); color: #061426; padding: 1rem 1.5rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; font-weight: 600; text-decoration: none; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .blog-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(155,200,237,0.2); }
        .blog-section { border-top: 1px solid rgba(216,228,241,0.1); padding-top: 2rem; margin-top: 2rem; }
        .blog-section:first-of-type { border-top: none; }
        .blog-divider { border-top: 1px solid rgba(216,228,241,0.16); margin: 3rem 0; }
      `}</style>
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        {/* Header */}
        <header className="blog-header rounded-xl p-8 mb-12 md:p-12">
          <div className="blog-meta mb-6 flex items-center gap-2">
            <span>📊 Market Analysis</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
          <h1 className="blog-h1 mb-6">
            How to Calculate the Cost of Missed Calls for Your Business
          </h1>
          <p className="blog-intro">
            Calculate how much revenue your business loses from missed calls. See the real cost and how AI answering services recover lost income.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8" style={{ color: '#c9d3df' }}>
          <section className="blog-section">
            <h2 className="blog-h2">Introduction</h2>
            <p>
              Every missed call costs you money. But how much?
            </p>
            <p>
              Here's the thing most small business owners don't realize: that unanswered phone isn't just a missed call. It's a customer calling your competitor instead. It's revenue walking out the door. And if you're like most businesses, it's happening dozens of times a month.
            </p>
            <p>
              I get it—you can't be glued to the phone all day. But figuring out exactly how much money you're losing? That's actually pretty eye-opening. And that's where most people get stuck.
            </p>
            <p>
              To calculate your real missed-call cost, you need to know:
            </p>
            <ul className="list-inside space-y-4">
              <li>How many calls you're actually missing per week</li>
              <li>What an average customer is worth to you</li>
              <li>Your conversion rate</li>
            </ul>
            <p>
              Once you have those numbers, the math gets uncomfortable fast. So I built a simple calculator to show you exactly what you're leaving on the table.
            </p>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">The Hidden Cost of Missed Calls: By The Numbers</h2>

            <h3 className="blog-h3">Real-World Example: A Law Firm</h3>
            <p>
              A personal injury law firm in Miami receives 40 calls per week during business hours.
            </p>
            <ul className="list-inside space-y-4">
              <li><strong>Calls received:</strong> 40/week</li>
              <li><strong>Calls missed:</strong> 8/week (after-hours, busy lines)</li>
              <li><strong>Average case value:</strong> $15,000</li>
              <li><strong>Conversion rate:</strong> 1 in 5 qualified calls converts to a case</li>
            </ul>
            <p>
              The math:
            </p>
            <ul className="list-inside space-y-4">
              <li>8 missed calls × (1 in 5 conversion) = 1.6 lost cases/week</li>
              <li>1.6 cases × $15,000 = <strong>$24,000 lost per week</strong></li>
              <li><strong>$96,000 lost per month</strong></li>
              <li><strong>$1.15M lost per year</strong></li>
            </ul>
            <p>
              That's not hypothetical—that's real money walking out the door.
            </p>

            <h3 className="blog-h3">Real-World Example: An HVAC Company</h3>
            <p>
              An HVAC repair company gets 25 calls per day. 20% of those are missed (lunch, job sites, etc.)
            </p>
            <ul className="list-inside space-y-4">
              <li><strong>Calls received:</strong> 25/day (125/week)</li>
              <li><strong>Calls missed:</strong> 5/day (25/week)</li>
              <li><strong>Average service call value:</strong> $250</li>
              <li><strong>Job booking rate:</strong> 60% of qualified calls book</li>
            </ul>
            <p>
              The math:
            </p>
            <ul className="list-inside space-y-4">
              <li>25 missed calls × 60% booking rate = 15 jobs missed/week</li>
              <li>15 jobs × $250 = <strong>$3,750 lost per week</strong></li>
              <li><strong>$15,000 lost per month</strong></li>
              <li><strong>$180,000 lost per year</strong></li>
            </ul>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">Why Missed Calls Cost Way More Than You Think</h2>
            <p>
              Here's what people miss: the damage doesn't stop at that single sale.
            </p>
            <p>
              When someone calls your business and hits voicemail, it's not just a lost transaction. It's a cascade of problems:
            </p>
            <p>
              Your reputation takes a hit when that same customer calls back and gets voicemail again. They're frustrated. They call someone else. Someone who actually picked up.
            </p>
            <p>
              You never find out what they needed or why they called. That's valuable intel, and you just lost it.
            </p>
            <p>
              One customer could've been a repeat client worth 10 times that first sale. But they won't be, because you weren't there to answer.
            </p>
            <p>
              And somewhere, a competitor who <em>did</em> answer is signing them as a client right now.
            </p>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">The Cost Calculator: Find Your Numbers</h2>
            <p>
              Use this simple formula to calculate YOUR missed-call cost:
            </p>
            <div className="blog-box font-mono text-sm my-6">
              (Calls Missed Per Week) × (Conversion Rate) × (Average Customer Value) × 52 weeks = Annual Lost Revenue
            </div>

            <h3 className="blog-h3">Step-by-Step</h3>

            <p><strong>Step 1: How many calls do you miss per week?</strong></p>
            <ul className="list-inside space-y-4">
              <li>Track this for 2 weeks (count calls that go to voicemail, don't connect, or ring out)</li>
              <li>Divide by 2 to get weekly average</li>
              <li>Example: 15 missed calls/week</li>
            </ul>

            <p className="mt-4"><strong>Step 2: What's your conversion rate?</strong></p>
            <ul className="list-inside space-y-4">
              <li>Of qualified inbound calls, what % actually become customers?</li>
              <li>Service businesses: 40-70%</li>
              <li>B2B: 10-30%</li>
              <li>Professional services (law, accounting): 20-40%</li>
              <li>Example: 30% (1 in 3 calls converts)</li>
            </ul>

            <p className="mt-4"><strong>Step 3: What's your average customer value?</strong></p>
            <ul className="list-inside space-y-4">
              <li>First transaction value? Lifetime value?</li>
              <li>For monthly services, use 6-12 months of revenue</li>
              <li>Example: $2,000</li>
            </ul>

            <p className="mt-4"><strong>Step 4: Calculate</strong></p>
            <p>15 missed calls × 30% conversion × $2,000 × 52 weeks = <strong>$468,000 annual lost revenue</strong></p>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">The ROI of Answering Every Call</h2>
            <p>
              An AI answering service costs <strong>$200-500/month</strong> and captures <strong>80-95%</strong> of missed calls.
            </p>

            <h3 className="blog-h3">ROI Calculation</h3>
            <p>Using the example above:</p>
            <ul className="list-inside space-y-4">
              <li>Cost: $300/month ($3,600/year)</li>
              <li>Missed calls currently: 15/week</li>
              <li>Calls recovered: 15 × 85% = 12.75 calls/week</li>
              <li>Revenue recovered: 12.75 × 30% × $2,000 × 52 = <strong>$398,700/year</strong></li>
              <li><strong>Return on Investment: 11,000%</strong></li>
            </ul>
            <p>
              Even if you only recover <strong>half</strong> of missed calls, your ROI is still <strong>5,000%+</strong>.
            </p>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">What Successful Businesses Do</h2>
            <p>
              The businesses that dominate their markets rarely miss calls. Here's why:
            </p>
            <ol className="list-inside space-y-2">
              <li><strong>Appointment booking:</strong> AI answers, confirms details, books appointments</li>
              <li><strong>Lead qualification:</strong> AI asks qualifying questions (budget, timeline, needs)</li>
              <li><strong>After-hours coverage:</strong> Calls answered 24/7, not just 9-5</li>
              <li><strong>No more voicemail tag:</strong> Every call gets a response, every caller feels valued</li>
              <li><strong>Competitive advantage:</strong> While competitors' calls go unanswered, you're converting</li>
            </ol>
          </section>

          <section className="blog-section">
            <h2 className="blog-h2">The Bottom Line</h2>
            <p>
              Here's the reality: most small businesses are bleeding <strong>$10,000 to $500,000+ per year</strong> from missed calls. Some industries get hit harder than others, but this isn't a niche problem—it's happening everywhere.
            </p>
            <p>
              But here's the good news: it's completely fixable. For less than the price of a single missed sale, you could answer every call and recover thousands (sometimes hundreds of thousands) in revenue.
            </p>
          </section>

          <section className="blog-divider pt-8">
            <h2 className="blog-h2" style={{ marginTop: 0 }}>Ready to take action?</h2>
            <div className="space-y-4">
              <p>
                <a href="/#contact" className="blog-cta">
                  Get a free AI answering service assessment →
                </a>
              </p>
              <p style={{ fontSize: '0.95rem', color: '#99aabd' }}>
                See exactly how many calls you're missing and what revenue you could recover.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
