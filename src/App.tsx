import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { User as FirebaseUser } from 'firebase/auth';
import { subscribeToAuthChanges } from './lib/auth';
import Auth from './components/Auth';
import TaskMarketplace from './components/TaskMarketplace';
import CreateTask from './components/CreateTask';
import UserProfile from './components/UserProfile';
import TaskTemplates from './components/TaskTemplates';
import WalletModal from './components/WalletModal';
import NotificationsModal from './components/NotificationsModal';
import FAQSupport from './components/FAQSupport';
import SafetyFeatures from './components/SafetyFeatures';
import LearnMoreModal from './components/LearnMoreModal';
import AdminTools from './components/AdminTools';
import ChatList from './components/ChatList';
import MobileBottomNav from './components/MobileBottomNav';
import QuickStartGuide from './components/QuickStartGuide';
import VoiceAssistant from './components/VoiceAssistant';
import VoiceAssistantButton from './components/VoiceAssistantButton';
import LanguageSettingsModal from './components/LanguageSettingsModal';
import LandingPage from './pages/LandingPage';
import { getCurrentLocation, Location } from './lib/locationService';
import { getCurrentUserProfile } from './lib/auth';
import { useGeolocation } from './hooks/useGeolocation';
import { captureMessage } from './lib/sentryUtils';
import toast from 'react-hot-toast';

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'profile' | 'messages'>('home');
  const [showAuth, setShowAuth] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showAdminTools, setShowAdminTools] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showLanguageSettings, setShowLanguageSettings] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const { location: userLocation, loading: locationLoading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000 // 5 minutes
  });

  useEffect(() => {
    // Check if user should see landing page
    const hasSeenLanding = localStorage.getItem('hasSeenLanding');
    if (hasSeenLanding) {
      setShowLandingPage(false);
    }

    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const profile = await getCurrentUserProfile();
          setUserProfile(profile);
          
          // Check if user should see quick start guide
          const quickStartShown = localStorage.getItem('quickStartGuideShown');
          if (!quickStartShown && profile && !profile.tutorial_completed) {
            setShowQuickStart(true);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Event listeners for various actions
    const handleCreateTask = () => {
      if (!user) {
        setShowAuth(true);
        return;
      }
      setShowCreateTask(true);
    };

    const handleViewTasks = () => {
      if (!user) {
        setShowAuth(true);
        return;
      }
      setActiveTab('tasks');
    };

    const handleViewMessages = () => {
      if (!user) {
        setShowAuth(true);
        return;
      }
      setActiveTab('messages');
    };

    const handleOpenWallet = () => {
      if (!user) {
        setShowAuth(true);
        return;
      }
      setShowWallet(true);
    };

    const handleOpenProfile = () => {
      if (!user) {
        setShowAuth(true);
        return;
      }
      setActiveTab('profile');
    };

    const handleOpenNotifications = () => {
      if (!user) {
        setShowAuth(true);
        return;
      }
      setShowNotifications(true);
    };

    const handleOpenFAQ = () => setShowFAQ(true);
    const handleOpenSafety = () => setShowSafety(true);
    const handleOpenSupport = () => setShowFAQ(true);
    const handleOpenLearnMore = () => setShowLearnMore(true);
    const handleOpenLanguageSettings = () => setShowLanguageSettings(true);

    // Admin tools (only for specific emails)
    const handleOpenAdminTools = () => {
      const adminEmails = ['kaushalthota1@gmail.com', 'apoorvamahajan94@gmail.com'];
      if (user && adminEmails.includes(user.email || '')) {
        setShowAdminTools(true);
      }
    };

    // Landing page entry
    const handleEnterApp = () => {
      localStorage.setItem('hasSeenLanding', 'true');
      setShowLandingPage(false);
    };

    // Add event listeners
    window.addEventListener('create-task', handleCreateTask);
    window.addEventListener('view-tasks', handleViewTasks);
    window.addEventListener('view-messages', handleViewMessages);
    window.addEventListener('open-wallet', handleOpenWallet);
    window.addEventListener('open-profile', handleOpenProfile);
    window.addEventListener('open-notifications', handleOpenNotifications);
    window.addEventListener('open-faq', handleOpenFAQ);
    window.addEventListener('open-safety', handleOpenSafety);
    window.addEventListener('open-support', handleOpenSupport);
    window.addEventListener('open-learn-more', handleOpenLearnMore);
    window.addEventListener('open-language-settings', handleOpenLanguageSettings);
    window.addEventListener('open-admin-tools', handleOpenAdminTools);
    window.addEventListener('enter-app', handleEnterApp);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('create-task', handleCreateTask);
      window.removeEventListener('view-tasks', handleViewTasks);
      window.removeEventListener('view-messages', handleViewMessages);
      window.removeEventListener('open-wallet', handleOpenWallet);
      window.removeEventListener('open-profile', handleOpenProfile);
      window.removeEventListener('open-notifications', handleOpenNotifications);
      window.removeEventListener('open-faq', handleOpenFAQ);
      window.removeEventListener('open-safety', handleOpenSafety);
      window.removeEventListener('open-support', handleOpenSupport);
      window.removeEventListener('open-learn-more', handleOpenLearnMore);
      window.removeEventListener('open-language-settings', handleOpenLanguageSettings);
      window.removeEventListener('open-admin-tools', handleOpenAdminTools);
      window.removeEventListener('enter-app', handleEnterApp);
    };
  }, [user]);

  // Show landing page if user hasn't seen it
  if (showLandingPage) {
    return <LandingPage />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <img src="/image.png" alt="Hustl Logo" className="w-full h-full object-contain" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0038FF] mx-auto"></div>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gray-50">
          <TaskTemplates
            onSelectTemplate={(template) => {
              setShowAuth(true);
            }}
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'tasks':
        return <TaskMarketplace userLocation={userLocation} />;
      case 'profile':
        return <UserProfile />;
      case 'messages':
        return <ChatList userId={user.uid} currentUser={userProfile} />;
      default:
        return <TaskTemplates
          onSelectTemplate={(template) => {
            setShowCreateTask(true);
          }}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3">
                <img src="/image.png" alt="Hustl Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-bold text-[#002B7F]">Hustl</h1>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`nav-link ${activeTab === 'home' ? 'text-[#0038FF]' : 'text-gray-700'}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`nav-link ${activeTab === 'tasks' ? 'text-[#0038FF]' : 'text-gray-700'}`}
                >
                  Browse Tasks
                </button>
                {user && (
                  <>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className={`nav-link ${activeTab === 'messages' ? 'text-[#0038FF]' : 'text-gray-700'}`}
                    >
                      Messages
                    </button>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`nav-link ${activeTab === 'profile' ? 'text-[#0038FF]' : 'text-gray-700'}`}
                    >
                      Profile
                    </button>
                  </>
                )}
              </nav>
            )}

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {!isMobile && (
                    <>
                      <button
                        onClick={() => setShowWallet(true)}
                        className="nav-button"
                      >
                        Wallet
                      </button>
                      <button
                        onClick={() => setShowNotifications(true)}
                        className="nav-button"
                      >
                        Notifications
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setShowCreateTask(true)}
                    className="btn-secondary"
                  >
                    Post Task
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="btn-primary"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${isMobile ? 'pb-20' : ''}`}>
        {renderMainContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && user && (
        <MobileBottomNav
          activeTab={activeTab}
          onCreateTask={() => setShowCreateTask(true)}
        />
      )}

      {/* Voice Assistant Button */}
      {user && (
        <VoiceAssistantButton onClick={() => setShowVoiceAssistant(true)} />
      )}

      {/* Modals */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <Auth onClose={() => setShowAuth(false)} />
          </div>
        </div>
      )}

      {showCreateTask && (
        <CreateTask
          onClose={() => setShowCreateTask(false)}
          userLocation={userLocation}
        />
      )}

      {showWallet && (
        <WalletModal onClose={() => setShowWallet(false)} />
      )}

      {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
      )}

      {showFAQ && (
        <FAQSupport onClose={() => setShowFAQ(false)} />
      )}

      {showSafety && (
        <SafetyFeatures onClose={() => setShowSafety(false)} />
      )}

      {showLearnMore && (
        <LearnMoreModal onClose={() => setShowLearnMore(false)} />
      )}

      {showAdminTools && (
        <AdminTools onClose={() => setShowAdminTools(false)} />
      )}

      {showQuickStart && (
        <QuickStartGuide
          onClose={() => setShowQuickStart(false)}
          onCreateTask={() => {
            setShowQuickStart(false);
            setShowCreateTask(true);
          }}
          onBrowseTasks={() => {
            setShowQuickStart(false);
            setActiveTab('tasks');
          }}
        />
      )}

      {showVoiceAssistant && (
        <VoiceAssistant
          onClose={() => setShowVoiceAssistant(false)}
          userLocation={userLocation}
        />
      )}

      {showLanguageSettings && (
        <LanguageSettingsModal onClose={() => setShowLanguageSettings(false)} />
      )}

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;