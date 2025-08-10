"use client";

function yearsSince(dateStr: string) {
  const start = new Date(dateStr);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years--;
  return years;
}

export default function About() {
  const startDate = "2021-10-01";
  const years = yearsSince(startDate);

  const baseProjects = 3;
  const projectsDelivered = baseProjects + years * 3;

  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h3 className="text-3xl font-bold text-white mb-10 text-center">About Me</h3>

        <p className="mt-4 text-white/80 leading-relaxed text-center max-w-3xl mx-auto">
          I’m a software engineer who loves solving complex problems and turning them into simple, reliable solutions.
          Most of my work has been in <span className="text-white font-medium">FinTech/Banking</span> and{" "}
          <span className="text-white font-medium">Logistics &amp; Supply Chain</span>, building systems that people
          and businesses depend on every day.
        </p>

        <p className="mt-4 text-white/80 leading-relaxed text-center max-w-3xl mx-auto">
          With <span className="text-white font-medium">{years}+ years</span> in the field and{" "}
          <span className="text-white font-medium">{projectsDelivered}+ projects</span> delivered, I enjoy working with{" "}
          <span className="text-white font-medium">Java/Spring Boot</span>, <span className="text-white font-medium">Kafka</span>,
          and cloud technologies. What really drives me is creating software that’s easy to maintain, performs well,
          and makes someone’s day a little easier.
        </p>
      </div>
    </section>
  );
}
