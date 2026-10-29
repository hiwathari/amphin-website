import { FAQ } from "@/lib/amosProduct";

export default function AmosFaq() {
  return (
    <div className="am-faq">
      {FAQ.map(([q, a]) => (
        <details key={q}><summary>{q}</summary><p>{a}</p></details>
      ))}
    </div>
  );
}
