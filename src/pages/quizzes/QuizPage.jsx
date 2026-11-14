import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { getQuizById } from '../../data/quizzes'
import { modules } from '../../data/modules'
import AppLayout from '../../components/layout/AppLayout'
import { ChevronLeft, Trophy, RotateCcw, CheckCircle, XCircle, ArrowRight } from 'lucide-react'

const PHASE = { INTRO: 'intro', ACTIVE: 'active', SUBMITTED: 'submitted' }

export default function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, configured } = useAuth()
  const quiz = getQuizById(id)
  const relatedMod = quiz ? modules.find(m => m.id === quiz.moduleId) : null

  const [phase, setPhase] = useState(PHASE.INTRO)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [score, setScore] = useState(0)
  const submittedRef = useRef(false)

  useEffect(() => {
    setPhase(PHASE.INTRO)
    setCurrentQ(0)
    setAnswers([])
    setSelected(null)
    submittedRef.current = false
  }, [id])

  if (!quiz) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Quiz not found</h2>
          <Link to="/quiz" className="btn-primary">Back to Quizzes</Link>
        </div>
      </AppLayout>
    )
  }

  const q = quiz.questions[currentQ]
  const totalQ = quiz.questions.length

  function startQuiz() {
    setPhase(PHASE.ACTIVE)
    setCurrentQ(0)
    setAnswers([])
    setSelected(null)
    submittedRef.current = false
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = [...answers, selected]

    if (currentQ < totalQ - 1) {
      setAnswers(newAnswers)
      setCurrentQ(c => c + 1)
      setSelected(null)
    } else {
      handleSubmit(newAnswers)
    }
  }

  async function handleSubmit(finalAnswers) {
    if (submittedRef.current || submitting) return
    submittedRef.current = true
    setSubmitting(true)

    const correct = finalAnswers.filter((a, i) => a === quiz.questions[i].correctAnswer).length
    setScore(correct)
    setAnswers(finalAnswers)

    try {
      if (configured && user) {
        const { data: attempt, error } = await supabase
          .from('quiz_attempts')
          .insert({
            user_id: user.id,
            quiz_id: quiz.id,
            score: correct,
            total_questions: totalQ,
            submitted_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (!error && attempt) {
          await supabase.from('quiz_responses').insert(
            finalAnswers.map((a, i) => ({
              attempt_id: attempt.id,
              question_id: quiz.questions[i].id,
              selected_answer: a,
              is_correct: a === quiz.questions[i].correctAnswer,
            }))
          )
        }
      }
    } catch (err) {
      console.error('Quiz submit error:', err)
    } finally {
      setSubmitting(false)
      setPhase(PHASE.SUBMITTED)
    }
  }

  const pct = Math.round((score / totalQ) * 100)
  const scoreColor = pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600'
  const scoreBg = pct >= 80 ? 'bg-emerald-50 border-emerald-200' : pct >= 60 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'

  return (
    <AppLayout>
      <Link to="/quiz" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 no-underline mb-6 font-semibold">
        <ChevronLeft size={16} /> Back to Quiz Library
      </Link>

      {/* INTRO */}
      {phase === PHASE.INTRO && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 text-center">
          <div className="text-5xl mb-4">{relatedMod?.icon || '🎯'}</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{quiz.title}</h2>
          <p className="text-slate-500 mb-6">{quiz.description}</p>
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-slate-500">
            <span className="font-semibold">{totalQ} questions</span>
            <span>•</span>
            <span>Multiple choice</span>
            <span>•</span>
            <span>No time limit</span>
          </div>
          {relatedMod && (
            <p className="text-xs text-slate-400 mb-6">
              Related to the <Link to={`/learn/${relatedMod.slug}`} className="text-blue-600 font-semibold no-underline hover:underline">{relatedMod.title}</Link> lesson
            </p>
          )}
          <button onClick={startQuiz} className="btn-primary w-full justify-center text-base py-3.5">
            Start Quiz →
          </button>
        </div>
      )}

      {/* ACTIVE */}
      {phase === PHASE.ACTIVE && (
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-bold text-slate-700">Question {currentQ + 1} of {totalQ}</span>
              <span className="text-slate-400">{Math.round(((currentQ) / totalQ) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full progress-fill"
                style={{ width: `${((currentQ) / totalQ) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{q.text}</h3>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${selected === i
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700'
                    }`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${selected === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null || submitting}
            className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : currentQ < totalQ - 1 ? 'Next Question →' : 'Submit Quiz →'}
          </button>
        </div>
      )}

      {/* SUBMITTED */}
      {phase === PHASE.SUBMITTED && (
        <div className="max-w-2xl mx-auto">
          {/* Score banner */}
          <div className={`rounded-2xl border p-8 text-center mb-6 ${scoreBg}`}>
            <Trophy size={40} className={`mx-auto mb-3 ${scoreColor}`} />
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Quiz Complete!</h2>
            <p className={`text-5xl font-black mb-2 ${scoreColor}`}>{pct}%</p>
            <p className="text-slate-600">You scored <strong>{score} out of {totalQ}</strong> questions correctly.</p>
            <p className="text-sm text-slate-500 mt-1">
              {pct >= 80 ? '🎉 Excellent work!' : pct >= 60 ? '👍 Good effort — review the explanations below.' : '📚 Keep learning — the explanations below will help.'}
            </p>
          </div>

          {/* Review */}
          <div className="space-y-4 mb-6">
            {quiz.questions.map((q, i) => {
              const userAns = answers[i]
              const correct = userAns === q.correctAnswer
              return (
                <div key={i} className={`bg-white rounded-2xl border p-5 ${correct ? 'border-emerald-200' : 'border-red-200'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    {correct
                      ? <CheckCircle size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      : <XCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />}
                    <p className="font-semibold text-slate-900 text-sm">{q.text}</p>
                  </div>

                  <div className="ml-7 space-y-1.5 mb-3">
                    {q.options.map((opt, j) => (
                      <div key={j} className={`text-sm px-3 py-2 rounded-lg ${j === q.correctAnswer ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : j === userAns && !correct ? 'bg-red-50 text-red-800 line-through'
                            : 'text-slate-500'
                        }`}>
                        {j === q.correctAnswer ? '✓ ' : j === userAns && !correct ? '✗ ' : '  '}
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="ml-7 bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={startQuiz} className="btn-secondary flex items-center gap-2 justify-center">
              <RotateCcw size={15} /> Try Again
            </button>
            {relatedMod && (
              <Link to={`/learn/${relatedMod.slug}`} className="btn-secondary flex items-center gap-2 justify-center">
                Review {relatedMod.title} <ArrowRight size={15} />
              </Link>
            )}
            <Link to="/quiz" className="btn-primary flex items-center gap-2 justify-center ml-auto">
              All Quizzes
            </Link>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

