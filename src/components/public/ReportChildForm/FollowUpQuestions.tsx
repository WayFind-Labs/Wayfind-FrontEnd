import type { FollowUpQuestion } from "@/types/public";

export function FollowUpQuestions({ questions, answers, onAnswer }: { questions: FollowUpQuestion[]; answers: Record<string, string>; onAnswer: (id: string, value: string) => void }) {
  return (
    <section className="followup-panel" aria-labelledby="followup-title">
      <div><p className="followup-panel-label">A few helpful details</p><h2 id="followup-title" className="t-section">Can you tell us a little more?</h2></div>
      {questions.map((question) => (
        <div className="field-group" key={question.id}>
          <label className="field-label" htmlFor={`question-${question.id}`}>{question.question}{question.required ? " *" : ""}</label>
          <input id={`question-${question.id}`} className="text-input" value={answers[question.id] ?? ""} onChange={(event) => onAnswer(question.id, event.target.value)} placeholder={question.hint} required={question.required} />
        </div>
      ))}
    </section>
  );
}
