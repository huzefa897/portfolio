import profile from "../assets/profile.jpg";

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-white/75">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-[1.35fr_0.65fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Software Developer • Backend + Full Stack
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Hi, I’m Huzefa.
            <span className="text-white/60">
              {" "}
              I build practical apps with clean backend architecture.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
            Master of Information Technology student (UTS, 2024–2026) focused on
            backend development and full-stack app design. I’ve built real-world
            systems like <span className="text-white">Fluxo</span> (inventory management)
            and <span className="text-white">ClockMate</span> (attendance tracking) using
            Spring Boot, React, and databases like PostgreSQL/MySQL.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip>Spring Boot</Chip>
            <Chip>React + Tailwind</Chip>
            <Chip>PostgreSQL</Chip>
            <Chip>REST APIs</Chip>
            <Chip>JPA/Hibernate</Chip>
            <Chip>Java • C# • JavaScript</Chip>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/projects"
              className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15"
            >
              View Projects →
            </a>

            <a
              href="https://www.linkedin.com/in/huzefa-taher-saleem"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              LinkedIn →
            </a>

            <a
              href="/resume.pdf"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-5 text-xs text-white/50">
            Sydney, NSW • huzefa9246@gmail.com • +61 481 234 110
          </div>
        </div>

        {/* PHOTO */}
        <div className="flex justify-center md:justify-end">
          <div className="w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src={profile}
              alt="Huzefa Saleem"
              className="h-[300px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* RESUME SECTIONS */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Card title="Career Profile">
          Master of IT (Extension) student at UTS with strong focus on backend +
          full-stack design. Comfortable designing REST APIs, database models,
          and building clean maintainable codebases.
        </Card>

        <Card title="Key Projects (Highlights)">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="text-white">Fluxo</span>: Dental inventory system (Spring Boot + React + PostgreSQL)
            </li>
            <li>
              <span className="text-white">ClockMate</span>: Attendance + time tracking (React + Tailwind + Spring Boot)
            </li>
            <li>
              <span className="text-white">RentMate</span>: Car rental billing + receipts (React/TS + Spring Boot/Node)
            </li>
          </ul>
        </Card>

        <Card title="Skills">
          <ul className="list-disc space-y-1 pl-5">
            <li>Frontend: React, Tailwind, Material UI</li>
            <li>Backend: Spring Boot, REST APIs, JPA/Hibernate</li>
            <li>DB: PostgreSQL, MySQL, MongoDB (basic)</li>
            <li>Concepts: OOP, MVC, DSA fundamentals</li>
          </ul>
        </Card>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2">
        <Card title="Experience - Pearl Dental Care (Sydney)">
          Started in Data Entry & IT Support (digital workflows + troubleshooting),
          then moved into Receptionist/Dental Assistant roles. Improved operational
          efficiency by streamlining workflows and implementing small IT solutions.
        </Card>

        <Card title="Experience - Rejolt Technologies (Intern)">
          Built client-specific chatbots/apps using low-code tools (Joonbot, Google Sites, Glide)
          and helped automate user interactions.
        </Card>
      </section>

      <div className="mt-12 border-t border-white/10 pt-8 text-sm text-white/60">
      </div>
    </div>
  );
}
