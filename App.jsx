
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';

import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import WelcomeScreen from '@/screens/WelcomeScreen';
import SignupScreen from '@/screens/SignupScreen';
import LoginScreen from '@/screens/LoginScreen';
import DiscoverScreen from '@/screens/DiscoverScreen';
import MatchesScreen from '@/screens/MatchesScreen';
import ChatScreen from '@/screens/ChatScreen';
import ProfileScreen from '@/screens/ProfileScreen';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [userProfile, setUserProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedMatches = localStorage.getItem('matches');
    const savedConversations = localStorage.getItem('conversations');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setCurrentView('discover');
    }
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleSignup = (profile) => {
    setUserProfile(profile);
    saveToStorage('userProfile', profile);
    setCurrentView('discover');
    toast({
      title: "🎉 Profil créé !",
      description: "Bienvenue sur Affinity Story ! Commencez à découvrir des profils.",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserProfile(null);
    setMatches([]);
    setConversations({});
    setActiveChat(null);
    setCurrentView('welcome');
    toast({
      title: "👋 À bientôt !",
      description: "Vous avez été déconnecté avec succès.",
      duration: 3000,
    });
  };

  const renderContent = () => {
    if (activeChat) {
      return (
        <ChatScreen
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          conversations={conversations}
          setConversations={setConversations}
          saveToStorage={saveToStorage}
        />
      );
    }

    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen setCurrentView={setCurrentView} />;
      case 'signup':
        return <SignupScreen setCurrentView={setCurrentView} onSignup={handleSignup} />;
      case 'login':
        return <LoginScreen setCurrentView={setCurrentView} />;
      case 'discover':
        return (
          <DiscoverScreen
            userProfile={userProfile}
            setCurrentView={setCurrentView}
            matches={matches}
            setMatches={setMatches}
            saveToStorage={saveToStorage}
          />
        );
      case 'matches':
        return (
          <MatchesScreen
            setCurrentView={setCurrentView}
            matches={matches}
            setActiveChat={setActiveChat}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            userProfile={userProfile}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
          />
        );
      default:
        return <WelcomeScreen setCurrentView={setCurrentView} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Affinity Story - Créez des liens authentiques</title>
        <meta name="description" content="Application de rencontres amicales et sentimentales basée sur des affinités profondes." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900/20">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;
