'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Agent {
  id: number;
  name: string;
  title: string;
  phone: string;
  availability: string;
  languages: string[];
  badge: string;
}

interface EnrollmentQuestion {
  id: string;
  question: string;
  type: 'radio' | 'checkbox';
  options: string[];
}

export default function EnrollmentPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [questions, setQuestions] = useState<EnrollmentQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showAgents, setShowAgents] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch enrollment data
    fetch('/api/enrollment/agents')
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.agents);
        setQuestions(data.enrollmentQuestions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleAnswer = (questionId: string, value: string, isCheckbox = false) => {
    setAnswers((prev) => {
      if (isCheckbox) {
        const current = (prev[questionId] as string[]) || [];
        if (current.includes(value)) {
          return {
            ...prev,
            [questionId]: current.filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...current, value],
          };
        }
      } else {
        return {
          ...prev,
          [questionId]: value,
        };
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading enrollment information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Link
          href="/dashboard"
          className="text-pink-600 hover:text-pink-800 mb-6 inline-block text-xs sm:text-sm"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Enrollment Questions
        </h1>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6 mb-8">
          <p className="text-sm sm:text-base text-pink-900">
            💡 <strong>Our licensed agents are here for you!</strong> Fill out these questions and connect with a specialist to find the perfect plan.
          </p>
        </div>

        {/* Enrollment Form */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-8">
          <div className="space-y-6 sm:space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="border-b pb-6 sm:pb-8 last:border-b-0 last:pb-0">
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  {question.question}
                </label>

                <div className="space-y-2 sm:space-y-3">
                  {question.type === 'radio' ? (
                    question.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          id={`${question.id}-${option}`}
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="w-4 h-4 text-pink-600"
                        />
                        <label
                          htmlFor={`${question.id}-${option}`}
                          className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))
                  ) : (
                    question.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`${question.id}-${option}`}
                          checked={((answers[question.id] as string[]) || []).includes(option)}
                          onChange={(e) => handleAnswer(question.id, option, true)}
                          className="w-4 h-4 text-pink-600"
                        />
                        <label
                          htmlFor={`${question.id}-${option}`}
                          className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAgents(true)}
            className="mt-6 sm:mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Connect with Licensed Agent
          </button>
        </div>

        {/* Licensed Agents Section */}
        {showAgents && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              📞 Meet Our Licensed Agents
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
              Available 24/7 to answer your questions and help you find the right coverage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {agent.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">{agent.title}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded whitespace-nowrap">
                      {agent.badge}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-600">📞 </span>
                      <a href={`tel:${agent.phone}`} className="text-pink-600 hover:underline">
                        {agent.phone}
                      </a>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-600">⏰ </span>
                      <span className="text-green-600 font-medium">{agent.availability}</span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-600">🗣️ </span>
                      <span>{agent.languages.join(', ')}</span>
                    </div>
                  </div>

                  <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-medium text-xs sm:text-sm transition-colors">
                    Call Now
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-pink-900">
                ✓ <strong>Licensed & Certified:</strong> All our agents are certified health insurance professionals
              </p>
              <p className="text-xs sm:text-sm text-pink-900 mt-2">
                ✓ <strong>Bilingual Support:</strong> Assistance available in multiple languages
              </p>
              <p className="text-xs sm:text-sm text-pink-900 mt-2">
                ✓ <strong>No Obligation:</strong> Ask questions without any commitment
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
