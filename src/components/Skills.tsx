"use client";

import { MotionConfig, motion } from "framer-motion";

type Level = "w" | "m" | "s"; // w = working, m = mid, s = strong
type Skill = { name: string; level?: Level };
type Cat = { title: string; note?: string; items: Skill[] };

const CATS: Cat[] = [
  {
    title: "Backend",
    note: "APIs, microservices, performance & resilience",
    items: [
      { name: "Java", level: "s" },
      { name: "Spring Boot", level: "s" },
      { name: "Spring WebFlux", level: "m" },
      { name: "Hibernate/JPA", level: "m" },
      { name: "REST", level: "s" },
    ],
  },
  {
    title: "Messaging / Streaming",
    note: "Event-driven design & async pipelines",
    items: [
      { name: "Apache Kafka", level: "s" },
      { name: "Kafka Streams", level: "m" },
      { name: "Resilience4j", level: "m" },
    ],
  },
  {
    title: "Front-end",
    note: "Feature work & integrations",
    items: [
      { name: "React", level: "m" },
      { name: "TypeScript", level: "m" },
      { name: "Redux Toolkit", level: "w" },
    ],
  },
  {
    title: "Cloud / DevOps",
    note: "Containers & basic cloud services",
    items: [
      { name: "AWS (EC2, S3)", level: "w" },
      { name: "Docker", level: "m" },
      { name: "CI/CD (basic)", level: "w" },
    ],
  },
  {
    title: "Databases",
    note: "Relational data modeling & queries",
    items: [
      { name: "MySQL", level: "m" },
      { name: "Sybase", level: "w" },
      { name: "SQL", level: "m" },
    ],
  },
  {
    title: "Testing & Tooling",
    note: "Quality & collaboration",
    items: [
      { name: "JUnit", level: "m" },
      { name: "Cucumber", level: "w" },
      { name: "Mockito", level: "w" },
      { name: "Git, Maven, Jira", level: "m" },
      { name: "Postman, Confluence", level: "m" },
    ],
  },
];

function levelToText(level?: Level) {
  if (level === "s") return "strong";
  if (level === "m") return "mid";
  if (level === "w") return "working";
  return "unspecified";
}

// tiny visual for proficiency (subtle)
function Dots({ level }: { level?: Level }) {
  const fill = level === "s" ? 3 : level === "m" ? 2 : level === "w" ? 1 : 0;
  // match legend colors by using only filled/empty like chips
  return (
    <span className="inline-flex gap-[3px] ml-2 align-middle" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`inline-block w-1.5 h-1.5 rounded-full ${i < fill ? "bg-white/80" : "bg-white/25"
            }`}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="skills" className="relative scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-10 text-center"
          >
              Skills
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-center text-white/60 text-sm"
          >
            Focused on backend systems with hands-on front-end and DevOps to ship end-to-end.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATS.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-[2px] p-5"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="text-white font-semibold">{cat.title}</h4>
                  {cat.note && <span className="text-xs text-white/50">{cat.note}</span>}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <motion.span
                      key={s.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1 rounded border border-white/10 text-sm text-white/85 bg-white/5"
                      aria-label={`${s.name}: ${levelToText(s.level)} proficiency`}
                    >
                      {s.name}
                      <Dots level={s.level} />
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* legend (kept consistent by reusing Dots) */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center">
              strong <Dots level="s" />
            </span>
            <span className="inline-flex items-center">
              mid <Dots level="m" />
            </span>
            <span className="inline-flex items-center">
              working <Dots level="w" />
            </span>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
