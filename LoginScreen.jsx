import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LoginScreen = ({ setCurrentView }) => {
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Bientôt disponible !",
      description: "Cette fonctionnalité est en cours de développement. Merci de votre patience !",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900/20 p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="mb-4">
          <Button onClick={() => setCurrentView('welcome')} variant="ghost" className="text-gray-600 dark:text-gray-300">
            <ArrowLeft className="w-5 h-5 mr-2" /> Retour
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Bon retour !</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Connectez-vous pour continuer.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Se connecter
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;