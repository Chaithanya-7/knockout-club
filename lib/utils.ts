import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeId<T extends { _id: { toString(): string } }>(
  doc: T,
): Omit<T, "_id"> & { _id: string } {
  return { ...doc, _id: doc._id.toString() };
}
