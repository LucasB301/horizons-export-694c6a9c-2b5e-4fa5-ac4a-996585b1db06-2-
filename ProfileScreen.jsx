import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, LogOut, Camera, Briefcase, Gamepad2, Bike, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { INTEREST_CATEGORIES } from '@/data/interests';

const icons = { Briefcase, Gamepad2, Bike, Palette };

const ProfileScreen = ({ userProfile, setCurrentView, onLogout }) => {
  const { toast } = useToast();

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <header className="flex items-center mb-6">
        <Button onClick={() => setCurrentView('discover')} variant="ghost" size="icon" className="mr-4 text-gray-600 dark:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mon Profil</h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-600 text-white">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userProfile.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{userProfile.age} ans • {userProfile.location}</p>
        </div>

        {userProfile.bio && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">À propos de moi</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{userProfile.bio}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Mes affinités</h3>
          <div className="space-y-4">
            {Object.entries(userProfile.interests).map(([key, { percentage, items }]) => {
              const categoryInfo = INTEREST_CATEGORIES[key];
              if (!categoryInfo) return null;
              const IconComponent = icons[categoryInfo.icon];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center"><IconComponent className="w-4 h-4 mr-2" /> {categoryInfo.label}</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-pink-400">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {items.map(item => (
                      <span key={item} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <Button
            onClick={() => toast({ title: "🚧 Bientôt disponible !", description: "La modification du profil arrive bientôt." })}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <Edit className="w-4 h-4 mr-2" /> Modifier le profil
          </Button>
          <Button onClick={onLogout} variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" /> Se déconnecter
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileScreen;