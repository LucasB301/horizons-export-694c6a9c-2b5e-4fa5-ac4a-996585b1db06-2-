import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeScreen = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900/20">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg">
            <Heart className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mt-4 text-gray-800 dark:text-white">Affinity Story</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Créez des liens authentiques.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={() => setCurrentView('signup')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            size="lg"
          >
            Commencer l'aventure
          </Button>
          <Button
            onClick={() => setCurrentView('login')}
            variant="ghost"
            className="w-full text-purple-600 dark:text-pink-400 font-semibold py-3 rounded-full"
          >
            J'ai déjà un compte
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;