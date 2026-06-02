"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { dictionaryTerms } from "@/lib/dictionary-data";

export default function VibeDictionaryClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDictionary = dictionaryTerms.map(section => {
    return {
      ...section,
      terms: section.terms.filter(term => 
        term.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
        term.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(section => section.terms.length > 0);

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-white/40" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for rizz, ghosting, aries..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
        />
      </div>

      {/* Dictionary Sections */}
      <div className="space-y-12 min-h-[400px]">
        {filteredDictionary.length === 0 ? (
          <div className="text-center py-10 text-white/50">
            <p className="text-lg">No vibes found for "{searchQuery}".</p>
            <p className="text-sm mt-2">Try searching something else or check your spelling.</p>
          </div>
        ) : (
          filteredDictionary.map((section, idx) => (
            <section key={idx}>
              <div className="flex items-center gap-3 mb-6">
                {section.icon}
                <h2 className="text-2xl font-bold text-white">{section.category}</h2>
              </div>
              <div className="grid gap-4">
                {section.terms.map((term, tIdx) => (
                  <div key={tIdx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                    <h3 className="text-lg font-bold text-purple-300 mb-2">{term.word}</h3>
                    <p className="text-white/70 leading-relaxed">{term.meaning}</p>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
