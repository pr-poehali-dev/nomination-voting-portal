import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Candidate {
  id: number;
  name: string;
  image: string;
}

interface NominationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  candidates: Candidate[];
}

const NominationModal = ({ isOpen, onClose, title, candidates }: NominationModalProps) => {
  const [votedId, setVotedId] = useState<number | null>(null);

  const handleVote = (candidateId: number) => {
    if (votedId === null) {
      setVotedId(candidateId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex flex-col items-center animate-fade-in"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="text-sm font-medium text-center mb-2 min-h-[40px] flex items-center">
                {candidate.name}
              </h4>
              
              <Button
                onClick={() => handleVote(candidate.id)}
                disabled={votedId !== null}
                variant={votedId === candidate.id ? "default" : "outline"}
                size="sm"
                className="w-full"
              >
                {votedId === candidate.id ? (
                  <>
                    <Icon name="Check" size={14} className="mr-1" />
                    Проголосовано
                  </>
                ) : votedId !== null ? (
                  'Недоступно'
                ) : (
                  'Голосовать'
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NominationModal;
