"use client";

import { motion } from "framer-motion";
import EventCard from "@/components/events/EventCard";

export interface EventItem {
  title: string;
  description: string;
  image?: string;
  date: string;
  location: string;
  registrationLink: string;
}

export interface EventItemWithId extends EventItem {
  _id?: string;
}

interface EventsSectionProps {
  title: string;
  events: EventItemWithId[];
  flippedId: string | null;
  onToggle: (id: string) => void;
  isAdmin?: boolean;
  onEdit?: (event: EventItemWithId) => void;
  onDelete?: (event: EventItemWithId) => void;
}

export default function EventsSection({
  title,
  events,
  flippedId,
  onToggle,
  isAdmin,
  onEdit,
  onDelete,
}: EventsSectionProps) {
  return (
    <section className="text-white px-4 sm:px-10 lg:px-20 py-6">
      <div className="mx-auto max-w-8xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-3xl md:text-4xl font-normal leading-snug text-white"
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((ev, i) => {
            const id = `${title}-${i}`;
            return (
              <motion.div
                key={id}
                className="h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <EventCard
                  title={ev.title}
                  description={ev.description}
                  image={ev.image}
                  date={ev.date}
                  location={ev.location}
                  registrationLink={ev.registrationLink}
                  isFlipped={flippedId === id}
                  onToggle={() => onToggle(id)}
                  isAdmin={isAdmin}
                  onEdit={() => onEdit?.(ev)}
                  onDelete={() => onDelete?.(ev)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
