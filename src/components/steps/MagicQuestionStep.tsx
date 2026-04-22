"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { WORD_LIMIT } from "@/lib/constants";
import PhotoUpload from "@/components/PhotoUpload";

interface MagicQuestionStepProps {
  value: string;
  onChange: (text: string) => void;
}

export default function MagicQuestionStep({
  value,
  onChange,
}: MagicQuestionStepProps) {
  const [isFocused, setIsFocused] = useState(false);

  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  const isOverLimit = wordCount > WORD_LIMIT;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
      if (words.length <= WORD_LIMIT + 5) {
        // allowing a little buffer for UX, but showing warning
        onChange(text);
      }
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <motion.h2
          className="text-xl font-semibold text-foreground mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Between us... 🤫
        </motion.h2>
        <motion.p
          className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Is there any specific detail I should know before judging?
        </motion.p>
      </div>

      <motion.div
        className={`relative rounded-2xl transition-all duration-300 ${
          isFocused
            ? "glass-strong shadow-[0_0_30px_rgba(192,132,252,0.15)]"
            : "glass"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
      >
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Example: My 3-year relationship ended yesterday..."
          rows={5}
          className="w-full bg-transparent p-5 text-foreground placeholder:text-text-secondary/40 text-sm leading-relaxed resize-none focus:outline-none"
        />

        {/* Word Counter */}
        <div className="flex items-center justify-between px-5 pb-3">
          <motion.span
            className="text-xs font-medium text-text-secondary/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Optional — you can leave it blank
          </motion.span>
          <motion.span
            className={`text-xs font-semibold tabular-nums ${
              isOverLimit
                ? "text-red-400"
                : wordCount > WORD_LIMIT * 0.8
                ? "text-yellow-400"
                : "text-text-secondary/50"
            }`}
            animate={isOverLimit ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {wordCount}/{WORD_LIMIT}
          </motion.span>
        </div>
      </motion.div>

      {/* Photo Upload */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-center text-xs text-text-secondary/40 mb-3">
          Add a glowing photo if you want 📸
        </p>
        <PhotoUpload />
      </motion.div>

      {/* Decorative quote */}
      <motion.p
        className="text-center text-xs text-text-secondary/30 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        &ldquo;The more the details, the sharper the roast&rdquo;
      </motion.p>
    </div>
  );
}
