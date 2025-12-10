import { useState } from 'react';
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import NominationCard from '@/components/NominationCard';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const nominations = [
  { id: 1, title: 'Лучший проект года', votes: 127 },
  { id: 2, title: 'Инновация года', votes: 98 },
  { id: 3, title: 'Лучший дизайн', votes: 215 },
  { id: 4, title: 'Народный выбор', votes: 342 },
  { id: 5, title: 'Прорыв года', votes: 156 },
  { id: 6, title: 'Лучшая команда', votes: 189 },
  { id: 7, title: 'Техническое совершенство', votes: 143 },
  { id: 8, title: 'Социальное влияние', votes: 201 },
  { id: 9, title: 'Экологичность', votes: 167 },
  { id: 10, title: 'Лучшее решение', votes: 134 },
  { id: 11, title: 'Креативность', votes: 198 },
  { id: 12, title: 'Масштабируемость', votes: 112 },
  { id: 13, title: 'Пользовательский опыт', votes: 245 },
  { id: 14, title: 'Бизнес-модель', votes: 178 },
  { id: 15, title: 'Будущее отрасли', votes: 223 }
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section id="home" className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Конкурс 2024
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
                votes={nomination.votes}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Результаты
          </h2>
          
          <div className="space-y-4">
            {nominations
              .sort((a, b) => b.votes - a.votes)
              .slice(0, 5)
              .map((nomination, index) => (
                <div
                  key={nomination.id}
                  className="flex items-center gap-4 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg">
                      {nomination.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="ThumbsUp" size={20} />
                    <span className="font-heading font-bold text-xl">
                      {nomination.votes}
                    </span>
                  </div>
                </div>
              ))}
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

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Конкурс года. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
