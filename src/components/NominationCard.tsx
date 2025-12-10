import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface NominationCardProps {
  id: number;
  title: string;
  images: string[];
  votes: number;
}

const NominationCard = ({ id, title, images, votes }: NominationCardProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [localVotes, setLocalVotes] = useState(votes);

  const handleVote = () => {
    if (!hasVoted) {
      setHasVoted(true);
      setLocalVotes(prev => prev + 1);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-4 text-center">
          {title}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-secondary"
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="ThumbsUp" size={18} />
            <span className="text-sm font-medium">{localVotes} голосов</span>
          </div>
          
          <Button
            onClick={handleVote}
            disabled={hasVoted}
            className="flex-1 max-w-[140px]"
            variant={hasVoted ? "secondary" : "default"}
          >
            {hasVoted ? (
              <>
                <Icon name="Check" size={16} className="mr-1" />
                Проголосовано
              </>
            ) : (
              'Голосовать'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NominationCard;
