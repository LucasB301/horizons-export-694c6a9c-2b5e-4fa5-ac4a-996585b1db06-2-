import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MessageCircle, User, SlidersHorizontal, Briefcase, Gamepad2, Bike, Palette, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SAMPLE_PROFILES } from '@/data/profiles';
import { INTEREST_CATEGORIES } from '@/data/interests';

const icons = { Briefcase, Gamepad2, Bike, Palette };

const DiscoverScreen = ({ userProfile, setCurrentView, matches, setMatches, saveToStorage }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const filteredProfiles = useMemo(() => {
    return SAMPLE_PROFILES.filter(p => p.id !== userProfile.id && p.meetingType === userProfile.meetingType);
  }, [userProfile]);

  const calculateCompatibility = (profile1, profile2, filter) => {
    let totalCompatibility = 0;
    let totalWeight = 0;

    for (const category in profile1.interests) {
      if (filter !== 'all' && category !== filter) continue;

      const userInterest = profile1.interests[category];
      const otherInterest = profile2.interests[category];
      
      if (!otherInterest) continue;

      const weight = userInterest.percentage / 100;
      const commonItems = userInterest.items.filter(item => otherInterest.items.includes(item));
      const maxItems = Math.max(userInterest.items.length, otherInterest.items.length);
      const itemMatchScore = maxItems > 0 ? commonItems.length / maxItems : 0;

      totalCompatibility += itemMatchScore * weight;
      totalWeight += weight;
    }

    if (totalWeight === 0) return 0;
    return Math.round((totalCompatibility / totalWeight) * 100);
  };

  const handleSwipe = (direction, profile) => {
    if (direction === 'right') {
      const compatibility = calculateCompatibility(userProfile, profile, filter);
      if (compatibility > 30) { // Match threshold
        const newMatch = { ...profile, compatibility, matchedAt: new Date().toISOString() };
        const updatedMatches = [...matches, newMatch];
        setMatches(updatedMatches);
        saveToStorage('matches', updatedMatches);
        
        toast({
          title: "🎉 Nouveau match !",
          description: `Vous avez matché avec ${profile.name} (${compatibility}% de compatibilité)`,
        });
      }
    }
    setCurrentProfileIndex(prev => prev + 1);
  };

  const currentProfile = filteredProfiles[currentProfileIndex % filteredProfiles.length];

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Plus de profils à découvrir</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Revenez plus tard ou ajustez vos filtres.</p>
        <Button onClick={() => setCurrentView('matches')}>Voir mes matchs</Button>
      </div>
    );
  }

  const compatibilityScore = calculateCompatibility(userProfile, currentProfile, filter);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Découvrir</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setCurrentView('matches')} variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300">
            <MessageCircle className="w-6 h-6" />
            {matches.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{matches.length}</span>}
          </Button>
          <Button onClick={() => setCurrentView('profile')} variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300"><User className="w-6 h-6" /></Button>
        </div>
      </header>

      <div className="mb-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'secondary' : 'ghost'} className="rounded-full"><SlidersHorizontal className="w-4 h-4 mr-2" /> Tous</Button>
          {Object.entries(INTEREST_CATEGORIES).map(([key, { label, icon }]) => {
            const IconComponent = icons[icon];
            return <Button key={key} onClick={() => setFilter(key)} variant={filter === key ? 'secondary' : 'ghost'} className="rounded-full"><IconComponent className="w-4 h-4 mr-2" /> {label}</Button>
          })}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={currentProfileIndex}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -300, rotate: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative">
              <img  alt={currentProfile.name} className="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1666892666066-abe5c4865e9c" />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1.5" />
                <span className="font-bold">{compatibilityScore}%</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h3>
                <p className="text-white/80">{currentProfile.location}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{currentProfile.bio}</p>
              <div className="flex justify-center space-x-6">
                <Button onClick={() => handleSwipe('left', currentProfile)} variant="outline" size="icon" className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600"><X className="w-8 h-8 text-gray-500" /></Button>
                <Button onClick={() => handleSwipe('right', currentProfile)} size="icon" className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"><Heart className="w-8 h-8" /></Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscoverScreen;