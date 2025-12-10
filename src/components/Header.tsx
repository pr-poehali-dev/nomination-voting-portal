import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold tracking-tight">
          Sloy
        </h1>
        
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection('nominations')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'nominations' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Номинации
          </button>
          <button
            onClick={() => scrollToSection('results')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'results' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Результаты
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            О конкурсе
          </button>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Icon name="Menu" size={24} />
        </Button>
      </div>
    </header>
  );
};

export default Header;