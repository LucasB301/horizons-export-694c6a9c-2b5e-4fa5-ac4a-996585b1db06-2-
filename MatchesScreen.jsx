import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MatchesScreen = ({ setCurrentView, matches, setActiveChat }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <header className="flex items-center mb-6">
        <Button onClick={() => setCurrentView('discover')} variant="ghost" size="icon" className="mr-4 text-gray-600 dark:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mes Matchs</h1>
      </header>

      <div className="space-y-4">
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-20">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-semibold">Aucun match pour le moment</p>
            <p className="text-sm">Continuez à swiper pour trouver des profils compatibles !</p>
          </div>
        ) : (
          matches.sort((a, b) => b.compatibility - a.compatibility).map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img  alt={match.name} className="w-16 h-16 rounded-full object-cover" src="https://images.unsplash.com/photo-1558420488-0ed4bebf615d" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{match.name}, {match.age}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{match.location}</p>
                  <div className="flex items-center mt-1 text-sm text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span>{match.compatibility}% compatible</span>
                  </div>
                </div>
                <Button onClick={() => setActiveChat(match)} size="icon" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchesScreen;