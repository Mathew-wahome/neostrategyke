UPDATE public.products
SET product_type = 'bundle',
    short_description = 'Every core system a service founder needs, as ready-to-use templates.',
    category = 'Systems',
    featured = true,
    sort_order = 1
WHERE slug = 'service-founder-systems-starter-kit';

INSERT INTO public.products (name, slug, short_description, description, price, currency, product_type, category, featured, sort_order, is_active)
VALUES
  ('Clarity Attracts: The Book', 'clarity-attracts-book',
   'Mary Njoroge on why clarity, not hustle, is what makes a service business scale.',
   'A short, direct book for service founders who are busy but not free. Written from a decade of operations work with Nairobi businesses, it walks through the five layers of a founder operating system and how to install each one without stopping delivery.',
   1800, 'KES', 'ebook', 'Books', true, 2, true),
  ('Delegation Without Drop-Off', 'delegation-without-drop-off',
   'A 6-part video module on handing work over without losing the standard.',
   'Six recorded sessions plus worksheets covering role design, decision rights, handover scripts, quality checks and the weekly review that keeps delegated work honest.',
   7500, 'KES', 'course', 'Modules', true, 3, true),
  ('The SOP Library', 'the-sop-library',
   'Forty editable standard operating procedures for service delivery teams.',
   'Client onboarding, scoping, delivery, review, invoicing, offboarding and internal admin — each one written in plain language and ready to adapt to your business in an afternoon.',
   4500, 'KES', 'template', 'Templates', false, 4, true),
  ('Founder Dashboard Template', 'founder-dashboard-template',
   'The KPI and weekly review dashboard we install with every client.',
   'A spreadsheet system that tracks pipeline, delivery load, cash and team capacity on one page, with a guided setup video and the meeting rhythm that makes it stick.',
   2500, 'KES', 'template', 'Templates', false, 5, true),
  ('Client Onboarding Kit', 'client-onboarding-kit',
   'Welcome packs, scoping forms and kickoff scripts that make you look established.',
   'Everything a new client should receive in their first week, from the welcome email sequence to the kickoff agenda and the expectations one-pager.',
   3200, 'KES', 'template', 'Templates', false, 6, true)
ON CONFLICT (slug) DO NOTHING;
