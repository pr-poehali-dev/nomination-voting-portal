import { useState } from 'react';
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import NominationCard from '@/components/NominationCard';
import NominationModal from '@/components/NominationModal';
import ChristmasLights from '@/components/ChristmasLights';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const nominations = [
  { id: 1, title: 'Человек-память' },
  { id: 2, title: 'Стиль года' },
  { id: 3, title: 'Завоз года' },
  { id: 4, title: 'Самое лучшее дуо' },
  { id: 5, title: 'Слой queen' },
  { id: 6, title: 'Слой king' },
  { id: 7, title: 'Эксперт по почерку' },
  { id: 8, title: 'Игроман года' },
  { id: 9, title: 'Лучший друг школьного муравья' }
];

const candidateNames = [
  'Анна Смирнова',
  'Елена Петрова',
  'Мария Иванова',
  'Дарья Кузнецова',
  'Ольга Соколова',
  'Татьяна Попова',
  'Наталья Лебедева',
  'Ирина Козлова',
  'Екатерина Новикова',
  'Светлана Морозова',
  'Виктория Волкова',
  'Алиса Федорова',
  'Юлия Михайлова',
  'Вероника Алексеева',
  'Кристина Васильева',
  'Полина Григорьева',
  'Диана Романова',
  'Софья Киселева',
  'Анастасия Зайцева',
  'Маргарита Орлова',
  'Валерия Павлова'
];

const placeholderImages = [
  'https://cdn.poehali.dev/projects/63837565-f215-4956-8db9-e04af502e0b9/files/a3524529-20a9-4672-9bb8-f93630e7570d.jpg',
  'https://cdn.poehali.dev/projects/63837565-f215-4956-8db9-e04af502e0b9/files/61974c80-6d18-456f-b6c8-4b7a92e7eedd.jpg',
  'https://cdn.poehali.dev/projects/63837565-f215-4956-8db9-e04af502e0b9/files/e9d2cc40-9fcc-4da8-a69f-fb34b92de900.jpg'
];

const getRandomImages = () => {
  const shuffled = [...placeholderImages].sort(() => Math.random() - 0.5);
  return [...shuffled, shuffled[0]];
};

const Index = () => {
  const [selectedNomination, setSelectedNomination] = useState<{ id: number; title: string } | null>(null);
  const [candidates] = useState(() => 
    candidateNames.map((name, index) => ({
      id: index + 1,
      name,
      image: placeholderImages[index % placeholderImages.length]
    }))
  );

  const handleOpenNomination = (nomination: { id: number; title: string }) => {
    setSelectedNomination(nomination);
  };

  const handleCloseModal = () => {
    setSelectedNomination(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <ChristmasLights />
      <Header />
      
      <section id="home" className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Sloy
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
            Голосуйте за лучшие проекты года. Ваш голос имеет значение!
          </p>
          
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              До закрытия голосования
            </h3>
            <Countdown />
          </div>
        </div>
      </section>

      <section id="nominations" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Номинации
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nominations.map((nomination) => (
              <NominationCard
                key={nomination.id}
                id={nomination.id}
                title={nomination.title}
                images={getRandomImages()}
                onClick={() => handleOpenNomination(nomination)}
              />
            ))}
          </div>
          
          {selectedNomination && (
            <NominationModal
              isOpen={true}
              onClose={handleCloseModal}
              title={selectedNomination.title}
              candidates={candidates}
            />
          )}
        </div>
      </section>

      <section id="results" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Результаты
          </h2>
          
          <div className="text-center py-12">
            <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              Результаты будут доступны после завершения голосования
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            О конкурсе
          </h2>
          
          <div className="prose prose-lg mx-auto text-left space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Наш ежегодный конкурс объединяет лучшие проекты и идеи года. 
              Это возможность отметить выдающиеся достижения и поддержать 
              инновации в различных областях.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Голосование открыто для всех желающих. Каждый участник может 
              проголосовать один раз за каждую номинацию. Результаты подводятся 
              автоматически и обновляются в режиме реального времени.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <Icon name="Award" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-heading font-semibold mb-2">15 номинаций</h3>
                <p className="text-sm text-muted-foreground">
                  Разнообразные категории
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <Icon name="Users" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-heading font-semibold mb-2">Открытое голосование</h3>
                <p className="text-sm text-muted-foreground">
                  Каждый голос важен
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border border-border">
                <Icon name="Trophy" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-heading font-semibold mb-2">Честные результаты</h3>
                <p className="text-sm text-muted-foreground">
                  Прозрачный подсчёт
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border bg-secondary/30">
        <div className="container mx-auto text-center">
          <img 
            src="https://cdn.poehali.dev/files/Text Sloy.png" 
            alt="Sloy" 
            className="h-24 mx-auto mb-6"
          />
          <p className="text-sm text-muted-foreground">© 2024 Sloy. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;