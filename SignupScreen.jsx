import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Users, Briefcase, Gamepad2, Bike, Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { INTEREST_CATEGORIES } from '@/data/interests';
import { Slider } from '@/components/ui/slider';

const icons = { Briefcase, Gamepad2, Bike, Palette };

const SignupScreen = ({ setCurrentView, onSignup }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    meetingType: 'sentimental',
    interests: Object.keys(INTEREST_CATEGORIES).reduce((acc, key) => {
      acc[key] = { percentage: 25, items: [] };
      return acc;
    }, {})
  });
  const { toast } = useToast();

  const handleInterestToggle = (category, item) => {
    setFormData(prev => {
      const currentItems = prev.interests[category].items;
      const newItems = currentItems.includes(item)
        ? currentItems.filter(i => i !== item)
        : [...currentItems, item];
      return {
        ...prev,
        interests: {
          ...prev.interests,
          [category]: { ...prev.interests[category], items: newItems }
        }
      };
    });
  };

  const handleSliderChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [category]: { ...prev.interests[category], percentage: value[0] }
      }
    }));
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.age || !formData.location) {
      toast({ title: "❌ Oups !", description: "Veuillez remplir les informations de base.", variant: "destructive" });
      return false;
    }
    if (formData.age < 18) {
      toast({ title: "❌ Oups !", description: "Vous devez avoir au moins 18 ans.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const totalPercentage = Object.values(formData.interests).reduce((sum, cat) => sum + cat.percentage, 0);
    if (Math.round(totalPercentage) !== 100) {
      toast({ title: "❌ Oups !", description: `La somme des pourcentages doit être 100% (actuellement ${Math.round(totalPercentage)}%).`, variant: "destructive" });
      return false;
    }
    const hasInterests = Object.values(formData.interests).some(cat => cat.items.length > 0);
    if (!hasInterests) {
      toast({ title: "❌ Oups !", description: "Veuillez sélectionner au moins un centre d'intérêt.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) handleSubmit();
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    const profile = { ...formData, id: Date.now() };
    onSignup(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900/20 p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="mb-4">
          <Button onClick={() => step === 1 ? setCurrentView('welcome') : prevStep()} variant="ghost" className="text-gray-600 dark:text-gray-300">
            <ArrowLeft className="w-5 h-5 mr-2" /> Retour
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Créez votre profil</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Commençons par les bases.</p>
              <div className="space-y-4">
                <input type="text" placeholder="Votre nom ou pseudo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Âge" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white" />
                  <input type="text" placeholder="Ville" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white" />
                </div>
                <textarea placeholder="Votre bio (optionnel)" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white h-24" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Je recherche des rencontres :</p>
                  <div className="flex gap-4">
                    <Button onClick={() => setFormData({...formData, meetingType: 'sentimental'})} className={`flex-1 ${formData.meetingType === 'sentimental' ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}><Heart className="w-4 h-4 mr-2" /> Sentimentales</Button>
                    <Button onClick={() => setFormData({...formData, meetingType: 'amical'})} className={`flex-1 ${formData.meetingType === 'amical' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}><Users className="w-4 h-4 mr-2" /> Amicales</Button>
                  </div>
                </div>
                <Button onClick={nextStep} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md">Suivant</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Vos centres d'intérêt</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Aidez-nous à comprendre ce qui vous passionne. La somme des pourcentages doit être 100%.</p>
              <div className="space-y-6">
                {Object.entries(INTEREST_CATEGORIES).map(([key, { label, icon, items }]) => {
                  const IconComponent = icons[icon];
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg flex items-center text-gray-700 dark:text-gray-200"><IconComponent className="w-5 h-5 mr-2" /> {label}</h3>
                        <span className="font-bold text-purple-600 dark:text-pink-400">{formData.interests[key].percentage}%</span>
                      </div>
                      <Slider defaultValue={[25]} max={100} step={5} onValueChange={(value) => handleSliderChange(key, value)} />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {items.map(item => (
                          <Button key={item} onClick={() => handleInterestToggle(key, item)} variant="outline" size="sm" className={`rounded-full transition-all ${formData.interests[key].items.includes(item) ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-600 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            {formData.interests[key].items.includes(item) && <Check className="w-4 h-4 mr-1" />}
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button onClick={nextStep} className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md">Terminer l'inscription</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignupScreen;