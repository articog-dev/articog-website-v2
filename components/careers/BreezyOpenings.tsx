const roles = [
  "AI Business Development Analyst",
  "AI Visual Designer",
  "AI Filmmaker",
  "AI Video Editor & Generator",
  "AI Engineer",
  "Software Developer",
];

export function BreezyOpenings() {
  return (
    <div className="min-w-0">
      <p className="mb-6 text-base leading-7 text-white/75 md:text-lg">
        We&apos;re currently looking for creative and driven talent to join us across the following roles:
      </p>
      <ul className="grid list-none gap-4 md:grid-cols-2" aria-label="Open roles">
        {roles.map((role) => (
          <li key={role} className="min-w-0 list-none">
            <div className="flex min-h-40 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition-colors duration-200">
              <h3 className="text-balance font-sans text-[clamp(1.35rem,2vw,2rem)] font-medium leading-tight tracking-[-0.04em] text-white">
                {role}
              </h3>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left md:p-8">
        <p className="font-sans text-[clamp(1.45rem,2.2vw,2.1rem)] font-medium leading-tight tracking-[-0.04em] text-white">
          Interested in joining Articog?
        </p>

        <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
          If you’re interested in any of these opportunities, send your resume/CV along with relevant portfolio or work samples to
          {" "}
          <a
            href="mailto:info@articog.com"
            className="font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            info@articog.com
          </a>
          .
        </p>

        <p className="mt-4 text-base leading-7 text-white/75 md:text-lg">
          Please mention the role you’re applying for in the subject line.
        </p>

        <p className="mt-4 font-sans text-sm uppercase tracking-[0.16em] text-white/60 md:text-base">
          Subject: Application – [Role Name]
        </p>
      </div>
    </div>
  );
}