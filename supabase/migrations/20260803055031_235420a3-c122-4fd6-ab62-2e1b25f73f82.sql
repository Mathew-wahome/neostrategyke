REVOKE EXECUTE ON FUNCTION public.is_staff(UUID) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM anon, authenticated;

INSERT INTO public.blog_posts (title, slug, excerpt, content, category, status, published_at, seo_title, seo_description) VALUES
('Founder dependency is a design problem',
 'founder-dependency-is-a-design-problem',
 'If the business stops when you step away, that is not a discipline issue. It is a structure that was never drawn.',
 E'Most founders describe the same week. The inbox sets the agenda, the team waits for answers, and the work that would actually move the business forward keeps sliding to next week.\n\nThe instinct is to treat this as a personal failing: better focus, earlier mornings, a stricter calendar. But the pattern repeats across very different founders with very different habits, which tells you it is not about the person.\n\nIt is about design. A business that was never built to run without its founder will always route every decision back through them. Redesign the routing and the week changes, without anyone working harder.\n\nStart by writing down every decision that only you can make this week. That list is your roadmap.',
 'Systems', 'published', '2026-07-14T08:00:00Z',
 'Founder dependency is a design problem — NeoStrategy',
 'If the business stops when you step away, that is a structure problem, not a discipline problem.'),
('What calm execution actually looks like',
 'what-calm-execution-actually-looks-like',
 'Calm is not a mood. It is what a business feels like when delivery is predictable and the team knows what happens next.',
 E'Calm execution is often mistaken for slowness. It is the opposite. A calm business moves faster because nothing waits for a decision that has already been made once.\n\nIn practice it looks like this: delivery follows the same shape every time, ownership is obvious, and the weekly rhythm surfaces problems before clients do.\n\nNone of that requires more software. It requires the handful of systems that hold the business together to be written down, agreed, and actually used.',
 'Operations', 'published', '2026-06-28T08:00:00Z',
 'What calm execution actually looks like — NeoStrategy',
 'Calm is what a business feels like when delivery is predictable and the team knows what happens next.'),
('The first three systems to install',
 'the-first-three-systems-to-install',
 'Before dashboards and automations, three systems carry most of the weight in a service business.',
 E'Client onboarding, delivery, and the weekly operating rhythm. Install those three and most of the daily chaos in a service business quietly disappears.\n\nOnboarding sets the expectation. Delivery makes the work repeatable. The weekly rhythm is where the business looks at itself honestly, on a schedule, instead of only when something breaks.\n\nEverything else — reporting, KPIs, automation — sits on top of these. Build them in the wrong order and the top layer keeps collapsing.',
 'Playbook', 'published', '2026-06-09T08:00:00Z',
 'The first three systems to install — NeoStrategy',
 'Onboarding, delivery, and the weekly operating rhythm carry most of the weight in a service business.');