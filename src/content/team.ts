import type { StaticImageData } from "next/image"
import darellAvatar from "@/assets/team/darell-kacou-avatar.jpg"
import darell from "@/assets/team/darell-kacou.jpg"
import magdalenaAvatar from "@/assets/team/magdalena-kayser-avatar.jpg"
import magdalena from "@/assets/team/magdalena-kayser.jpg"

/**
 * Gründer mit Fotos (Porträt 4:5 für „Über uns“, runder Ausschnitt für den Hero). Reihenfolge wie im Text.
 * Die Dateien sind Zuschnitte der Originale in voller Auflösung (JPEG 95 %, ohne Farbunterabtastung);
 * verkleinert und ins WebP-Format gebracht wird erst beim Ausliefern durch next/image (Qualität 92).
 */
export const team: { name: string; role: string; photo: StaticImageData; avatar: StaticImageData }[] = [
  { name: "Magdalena Kayser", role: "Co-Founder", photo: magdalena, avatar: magdalenaAvatar },
  { name: "Darell Kacou", role: "Co-Founder", photo: darell, avatar: darellAvatar },
]
