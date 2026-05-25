"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Minus,
  Sparkles,
  CheckCheck,
  Paperclip,
} from "lucide-react";
import Link from "next/link";

type Message = {
  id: string;
  from: "agent" | "user";
  text: string;
  time: string;
};

const AGENT = {
  name: "Aisha R.",
  role: "Career Coach · Boasystemz",
  initials: "AR",
  color: "from-amber-500 to-rose-500",
};

const QUICK_REPLIES = [
  "What program is right for me?",
  "Can you review my resume?",
  "How fast can I land interviews?",
  "Book a free consultation",
];

const AUTO_REPLIES: Record<string, string> = {
  "What program is right for me?":
    "Great question! It depends on your goal. If you want full career transformation, our Premium program is the fit. If you mostly need interview prep, Interview Coaching might be enough. Want me to send you a 2-minute fit quiz?",
  "Can you review my resume?":
    "Absolutely. You can upload it at /upload-resume for an instant AI scan, a senior mentor follows up with a human review within one business day.",
  "How fast can I land interviews?":
    "Most engineers in our accelerator see interviews within 30–45 days, and offers within 60–120 days. Big variable: your starting point and how targeted your applications are.",
  "Book a free consultation":
    "Easy, head to /contact and pick a slot. The call is 30 minutes, no sales pitch. Want me to share what to prepare beforehand?",
};

const FALLBACK_REPLY =
  "Got it, a senior mentor will follow up here within a few minutes. In the meantime, would you like me to share a relevant playbook or book you a 30-min consult?";

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread] = useState(1);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      from: "agent",
      text: "Hey there 👋 I'm Aisha, one of the career coaches at Boasystemz. What can I help you with today?",
      time: now(),
    },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setMinimized(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const userMsg: Message = { id: crypto.randomUUID(), from: "user", text: clean, time: now() };
    setMessages((m) => [...m, userMsg]);
    setDraft("");
    setTyping(true);

    const reply = AUTO_REPLIES[clean] ?? FALLBACK_REPLY;
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), from: "agent", text: reply, time: now() },
      ]);
      if (!open) setUnread((u) => u + 1);
    }, 1100 + Math.random() * 700);
  }

  return (
    <>
      <motion.button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="group fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-xl shadow-cyan-500/30 ring-1 ring-white/10 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-navy-900" />
            </motion.span>
          )}
        </AnimatePresence>
        {unread > 0 && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -left-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-navy-950"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-3 z-[60] w-[calc(100vw-1.5rem)] max-w-[380px] origin-bottom-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-cyan-500/10 dark:border-white/10 dark:bg-navy-950 sm:right-6"
          >
            <header className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-5 py-4 text-white">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
              <div className="pointer-events-none absolute -top-10 right-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${AGENT.color} text-sm font-semibold shadow`}>
                      {AGENT.initials}
                    </span>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-navy-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{AGENT.name}</p>
                    <p className="text-[11px] text-slate-300">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" /> Online · replies in ~1 min
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMinimized((m) => !m)}
                    aria-label="Minimize chat"
                    className="grid h-7 w-7 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="grid h-7 w-7 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </header>

            <AnimatePresence initial={false}>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div
                    ref={listRef}
                    className="max-h-[420px] min-h-[280px] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4 dark:bg-navy-950"
                  >
                    {messages.map((m) => (
                      <Bubble key={m.id} msg={m} />
                    ))}
                    {typing && <TypingBubble />}

                    {messages.length === 1 && (
                      <div className="!mt-5 flex flex-wrap gap-1.5">
                        {QUICK_REPLIES.map((q) => (
                          <button
                            key={q}
                            onClick={() => send(q)}
                            className="rounded-full border border-cyan-400/40 bg-white px-3 py-1.5 text-xs font-medium text-cyan-700 transition-colors hover:bg-cyan-50 dark:bg-white/[0.04] dark:text-cyan-200 dark:hover:bg-white/10"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      send(draft);
                    }}
                    className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-navy-900"
                  >
                    <button
                      type="button"
                      aria-label="Attach"
                      className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <input
                      ref={inputRef}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Type a message…"
                      className="flex-1 bg-transparent py-1.5 text-sm text-navy-900 placeholder-slate-400 outline-none dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      aria-label="Send message"
                      className="grid h-8 w-8 place-items-center rounded-full bg-cyan-500 text-white shadow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-white/10"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>

                  <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-2 text-[10px] text-slate-500 dark:border-white/10 dark:bg-navy-950 dark:text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-cyan-500" /> Powered by Boasystemz
                    </span>
                    <Link href="/contact" className="font-semibold text-cyan-600 hover:underline dark:text-cyan-300">
                      Book a call instead →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[82%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-br-md bg-cyan-500 text-white"
              : "rounded-bl-md border border-slate-200 bg-white text-navy-900 dark:border-white/10 dark:bg-navy-900 dark:text-slate-100"
          }`}
        >
          {msg.text}
        </div>
        <span className={`mt-1 inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 ${isUser ? "pr-1" : "pl-1"}`}>
          {msg.time}
          {isUser && <CheckCheck className="h-3 w-3 text-cyan-500" />}
        </span>
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full justify-start"
    >
      <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-navy-900">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
