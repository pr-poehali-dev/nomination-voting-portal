import { useState, useEffect } from 'react';
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
  votes?: number;
}

interface NominationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  nominationId: number;
  candidates: Candidate[];
}

const VOTING_API = 'https://functions.poehali.dev/5c699612-ca58-4ef2-9f5d-fee54e217634';

const NominationModal = ({ isOpen, onClose, title, nominationId, candidates: initialCandidates }: NominationModalProps) => {
  const [votedId, setVotedId] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadVotingData();
    }
  }, [isOpen, nominationId]);

  const loadVotingData = async () => {
    try {
      const response = await fetch(`${VOTING_API}?nomination_id=${nominationId}`);
      const data = await response.json();
      
      const candidatesWithImages = data.candidates.map((c: any, index: number) => ({
        ...c,
        image: initialCandidates[index % initialCandidates.length]?.image || initialCandidates[0].image
      }));
      
      setCandidates(candidatesWithImages);
      setVotedId(data.voted_candidate_id);
    } catch (error) {
      console.error('Error loading voting data:', error);
    }
  };

  const handleVote = async (candidateId: number) => {
    if (votedId !== null || loading) return;
    
    setLoading(true);
    try {
      const response = await fetch(VOTING_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate_id: candidateId,
          nomination_id: nominationId
        })
      });

      if (response.ok) {
        setVotedId(candidateId);
        await loadVotingData();
      } else {
        const error = await response.json();
        alert(error.error || 'Ошибка при голосовании');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Ошибка при голосовании');
    } finally {
      setLoading(false);
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
                disabled={votedId !== null || loading}
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
                ) : loading ? (
                  'Загрузка...'
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
