import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NominationCardProps {
  id: number;
  title: string;
  images: string[];
  onClick: () => void;
}

const NominationCard = ({ id, title, images, onClick }: NominationCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in cursor-pointer"
      onClick={onClick}
    >
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

        <Button
          className="w-full"
          variant="default"
        >
          Открыть номинацию
        </Button>
      </CardContent>
    </Card>
  );
};

export default NominationCard;
